import { servicePages } from "./services-pages";
import { SITE, WORK_EXPERIENCE } from "./site";

export const HOME_HERO = {
    title: `${SITE.role} AI Automation & Web Development`,
    description: "Build web applications and connect the work around them. AI-assisted workflows, API integrations and business automation, alongside Shopify, WordPress, Laravel, React and Next.js development.",
    focus: SITE.focus,
} as const;

export const HOME_SERVICES = {
    label: "Capabilities & Services",
    title: "AI Automation, CRO & Speed Optimization.",
    description: "Connect business tools with AI automation, improve customer journeys with Conversion Rate Optimization, and make websites faster with performance and Core Web Vitals work. Web application, Shopify and WordPress development remain available too.",
    href: "/services",
    allLabel: `View all ${servicePages.length} service hubs`,
    exploreLabel: "Explore",
    platformsLabel: "Build on the platform your business needs",
};

export const HOME_APPROACH = {
    label: `Why work with ${SITE.name.split(" ")[0]}`,
    title: "Direct engineering. From brief to launch.",
    cta: "Get a free proposal",
    href: "/contact",
    cards: [
        { label: "Connected workflows", title: "Your tools, working together", description: "Connect web applications and business tools through APIs, workflow automation and AI-assisted steps, with human review where decisions need it.", symbol: "layers" },
        { label: "Measured before & after", title: "Performance with a baseline", description: "Start with load-time and layout measurements, address what slows the real page, then measure the same templates again after the changes.", symbol: "speed" },
        { label: "Direct communication", title: "Talk to the person building it", description: "You discuss requirements with the developer writing your code. Questions, progress updates and handover come from the same person.", symbol: "message" },
        { label: "Staging first", title: "Review before anything goes live", description: "Changes are prepared on staging and checked before release. Deployments happen in separate steps so a regression can be traced and rolled back.", symbol: "shield" },
        { label: "Clear scope", title: "Know what the quote includes", description: "Scope, delivery steps and assumptions are agreed before work begins. Anything that changes the brief is discussed before it changes the cost.", symbol: "scope" },
    ],
} as const;

export const HOME_CONTACT = {
    label: "Have a project in mind?",
    title: "Send me the site. Let’s find the next step.",
    description: "Share the URL and what you want to improve. The initial assessment is free, and the scope is agreed before any work starts.",
    cta: "Get a free proposal",
    href: "/contact",
    whatsapp: "WhatsApp chat",
};

export const HOME_ABOUT_CONTENT = {
    heading: "Code without a working handover is just a bill.",
    introduction: `${SITE.role} focused on AI automation, connected workflows and web applications. My web-development background includes ${SITE.employer} (${WORK_EXPERIENCE[0].period}) and ${WORK_EXPERIENCE[1].company} (${WORK_EXPERIENCE[1].period}), across storefronts, business applications and API integrations.`,
    supporting: "One person from the brief through to launch. You get commented code, a written summary of what changed, and an editor your team can use without calling me for a copy change.",
} as const;

export const HOME_ABOUT_FACTS = [
    { label: "Focus", value: SITE.focus },
    { label: "Based in", value: SITE.location },
    { label: "Most recent team", value: SITE.employer },
    { label: "Previous team", value: WORK_EXPERIENCE[1].company },
];

export const HOME_CASE_STUDIES = {
    previous: "Previous build story",
    next: "Next build story",
    pause: "Pause build stories",
    play: "Play build stories",
    label: "Selected case studies",
    title: "See what went into the build.",
    description: "The challenge, implementation and handover behind the storefronts. Explore the work in detail.",
    ids: ["sprout-organic", "mia-and-mila", "ox-and-armor"],
    cta: "Explore case study",
    allLabel: "View all case studies",
    href: "/case-studies",
};

export const HOME_PLATFORM_SERVICES = servicePages.filter(service =>
    ["shopify-development", "wordpress-development", "woocommerce-development", "react-development", "nextjs-development", "laravel-development"].includes(service.slug)
);
