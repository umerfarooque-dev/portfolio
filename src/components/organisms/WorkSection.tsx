"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { ScrollRevealText } from "@/components/atoms/ScrollRevealText";
import { PROJECT_GROUPS, getProjectGroup, shippedProjects, type ProjectGroup } from "@/data/projects";
import { EASE_OUT } from "@/lib/motion";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ProjectImage } from "@/components/atoms/ProjectImage";
import Link from "next/link";
import { MouseEvent, useMemo, useState } from "react";

const PREVIEW_W = 340;
const PREVIEW_H = 240;

export const WorkSection = () => {
    const [hovered, setHovered] = useState<number | null>(null);
    const [group, setGroup] = useState<ProjectGroup | "all">("all");

    const counts = useMemo(() => {
        const c: Record<string, number> = { all: shippedProjects.length, shopify: 0, wordpress: 0, custom: 0 };
        shippedProjects.forEach((p) => { c[getProjectGroup(p)] += 1; });
        return c;
    }, []);

    const featured = useMemo(
        () => (group === "all" ? shippedProjects : shippedProjects.filter((p) => getProjectGroup(p) === group)).slice(0, 10),
        [group]
    );

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
        <section id="work" aria-label="Selected work" className="relative py-[var(--spacing-section)]">
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

                <div className="mb-10 flex flex-wrap gap-2">
                    {[{ id: "all" as const, label: "All" }, ...PROJECT_GROUPS].map((tab) => {
                        const isActive = group === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => {
                                    setGroup(tab.id);
                                    setHovered(null);
                                }}
                                aria-pressed={isActive}
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-label uppercase tracking-wider transition-colors duration-[var(--duration-normal)] ${
                                    isActive
                                        ? "border-accent bg-accent text-bg"
                                        : "border-line text-muted hover:border-accent hover:text-accent"
                                }`}
                            >
                                {tab.label}
                                <span className={isActive ? "text-bg/60" : "text-muted/60"}>{counts[tab.id]}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="relative" onMouseMove={handleMove}>
                    {/* Cursor-following preview (desktop only) */}
                    <motion.div
                        aria-hidden="true"
                        style={{ x, y, width: PREVIEW_W, height: PREVIEW_H }}
                        animate={{ opacity: hovered !== null ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        className="pointer-events-none absolute left-0 top-0 z-20 hidden overflow-hidden rounded-sm md:block"
                    >
                        {featured.map((project, i) => (
                            // Stacked and cross-faded by opacity, so switching rows
                            // never re-requests an image that is already decoded.
                            <div
                                key={project.id}
                                className="absolute inset-0 transition-opacity duration-[var(--duration-fast)]"
                                style={{ opacity: hovered === i ? 1 : 0 }}
                            >
                                <ProjectImage
                                    src={project.imageUrl}
                                    title={project.title}
                                    alt=""
                                    sizes="340px"
                                />
                            </div>
                        ))}
                    </motion.div>

                    <motion.ul layout className="relative border-t border-line">
                        {featured.map((project, i) => (
                            <motion.li layout key={project.id} className="border-b border-line">
                                <Link
                                    href={`/projects/${project.id}`}
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                                    onFocus={() => setHovered(i)}
                                    onBlur={() => setHovered((h) => (h === i ? null : h))}
                                    className="group flex items-center gap-4 py-8 md:gap-8 md:py-10"
                                >
                                    <span className="font-mono text-label uppercase tracking-wider text-accent">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <span className="flex-1 text-h3 font-medium transition-colors group-hover:text-accent">
                                        {project.title}
                                    </span>

                                    <span className="hidden max-w-[28ch] text-small text-muted lg:block">
                                        {project.description}
                                    </span>

                                    <span className="hidden rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted sm:inline-flex">
                                        {project.role || project.category || "Web"}
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
