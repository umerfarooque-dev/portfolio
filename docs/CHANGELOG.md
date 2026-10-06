# CHANGELOG

Architectural decisions and notable changes. Newest first.

Add an entry whenever you change architecture, delete code, consolidate duplication, or
make a decision a future developer would otherwise have to reverse-engineer. Routine
content edits do not need one.

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
