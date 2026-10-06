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
| Canonical host | `SITE_URL` in `src/data/site.ts`, from `NEXT_PUBLIC_SITE_URL` |
| `sitemap.xml` | ✅ `src/app/sitemap.ts` — generated from the data files, 53 URLs |
| `robots.txt` | ✅ `src/app/robots.ts` |
| Social image | ✅ `src/app/opengraph-image.tsx` — generated via `next/og` |
| 404 page | ✅ `src/app/not-found.tsx` |
| Canonical origin | `SITE_URL` in `src/data/site.ts` (reads `NEXT_PUBLIC_SITE_URL`) |
| Web manifest | ❌ not created (low priority) |
| Structured data | ❌ none — still the biggest remaining win |

---

## 1. Site-wide metadata — `src/app/layout.tsx`

```ts
const siteUrl = SITE_URL; // src/data/site.ts — reads NEXT_PUBLIC_SITE_URL

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

| Route | `metadata` | Canonical | h1 |
|---|---|---|---|
| `/` | ✅ (title/description inherited from layout, which is correct) | ✅ | 1 |
| `/about` | ✅ | ✅ | 1 |
| `/work` | ✅ | ✅ | 1 |
| `/services` + `[slug]` | ✅ | ✅ | 1 |
| `/blog` + `[slug]` | ✅ | ✅ | 1 |
| `/case-studies` + `[slug]` | ✅ | ✅ | 1 |
| `/contact` | ✅ | ✅ | 1 |
| `/projects` | ✅ | ✅ | 1 |
| `/projects/[id]` | ✅ `generateMetadata` | ✅ | 1 |

All verified against the built HTML: every page has a unique title, a description,
one canonical and exactly one `<h1>`.


---

## 3. Open Graph & Twitter cards — ✅ done

`src/app/opengraph-image.tsx` generates a 1200×630 PNG through `next/og`, and Next injects
`og:image` and `twitter:image` on every route automatically. Verified: `/opengraph-image`
returns **200, ~54 KB, image/png**, and all built pages carry `og:image`.

It is generated rather than a static file so it tracks `src/data/site.ts`. Colours are the
design tokens written literally, because Satori cannot read the stylesheet — keep them in
sync with `--color-bg`, `--color-ink`, `--color-muted`, `--color-accent`.

For a per-page image, add a route-level `opengraph-image.tsx` inside e.g. `blog/[slug]/`.

---

## 4. Sitemap — ✅ done

`src/app/sitemap.ts` returns `MetadataRoute.Sitemap`, built from the same data that
generates the routes, so new content appears without anyone remembering:

| Source | Count |
|---|---|
| Landing routes | 7 |
| `src/data/services-pages.ts` | 13 |
| `src/lib/case-studies.ts` | 26 |
| `src/data/blog.ts` (with real `lastModified`) | 7 |
| **Total** | **53** |

`/projects` and `/projects/[id]` are deliberately excluded — they are the legacy
database-backed pages and duplicate `/work` and `/case-studies`.

Verified: `/sitemap.xml` → 200 `application/xml`, 53 `<url>` entries, and **every one of the
53 URLs returns 200**.

---

## 5. robots.txt — ✅ done

`src/app/robots.ts`. Verified output:

```
User-Agent: *
Allow: /
Disallow: /api/

Host: https://umerfarooque-dev.vercel.app
Sitemap: https://umerfarooque-dev.vercel.app/sitemap.xml
```

`/api/` is disallowed because the single route there is a POST-only contact handler.

---

## 6. 404 page and web manifest

`src/app/not-found.tsx` catches unmatched URLs and every `notFound()` call, styled with the
current design system and marked `robots: { index: false }`.

Web manifest is still missing (`src/app/manifest.ts`). Low priority for a portfolio — it
only affects installability.

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
