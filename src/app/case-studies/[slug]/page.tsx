import { AnimatedText } from "@/components/atoms/AnimatedText";
import { SITE } from "@/data/site";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import type { Metadata } from "next";
import { ProjectImage } from "@/components/atoms/ProjectImage";
import Link from "next/link";
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
    if (!project) return { title: "Case study not found" };

    return {
        title: `${project.title} — Case Study | ${SITE.name}`,
        description: project.tagline ?? project.description,
        alternates: { canonical: `/case-studies/${project.id}` },
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getCaseStudy(slug);
    if (!project) notFound();

    const index = caseStudies.findIndex((p) => p.id === project.id);
    const next = caseStudies[(index + 1) % caseStudies.length];

    const facts = [
        project.role && { label: "Role", value: project.role },
        project.category && { label: "Sector", value: project.category },
        project.duration && { label: "Duration", value: project.duration },
    ].filter(Boolean) as { label: string; value: string }[];

    return (
        <>
            <header className="w-full max-w-full overflow-hidden pb-[clamp(40px,5vw,72px)] pt-40 md:pt-56">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex flex-wrap items-center gap-2 font-mono text-label uppercase tracking-wider text-muted">
                            <li>
                                <Link href="/case-studies" className="transition-colors hover:text-accent">
                                    Case studies
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li className="text-accent">{project.title}</li>
                        </ol>
                    </nav>

                    <AnimatedText
                        as="h1"
                        immediate
                        text={project.title}
                        className="max-w-[16ch] text-balance text-h1 font-medium"
                    />
                    <AnimatedText
                        as="p"
                        immediate
                        muted
                        delay={0.2}
                        text={project.tagline ?? project.description}
                        className="mt-8 max-w-[56ch] text-muted"
                    />

                    {facts.length > 0 && (
                        <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-4">
                            {facts.map((fact) => (
                                <div key={fact.label}>
                                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                                        {fact.label}
                                    </dt>
                                    <dd className="mt-2 text-small text-ink">{fact.value}</dd>
                                </div>
                            ))}
                            {project.liveUrl && project.liveUrl !== "#" && (
                                <div>
                                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                                        Live
                                    </dt>
                                    <dd className="mt-2">
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-small text-accent transition-colors hover:text-ink"
                                        >
                                            Visit site ↗
                                        </a>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    )}
                </div>
            </header>

            {/* Cover */}
            <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-line bg-surface">
                    <ProjectImage
                                        src={project.imageUrl}
                                        title={project.title}
                                        alt={`${project.title} screenshot`}
                                        sizes="100vw"
                                        className="object-cover object-top"
                                        priority
                                        />
                </div>
            </div>

            {/* Narrative */}
            <section aria-label="The work" className="py-[var(--spacing-section)]">
                <div className="mx-auto grid w-full max-w-[var(--container-grid)] grid-cols-1 gap-14 px-[var(--gutter)] lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        {project.challenge && (
                            <>
                                <h2 className="font-mono text-label uppercase tracking-wider text-accent">
                                    The problem
                                </h2>
                                <p className="mt-5 max-w-[60ch] text-body leading-relaxed">
                                    {project.challenge}
                                </p>
                            </>
                        )}

                        {project.approach && (
                            <>
                                <h2 className="mt-14 font-mono text-label uppercase tracking-wider text-accent">
                                    What I did
                                </h2>
                                <p className="mt-5 max-w-[60ch] text-body leading-relaxed text-muted">
                                    {project.approach}
                                </p>
                            </>
                        )}

                        {project.fullDescription && (
                            <>
                                <h2 className="mt-14 font-mono text-label uppercase tracking-wider text-accent">
                                    Context
                                </h2>
                                <p className="mt-5 max-w-[60ch] text-body leading-relaxed text-muted">
                                    {project.fullDescription}
                                </p>
                            </>
                        )}
                    </div>

                    <div className="lg:col-span-5">
                        {project.scope && project.scope.length > 0 && (
                            <>
                                <h2 className="font-mono text-label uppercase tracking-wider text-muted">
                                    Scope
                                </h2>
                                <ul className="mt-5 divide-y divide-line border-y border-line">
                                    {project.scope.map((item) => (
                                        <li key={item} className="flex gap-4 py-4 text-small">
                                            <span aria-hidden="true" className="text-accent">
                                                ›
                                            </span>
                                            <span className="text-muted">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {project.features && project.features.length > 0 && (
                            <>
                                <h2 className="mt-12 font-mono text-label uppercase tracking-wider text-muted">
                                    Built
                                </h2>
                                <ul className="mt-5 divide-y divide-line border-y border-line">
                                    {project.features.map((item) => (
                                        <li key={item} className="flex gap-4 py-4 text-small">
                                            <span aria-hidden="true" className="text-accent">
                                                ›
                                            </span>
                                            <span className="text-muted">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {project.techStack && project.techStack.length > 0 && (
                            <>
                                <h2 className="mt-12 font-mono text-label uppercase tracking-wider text-muted">
                                    Stack
                                </h2>
                                <ul className="mt-5 flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <li
                                            key={tech}
                                            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                                        >
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Next */}
            {next && next.id !== project.id && (
                <section aria-label="Next case study" className="border-t border-line py-[clamp(48px,6vw,96px)]">
                    <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                        <h2 className="font-mono text-label uppercase tracking-wider text-muted">Next</h2>
                        <Link
                            href={`/case-studies/${next.id}`}
                            data-cursor-text="Case study"
                            className="group mt-6 flex items-center gap-6 border-t border-line pt-6"
                        >
                            <span className="flex-1 text-h2 font-medium transition-colors group-hover:text-accent">
                                {next.title}
                            </span>
                            <span
                                aria-hidden="true"
                                className="shrink-0 text-muted transition-all duration-[var(--duration-normal)] group-hover:translate-x-2 group-hover:text-accent"
                            >
                                →
                            </span>
                        </Link>
                    </div>
                </section>
            )}
        </>
    );
}
