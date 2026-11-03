# CHANGELOG

## 2026-11-03 - Remove Zero Lifestyle

- Removed Zero Lifestyle from the project catalogue, showcase and homepage
  highlights; removed its blog cover and preview mapping.
- Retired its slug for optional database reads, preventing its reappearance on
  work/legacy routes. Case studies and sitemap derive the removal automatically.
- Kept the general performance article, using its existing portfolio logo cover.

## 2026-11-03 - Priority services

- Promoted AI Automation, Conversion Rate Optimization (CRO) and Speed
  Optimization to the first three homepage and service-catalogue positions.
- Updated service introduction and footer links; enquiry options inherit the
  same priority. Preserved existing URLs and remaining development services.
- Checks: TypeScript, ESLint, production build, whitespace and SEO audit passed.
  Production HTML assertions verified the first three entries on homepage,
  Services and contact options, with all 20 services retained.

## 2026-11-03 - Software Engineer and AI Automation focus

- Removed public three-year experience copy from hero, About, homepage facts,
  metadata, Person schema and social image; set the portfolio role to Software
  Engineer and foregrounded AI Automation and connected workflows.
- Added an AI Automation & Workflow Integrations service and made it the first
  homepage service, with derived enquiry option, route, schema and sitemap.
- Moved hero positioning into HOME_HERO and removed stale database hero-text
  overrides. Updated header/footer and enquiry copy; preserved existing web
  projects, employment history, visual design and downloadable resume.
- AI content is an offering/focus; no client results or past AI projects invented.
- Validation: TypeScript, ESLint, production build and whitespace checks passed.
  SEO audit passed for 108 content pages, 20 services and 79 sitemap canonicals.
  Assertions confirmed Software Engineer in every Person schema and no old
  experience copy in page HTML/client props; new service/enquiry validation passed.
  Browser checks confirmed the new hero and contact option, one h1 and no
  horizontal overflow at 320/768/1280/1920px after responsive reflow settled.

## 2026-11-02 - CMBT Nutrition project and SEO case study

- Added CMBT Nutrition to the Shopify catalogue, homepage selected work and
  case-study listing using its verified live URL and official product artwork.
- Added technical/on-page SEO, collection/product optimization, linking, image
  audit and analytics scope from the supplied report. Kept the four search
  metrics as reported campaign totals/averages, with source, reporting-window
  and aggregate-position notes. No agency or personal results attribution inferred.
- Reused the existing detail template and data-derived routes/metadata/sitemap.
- Checks: TypeScript, ESLint and whitespace checks passed. Production HTML
  assertions confirmed both detail routes, homepage/work/case-study links,
  reported metrics and caveat, canonical choice and sitemap entry. SEO audit
  passed for 107 content pages and 78 sitemap URLs. WebP cover/preview formats
  verified (980x702 and 680x480). Browser preview timed out twice despite recovery;
  visual/responsive verification for CMBT remains unconfirmed.
  Production build passed and generated 114 pages.

## 2026-11-02 - Sprout Organic Shopify project and case study

- Added Sprout Organic to the Shopify catalogue, homepage selected work and
  derived case-study listing, with live URL and official local brand cover.
- Added its storefront/subscription, SEO, attribution and lifecycle narrative
  from the supplied MGN Ventures report. Preserved team attribution and reported
  results caveats, excluding paid-channel growth and separate reporting windows.
- Added optional Project credit/resultsNote fields and shared detail rendering.
  Project/case-study routes, metadata and sitemap derive from the existing data.
- Checks: TypeScript, ESLint and whitespace checks passed. Production HTML
  assertions confirmed both Sprout detail routes, homepage/work/case-study links,
  agency credit, reported figures, canonical choice and sitemap entry. The SEO
  audit passed across 105 content pages and 77 sitemap URLs. Browser checks at
  320/768/1280/1920px confirmed a loaded cover and no horizontal overflow; mobile
  visual inspection passed. Main/preview WebP files are 1200x630 and 680x480.

## 2026-11-02 - Technical SEO and WhatsApp setup guide

- Added safe Person/WebSite, ProfilePage, BlogPosting, Service and breadcrumb
  JSON-LD based on real site content. Improved global search copy and aligned
  route-level Open Graph/Twitter metadata with canonical URLs.
