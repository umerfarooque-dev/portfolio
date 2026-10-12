import { ContactPanel } from "@/components/organisms/ContactPanel";
import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `Contact | ${SITE.name}`,
    description: `Get in touch with ${SITE.name} — ${SITE.role} in ${SITE.location}. Free first look at the problem, replies within about 24 hours.`,
    alternates: { canonical: "/contact" },
};

export default function ContactPage() {
    return <ContactPanel />;
}
