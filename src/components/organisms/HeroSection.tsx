"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { Magnetic } from "@/components/atoms/Magnetic";
import { HeroSlideshow } from "@/components/organisms/HeroSlideshow";
import { HERO_LABEL_ROWS, SITE } from "@/data/site";
import type { SiteConfig } from "@/types/site";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Live local clock, client-only so server and client markup agree. */
const LocalClock = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const tick = () =>
            setTime(
                new Intl.DateTimeFormat("en-GB", {
                    timeZone: SITE.timeZone,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                }).format(new Date())
            );
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <span className="inline-flex items-baseline gap-2 tabular-nums">
            <span>{time || "--:--:--"}</span>
            <span className="text-muted">{SITE.timeZoneLabel}</span>
        </span>
    );
};

export const HeroSection = ({ config, slides = [] }: { config?: SiteConfig; slides?: string[] }) => {
    return (
        <section aria-label="Introduction" className="relative flex min-h-svh flex-col justify-between">
            <HeroSlideshow slides={slides} />

            <div className="relative z-10 flex flex-1 flex-col justify-between pb-8 pt-24 md:pt-28">
                {/* Three-up label rows */}
                <div className="px-[var(--gutter)]">
                    {HERO_LABEL_ROWS.map((row, r) => (
                        <div
                            key={r}
                            className={`grid grid-cols-3 gap-4 border-b border-ink/15 pb-2 ${
                                r === 0 ? "mb-2 md:mb-3" : ""
                            }`}
                        >
                            {row.map((label, c) => (
                                <span
                                    key={label}
                                    className={`text-[11px] uppercase tracking-wide text-muted md:text-small ${
                                        c === 1 ? "text-center" : c === 2 ? "text-right" : ""
                                    }`}
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Middle block */}
                <div className="mx-auto my-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)] py-6 md:py-8">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                            Available for freelance &amp; fulltime
                        </span>
                        <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted sm:inline">
                            · 3 Years Experience
                        </span>
                        <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted md:inline">
                            · 24h reply
                        </span>
                    </div>

                    <AnimatedText
                        as="h1"
                        immediate
                        text={config?.heroTitle || "Full-Stack Web Developer WordPress, Shopify & Laravel"}
                        accentFrom={3}
                        className="max-w-[22ch] text-balance text-h1 font-medium leading-[1.05]"
                    />

                    <AnimatedText
                        as="p"
                        immediate
                        muted
                        delay={0.15}
                        text={
                            config?.heroDescription ||
                            "3 years of experience across e-commerce, SaaS and corporate. Custom WordPress themes and plugins, Shopify storefronts, Laravel back ends, and React interfaces — with Stripe and PayPal wired in."
                        }
                        className="mt-6 max-w-[58ch] leading-relaxed text-muted"
                    />

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Magnetic>
                            <Link
                                href="#contact"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono uppercase tracking-wider text-bg transition-colors duration-[var(--duration-normal)] ease-[var(--ease-out)] hover:bg-ink"
                            >
                                Get a free proposal
                            </Link>
                        </Magnetic>

                        <a
                            href={`https://wa.me/${SITE.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-7 py-3.5 font-mono uppercase tracking-wider text-ink transition-colors duration-[var(--duration-normal)] ease-[var(--ease-out)] hover:border-accent hover:text-accent"
                        >
                            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#25D366]" />
                            WhatsApp chat ↗
                        </a>

                        <Link
                            href="#work"
                            className="px-4 py-3 font-mono text-label uppercase tracking-wider text-muted transition-colors hover:text-accent"
                        >
                            See live work →
                        </Link>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mx-auto flex w-full max-w-[var(--container-grid)] flex-col gap-3 border-t border-line/40 px-[var(--gutter)] pt-4 font-mono uppercase tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-ink">Based in {SITE.location}</span>
                        <span>·</span>
                        <span>UK &amp; US overlap</span>
                    </div>
                    <LocalClock />
                </div>
            </div>
        </section>
    );
};
