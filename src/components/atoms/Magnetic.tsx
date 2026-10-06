"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

/**
 * Pulls its child toward the pointer while the pointer is over it.
 *
 * The element follows on a spring, so it lags slightly and settles rather than
 * tracking exactly — that lag is what reads as weight. Its contents move a
 * fraction further than the element itself, which gives a little parallax
 * between the button and its label.
 *
 * Pointer movement is written to motion values, so dragging across a row of
 * these costs no React renders.
 */

interface MagneticProps {
    children: ReactNode;
    /** How far the element travels, as a share of the distance to the pointer. */
    strength?: number;
    className?: string;
}

export const Magnetic = ({ children, strength = 0.35, className }: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const reduceMotion = usePrefersReducedMotion();

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const spring = { stiffness: 220, damping: 18, mass: 0.4 };
    const x = useSpring(rawX, spring);
    const y = useSpring(rawY, spring);

    // The label drifts a touch further than its container.
    const innerX = useTransform(x, (v) => v * 0.35);
    const innerY = useTransform(y, (v) => v * 0.35);

    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        rawX.set((e.clientX - (box.left + box.width / 2)) * strength);
        rawY.set((e.clientY - (box.top + box.height / 2)) * strength);
    };

    const reset = () => {
        rawX.set(0);
        rawY.set(0);
    };

    if (reduceMotion) return <div className={className}>{children}</div>;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{ x, y }}
            className={className}
        >
            <motion.div style={{ x: innerX, y: innerY }}>{children}</motion.div>
        </motion.div>
    );
};
