"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { ScrollRevealText } from "@/components/atoms/ScrollRevealText";
import { faqs } from "@/data/site-content";

/**
 * FAQ as a two-column reference list rather than an accordion.
 *
 * Every answer is visible, so nothing is hidden behind a click and the section
 * reads in one pass. Each answer fills with colour as it scrolls through the
 * viewport, which gives the eye somewhere to go down a long column of text.
 */
export const FaqSection = () => {
    return (
        <section
            id="faq"
            aria-label="Frequently asked questions"
            className="border-t border-line py-[var(--spacing-section)]"
        >
            <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <AnimatedText
                    as="h2"
                    text="Common questions before kickoff"
                    className="max-w-[20ch] text-h2 font-medium"
                />

                <dl className="mt-16 border-t border-line">
                    {faqs.map((faq) => (
                        <div
                            key={faq.question}
                            className="grid grid-cols-1 gap-4 border-b border-line py-10 md:grid-cols-2 md:gap-16 md:py-12"
                        >
                            <dt className="text-h3 font-medium text-ink">{faq.question}</dt>
                            <dd>
                                <ScrollRevealText
                                    text={faq.answer}
                                    className="max-w-[54ch] text-body leading-relaxed"
                                    offset={["start 0.95", "start 0.5"]}
                                />
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};
