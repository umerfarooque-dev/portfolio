"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { ProjectImage } from "@/components/atoms/ProjectImage";
import { HOME_CASE_STUDIES } from "@/data/homepage";
import { shippedProjects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const highlights = HOME_CASE_STUDIES.ids.flatMap(id => {
    const project = shippedProjects.find(project => project.id === id);
    return project ? [project] : [];
});

/** The reference's story-and-image carousel, using documented build narratives. */
export const CaseStudyHighlights = () => {
    const [index, setIndex] = useState(0);
    const [manual, setManual] = useState(false);
    const [autoPaused, setAutoPaused] = useState(false);
    const hovered = useRef(false);
    const focused = useRef(false);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const reduced = usePrefersReducedMotion();
    const project = highlights[index];
    useEffect(() => {
        if (reduced || autoPaused || highlights.length < 2) return;
        const timer = window.setInterval(() => {
            if (hovered.current || focused.current || document.hidden) return;
            setManual(false);
            setIndex(current => (current + 1) % highlights.length);
        }, 8000);
        return () => window.clearInterval(timer);
    }, [reduced, autoPaused]);
    if (!project) return null;
    const go = (next: number) => { setManual(true); setIndex((next + highlights.length) % highlights.length); };

    return <section id="case-study-highlights" aria-label={HOME_CASE_STUDIES.label} className="relative py-[var(--spacing-section)]" onMouseEnter={() => { hovered.current = true; }} onMouseLeave={() => { hovered.current = false; }} onFocusCapture={() => { focused.current = true; }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) focused.current = false; }}>
        <div className="shell">
            <AnimatedText as="h2" text={HOME_CASE_STUDIES.title} className="mb-16 max-w-[16ch] text-h2 font-medium" />
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
                <div id="build-story-panel" role="tabpanel" aria-labelledby={`build-story-tab-${index}`} aria-live={manual ? "polite" : "off"}>
                    <AnimatePresence mode="wait" initial={false}><motion.div key={project.id} initial={{ opacity: 0, x: reduced ? 0 : 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : -24 }} transition={{ duration: reduced ? 0 : 0.4 }}>
                        <p className="max-w-[42ch] text-h3 font-medium leading-snug">{project.fullDescription || project.description}</p>
                        <p className="mt-8 font-mono text-label uppercase tracking-wider text-muted">{project.title}</p>
                        <Link href={`/work/${project.id}`} className="mt-5 inline-flex gap-3 font-mono text-label uppercase tracking-wider text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{HOME_CASE_STUDIES.cta}<span aria-hidden="true">→</span></Link>
                    </motion.div></AnimatePresence>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-surface">{highlights.map((item, imageIndex) => <div key={item.id} aria-hidden={imageIndex !== index} className="absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none" style={{ opacity: imageIndex === index ? 1 : 0 }}><ProjectImage src={item.imageUrl} title={item.title} alt={item.title} sizes="(min-width: 1024px) 40vw, 100vw" /></div>)}</div>
            </div>
            <div className="mt-12 flex items-center justify-between gap-6">
                <div role="tablist" aria-label={HOME_CASE_STUDIES.label} className="flex gap-2">{highlights.map((item, tabIndex) => <button key={item.id} ref={element => { tabs.current[tabIndex] = element; }} id={`build-story-tab-${tabIndex}`} role="tab" aria-controls="build-story-panel" aria-selected={index === tabIndex} tabIndex={index === tabIndex ? 0 : -1} aria-label={item.title} onClick={() => go(tabIndex)} onKeyDown={event => {
                    const next = event.key === "ArrowRight" ? (tabIndex + 1) % highlights.length : event.key === "ArrowLeft" ? (tabIndex - 1 + highlights.length) % highlights.length : event.key === "Home" ? 0 : event.key === "End" ? highlights.length - 1 : null;
                    if (next === null) return;
                    event.preventDefault(); go(next); tabs.current[next]?.focus();
                }} className="py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"><span aria-hidden="true" className={`block h-1 rounded-full ${index === tabIndex ? "w-10 bg-accent" : "w-5 bg-line"}`} /></button>)}</div>
                <div className="flex gap-2">{!reduced && <button type="button" aria-label={autoPaused ? HOME_CASE_STUDIES.play : HOME_CASE_STUDIES.pause} aria-pressed={autoPaused} onClick={() => setAutoPaused(value => !value)} className="h-11 w-11 rounded-full border border-line hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"><span aria-hidden="true">{autoPaused ? ">" : "II"}</span></button>}<button type="button" aria-label={HOME_CASE_STUDIES.previous} onClick={() => go(index - 1)} className="h-11 w-11 rounded-full border border-line hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"><span aria-hidden="true">←</span></button><button type="button" aria-label={HOME_CASE_STUDIES.next} onClick={() => go(index + 1)} className="h-11 w-11 rounded-full border border-line hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"><span aria-hidden="true">→</span></button></div>
            </div>
        </div>
    </section>;
};
