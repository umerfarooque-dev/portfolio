import type { Post } from "@/data/blog";
import type { ServicePage } from "@/data/services-pages";
import { PERSON_SCHEMA, SEO_CONTENT } from "@/data/seo";
import { SITE_URL } from "@/data/site";

const absolute = (path: string) => new URL(path, SITE_URL).href;
const breadcrumbs = (items: { name: string; path: string }[]) => ({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem", position: index + 1, name: item.name, item: absolute(item.path),
    })),
});

export const profileStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absolute("/about#profile"),
    url: absolute("/about"),
    mainEntity: PERSON_SCHEMA,
};

export function blogStructuredData(post: Post) {
    const url = absolute(`/blog/${post.slug}`);
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting", "@id": `${url}#article`, url,
                mainEntityOfPage: url,
                headline: post.title, description: post.excerpt,
                image: absolute(post.cover), datePublished: post.date,
                author: PERSON_SCHEMA, inLanguage: SEO_CONTENT.language,
            },
            breadcrumbs([
                { name: SEO_CONTENT.breadcrumbLabels.home, path: "/" },
                { name: SEO_CONTENT.breadcrumbLabels.blog, path: "/blog" },
                { name: post.title, path: `/blog/${post.slug}` },
            ]),
        ],
    };
}

export function serviceStructuredData(service: ServicePage) {
    const url = absolute(`/services/${service.slug}`);
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service", "@id": `${url}#service`, url,
                name: service.name, description: service.intro,
                serviceType: service.name, provider: { "@id": PERSON_SCHEMA["@id"] },
            },
            breadcrumbs([
                { name: SEO_CONTENT.breadcrumbLabels.home, path: "/" },
                { name: SEO_CONTENT.breadcrumbLabels.services, path: "/services" },
                { name: service.name, path: `/services/${service.slug}` },
            ]),
        ],
    };
}
