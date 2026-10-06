"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Uncovers its contents as they scroll into view.
 *
 * The image is revealed by animating `clip-path` from the bottom edge upward
 * while the picture itself eases out of a slight scale — so the frame fills
 * rather than the whole block fading in, which is the same idiom the nav
 * overlay and the loader use.
 *
 * Only clip-path and transform animate, so there is no layout work per frame,
 * and reduced-motion visitors get the finished state immediately.
 */
export const MediaReveal = ({
    children,
    className,
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) => {
    const reduceMotion = usePrefersReducedMotion();

    if (reduceMotion) return <div className={className}>{children}</div>;

    return (
        <motion.div
            className={className}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
        >
            <motion.div
                className="h-full w-full"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};
