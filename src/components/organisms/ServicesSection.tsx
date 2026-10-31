"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { HOME_SERVICES } from "@/data/homepage";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { services } from "@/data/site-content";
import { EASE_OUT } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const ServicesSection = () => {
    // One row open at a time, the first by default.
    const [open, setOpen] = useState<string | null>(services[0]?.num ?? null);
    const reduceMotion = usePrefersReducedMotion();

    return (
        <section id="services" aria-label="Services" className="relative bg-surface py-[var(--spacing-section)]">
            <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <header className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-[54ch]">
                        <p className="font-mono text-label uppercase tracking-wider text-accent">
                            {HOME_SERVICES.label}
                        </p>
                        <AnimatedText
                            as="h2"
                            text={HOME_SERVICES.title}
                            className="mt-3 text-h2 font-medium"
                        />
                        <p className="mt-6 text-body leading-relaxed text-ink/85">{HOME_SERVICES.description}</p>
                    </div>
                    <Link
                        href={HOME_SERVICES.href}
                        className="shrink-0 font-mono text-label uppercase tracking-wider text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                        {HOME_SERVICES.allLabel} <span aria-hidden="true">→</span>
                    </Link>
                </header>

                <div className="border-t border-line">
                    {services.map((service) => {
                        const isOpen = open === service.num;
                        const panelId = `service-panel-${service.num}`;

                        return (
                            <div key={service.num} className="border-b border-line">
                                <h3>
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        id={`service-toggle-${service.num}`}
                                        onClick={() => setOpen(isOpen ? null : service.num)}
                                        className="group flex w-full items-center gap-4 py-8 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:gap-8 md:py-10"
                                    >
                                        <span className="font-mono text-label uppercase tracking-wider text-accent">
                                            {service.num}
                                        </span>
                                        <span className="flex-1 text-h3 font-medium transition-colors group-hover:text-accent">
                                            {service.title}
                                        </span>
                                        <span className="hidden rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted sm:inline-flex">
                                            {service.meta}
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className={`shrink-0 text-h3 font-light leading-none transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out)] ${
                                                isOpen ? "rotate-45 text-accent" : "rotate-0"
                                            }`}
                                        >
                                            +
                                        </span>
                                    </button>
                                </h3>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={panelId}
                                            role="region"
                                            aria-labelledby={`service-toggle-${service.num}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                height: { duration: reduceMotion ? 0 : 0.4, ease: EASE_OUT },
                                                opacity: { duration: reduceMotion ? 0 : 0.25, ease: EASE_OUT },
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-1 gap-8 pb-10 md:pl-12 lg:grid-cols-[1fr_280px] lg:gap-16 lg:pl-[calc(80px+4rem)]">

                                                <div>
                                                    <span className="mb-3 inline-block rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent sm:hidden">
                                                        {service.meta}
                                                    </span>
                                                    <p className="max-w-[52ch] text-small leading-relaxed text-muted">
                                                        {service.description}
                                                    </p>
                                                    <Link href={`/services/${service.slug}`} className="mt-8 inline-flex max-w-full items-center gap-3 font-mono text-label uppercase leading-relaxed tracking-wider text-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                                                        {HOME_SERVICES.exploreLabel} {service.title}
                                                        <span aria-hidden="true" className="shrink-0">→</span>
                                                    </Link>
                                                </div>

                                                <ul className="flex flex-wrap gap-2 md:flex-col">
                                                    {service.points?.map((point) => (
                                                        <li
                                                            key={point}
                                                            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted md:border-0 md:px-0 md:py-0"
                                                        >
                                                            <span aria-hidden="true" className="mr-2 hidden text-accent md:inline">
                                                                ›
                                                            </span>
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};
