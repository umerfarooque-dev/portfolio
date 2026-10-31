"use client";

import { BrandMark } from "@/components/atoms/BrandMark";
import { LOADER_COPY } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const MIN_MS = 1400;
const MAX_MS = 3000;

/** Centered brand mark, percentage and fine progress line, as in the reference. */
export const Loader = () => {
    const [dismissed, setDismissed] = useState(false);
    const [progress, setProgress] = useState(0);
    const reduceMotion = usePrefersReducedMotion();
    const show = !dismissed && !reduceMotion;

    useEffect(() => {
        if (reduceMotion || dismissed) return;
        const startedAt = performance.now();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        // Lazy below-the-fold images cannot finish while scrolling is locked.
        // Track only initially requested assets, and keep a hard exit deadline.
        const images = Array.from(document.images).filter(image => image.loading !== "lazy");
        const update = () => {
            const elapsed = performance.now() - startedAt;
            const loaded = images.filter(image => image.complete).length;
            const ready = images.length === 0 || loaded === images.length;
            const assetProgress = images.length ? loaded / images.length : 1;
            const display = Math.min(assetProgress, elapsed / MIN_MS);
            setProgress(elapsed >= MAX_MS ? 100 : Math.round(display * 100));
            if ((ready && elapsed >= MIN_MS) || elapsed >= MAX_MS) {
                setProgress(100);
                setDismissed(true);
            }
        };
        const timer = window.setInterval(update, 50);
        const deadline = window.setTimeout(() => { setProgress(100); setDismissed(true); }, MAX_MS);
        return () => {
            window.clearInterval(timer);
            window.clearTimeout(deadline);
            document.body.style.overflow = previousOverflow;
        };
    }, [reduceMotion, dismissed]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div data-loader role="status" aria-label={LOADER_COPY.label} initial={false} exit={{ clipPath: "inset(0% 0% 100%)" }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE_OUT }} className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10 bg-bg">
                    <motion.div aria-hidden="true" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1, rotate: [0, 12, 0] }} transition={{ duration: 1.2, ease: EASE_OUT }}><BrandMark className="h-20 w-20 text-accent" /></motion.div>
                    <div className="flex w-[min(320px,70vw)] flex-col gap-4">
                        <div aria-hidden="true" className="flex items-baseline justify-between gap-5 font-mono text-label uppercase tracking-wider"><span className="text-ink/50">{LOADER_COPY.name}</span><span className="tabular-nums text-accent">{progress}%</span></div>
                        <div aria-hidden="true" className="h-px w-full bg-line"><motion.div className="h-full origin-left bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: progress / 100 }} transition={{ duration: 0.15, ease: EASE_OUT }} /></div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
