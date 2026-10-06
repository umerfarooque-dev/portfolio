/**
 * Service pages. Each entry is one route under /services/<slug>.
 *
 * Scope is limited to what the CV actually covers — WordPress, WooCommerce,
 * Shopify, Laravel, React and Next.js — so no page offers a platform that is
 * not backed by real experience.
 */

export interface ServicePage {
    slug: string;
    /** Footer / nav label. */
    name: string;
    /** Page H1. */
    headline: string;
    /** One line under the headline. */
    intro: string;
    /** Short line for the services index card. */
    summary: string;
    /** Group the page belongs to. */
    group: "build" | "migration";
    /** What the client actually receives. */
    deliverables: string[];
    /** The problem this service exists to solve. */
    problem: string;
    /** How it is approached. */
    approach: string;
    /** Stacks whose projects are shown as related work. */
    relatedStacks: ("shopify" | "wordpress" | "nextjs" | "laravel")[];
    /** Technologies listed in the sidebar. */
    stack: string[];
}

export const servicePages: ServicePage[] = [
    {
        slug: "shopify-development",
        name: "Shopify Development",
        group: "build",
        headline: "Custom Shopify storefronts, built in Liquid.",
        intro: "Theme builds and customisations for brands that have outgrown a template.",
        summary: "Custom storefronts, theme customisation and third-party API integrations.",
        problem:
            "A stock theme gets a store live, but it stops being enough the moment the catalogue needs a structure the theme did not anticipate, or the brand needs a page the editor cannot build.",
        approach:
            "I build storefronts as modular Shopify 2.0 sections with schema-driven settings, so your team can compose pages in the theme editor without opening a code file. Everything ships commented and documented.",
        deliverables: [
            "Custom Shopify 2.0 theme or theme customisation",
            "Modular Liquid sections your team can edit",
            "Product and collection page architecture",
            "Third-party API integrations",
            "Mobile-first cart and checkout flow",
            "Commented code and a written handover",
        ],
        relatedStacks: ["shopify"],
        stack: ["Shopify 2.0", "Liquid", "JavaScript", "Shopify Ajax API", "Metafields"],
    },
    {
        slug: "ecommerce-development",
        name: "E-Commerce Development",
        group: "build",
        headline: "Stores that hold up once the traffic arrives.",
        intro: "Shopify and WooCommerce builds with payments, fulfilment and reporting wired in.",
        summary: "Shopify and WooCommerce builds with Stripe and PayPal wired in end to end.",
        problem:
            "Most store problems are not design problems. They are a checkout that drops people, a payment webhook that never fired, or a product model that cannot express what you actually sell.",
        approach:
            "I work back from the order: how it is placed, paid for, recorded and refunded. The storefront is built to serve that, not the other way round.",
        deliverables: [
            "Shopify or WooCommerce storefront build",
            "Stripe and PayPal integration, including webhooks",
            "Checkout, subscription and refund flows",
            "Product and variant data modelling",
            "Order management and reporting hooks",
            "Performance pass before launch",
        ],
        relatedStacks: ["shopify", "wordpress"],
        stack: ["Shopify", "WooCommerce", "Stripe API", "PayPal SDK", "PHP", "MySQL"],
    },
    {
        slug: "wordpress-development",
        name: "WordPress Development",
        group: "build",
        headline: "Custom themes and plugins, not page-builder sprawl.",
        intro: "WordPress builds where the code is yours and the editor experience is deliberate.",
        summary: "Custom themes and plugins built to spec, with an editor your team can actually use.",
        problem:
            "A site assembled from a page builder and fifteen plugins works until it doesn't. It gets slow, it gets fragile, and nobody can tell which plugin owns which piece of the page.",
        approach:
            "I build the theme to the design, and write a plugin when functionality genuinely belongs outside the theme. Content editors get blocks and fields that match how they actually write.",
        deliverables: [
            "Custom WordPress theme built to your design",
            "Custom plugins for functionality that outlives the theme",
            "Reusable blocks and ACF field groups",
            "Editor experience your team can use unassisted",
            "SEO and Core Web Vitals pass",
            "Commented code and documentation",
        ],
        relatedStacks: ["wordpress"],
        stack: ["WordPress", "PHP", "ACF", "MySQL", "JavaScript"],
    },
    {
        slug: "woocommerce-development",
        name: "WooCommerce Development",
        group: "build",
        headline: "WooCommerce stores that stay maintainable.",
        intro: "Product modelling, payment flows and checkout work on WordPress commerce.",
        summary: "Product modelling, payments and checkout work on WordPress commerce.",
        problem:
            "WooCommerce will sell almost anything you can model. The trouble starts when the model is wrong — variations standing in for bundles, or meta fields standing in for a proper data structure.",
        approach:
            "I model the catalogue properly first, then build the storefront and checkout on top of it, with payment integration tested against real webhook payloads rather than assumed.",
        deliverables: [
            "WooCommerce store build or rebuild",
            "Product, variation and bundle modelling",
            "Stripe and PayPal checkout integration",
            "Custom cart and checkout behaviour",
            "Multi-language storefront where needed",
            "Performance and query optimisation",
        ],
        relatedStacks: ["wordpress"],
        stack: ["WooCommerce", "WordPress", "PHP", "Stripe API", "PayPal SDK", "MySQL"],
    },
    {
        slug: "react-development",
        name: "React Development",
        group: "build",
        headline: "React interfaces built as components, not pages.",
        intro: "Single-page applications and interactive interfaces with a component system behind them.",
        summary: "Component-driven interfaces, dashboards and single-page applications.",
        problem:
            "React projects slow down when every screen is built from scratch. The second and third feature take as long as the first because nothing was designed to be reused.",
        approach:
            "I build a small set of components that carry the design system, then compose screens from them. New features get faster rather than slower as the project goes on.",
        deliverables: [
            "Component library matching your design system",
            "Application screens composed from those components",
            "State management and API integration",
            "Authentication and protected routes",
            "Responsive behaviour from mobile up",
            "Accessible, keyboard-navigable interfaces",
        ],
        relatedStacks: ["nextjs"],
        stack: ["React.js", "JavaScript (ES6+)", "REST APIs", "Tailwind CSS", "Bootstrap"],
    },
    {
        slug: "nextjs-development",
        name: "Next.js Development",
        group: "build",
        headline: "Next.js apps that render fast and rank.",
        intro: "Server-rendered React with the routing, data and SEO handled properly.",
        summary: "Server-rendered React with routing, data fetching and SEO handled properly.",
        problem:
            "A client-rendered app can be fast to build and slow to load, and invisible to search. Choosing what renders where is the decision that determines both.",
        approach:
            "I decide per route whether it should be static, server-rendered or client-side, based on how the data actually changes — then build to that rather than defaulting everything to one mode.",
        deliverables: [
            "Next.js App Router application",
            "Static, server and client rendering chosen per route",
            "API routes and REST integration",
            "Authentication and role-based access",
            "Metadata, sitemap and structured data",
            "Core Web Vitals pass before launch",
        ],
        relatedStacks: ["nextjs"],
        stack: ["Next.js", "React.js", "TypeScript", "REST APIs", "Vercel"],
    },
    {
        slug: "laravel-development",
        name: "Laravel Development",
        group: "build",
        headline: "Laravel back ends, dashboards and APIs.",
        intro: "Admin systems, authentication, role-based access and database-driven features.",
        summary: "Admin dashboards, REST APIs, authentication and role-based access control.",
        problem:
            "The admin side is where most business logic ends up living, and it is usually the part that gets the least design attention — until the team using it every day stops trusting it.",
        approach:
            "I build the data model and the permission model first, because retrofitting roles onto a system that assumed one kind of user is the expensive version of this work.",
        deliverables: [
            "Laravel application or admin dashboard",
            "REST API with documented endpoints",
            "Authentication and role-based access control",
            "MySQL schema design and query optimisation",
            "Payment and third-party service integration",
            "Deployment and environment setup",
        ],
        relatedStacks: ["laravel"],
        stack: ["Laravel", "PHP", "MySQL", "REST APIs", "Stripe API"],
    },
    {
        slug: "web-development",
        name: "Web Development",
        group: "build",
        headline: "Marketing sites and web apps, end to end.",
        intro: "From a brochure site to a full-stack application, on whichever stack fits the job.",
        summary: "Marketing sites and full-stack applications, on whichever stack fits the job.",
        problem:
            "The platform question usually gets answered by whoever is quoting rather than by what the project needs. A site your team updates weekly has different requirements from an application with users and permissions.",
        approach:
            "I pick the stack from how the site will be used and maintained — WordPress where content is the product, Laravel or Next.js where behaviour is — and say so before quoting.",
        deliverables: [
            "Platform recommendation with the reasoning written down",
            "Responsive front end from your design",
            "Back end, database and integrations as needed",
            "SEO, performance and accessibility pass",
            "Deployment and handover",
            "Optional ongoing maintenance",
        ],
        relatedStacks: ["nextjs", "laravel", "wordpress"],
        stack: ["WordPress", "Laravel", "Next.js", "React.js", "MySQL"],
    },

    // --- Migrations ---
    {
        slug: "woocommerce-to-shopify-migration",
        name: "WooCommerce to Shopify",
        group: "migration",
        headline: "WooCommerce to Shopify, without losing the catalogue.",
        intro: "Products, variants, customers and search rankings carried across intact.",
        summary: "Products, variants, customers and rankings moved across without downtime.",
        problem:
            "WooCommerce and Shopify model products differently. A naive export flattens variations, drops meta and breaks every product URL you have ever earned a link to.",
        approach:
            "I map the catalogue structure before moving anything, then build a one-to-one 301 redirect map so the SEO equity follows the products to their new URLs.",
        deliverables: [
            "Catalogue, variant and inventory migration",
            "Customer and order history transfer",
            "One-to-one 301 redirect map",
            "Theme build or port on Shopify",
            "Payment and shipping reconfiguration",
            "Staged cutover with no live downtime",
        ],
        relatedStacks: ["shopify", "wordpress"],
        stack: ["Shopify", "WooCommerce", "Liquid", "PHP", "CSV / API import"],
    },
    {
        slug: "wordpress-to-shopify-migration",
        name: "WordPress to Shopify",
        group: "migration",
        headline: "WordPress to Shopify, content and all.",
        intro: "Pages, posts and URL structure moved across alongside the store.",
        summary: "Pages, posts and URL structure moved across alongside the store.",
        problem:
            "Content sites carry years of posts and internal links. Moving the store is straightforward next to keeping that content addressable at the same URLs.",
        approach:
            "I audit what actually earns traffic first, migrate that deliberately, and redirect the rest rather than recreating pages nobody visits.",
        deliverables: [
            "Content audit before anything moves",
            "Pages and blog content migration",
            "One-to-one 301 redirect map",
            "Shopify theme build",
            "Metadata and structured data carried over",
            "Staged cutover with no live downtime",
        ],
        relatedStacks: ["shopify", "wordpress"],
        stack: ["Shopify", "WordPress", "Liquid", "PHP"],
    },
    {
        slug: "wix-to-shopify-migration",
        name: "Wix to Shopify",
        group: "migration",
        headline: "Wix to Shopify, off the closed platform.",
        intro: "Getting your catalogue and content out of Wix and onto a store you control.",
        summary: "Catalogue and content out of a closed platform and onto one you control.",
        problem:
            "Wix gives you limited export, so a migration is partly reconstruction. The catalogue has to be rebuilt from what can be extracted rather than lifted wholesale.",
        approach:
            "I extract everything the platform will release, rebuild what it will not, and treat the redirect map as a deliverable rather than an afterthought.",
        deliverables: [
            "Catalogue extraction and rebuild",
            "Content and media migration",
            "One-to-one 301 redirect map",
            "Shopify theme build",
            "Payment and shipping setup",
            "Staged cutover with no live downtime",
        ],
        relatedStacks: ["shopify"],
        stack: ["Shopify", "Wix", "Liquid", "CSV / API import"],
    },
    {
        slug: "squarespace-to-shopify-migration",
        name: "Squarespace to Shopify",
        group: "migration",
        headline: "Squarespace to Shopify, with the design intact.",
        intro: "Moving to a commerce-first platform without losing what the site looked like.",
        summary: "A commerce-first platform, without losing the design you already have.",
        problem:
            "Squarespace sites are usually chosen for the design. The reason to leave is commerce, and the fear is that the new store will look worse than the old site.",
        approach:
            "I rebuild the design as a custom Shopify theme rather than fitting the brand into a stock one, so the move is a gain in capability and not a loss in appearance.",
        deliverables: [
            "Catalogue and customer migration",
            "Custom Shopify theme matching the existing design",
            "Content and media migration",
            "One-to-one 301 redirect map",
            "Payment and shipping setup",
            "Staged cutover with no live downtime",
        ],
        relatedStacks: ["shopify"],
        stack: ["Shopify", "Squarespace", "Liquid", "CSV / API import"],
    },
    {
        slug: "magento-to-shopify-migration",
        name: "Magento to Shopify",
        group: "migration",
        headline: "Magento to Shopify, minus the maintenance burden.",
        intro: "Large catalogues moved onto a platform that does not need a server team.",
        summary: "Large catalogues onto a platform that does not need a server team.",
        problem:
            "Magento is powerful and expensive to keep running. The catalogues are usually large and deeply structured, which is exactly what makes a careless migration dangerous.",
        approach:
            "I map attribute sets and category structures onto Shopify's model explicitly, and migrate in batches that can be verified before the next one runs.",
        deliverables: [
            "Attribute and category structure mapping",
            "Batched catalogue migration with verification",
            "Customer and order history transfer",
            "One-to-one 301 redirect map",
            "Shopify theme build",
            "Staged cutover with no live downtime",
        ],
        relatedStacks: ["shopify"],
        stack: ["Shopify", "Magento", "Liquid", "CSV / API import"],
    },
];

export const getServicePage = (slug: string) => servicePages.find((s) => s.slug === slug);
