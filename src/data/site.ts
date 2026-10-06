/**
 * Identity used across the site chrome. Everything here comes from the CV, so
 * nothing on the site claims more experience or a different role than the CV does.
 */
export const SITE = {
    name: "Umer Farooque",
    role: "Full-Stack Web Developer",
    tagline: "3 years of experience in WordPress, Shopify and Laravel. Production sites for e-commerce, SaaS and corporate teams.",
    experienceYears: 3,
    email: "00.umer786@gmail.com",
    whatsapp: "923003024283",
    phoneLabel: "+92 300 302 4283",
    location: "Karachi, Pakistan",
    since: "2024",
    employer: "Tafsol Technology Pvt. Ltd.",
    timeZoneLabel: "GMT+5",
    timeZone: "Asia/Karachi",
    upwork: "https://www.upwork.com/freelancers/~01967ca04dd52b6730",
    github: "https://github.com/umerfarooque00786",
    linkedin: "https://www.linkedin.com/in/umer-farooq-296252272",
} as const;

/** The three-up label rows across the top of the hero. */
export const HERO_LABEL_ROWS: string[][] = [
    ["WordPress", "Shopify", "Laravel"],
    ["React.js & Next.js", "Payment integrations", "Core Web Vitals"],
];

export interface FooterLink {
    name: string;
    href: string;
    external?: boolean;
}

export interface FooterColumn {
    heading: string;
    links: FooterLink[];
    /** Renders each item with a leading dot, like the social column. */
    dotted?: boolean;
}

/** Footer columns, mirroring the reference layout: three across, two rows. */
export const FOOTER_COLUMNS: FooterColumn[] = [
    {
        heading: "Services",
        links: [
            { name: "Shopify Development", href: "/services/shopify-development" },
            { name: "E-Commerce Development", href: "/services/ecommerce-development" },
            { name: "Web Development", href: "/services/web-development" },
            { name: "WordPress Development", href: "/services/wordpress-development" },
            { name: "WooCommerce Development", href: "/services/woocommerce-development" },
            { name: "React Development", href: "/services/react-development" },
            { name: "Next.js Development", href: "/services/nextjs-development" },
            { name: "Laravel Development", href: "/services/laravel-development" },
        ],
    },
    {
        heading: "Migrations",
        links: [
            { name: "WooCommerce to Shopify", href: "/services/woocommerce-to-shopify-migration" },
            { name: "WordPress to Shopify", href: "/services/wordpress-to-shopify-migration" },
            { name: "Wix to Shopify", href: "/services/wix-to-shopify-migration" },
            { name: "Squarespace to Shopify", href: "/services/squarespace-to-shopify-migration" },
            { name: "Magento to Shopify", href: "/services/magento-to-shopify-migration" },
        ],
    },
    {
        heading: "Industries",
        links: [
            { name: "E-Commerce", href: "/work" },
            { name: "SaaS", href: "/work" },
            { name: "Corporate", href: "/work" },
        ],
    },
    {
        heading: "Menu",
        links: [
            { name: "Home", href: "/" },
            { name: "Work", href: "/work" },
            { name: "Services", href: "/services" },
            { name: "Showcase", href: "/#showcase" },
            { name: "Case Studies", href: "/case-studies" },
            { name: "Blog", href: "/blog" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/#contact" },
        ],
    },
    {
        heading: "Locations",
        links: [
            { name: "Karachi", href: "/#contact" },
            { name: "Pakistan", href: "/#contact" },
            { name: "United Kingdom", href: "/#contact" },
            { name: "United States", href: "/#contact" },
        ],
    },
    {
        heading: "Stay in touch",
        dotted: true,
        links: [
            { name: "WhatsApp", href: `https://wa.me/${SITE.whatsapp}`, external: true },
            { name: "Upwork", href: SITE.upwork, external: true },
            { name: "GitHub", href: SITE.github, external: true },
            { name: "LinkedIn", href: SITE.linkedin, external: true },
            { name: "Resume", href: "/resume/Umer-Farooque-Resume.pdf", external: true },
        ],
    },
];
