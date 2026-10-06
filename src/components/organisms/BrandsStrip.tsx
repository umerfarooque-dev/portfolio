"use client";

import { projects } from "@/data/projects";
import Link from "next/link";

/**
 * Band under the hero listing the brands built for — one small card each,
 * name over a short qualifier.
 */
const brands = projects
    .filter((p) => !p.id.includes("placeholder"))
    .slice(0, 8)
    .map((p) => ({
        id: p.id,
        name: p.title,
        note: [p.category, p.role].filter(Boolean)[0] ?? "Web build",
    }));

export const BrandsStrip = () => {
    if (brands.length === 0) return null;

    return (
        <section aria-label="Brands built for" className="border-y border-line bg-surface/40 py-14 md:py-18">
            <div className="mx-auto flex w-full max-w-[var(--container-grid)] flex-col gap-4 px-[var(--gutter)]">
                <p className="font-mono text-label uppercase tracking-wider text-muted">
                    Brands &amp; products built for:
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {brands.map((brand) => (
                        <Link
                            key={brand.id}
                            href={`/projects/${brand.id}`}
                            className="group flex flex-col justify-between rounded-sm border border-line/60 bg-surface/30 px-4 py-3 transition-colors hover:border-accent hover:bg-surface"
                        >
                            <span className="text-small font-medium text-ink transition-colors group-hover:text-accent">
                                {brand.name}
                            </span>
                            <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors group-hover:text-accent/80">
                                {brand.note}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
