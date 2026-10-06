import { toProject } from "@/lib/db-project";
import { prisma } from "@/lib/prisma";
import { shippedProjects, type Project } from "@/data/projects";
import { cache } from "react";

/**
 * Database reads for the two routes that still use one, with the database
 * treated as optional.
 *
 * The real content of this site lives in `src/data/*.ts`. Prisma only provides
 * an override for the `siteContent` row and the legacy `/projects` listing, and
 * the SQLite file it points at is gitignored — so on Vercel there is no database
 * at all. Letting a failed query throw would take the build down, so every read
 * here degrades to the static data instead.
 *
 * Both accessors are wrapped in React `cache`, the documented way to dedupe a
 * non-`fetch` data access, so the layout and the page that both want the site
 * config share one query per render rather than issuing two.
 */

/** The single settings row, or null when there is no reachable database. */
export const getSiteConfig = cache(async () => {
    try {
        return await prisma.siteContent.findUnique({ where: { id: "site-settings" } });
    } catch {
        return null;
    }
});

/**
 * One project row by slug, or null when it does not exist — or when there is no
 * database. Callers fall back to the static catalogue, which is where the
 * Shopify storefronts live anyway.
 */
export const getProjectRow = cache(async (slug: string) => {
    try {
        return await prisma.project.findUnique({ where: { slug } });
    } catch {
        return null;
    }
});

/** DB projects when available, otherwise the same catalogue that powers /work. */
export const getProjects = cache(async (): Promise<Project[]> => {
    try {
        const rows = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
        if (rows.length) return rows.map(toProject);
    } catch {
        // fall through to the static catalogue
    }
    return shippedProjects;
});
