import type { Project, ProjectStack } from "@/data/projects";
import type { Project as ProjectRow } from "@prisma/client";

const STACKS: ProjectStack[] = ["laravel", "wordpress", "shopify", "nextjs"];

/**
 * The list columns are stored as JSON strings. A row written by hand — or by an
 * older version of the form — can hold something that is not an array, and an
 * unguarded `JSON.parse` would turn that into a 500 on a public page. Anything
 * unparseable is treated as "not provided".
 */
function parseList(value: string | null): string[] | undefined {
    if (!value) return undefined;
    try {
        const parsed: unknown = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string");
    } catch {
        // Fall through — a malformed column should not take the page down.
    }
    return undefined;
}

const orUndefined = (value: string | null) => value ?? undefined;

/** Remote hosts next.config.ts permits next/image to optimise. */
const ALLOWED_IMAGE_HOSTS = new Set(["res.cloudinary.com"]);

/**
 * next/image throws during render for a host that is not allow-listed, which
 * turns one stale row into a 500 on a public page. Anything we cannot serve is
 * reported as "no image" so the UI shows its designed placeholder instead.
 */
function safeImageUrl(value: string): string {
    if (!value) return "";
    if (value.startsWith("/")) return value;
    try {
        const url = new URL(value);
        if (url.protocol === "https:" && ALLOWED_IMAGE_HOSTS.has(url.hostname)) return value;
    } catch {
        // Not a URL at all.
    }
    return "";
}

/** Maps a database row onto the shape the UI components expect. */
export function toProject(row: ProjectRow): Project {
    const stack = STACKS.find((s) => s === row.stack);

    return {
        // The UI addresses projects by slug; the database id is internal.
        id: row.slug,
        title: row.title,
        description: row.description,
        liveUrl: row.liveUrl,
        imageUrl: safeImageUrl(row.imageUrl),
        stack,
        fullDescription: orUndefined(row.fullDescription),
        category: orUndefined(row.category),
        role: orUndefined(row.role),
        duration: orUndefined(row.duration),
        tags: parseList(row.tags),
        scope: parseList(row.scope),
        techStack: parseList(row.techStack),
        features: parseList(row.features),
        // Gallery entries go through the same host check; an image we cannot
        // serve is dropped rather than left to throw mid-render.
        gallery: parseList(row.gallery)
            ?.map(safeImageUrl)
            .filter(Boolean),
    };
}
