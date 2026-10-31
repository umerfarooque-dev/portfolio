import { AnimatedText } from "@/components/atoms/AnimatedText";
import { HOME_CONTACT } from "@/data/homepage";
import { SITE } from "@/data/site";

/** Homepage invitation; the complete form is on /contact. */
export const ContactSection = () => (
    <section id="contact" aria-label={HOME_CONTACT.label} className="relative py-[var(--spacing-section)]">
        <div className="shell">
            <AnimatedText as="h2" text={HOME_CONTACT.title} className="max-w-[18ch] text-balance text-h1 font-medium" />
            <p className="mt-7 max-w-[58ch] text-body leading-relaxed text-ink/65">{HOME_CONTACT.description}</p>
            <a href={`mailto:${SITE.email}`} className="mt-9 inline-block max-w-full break-all text-h3 font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{SITE.email}</a>

        </div>
    </section>
);