- Marked duplicate legacy project listing noindex/follow; retained its detail
  canonicals and existing sitemap/robots behavior.
- Added optional Search Console verification env support and owner instructions
  for verification, sitemap submission and monitoring in SEO.md.
- Documented the proposed official WhatsApp auto-reply integration, account
  requirements, conversation flow, durable message processing and human handoff.
  No WhatsApp bot was activated or external message sent.
- Validation: TypeScript, ESLint, production build and git diff --check passed.
  `node scripts/check-seo.mjs` checked 103 content pages, 130 JSON-LD blocks,
  one ProfilePage, seven BlogPosting entries, 19 services and 76 sitemap
  canonicals, including share images, titles/descriptions, one h1 and noindex.
  Separate assertions verified JSON-LD script-breakout protection and metadata
  preservation of article fields/noindex. Google Rich Results/Search Console
  verification and deployment remain owner steps; rankings were not measured.

## 2026-11-02 - Short header name

- Set the visible Navbar wordmark to Umer via SITE.shortName on every route,
  including deployments with a full-name database override.

## 2026-10-31 - Confirmed employment titles and availability

- Corrected MGN to Web Developer (Apr 2026–Aug 2026), and Tafsol to Web Developer /
  Front-End Developer (Jan 2024–Apr 2026). Both are marked Previous.
- Recorded MGN's approximate April start month and confirmed 24 August 2026 last
  working day, with a clarification on About. Updated homepage career summary.
- Shared "Available for new opportunities" across hero, contact and footer;
  retained approximately three years as the portfolio experience summary.
- Verification: TypeScript, ESLint, production build and whitespace checks
  passed. Browser checks confirmed two experience entries and no overflow at
  320/768/1280/1920px; production HTML assertions verified titles, date ranges,
  Previous status, availability and the joining/last-working-day clarification.

## 2026-10-31 - Employment history

- Added MGN Ventures (April–August 2026) and Tafsol Technology Pvt. Ltd.
  (January 2024–April 2026), using the user's updated dates and Full-Stack Web
  Developer responsibilities. Both roles have ended; no current role is claimed.
- Added the two roles, dates, location and user-confirmed responsibilities to
  About; homepage summary/facts now show both employers. Removed stale database
  About-text overrides while retaining the portrait override.
- Kept all employment content in the data layer and retained the dark/lime design.
- Updated the professional summary and core technologies from the user's text.
  These details supersede the older PDF's dates; the PDF remains unchanged.
- Browser verification: both roles and dates render on About; homepage facts
  show most-recent/previous teams with no old current-Tafsol claim. Both pages
  had no document overflow at 320/768/1280/1920px. TypeScript, ESLint and
  whitespace checks passed. Production build passed (110 generated pages);
  final HTML assertions verified both jobs, updated dates and core technologies.

## 2026-10-31 - Resume replacement and site review fixes

- Replaced the public resume with the supplied PDF; verified matching SHA-256.
  Centralized its URL in SITE and prevented stale database resume overrides.
- Added global lime keyboard focus outlines, menu focus cycling/restoration,
  and native overlay scrolling without changing the visual layout.
- Excluded malformed/placeholder database project slugs, preserving the static
  catalogue fallback. Rejected protocol-relative/backslash image paths.
- Browser checks: homepage at 320px and contact at 320/768/1280/1920px had no
  document overflow. Menu entry, Tab wrap and Escape passed. Empty contact
  submission focused email and marked email/service/message invalid without
  sending email. Email delivery and external project availability were not tested.
- Verification: TypeScript and ESLint passed; mocked database/image boundary
  assertions passed. Production HTML audit covered 104 content pages and 4,042
  internal link occurrences with no missing destinations and one h1 per page.
  The browser reported an existing lazy-loading warning for a later hero slide;
  slideshow loading and the documented contrast/loader decisions remain open.

## 2026-10-14 - Popup cancel cursor

Popup cursor fix: while ContactPopup is open, CSS restores native cursors across the document and dialog backdrop and hides the decorative cursor. Interactive descendants retain pointer styling, including close-button icons. The close target is now 44px with a non-intercepting icon. This avoids relying on z-index for a cursor beneath the native dialog top layer.


