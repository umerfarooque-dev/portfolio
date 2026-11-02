import { withPageSeo } from "@/lib/seo";
import { ProjectDetail } from "@/components/organisms/ProjectDetail";
import { shippedProjects } from "@/data/projects";
import { SITE } from "@/data/site";
import { getProjectRow } from "@/lib/site-data";
import { toProject } from "@/lib/db-project";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;
const getProject = async (slug: string) => {
    const row = await getProjectRow(slug);
    return row ? toProject(row) : shippedProjects.find(project => project.id === slug);
};
export function generateStaticParams() { return shippedProjects.map(project => ({ slug: project.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);
    return withPageSeo(project ? { title: `${project.title} | ${SITE.name}`, description: project.tagline || project.description, alternates: { canonical: project.challenge && project.approach ? `/case-studies/${project.id}` : `/work/${project.id}` } } : {});
}
export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) notFound();
    return <ProjectDetail project={project} />;
}
