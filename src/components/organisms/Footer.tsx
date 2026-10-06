"use client";

import { FOOTER_COLUMNS, SITE } from "@/data/site";
import type { SiteConfig } from "@/types/site";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Wordmark that scales to fill the footer's width exactly.
 *
 * The glyphs are measured once at a known size, then the ratio gives the font
 * size that fits the container — cheaper and sharper than an SVG viewBox trick,
 * and it re-fits on resize.
 */
const FitWordmark = ({ text }: { text: string }) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const [size, setSize] = useState(0);

    useEffect(() => {
        // `fit` temporarily rewrites the span's font size to measure it, which the
        // span's own ResizeObserver would otherwise see as a change and report back
        // — a feedback loop. This flag makes those self-inflicted notifications
        // no-ops.
        let measuring = false;

        const fit = () => {
            if (measuring) return;
            const box = boxRef.current;
            const span = spanRef.current;
            if (!box || !span) return;

            measuring = true;
            const BASE = 100;
            const previous = span.style.fontSize;
            span.style.fontSize = `${BASE}px`;
            const natural = span.getBoundingClientRect().width;
            span.style.fontSize = previous;
            measuring = false;

            if (!natural) return;
            // A hair under 1 so the last glyph's bearing never clips.
            const next = (box.clientWidth / natural) * BASE * 0.995;
            // Settle on whole pixels, so a sub-pixel reflow cannot ping-pong
            // between two values forever.
            setSize((current) => (Math.abs(current - next) < 0.5 ? current : Math.floor(next)));
        };

        fit();

        // Measuring before the webfont lands gives the fallback's metrics, which
        // is what made the wordmark overflow its container.
        let cancelled = false;
        document.fonts?.ready.then(() => {
            if (!cancelled) fit();
        });

        // Observing the box alone was not enough. `document.fonts.ready` can
        // resolve before Inter has actually been applied — most often on mobile,
        // where the font arrives late and `display: swap` paints the fallback
        // first. The measurement then came from the fallback's metrics and the
        // wordmark was left at the wrong size with no second attempt.
        //
        // Watching the span as well means the font swap itself, which changes the
        // span's natural width, re-triggers the fit. Self-correcting rather than
        // dependent on one well-timed measurement.
        const observer = new ResizeObserver(fit);
        if (boxRef.current) observer.observe(boxRef.current);
        if (spanRef.current) observer.observe(spanRef.current);
        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, [text]);

    return (
        <div aria-hidden="true" className="relative mt-8 max-w-full select-none overflow-hidden">
            <div ref={boxRef} className="w-full font-bold uppercase leading-none tracking-tight text-ink">
                <span
                    ref={spanRef}
                    className="inline-block whitespace-nowrap align-top"
                    style={size ? { fontSize: `${size}px` } : { fontSize: "100px", visibility: "hidden" }}
                >
                    {text}
                </span>
            </div>
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
                className="relative flex w-full overflow-hidden border-y border-line py-4 text-[clamp(32px,6vw,84px)] font-medium uppercase leading-none tracking-tight"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
                }}
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
                <div className="flex w-max shrink-0 animate-[marquee_28s_linear_infinite] motion-reduce:animate-none">
                    {[0, 1].map((copy) => (
                        <ul key={copy} aria-hidden="true" className="flex shrink-0 items-center gap-8 pr-8">
                            <li className="flex items-center gap-8 whitespace-nowrap">
                                <span>Available for freelance or fulltime</span>
                                <span className="text-accent">·</span>
                            </li>
                        </ul>
                    ))}
                </div>
                {/* The animated copies are hidden from assistive tech; this is the readable one. */}
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
