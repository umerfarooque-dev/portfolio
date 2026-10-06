/**
 * Static marketing content for the home page. Kept out of the database because
 * it changes at the pace of positioning, not at the pace of the CMS.
 */

export interface Service {
  num: string;
  title: string;
  meta: string;
  description: string;
  /** Bullets shown in the accordion panel. */
  points: string[];
  accent: AccentKey;
}

export type AccentKey = "sapphire" | "emerald" | "violet" | "amber";

export const services: Service[] = [
  {
    num: "01",
    title: "Custom Shopify & Theme Redesign",
    meta: "Custom builds",
    description:
      "Bespoke Shopify 2.0 theme builds and store redesigns engineered from Figma. Pixel-perfect frontends, modular Liquid sections, and fast mobile checkouts built to convert paid traffic.",
    points: [
      "Custom Shopify 2.0 theme architecture",
      "Figma to clean Liquid development",
      "Mobile-first PDP and cart drawers",
      "Commented, documented code handover",
    ],
    accent: "sapphire",
  },
  {
    num: "02",
    title: "Speed Tuning & Core Web Vitals",
    meta: "GTmetrix D → A · LCP < 1.4s",
    description:
      "Stores get slow as apps, tracking tags and unoptimized media accumulate. I audit the real shopper experience, defer render-blocking scripts and prune third-party bloat to reach Grade A speeds.",
    points: [
      "Core Web Vitals field-data audit",
      "Script deferral and app bloat pruning",
      "Responsive image delivery and WebP tuning",
      "Liquid loop and server response refactoring",
    ],
    accent: "emerald",
  },
  {
    num: "03",
    title: "Platform Migrations to Shopify",
    meta: "Zero downtime · 301 redirects",
    description:
      "Move from WooCommerce, WordPress, Wix, Squarespace or Magento to Shopify without losing catalogue structure, customer histories or search rankings.",
    points: [
      "1-to-1 301 URL redirect map for SEO equity",
      "Product catalogue, variants and order transfer",
      "Customer account data migration",
      "Staged cutover with zero live downtime",
    ],
    accent: "violet",
  },
  {
    num: "04",
    title: "Conversion Rate Optimization",
    meta: "UX sprints",
    description:
      "Data-backed UX sprints designed to turn ad clicks into buyers. Faster slide-out cart drawers, high-intent product badges, mobile sticky add-to-cart and streamlined checkout flows.",
    points: [
      "Frictionless slide-out cart drawers",
      "Sticky mobile add-to-cart bars",
      "Device compatibility and variant selectors",
      "Trust badge and social proof integration",
    ],
    accent: "amber",
  },
  {
    num: "05",
    title: "Native Features Without Paid Apps",
    meta: "Zero monthly apps · Liquid 2.0",
    description:
      "Bundles, cross-sells, size charts, lookbooks and alteration options built directly into your theme. Saves hundreds a month in app subscriptions and keeps the data in your orders.",
    points: [
      "Native Shopify 2.0 section blocks",
      "Line item properties for custom items",
      "In-theme bundle and volume discounts",
      "Theme editor controls your team can edit",
    ],
    accent: "sapphire",
  },
  {
    num: "06",
    title: "Ongoing Store Management",
    meta: "Monthly retainer",
    description:
      "A dedicated senior developer on retainer for growing brands. Priority turnaround, new feature launches, bug fixes, campaign landings and continuous monitoring.",
    points: [
      "Priority developer support (under 24h reply)",
      "Continuous speed and health monitoring",
      "Campaign page builds and new features",
      "Monthly performance and CRO audit",
    ],
    accent: "emerald",
  },
];

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Look before quoting",
    description:
      "I go through the store, theme and app footprint before quoting. If the solution you asked for is not the optimal one, that is the cheapest possible moment to say so.",
  },
  {
    num: "02",
    title: "Measure the starting point",
    description:
      "Lighthouse scores, Core Web Vitals field data and customer drop-off points get recorded first. Without a baseline there is no way to prove an improvement actually happened.",
  },
  {
    num: "03",
    title: "Build on a staging theme",
    description:
      "Your live store keeps taking orders the whole time. Nothing publishes until you have reviewed the work and confirmed it behaves the way you expected.",
  },
  {
    num: "04",
    title: "Deploy in stages",
    description:
      "Changes ship in isolated pieces rather than one large release. If something regresses, the specific change responsible can be identified and rolled back on its own.",
  },
  {
    num: "05",
    title: "Hand over properly",
    description:
      "Commented code, a written summary of what changed and why, and theme editor settings your team can adjust. The next developer should not need to call me.",
  },
];