## 2026-10-14 - Complete reference alignment

Validation: `npx.cmd tsc --noEmit`, `npx.cmd eslint src`, `npm.cmd run build` and `git diff --check` passed. Production build generated 110 static pages. Parsed production HTML confirmed one h1, canonical URL, native dialog and enquiry triggers on 11 main routes; contact has 19 services plus placeholder; all 40 prerendered work details have a heading and canonical. These artifact/source checks do not replace desktop/mobile browser verification.

- Unified public page introductions, blog cards, project details and legacy project layouts; added dedicated Showcase and Free Assessment routes and canonical work detail URLs.
- Aligned homepage service exploration, work rows, project-story carousel, About facts, contact invitation, navigation and WhatsApp pill. Retained Umer identity, actual services and documented project narratives.
- Replaced footer brightness-only animation with a moving three-wave dot field; retained UMER wordmark and reduced-motion behavior.
- Reused the validated 19-service contact form inside a native dialog with service preselection, keyboard dismissal, scroll restoration and native pointer controls.
- Generated 34 local hover previews (577 KB total); suppressed three existing capture-service spinner images using a generated hash manifest.
- Source behavior checks passed for moving footer geometry, reduced motion, observer cleanup, dialog triggers, modifier clicks, service preselection, dismissal and session timer. Browser rendering remains unverified: after explicit user authorization, the browser tool still rejected localhost access. No alternative local-browser access was attempted.


Architectural decisions and notable changes. Newest first.

## 2026-10-14 — Contact form, native modal pointer and reference loader

- Redesigned ContactPanel with a clearer form panel and direct-contact sidebar.
  Added a required native service dropdown sourced from all 19 service pages.
- Moved contact copy/limits/options to `data/contact.ts`, and moved validation
  from the API to `lib/contact-validation.ts`, shared with the form. Selected
  service labels now reach plain-text and HTML emails. Unknown/missing service
  slugs are rejected; HTML escaping and existing throttle behavior remain.
- Fixed invisible popup pointer using scoped native-cursor zones for popup and
  form. The custom cursor is suppressed inside these zones, with pointer/text
  cursors restored by CSS, including native selects.
- Extracted the existing Navbar mark into BrandMark and reused it in Loader.
  Replaced the corner-name/large-counter loader with the reference's centered
  mark, compact percentage and thin bar using Umer branding. Lazy images no
  longer stall completion; a single 3-second deadline and complete timer cleanup
  replace the previous competing finish timers. Reduced motion skips it.
- Mock-provider checks verified all 19 service selections reach both email
  formats, invalid input never sends mail, escaping and throttling remain intact.
  A controlled timer check verified stalled assets cannot trap the loader and
  that previous body overflow is restored. No real email was sent.

## 2026-10-14 — Homepage sections and service exploration

- Reordered the homepage to the requested reference sequence: services and
  process before work; blog after showcase; contact invitation at the end.
  Removed TechStack from homepage composition and added case-study highlights.
- Added Explore links to all six service accordions and fixed View all services
  to navigate to `/services`. Six platform-service links expose Umer's full stack.
- Added five detail hubs using the existing service-page template and generated
  sitemap: speed, migration overview, CRO, native features and store management.
  The service count is data-derived (19). No reference-site pricing is borrowed.
- Replaced the approach rail with five benefit cards and a proposal CTA.
- Removed the legacy homepage inline form and gradient contact layout, replacing
  them with a compact current-system invitation. `/contact` is the single form;
  the hero proposal link opens it directly.
- New copy lives in `src/data/homepage.ts`. Existing case studies supply evidence
  while approved client testimonials remain unavailable; no quotes are fabricated.

## 2026-10-14 — Reference footer and fast hover screenshots

- Matched the requested reference footer treatment with a decorative lime dot
  field and a full-width FAROOQUE surname wordmark. Footer copy lives in
  `FOOTER_CONTENT`; existing link groups and marquee are retained.
- Generated 34 local 680×480 WebP preview assets (577 KB total) from existing
  website screenshots. `npm run images:previews` regenerates assets and their
  data mapping. The homepage loads these eagerly as the work section approaches,
  only on desktop pointers, and bypasses the runtime image optimizer.
