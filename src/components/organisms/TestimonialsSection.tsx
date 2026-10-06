"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { SITE } from "@/data/site";
import { testimonials } from "@/data/site-content";
import { EASE_OUT } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * Client feedback, one quote at a time.
 *
 * Quotes slide and cross-fade; `mode="wait"` keeps the panel from fighting its
 * own height while the outgoing quote is still on screen.
 */
export const TestimonialsSection = () => {
    const [[index, direction], setState] = useState<[number, number]>([0, 0]);
    const active = testimonials[index];

    // Nothing to show until there are real, cleared client quotes.
    if (!active) return null;

    const go = (next: number) => {
        const wrapped = (next + testimonials.length) % testimonials.length;
        setState([wrapped, next > index ? 1 : -1]);
    };

    return (
        <section
            id="testimonials"
            aria-label="Client feedback"
            className="border-t border-line py-[var(--spacing-section)]"
        >
            <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <header className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="font-mono text-label uppercase tracking-wider text-accent">
                            Testimonials
                        </p>
                        <AnimatedText
                            as="h2"
                            text="What the clients actually said."
                            className="mt-3 max-w-[18ch] text-h2 font-medium"
                        />
                    </div>

                    <a
                        href={SITE.upwork}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 font-mono text-label uppercase tracking-wider text-muted transition-colors hover:text-accent"
                    >
                        Read on Upwork ↗
                    </a>
                </header>

                <div className="relative overflow-hidden border-y border-line py-12 md:py-16">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.blockquote
                            key={index}
                            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                            transition={{ duration: 0.5, ease: EASE_OUT }}
                        >
                            <p className="max-w-[46ch] text-h3 font-medium leading-tight">
                                &ldquo;{active.quote}&rdquo;
                            </p>

                            <footer className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
                                <div>
                                    <cite className="block font-mono text-label uppercase tracking-wider not-italic text-ink">
                                        {active.brand}
                                    </cite>
                                    {active.role && (
                                        <span className="mt-2 block text-small text-muted">{active.role}</span>
                                    )}
                                </div>

                                {active.metrics?.map((metric) => (
                                    <div key={metric.label} className="flex items-baseline gap-2">
                                        <span className="text-h3 font-medium text-accent">{metric.value}</span>
                                        <span aria-hidden="true" className="text-accent">
                                            ★
                                        </span>
                                        <span className="font-mono text-label uppercase tracking-wider text-muted">
                                            {metric.label}
                                        </span>
                                    </div>
                                ))}
                            </footer>

                            {active.endorsements && active.endorsements.length > 0 && (
                                <ul className="mt-8 flex flex-wrap gap-2">
                                    {active.endorsements.map((trait) => (
                                        <li
                                            key={trait}
                                            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                                        >
                                            {trait}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.blockquote>
                    </AnimatePresence>
                </div>

                {testimonials.length > 1 && (
                    <div className="mt-8 flex items-center justify-between gap-6">
                        <div className="flex gap-2">
                            {testimonials.map((testimonial, i) => (
                                <button
                                    key={`${testimonial.brand}-${i}`}
                                    type="button"
                                    onClick={() => go(i)}
                                    aria-label={`Show review ${i + 1} of ${testimonials.length}`}
                                    aria-current={i === index}
                                    className="group py-2"
                                >
                                    <span
                                        className={`block h-1 rounded-full transition-all duration-[var(--duration-normal)] ${
                                            i === index ? "w-10 bg-accent" : "w-5 bg-line group-hover:bg-ink/40"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => go(index - 1)}
                                aria-label="Previous review"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
                            >
                                <span aria-hidden="true">←</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => go(index + 1)}
                                aria-label="Next review"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
                            >
                                <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
