import { AnimatedText } from "@/components/atoms/AnimatedText";
import { FooterDots } from "@/components/atoms/FooterDots";
import { ProjectImage } from "@/components/atoms/ProjectImage";
import { ContactSection } from "@/components/organisms/ContactSection";
import { PROJECT_DETAIL_COPY as copy } from "@/data/page-content";
import { shippedProjects, getProjectStack, type Project } from "@/data/projects";
import Link from "next/link";

/** Shared current-system detail presentation for work, case studies and DB projects. */
export const ProjectDetail = ({ project }: { project: Project }) => {
    const facts = [
        { label: copy.role, value: project.role }, { label: copy.sector, value: project.category }, { label: copy.duration, value: project.duration },
    ].filter(fact => fact.value);
    const sections = [
        { label: copy.overview, text: project.fullDescription || project.description },
        { label: copy.challenge, text: project.challenge }, { label: copy.approach, text: project.approach },
    ].filter(section => section.text);
    const related = shippedProjects.filter(item => item.id !== project.id && getProjectStack(item) === getProjectStack(project)).slice(0, 3);

    return <>
        <header className="relative overflow-hidden pb-[clamp(48px,6vw,96px)] pt-32 md:pt-40">
            <FooterDots />
            <div className="shell relative">
                <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 font-mono text-label uppercase tracking-wider text-muted"><Link href="/work" className="hover:text-accent">{copy.work}</Link><span aria-hidden="true">/</span><span className="text-accent">{project.title}</span></nav>
                <AnimatedText as="h1" immediate text={project.title} className="max-w-[18ch] text-balance text-h1 font-medium" />
                <p className="mt-8 max-w-[58ch] text-body leading-relaxed text-muted">{project.tagline || project.description}</p>
                <div className="mt-10 flex flex-wrap gap-4">
                    {/^https?:\/\//.test(project.liveUrl) && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent px-7 py-3.5 font-mono text-label uppercase tracking-wider text-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{copy.live} <span aria-hidden="true">↗</span></a>}
                    {project.codeUrl && /^https?:\/\//.test(project.codeUrl) && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-7 py-3.5 font-mono text-label uppercase tracking-wider hover:border-accent hover:text-accent">{copy.code} <span aria-hidden="true">↗</span></a>}
                    <Link data-contact-trigger href="/contact" className="rounded-full border border-line px-7 py-3.5 font-mono text-label uppercase tracking-wider hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{copy.proposal}</Link>
                </div>
            </div>
        </header>
        <div className="shell"><div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-surface"><ProjectImage src={project.imageUrl} title={project.title} alt={project.title} priority sizes="100vw" /></div></div>
        {facts.length > 0 && <dl className="shell grid grid-cols-1 gap-8 py-10 sm:grid-cols-3">{facts.map(fact => <div key={fact.label} className="border-t border-line pt-5"><dt className="font-mono text-label uppercase tracking-wider text-muted">{fact.label}</dt><dd className="mt-3 text-body">{fact.value}</dd></div>)}</dl>}
        {project.results?.length ? <section aria-label={copy.results} className="py-10"><dl className="shell flex flex-wrap gap-12">{project.results.map(result => <div key={result.label}><dt className="font-mono text-label uppercase tracking-wider text-muted">{result.label}</dt><dd className="mt-3 text-h3 text-accent">{result.value}</dd></div>)}</dl></section> : null}
        {sections.map((section, index) => <section key={section.label} aria-label={section.label} className={`py-[clamp(48px,6vw,96px)] ${index % 2 === 0 ? "bg-surface" : ""}`}><div className="shell grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-16"><h2 className="font-mono text-label uppercase tracking-wider text-accent">{section.label}</h2><p className="max-w-[65ch] text-body leading-relaxed text-muted">{section.text}</p></div></section>)}
        {[
            { label: copy.scope, items: project.scope }, { label: copy.features, items: project.features }, { label: copy.stack, items: project.techStack },
        ].filter(section => section.items?.length).map(section => <section key={section.label} aria-label={section.label} className="border-t border-line py-[clamp(48px,6vw,96px)]"><div className="shell grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-16"><h2 className="font-mono text-label uppercase tracking-wider text-accent">{section.label}</h2><ul className="grid gap-4 text-body leading-relaxed text-muted sm:grid-cols-2">{section.items?.map(item => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-accent">›</span>{item}</li>)}</ul></div></section>)}
        {project.gallery?.length ? <section aria-label={copy.gallery} className="py-[var(--spacing-section)]"><div className="shell grid gap-6 sm:grid-cols-2">{project.gallery.map((src, index) => <div key={`${src}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface"><ProjectImage src={src} title={project.title} alt={`${project.title} ${index + 1}`} sizes="(min-width: 640px) 50vw, 100vw" /></div>)}</div></section> : null}
        <section aria-label={copy.related} className="py-[var(--spacing-section)]"><div className="shell"><h2 className="mb-10 text-h3 font-medium">{copy.related}</h2><div className="grid gap-8 sm:grid-cols-3">{related.map(item => <Link href={`/work/${item.id}`} key={item.id} className="group"><div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface"><ProjectImage src={item.imageUrl} title={item.title} alt="" sizes="(min-width: 640px) 33vw, 100vw" /></div><h3 className="mt-5 text-xl font-medium group-hover:text-accent">{item.title}</h3><p className="mt-3 text-small leading-relaxed text-muted">{item.description}</p></Link>)}</div></div></section>
        <ContactSection />
    </>;
};
