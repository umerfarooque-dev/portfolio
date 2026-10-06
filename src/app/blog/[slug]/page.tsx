import { AnimatedText } from "@/components/atoms/AnimatedText";
import { formatDate, getPost, posts, type Block } from "@/data/blog";
import { SITE } from "@/data/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return { title: "Post not found" };

    return {
        title: `${post.title} | ${SITE.name}`,
        description: post.excerpt,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            type: "article",
            title: post.title,
            description: post.excerpt,
            publishedTime: post.date,
        },
    };
}

/** Renders one content block in the site's type scale. */
const Prose = ({ block }: { block: Block }) => {
    switch (block.type) {
        case "h2":
            return <h2 className="mt-16 text-h3 font-medium">{block.text}</h2>;
        case "ul":
            return (
                <ul className="mt-8 divide-y divide-line border-y border-line">
                    {block.items.map((item) => (
                        <li key={item} className="flex gap-4 py-4">
                            <span aria-hidden="true" className="text-accent">
                                ›
                            </span>
                            <span className="text-body text-muted">{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case "quote":
            return (
                <blockquote className="mt-12 border-l-2 border-accent pl-6">
                    <p className="text-h3 font-medium leading-tight">{block.text}</p>
                </blockquote>
            );
        default:
            return <p className="mt-6 text-body leading-relaxed text-muted">{block.text}</p>;
    }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

    return (
        <>
            <header className="w-full max-w-full overflow-hidden pb-[clamp(40px,5vw,72px)] pt-40 md:pt-56">
                <div className="mx-auto w-full max-w-[860px] px-[var(--gutter)]">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex flex-wrap items-center gap-2 font-mono text-label uppercase tracking-wider text-muted">
                            <li>
                                <Link href="/blog" className="transition-colors hover:text-accent">
                                    Blog
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li className="text-accent">{post.tags[0]}</li>
                        </ol>
                    </nav>

                    <AnimatedText
                        as="h1"
                        immediate
                        text={post.title}
                        className="max-w-[20ch] text-balance text-h1 font-medium"
                    />

                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-label uppercase tracking-wider text-muted">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>{post.readingMinutes} min read</span>
                        <span className="text-ink">{SITE.name}</span>
                    </div>
                </div>
            </header>

            <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-line bg-surface">
                    <Image
                        src={post.cover}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-top"
                    />
                </div>
            </div>

            <article className="pt-[clamp(40px,5vw,72px)] pb-[var(--spacing-section)]">
                <div className="mx-auto w-full max-w-[860px] px-[var(--gutter)]">
                    <p className="border-l-2 border-line pl-6 text-body leading-relaxed text-ink">
                        {post.excerpt}
                    </p>

                    {post.body.map((block, i) => (
                        <Prose key={i} block={block} />
                    ))}

                    <ul className="mt-16 flex flex-wrap gap-2 border-t border-line pt-8">
                        {post.tags.map((tag) => (
                            <li
                                key={tag}
                                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 flex flex-wrap items-center gap-4">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 font-mono uppercase tracking-wider text-bg transition-colors hover:bg-ink"
                        >
                            Get a free proposal
                        </Link>
                        <Link
                            href="/blog"
                            className="font-mono text-label uppercase tracking-wider text-muted transition-colors hover:text-accent"
                        >
                            ← All posts
                        </Link>
                    </div>
                </div>
            </article>

            {more.length > 0 && (
                <section aria-label="More posts" className="border-t border-line py-[clamp(48px,6vw,96px)]">
                    <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                        <h2 className="font-mono text-label uppercase tracking-wider text-muted">Keep reading</h2>
                        <div className="mt-8 border-t border-line">
                            {more.map((other) => (
                                <Link
                                    key={other.slug}
                                    href={`/blog/${other.slug}`}
                                    className="group flex items-center gap-6 border-b border-line py-6"
                                >
                                    <span className="flex-1 text-h3 font-medium transition-colors group-hover:text-accent">
                                        {other.title}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="shrink-0 text-muted transition-all duration-[var(--duration-normal)] group-hover:translate-x-1.5 group-hover:text-accent"
                                    >
                                        →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
