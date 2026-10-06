"use client";

import { EASE_OUT_CSS, ScrollTrigger, gsap } from "@/lib/gsap";
import { ElementType, useLayoutEffect, useRef } from "react";

/**
 * Word-by-word reveal driven by GSAP: each word lifts 28px and un-blurs from
 * 12px. The blur is what gives the headlines their "developing" feel — a plain
 * fade reads as generic.
 *
 * The whole string stays on `aria-label` and every word is aria-hidden, so
 * screen readers get one clean sentence instead of a stream of fragments.
 * `data-animate` is what the no-JS stylesheet in the document head targets.
 */

interface AnimatedTextProps {
    text: string;
    className?: string;
    as?: ElementType;
    /** Index from which trailing words are painted in the accent colour. */
    accentFrom?: number;
    /** Muted body copy rather than a headline. */
    muted?: boolean;
    /** Animate on mount instead of on scroll. */
    immediate?: boolean;
    delay?: number;
}

export const AnimatedText = ({
    text,
    className,
    as = "div",
    accentFrom,
    muted = false,
    immediate = false,
    delay = 0,
}: AnimatedTextProps) => {
    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const words = el.querySelectorAll("[data-word]");
            if (!words.length) return;

            // Reduced motion: show the text, skip the movement.
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                gsap.set(el, { opacity: 1 });
                gsap.set(words, { y: 0, opacity: 1, filter: "none" });
                return;
            }

            gsap.set(el, { opacity: 1 });

            const tween = gsap.fromTo(
                words,
                { y: 28, opacity: 0, filter: "blur(12px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    ease: EASE_OUT_CSS,
                    stagger: 0.035,
                    delay,
                    paused: !immediate,
                }
            );

            if (!immediate) {
                ScrollTrigger.create({
                    trigger: el,
                    start: "top 85%",
                    once: true,
                    onEnter: () => tween.play(),
                });
            }
        }, el);

        return () => ctx.revert();
    }, [text, immediate, delay]);

    const words = text.split(" ");
    const Tag = as as ElementType;

    return (
        <Tag
            ref={ref}
            className={className}
            data-animate="true"
            aria-label={text}
            // Hidden until GSAP takes over; the noscript rule forces it visible.
            style={{ opacity: 0 }}
        >
            {words.map((word, i) => (
                <span
                    key={`${word}-${i}`}
                    data-word
                    aria-hidden="true"
                    className="relative inline-block"
                    style={
                        accentFrom !== undefined && i >= accentFrom
                            ? { color: "var(--color-accent)" }
                            : muted
                              ? { color: "var(--color-muted)" }
                              : undefined
                    }
                >
                    {word}
                    {i < words.length - 1 ? " " : null}
                </span>
            ))}
        </Tag>
    );
};
