import { withPageSeo } from "@/lib/seo";
import { PageIntro } from "@/components/atoms/PageIntro";
import { ShowcaseGrid } from "@/components/organisms/ShowcaseGrid";
import { ContactSection } from "@/components/organisms/ContactSection";
import { PAGE_CONTENT } from "@/data/page-content";
import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = withPageSeo({ title: `Showcase | ${SITE.name}`, description: PAGE_CONTENT.showcase.description, alternates: { canonical: "/showcase" } });
export default function ShowcasePage() { return <><PageIntro {...PAGE_CONTENT.showcase} /><ShowcaseGrid /><ContactSection /></>; }
