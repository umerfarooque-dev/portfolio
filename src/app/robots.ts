import { SITE_URL } from "@/data/site";
import type { MetadataRoute } from "next";

/**
 * Everything is public, so the only real job here is advertising the sitemap.
 *
 * `/api/` is disallowed because there is nothing there worth crawling — the one
 * route is a POST-only contact handler.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/api/",
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
