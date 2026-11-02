import { SITE, SITE_URL } from "./site";

export const SEO_CONTENT = {
    title: `${SITE.name} | WordPress, Shopify & Laravel Developer`,
    description: `${SITE.name}, a full-stack web developer in ${SITE.location}. WordPress, Shopify, Laravel, React and Next.js websites, eCommerce and custom applications.`,
    siteName: `${SITE.name} Portfolio`,
    language: "en",
    socialImage: "/opengraph-image",
    breadcrumbLabels: { home: "Home", about: "About", blog: "Blog", services: "Services" },
} as const;

export const PERSON_SCHEMA = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE.name,
    url: `${SITE_URL}/about`,
    jobTitle: SITE.role,
    description: SITE.tagline,
    sameAs: [SITE.github, SITE.linkedin, SITE.upwork],
} as const;

export const WEBSITE_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
        PERSON_SCHEMA,
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: SEO_CONTENT.siteName,
            inLanguage: SEO_CONTENT.language,
            publisher: { "@id": PERSON_SCHEMA["@id"] },
        },
    ],
};
