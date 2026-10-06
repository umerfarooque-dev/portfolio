import type { Transition, Variants } from "framer-motion";

/**
 * Motion values read from the reference site's compiled stylesheet, so timings
 * and curves match rather than approximate:
 *
 *   --duration-fast .2s   --ease-out     cubic-bezier(.16, 1, .3, 1)
 *   --duration-normal .4s --ease-in-out  cubic-bezier(.76, 0, .24, 1)
 *   --duration-slow .8s   --ease-elastic cubic-bezier(.34, 1.56, .64, 1)
 *   --duration-slower 1.2s
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
export const EASE_ELASTIC = [0.34, 1.56, 0.64, 1] as const;

export const DUR = {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    slower: 1.2,
} as const;

export const easeOut: Transition = { duration: DUR.normal, ease: EASE_OUT };
export const easeFast: Transition = { duration: DUR.fast, ease: EASE_OUT };
export const easeSlow: Transition = { duration: DUR.slow, ease: EASE_OUT };

/** Hover/press feedback. */
export const springSnappy: Transition = { duration: DUR.fast, ease: EASE_OUT };

/** Parent that reveals its children one after another. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: stagger, delayChildren } },
});

export const containerVariants: Variants = staggerContainer(0.08);

/** Default entrance for headings and text. */
export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_OUT } },
};

/** Cards enter from a touch further down. */
export const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_OUT } },
    exit: { opacity: 0, y: -12, transition: { duration: DUR.fast, ease: EASE_OUT } },
};

export const popVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: DUR.normal, ease: EASE_ELASTIC } },
};

export const slideIn = (direction: "left" | "right" | "up" | "down" = "up"): Variants => {
    const offset = { left: { x: -32 }, right: { x: 32 }, up: { y: 32 }, down: { y: -32 } }[direction];
    return {
        hidden: { opacity: 0, ...offset },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: DUR.slow, ease: EASE_OUT } },
    };
};

/** Rotating hero keyword: in from below, out upward. */
export const rotatingWordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: DUR.normal, ease: EASE_OUT } },
    exit: { opacity: 0, y: -20, transition: { duration: DUR.normal, ease: EASE_OUT } },
};

/** Page-to-page transition used by app/template.tsx. */
export const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: DUR.normal, ease: EASE_OUT } },
};

/** Scroll-reveal viewport config. */
export const viewportOnce = { once: true, margin: "-100px" } as const;
