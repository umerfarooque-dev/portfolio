/**
 * Identity used across the site chrome, based on the CV and user corrections.
 */
export const SITE = {
    name: "Umer Farooque",
    shortName: "Umer",
    role: "Software Engineer",
    focus: "AI Automation",
    tagline: "Software Engineer focused on AI automation, workflow integrations and web applications. Connecting APIs and business tools alongside WordPress, Shopify, Laravel, React and Next.js development.",
    socialSummary: "AI automation, connected workflows and web applications built around your business.",
    availability: "Available for new opportunities",
    email: "00.umer786@gmail.com",
    whatsapp: "923003024283",
    phoneLabel: "+92 300 302 4283",
    location: "Karachi, Pakistan",
    since: "2024",
    employer: "MGN Ventures",
    timeZoneLabel: "GMT+5",
    timeZone: "Asia/Karachi",
    upwork: "https://www.upwork.com/freelancers/~01967ca04dd52b6730",
    github: "https://github.com/umerfarooque00786",
    linkedin: "https://www.linkedin.com/in/umer-farooq-296252272",
    resumeUrl: "/resume/Umer-Farooque-Resume.pdf",
} as const;

/** Employment history confirmed by the user, newest first. */
export const WORK_EXPERIENCE = [
    {
        company: SITE.employer,
        role: "Web Developer",
        period: "Apr 2026 – Aug 2026",
        startMonthApproximate: true,
        lastWorkingDay: "2026-08-24",
        status: "Previous",
        location: SITE.location,
        responsibilities: [
            "Worked on website development, customization, maintenance and troubleshooting.",
            "Developed responsive interfaces and enhanced website functionality.",
            "Supported CMS-based development and performance improvements.",
        ],
    },
    {
        company: "Tafsol Technology Pvt. Ltd.",
        role: "Web Developer / Front-End Developer",
        period: "Jan 2024 – Apr 2026",
        status: "Previous",
        location: SITE.location,
        responsibilities: [
            "Developed and maintained 50+ WordPress websites.",
            "Built custom WordPress themes, plugins and WooCommerce solutions.",
            "Developed PHP/Laravel applications with MySQL databases.",
            "Integrated third-party APIs and payment gateways.",
            "Improved website performance, responsiveness and user experience.",
            "Worked with modern frontend technologies, including React.js and Next.js.",
        ],
    },
] as const;

export const FOOTER_CONTENT = {
    wordmark: "Umer",
    pitch: `${SITE.role} focused on AI automation, connected workflows and web applications.`,
    invitation: "Let’s make an impact together.",
    availability: SITE.availability,
    copyright: "All rights reserved.",
} as const;

export const PROJECT_IMAGE_CONTENT = { unavailable: "Preview unavailable" } as const;
export const LOADER_COPY = { label: "Loading portfolio", name: SITE.name } as const;

/**
 * Absolute origin for canonical URLs, Open Graph and the sitemap.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment. The fallback only exists so a
 * local build works; it is not a substitute for setting the variable, because a
 * wrong origin here silently poisons every canonical link.
 */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://umerfarooque-dev.vercel.app"
).replace(/\/+$/, "");

/** The three-up label rows across the top of the hero. */
export const HERO_LABEL_ROWS: string[][] = [
    ["AI Automation", "API Integrations", "Workflow Automation"],
    ["React.js & Next.js", "WordPress & Shopify", "Laravel"],
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
            { name: "AI Automation", href: "/services/ai-automation" },
            { name: "CRO", href: "/services/conversion-rate-optimization" },
            { name: "Speed Optimization", href: "/services/speed-optimization" },
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
            { name: "Showcase", href: "/showcase" },
            { name: "Blog", href: "/blog" },
            { name: "About", href: "/about" },
            { name: "Free Assessment", href: "/free-speed-audit" },
            { name: "Contact", href: "/contact" },
        ],
    },
    {
        heading: "Locations",
        links: [
            { name: "Karachi", href: "/contact" },
            { name: "Pakistan", href: "/contact" },
            { name: "United Kingdom", href: "/contact" },
            { name: "United States", href: "/contact" },
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
            { name: "Resume", href: SITE.resumeUrl, external: true },
        ],
    },
];
