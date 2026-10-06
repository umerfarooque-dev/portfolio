/**
 * Blog posts.
 *
 * Bodies are plain paragraphs and headings rather than raw HTML, so the
 * renderer stays in the design system and nothing can inject markup.
 */

export type Block =
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "quote"; text: string };

export interface Post {
    slug: string;
    title: string;
    excerpt: string;
    /** Card image — the screenshot of the project the post is about. */
    cover: string;
    /** ISO date. */
    date: string;
    readingMinutes: number;
    tags: string[];
    body: Block[];
}

export const posts: Post[] = [
    {
        slug: "replacing-a-paid-shopify-app-with-line-item-properties",
        cover: "/projects/mia-and-mila.webp",
        title: "The alterations app that could not name the garment",
        excerpt:
            "A client was paying monthly for an add-on app that took the money and then could not tell fulfilment which product the add-on belonged to.",
        date: "2026-09-04",
        readingMinutes: 6,
        tags: ["Shopify", "Liquid", "Apps"],
        body: [
            {
                type: "p",
                text: "On a luxury ethnic wear store, customers could add alterations to a garment at checkout. The feature worked in the sense that it charged correctly. It did not work in the sense that the order arrived at fulfilment with an alteration line and no way to tell which of the four items in the basket it referred to.",
            },
            { type: "h2", text: "Why the app could not do it" },
            {
                type: "p",
                text: "The app added the alteration as its own cart line. That is the simplest thing to build, and it is why so many add-on apps work this way: a separate line needs no relationship to anything else. It also means the relationship does not exist, so nothing downstream can reconstruct it.",
            },
            {
                type: "p",
                text: "The team had been working around it by cross-referencing timestamps. That works until two people order in the same minute.",
            },
            { type: "h2", text: "Line item properties are the right primitive" },
            {
                type: "p",
                text: "Shopify lets you attach arbitrary key-value pairs to a cart line. They travel with that line through checkout, into the order, and out to whatever reads orders. The alteration stops being a separate purchase and becomes a property of the garment being purchased.",
            },
            {
                type: "ul",
                items: [
                    "The option renders on the product form, so it is scoped to that product by construction",
                    "Pricing is handled with a variant or a draft order rather than a second line",
                    "Fulfilment sees the alteration on the item it belongs to",
                    "Nothing is rented monthly and nothing loads on pages that do not need it",
                ],
            },
            { type: "h2", text: "What it cost and what it saved" },
            {
                type: "p",
                text: "A few days of work against a subscription that would have run indefinitely — but the subscription was never the real cost. The real cost was a fulfilment team reconstructing orders by hand and occasionally getting it wrong.",
            },
            {
                type: "quote",
                text: "An app that does 80% of the job is not 80% useful when the missing 20% is the part that connects it to everything else.",
            },
        ],
    },
    {
        slug: "multi-step-forms-that-do-not-waste-time",
        cover: "/projects/dental-source.webp",
        title: "Multi-step forms that stop wasting everyone's time",
        excerpt:
            "Every incomplete order is a phone call asking for information the form should have refused to submit without.",
        date: "2026-06-18",
        readingMinutes: 6,
        tags: ["Next.js", "Forms", "UX"],
        body: [
            {
                type: "p",
                text: "On a dental lab ordering tool, the support load was almost entirely one problem: orders arriving without something the lab needed. Wrong scan format. Missing tooth number. An attachment too large to open.",
            },
            {
                type: "p",
                text: "Each one became a call, and the call asked for information the customer had already tried to give.",
            },
            { type: "h2", text: "Validate at the step, not at the end" },
            {
                type: "p",
                text: "A long form validated on submit tells you about a mistake you made six fields ago, in a context you have already left. Breaking the order into steps and validating each one means the correction happens while the reason for the field is still on screen.",
            },
            { type: "h2", text: "Check uploads before the upload" },
            {
                type: "p",
                text: "File type and size can be checked in the browser before a byte leaves the machine. That turns a two-minute upload ending in a rejection into an instant, specific message. Then check again on the server, because the client check is a courtesy and not a control.",
            },
            {
                type: "ul",
                items: [
                    "Reject on extension and MIME type, and say which formats are accepted",
                    "Cap size in the browser as well as in the server config",
                    "Show progress for anything over a second — silence reads as failure",
                    "Keep a draft so a rejected step does not discard the four that were fine",
                ],
            },
            { type: "h2", text: "The result is fewer calls, not prettier forms" },
            {
                type: "p",
                text: "None of this is visual design. It is deciding that an order cannot be submitted in a state the business cannot fulfil, and then enforcing that where the user can still do something about it.",
            },
            {
                type: "quote",
                text: "The best validation message is one the user never sees, because the form made the invalid state unreachable.",
            },
        ],
    },
    {
        slug: "one-catalogue-many-languages",
        cover: "/projects/comforsh.webp",
        title: "One catalogue, four languages, one source of truth",
        excerpt:
            "The usual answer to selling into several language markets is a site per language. It is also the answer that guarantees they drift apart.",
        date: "2026-04-09",
        readingMinutes: 7,
        tags: ["Shopify", "WooCommerce", "i18n"],
        body: [
            {
                type: "p",
                text: "Selling the same products into four European markets raises a question that looks technical and is actually operational: how many times does somebody have to enter a product before it is for sale everywhere?",
            },
            { type: "h2", text: "Why a site per language fails slowly" },
            {
                type: "p",
                text: "It works for a week. Then a price changes on one site and not the others, a product goes out of stock in one place, and a photographer delivers new images that get uploaded to two of the four. Nothing breaks loudly. The catalogues just stop agreeing with each other.",
            },
            { type: "h2", text: "Translate the presentation, not the catalogue" },
            {
                type: "p",
                text: "Keep one product record as the source of truth and layer translated content over it. The product exists once; what changes per market is the copy, the currency, the tax treatment and the shipping.",
            },
            {
                type: "ul",
                items: [
                    "Give each language its own indexable URL, not a query parameter",
                    "Emit hreflang so search engines know they are the same page",
                    "Localise currency and tax at the market level rather than in the theme",
                    "Keep the language switcher on the current page — dumping people on the home page loses them",
                ],
            },
            { type: "h2", text: "The part people forget" },
            {
                type: "p",
                text: "Untranslated content has to have a defined fallback. Decide up front whether a missing translation shows the source language or hides the product, because the default is usually neither and it shows up as an empty section in production.",
            },
        ],
    },
    {
        slug: "when-a-dashboard-needs-websockets",
        cover: "/projects/newvana.webp",
        title: "When a dashboard actually needs WebSockets",
        excerpt:
            "Most admin tools do not. The ones where two people edit the same record at the same time absolutely do, and polling will not save you.",
        date: "2026-03-14",
        readingMinutes: 6,
        tags: ["Next.js", "WebSockets", "Architecture"],
        body: [
            {
                type: "p",
                text: "Real-time is the kind of requirement that gets added to a brief because it sounds modern. Most dashboards are read-mostly and single-user, and a refresh button is a complete solution. It is worth being honest about which one you have.",
            },
            { type: "h2", text: "The test is concurrent writes" },
            {
                type: "p",
                text: "If two people can meaningfully edit the same record at the same time, you need the other person's change to appear. On a coaching dashboard, two staff editing a roster would each save over the other, and the loss was silent — the second save just won.",
            },
            {
                type: "p",
                text: "Polling narrows that window. It does not close it, and it costs a request per client per interval whether anything changed or not.",
            },
            { type: "h2", text: "Push the event, not the payload" },
            {
                type: "p",
                text: "Send the fact that something changed rather than the whole object. A small event naming which record moved lets each client decide whether it cares and fetch only what it is showing. It also keeps the socket cheap when twenty people are connected.",
            },
            {
                type: "ul",
                items: [
                    "Send an identifier and a version, not the full object",
                    "Reconcile against local state rather than replacing it wholesale",
                    "Handle reconnect — a laptop lid closing is the normal case, not the edge case",
                    "Fetch on reconnect so a missed event does not leave stale data on screen",
                ],
            },
            {
                type: "quote",
                text: "If nobody can name two users who would edit the same thing at the same time, you do not have a real-time problem. You have a refresh button.",
            },
        ],
    },
    {
        slug: "woocommerce-to-shopify-migration-guide",
        cover: "/projects/lampo.webp",
        title: "WooCommerce to Shopify: what actually breaks",
        excerpt:
            "The catalogue is the easy part. It is the variant model, the URLs and the order history that cost you if you get them wrong.",
        date: "2026-08-12",
        readingMinutes: 7,
        tags: ["Shopify", "WooCommerce", "Migration"],
        body: [
            {
                type: "p",
                text: "Most migration guides tell you to export a CSV and import it. That works for a shop with forty simple products and no history. It does not survive contact with a real catalogue, because WooCommerce and Shopify do not model products the same way, and the differences only show up after you have cut over.",
            },
            { type: "h2", text: "Variants are the first thing to go" },
            {
                type: "p",
                text: "WooCommerce lets a variable product carry as many attributes as you like. Shopify allows three options per product. A shirt with size, colour, fit and sleeve length does not fit, and a naive import will silently flatten it — usually by dropping whichever attribute sorted last.",
            },
            {
                type: "p",
                text: "The fix is a decision, not a script: either the fourth attribute becomes a separate product, or it becomes a line item property, or the catalogue gets restructured. Make that call before the import, with the client, in writing. Finding out afterwards means redoing the whole catalogue.",
            },
            { type: "h2", text: "URLs are the expensive part" },
            {
                type: "p",
                text: "WooCommerce serves products at /product/slug and categories at /product-category/slug. Shopify uses /products/slug and /collections/slug. Every inbound link, every ranking, every ad landing page points at the old shape.",
            },
            {
                type: "p",
                text: "You need a one-to-one redirect map, generated from the old site's actual URL list rather than guessed from the new one. Pull the list from the sitemap and from Search Console, because the sitemap will not include the pages that only exist in someone's newsletter from 2023.",
            },
            {
                type: "ul",
                items: [
                    "Export every indexed URL, not just the ones in the sitemap",
                    "Map product, collection, page and blog URLs separately — the patterns differ",
                    "Redirect at the platform level so the rules survive a theme change",
                    "Keep the map in version control; you will need it again in six months",
                ],
            },
            { type: "h2", text: "Order history is not optional" },
            {
                type: "p",
                text: "Clients discover they needed the old orders the first time someone asks for a refund on a pre-migration purchase. Shopify will not create historical orders through the normal API in a way that keeps the original dates unless you plan for it, so decide early whether you are migrating orders, archiving the old store read-only, or exporting to a spreadsheet the support team can search.",
            },
            { type: "h2", text: "Cut over in stages" },
            {
                type: "p",
                text: "Build on a Shopify development store, point a staging domain at it, and run both in parallel long enough to check the numbers. When you flip DNS, do it at the quietest hour for that store's actual traffic — not at your quietest hour.",
            },
            {
                type: "quote",
                text: "If something regresses after a staged cutover, you know which stage caused it. After a big-bang launch, you know only that something is wrong.",
            },
        ],
    },
    {
        slug: "custom-theme-vs-prebuilt-theme",
        cover: "/projects/ox-and-armor.webp",
        title: "Custom theme or pre-built: how to actually decide",
        excerpt:
            "A stock theme is the right answer more often than developers admit — and the wrong one in ways that only show up at month six.",
        date: "2026-07-03",
        readingMinutes: 6,
        tags: ["Shopify", "WordPress", "Themes"],
        body: [
            {
                type: "p",
                text: "The honest version of this question is not custom versus pre-built. It is: how much of what you sell is expressible in the structure the theme already assumes?",
            },
            { type: "h2", text: "When a stock theme is right" },
            {
                type: "p",
                text: "If your catalogue is products with a title, images, a price and a couple of options, and customers browse by category, a good stock theme will do everything you need and you will launch in a fortnight. Paying for a custom build to get a different hero layout is spending four weeks on something the theme editor could have done in an afternoon.",
            },
            { type: "h2", text: "When it stops working" },
            {
                type: "p",
                text: "The break point is always the same: your catalogue has an organising principle the theme does not know about. A fashion label whose customers shop by fabric rather than by garment type. An accessories brand where the first question is which phone you have. A publisher whose readers want a series in reading order.",
            },
            {
                type: "p",
                text: "You can fake these with tags and filters for a while. What you cannot fake is the navigation and the product page reflecting that structure, and that is where a stock theme runs out.",
            },
            { type: "h2", text: "The cost nobody quotes" },
            {
                type: "p",
                text: "A stock theme with fifteen apps bolted on is not cheaper than a custom theme. It is cheaper this month. Each app adds scripts on every page, a monthly fee, and one more thing that can break when the theme updates. Three of those apps usually exist because the theme could not express something about your catalogue.",
            },
            {
                type: "ul",
                items: [
                    "Count the monthly app spend before comparing build costs",
                    "Ask which apps exist to work around the theme rather than to add genuinely separate functionality",
                    "Check what the theme's update path does to your customisations",
                ],
            },
            {
                type: "quote",
                text: "If a forty-dollar app solves the problem better than two thousand dollars of custom work, the app is the right answer. Say so.",
            },
        ],
    },
    {
        slug: "core-web-vitals-on-a-real-store",
        cover: "/projects/zero-lifestyle.webp",
        title: "Core Web Vitals on a store that already has apps",
        excerpt:
            "Lighthouse on a fresh theme tells you nothing. Here is what actually moves the numbers on a store with two years of accumulated tags.",
        date: "2026-05-21",
        readingMinutes: 8,
        tags: ["Performance", "Shopify", "Core Web Vitals"],
        body: [
            {
                type: "p",
                text: "Every store is fast on the day it launches. What you are usually asked to fix is a store two years in, where each individual addition was reasonable and the total is not.",
            },
            { type: "h2", text: "Measure the field, not the lab" },
            {
                type: "p",
                text: "A Lighthouse run on your laptop over office wifi is a lab number. It is useful for comparing two versions of the same page, and useless for knowing what customers experience. Start with Core Web Vitals field data — real sessions, real devices, real networks — and only then open Lighthouse to find out why.",
            },
            {
                type: "p",
                text: "Record the baseline before touching anything. Without it you cannot prove afterwards that the work changed the outcome, and you will be asked.",
            },
            { type: "h2", text: "Largest Contentful Paint is usually one image" },
            {
                type: "p",
                text: "On most storefronts the LCP element is the hero image or the first product image. The wins are unglamorous: serve it in a modern format, size it for the actual container rather than the largest possible viewport, preload it, and stop lazy-loading the one image that is guaranteed to be above the fold.",
            },
            { type: "h2", text: "The app audit is the real work" },
            {
                type: "p",
                text: "Open the network tab and list every third-party request. For each one, ask the client what it is for. You will find analytics installed twice, a review widget loading on pages with no reviews, and at least one script from a tool nobody has logged into for a year.",
            },
            {
                type: "ul",
                items: [
                    "Remove what nobody uses — this is the single biggest win and it costs nothing",
                    "Defer what is not needed for first render",
                    "Load what is only needed on one template on that template alone",
                    "Replace an app with a theme section where the app exists for one small feature",
                ],
            },
            { type: "h2", text: "Cumulative Layout Shift is mostly missing dimensions" },
            {
                type: "p",
                text: "Images without width and height, web fonts swapping in, and banners injected above the fold after load. Reserve the space in the markup rather than letting the content push the page around once it arrives.",
            },
            {
                type: "quote",
                text: "Grade A on a template store is easy. Grade A on a store doing real revenue with real tooling is a series of small, boring decisions.",
            },
        ],
    },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
