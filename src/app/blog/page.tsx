import { PageIntro } from "@/components/atoms/PageIntro";
import { BlogCards } from "@/components/organisms/BlogCards";
import { PAGE_CONTENT } from "@/data/page-content";
import { posts } from "@/data/blog";
import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: `Blog | ${SITE.name}`,
    description:
        "Notes on Shopify, WordPress and Laravel development — migrations, performance and the decisions that cost you later.",
    alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
    const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    return <><PageIntro {...PAGE_CONTENT.blog} /><section aria-label={PAGE_CONTENT.blog.label} className="py-[clamp(48px,6vw,96px)]"><div className="shell"><BlogCards posts={sorted} /></div></section></>;
}
