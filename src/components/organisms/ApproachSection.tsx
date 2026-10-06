"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { ScrollRevealText } from "@/components/atoms/ScrollRevealText";
import { principles } from "@/data/showcase";
import { itemVariants } from "@/lib/motion";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * What the client is signing up for, stated plainly.
 *
 * A rail beside the list fills as the section scrolls past, so a column of
 * prose gets some sense of progress without needing images to break it up.
 */
export const ApproachSection = () => {
    const listRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: listRef,
        offset: ["start 80%", "end 65%"],
    });
    const railScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
    const railOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

    return (
        <section
            id="approach"
            aria-label="Approach"
            className="border-t border-line py-[var(--spacing-section)]"
        >
            <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <header className="mb-16 max-w-[54ch]">
                    <p className="font-mono text-label uppercase tracking-wider text-accent">
                        06 — Approach
                    </p>
                    <AnimatedText
                        as="h2"
                        text="Senior engineering. No agency hand-offs."
                        className="mt-3 max-w-[18ch] text-h2 font-medium"
                    />
                    <ScrollRevealText
                        text="Four things that stay true on every project, whatever the platform."
                        className="mt-6 max-w-[48ch] text-body"
                    />
                </header>

                <div ref={listRef} className="relative">
                    <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 hidden w-px bg-line md:block">
                        <motion.div
                            style={{ scaleY: railScale, opacity: railOpacity }}
                            className="h-full w-full origin-top bg-accent"
                        />
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {principles.map((principle) => (
                            <motion.div
                                key={principle.num}
                                variants={itemVariants}
                                className="grid grid-cols-1 gap-3 border-b border-line py-10 md:grid-cols-[120px_1fr] md:gap-10 md:py-12 md:pl-10"
                            >
                                <span className="font-mono text-label uppercase tracking-wider text-muted">
                                    {principle.num}
                                </span>
                                <div>
                                    <h3 className="text-h3 font-medium">{principle.title}</h3>
                                    <p className="mt-4 max-w-[62ch] text-small leading-relaxed text-muted">
                                        {principle.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
