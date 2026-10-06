import fs from "node:fs";
import path from "node:path";

const HERO_DIR = path.join(process.cwd(), "public", "hero");
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Reads the hero backdrop images straight off disk at build time, so dropping
 * files into /public/hero is the whole job — no list to keep in sync.
 * Sorted by filename, which is why they are numbered.
 */
export function getHeroSlides(): string[] {
    try {
        return fs
            .readdirSync(HERO_DIR)
            .filter((f) => IMAGE.test(f))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
            .map((f) => `/hero/${f}`);
    } catch {
        // No folder yet: the hero falls back to a plain dark field.
        return [];
    }
}
