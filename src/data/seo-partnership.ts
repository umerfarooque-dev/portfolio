/**
 * The SEO side of the work, which is a partnership rather than a solo service.
 *
 * Search strategy and reporting are Hanif Rahimoon's (HanifDigiLab). The case
 * studies below are HIS client work and HIS Search Console reports — they are
 * published here as evidence of what the partnership can deliver, credited to
 * him on every entry, not presented as Umer's results.
 *
 * Umer's own contribution is the technical and implementation side: the SEO
 * foundations built into the sites he develops. That boundary is deliberate, and
 * it is the reason every figure on this page carries a `credit` field.
 *
 * Figures are transcribed from hanifdigilab.com/hanif-case-studies/ and are not
 * rounded, reinterpreted or extrapolated. The caveats are Hanif's own and are
 * kept because they are the honest reading of the data.
 */

export interface SeoMetric {
    label: string;
    value: string;
}

export interface SeoCaseStudy {
    id: string;
    client: string;
    sector: string;
    /** One line describing what the report covers. */
    headline: string;
    /** What the business is and why search matters to it. */
    context: string;
    /** What the supplied report actually records. */
    performance: string;
    /** The honest limits of what the numbers prove. */
    caveat: string;
    /** Where the figures come from. */
    source: string;
    metrics: SeoMetric[];
    /** Who did this work. Rendered on the card — never omit it. */
    credit: string;
    website?: string;
}

export const SEO_PARTNER = {
    name: "Hanif Rahimoon",
    studio: "HanifDigiLab",
    role: "SEO Specialist",
    experienceYears: 9,
    site: "https://hanifdigilab.com/",
    caseStudies: "https://hanifdigilab.com/hanif-case-studies/",
} as const;

/** What Umer actually does on the search side. Nothing here is the partner's. */
export const TECHNICAL_SEO_SCOPE: string[] = [
    "Metadata, canonical URLs and Open Graph on every route",
    "sitemap.xml and robots.txt generated from the site's own content",
    "Structured data (JSON-LD) where the page type supports it",
    "One H1 per page and a heading order that matches the content",
    "Core Web Vitals: image formats and sizing, render-blocking work, layout shift",
    "Crawlability checks — redirects, 404s that return 404, and no soft 404s",
    "Google Search Console and GA4 wired up so the reporting has something to read",
];

export const seoCaseStudies: SeoCaseStudy[] = [
    {
        id: "the-dental-land",
        client: "The Dental Land",
        sector: "Dental practice",
        headline: "Search exposure and measured engagement.",
        context:
            "A dental practice relying on local and treatment-led search to be found by people already looking for care.",
        performance:
            "The report shows 394K impressions and 2.15K clicks over its reporting window, with a sustained rise in daily impressions through the later part of the timeline.",
        caveat:
            "The chart records that pattern without establishing its cause.",
        source: "Google Search Console — daily performance view",
        metrics: [
            { label: "Clicks", value: "2.15K" },
            { label: "Impressions", value: "394K" },
            { label: "Average CTR", value: "0.5%" },
            { label: "Average position", value: "12.7" },
        ],
        credit: `SEO by ${SEO_PARTNER.name}, ${SEO_PARTNER.studio}`,
    },
    {
        id: "real-estate-law-group",
        client: "The Real-estate Law Group",
        sector: "Real-estate legal services",
        headline: "Documented visibility in search.",
        context:
            "A real-estate legal services business, where being discoverable helps people find relevant expertise while researching their situation.",
        performance:
            "The report records 196K impressions and 594 clicks, at a 0.3% click-through rate and an average position of 6.6, with several peaks across the displayed timeline.",
        caveat:
            "Search Console clicks alone do not establish how many consultations or clients followed. That needs conversion tracking on the site.",
        source: "Google Search Console — daily performance view",
        metrics: [
            { label: "Clicks", value: "594" },
            { label: "Impressions", value: "196K" },
            { label: "Average CTR", value: "0.3%" },
            { label: "Average position", value: "6.6" },
        ],
        credit: `SEO by ${SEO_PARTNER.name}, ${SEO_PARTNER.studio}`,
    },
    {
        id: "giftflys",
        client: "Giftflys",
        sector: "Online gifts & delivery",
        headline: "Gift-delivery search visibility, international.",
        context:
            "An international e-commerce project focused on gift delivery to Pakistan, competing on both general commercial queries and occasion-led seasonal intent.",
        performance:
            "Evidence here is search-result screenshots rather than a Search Console export, covering queries such as “send gifts to pakistan”, “gifts to pakistan” and “send valentines day gifts to pakistan”, across homepage and occasion-focused results.",
        caveat:
            "Screenshots capture a listing at a point in time; they are not a performance report and no click or impression figures are claimed.",
        source: "Search-result screenshots",
        metrics: [],
        credit: `SEO by ${SEO_PARTNER.name}, ${SEO_PARTNER.studio}`,
        website: "giftflys.com",
    },
];
