import { withPageSeo } from "@/lib/seo";
import { AboutPageBody } from "@/components/organisms/AboutPageBody";
import { JsonLd } from "@/components/atoms/JsonLd";
import { profileStructuredData } from "@/lib/structured-data";
import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = withPageSeo({
    title: `About | ${SITE.name}`,
    description: `${SITE.role} in ${SITE.location} with ${SITE.experienceYears} years building WordPress, Shopify and Laravel sites for e-commerce, SaaS and corporate teams.`,
    alternates: { canonical: "/about" },
});

export const revalidate = 60;

export default async function AboutPage() {
    return <><JsonLd data={profileStructuredData} /><AboutPageBody /></>;
}
