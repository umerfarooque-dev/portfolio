import { servicePages } from "./services-pages";
import { SITE, WORK_EXPERIENCE } from "./site";

export const HOME_SERVICES = {
    label: "Capabilities & Services",
    title: "Engineered for revenue, built for speed.",
    description: "Six specialisms covering custom builds, performance, migrations and ongoing improvements—plus WordPress, Laravel, React and Next.js development.",
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
        { label: "Across your stack", title: "Storefront to back office", description: "Shopify and WordPress on the storefront, Laravel for business logic, and React or Next.js for custom interfaces. The build follows your requirements.", symbol: "layers" },
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
    introduction: `Approximately ${SITE.experienceYears} years building responsive websites, eCommerce platforms and custom web applications. Most recently a ${WORK_EXPERIENCE[0].role} at ${SITE.employer} (${WORK_EXPERIENCE[0].period}), following my role as ${WORK_EXPERIENCE[1].role} at ${WORK_EXPERIENCE[1].company} (${WORK_EXPERIENCE[1].period}).`,
    supporting: "One person from the brief through to launch. You get commented code, a written summary of what changed, and an editor your team can use without calling me for a copy change.",
} as const;

export const HOME_ABOUT_FACTS = [
    { label: "Experience", value: `Approximately ${SITE.experienceYears} years` },
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
    ids: ["zero-lifestyle", "mia-and-mila", "ox-and-armor"],
    cta: "Explore case study",
    allLabel: "View all case studies",
    href: "/case-studies",
};

export const HOME_PLATFORM_SERVICES = servicePages.filter(service =>
    ["shopify-development", "wordpress-development", "woocommerce-development", "react-development", "nextjs-development", "laravel-development"].includes(service.slug)
);
