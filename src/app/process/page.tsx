import { AnimatedText } from "@/components/atoms/AnimatedText";
import { ScrollRevealText } from "@/components/atoms/ScrollRevealText";
import { processSteps } from "@/data/site-content";
import { SITE } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: `Process | ${SITE.name}`,
    description:
        "How a project actually runs: what gets checked before quoting, what gets measured first, and what you are handed at the end.",
    alternates: { canonical: "/process" },
};

export const revalidate = 3600;

/**
 * The long-form version of the home page's process section.
 *
 * The home page runs these five steps as a pinned horizontal scroll, which is
 * good at being noticed and bad at being read. This page is the readable one —
 * same `processSteps` data, no animation fighting the text, and a real URL to
 * send a client who asked "so how does this work".
 */
export default function ProcessPage() {
    return (
        <>
            <header className="w-full max-w-full overflow-hidden pb-[clamp(48px,6vw,96px)] pt-40 md:pt-56">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <AnimatedText
                        as="span"
                        immediate
                        text="Process"
                        className="mb-8 block font-mono uppercase tracking-wider text-muted"
                    />
                    <AnimatedText
                        as="h1"
                        immediate
                        delay={0.1}
                        text="Nothing here is a surprise later."
                        className="max-w-[16ch] text-balance text-h1 font-medium"
                    />
                    <AnimatedText
                        as="p"
                        immediate
                        muted
                        delay={0.25}
                        text="Five steps, in the order they happen. The point of writing them down is that you can hold me to them."
                        className="mt-8 max-w-[56ch] text-muted"
                    />
                </div>
            </header>

            <section aria-label="The five steps" className="border-t border-line">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <ol>
                        {processSteps.map((step) => (
                            <li
                                key={step.num}
                                className="grid grid-cols-1 gap-6 border-b border-line py-[clamp(40px,5vw,72px)] md:grid-cols-[120px_1fr] md:gap-12"
                            >
                                <span className="font-mono text-label uppercase tracking-wider text-accent">
                                    {step.num}
                                </span>
                                <div className="max-w-[60ch]">
                                    <h2 className="text-h3 font-medium">{step.title}</h2>
                                    <p className="mt-5 text-body leading-relaxed text-muted">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section aria-label="Why it is written down" className="py-[var(--spacing-section)]">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <ScrollRevealText
                        as="p"
                        text="A process only means something if you can check it was followed. That is why each step here names a thing you receive, not a thing I intend."
                        className="max-w-[26ch] text-h2 font-medium"
                    />

                    <Link
                        href="/contact"
                        data-cursor-text="Talk"
                        className="mt-14 inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 font-mono text-label uppercase tracking-wider transition-colors hover:border-accent hover:text-accent"
                    >
                        Start a project
                        <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </section>
        </>
    );
}
