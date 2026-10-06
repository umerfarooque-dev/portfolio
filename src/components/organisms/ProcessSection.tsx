"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { processSteps } from "@/data/site-content";
import { gsap } from "@/lib/gsap";
import { useLayoutEffect, useRef } from "react";

/**
 * Process cards run horizontally while the section is pinned.
 *
 * GSAP pins the panel and translates the track by exactly the overflow width,
 * so the last card lands flush at the right edge. `matchMedia` keeps the pin to
 * desktop and to users who have not asked for reduced motion — everyone else
 * gets an ordinary horizontal swipe, which the markup already supports.
 */
export const ProcessSection = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add(
            { isDesktop: "(min-width: 768px)", noReduce: "(prefers-reduced-motion: no-preference)" },
            (ctx) => {
                const { isDesktop, noReduce } = ctx.conditions as Record<string, boolean>;
                if (!isDesktop || !noReduce) return;

                const track = trackRef.current;
                const panel = panelRef.current;
                if (!track || !panel) return;

                const distance = () => Math.max(0, track.scrollWidth - panel.clientWidth);

                gsap.to(track, {
                    x: () => -distance(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: () => "+=" + distance(),
                        pin: panel,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
            }
        );

        return () => mm.revert();
    }, []);

    return (
        <section id="process" aria-label="Process" className="pt-[var(--spacing-section)]">
            <div className="mx-auto mb-16 w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <AnimatedText
                    as="h2"
                    text="Nothing here is a surprise later."
                    className="max-w-[18ch] text-h2 font-medium"
                />
            </div>

            <div ref={rootRef} className="pl-[var(--gutter)]">
                <div
                    ref={panelRef}
                    className="relative overflow-x-auto md:flex md:h-svh md:items-center md:overflow-hidden"
                >
                    <div ref={trackRef} className="flex w-max shrink-0 gap-6 md:will-change-transform">
                        {processSteps.map((step) => (
                            <article
                                key={step.num}
                                className="flex w-[80vw] shrink-0 flex-col justify-between rounded-sm border border-line bg-surface p-8 md:min-h-[420px] md:w-[420px] md:p-12"
                            >
                                <span className="font-mono text-label uppercase tracking-wider text-accent">
                                    {step.num}
                                </span>
                                <div className="mt-16 md:mt-24">
                                    <h3 className="text-h3 font-medium">{step.title}</h3>
                                    <p className="mt-4 text-small text-muted">{step.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
