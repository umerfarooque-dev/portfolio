import { ProjectsSection } from "@/components/organisms/ProjectsSection";
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
        <div className="pt-24">
            <ProjectsSection projects={projects} />
        </div>
    );
}
