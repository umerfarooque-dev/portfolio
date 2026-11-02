import type { Metadata } from "next";
import { SEO_CONTENT } from "@/data/seo";
import { SITE_URL } from "@/data/site";

/** Keep route-specific share previews aligned with each canonical page. */
export function withPageSeo(metadata: Metadata): Metadata {
    const canonical = metadata.alternates?.canonical;
    if (typeof canonical !== "string") return metadata;
    const title = typeof metadata.title === "string" ? metadata.title : SEO_CONTENT.title;
    const description = metadata.description ?? SEO_CONTENT.description;
    const openGraph = metadata.openGraph ?? {};
    return {
        ...metadata,
        openGraph: {
            type: "website",
            siteName: SEO_CONTENT.siteName,
            images: [{ url: new URL(SEO_CONTENT.socialImage, SITE_URL).href, width: 1200, height: 630, alt: SEO_CONTENT.title }],
            ...openGraph,
            title,
            description,
            url: new URL(canonical, SITE_URL).href,
        },
        twitter: { card: "summary_large_image", title, description, images: [new URL(SEO_CONTENT.socialImage, SITE_URL).href], ...metadata.twitter },
    };
}