export interface Stat {
  value: string;
  label: string;
}

/**
 * TODO(umer): fill in with your own verified numbers before publishing.
 * The previous values were copied from another developer's site and are not yours.
 */
export const stats: Stat[] = [];

export interface Testimonial {
  brand: string;
  /** What the engagement was. */
  role?: string;
  quote: string;
  /** Traits the client endorsed on Upwork. */
  endorsements?: string[];
  metrics?: Stat[];
}

/**
 * Verbatim client feedback from the Upwork profile. Both are 5-star reviews
 * left by the clients themselves — nothing here is written on their behalf.
 */
export const testimonials: Testimonial[] = [
  {
    brand: "Upwork client",
    role: "Graphic design · Sep–Oct 2020",
    quote:
      "Umer was very professional and prompt. Always keep me updated on how the project was going. If he had questions he made sure to get further clarification versus trying to figure it out on his own. It was pleasure working with Umer.",
    endorsements: ["Professional", "Reliable", "Clear Communicator", "Collaborative"],
    metrics: [{ value: "5.0", label: "Rating" }],
  },
  {
    brand: "Upwork client",
    role: "Logo animation · Sep 2020",
    quote:
      "Umer was really professional. He was efficient and the GIF he prepared for my website were exactly was I looking for. The communication was great and easy. I recommend Umer!",
    endorsements: ["Professional", "Clear Communicator", "Reliable"],
    metrics: [{ value: "5.0", label: "Rating" }],
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "How much does a project cost? ",
    answer:
      "Pricing depends on scope. Once the assessment is done the price is fixed in writing, so it does not move while the work is in progress.",
  },
  {
    question: "How long does it take? ",
    answer:
      "A custom Shopify redesign is typically two to four weeks, marketing sites one to three. You get the timeline and the scope in writing before anything starts.",
  },
  {
    question: "Will my store keep taking orders while you work on it? ",
    answer:
      "Yes. Everything is built on a duplicated staging theme and nothing publishes until you approve it. Changes then release separately so any regression can be isolated to the change that caused it.",
  },
  {
    question: "Do you build features into the theme, or install apps? ",
    answer:
      "Into the theme when that is the better option. Bundles, size guides, quantity breaks and quick view are usually built in rather than rented monthly. Where an app genuinely solves the problem better than custom code, I will tell you to use the app.",
  },
  {
    question: "What do I get at the end, and am I locked into you? ",
    answer:
      "Commented and documented code, a written summary of the changes, and theme editor settings your team controls. The next developer should be able to understand the theme without talking to me first.",
  },
  {
    question: "How does working across time zones actually work? ",
    answer:
      "I am based in Karachi with hours that overlap UK and US mornings. Zoom calls when they help, email and WhatsApp day to day, and a reply inside one working day.",
  },
  {
    question: "What do you need from me to get started? ",
    answer:
      "Your store URL and a short description of what is bothering you. The assessment is free and carries no obligation, and I will say so if I am not the right fit for the job.",
  },
];

export interface FooterGroup {
  heading: string;
  links: { name: string; href: string }[];
}

export const footerGroups: FooterGroup[] = [
  {
    heading: "Services",
    links: [
      { name: "Shopify Development", href: "/#services" },
      { name: "E-Commerce Development", href: "/#services" },
      { name: "Web Development", href: "/#services" },
      { name: "WordPress Development", href: "/#services" },
      { name: "React Development", href: "/#services" },
      { name: "Laravel Development", href: "/#services" },
    ],
  },
  {
    heading: "Migrations",
    links: [
      { name: "WooCommerce to Shopify", href: "/#services" },
      { name: "WordPress to Shopify", href: "/#services" },
      { name: "Wix to Shopify", href: "/#services" },
      { name: "Squarespace to Shopify", href: "/#services" },
      { name: "Magento to Shopify", href: "/#services" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { name: "Fashion & Apparel", href: "/#work" },
      { name: "Consumer Electronics", href: "/#work" },
      { name: "Health & Wellness", href: "/#work" },
      { name: "Publishing", href: "/#work" },
    ],
  },
];
