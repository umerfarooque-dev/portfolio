import { withPageSeo } from "@/lib/seo";
import { ProjectDetail } from "@/components/organisms/ProjectDetail";
import { SITE } from "@/data/site";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export function generateStaticParams() {
    return caseStudies.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getCaseStudy(slug);
    if (!project) return withPageSeo({ title: "Case study not found" });

    return withPageSeo({
        title: `${project.title} — Case Study | ${SITE.name}`,
        description: project.tagline ?? project.description,
        alternates: { canonical: `/case-studies/${project.id}` },
    });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getCaseStudy(slug);
    if (!project) notFound();
    return <ProjectDetail project={project} />;
}
