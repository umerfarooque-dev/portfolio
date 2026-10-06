"use client";

import { useState } from "react";
import { Container } from "@/components/atoms/Container";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/motion";

type TabId ="all" | "frontend" | "backend" | "cms" | "tools";

const TABS: { id: TabId; label: string }[] = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "cms", label: "CMS & Platforms" },
    { id: "tools", label: "Tools" },
];

/**
 * Icons are served from public/tech, not a CDN.
 *
 * They used to come from cdn.jsdelivr.net, which the Content-Security-Policy in
 * next.config.ts blocks (`img-src 'self' data: blob: https://res.cloudinary.com`),
 * so every logo silently failed in production. Two of them — Shopify and Wix —
 * did not exist in devicon at all and were 403ing regardless.
 *
 * Keeping them local removes the third-party request, the CSP exception and the
 * dependency on an upstream path that can move.
 */
const SKILLS = [
    { name: "Next.js",        icon: "/tech/nextjs.svg",       tabs: ["all", "frontend"] },
    { name: "React",          icon: "/tech/react.svg",         tabs: ["all", "frontend"] },
    { name: "TypeScript",     icon: "/tech/typescript.svg", tabs: ["all", "frontend"] },
    { name: "Tailwind CSS",   icon: "/tech/tailwindcss.svg", tabs: ["all", "frontend"] },
    { name: "JavaScript",     icon: "/tech/javascript.svg", tabs: ["all", "frontend"] },
    { name: "Bootstrap",      icon: "/tech/bootstrap.svg",  tabs: ["all", "frontend"] },
    { name: "Laravel",        icon: "/tech/laravel.svg",       tabs: ["all", "backend"] },
    { name: "PHP",            icon: "/tech/php.svg",              tabs: ["all", "backend"] },
    { name: "MySQL",          icon: "/tech/mysql.svg",          tabs: ["all", "backend"] },
    { name: "Node.js",        icon: "/tech/nodejs.svg",        tabs: ["all", "backend"] },
    { name: "WordPress",      icon: "/tech/wordpress.svg",  tabs: ["all", "cms"] },
    { name: "Shopify",        icon: "/tech/shopify.svg",      tabs: ["all", "cms"] },
    { name: "Wix",            icon: "/tech/wix.svg",              tabs: ["all", "cms"] },
    { name: "Git",            icon: "/tech/git.svg",              tabs: ["all", "tools"] },
    { name: "GitHub",         icon: "/tech/github.svg",        tabs: ["all", "tools"] },
    { name: "Figma",          icon: "/tech/figma.svg",          tabs: ["all", "tools"] },
    { name: "Postman",        icon: "/tech/postman.svg",      tabs: ["all", "tools"] },
    { name: "VS Code",        icon: "/tech/vscode.svg",        tabs: ["all", "tools"] },
];


export const TechStack = () => {
    const [activeTab, setActiveTab] = useState<TabId>("all");
    const filtered = SKILLS.filter((s) => s.tabs.includes(activeTab));

    return (
        <section className="py-24 relative overflow-hidden">
            <Container>
                <div className="mb-12">
                    <span className="t-label text-accent">08 — Tech Stack</span>
                    <h2 className="t-h2 text-ink max-w-xl mt-1">
                        Tools I{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">
                            master
                        </span>
                    </h2>
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                                activeTab === tab.id ? "text-ink" : "text-muted hover:text-ink/75"
                            }`}
                        >
                            {activeTab === tab.id && (
                                <motion.span
                                    layoutId="techTabPill"
                                    className="absolute inset-0 bg-surface border border-line rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4"
                    >
                        {filtered.map((skill) => (
                            <motion.div
                                key={skill.name}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                className="group flex flex-col items-center gap-2 p-3 rounded-sm bg-surface border border-line hover:border-ink/25 hover:bg-surface transition-colors duration-200 cursor-default"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-200"
                                    loading="lazy"
                                />
                                <span className="text-[10px] text-muted font-medium text-center leading-tight">
                                    {skill.name}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </Container>
        </section>
    );
};
