import { AnimatedText } from "@/components/atoms/AnimatedText";
import { WorkGrid } from "@/components/organisms/WorkGrid";
import { shippedProjects } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work | Umer Farooque",
    description:
        "Live storefronts and applications built by Umer Farooque — Shopify, WordPress, Laravel and Next.js.",
};

export const revalidate = 3600;

export default function WorkPage() {
    return (
        <>
            <header className="w-full max-w-full overflow-hidden pb-[clamp(48px,6vw,96px)] pt-40 md:pt-56">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <AnimatedText
                        as="span"
                        immediate
                        text="Selected work"
                        className="mb-8 block font-mono uppercase tracking-wider text-muted"
                    />
                    <AnimatedText
                        as="h1"
                        immediate
                        delay={0.1}
                        text="Sites in production, not in a folder."
                        className="max-w-[16ch] text-balance text-h1 font-medium"
                    />
                    <AnimatedText
                        as="p"
                        immediate
                        muted
                        delay={0.25}
                        text="Every project below is live and handling real traffic. Where there is a case study, it covers what was actually wrong and what changed."
                        className="mt-8 max-w-[56ch] text-muted"
                    />
                </div>
            </header>

            <section aria-label="Project list" className="relative py-[clamp(48px,6vw,96px)]">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <WorkGrid projects={shippedProjects} />
                </div>
            </section>
        </>
    );
}
