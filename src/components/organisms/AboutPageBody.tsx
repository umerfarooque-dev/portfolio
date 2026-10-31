import { PageIntro } from "@/components/atoms/PageIntro";
import { ContactSection } from "@/components/organisms/ContactSection";
import { ABOUT_CONTENT, PAGE_CONTENT } from "@/data/page-content";
import { WORK_EXPERIENCE } from "@/data/site";

/** Editorial about page; the homepage keeps its portrait section. */
export const AboutPageBody = () => (
    <>
        <PageIntro {...PAGE_CONTENT.about} />
        <section aria-label={ABOUT_CONTENT.background} className="py-[var(--spacing-section)]">
            <div className="shell grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
                <h2 className="font-mono text-label uppercase tracking-wider text-accent">{ABOUT_CONTENT.background}</h2>
                <div className="max-w-[66ch] space-y-7 text-body leading-relaxed text-muted">{ABOUT_CONTENT.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
        </section>
        <section aria-labelledby="experience-heading" className="border-t border-line py-[var(--spacing-section)]">
            <div className="shell grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
                <h2 id="experience-heading" className="font-mono text-label uppercase tracking-wider text-accent">{ABOUT_CONTENT.experienceHeading}</h2>
                <div className="min-w-0">
                <ol className="space-y-12">
                    {WORK_EXPERIENCE.map(experience => (
                        <li key={experience.company} className="border-b border-line pb-12 last:border-b-0 last:pb-0">
                            <div className="flex flex-wrap items-center gap-3">
                                <h3 className="text-h3 font-medium">{experience.company}</h3>
                            </div>
                            <p className="mt-4 text-body text-ink">{experience.role}</p>
                            <p className="mt-2 text-small text-muted">{experience.period} · {experience.location} · {experience.status}</p>
                            <ul className="mt-6 list-disc space-y-4 pl-5 text-body leading-relaxed text-muted marker:text-accent">
                                {experience.responsibilities.map(responsibility => <li key={responsibility}>{responsibility}</li>)}
                            </ul>
                        </li>
                    ))}
                </ol>
                <p className="mt-8 text-small leading-relaxed text-muted">{ABOUT_CONTENT.experienceNote}</p>
                </div>
            </div>
        </section>
        <section aria-labelledby="technologies-heading" className="border-t border-line py-[clamp(48px,6vw,96px)]">
            <div className="shell grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
                <h2 id="technologies-heading" className="font-mono text-label uppercase tracking-wider text-accent">{ABOUT_CONTENT.technologiesHeading}</h2>
                <ul className="flex flex-wrap gap-3">{ABOUT_CONTENT.technologies.map(technology => <li key={technology} className="rounded-full border border-line px-4 py-2 text-small text-ink">{technology}</li>)}</ul>
            </div>
        </section>
        <section aria-label={ABOUT_CONTENT.workingHeading} className="bg-surface py-[clamp(48px,6vw,96px)]">
            <div className="shell grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
                <h2 className="font-mono text-label uppercase tracking-wider text-accent">{ABOUT_CONTENT.workingHeading}</h2>
                <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2">{ABOUT_CONTENT.working.map(item => <li key={item.title}><h3 className="text-xl font-medium">{item.title}</h3><p className="mt-4 text-small leading-relaxed text-muted">{item.description}</p></li>)}</ul>
            </div>
        </section>
        <ContactSection />
    </>
);
