"use client";

import { animate, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Hero backdrop.
 *
 * Every slide stays mounted; only the incoming one's clip-path changes, so a
 * transition never remounts an <Image> or reflows the section. The incoming
 * slide is revealed behind a soft vertical wave that sweeps left to right,
 * and each slide drifts while on screen (the `drift` keyframe:
 * scale(1.06) translate(-1%) -> scale(1.12) translate(1%, -1%), 16s alternate).
 */

const SLIDE_MS = 4000;
const WIPE_S = 1.2;
const STEPS = 24;
const WAVE_AMPLITUDE = 7; // % of width the wave bulges either side of the edge

/** Vertical wave edge at `progress` (0..1 across the width, plus overshoot). */
const wavePolygon = (progress: number) => {
    const points: string[] = ["0% 0%"];
    for (let i = 0; i <= STEPS; i++) {
        const t = i / STEPS;
        const x = progress * 114 + Math.sin(t * Math.PI * 2) * WAVE_AMPLITUDE * (1 - progress);
        points.push(`${x.toFixed(2)}% ${(t * 100).toFixed(2)}%`);
    }
    points.push("0% 100%");
    return `polygon(${points.join(", ")})`;
};

const FULL = "polygon(0% 0%, 114% 0%, 114% 100%, 0% 100%)";
const EMPTY = wavePolygon(0);

export interface HeroSlideshowProps {
    /** Paths under /public. Falls back to a plain dark field when empty. */
    slides?: string[];
    /** Alt text per slide; decorative by default. */
    alts?: string[];
}

export const HeroSlideshow = ({ slides = [], alts = [] }: HeroSlideshowProps) => {
    const [active, setActive] = useState(0);
    const [incoming, setIncoming] = useState<number | null>(null);
    const [clip, setClip] = useState(EMPTY);
    const reduceMotion = useReducedMotion();
    // The interval below needs the latest index without re-subscribing each
    // time it changes, so it reads through a ref that an effect keeps in sync.
    const activeRef = useRef(active);
    useEffect(() => {
        activeRef.current = active;
    }, [active]);

    useEffect(() => {
        if (reduceMotion || slides.length < 2) return;

        const id = setInterval(() => {
            const next = (activeRef.current + 1) % slides.length;
            setIncoming(next);
            setClip(EMPTY);

            animate(0, 1, {
                duration: WIPE_S,
                ease: [0.76, 0, 0.24, 1],
                onUpdate: (v) => setClip(wavePolygon(v)),
                onComplete: () => {
                    setActive(next);
                    setIncoming(null);
                    setClip(EMPTY);
                },
            });
        }, SLIDE_MS);

        return () => clearInterval(id);
    }, [reduceMotion, slides.length]);

    return (
        <>
            <div aria-hidden="true" className="absolute inset-0 isolate overflow-hidden bg-bg">
                {slides.map((src, i) => {
                    const isActive = i === active;
                    const isIncoming = i === incoming;
                    if (!isActive && !isIncoming) {
                        // Still mounted (so the browser keeps the decoded image)
                        // but fully clipped away.
                        return (
                            <div key={src} className="absolute inset-0" style={{ opacity: 0, zIndex: 0 }}>
                                <Slide src={src} alt={alts[i] ?? ""} priority={i === 0} reduceMotion={!!reduceMotion} />
                            </div>
                        );
                    }

                    return (
                        <div
                            key={src}
                            className="absolute inset-0"
                            style={{
                                opacity: 1,
                                zIndex: isIncoming ? 2 : 1,
                                clipPath: isIncoming ? clip : FULL,
                            }}
                        >
                            <Slide src={src} alt={alts[i] ?? ""} priority={i === 0} reduceMotion={!!reduceMotion} />
                        </div>
                    );
                })}
            </div>

            <div aria-hidden="true" className="absolute inset-0 bg-bg/45" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        </>
    );
};

const Slide = ({
    src,
    alt,
    priority,
    reduceMotion,
}: {
    src: string;
    alt: string;
    priority: boolean;
    reduceMotion: boolean;
}) => (
    <div
        className={
            reduceMotion
                ? "absolute inset-0"
                : "absolute inset-0 motion-safe:animate-[drift_16s_ease-in-out_infinite_alternate]"
        }
    >
        <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover object-top will-change-transform"
        />
    </div>
);
