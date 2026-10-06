import { AnimatedText } from "@/components/atoms/AnimatedText";
import { SITE } from "@/data/site";
import { servicePages } from "@/data/services-pages";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: `Services | ${SITE.name}`,
    description:
        "WordPress, WooCommerce, Shopify, Laravel, React and Next.js development, plus platform migrations to Shopify.",
    alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
    const builds = servicePages.filter((s) => s.group === "build");
    const migrations = servicePages.filter((s) => s.group === "migration");

    return (
        <>
            <header className="w-full max-w-full overflow-hidden pb-[clamp(48px,6vw,96px)] pt-40 md:pt-56">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <AnimatedText
                        as="span"
                        immediate
                        text="Services"
                        className="mb-8 block font-mono uppercase tracking-wider text-muted"
                    />
                    <AnimatedText
                        as="h1"
                        immediate
                        delay={0.1}
                        text="What I build, and what it costs you to find out."
                        className="max-w-[18ch] text-balance text-h1 font-medium"
                    />
                    <AnimatedText
                        as="p"
                        immediate
                        muted
                        delay={0.25}
                        text="The assessment is free. If what you have asked for is the wrong fix, that is the cheapest possible moment for me to say so."
                        className="mt-8 max-w-[56ch] text-muted"
                    />
                </div>
            </header>

            <ServiceList heading="Build" services={builds} startIndex={1} />
            <ServiceList heading="Migrations to Shopify" services={migrations} startIndex={builds.length + 1} />
        </>
    );
}

const ServiceList = ({
    heading,
    services,
    startIndex,
}: {
    heading: string;
    services: typeof servicePages;
    startIndex: number;
}) => (
    <section aria-label={heading} className="border-t border-line py-[clamp(48px,6vw,96px)]">
        <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
            <h2 className="font-mono text-label uppercase tracking-wider text-accent">{heading}</h2>

            <div className="mt-10 border-t border-line">
                {services.map((service, i) => (
                    <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group flex items-center gap-4 border-b border-line py-8 md:gap-8 md:py-10"
                    >
                        <span className="font-mono text-label uppercase tracking-wider text-accent">
                            {String(startIndex + i).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-h3 font-medium transition-colors group-hover:text-accent">
                            {service.name}
                        </span>
                        <span className="hidden max-w-[44ch] text-small text-muted lg:block">
                            {service.summary}
                        </span>
                        <span
                            aria-hidden="true"
                            className="shrink-0 text-muted transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:translate-x-1.5 group-hover:text-accent"
                        >
                            →
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    </section>
);
