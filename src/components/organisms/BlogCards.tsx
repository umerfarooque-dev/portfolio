import { MediaReveal } from "@/components/atoms/MediaReveal";
import { formatDate, type Post } from "@/data/blog";
import { REFERENCE_UI } from "@/data/page-content";
import Image from "next/image";
import Link from "next/link";

/** Shared borderless editorial cards for the blog index and homepage. */
export const BlogCards = ({ posts, preview = false }: { posts: Post[]; preview?: boolean }) => {
    const Heading = preview ? "h3" : "h2";
    return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => <article key={post.slug} className="group min-w-0">
            <Link href={`/blog/${post.slug}`} data-cursor-text="Read" className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                <MediaReveal className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface"><Image src={post.cover} alt="" fill preload={!preview && index === 0} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top transition-transform duration-[1.2s] motion-safe:group-hover:scale-[1.04]" /></MediaReveal>
                <p className="mt-6 flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-wider text-muted"><time dateTime={post.date}>{formatDate(post.date)}</time><span aria-hidden="true">·</span><span>{post.readingMinutes} {REFERENCE_UI.readingTime}</span><span aria-hidden="true">·</span><span className="text-accent">{post.tags[0]}</span></p>
                <Heading className="mt-4 max-w-[30ch] text-h3 font-medium leading-tight transition-colors group-hover:text-accent">{post.title}</Heading>
                <p className="mt-4 text-small leading-relaxed text-muted">{post.excerpt}</p>
                <span className="mt-6 inline-flex gap-2 font-mono text-label uppercase tracking-wider text-accent">{REFERENCE_UI.readArticle}<span aria-hidden="true">→</span></span>
            </Link>
        </article>)}
    </div>
    );
};
