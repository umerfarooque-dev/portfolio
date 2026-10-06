"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Accent cursor that trails the pointer and swells into a labelled disc over
 * anything carrying `data-cursor-text`.
 *
 * Position is written to motion values rather than React state, so pointer
 * movement never triggers a render. The native cursor is only hidden while this
 * one is active, and it never activates on touch or coarse pointers — leaving a
 * phone with no visible cursor at all would be a trap.
 */
export const Cursor = () => {
    const finePointer = useMediaQuery("(pointer: fine)");
    const reduceMotion = usePrefersReducedMotion();
    // Never on touch: hiding the native cursor with nothing to replace it is a trap.
    const enabled = finePointer && !reduceMotion;
    const [label, setLabel] = useState<string | null>(null);
    const [pressed, setPressed] = useState(false);
    const [visible, setVisible] = useState(false);

    const rawX = useMotionValue(-100);
    const rawY = useMotionValue(-100);
    const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.35 });
    const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.35 });

    useEffect(() => {
        if (!enabled) return;

        const onMove = (e: PointerEvent) => {
            rawX.set(e.clientX);
            rawY.set(e.clientY);
            setVisible(true);

            const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor-text]");
            setLabel(target?.getAttribute("data-cursor-text") ?? null);
        };

        const onLeave = () => setVisible(false);
        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("pointerup", onUp, { passive: true });
        document.addEventListener("pointerleave", onLeave);

        document.documentElement.classList.add("has-custom-cursor");

        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            document.removeEventListener("pointerleave", onLeave);
            document.documentElement.classList.remove("has-custom-cursor");
        };
    }, [enabled, rawX, rawY]);

    if (!enabled) return null;

    const size = label ? 68 : 12;

    return (
        <motion.div
            aria-hidden="true"
            style={{ x, y }}
            className="pointer-events-none fixed left-0 top-0 z-[100]"
        >
            <motion.div
                animate={{
                    width: size,
                    height: size,
                    opacity: visible ? 1 : 0,
                    scale: pressed ? 0.88 : 1,
                }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center rounded-full bg-accent"
                style={{ marginLeft: -size / 2, marginTop: -size / 2 }}
            >
                {label && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="select-none font-mono text-[9px] uppercase tracking-wider text-bg"
                    >
                        {label}
                    </motion.span>
                )}
            </motion.div>
        </motion.div>
    );
};
