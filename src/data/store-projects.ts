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
    id: "cmbt-nutrition",
    title: "CMBT Nutrition",
    description: "Australian sports nutrition brand with a Shopify store for protein bars, protein powders and performance nutrition.",
    tagline: "An eCommerce SEO foundation for product discovery, collection relevance and measurable organic visibility.",
    liveUrl: "https://cmbt.com.au/",
    imageUrl: "/projects/cmbt-nutrition.webp",
    tags: ["Shopify", "Technical SEO", "Product & collection SEO", "Analytics"],
    stack: "shopify",
    category: "Sports Nutrition & eCommerce",
    credit: "This case study describes the wider eCommerce SEO engagement supplied for this portfolio. Reported search and analytics outcomes are campaign-level results, not individual developer performance claims.",
    fullDescription:
      "CMBT Nutrition is an Australian sports nutrition brand selling through a Shopify storefront. The supplied case study focuses on improving its existing technical SEO foundation, product and collection relevance, internal linking and measurement. The engagement aimed to make commercial and educational pages easier to discover through organic search, rather than relying only on existing customers and branded queries.",
    challenge:
      "The store had established products and existing search traffic, but technical issues limited organic discoverability. Product metadata needed improvement, heading hierarchy was inconsistent, and oversized images created optimization opportunities. Limited links between collections, products and educational resources made it harder for search engines and shoppers to explore related content.",
    approach:
      "The campaign addressed crawlability, indexing hygiene and heading structure, then refined page titles, descriptions, product copy and collection content around relevant commercial search intent. Internal links connected product, collection, brand and educational pages. Image work identified oversized assets and WebP opportunities, while Search Console and GA4 reporting tracked search visibility, user behaviour and engagement.",
    scope: [
      "Technical SEO audit and crawlability improvements",
      "Indexing hygiene and heading hierarchy corrections",
      "Product and collection page optimization",
      "Page titles, descriptions and metadata refinement",
      "Internal linking across collections, products and educational resources",
      "Image SEO audit and WebP recommendations",
      "Google Search Console and GA4 reporting setup",
      "Search-intent alignment for category and supporting content",
    ],
    techStack: ["Shopify", "Google Search Console", "Google Analytics 4", "WebP"],
    features: [
      "Search-focused product and category copy",
      "Consistent semantic heading structure",
      "Connected collection, product and educational content journeys",
      "Keyword visibility and engagement reporting",
      "Image metadata and asset-size recommendations",
    ],
    results: [
      { value: "396K", label: "Reported organic impressions" },
      { value: "24.7K", label: "Reported organic clicks" },
      { value: "6.2%", label: "Average click-through rate" },
      { value: "13.7", label: "Average search position" },
    ],
    resultsNote: "Source: the supplied CMBT Nutrition SEO case study, which describes a 12-month results window without exact reporting dates. These are reported campaign totals and averages, not percentage uplifts or results attributed to one developer. Average position is an aggregate search metric, not a ranking for a single keyword. Separate GA4 engagement and product-purchase figures are not combined with the search metrics.",
  },
  {
    id: "sprout-organic",
    title: "Sprout Organic",
    description: "Australian plant-based infant and toddler nutrition brand with a Shopify storefront and Subscribe & Save experience.",
    tagline: "Technical SEO, lifecycle infrastructure and storefront improvements delivered with MGN Ventures.",
    liveUrl: "https://sproutorganic.com.au/",
    imageUrl: "/projects/sprout-organic.webp",
    tags: ["Shopify", "Storefront rebuild", "Subscribe & Save", "Technical SEO"],
    stack: "shopify",
    role: "Shopify Developer · MGN Ventures",
    category: "Plant-Based Infant & Toddler Nutrition",
    credit: "Delivered as part of MGN Ventures. This case study describes the team's combined storefront, technical SEO, lifecycle and analytics engagement; reported outcomes are agency-level results, not individual performance claims.",
    fullDescription:
      "Sprout Organic's Australian Shopify storefront needed a stronger foundation for organic discovery, subscriptions and lifecycle marketing. The MGN Ventures engagement connected technical SEO, channel attribution, email segmentation and customer-facing storefront work, including a Subscribe & Save page rebuild and a US landing page refresh. The work focused on improving the existing growth infrastructure; a wider design-system rebuild was identified as a subsequent phase.",
    challenge:
      "Organic authority was being lost across underperforming pages, while attribution was fragmented between Shopify, Omnisend and Yotpo. Overlapping lifecycle age bands created conflicting subscriber messages. Storefront features had accumulated over time without a cohesive structure, and subscription content needed to match a new pricing model before launch.",
    approach:
      "MGN Ventures addressed crawlability, indexing hygiene, heading structure, product and collection metadata, and internal linking while preserving important landing-page URLs. The team rebuilt UTM tagging across Refersion and the Shopify Marketing API, reconciled reporting in Looker Studio, and separated lifecycle age bands using post-purchase date-of-birth capture. Storefront work rebuilt Subscribe & Save around 3-, 6- and 9-unit discount tiers and refreshed the US landing page with brand-aligned typography and mobile-first layouts.",
    scope: [
      "Shopify Subscribe & Save page rebuild for the pricing rollout",
      "Mobile-first US landing page refresh",
      "Technical SEO, metadata and internal-linking improvements",
      "Rebuild of five lost-keyword landing pages with URL preservation",
      "Channel attribution and reporting reconciliation",
      "Non-overlapping lifecycle segmentation and post-purchase DOB capture",
      "Loyalty, email and SMS lifecycle integration",
      "International checkout audit across AU, US, UK and CA",
    ],
    techStack: ["Shopify", "Liquid", "JavaScript", "GA4", "Shopify Marketing API", "Refersion", "Omnisend", "Yotpo", "Looker Studio"],
    features: [
      "Subscribe & Save discount bands for 3, 6 and 9 units",
      "Brand-aligned US landing page using CoreRhino and Poppins",
      "Age-based lifecycle segments: 0–3, 3–6, 6–9, 9–11 and 12–14 months",
      "Plant Points post-purchase flow with 80 loyalty points per DOB submission",
      "Cross-sell architecture on product and order-confirmation pages",
      "Reconciled Shopify, GA4, Omnisend and Yotpo attribution dashboard",
    ],
    results: [
      { value: "+199%", label: "Active users · 4,400 reported" },
      { value: "+221%", label: "Organic search sessions · 2,800 reported" },
      { value: "+31%", label: "Total sessions · 9,200 reported" },
      { value: "+28%", label: "Omnisend-attributed email channel sessions" },
    ],
    resultsNote: "Source: the supplied MGN Ventures case study, which describes a 12-month results window without exact reporting dates. These are reported team-level outcomes from the combined engagement. Paid-channel growth associated with Sprout's increased ad spend is excluded; no individual or storefront-only attribution is claimed. Separate five-month engagement figures are not combined with these results.",
  },
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
