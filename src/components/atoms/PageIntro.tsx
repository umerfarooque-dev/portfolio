import { AnimatedText } from "@/components/atoms/AnimatedText";

/** Shared opening rhythm for reference-style index and editorial pages. */
export const PageIntro = ({ label, title, description }: { label: string; title: string; description: string }) => (
    <header className="w-full max-w-full overflow-hidden pb-[clamp(48px,6vw,96px)] pt-40 md:pt-56">
        <div className="shell">
            <AnimatedText as="span" immediate text={label} className="mb-8 block font-mono text-label uppercase tracking-wider text-muted" />
            <AnimatedText as="h1" immediate delay={0.1} text={title} className="max-w-[16ch] text-balance text-h1 font-medium" />
            <AnimatedText as="p" immediate muted delay={0.25} text={description} className="mt-8 max-w-[56ch] text-body leading-relaxed text-muted" />
        </div>
    </header>
);
