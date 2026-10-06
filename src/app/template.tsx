"use client";

import { motion } from "framer-motion";
import { pageVariants } from "@/lib/motion";

/**
 * Wraps every route so navigation fades and lifts rather than snapping.
 *
 * This is a template rather than a layout on purpose: Next remounts a template
 * on each navigation, which is what re-fires the entrance animation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div variants={pageVariants} initial="hidden" animate="visible">
            {children}
        </motion.div>
    );
}
