import { posts } from "@/data/blog";
import { servicePages } from "@/data/services-pages";
import { SITE_URL } from "@/data/site";
import { caseStudies } from "@/lib/case-studies";
import type { MetadataRoute } from "next";

/**
 * Generated from the same data that generates the routes themselves, so a new
 * post, service or case study appears here without anyone remembering to add it.
 *
 * `/projects` and `/projects/[id]` are deliberately left out: they are the legacy
 * database-backed pages and largely duplicate `/work` and `/case-studies`.
 * Submitting both sets would be asking Google to pick a favourite.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const url = (path: string) => `${SITE_URL}${path}`;

    const landing: MetadataRoute.Sitemap = [
        { url: url("/"), changeFrequency: "monthly", priority: 1 },
        { url: url("/work"), changeFrequency: "monthly", priority: 0.9 },
        { url: url("/services"), changeFrequency: "monthly", priority: 0.9 },
        { url: url("/case-studies"), changeFrequency: "monthly", priority: 0.8 },
        { url: url("/blog"), changeFrequency: "weekly", priority: 0.7 },
        { url: url("/about"), changeFrequency: "yearly", priority: 0.6 },
        { url: url("/contact"), changeFrequency: "yearly", priority: 0.6 },
    ];

    const services: MetadataRoute.Sitemap = servicePages.map((service) => ({
        url: url(`/services/${service.slug}`),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const studies: MetadataRoute.Sitemap = caseStudies.map((project) => ({
        url: url(`/case-studies/${project.id}`),
        changeFrequency: "yearly",
        priority: 0.7,
    }));

    // Posts carry a real date, so they get a real lastModified.
    const articles: MetadataRoute.Sitemap = posts.map((post) => ({
        url: url(`/blog/${post.slug}`),
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.6,
    }));

    return [...landing, ...services, ...studies, ...articles];
}
