import { PageIntro } from "@/components/atoms/PageIntro";
import { PAGE_CONTENT, REFERENCE_UI } from "@/data/page-content";
import { ProcessSection } from "@/components/organisms/ProcessSection";
import { FaqSection } from "@/components/organisms/FaqSection";
import { ContactSection } from "@/components/organisms/ContactSection";
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
    const search = servicePages.filter((s) => s.group === "seo");

    return (
        <>
            <PageIntro {...PAGE_CONTENT.services} />

            <ServiceList heading={REFERENCE_UI.serviceGroups.build} services={builds} startIndex={1} />
            <ServiceList heading={REFERENCE_UI.serviceGroups.migration} services={migrations} startIndex={builds.length + 1} />
            <ServiceList
                heading={REFERENCE_UI.serviceGroups.seo}
                services={search}
                startIndex={builds.length + migrations.length + 1}
            />
            <ProcessSection />
            <FaqSection />
            <ContactSection />
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
    <section aria-label={heading} className="relative py-[clamp(48px,6vw,96px)] even:bg-surface">
        <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
            <h2 className="text-h3 font-medium">{heading}</h2>

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
