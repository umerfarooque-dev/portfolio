"use client";

import { Container } from "@/components/atoms/Container";
import { SITE } from "@/data/site";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/motion";
import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";


const WhatsAppIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

/** Drops the scheme and `www.` so a URL reads as a handle in the card. */
const asHandle = (url: string) => url.replace(/^https?:\/\//, "").replace(/^www\./, "");

/**
 * Every value here is derived from SITE, so the contact details exist in exactly
 * one place (src/data/site.ts) rather than being restated per component.
 */
const CONTACT_LINKS = [
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, color: "sky" },
    { icon: <WhatsAppIcon />, label: "WhatsApp", value: SITE.phoneLabel, href: `https://wa.me/${SITE.whatsapp}`, color: "emerald" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", value: asHandle(SITE.linkedin), href: SITE.linkedin, color: "blue" },
    { icon: <Github className="h-5 w-5" />, label: "GitHub", value: asHandle(SITE.github), href: SITE.github, color: "purple" },
    { icon: <MapPin className="h-5 w-5" />, label: "Location", value: `${SITE.location} (${SITE.timeZoneLabel})`, href: "#", color: "orange" },
] as const;

const colorMap: Record<string, { icon: string; bg: string }> = {
    sky: { icon: "text-accent", bg: "bg-accent-dim border-sky-500/20" },
    emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    blue: { icon: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    purple: { icon: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
    orange: { icon: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
};

export const ContactSection = () => {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-900/5 to-transparent -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] -z-10" />
            <Container>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
                    <div className="mb-14">
                        <motion.span variants={itemVariants} className="t-label text-accent">07 — Contact</motion.span>
                        <motion.h2 variants={itemVariants} className="t-h2 text-ink max-w-2xl">
                            Ready to build something{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">great?</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-muted mt-3 max-w-xl text-sm">
                            I&apos;m available for freelance contracts and remote work. Drop me a message and I&apos;ll get back to you within 24 hours.
                        </motion.p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Left: Direct Contact Links */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-3">
                            {CONTACT_LINKS.map((link) => {
                                const c = colorMap[link.color];
                                const isStatic = link.href === "#";
                                const content = (
                                    <div className="flex items-center gap-4 p-4 rounded-sm bg-surface border border-line hover:border-ink/25 hover:bg-surface transition-all duration-200 group">
                                        <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border ${c.bg} ${c.icon} group-hover:scale-110 transition-transform duration-200`}>
                                            {link.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-0.5">{link.label}</p>
                                            <p className="text-sm text-ink/75 truncate">{link.value}</p>
                                        </div>
                                        {!isStatic && <ExternalLink className="h-3.5 w-3.5 text-muted ml-auto shrink-0 group-hover:text-muted transition-colors" />}
                                    </div>
                                );
                                return isStatic ? (
                                    <div key={link.label}>{content}</div>
                                ) : (
                                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="block">{content}</a>
                                );
                            })}
                        </motion.div>

                        {/* Right: Contact Form */}
                        <motion.div variants={itemVariants} className="lg:col-span-3">
                            <ContactForm />
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

// Inline form to avoid circular imports
const ContactForm = () => {
    return (
        <form
            className="p-6 md:p-8 rounded-sm bg-surface border border-line space-y-5"
            onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const body = {
                    name: data.get("name"),
                    email: data.get("email"),
                    subject: data.get("subject"),
                    message: data.get("message"),
                };
                const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
                if (res.ok) {
                    form.reset();
                    alert("Message sent! I'll get back to you within 24 hours.");
                } else {
                    alert(`Something went wrong. Please try emailing me directly at ${SITE.email}`);
                }
            }}
        >
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Name</label>
                    <input id="contact-name" name="name" type="text" required placeholder="Your name" className="w-full px-4 py-3 rounded-sm bg-surface border border-line text-sm text-ink placeholder-gray-600 focus:outline-none focus:border-sky-500/40 focus:bg-white/8 transition-all" />
                </div>
                <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Email</label>
                    <input id="contact-email" name="email" type="email" required placeholder="your@email.com" className="w-full px-4 py-3 rounded-sm bg-surface border border-line text-sm text-ink placeholder-gray-600 focus:outline-none focus:border-sky-500/40 focus:bg-white/8 transition-all" />
                </div>
            </div>
            <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Subject</label>
                <input id="contact-subject" name="subject" type="text" placeholder="What is this about? " className="w-full px-4 py-3 rounded-sm bg-surface border border-line text-sm text-ink placeholder-gray-600 focus:outline-none focus:border-sky-500/40 focus:bg-white/8 transition-all" />
            </div>
            <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Message</label>
                <textarea id="contact-message" name="message" rows={5} required placeholder="Tell me about your project..." className="w-full px-4 py-3 rounded-sm bg-surface border border-line text-sm text-ink placeholder-gray-600 focus:outline-none focus:border-sky-500/40 focus:bg-white/8 transition-all resize-none" />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-sm bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-ink font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] active:scale-[0.99]">
                Send Message →
            </button>
        </form>
    );
};
