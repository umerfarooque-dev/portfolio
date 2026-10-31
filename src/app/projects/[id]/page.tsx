import { ProjectDetail } from "@/components/organisms/ProjectDetail";
import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { getProjectRow } from "@/lib/site-data";
import { toProject } from "@/lib/db-project";
import { projects as staticProjects } from "@/data/projects";
import { notFound } from "next/navigation";


export const revalidate = 60;

/**
 * Without this every project detail page served the site-wide default title, so
 * all of them competed with each other and with the home page in search results.
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const row = await getProjectRow(id);
    const project = row ? toProject(row) : staticProjects.find((p) => p.id === id);

    if (!project) {
        return { title: `Project not found | ${SITE.name}`, robots: { index: false, follow: true } };
    }

    const description = project.tagline || project.description;

    return {
        title: `${project.title} | ${SITE.name}`,
        description,
        alternates: { canonical: project.challenge && project.approach ? `/case-studies/${project.id}` : `/work/${project.id}` },
        openGraph: {
            title: `${project.title} | ${SITE.name}`,
            description,
            url: `/projects/${project.id}`,
            type: "article",
            ...(project.imageUrl ? { images: [{ url: project.imageUrl }] } : {}),
        },
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const row = await getProjectRow(id);
    const project = row ? toProject(row) : staticProjects.find(project => project.id === id && !project.id.includes("placeholder"));
    if (!project) notFound();
    return <ProjectDetail project={project} />;
}
