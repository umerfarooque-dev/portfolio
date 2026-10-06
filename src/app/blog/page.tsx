import { AnimatedText } from "@/components/atoms/AnimatedText";
import { MediaReveal } from "@/components/atoms/MediaReveal";
import { formatDate, posts } from "@/data/blog";
import { SITE } from "@/data/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: `Blog | ${SITE.name}`,
    description:
        "Notes on Shopify, WordPress and Laravel development — migrations, performance and the decisions that cost you later.",
    alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
    const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    const [lead, ...rest] = sorted;

    return (
        <>
            <header className="w-full max-w-full overflow-hidden pb-[clamp(48px,6vw,96px)] pt-40 md:pt-56">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <AnimatedText
                        as="span"
                        immediate
                        text="Blog"
                        className="mb-8 block font-mono uppercase tracking-wider text-muted"
                    />
                    <AnimatedText
                        as="h1"
                        immediate
                        delay={0.1}
                        text="Notes from the middle of the build."
                        className="max-w-[16ch] text-balance text-h1 font-medium"
                    />
                    <AnimatedText
                        as="p"
                        immediate
                        muted
                        delay={0.25}
                        text="Things that cost me time on real projects, written down so they cost you less."
                        className="mt-8 max-w-[56ch] text-muted"
                    />
                </div>
            </header>

            <section aria-label="Posts" className="border-t border-line py-[clamp(48px,6vw,96px)]">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    {/* Newest post runs full width */}
                    {lead && (
                        <Link
                            href={`/blog/${lead.slug}`}
                            data-cursor-text="Read"
                            className="group grid grid-cols-1 gap-8 rounded-sm border border-line bg-surface/40 p-4 transition-colors duration-[var(--duration-normal)] hover:border-accent md:grid-cols-2 md:gap-10 md:p-6"
                        >
                            <MediaReveal className="relative aspect-[16/10] overflow-hidden rounded-sm bg-surface">
                                <Image
                                    src={lead.cover}
                                    alt=""
                                    fill
                                    priority
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                                />
                            </MediaReveal>

                            <div className="flex flex-col justify-center px-2 pb-4 md:px-0">
                                <p className="flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                                    <span className="text-accent">Latest</span>
                                    <span aria-hidden="true">·</span>
                                    <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                                    <span aria-hidden="true">·</span>
                                    <span>{lead.readingMinutes} min read</span>
                                </p>

                                <h2 className="mt-5 max-w-[20ch] text-h2 font-medium leading-tight transition-colors group-hover:text-accent">
                                    {lead.title}
                                </h2>

                                <p className="mt-5 max-w-[52ch] text-body leading-relaxed text-muted">
                                    {lead.excerpt}
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
                    )}

                    {/* The rest as cards */}
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {rest.map((post) => (
                            <article key={post.slug} className="group">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    data-cursor-text="Read"
                                    className="flex h-full flex-col rounded-sm border border-line bg-surface/40 p-4 transition-colors duration-[var(--duration-normal)] hover:border-accent"
                                >
                                    <MediaReveal className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
                                        <Image
                                            src={post.cover}
                                            alt=""
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                                        />
                                    </MediaReveal>

                                    <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
                                        <p className="flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                                            <span aria-hidden="true">·</span>
                                            <span>{post.readingMinutes} min read</span>
                                            <span aria-hidden="true">·</span>
                                            <span className="text-accent">{post.tags[0]}</span>
                                        </p>

                                        <h2 className="mt-4 text-h3 font-medium leading-tight transition-colors group-hover:text-accent">
                                            {post.title}
                                        </h2>

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
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
