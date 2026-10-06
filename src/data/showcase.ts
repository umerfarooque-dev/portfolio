/**
 * Storefront sections shipped on live sites.
 *
 * Each entry names a piece of interface and the store it runs on, so the
 * thumbnail is a screenshot of the real site rather than a mockup.
 */

export interface ShowcaseItem {
    /** Caption under the card. */
    title: string;
    /** Alt text / longer description. */
    description: string;
    /** Project id the section is running on — used for the screenshot. */
    project: string;
    /** Live URL the screenshot is taken from. */
    url: string;
    platform: string;
}

export const showcaseItems: ShowcaseItem[] = [
    {
        title: "Mega navigation",
        description: "Multi-column mega menu exposing the full catalogue depth without a click-through.",
        project: "ox-and-armor",
        url: "https://www.oxandarmor.co.uk/",
        platform: "Shopify",
    },
    {
        title: "Product add-ons",
        description: "Line item properties that attach an option to its specific product through checkout.",
        project: "mia-and-mila",
        url: "https://miamilaluxury.com/",
        platform: "Shopify",
    },
    {
        title: "Predictive search",
        description: "Search drawer that returns products as you type, with popular queries surfaced first.",
        project: "zero-lifestyle",
        url: "https://zerolifestyle.co/",
        platform: "Shopify",
    },
    {
        title: "Related collections",
        description: "Release-grouped merchandising so a launch pulls its related products with it.",
        project: "inelia-records",
        url: "https://ineliarecords.com/",
        platform: "Shopify",
    },
    {
        title: "Quick view",
        description: "Ajax quick-view drawer with variant switching, built into the theme rather than rented.",
        project: "gk-technova",
        url: "https://gktechnova.com/",
        platform: "Shopify",
    },
    {
        title: "Multi-language storefront",
        description: "One catalogue serving four EU language markets without duplicating the product records.",
        project: "comforsh",
        url: "https://comforsh.com/",
        platform: "Shopify",
    },
];

/** Screenshot for a showcase card — the project's local cover. */
export const showcaseImage = (item: ShowcaseItem) => `/projects/${item.project}.webp`;

export interface Principle {
    num: string;
    title: string;
    description: string;
}

/** The "how I work" section — what a client is signing up for, stated plainly. */
export const principles: Principle[] = [
    {
        num: "01",
        title: "One person, brief to launch",
        description:
            "No account manager relaying requirements to a developer who never spoke to you. What you describe is what gets built, because the person building it heard you say it.",
    },
    {
        num: "02",
        title: "The honest quote beats the easy one",
        description:
            "If what you asked for is the wrong fix, I say so before quoting rather than after invoicing. That conversation is cheap at the start and expensive at the end.",
    },
    {
        num: "03",
        title: "Your site keeps earning while I work",
        description:
            "Everything is built on staging. Nothing publishes until you have seen it working, and changes ship in isolated pieces so a regression can be traced to one of them.",
    },
    {
        num: "04",
        title: "Being hard to replace is not a business model",
        description:
            "Commented code, a written summary of what changed and why, and an editor your team controls. The next developer should understand the build without calling me.",
    },
];
