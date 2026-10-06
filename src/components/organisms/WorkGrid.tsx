"use client";

import { MediaReveal } from "@/components/atoms/MediaReveal";
import { PROJECT_GROUPS, getProjectGroup, type Project, type ProjectGroup } from "@/data/projects";
import { EASE_OUT } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectImage } from "@/components/atoms/ProjectImage";
import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * The work index: a two-column grid where the first two entries of each filter
 * run full width, so the page opens on the strongest pieces rather than a
 * uniform wall of thumbnails.
 */
export const WorkGrid = ({ projects }: { projects: Project[] }) => {
    const [group, setGroup] = useState<ProjectGroup | "all">("all");

    const counts = useMemo(() => {
        const c: Record<string, number> = { all: projects.length, shopify: 0, wordpress: 0, custom: 0 };
        projects.forEach((p) => {
            c[getProjectGroup(p)] += 1;
        });
        return c;
    }, [projects]);

    const visible = useMemo(
        () => (group === "all" ? projects : projects.filter((p) => getProjectGroup(p) === group)),
        [group, projects]
    );

    return (
        <>
            <div className="mb-14 flex flex-wrap gap-2">
                {[{ id: "all" as const, label: "All" }, ...PROJECT_GROUPS].map((tab) => {
                    const isActive = group === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setGroup(tab.id)}
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

            <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2">
                <AnimatePresence mode="popLayout" initial={false}>
                    {visible.map((project, i) => {
                        // First two of any filter get the full width.
                        const wide = i < 2;

                        return (
                            <motion.article
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.5, ease: EASE_OUT, delay: Math.min(i, 4) * 0.05 }}
                                className={`group relative overflow-hidden ${wide ? "md:col-span-2" : ""}`}
                            >
                                <Link
                                    href={`/projects/${project.id}`}
                                    data-cursor-text="View"
                                    className="block focus-visible:outline-offset-8"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-surface">
                                        {/* The badge sits outside the reveal so it
                                            is not wiped in with the picture. */}
                                        <MediaReveal className="absolute inset-0">
                                            <ProjectImage
                                                src={project.imageUrl}
                                                title={project.title}
                                                alt={`${project.title} — ${project.category ?? "web build"}`}
                                                sizes={wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                                                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                                                priority
                                            />
                                        </MediaReveal>
                                        {project.category && (
                                            <span className="absolute right-4 top-4 z-10 rounded-full border border-line bg-bg/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
                                                {project.category}
                                            </span>
                                        )}
                                    </div>

                                    {wide ? (
                                        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                            <div className="max-w-[46ch]">
                                                <h3 className="text-h3 font-medium transition-colors group-hover:text-accent">
                                                    {project.title}
                                                </h3>
                                                <p className="mt-2 text-small text-muted">{project.description}</p>
                                            </div>
                                            <TagList tags={project.tags} className="shrink-0" />
                                        </div>
                                    ) : (
                                        <div className="mt-6 flex flex-col gap-3">
                                            <h3 className="text-h3 font-medium transition-colors group-hover:text-accent">
                                                {project.title}
                                            </h3>
                                            <p className="text-small text-muted">{project.description}</p>
                                            <TagList tags={project.tags} className="pt-1" />
                                        </div>
                                    )}

                                    {/* Metrics only where the project actually has them. */}
                                    {project.results && project.results.length > 0 && (
                                        <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-4 border-t border-line pt-6">
                                            {project.results.map((result) => (
                                                <div key={result.label}>
                                                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                                                        {result.label}
                                                    </dt>
                                                    <dd className="mt-1 text-h3 font-medium text-accent">
                                                        {result.value}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    )}
                                </Link>
                            </motion.article>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {visible.length === 0 && (
                <p className="py-20 text-center text-small text-muted">Nothing in this group yet.</p>
            )}
        </>
    );
};

const TagList = ({ tags, className = "" }: { tags?: string[]; className?: string }) => {
    if (!tags?.length) return null;
    return (
        <ul className={`flex max-w-full flex-wrap gap-2 ${className}`}>
            {tags.slice(0, 3).map((tag) => (
                <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                >
                    {tag}
                </li>
            ))}
        </ul>
    );
};