- Excluded three capture-service spinner images from hover previews (Elan,
  OutriderX, Hajiq). Missing captures use a labelled fallback.
- Fresh captures and browser visual QA could not be completed: Elan's live
  domain returned a certificate error; browser access to Zero Lifestyle and the
  local preview was denied. No fresh capture is claimed.

## 2026-10-14 — QA fixes

- Navbar's shared Start project CTA now uses `/contact` from `src/data/navLinks.ts`
  and closes the menu. Its previous `#contact` target did not exist on other pages.
- ContactPanel focuses the first invalid field using the current validation result,
  rather than querying `aria-invalid` before React commits the error state.
- Contact API returns 400 for malformed or empty JSON bodies before validation or
  rate limiting; provider and unexpected failures retain their existing responses.

Add an entry whenever you change architecture, delete code, consolidate duplication, or
make a decision a future developer would otherwise have to reverse-engineer. Routine
content edits do not need one.

---


## 2026-10-13 (d)

### Change
Added `ContactPopup` — a contact prompt that opens 15 seconds after arrival, mounted once in
`MainLayout`.

Built as a prompt, not a third copy of the form. Two already exist (`ContactPanel` on
/contact, and the legacy inline one in `ContactSection`); a third would mean a third set of
validation and error states to keep in step with the Zod schema, for no gain over two buttons.

Restraint, because a timed popup is intrusive by default:
- once per browser session (`sessionStorage`), and never again once dismissed
- never on `/contact`, where it would be telling someone to do what they are already doing
- reduced motion still gets it, just without the scale — hiding content from those users
  would be the wrong trade

Accessibility: `role="dialog"` + `aria-modal`, labelled and described, Escape closes, Tab
trapped inside, focus moved in on open and returned to its origin on close, backdrop click
dismisses.

### Files
Added `src/components/organisms/ContactPopup.tsx`. Modified
`src/components/templates/MainLayout.tsx`, `docs/COMPONENTS.md`, `docs/ARCHITECTURE.md`.

### Notes
- Delay lives in `DELAY_MS`.
- A first attempt had a "close on route change" effect; the `react-hooks/set-state-in-effect`
  rule rejected it and it was useless anyway — the backdrop covers the page, so the only way
  to navigate is to dismiss first.
- tsc 0 errors, eslint 0 problems, build exit 0 with zero warnings. Verified the popup is
  absent from the server-rendered HTML (it is timer-gated on the client) and that all routes
  still return 200.
- **Not verified from here:** the 15-second appearance, the focus trap and the dismissal
  memory all need a real browser. Worth one pass on desktop and on the iPhone.

---

## 2026-10-13 (c)

### Change
Rebuilt `/contact`, added `/process`, and fixed a menu that could not reach either.

**The menu was pointing at the wrong places.** `navLinks` mixed real routes with home-page
anchors — `/#process`, `/#showcase`, `/#faq` and `/#contact`. From anywhere other than the
home page those threw you back to it, and **"Contact" went to the home-page section even
though a `/contact` page existed**, so the page Umer asked to improve was unreachable from the
nav. The menu is now routes only: Work, Services, Process, Case Studies, Blog, Contact,
Resume. Showcase and FAQ stay as home-page sections — neither has enough content for a page.

The same `/#contact` link was repeated in `blog/[slug]`, `services/[slug]` and five
`FOOTER_COLUMNS` entries. All now point at `/contact`.

**`/process`** — the five `processSteps` long-form. The home page runs them as a pinned
horizontal scroll, which is good at being noticed and bad at being read; this is the readable
version, and a real URL to send a client who asked how the work runs.

**`ContactPanel`** — a new `/contact` body in the current design system. The home page's
legacy `ContactSection` was left untouched on purpose. The form now validates before posting,
shows the route's own error text instead of a generic line, announces state through one
`aria-live` region, cannot be double-submitted, swaps to a success panel with a "send another"
path, and has real `focus-visible` rings. `alert()` is gone.

### Files
Added `src/app/process/page.tsx`, `src/components/organisms/ContactPanel.tsx`. Rewrote
`src/app/contact/page.tsx`, `src/data/navLinks.ts`. Modified `src/app/sitemap.ts`,
`src/data/site.ts`, `blog/[slug]/page.tsx`, `services/[slug]/page.tsx`, docs.

