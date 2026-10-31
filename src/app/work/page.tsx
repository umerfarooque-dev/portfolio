import { PageIntro } from "@/components/atoms/PageIntro";
import { PAGE_CONTENT } from "@/data/page-content";
import { ContactSection } from "@/components/organisms/ContactSection";
import { WorkGrid } from "@/components/organisms/WorkGrid";
import { shippedProjects } from "@/data/projects";
import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `Work | ${SITE.name}`,
    description: `Live storefronts and applications built by ${SITE.name} — Shopify, WordPress, Laravel and Next.js.`,
    alternates: { canonical: "/work" },
};

export const revalidate = 3600;

export default function WorkPage() {
    return (
        <>
            <PageIntro {...PAGE_CONTENT.work} />

            <section aria-label="Project list" className="relative py-[clamp(48px,6vw,96px)]">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <WorkGrid projects={shippedProjects} />
                </div>
            </section>
            <ContactSection />
        </>
    );
}
