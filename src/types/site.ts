/**
 * Shape of the CMS-managed site settings, as consumed by presentational
 * components. Kept loose (all fields optional and nullable) so the same
 * components render fine before the SiteContent row exists.
 */
export type SiteConfig = {
    siteName?: string | null;
    heroTitle?: string | null;
    heroDescription?: string | null;
    heroCtaText?: string | null;
    heroCtaUrl?: string | null;
    aboutTitle?: string | null;
    aboutText1?: string | null;
    aboutText2?: string | null;
    aboutImage?: string | null;
    resumeUrl?: string | null;
    email?: string | null;
    linkedin?: string | null;
    github?: string | null;
    whatsapp?: string | null;
    projectCtaTitle?: string | null;
    projectCtaText?: string | null;
} | null;
