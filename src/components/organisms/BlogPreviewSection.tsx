"use client";

import { AnimatedText } from "@/components/atoms/AnimatedText";
import { formatDate, posts } from "@/data/blog";
import { cardVariants, containerVariants, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/** Newest three posts, as cards. */
const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

export const BlogPreviewSection = () => {
    if (latest.length === 0) return null;

    return (
        <section
            id="blog"
            aria-label="Latest from the blog"
            className="border-t border-line py-[var(--spacing-section)]"
        >
            <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <header className="flex flex-col items-center text-center">
                    <p className="flex items-center gap-3 font-mono text-label uppercase tracking-wider text-muted">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Writing &amp; engineering
                    </p>

                    <AnimatedText
                        as="h2"
                        text="Latest from the blog"
                        className="mt-6 max-w-[18ch] text-h2 font-medium"
                    />

                    <p className="mt-6 max-w-[52ch] text-body text-muted">
                        Notes on storefront architecture, performance and shipping without breaking what
                        already works.
                    </p>
                </header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {latest.map((post) => (
                        <motion.article key={post.slug} variants={cardVariants} className="group">
                            <Link
                                href={`/blog/${post.slug}`}
                                data-cursor-text="Read"
                                className="flex h-full flex-col rounded-sm border border-line bg-surface/40 p-4 transition-colors duration-[var(--duration-normal)] hover:border-accent focus-visible:outline-offset-4"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
                                    <Image
                                        src={post.cover}
                                        alt=""
                                        fill
                                        sizes="(min-width: 768px) 33vw, 100vw"
                                        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
                                    <p className="flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                                        <span aria-hidden="true">·</span>
                                        <span>{post.readingMinutes} min read</span>
                                        <span aria-hidden="true">·</span>
                                        <span className="text-accent">{post.tags[0]}</span>
                                    </p>

                                    <h3 className="mt-4 text-h3 font-medium leading-tight transition-colors group-hover:text-accent">
                                        {post.title}
                                    </h3>

                                    <p className="mt-4 text-small leading-relaxed text-muted">
                                        {post.excerpt}
                                    </p>

                                    <span className="mt-8 inline-flex items-center gap-2 font-mono text-label uppercase tracking-wider text-accent">
                                        Read article
                                        <span
                                            aria-hidden="true"
                                            className="transition-transform duration-[var(--duration-normal)] group-hover:translate-x-1.5"
                                        >
                                            →
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>

                <div className="mt-14 flex justify-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-mono uppercase tracking-wider text-ink transition-colors duration-[var(--duration-normal)] hover:border-accent hover:text-accent"
                    >
                        All posts →
                    </Link>
                </div>
            </div>
        </section>
    );
};
