import { AnimatedText } from "@/components/atoms/AnimatedText";
import { BlogCards } from "@/components/organisms/BlogCards";
import { posts } from "@/data/blog";
import { REFERENCE_UI } from "@/data/page-content";
import Link from "next/link";

const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
export const BlogPreviewSection = () => (
    <section id="blog" aria-label={REFERENCE_UI.blogTitle} className="relative pb-12 pt-[var(--spacing-section)]">
        <div className="shell">
            <header className="flex flex-col items-center text-center">
                <p className="font-mono text-label uppercase tracking-wider text-muted">{REFERENCE_UI.blogLabel}</p>
                <AnimatedText as="h2" text={REFERENCE_UI.blogTitle} className="mt-6 max-w-[20ch] text-h2 font-medium" />
                <p className="mt-6 max-w-[52ch] text-body text-muted">{REFERENCE_UI.blogDescription}</p>
            </header>
            <div className="mt-16"><BlogCards posts={latest} preview /></div>
            <div className="mt-12 flex justify-center"><Link href="/blog" className="font-mono text-label uppercase tracking-wider text-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{REFERENCE_UI.allPosts} <span aria-hidden="true">→</span></Link></div>
        </div>
    </section>
);
