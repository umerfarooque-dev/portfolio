import type { Project } from "./projects";

/**
 * Storefront work, kept in its own file so it leads the catalogue.
 *
 * Every `liveUrl` here was taken from the live case-study page and checked to
 * resolve, rather than inferred from the brand name — the earlier guessed
 * domains were mostly wrong.
 */
export const storeProjects: Project[] = [
  {
    id: "zero-lifestyle",
    title: "Zero Lifestyle",
    description: "Consumer tech brand selling smartwatches, earbuds and audio across Pakistan.",
    tagline: "A hardcoded storefront rebuilt so the marketing team ships campaigns without a developer.",
    liveUrl: "https://zerolifestyle.co/",
    imageUrl: "/projects/zero-lifestyle.webp",
    tags: ["Theme architecture", "Performance", "Campaign tooling"],
    stack: "shopify",
    role: "Senior Shopify Developer",
    category: "Consumer Electronics",
    duration: "Ongoing retainer",
    fullDescription:
      "Most of the storefront was hardcoded, so every campaign meant waiting on a developer to change a line of text. The theme was re-architected into modular Liquid sections the marketing team edits themselves, and the daily back-office work was automated.",
    challenge:
      "Campaign velocity was capped by developer availability. Every banner, badge and landing page change was a code deploy, and an accumulation of apps and tracking tags had pushed load times past the point where paid traffic converted.",
    approach:
      "Rebuilt the theme as modular Shopify 2.0 sections with schema-driven settings, so copy, imagery and campaign blocks became theme-editor fields. Audited the app footprint, deferred render-blocking scripts and pruned third-party bloat.",
    scope: [
      "Modular Liquid 2.0 section architecture",
      "Core Web Vitals and load-time optimization",
      "Campaign tooling for non-technical editors",
      "Back-office automation",
    ],
    techStack: ["Shopify 2.0", "Liquid", "JavaScript", "Shopify Flow"],
    features: [
      "Theme-editor driven campaign sections",
      "Deferred third-party script loading",
      "Automated back-office workflows",
      "Mobile-first product detail pages",
    ],
  },
  {
    id: "ox-and-armor",
    title: "Ox & Armor",
    description: "Handcrafted full-grain leather jackets and luxury accessories, sold from the UK.",
    tagline: "An editorial-led custom theme for a premium leather label.",
    liveUrl: "https://www.oxandarmor.co.uk/",
    imageUrl: "/projects/ox-and-armor.webp",
    tags: ["Custom theme", "Editorial sections", "Mega-menu architecture"],
    stack: "shopify",
    role: "Shopify Developer",
    category: "Fashion & Apparel",
    duration: "4 weeks",
    fullDescription:
      "A bespoke Shopify theme for a UK leather brand, built from Figma rather than adapted from a template. The design leans editorial, with long-form storytelling sections alongside the catalogue.",
    challenge:
      "Premium leather goods sell on craft and material, not on a spec grid. A stock template flattened the brand into a generic catalogue and could not express the range's depth.",
    approach:
      "Built a custom Shopify 2.0 theme from the ground up with editorial content sections, a multi-column mega-menu exposing the full catalogue, and product pages that foreground material and construction detail.",
    scope: ["Custom theme build from Figma", "Editorial content sections", "Mega-menu architecture"],
    techStack: ["Shopify 2.0", "Liquid", "JavaScript", "SCSS"],
    features: ["Editorial long-form sections", "Multi-column mega-menu", "Material-led product pages", "Lookbook galleries"],
  },
  {
    id: "proshield",
    title: "ProShield",
    description: "iPhone cases, MagSafe accessories and charging gear.",
    tagline: "A device compatibility selector that removes the biggest reason for returns.",
    liveUrl: "https://proshieldcase.com/",
    imageUrl: "/projects/proshield.webp",
    tags: ["Device compatibility selector", "Bundles", "PDP conversion"],
    stack: "shopify",
    role: "Shopify Developer",
    category: "Consumer Electronics",
    duration: "3 weeks",
    fullDescription:
      "Phone accessories live or die on fitment. The store was rebuilt around a device compatibility selector so shoppers land on the right variant for their exact handset, with bundles and conversion-focused product pages on top.",
    challenge:
      "Customers regularly bought a case for the wrong model. Fitment data existed in variant names but nothing guided the shopper to it, driving returns and support load.",
    approach:
      "Built a device selector into the theme that filters variants by handset and remembers the choice across the session. Added native bundle logic and high-intent product badges in Liquid rather than paid apps.",
    scope: ["Device compatibility selector", "Native bundle logic", "Product page conversion work"],
    techStack: ["Shopify 2.0", "Liquid", "JavaScript", "Shopify Ajax API"],
    features: ["Handset-aware variant filtering", "Cross-sell bundles", "Sticky mobile add-to-cart", "Review surfacing"],
  },
  {
    id: "elan-by-zunaira",
    title: "Elan by Zunaira",
    description: "Modest fashion label with a catalogue organised by fabric rather than by type.",
    tagline: "Fabric-first filtering for a catalogue that does not fit standard collections.",
    liveUrl: "https://www.elanbyzunaira.com/",
    imageUrl: "/projects/elan-by-zunaira.webp",
    tags: ["Fabric filtering", "Bundle products", "Mega-menu"],
    stack: "shopify",
    role: "Shopify Developer",
    category: "Fashion & Apparel",
    duration: "3 weeks",
    fullDescription:
      "Customers shop by fabric - lawn, chiffon, velvet - rather than by garment type. Navigation and filtering were rebuilt around that, with bundle products for multi-piece suits.",
    challenge:
      "Shopify's default collection structure assumes shoppers browse by product type. This catalogue's organising principle is material, which left customers unable to find what they came for.",
    approach:
      "Modelled fabric as a first-class filter with metafields, rebuilt the mega-menu around it, and implemented bundle products so multi-piece suits sell as one unit while tracking inventory per piece.",
    scope: ["Fabric-based filtering", "Metafield data model", "Bundle product logic", "Mega-menu rebuild"],
    techStack: ["Shopify 2.0", "Liquid", "Metafields", "JavaScript"],
    features: ["Filter by fabric", "Multi-piece bundle products", "Fabric-led mega-menu", "Seasonal collection pages"],
  },
  {
    id: "mia-and-mila",
    title: "Mia & Mila",
    description: "Luxury ethnic wear spanning children's, teens' and women's ranges.",
    tagline: "Alteration add-ons built into the theme, replacing a paid app that could not track them.",
    liveUrl: "https://miamilaluxury.com/",
    imageUrl: "/projects/mia-and-mila.webp",
    tags: ["Custom add-ons", "Variant architecture", "Seasonal merchandising"],
    stack: "shopify",
    role: "Shopify Developer",
    category: "Fashion & Apparel",
    duration: "4 weeks",
    fullDescription:
      "Customers needed to add alterations to a garment at the point of purchase. The subscription app in place could not report which garment an alteration belonged to, so the feature was rebuilt natively in the theme.",
    challenge:
      "The alterations app took the customer's money but did not attach the alteration to a line item, so the fulfilment team could not tell which garment it referred to. It also carried a monthly fee.",
    approach:
      "Built alteration add-ons into the product page using line item properties, so each alteration stays attached to its garment through checkout and into the order. The paid app was removed.",
    scope: ["Custom alteration add-ons", "Line item property architecture", "Variant structure across three ranges"],
    techStack: ["Shopify 2.0", "Liquid", "JavaScript", "Line Item Properties"],
    features: ["Per-garment alteration options", "Alterations carried to fulfilment", "Three-range variant architecture"],
  },
  {
    id: "comforsh",
    title: "Comforsh",
    description: "Ergonomic comfort products for home, office and travel, sold across the EU.",
    tagline: "A four-language EU storefront built from scratch.",
    liveUrl: "https://comforsh.com/",
    imageUrl: "/projects/comforsh.webp",
    tags: ["Full store build", "Four-language storefront", "Category architecture"],
    stack: "shopify",
    role: "Shopify Developer",
    category: "Health & Wellness",
    duration: "5 weeks",
    fullDescription:
      "A complete Shopify build for an ergonomics brand selling across the European Union, localised into four languages with a category structure spanning home, office and travel use cases.",
    challenge:
      "Selling one catalogue into four language markets without duplicating stores, while keeping the category structure legible when the same product serves three different contexts.",
    approach:
      "Built a single storefront with Shopify Markets and translated content, and designed a category architecture that lets a product appear under multiple use cases without duplicating the product record.",
    scope: ["Full store build", "Four-language localisation", "Category and collection architecture"],
    techStack: ["Shopify 2.0", "Liquid", "Shopify Markets", "JavaScript"],
    features: ["Four-language storefront", "Use-case category structure", "EU shipping and tax configuration"],
  },
  {
    id: "nrchia",
    title: "NRChia Foods",
    description: "Organic plant-based protein bites - vegan, gluten-free, no artificial sweeteners.",
    tagline: "Ingredient-led storytelling and a conversion-focused product page.",
    liveUrl: "https://www.nrchia.com/",
    imageUrl: "/projects/nrchia.webp",
    tags: ["Full store build", "Product storytelling", "Conversion-led PDP"],
    stack: "shopify",
    role: "Shopify Developer",
    category: "Health & Wellness",
    duration: "3 weeks",
    fullDescription:
      "A full Shopify build for an organic plant-based snack brand, where the product page carries the ingredient story and dietary credentials before it asks for the sale.",
    challenge:
      "Health food buyers scrutinise ingredients and certifications before they buy. A standard product template buries that under a specification table nobody reads.",
    approach:
      "Designed the product page around the ingredient story - sourcing, dietary badges and nutritional detail surfaced inline - with the purchase decision supported rather than interrupted by it.",
    scope: ["Full store build", "Ingredient-led storytelling", "Conversion-focused product page"],
    techStack: ["Shopify 2.0", "Liquid", "JavaScript", "Metafields"],
    features: ["Inline ingredient storytelling", "Dietary credential badges", "Bundle and multi-pack options"],
  },
  {
    id: "inelia-records",
    title: "Inelia Records",
    description: "Independent music label selling albums, lyrics and merchandise direct to fans.",
    tagline: "One storefront for records, lyrics and merch, merchandised around releases.",
    liveUrl: "https://ineliarecords.com/",
    imageUrl: "/projects/inelia-records.webp",
    tags: ["Full store build", "Album and merch catalogue", "Release merchandising"],
    stack: "shopify",
    role: "Shopify Developer",
    category: "Media & Entertainment",
    duration: "3 weeks",
    fullDescription:
      "A direct-to-fan storefront for an independent label, selling physical and digital albums alongside merchandise, organised so a new release pulls its related products with it.",
    challenge:
      "A label's catalogue is organised by release, not product type. Albums, lyric books and tour merch from the same release needed to surface together rather than in separate collections.",
    approach:
      "Built a release-centric data model with metafields linking products to a release, so a launch automatically merchandises its album, lyrics and merch as one group.",
    scope: ["Full store build", "Release-centric catalogue model", "Digital and physical product handling"],
    techStack: ["Shopify 2.0", "Liquid", "Metafields", "JavaScript"],
    features: ["Release-grouped merchandising", "Digital and physical album delivery", "Artist landing pages"],
  },
  {
    id: "inelia-books",
    title: "Inelia Books",
    description: "Publishing storefront for fiction and non-fiction, organised by series.",
    tagline: "Series-based collections with a pre-order and release flow.",
    liveUrl: "https://ineliabooks.com/",
    imageUrl: "/projects/inelia-books.webp",
    tags: ["Full store build", "Series-based collections", "Pre-order flow"],
    stack: "shopify",
    role: "Shopify Developer",
    category: "Publishing",
    duration: "3 weeks",
    fullDescription:
      "A publishing storefront where readers browse by series and reading order rather than by individual title, with a pre-order flow for books that have not shipped yet.",
    challenge:
      "Readers of a series need to know what to read next. A flat title listing gives no reading order, and pre-orders sat awkwardly alongside in-stock books with no distinction at checkout.",
    approach:
      "Modelled series as collections with explicit reading order, and built a pre-order flow that labels, sequences and communicates release dates distinctly from in-stock inventory.",
    scope: ["Full store build", "Series collection architecture", "Pre-order and release flow"],
    techStack: ["Shopify 2.0", "Liquid", "Metafields", "JavaScript"],
    features: ["Browse by series", "Explicit reading order", "Pre-order handling with release dates"],
  },
  {
    id: "gk-technova",
    title: "GK Technova",
    description: "Premium tech accessories - ambient lighting, audio and gaming gear for desk setups.",
    tagline: "A mobile-first build for a desk-setup accessories brand.",
    liveUrl: "https://gktechnova.com/",
    imageUrl: "/projects/gk-technova.webp",
    tags: ["Full store build", "Collection architecture", "Mobile-first PDP"],
    stack: "shopify",
    role: "Shopify Developer",
    category: "Consumer Electronics",
    duration: "3 weeks",
    fullDescription:
      "A complete Shopify build for a desk-setup accessories brand, where most traffic arrives on mobile from social and the product page has to do the whole job on a small screen.",
    challenge:
      "Traffic came almost entirely from mobile social ads, but the product experience had been designed desktop-first, so the highest-intent visitors got the worst version of the store.",
    approach:
      "Designed the product page mobile-first - sticky add-to-cart, swipeable galleries, collapsed specification detail - and built a collection architecture matching how desk-setup buyers shop.",
    scope: ["Full store build", "Mobile-first product page", "Collection architecture"],
    techStack: ["Shopify 2.0", "Liquid", "JavaScript"],
    features: ["Sticky mobile add-to-cart", "Swipeable product galleries", "Ad landing pages"],
  },
];
