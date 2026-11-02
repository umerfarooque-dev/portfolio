import { withPageSeo } from "@/lib/seo";
import { PageIntro } from "@/components/atoms/PageIntro";
import { ContactSection } from "@/components/organisms/ContactSection";
import { PAGE_CONTENT, REFERENCE_UI } from "@/data/page-content";
import { SITE } from "@/data/site";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = withPageSeo({ title: `Free Website Assessment | ${SITE.name}`, description: PAGE_CONTENT.audit.description, alternates: { canonical: "/free-speed-audit" } });
export default function AssessmentPage() {
    return <><PageIntro {...PAGE_CONTENT.audit} /><section aria-label={REFERENCE_UI.auditStepsHeading} className="bg-surface py-[var(--spacing-section)]"><div className="shell"><h2 className="text-h2 font-medium">{REFERENCE_UI.auditStepsHeading}</h2><ol className="mt-12 grid gap-8 md:grid-cols-3">{REFERENCE_UI.auditSteps.map((step, index) => <li key={step} className="border-t border-line pt-6"><span className="font-mono text-label text-accent">{String(index + 1).padStart(2, "0")}</span><p className="mt-5 text-body leading-relaxed text-muted">{step}</p></li>)}</ol><Link data-contact-trigger data-service="speed-optimization" href="/contact" className="mt-10 inline-flex rounded-full bg-accent px-7 py-4 font-mono text-label uppercase tracking-wider text-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{REFERENCE_UI.auditCta}</Link></div></section><ContactSection /></>;
}
