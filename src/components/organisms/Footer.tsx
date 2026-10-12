"use client";

import { FOOTER_COLUMNS, SITE } from "@/data/site";
import type { SiteConfig } from "@/types/site";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** Font size the hidden probe is measured at. */
const MEASURE_PX = 100;

/**
 * Wordmark that scales to fill the footer's width exactly.
 *
 * Measurement happens on a separate hidden copy pinned at a fixed 100px, and
 * `fit` never writes to it. That matters: the previous version measured the
 * visible span by temporarily setting its font size to 100px and back, while a
 * ResizeObserver watched that same span. ResizeObserver callbacks are async, so
 * the re-entrancy flag guarding the swap was always `false` again by the time
 * one arrived — every fit queued another fit, forever. Desktop browsers swallow
 * that; iOS Safari painted it, which is the glyph tearing Umer saw on an
 * iPhone 11 Pro.
 *
 * The hidden copy only changes width when the webfont actually swaps in, which
 * is exactly the signal worth re-fitting on, so observing it is self-correcting
 * instead of self-perpetuating.
 */
const FitWordmark = ({ text }: { text: string }) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const [size, setSize] = useState(0);

    useEffect(() => {
        const fit = () => {
            const box = boxRef.current;
            const probe = measureRef.current;
            if (!box || !probe) return;

            const natural = probe.getBoundingClientRect().width;
            if (!natural) return;

            // A hair under 1 so the last glyph's bearing never clips.
            const next = Math.floor((box.clientWidth / natural) * MEASURE_PX * 0.995);
            setSize((current) => (current === next ? current : next));
        };

        fit();

        // The font can land after mount; re-fit when it does.
        let cancelled = false;
        document.fonts?.ready.then(() => {
            if (!cancelled) fit();
        });

        // Neither observed element is ever written to by `fit`, so this cannot
        // feed itself: the box changes on resize, the probe changes on font swap.
        const observer = new ResizeObserver(fit);
        if (boxRef.current) observer.observe(boxRef.current);
        if (measureRef.current) observer.observe(measureRef.current);
        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, [text]);

    return (
        <div aria-hidden="true" className="relative mt-8 max-w-full select-none overflow-hidden">
            <div ref={boxRef} className="w-full font-bold uppercase leading-none tracking-tight text-ink">
                <span
                    className="inline-block whitespace-nowrap align-top"
                    style={size ? { fontSize: `${size}px` } : { fontSize: `${MEASURE_PX}px`, visibility: "hidden" }}
                >
                    {text}
                </span>
            </div>

            {/* Measured, never shown, never mutated. */}
            <span
                ref={measureRef}
                className="pointer-events-none absolute left-0 top-0 -z-10 inline-block whitespace-nowrap font-bold uppercase tracking-tight opacity-0"
                style={{ fontSize: `${MEASURE_PX}px` }}
            >
                {text}
            </span>
        </div>
    );
};

export const Footer = ({ config }: { config?: SiteConfig }) => {
    const year = new Date().getFullYear();
    const email = config?.email || SITE.email;
    const fullName = SITE.name;
    // The oversized wordmark reads better as the first name alone.
    const mark = fullName.split(" ").filter(Boolean)[0] ?? fullName;

    return (
        <footer id="footer" className="relative w-full max-w-full overflow-hidden border-t border-line">
            <div className="relative mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)] pb-12 pt-[clamp(56px,7vw,96px)]">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
                    {/* Pitch + email */}
                    <div className="lg:col-span-4">
                        <p className="max-w-[34ch] text-body leading-snug">
                            {SITE.role} with 3 years of experience, crafting web and eCommerce
                            experiences that load fast and convert better.
                        </p>
                        <p className="mt-10 font-mono text-label uppercase tracking-wider text-muted">
                            Let&rsquo;s make an impact together.
                        </p>
                        <a
                            href={`mailto:${email}`}
                            data-cursor-text="Email"
                            className="mt-4 inline-block text-h3 font-medium transition-colors hover:text-accent"
                        >
                            {email}
                        </a>
                    </div>

                    {/* Link columns */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-12 lg:col-span-8 lg:grid-cols-3 xl:gap-x-14">
                        {FOOTER_COLUMNS.map((column) => (
                            <nav key={column.heading} aria-label={column.heading}>
                                <h2 className="font-mono text-label uppercase tracking-wider text-muted">
                                    {column.heading}
                                </h2>
                                <ul className="mt-5 flex flex-col gap-3">
                                    {column.links.map((link) => {
                                        const content = column.dotted ? (
                                            <>
                                                <span
                                                    aria-hidden="true"
                                                    className="h-1.5 w-1.5 rounded-full bg-muted transition-colors group-hover:bg-accent"
                                                />
                                                {link.name}
                                            </>
                                        ) : (
                                            link.name
                                        );

                                        const className = column.dotted
                                            ? "group inline-flex items-center gap-2 text-small transition-colors hover:text-accent"
                                            : "text-small transition-colors hover:text-accent";

                                        return (
                                            <li key={link.name}>
                                                {link.external ? (
                                                    <a
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={className}
                                                    >
                                                        {content}
                                                    </a>
                                                ) : (
                                                    <Link href={link.href} className={className}>
                                                        {content}
                                                    </Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        ))}
                    </div>
                </div>
            </div>

            {/* Availability marquee */}
            <div
                role="group"
                className="marquee-mask relative flex w-full select-none overflow-hidden border-y border-line py-4 text-[clamp(32px,6vw,84px)] font-medium uppercase leading-none tracking-tight"
            >
                {/*
                 * `w-max shrink-0` is load-bearing. Without it this is a flex item
                 * with the default `flex-shrink: 1`, so it collapses to the
                 * container's width — and because `marquee` translates by -50% of
                 * the element's OWN width, the track then slid half a viewport and
                 * snapped back instead of scrolling exactly one of the two copies.
                 * Sizing to content makes -50% equal one copy, so the loop is seamless.
                 *
                 * The animation is a utility rather than an inline style so that
                 * `motion-reduce:animate-none` can actually win the cascade.
                 */}
                <div className="marquee-track flex w-max shrink-0 animate-[marquee_28s_linear_infinite] motion-reduce:hidden">
                    {[0, 1].map((copy) => (
                        <ul key={copy} aria-hidden="true" className="flex shrink-0 items-center gap-8 pr-8">
                            <li className="flex items-center gap-8 whitespace-nowrap">
                                <span>Available for freelance or fulltime</span>
                                <span className="text-accent">·</span>
                            </li>
                        </ul>
                    ))}
                </div>
                {/*
                 * Reduced motion gets a single centred copy instead of the scrolling
                 * pair. Simply stopping the animation left the track parked at
                 * translateX(0) with the mask over it, so the line read as cut off
                 * rather than deliberately still.
                 */}
                <p className="hidden w-full justify-center whitespace-nowrap px-[var(--gutter)] motion-reduce:flex">
                    <span aria-hidden="true">Available for freelance or fulltime</span>
                </p>

                {/* The visible copies are hidden from assistive tech; this is the readable one. */}
                <ul className="sr-only">
                    <li>Available for freelance or fulltime</li>
                </ul>
            </div>

            <FitWordmark text={mark} />

            <div className="relative mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)] pb-7 pt-7">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    © {year} {fullName}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
