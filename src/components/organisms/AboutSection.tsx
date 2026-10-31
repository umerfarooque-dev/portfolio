"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { ScrollRevealText } from "@/components/atoms/ScrollRevealText";
import { SITE } from "@/data/site";
import { HOME_ABOUT_CONTENT, HOME_ABOUT_FACTS } from "@/data/homepage";
import type { SiteConfig } from "@/types/site";
import Image from "next/image";

/**
 * Portrait on the right, the pitch on the left.
 *
 * The lead paragraph fills with colour as it scrolls past; the supporting line
 * under it stays muted so the two do not compete.
 */
export const AboutSection = ({
    config,
    headingAs = "h2",
}: {
    config?: SiteConfig;
    /**
     * h2 on the home page, where the hero already owns the h1; h1 on /about,
     * which previously had no h1 at all. Only the tag changes — the type scale
     * comes from the className either way.
     */
    headingAs?: "h1" | "h2";
}) => {
    const portrait = config?.aboutImage || "/images/professional.png";

    return (
        <section
            id="about"
            aria-label="About"
            className="relative py-[var(--spacing-section)]"
        >
            <div className="mx-auto grid w-full max-w-[var(--container-grid)] grid-cols-1 items-start gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                    <AnimatedText
                        as={headingAs}
                        text={HOME_ABOUT_CONTENT.heading}
                        className="max-w-[16ch] text-h2 font-medium"
                    />

                    <ScrollRevealText
                        text={HOME_ABOUT_CONTENT.introduction}
                        className="mt-10 max-w-[56ch] text-body leading-relaxed"
                    />

                    <p className="mt-8 max-w-[46ch] text-small leading-relaxed text-muted">
                        {HOME_ABOUT_CONTENT.supporting}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                        <a
                            href={SITE.upwork}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-label uppercase tracking-wider text-ink transition-colors hover:text-accent"
                        >
                            View Upwork profile ↗
                        </a>
                        <a
                            href={SITE.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-label uppercase tracking-wider text-muted transition-colors hover:text-accent"
                        >
                            LinkedIn ↗
                        </a>
                        <a
                            href={SITE.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-label uppercase tracking-wider text-muted transition-colors hover:text-accent"
                        >
                            Resume ↗
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line bg-surface">
                        <Image
                            src={portrait}
                            alt={`${SITE.name}, ${SITE.role}`}
                            fill
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
            <dl className="shell mt-14 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">{HOME_ABOUT_FACTS.map(fact => <div key={fact.label}><dt className="font-mono text-label uppercase tracking-wider text-muted">{fact.label}</dt><dd className="mt-3 text-xl font-medium text-ink">{fact.value}</dd></div>)}</dl>
        </section>
    );
};
