"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { ScrollRevealText } from "@/components/atoms/ScrollRevealText";
import { shippedProjects } from "@/data/projects";
import { PROJECT_PREVIEWS } from "@/data/project-previews";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { EASE_OUT } from "@/lib/motion";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ProjectImage } from "@/components/atoms/ProjectImage";
import Link from "next/link";
import { MouseEvent, useEffect, useRef, useState } from "react";

const PREVIEW_W = 340;
const PREVIEW_H = 240;

export const WorkSection = () => {
    const [hovered, setHovered] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [previewsReady, setPreviewsReady] = useState(false);
    const desktopPointer = useMediaQuery("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const reduceMotion = usePrefersReducedMotion();

    // Warm small local captures before the first hover, without competing with
    // the hero or downloading a desktop-only preview on touch devices.
    useEffect(() => {
        const section = sectionRef.current;
        if (!section || !desktopPointer) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setPreviewsReady(true);
                observer.disconnect();
            }
        }, { rootMargin: "600px" });
        observer.observe(section);
        return () => observer.disconnect();
    }, [desktopPointer]);

    const featured = shippedProjects.slice(0, 10);

    // The preview chases the cursor on a spring, so it trails rather than snaps.
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, { stiffness: 260, damping: 30, mass: 0.4 });
    const y = useSpring(rawY, { stiffness: 260, damping: 30, mass: 0.4 });

    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
        const box = e.currentTarget.getBoundingClientRect();
        rawX.set(e.clientX - box.left - PREVIEW_W / 2);
        rawY.set(e.clientY - box.top - PREVIEW_H / 2);
    };

    return (
        <section ref={sectionRef} id="work" aria-label="Selected work" className="relative py-[var(--spacing-section)]">
            <div className="relative mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <header className="relative mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <AnimatedText
                        as="h2"
                        text="Crafting digital experiences with purpose."
                        className="max-w-[18ch] text-h2 font-medium"
                    />
                    <ScrollRevealText
                        text="Live sites across e-commerce, SaaS and publishing. Each one is still in production."
                        className="max-w-[34ch] text-small md:text-right"
                    />
                </header>

                <div className="relative" onMouseMove={handleMove}>
                    {/* Cursor-following preview (desktop only) */}
                    <motion.div
                        aria-hidden="true"
                        style={{ x: reduceMotion ? rawX : x, y: reduceMotion ? rawY : y, width: PREVIEW_W, height: PREVIEW_H }}
                        animate={{ opacity: hovered !== null ? 1 : 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.15, ease: EASE_OUT }}
                        className="pointer-events-none absolute left-0 top-0 z-20 hidden overflow-hidden rounded-sm md:block"
                    >
                        {desktopPointer && previewsReady && featured.map((project, i) => (
                            // Stacked and cross-faded by opacity, so switching rows
                            // never re-requests an image that is already decoded.
                            <div
                                key={project.id}
                                className="absolute inset-0 transition-opacity duration-[var(--duration-fast)] motion-reduce:transition-none"
                                style={{ opacity: hovered === i ? 1 : 0 }}
                            >
                                <ProjectImage
                                    src={PROJECT_PREVIEWS[project.imageUrl]}
                                    title={project.title}
                                    alt=""
                                    sizes="340px"
                                    loading="eager"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </motion.div>

                    <motion.ul layout className="relative border-t border-line">
                        {featured.map((project, i) => (
                            <motion.li layout key={project.id} className="border-b border-line">
                                <Link
                                    href={`/work/${project.id}`}
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                                    onFocus={() => setHovered(i)}
                                    onBlur={() => setHovered((h) => (h === i ? null : h))}
                                    className="group flex items-center gap-4 py-8 md:gap-8 md:py-10"
                                >
                                    <span className="font-mono text-label uppercase tracking-wider text-accent">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <span className="min-w-0 flex-1">
                                        <span className="block text-h3 font-medium transition-colors group-hover:text-accent">{project.title}</span>
                                        <span className="mt-3 block max-w-[65ch] text-small leading-relaxed text-muted">{project.description}</span>
                                        {project.tags?.length ? <span className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-muted">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</span> : null}
                                    </span>

                                    <span
                                        aria-hidden="true"
                                        className="shrink-0 text-muted transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:translate-x-1.5 group-hover:text-accent"
                                    >
                                        →
                                    </span>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <div className="mt-12">
                        <Link
                            href="/work"
                            className="font-mono text-label uppercase tracking-wider text-muted transition-colors hover:text-accent"
                        >
                            View all projects →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
