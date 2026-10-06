"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { showcaseImage, showcaseItems } from "@/data/showcase";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shipped storefront sections, drifting continuously along an arc.
 *
 * A single float — how far the rail has travelled, in cards — drives
 * everything. Each card's place comes from its *shortest circular distance* to
 * that value, so the fan loops: a card leaving one side reappears on the other
 * and neither end is ever empty.
 *
 * The transforms are written straight to the DOM inside a rAF loop rather than
 * through React state, so a continuous animation costs zero re-renders. Only
 * the dots need the nearest index, and that is stored separately so it updates
 * about once a second instead of sixty times.
 */

/** Sideways step between neighbours, as a share of one card's own width. */
const STEP = 76;
/** Pixels a card drops per step away from centre. */
const DIP = 26;
/** Degrees of tilt per step. */
const TILT = 4;
/** Cards travelled per second. */
const SPEED = 0.18;
/** Distance at which a card is fully faded out. */
const FADE_END = 2.6;
const FADE_START = 1.5;

const count = showcaseItems.length;

/** Shortest signed distance from `pos` to card `i` around the loop. */
const circularOffset = (i: number, pos: number) => {
    let offset = i - pos;
    while (offset > count / 2) offset -= count;
    while (offset < -count / 2) offset += count;
    return offset;
};

export const ShowcaseSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);

    // Animation state lives in refs — none of it should trigger a render.
    const pos = useRef(0);
    const target = useRef(0);
    const paused = useRef(false);
    const onScreen = useRef(true);

    const [nearest, setNearest] = useState(0);

    const nudge = useCallback((by: number) => {
        target.current += by;
    }, []);

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let frame = 0;
        let last = 0;
        let lastNearest = -1;

        const paint = () => {
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                const offset = circularOffset(i, pos.current);
                const distance = Math.abs(offset);

                const opacity =
                    distance <= FADE_START
                        ? 1
                        : Math.max(0, 1 - (distance - FADE_START) / (FADE_END - FADE_START));

                card.style.transform =
                    `translateX(${(offset * STEP).toFixed(2)}%) ` +
                    `translateY(${(offset * offset * DIP).toFixed(2)}px) ` +
                    `rotate(${(offset * TILT).toFixed(2)}deg) ` +
                    `scale(${(1 - distance * 0.05).toFixed(3)})`;
                card.style.opacity = opacity.toFixed(3);
                card.style.zIndex = String(count - Math.round(distance));
                card.style.pointerEvents = opacity < 0.2 ? "none" : "auto";
            });
        };

        const loop = (time: number) => {
            const delta = last ? Math.min((time - last) / 1000, 0.05) : 0;
            last = time;

            if (!paused.current && onScreen.current) target.current += SPEED * delta;
            // Ease toward the target so arrow nudges glide instead of snapping.
            pos.current += (target.current - pos.current) * Math.min(1, delta * 6);

            paint();

            const n = ((Math.round(pos.current) % count) + count) % count;
            if (n !== lastNearest) {
                lastNearest = n;
                setNearest(n);
            }

            frame = requestAnimationFrame(loop);
        };

        if (reduce) {
            paint();
            return;
        }

        frame = requestAnimationFrame(loop);

        const el = sectionRef.current;
        const io = el
            ? new IntersectionObserver(([entry]) => {
                  onScreen.current = entry.isIntersecting;
              })
            : null;
        if (el && io) io.observe(el);

        return () => {
            cancelAnimationFrame(frame);
            io?.disconnect();
        };
    }, []);

    // Arrow keys steer when focus is inside the section.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!sectionRef.current?.contains(document.activeElement)) return;
            if (e.key === "ArrowLeft") nudge(-1);
            if (e.key === "ArrowRight") nudge(1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [nudge]);

    return (
        <section
            id="showcase"
            aria-label="Showcase"
            ref={sectionRef}
            className="relative py-[var(--spacing-section)]"
        >
            <div className="mx-auto flex w-full max-w-[var(--container-grid)] flex-col items-center px-[var(--gutter)] text-center">
                <p className="flex items-center gap-3 font-mono text-label uppercase tracking-wider text-muted">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Showcase
                </p>

                <AnimatedText
                    as="h2"
                    text="Sections I have shipped."
                    className="mt-6 max-w-[18ch] text-h2 font-medium uppercase"
                />

                <p className="mt-6 max-w-[52ch] text-body text-muted">
                    Reusable storefront sections, built and running on live stores rather than sitting in a
                    Figma file. Each one is a native theme section the client&rsquo;s team can edit.
                </p>

                <Link
                    href="/work"
                    className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono uppercase tracking-wider text-bg transition-colors duration-[var(--duration-normal)] ease-[var(--ease-out)] hover:bg-ink"
                >
                    View showcase →
                </Link>
            </div>

            {/* Arc rail */}
            <div
                className="relative mt-16 hidden h-[clamp(360px,38vw,560px)] overflow-hidden md:block"
                onMouseEnter={() => (paused.current = true)}
                onMouseLeave={() => (paused.current = false)}
                onFocusCapture={() => (paused.current = true)}
                onBlurCapture={() => (paused.current = false)}
            >
                {showcaseItems.map((item, i) => (
                    <figure
                        key={item.title}
                        ref={(el) => {
                            cardRefs.current[i] = el;
                        }}
                        className="absolute left-1/2 top-4 -ml-[16%] w-[32%] will-change-transform"
                    >
                        <a
                            href="/work"
                            data-cursor-text="View"
                            className="block w-full text-left focus-visible:outline-offset-8"
                        >
                            <div className="overflow-hidden rounded-[3px] border-[6px] border-[#141416] bg-surface shadow-[0_30px_70px_-24px_rgba(0,0,0,0.9)]">
                                <div className="relative aspect-video">
                                    <Image
                                        src={showcaseImage(item)}
                                        alt={item.description}
                                        fill
                                        draggable={false}
                                        sizes="34vw"
                                        className="pointer-events-none object-cover object-top"
                                    />
                                </div>
                            </div>
                            <figcaption className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink">
                                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-accent" />
                                {item.title}
                            </figcaption>
                        </a>
                    </figure>
                ))}
            </div>

            {/* Controls */}
            <div className="mx-auto mt-10 hidden w-full max-w-[var(--container-grid)] items-center justify-between gap-6 px-[var(--gutter)] md:flex">
                <div className="flex gap-2" aria-hidden="true">
                    {showcaseItems.map((item, i) => (
                        <span
                            key={item.title}
                            className={`block h-1 rounded-full transition-all duration-[var(--duration-normal)] ${
                                i === nearest ? "w-10 bg-accent" : "w-5 bg-line"
                            }`}
                        />
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => nudge(-1)}
                        aria-label="Previous section"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                        <span aria-hidden="true">←</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => nudge(1)}
                        aria-label="Next section"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            </div>

            {/* Mobile: snap slider */}
            <div
                data-lenis-prevent
                className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gutter)] pb-4 md:hidden"
            >
                {showcaseItems.map((item) => (
                    <figure key={item.title} className="w-[84vw] shrink-0 snap-start sm:w-[58vw]">
                        <div className="overflow-hidden rounded-[3px] border-[6px] border-[#141416] bg-surface">
                            <div className="relative aspect-video">
                                <Image
                                    src={showcaseImage(item)}
                                    alt={item.description}
                                    fill
                                    sizes="(min-width: 640px) 58vw, 84vw"
                                    className="object-cover object-top"
                                />
                            </div>
                        </div>
                        <figcaption className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-accent" />
                            {item.title}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
};
