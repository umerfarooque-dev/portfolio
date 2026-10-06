"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin accent bar across the top of the viewport showing read progress.
 * Driven by a spring so it eases rather than tracking the scrollbar exactly.
 */
export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 180,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
        />
    );
};