### Notes
- `LIMITS` in `ContactPanel` mirrors the Zod schema in `api/contact/route.ts`. Keep them in step.
- Two contact forms now exist. That is deliberate while the home page stays on the legacy
  design; when it is converted, it should adopt `ContactPanel`'s form and the inline one in
  `ContactSection` should go.
- tsc 0 errors, eslint 0 problems, build exit 0 with zero warnings. Every nav link resolves
  200, `/process` and `/contact` each carry one h1 and a unique title, sitemap is 55 URLs with
  `/process` in it, and the contact API still returns 400 on bad input and 405 on GET.
- The new contact page renders zero legacy sky/purple classes and contains no `alert(`.

---

## 2026-10-13 (b)

### Change
Fixed both footer bugs Umer reported from an iPhone 11 Pro: the "UMER" wordmark
tearing, and the availability marquee not scrolling.

**Wordmark — a regression I introduced.** The earlier fix had a ResizeObserver
watching the same span that `fit()` mutated: `fit()` set the span to 100px to
measure it and set it back, which is itself a size change. ResizeObserver
callbacks are asynchronous, so the re-entrancy flag meant to suppress that was
always `false` again by the time one arrived — every fit queued another fit, every
frame, forever. Desktop browsers swallow the loop; iOS Safari painted it, which is
the RGB fringing on the glyphs.

Measurement now happens on a separate hidden probe pinned at 100px that `fit()`
never writes to. The observer watches the probe (changes only when the webfont
swaps in — exactly the signal worth re-fitting on) and the container (resize).
Neither is mutated, so it cannot feed itself.

**Marquee.** Two causes covered, since Umer had not checked whether iOS Reduce
Motion was on:
- `-webkit-mask-image` creates a compositing context on iOS Safari that can leave a
  child's CSS animation unpainted. The track now gets its own layer via
  `.marquee-track` (`translateZ(0)`, `will-change: transform`).
- Under reduced motion the animation simply stopped, parking the track at
  translateX(0) behind the edge mask, so the line read as clipped rather than
  deliberately still. Reduced motion now hides the scrolling pair and shows a
  single centred copy, and the mask is switched off because a fade on static text
  just looks like clipping.

The mask moved from an inline style to `.marquee-mask` in globals.css so a media
query can switch it off. The strip also gained `select-none` — the accent-coloured
boxes in Umer's screenshot were `::selection` on text nobody means to select.

### Files
`src/components/organisms/Footer.tsx`, `src/app/globals.css`.

### Notes
tsc 0 errors, eslint 0 problems, build exit 0 with zero warnings. Verified in the
emitted CSS that `.marquee-mask`, `.marquee-track`, their reduced-motion overrides,
the `marquee` keyframes and the `animate-[...]`, `motion-reduce:hidden` and
`motion-reduce:flex` utilities are all present, and in the rendered HTML that both
wordmark spans exist with the probe untouched.

Neither fix could be confirmed on real iOS from here — Umer needs to recheck on the
phone.

---

## 2026-10-13

### Change
Added an SEO service page built around the partnership with Hanif Rahimoon
(HanifDigiLab), plus three of his case studies, credited to him on every card.

- `src/data/seo-partnership.ts` — `SEO_PARTNER`, `seoCaseStudies` (The Dental Land,
  The Real-estate Law Group, Giftflys) and `TECHNICAL_SEO_SCOPE`.
- `src/data/services-pages.ts` — new `seo-and-search-visibility` entry; the `group` union
  gains `"seo"` alongside `"build"` and `"migration"`.
- `src/app/services/page.tsx` — a third "Search" group on the index.
- `src/app/services/[slug]/page.tsx` — renders the partner case studies for `group === "seo"`.

### Reason
Umer asked for the SEO projects and case studies from hanifdigilab.com. That site is Hanif
Rahimoon's own portfolio — his clients, his nine years of SEO, his Search Console reports —
so copying them across as Umer's work would have been exactly the fabrication this project
has had to undo once already. Umer confirmed the two are partners and that the credit should
be explicit, and that his own search work is technical SEO on the sites he builds.

