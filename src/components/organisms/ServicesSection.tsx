"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { ScrollRevealText } from "@/components/atoms/ScrollRevealText";
import { services } from "@/data/site-content";
import { EASE_OUT } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const ServicesSection = () => {
    // One row open at a time, the first by default.
    const [open, setOpen] = useState<string | null>(services[0]?.num ?? null);

    return (
        <section id="services" aria-label="Services" className="relative bg-surface py-[var(--spacing-section)]">
            <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <header className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-[54ch]">
                        <p className="font-mono text-label uppercase tracking-wider text-accent">
                            Capabilities &amp; Services
                        </p>
                        <AnimatedText
                            as="h2"
                            text="Engineered for revenue, built for speed."
                            className="mt-3 text-h2 font-medium"
                        />
                        <ScrollRevealText
                            text="Six specialisms aimed at conversion, load time and shipping changes without downtime."
                            className="mt-6"
                        />
                    </div>
                    <Link
                        href="/#services"
                        className="shrink-0 font-mono text-label uppercase tracking-wider text-muted transition-colors hover:text-accent"
                    >
                        View all services →
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
                                        onClick={() => setOpen(isOpen ? null : service.num)}
                                        className="group flex w-full items-center gap-4 py-8 text-left md:gap-8 md:py-10"
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
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                height: { duration: 0.4, ease: EASE_OUT },
                                                opacity: { duration: 0.25, ease: EASE_OUT },
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-[80px_1fr_280px] md:gap-16">
                                                <span aria-hidden="true" className="hidden md:block" />

                                                <div>
                                                    <span className="mb-3 inline-block rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent sm:hidden">
                                                        {service.meta}
                                                    </span>
                                                    <p className="max-w-[52ch] text-small leading-relaxed text-muted">
                                                        {service.description}
                                                    </p>
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
