import { SITE } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";

/**
 * Site-wide 404.
 *
 * Catches unmatched URLs and every `notFound()` call in the dynamic routes.
 * Without this file those all fell through to Next's unstyled default, which
 * looks like a different website.
 *
 * Styled with the current design system (near-black + the single lime accent),
 * not the legacy gradient one — see docs/DESIGN_SYSTEM.md.
 */
export const metadata: Metadata = {
    title: `Page not found | ${SITE.name}`,
    robots: { index: false, follow: true },
};

const LINKS = [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Case studies" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export default function NotFound() {
    return (
        <section className="flex min-h-[70svh] items-center py-[var(--spacing-section)]">
            <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <p className="font-mono text-label uppercase tracking-wider text-accent">
                    Error 404
                </p>

                <h1 className="mt-6 max-w-[18ch] text-balance text-h1 font-medium">
                    That page does not exist.
                </h1>

                <p className="mt-8 max-w-[52ch] text-body leading-relaxed text-muted">
                    The link may be out of date, or the page may have moved. Everything below is
                    still where it should be.
                </p>

                <nav aria-label="Main sections" className="mt-12 flex flex-wrap gap-3">
                    {LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-label uppercase tracking-wider transition-colors hover:border-accent hover:text-accent"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <Link
                    href="/"
                    className="mt-12 inline-flex items-center gap-2 font-mono text-label uppercase tracking-wider text-accent"
                >
                    Back to home
                    <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </section>
    );
}
