import { AnimatedText } from "@/components/atoms/AnimatedText";
import { getProjectStack, projects } from "@/data/projects";
import { SITE } from "@/data/site";
import { getServicePage, servicePages } from "@/data/services-pages";
import type { Metadata } from "next";
import { ProjectImage } from "@/components/atoms/ProjectImage";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export function generateStaticParams() {
    return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const service = getServicePage(slug);
    if (!service) return { title: "Service not found" };

    return {
        title: `${service.name} | ${SITE.name}`,
        description: service.intro,
        alternates: { canonical: `/services/${service.slug}` },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = getServicePage(slug);
    if (!service) notFound();

    const related = projects
        .filter((p) => !p.id.includes("placeholder"))
        .filter((p) => service.relatedStacks.includes(getProjectStack(p)))
        .slice(0, 3);

    const others = servicePages.filter((s) => s.slug !== service.slug).slice(0, 6);

    return (
        <>
            {/* Hero */}
            <header className="w-full max-w-full overflow-hidden pb-[clamp(48px,6vw,96px)] pt-40 md:pt-56">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex flex-wrap items-center gap-2 font-mono text-label uppercase tracking-wider text-muted">
                            <li>
                                <Link href="/services" className="transition-colors hover:text-accent">
                                    Services
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li className="text-accent">{service.name}</li>
                        </ol>
                    </nav>

                    <AnimatedText
                        as="h1"
                        immediate
                        text={service.headline}
                        className="max-w-[18ch] text-balance text-h1 font-medium"
                    />
                    <AnimatedText
                        as="p"
                        immediate
                        muted
                        delay={0.2}
                        text={service.intro}
                        className="mt-8 max-w-[56ch] text-muted"
                    />

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 font-mono uppercase tracking-wider text-bg transition-colors duration-[var(--duration-normal)] hover:bg-ink"
                        >
                            Get a free proposal
                        </Link>
                        <a
                            href={`https://wa.me/${SITE.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-mono uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
                        >
                            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#25D366]" />
                            WhatsApp chat ↗
                        </a>
                    </div>
                </div>
            </header>

            {/* Problem / approach + deliverables */}
            <section aria-label="What this covers" className="border-t border-line bg-surface py-[var(--spacing-section)]">
                <div className="mx-auto grid w-full max-w-[var(--container-grid)] grid-cols-1 gap-14 px-[var(--gutter)] lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        <h2 className="font-mono text-label uppercase tracking-wider text-accent">
                            The problem
                        </h2>
                        <p className="mt-5 max-w-[60ch] text-body leading-relaxed">{service.problem}</p>

                        <h2 className="mt-14 font-mono text-label uppercase tracking-wider text-accent">
                            How I approach it
                        </h2>
                        <p className="mt-5 max-w-[60ch] text-body leading-relaxed text-muted">
                            {service.approach}
                        </p>
                    </div>

                    <div className="lg:col-span-5">
                        <h2 className="font-mono text-label uppercase tracking-wider text-muted">
                            What you get
                        </h2>
                        <ul className="mt-5 divide-y divide-line border-y border-line">
                            {service.deliverables.map((item) => (
                                <li key={item} className="flex gap-4 py-4 text-small">
                                    <span aria-hidden="true" className="text-accent">
                                        ›
                                    </span>
                                    <span className="text-muted">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h2 className="mt-12 font-mono text-label uppercase tracking-wider text-muted">
                            Stack
                        </h2>
                        <ul className="mt-5 flex flex-wrap gap-2">
                            {service.stack.map((tech) => (
                                <li
                                    key={tech}
                                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                                >
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Related work */}
            {related.length > 0 && (
                <section aria-label="Related work" className="relative py-[var(--spacing-section)]">
                    <div className="relative mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                            <AnimatedText as="h2" text="Related work" className="text-h2 font-medium" />
                            <Link
                                href="/work"
                                className="font-mono text-label uppercase tracking-wider text-muted transition-colors hover:text-accent"
                            >
                                All projects →
                            </Link>
                        </div>

                        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((project) => (
                                <article key={project.id} className="group">
                                    <Link href={`/projects/${project.id}`} className="block">
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line bg-surface">
                                            <ProjectImage
                                        src={project.imageUrl}
                                        title={project.title}
                                        alt={`${project.title} screenshot`}
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                                        />
                                        </div>
                                        <h3 className="mt-5 text-h3 font-medium transition-colors group-hover:text-accent">
                                            {project.title}
                                        </h3>
                                        <p className="mt-2 text-small text-muted">{project.description}</p>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Other services */}
            <section aria-label="Other services" className="border-t border-line py-[var(--spacing-section)]">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <h2 className="font-mono text-label uppercase tracking-wider text-muted">
                        Other services
                    </h2>
                    <div className="mt-8 border-t border-line">
                        {others.map((other) => (
                            <Link
                                key={other.slug}
                                href={`/services/${other.slug}`}
                                className="group flex items-center gap-6 border-b border-line py-6"
                            >
                                <span className="flex-1 text-h3 font-medium transition-colors group-hover:text-accent">
                                    {other.name}
                                </span>
                                <span className="hidden max-w-[40ch] text-small text-muted lg:block">
                                    {other.summary}
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="shrink-0 text-muted transition-all duration-[var(--duration-normal)] group-hover:translate-x-1.5 group-hover:text-accent"
                                >
                                    →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
