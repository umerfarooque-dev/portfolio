import { ProjectImage } from "@/components/atoms/ProjectImage";
import { showcaseImage, showcaseItems } from "@/data/showcase";
import { shippedProjects } from "@/data/projects";
import { REFERENCE_UI } from "@/data/page-content";

export const ShowcaseGrid = () => (
    <section aria-label={REFERENCE_UI.showcaseLabel} className="py-[clamp(48px,6vw,96px)]">
        <div className="shell grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseItems.map(item => {
                const project = shippedProjects.find(project => project.id === item.project);
                return <article key={item.title} className="group min-w-0">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface"><ProjectImage src={showcaseImage(item)} title={item.title} alt={item.description} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.04]" /></div>
                        <div className="mt-5 flex items-start justify-between gap-4"><div><h2 className="text-small font-medium transition-colors group-hover:text-accent">{item.title}</h2><p className="mt-1 text-small text-muted">{project?.title || item.platform}</p></div><span aria-hidden="true" className="text-accent">↗</span></div>
                        <p className="mt-3 max-w-[44ch] text-small leading-relaxed text-muted">{item.description}</p>
                        <span className="mt-4 inline-block rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{item.platform}</span>
                    </a>
                </article>;
            })}
        </div>
    </section>
);
