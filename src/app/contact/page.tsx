import { ContactSection } from "@/components/organisms/ContactSection";
import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `Contact | ${SITE.name}`,
    description: `Get in touch with ${SITE.name} — ${SITE.role} in ${SITE.location}.`,
    alternates: { canonical: "/contact" },
};

export default function ContactPage() {
    return (
        <div className="pt-24">
            <ContactSection headingAs="h1" />
        </div>
    );
}
