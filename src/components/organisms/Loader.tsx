"use client";

import { SITE } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Shortest time the panel stays up, so it is never a flicker. */
const MIN_MS = 1400;

/**
 * Page loader.
 *
 * It starts visible in the server-rendered HTML, so the page is covered from
 * the first paint rather than flashing content and then hiding it once React
 * hydrates. The counter tracks how many of the page's images have decoded — a
 * real number, not an animated fake — and a minimum duration keeps it readable
 * when everything is already cached.
 *
 * Reduced-motion users never see it at all, and a `<noscript>` rule hides it
 * entirely when JavaScript never runs.
 */
export const Loader = () => {
    const [dismissed, setDismissed] = useState(false);
    const [progress, setProgress] = useState(0);
    const reduceMotion = usePrefersReducedMotion();
    // Reduced motion skips the panel entirely rather than flashing it.
    const show = !dismissed && !reduceMotion;

    useEffect(() => {
        if (reduceMotion) return;

        const mountedAt = performance.now();
        document.body.style.overflow = "hidden";

        const images = Array.from(document.images);
        const total = images.length || 1;
        let done = images.filter((img) => img.complete).length;

        const report = () => setProgress(Math.min(100, Math.round((done / total) * 100)));
        const bump = () => {
            done += 1;
            report();
        };

        images
            .filter((img) => !img.complete)
            .forEach((img) => {
                img.addEventListener("load", bump, { once: true });
                img.addEventListener("error", bump, { once: true });
            });
        report();

        // Never hold the page hostage to a stalled asset.
        const ceiling = setTimeout(() => setProgress(100), 3000);

        // Poll rather than relying only on events, so an image that finishes
        // between our snapshot and the listener attaching still counts.
        const poll = setInterval(() => {
            const complete = Array.from(document.images).filter((i) => i.complete).length;
            if (complete > done) {
                done = complete;
                report();
            }
        }, 120);

        const finish = () => {
            const elapsed = performance.now() - mountedAt;
            const wait = Math.max(0, MIN_MS - elapsed);
            setTimeout(() => {
                setDismissed(true);
                document.body.style.overflow = "";
            }, wait);
        };

        const watcher = setInterval(() => {
            if (done >= total) {
                clearInterval(watcher);
                finish();
            }
        }, 60);

        return () => {
            clearTimeout(ceiling);
            clearInterval(poll);
            clearInterval(watcher);
            document.body.style.overflow = "";
        };
    }, [reduceMotion]);

    // Once the bar reaches full, close on the same minimum-duration rule.
    useEffect(() => {
        if (progress < 100 || !show) return;
        const id = setTimeout(() => {
            setDismissed(true);
            document.body.style.overflow = "";
        }, 500);
        return () => clearTimeout(id);
    }, [progress, show]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="loader"
                    // The clip-path wipe the nav overlay uses, so the site has one
                    // idiom for "a full-screen panel leaving".
                    initial={false}
                    exit={{ clipPath: "inset(0% 0% 100%)" }}
                    transition={{ duration: 0.9, ease: EASE_OUT }}
                    className="fixed inset-0 z-[200] flex flex-col justify-between bg-bg px-[var(--gutter)] py-8"
                    role="status"
                    aria-live="polite"
                    aria-label="Loading"
                    data-loader
                >
                    <span className="font-mono text-label uppercase tracking-wider text-muted">
                        {SITE.name}
                    </span>

                    <div>
                        <div className="flex items-end justify-between gap-6">
                            <span className="max-w-[24ch] font-mono text-label uppercase tracking-wider text-muted">
                                {SITE.role}
                            </span>
                            <span className="text-h1 font-medium leading-none tabular-nums">
                                {String(progress).padStart(3, "0")}
                            </span>
                        </div>

                        <div className="mt-8 h-px w-full bg-line">
                            <motion.div
                                className="h-full origin-left bg-accent"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: progress / 100 }}
                                transition={{ duration: 0.35, ease: EASE_OUT }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