So the page sells the partnership rather than borrowing a CV: the section lead names Hanif and
links to his site, every card carries `SEO by Hanif Rahimoon, HanifDigiLab` plus the report
type, and the deliverables separate his half (strategy, keyword work, Search Console
reporting) from Umer's (metadata, sitemap, robots, JSON-LD, heading order, Core Web Vitals,
crawlability).

### Files
Added `src/data/seo-partnership.ts`. Modified `services-pages.ts`, `services/page.tsx`,
`services/[slug]/page.tsx`, `docs/DATA_MODEL.md`, `docs/PROJECT_MAP.md`.

### Notes
- Figures are transcribed verbatim from the partner's case-studies page — not rounded or
  reinterpreted. Each entry keeps his own caveat (average position is an aggregate, not one
  keyword's ranking; Search Console clicks do not establish enquiries or clients). Those
  caveats make the page more credible, not less — keep them.
- Giftflys has no Search Console export, only search-result screenshots, so its `metrics`
  array is empty and the card says no click or impression figures are claimed.
- Hanif's permission to publish his client names and Search Console figures here was
  confirmed by Umer. MGN Ventures was then dropped at Umer's instruction, so three case
  studies ship.
- tsc 0 errors, eslint 0 problems, build exit 0 with zero warnings. The new route returns 200
  with one h1, a unique title and a canonical, and appears in the sitemap (now 54 URLs).

---

## 2026-10-07

### Change
SEO metadata completed across every route, plus `sitemap.ts`, `robots.ts`,
`opengraph-image.tsx` and a styled `not-found.tsx`. Full QA pass alongside it, which
turned up a soft 404.

**Metadata** — `/`, `/about`, `/projects` and `/projects/[id]` had no `metadata` export at
all and were serving the site-wide default title, so four routes competed with each other
in search. All now have their own title, description and canonical; `/projects/[id]` has a
`generateMetadata` that also emits per-project Open Graph. `/work` gained the canonical it
was missing. Verified in the built HTML: every page has a unique title, a description, one
canonical, and `og:image`.

**`src/app/opengraph-image.tsx`** — generated via `next/og`. `twitter:card` had been set to
`summary_large_image` with no image, so every share rendered as a bare text link. 1200×630,
~54 KB.

**`src/app/sitemap.ts`** — 53 URLs built from the same data that generates the routes.
`/projects*` is excluded as a duplicate of `/work`. Every one of the 53 verified to return 200.

**`src/app/robots.ts`** — allows everything, disallows `/api/`, advertises the sitemap.

**`src/app/not-found.tsx`** — unmatched URLs and `notFound()` calls previously fell through
to Next's unstyled default.

**Soft 404 fixed** — `/projects/nope` returned **200** with "Project Not Found" text on it,
so crawlers would index it as a real page. It now calls `notFound()`, matching how blog,
case-studies and services already behaved.

**One `<h1>` per page** — `/about`, `/contact` and `/projects` had none. `AboutSection` and
`ContactSection` are shared with the home page, so a blanket change would have given the
home page three h1s. Both now take `headingAs` (default `"h2"`), and the standalone pages
pass `"h1"`. `ProjectsSection` renders `h1` directly since `/projects` is its only consumer.
Purely semantic — the type scale comes from the className either way.

**`SITE_URL`** — the canonical origin was duplicated in `layout.tsx` with a fallback still
pointing at the old `umer-porfolio.vercel.app` domain. Now one export in `src/data/site.ts`,
consumed by the layout, sitemap and robots.

### Reason
These were the SEO gaps flagged in the audit and left open pending a decision. Umer asked
for the metadata and a QA pass, which made them in scope.

### Files
Added: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`,
`src/app/not-found.tsx`. Modified: `layout.tsx`, `page.tsx`, `about/`, `work/`, `projects/`,
`projects/[id]/`, `contact/`, `AboutSection`, `ContactSection`, `ProjectsSection`,
`data/site.ts`, `.env.example`, docs.

### Notes
QA results: tsc 0 errors, eslint 0 problems, build exit 0 with zero warnings. 16 routes 200,
5 negative cases all 404 (including the fixed soft 404). Contact API 405 on GET/PUT, 400 on
invalid email / empty message / oversized message. 7 security headers present, `x-powered-by`
absent. Image optimizer still rejects external hosts, cloud metadata and path traversal.
Zero images missing `alt`, zero external image hosts. Production `npm audit`: 0
vulnerabilities. Homepage 193 KB HTML (23 KB gzip) and 332 KB gzip JS — unchanged, still the
main performance debt.

Still open: JSON-LD structured data, web manifest, body-text contrast (2.8:1), focus
indicators, the 1.4 s loader gate, and the 332 KB JS.

---

## 2026-10-06

### Change
Added a documentation layer in `/docs` and cleaned up vibe-code debt. No redesign, no
visual changes beyond two text-rendering bug fixes and one data-sourcing side effect
(noted below).

**Documentation created (10 files):**
`CONTEXT.md` · `PROJECT_MAP.md` · `ARCHITECTURE.md` · `COMPONENTS.md` · `DATA_MODEL.md` ·
`DESIGN_SYSTEM.md` · `ANIMATIONS.md` · `SEO.md` · `SECURITY.md` · `AI_GUIDE.md` ·
this `CHANGELOG.md`. `AGENTS.md` now points at `docs/CONTEXT.md` (outside the
Next.js-managed block, so `next dev` will not overwrite it).

**Dead code removed (6 files):**
- `src/components/organisms/CMSForm.tsx` — no importers
- `src/components/organisms/ProjectForm.tsx` — no importers
- `src/app/actions/cms-actions.ts` — no importers
- `src/app/actions/project-actions.ts` — only importer was `ProjectForm`
- `src/lib/action-result.ts` — only used by the two action files
- `src/lib/validations.ts` — only used by the two action files

These were the remains of an admin CMS whose routes (`/dashboard`, NextAuth, signin/signup)
were deleted in an earlier phase. They also posted to `/api/upload`, which does not exist.
`cms-actions.ts` logged the full submitted payload via `console.log`, removed with it.

**Bug fixes:**
| Fix | File |
|---|---|
| Prisma type imported from a stale gitignored generated dir → `@prisma/client` | `src/lib/db-project.ts` |
| `{""}` rendered "somethinggreat?" → `{" "}` | `ContactSection.tsx:41` |
| `{""}` rendered "Toolsmaster" → `{" "}` | `TechStack.tsx:50` |
| Contact form `subject` was silently discarded — added to the Zod schema and to the email subject, text and HTML bodies | `api/contact/route.ts` |
| Rate limiter ran before validation, so three typos locked a visitor out for 60 s — validation now runs first | `api/contact/route.ts` |
| Root layout's Prisma read had no error handling, making one DB outage a 58-route failure — now `.catch(() => null)` | `MainLayout.tsx` |

**Single source of truth:**
- `isShipped()` + `shippedProjects` added to `src/data/projects.ts`. The
  `!id.includes("placeholder")` filter had been copy-pasted into `WorkSection.tsx`,
  `work/page.tsx` and `lib/case-studies.ts`; all three now use the shared predicate.
- `ContactSection`'s `CONTACT_LINKS` now derives every value from `SITE` in
  `src/data/site.ts`. It previously restated the email, phone, LinkedIn and GitHub URLs,
  and the error-path `alert()` hardcoded the email address again.

**Housekeeping:**
- 56 formatting artifacts fixed (`import"./globals.css"`, `==="`, `?:"`, `|"`, ` :"`) across
  `layout.tsx`, `Button`, `Heading`, `Text`, `ProjectsSection`, `TechStack`,
  `ContactSection`. These were residue from an earlier bad regex pass.
- `.gitignore`: added `/src/generated`, `/.claude`, `/scratch`, `/public/uploads`.
  `src/generated/client` (75 MB, including Prisma query-engine binaries) was previously
  untracked **and** unignored, so `git add .` would have committed it.
- Removed the `cloudinary` dependency — imported nowhere.
- Deleted 6 orphaned `query_engine-windows.dll.node.tmp*` files. `src/` went from 152 MB to
  42 MB.

### Reason
The project was built by vibe coding and had accumulated typical debt: an orphaned feature
island, duplicated predicates, duplicated identity data, formatting residue, and ~110 MB of
abandoned build artifacts. More importantly it had no documentation layer, so every AI or
human session had to re-read the whole codebase to make a one-line change.

The dead admin code was also a latent security problem: `cms-actions.ts` and
`project-actions.ts` were unauthenticated mutation server actions. They were not reachable
(nothing imported them, so Next never registered their action IDs), but they would have
become a public write API the moment anyone rendered those forms.

### Files
Deleted 6 · modified 12 · created 11 (all docs). Backups of the deleted files are in the
session scratchpad under `deadcode-backup/`.

### Notes
- **Two intentional visible changes**, both consequences of sourcing from `SITE`:
  the contact Location card now reads **"Karachi, Pakistan (GMT+5)"** instead of
  "Pakistan (GMT+5)", and the LinkedIn href gained `www.` (same destination). Revert by
  overriding those two entries in `CONTACT_LINKS` if you prefer the old strings.
- `src/generated/prisma` and `src/generated/client` (~42 MB) are now gitignored but still on
  disk. Nothing imports them. Safe to delete whenever convenient.
- Verified after the changes: `npx tsc --noEmit` **0 errors**, `npx eslint src`
  **0 problems**, `npm run build` **exit 0 with zero warnings**, same 58 routes (7 blog,
  26 case studies, 13 services). All 12 routes return 200, `/nope` 404. Contact API
  re-probed: invalid → 400 ×5 with no 429 (typos no longer throttled), 3 valid → then 429
  (limiter still protects sends), 250-char subject → 400 (proving `subject` is validated
  rather than stripped), `GET`/`PUT` → 405.
- The two rendered text fixes were confirmed in live HTML
  (`Ready to build something<!-- --> <span`).
- No email was sent during testing: the valid-request probes ran against a throwaway server
  with `RESEND_API_KEY` blanked, so they stopped at 503 before reaching Resend.

### Deliberately NOT changed
Each needs a product or design decision, and all are documented in `AI_GUIDE.md` §"Current
known issues":
SQLite-on-Vercel · body-text contrast 2.82:1 · missing focus indicators · missing
`og:image`/`sitemap.xml`/`robots.txt` · missing `<h1>` on 3 pages · the 1.4 s loader gate ·
332 KB gzip homepage JS · `alert()`-based contact feedback · the legacy sky/purple design
system on `/projects*` and `/contact` · the unused `User.password` column · 5 dev-only npm
advisories.

---

## Earlier (reconstructed, pre-dating this changelog)

Not contemporaneous records — assembled from the code and git history so the decisions are
not lost.

### Design tokens extracted from a compiled reference stylesheet
`globals.css` `@theme` values (`clamp(48px, 6vw, 96px)`, `cubic-bezier(0.16, 1, 0.3, 1)`,
`#c8ff00`, …) were read from a reference site's compiled CSS rather than estimated. **Do not
round them.**

### `src/lib/motion.ts` created to fix 28 TypeScript errors
Inline Framer variants containing `type: "spring"` widen to `string`. Centralising typed
`Variants`/`Transition` objects fixed it. New variants belong there.

### Auth and the admin dashboard removed
NextAuth, `/dashboard`, `/login`, `/signup` and the auth API routes were deleted. The site
is now fully public. Residue: `prisma/schema.prisma` still declares `User { password }`, and
`.env` still holds `NEXTAUTH_*` and `CLOUDINARY_*` values that should be removed and rotated.

### Image pipeline moved from a remote service to local WebP
Screenshots had been proxied from `image.thum.io` and were served as PNG/GIF behind `.jpg`
extensions, so `next/image` passed them through unoptimised at up to 1.6 MB each.
`scripts/optimize-images.mjs` re-encodes to WebP ≤1400px q76: 29 MB → 636 KB.

### Image optimizer locked down
`remotePatterns` had `hostname: "**"`, making the optimizer an open image proxy. Replaced
with an explicit `res.cloudinary.com` allow-list, plus `safeImageUrl()` in `db-project.ts`
so a stale DB row degrades to a placeholder instead of 500-ing.

### Security headers and CSP added
Seven headers in `next.config.ts` including HSTS and CSP, plus `poweredByHeader: false`.

### Fabricated content removed
Copied statistics, testimonials and pricing were deleted. `stats` is now `[]` and consumers
render `null` when empty. **Do not refill it with invented numbers.**

### Project URLs corrected
Six of ten store URLs had been guessed and were dead. All ten are now verified to resolve.
