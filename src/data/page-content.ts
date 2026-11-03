import { SITE } from "./site";
import { showcaseItems } from "./showcase";

export const PAGE_CONTENT = {
    work: { label: "Selected work", title: "Sites in production, not in a folder.", description: "Storefronts, business websites and applications. Explore the implementation and the decisions behind each build." },
    blog: { label: "Blog", title: "Notes from inside the build.", description: "Practical notes on performance, migrations and development decisions, drawn from the projects in this portfolio." },
    about: { label: `${SITE.role} · ${SITE.location}`, title: "Software that connects the work.", description: "AI automation, connected workflows and web applications, backed by a background in WordPress, Shopify, Laravel, React and Next.js." },
    showcase: { label: `${showcaseItems.length} shipped features`, title: "Sections your team can actually use.", description: "Reusable storefront features from the project catalogue. Explore the live stores and the implementation behind the work." },
    services: { label: "Services", title: "What I build, improve and automate.", description: "AI Automation, Conversion Rate Optimization (CRO) and Speed Optimization lead the services, alongside web applications and storefront development." },
    audit: { label: "Free initial assessment", title: "Find what is slowing the site down.", description: "Send your website URL and the problem you are seeing. We will start with the templates your customers use, then agree what is worth fixing." },
} as const;

export const ABOUT_CONTENT = {
    background: "Background",
    experienceHeading: "Professional experience",
    experienceNote: "MGN Ventures: April 2026 is an approximate start month; the exact joining date is unconfirmed. Last working day: 24 August 2026.",
    paragraphs: [
        SITE.tagline,
        "My focus is connecting web applications and business tools through APIs, workflow automation and AI-assisted steps. Existing web-development work spans custom WordPress themes and plugins, WooCommerce, Shopify, Laravel and modern frontend interfaces.",
        "The handover matters as much as the launch: documented code, an explanation of what changed and a clear path for the next person maintaining the site.",
    ],
    technologiesHeading: "Core technologies",
    technologies: ["WordPress", "Shopify", "WooCommerce", "PHP", "Laravel", "React.js", "Next.js", "JavaScript", "MySQL", "REST APIs", "Elementor Pro", "Tailwind CSS", "Git"],
    workingHeading: "How I work",
    working: [
        { title: "Staging before production", description: "Prepare changes away from the live site, review them together and publish in manageable steps." },
        { title: "Measure the starting point", description: "Record the baseline before performance work and check the same templates after the changes." },
        { title: "A handover you can use", description: "Leave commented code, editing controls and delivery notes so small updates do not need another development task." },
        { title: "A clear scope", description: "Discuss requirements, assumptions and tradeoffs before quoting. If a simpler option fits the problem, it belongs in that conversation." },
    ],
};

export const REFERENCE_UI = {
    showcaseLabel: "Showcase",
    readingTime: "min read",
    serviceApproach: "The approach",
    serviceDeliverables: "What you get",
    blogLabel: "Writing & engineering",
    blogTitle: "Latest from the blog",
    blogDescription: "Notes on storefront architecture, performance and shipping changes with care.",
    whatsapp: "WhatsApp",
    whatsappLabel: `Chat with ${SITE.name} on WhatsApp`,
    faqHeading: "Common questions before kickoff",
    readArticle: "Read article",
    allPosts: "View all posts",
    viewShowcase: "View showcase",
    viewCaseStudy: "Explore the build",
    serviceGroups: { build: "Core services", migration: "Platform migrations", seo: "Search & visibility" },
    serviceGroupDescriptions: { build: "AI automation, connected workflows, web applications and storefront development.", migration: "Plan the move, map the data and keep existing URLs accounted for.", seo: "Technical foundations and specialist search support." },
    auditSteps: ["Share the site URL and your main concern.", "I review the key templates and the likely bottlenecks.", "You receive the next steps before deciding whether to proceed."],
    auditStepsHeading: "What happens next",
    auditCta: "Request an assessment",
};

export const NAVBAR_CONTENT = {
    summary: ["Software engineering & AI automation.", "Web apps, APIs and connected workflows."],
    location: `${SITE.location} — Since ${SITE.since}`,
};

export const PROJECT_DETAIL_COPY = {
    work: "Work", live: "View live site", proposal: "Get a free proposal",
    overview: "Overview", challenge: "The challenge", approach: "The approach",
    scope: "What was delivered", features: "Features", stack: "Built with",
    gallery: "More from the build", related: "More work", role: "Role", sector: "Sector", duration: "Duration", results: "Project results", code: "View source",
};
