# SEO

What is configured, where it is controlled, and what is missing. Status verified against the
built HTML and live HTTP responses on 2026-10-06.

---

## Where SEO is controlled

| Concern | File |
|---|---|
| Site-wide defaults, `metadataBase`, OG, Twitter, robots meta | `src/app/layout.tsx` → `metadata` |
| Per-page title / description / canonical | each `page.tsx` → `metadata` export |
| Dynamic page metadata | `generateMetadata()` in `[slug]`/`[id]` routes |
| Static paths for crawlers | `generateStaticParams()` in dynamic routes |
| Favicon | `src/app/icon.png` (App Router convention) |
| Canonical host | `NEXT_PUBLIC_SITE_URL` env var |
| `sitemap.xml` | ❌ not created |
| `robots.txt` | ❌ not created |
| Web manifest | ❌ not created |
| Structured data | ❌ none |

---

## 1. Site-wide metadata — `src/app/layout.tsx`

```ts
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://umer-porfolio.vercel.app";

export const metadata: Metadata = {
  title: "Umer Farooque | Full Stack Developer",
  description: "Portfolio of Umer Farooque, a Full Stack Developer building fast, scalable web apps …",
  metadataBase: new URL(siteUrl),
  openGraph: { title, description, url: siteUrl, siteName: "Umer Portfolio", type: "website" },
  twitter:   { card: "summary_large_image", title, description },
  robots:    { index: true, follow: true },
};
```

`metadataBase` is what makes relative `alternates.canonical` values resolve to absolute URLs.
**Set `NEXT_PUBLIC_SITE_URL` in Vercel** or every canonical points at the hardcoded fallback.

---

## 2. Per-page metadata — current coverage

| Route | `metadata` | Canonical | Verified title |
|---|---|---|---|
| `/` | ❌ inherits root | ❌ | `Umer Farooque \| Full Stack Developer` |
| `/about` | ❌ inherits root | ❌ | *(duplicate of root)* |
| `/work` | ✅ | ❌ | `Work \| Umer Farooque` |
| `/services` | ✅ | ✅ | `Services \| Umer Farooque` |
| `/services/[slug]` | ✅ `generateMetadata` | ✅ | per service |
| `/blog` | ✅ | ✅ | `Blog \| Umer Farooque` |
| `/blog/[slug]` | ✅ `generateMetadata` | ✅ | per post |
| `/case-studies` | ✅ | ✅ | per page |
| `/case-studies/[slug]` | ✅ `generateMetadata` | ✅ | per study |
| `/contact` | ✅ | ✅ | `Contact \| Umer Farooque` |
| `/projects` | ❌ inherits root | ❌ | *(duplicate of root)* |
| `/projects/[id]` | ❌ | ❌ | *(duplicate of root)* |

### ⚠️ Gap: four pages share one title

`/`, `/about`, `/projects` and `/projects/[id]` all emit the root title and description.
Duplicate titles compete with each other in search results.

**Fix pattern** (matches the existing convention in `work/page.tsx`):
```ts
import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `About | ${SITE.name}`,
    description: `…`,
    alternates: { canonical: "/about" },
};
```
For `/projects/[id]`, add a `generateMetadata` mirroring `case-studies/[slug]/page.tsx`.

---

## 3. Open Graph & Twitter cards

**Status: declared but unusable.** Verified across all built pages:

```
page           og:image  og:url  canonical  twitter:image
/              0         1       0          0
/about         0         1       0          0
/work          0         1       0          0
/services      0         1       1          0
/blog          0         1       1          0
/case-studies  0         1       1          0
```

`twitter.card` is `summary_large_image` but **no image is supplied anywhere**, so every share
on LinkedIn, WhatsApp, X or Slack renders as a bare text link.

For a portfolio whose job is to be pasted into a client's chat window, this is the single
highest-leverage SEO fix available.

**Recommended fix** — use the App Router file convention so Next generates the image and
injects the tags automatically:

```tsx
// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
    return new ImageResponse(
        (
            <div style={{ height: "100%", width: "100%", display: "flex",
                          flexDirection: "column", justifyContent: "center",
                          background: "#080808", color: "#f0eee8", padding: 80 }}>
                <div style={{ fontSize: 28, color: "#c8ff00", letterSpacing: 4 }}>
                    {SITE.role.toUpperCase()}
                </div>
                <div style={{ fontSize: 88, lineHeight: 1 }}>{SITE.name}</div>
            </div>
        ),
        size
    );
}
```

Place a route-level `opengraph-image.tsx` inside `blog/[slug]/` etc. for per-page images.
Check the current API in `node_modules/next/dist/docs/` before writing it — the
`ImageResponse` import path has moved between versions.

---

## 4. Sitemap — ❌ missing

`curl /sitemap.xml` → **404**.

