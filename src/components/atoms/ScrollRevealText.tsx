"use client";

import { MotionValue, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ElementType, useRef } from "react";

/**
 * Text that fills with colour as it scrolls through the viewport.
 *
 * Each word owns a slice of the container's scroll progress and animates from
 * dim to full over that slice, so the sentence lights up left to right in step
 * with the scroll rather than on a timer. Overlapping the slices keeps the
 * sweep continuous instead of stepping word by word.
 *
 * Only colour and opacity animate, so there is no layout work per frame.
 */

interface ScrollRevealTextProps {
    text: string;
    className?: string;
    as?: ElementType;
    /** Where the sweep starts and ends relative to the viewport. */
    offset?: [string, string];
    /** Colour the words settle on. */
    to?: string;
    /** Colour the words start from. */
    from?: string;
}

export const ScrollRevealText = ({
    text,
    className,
    as = "p",
    offset = ["start 0.85", "start 0.3"],
    to = "var(--color-ink)",
    from = "var(--color-muted)",
}: ScrollRevealTextProps) => {
    const ref = useRef<HTMLElement>(null);
    // motion[as] narrows its ref to one element type; ours stays generic.
    const attachRef = ref as unknown as React.Ref<HTMLParagraphElement>;
    const reduceMotion = useReducedMotion();
    const Component = motion[as as "p"];

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset as never,
    });

    const words = text.split(" ");

    if (reduceMotion) {
        return (
            <Component ref={attachRef} className={className} style={{ color: to }}>
                {text}
            </Component>
        );
    }

    return (
        <Component ref={attachRef} className={className} aria-label={text}>
            {words.map((word, i) => (
                <Word
                    key={`${word}-${i}`}
                    word={word}
                    index={i}
                    total={words.length}
                    progress={scrollYProgress}
                    from={from}
                    to={to}
                    isLast={i === words.length - 1}
                />
            ))}
        </Component>
    );
};

const Word = ({
    word,
    index,
    total,
    progress,
    from,
    to,
    isLast,
}: {
    word: string;
    index: number;
    total: number;
    progress: MotionValue<number>;
    from: string;
    to: string;
    isLast: boolean;
}) => {
    // Slices overlap by half a step so the sweep reads as one motion.
    const step = 1 / total;
    const start = index * step;
    const end = Math.min(1, start + step * 2);

    const color = useTransform(progress, [start, end], [from, to]);
    const opacity = useTransform(progress, [start, end], [0.35, 1]);

    return (
        <motion.span aria-hidden="true" style={{ color, opacity }} className="inline-block">
            {word}
            {isLast ? null : " "}
        </motion.span>
    );
};
