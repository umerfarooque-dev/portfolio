import { WorkGrid } from "@/components/organisms/WorkGrid";
import { PageIntro } from "@/components/atoms/PageIntro";
import { PAGE_CONTENT } from "@/data/page-content";
import { ContactSection } from "@/components/organisms/ContactSection";
import { SITE } from "@/data/site";
import { getProjects } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `Projects | ${SITE.name}`,
    description:
        "Shopify storefronts, WordPress builds and Laravel applications — each one live and handling real traffic.",
    alternates: { canonical: "/projects" },
};

export const revalidate = 60;

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <>
            <PageIntro {...PAGE_CONTENT.work} />
            <section className="shell py-[clamp(48px,6vw,96px)]"><WorkGrid projects={projects} /></section>
            <ContactSection />
        </>
    );
}