58 routes with no sitemap leaves discovery to crawl luck. The App Router convention is a
`src/app/sitemap.ts` returning `MetadataRoute.Sitemap`. It should enumerate the static
routes plus the three generated collections:

```ts
// shape only — verify the current API against the bundled docs
import { posts } from "@/data/blog";
import { caseStudies } from "@/lib/case-studies";
import { servicePages } from "@/data/services-pages";
```

Sources to pull from: `src/data/blog.ts` (7), `src/lib/case-studies.ts` (26),
`src/data/services-pages.ts` (13), plus `/`, `/work`, `/services`, `/blog`,
`/case-studies`, `/about`, `/contact`.

---

## 5. robots.txt — ❌ missing

`curl /robots.txt` → **404**. The App Router convention is `src/app/robots.ts`. It should
allow everything and point at the sitemap.

The `robots: { index: true, follow: true }` meta tag in `layout.tsx` is present and correct,
but a meta tag is not a substitute for `robots.txt`.

---

## 6. Web manifest — ❌ missing

`curl /manifest.webmanifest` → **404**. Lower priority for a portfolio (it only affects
installability and some mobile polish), but trivial to add via `src/app/manifest.ts`.

---

## 7. Structured data — ❌ none

`grep "application/ld+json\|schema.org" src/` → no matches.

A portfolio is the textbook case for JSON-LD. Highest value first:

| Schema | Where | Gives you |
|---|---|---|
| `Person` | `layout.tsx` or `/about` | Knowledge-panel eligibility; name, job title, socials via `sameAs` |
| `BreadcrumbList` | `/blog/[slug]`, `/case-studies/[slug]`, `/services/[slug]` | Breadcrumb trails in results |
| `BlogPosting` | `/blog/[slug]` | Article rich results, author and date |
| `WebSite` | `layout.tsx` | Sitelinks search box |

`SITE.github` / `.linkedin` / `.upwork` already exist for `sameAs` — no new data needed.
Render as a `<script type="application/ld+json">` with `JSON.stringify` of a typed object.
Pure upside: no visual change, no runtime cost.

---

## 8. Technical SEO — what is already correct ✅

| Item | Status |
|---|---|
| `<html lang="en">` | ✅ |
| `<meta name="viewport" content="width=device-width, initial-scale=1">` | ✅ |
| Favicon | ✅ `src/app/icon.png` |
| Semantic landmarks | ✅ `<main id="main">`, `<header>`, `<footer>`, `<nav aria-label>`, `<article>` |
| Breadcrumb nav markup | ✅ `<nav aria-label="Breadcrumb">` + `<ol>` on `blog/[slug]` |
| `<time dateTime>` on posts | ✅ |
| 46 pages prerendered as static HTML | ✅ crawlers get full content without JS |
| 404 handling | ✅ `/nope` → 404 |
| Clean URL structure | ✅ `/blog/<slug>`, `/case-studies/<slug>` |
| `next/image` with `sizes` | ✅ AVIF/WebP negotiated; 640px render = 2.3 KB |
| ISR `revalidate` | ✅ 1 h on content routes |

---

## 9. SEO risks

| Risk | Severity | Note |
|---|---|---|
| No `og:image` | 🟠 High | Every social share is a bare link |
| No sitemap / robots.txt | 🟠 High | 58 routes undiscovered |
| Four duplicate titles | 🟠 High | `/`, `/about`, `/projects`, `/projects/[id]` |
| Missing `<h1>` on `/about`, `/contact`, `/projects` | 🟠 High | Verified in built HTML — weakens topical signal |
| Missing canonicals on `/`, `/about`, `/projects`, `/work` | 🟡 Medium | — |
| No structured data | 🟡 Medium | Lost rich-result opportunity |
| `/projects` largely duplicates `/work` | 🟡 Medium | Thin/duplicate content; consider `noindex` or retiring `/projects` |
| Blog covers reuse project screenshots | 🟢 Low | Intentional; images are `alt=""` which is a separate a11y issue |
| LCP gated 1.4 s by the loader | 🟡 Medium | Core Web Vitals is a ranking input — see `ANIMATIONS.md` §2 |

---

## 10. Checklist for adding a new page

1. Export `metadata` (or `generateMetadata`) with `title`, `description`, and
   `alternates: { canonical: "/your-path" }`.
2. Use the `` `Page | ${SITE.name}` `` title pattern.
3. Give the page exactly **one** `<h1>`.
4. Add it to `src/app/sitemap.ts` once that exists (or to the data array it generates from).
5. Add `generateStaticParams` if the route is dynamic but enumerable.
6. Consider a route-level `opengraph-image.tsx`.
7. Verify in the built output:
   ```bash
   npm run build
   grep -o '<title>[^<]*</title>' .next/server/app/your-page.html
   grep -c '<h1' .next/server/app/your-page.html
   ```
