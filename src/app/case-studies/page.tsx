import { AnimatedText } from "@/components/atoms/AnimatedText";
import { caseStudies } from "@/lib/case-studies";
import { SITE } from "@/data/site";
import type { Metadata } from "next";
import { ProjectImage } from "@/components/atoms/ProjectImage";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: `Case Studies | ${SITE.name}`,
    description:
        "What was actually wrong, what changed, and what it was built with — on live Shopify, WordPress and Laravel projects.",
    alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
    return (
        <>
            <header className="w-full max-w-full overflow-hidden pb-[clamp(48px,6vw,96px)] pt-40 md:pt-56">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <AnimatedText
                        as="span"
                        immediate
                        text="Case studies"
                        className="mb-8 block font-mono uppercase tracking-wider text-muted"
                    />
                    <AnimatedText
                        as="h1"
                        immediate
                        delay={0.1}
                        text="What was wrong, and what changed."
                        className="max-w-[16ch] text-balance text-h1 font-medium"
                    />
                    <AnimatedText
                        as="p"
                        immediate
                        muted
                        delay={0.25}
                        text="Not a gallery. Each one covers the problem the client actually had, the decision taken, and what it was built with."
                        className="mt-8 max-w-[56ch] text-muted"
                    />
                </div>
            </header>

            <section aria-label="Case studies" className="border-t border-line py-[clamp(48px,6vw,96px)]">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2">
                        {caseStudies.map((project, i) => {
                            const wide = i < 2;
                            return (
                                <article
                                    key={project.id}
                                    className={`group relative ${wide ? "md:col-span-2" : ""}`}
                                >
                                    <Link
                                        href={`/case-studies/${project.id}`}
                                        data-cursor-text="Case study"
                                        className="block focus-visible:outline-offset-8"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line bg-surface">
                                            <ProjectImage
                                        src={project.imageUrl}
                                        title={project.title}
                                        alt={`${project.title} — ${project.category ?? "web build"}`}
                                        sizes={wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                                        className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                                        priority
                                        />
                                            <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
                                                Case study {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                            <div className="max-w-[48ch]">
                                                <h2 className="text-h3 font-medium transition-colors group-hover:text-accent">
                                                    {project.title}
                                                </h2>
                                                <p className="mt-3 text-small leading-relaxed text-muted">
                                                    {project.tagline ?? project.description}
                                                </p>
                                            </div>

                                            {project.techStack && project.techStack.length > 0 && (
                                                <ul className="flex shrink-0 flex-wrap gap-2">
                                                    {project.techStack.slice(0, 4).map((tech) => (
                                                        <li
                                                            key={tech}
                                                            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                                                        >
                                                            {tech}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
