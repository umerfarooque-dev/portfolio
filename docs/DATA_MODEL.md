# DATA MODEL

Where every piece of content lives. The question this file answers:
**"I want to change X — which file do I edit?"**

All site content lives in `src/data/*.ts` as plain typed TypeScript. There is no CMS and no
MDX. The only exception is `/projects*`, which reads from Prisma.

---

## Quick lookup

| I want to change… | File | Export |
|---|---|---|
| My name, role, tagline, years of experience | `src/data/site.ts` | `SITE` |
| My email | `src/data/site.ts` | `SITE.email` |
| My WhatsApp number | `src/data/site.ts` | `SITE.whatsapp` / `SITE.phoneLabel` |
| GitHub / LinkedIn / Upwork links | `src/data/site.ts` | `SITE.github` / `.linkedin` / `.upwork` |
| Location / timezone / clock | `src/data/site.ts` | `SITE.location` / `.timeZone` / `.timeZoneLabel` |
| Hero keyword rows | `src/data/site.ts` | `HERO_LABEL_ROWS` |
| Footer columns and links | `src/data/site.ts` | `FOOTER_COLUMNS` |
| Header nav items | `src/data/navLinks.ts` | `navLinks` |
| A Shopify store project | `src/data/store-projects.ts` | `storeProjects` |
| A React/Next project | `src/data/custom-projects.ts` | `customProjects` |
| Project groups / filter labels | `src/data/projects.ts` | `PROJECT_GROUPS`, `getProjectGroup()` |
| Services list (homepage accordion) | `src/data/site-content.ts` | `services` |
| Process steps (pinned scroll) | `src/data/site-content.ts` | `processSteps` |
| Stat counters | `src/data/site-content.ts` | `stats` — **currently empty** |
| Client testimonials | `src/data/site-content.ts` | `testimonials` |
| FAQs | `src/data/site-content.ts` | `faqs` |
| A service detail page | `src/data/services-pages.ts` | `servicePages` |
| A blog post | `src/data/blog.ts` | `posts` |
| Showcase carousel items | `src/data/showcase.ts` | `showcaseItems` |
| "Principles" copy | `src/data/showcase.ts` | `principles` |
| Résumé PDF | `public/resume/Umer-Farooque-Resume.pdf` |
| Hero background images | drop files in `public/hero/` |
| Project screenshots | drop WebP in `public/projects/`, then `npm run images` |

---

## 1. Identity — `src/data/site.ts`

```ts
export const SITE = {
  name, role, tagline, experienceYears,
  email, whatsapp, phoneLabel,
  location, since, employer,
  timeZoneLabel, timeZone,
  upwork, github, linkedin,
} as const
```

**This is the single source of truth for personal information.** Everything derived from
the CV lives here so the site never claims more experience or a different role than the CV.

Consumers: `Navbar`, `Footer`, `HeroSection`, `AboutSection`, `ContactSection`,
`FloatingWhatsApp`, `TestimonialsSection`, `Loader`, `api/contact` (fallback TO address),
and every page's `metadata`.

**Rule:** if you find a hardcoded email, phone number or social URL in a component, that is
a bug — replace it with a `SITE` reference.

Also exported here:
- `HERO_LABEL_ROWS: string[][]` — the two three-up keyword rows in the hero
- `FOOTER_COLUMNS: FooterColumn[]` — six footer columns (`heading`, `links[]`, `dotted?`)

---

## 2. Projects — three files, one merged array

```
store-projects.ts   (10 Shopify storefronts)
custom-projects.ts  ( 7 React/Next apps)        ──► projects.ts ──► projects[]
projects.ts         (otherProjects, incl. WordPress + 2 placeholders)
```

```ts
export const projects: Project[] = [...storeProjects, ...customProjects, ...otherProjects];
```

### The `Project` type (`src/data/projects.ts`)

| Field | Required | Purpose |
|---|---|---|
| `id` | ✅ | URL slug — used by `/case-studies/[slug]` and `/projects/[id]` |
| `title` | ✅ | Display name |
| `description` | ✅ | One-line summary |
| `liveUrl` | ✅ | Public URL, or `"#"` when there isn't one |
| `imageUrl` | ✅ | Path under `/public`, or `""` → `ProjectImage` shows a placeholder |
| `tags` | | Tech chips |
| `stack` | | `"laravel" \| "wordpress" \| "shopify" \| "nextjs"` — overrides the role-derived value |
| `fullDescription`, `scope`, `techStack`, `features`, `duration`, `role`, `category` | | Detail page content |
| `tagline`, `challenge`, `approach`, `results[]`, `codeUrl` | | **Case study fields** |
| `gallery` | | Extra screenshots (mostly unused) |

### Which projects become case studies

`src/lib/case-studies.ts`:
```ts
isCaseStudy = (p) => p.challenge && p.approach && !p.id.includes("placeholder")
```
→ 26 case studies, each prerendered at `/case-studies/[slug]`.

**So: to turn a project into a case study, give it `challenge` and `approach`.** Nothing
else to register.

### Which projects are "shipped"

Two entries in `otherProjects` are seeded placeholders
(`project-react-placeholder`, `project-nextjs-placeholder`). They are filtered out of every
public listing by `isShipped` / `shippedProjects` in `projects.ts`.

**Use `shippedProjects` (not `projects`) for any new public listing.** Verified: the
placeholders render on no page.

### Project groups

`getProjectGroup(project)` → `"shopify" | "wordpress" | "custom"`, driving the `/work` and
`/projects` filter tabs. `PROJECT_GROUPS` holds the tab labels.

---

## 3. Site content — `src/data/site-content.ts`

| Export | Type | Used by | Notes |
|---|---|---|---|
| `services` | `Service[]` | `ServicesSection` | 6 items; `AccentKey` = `sapphire \| emerald \| violet \| amber` |
| `processSteps` | `ProcessStep[]` | `ProcessSection` | 5 steps, pinned horizontal scroll |
| `stats` | `Stat[]` | — | **`[]` on purpose.** Fabricated numbers were removed; awaiting real figures. Consumers render `null` when empty — do not invent values. |
| `testimonials` | `Testimonial[]` | `TestimonialsSection` | 2 real Upwork reviews. Section returns `null` if empty. |
| `faqs` | `Faq[]` | `FaqSection` | 7 items, rendered as a two-column `<dl>` |
| `footerGroups` | `FooterGroup[]` | — | Superseded by `FOOTER_COLUMNS` in `site.ts` |

---

## 4. Service pages — `src/data/services-pages.ts`

`servicePages: ServicePage[]` — 13 entries (8 build services + 5 migrations), each
prerendered at `/services/[slug]` via `generateStaticParams`. `getServicePage(slug)` looks
one up.

**Adding a service page:** append to the array. The route, metadata and static path are all
generated — no other file to touch.

---

## 5. Blog — `src/data/blog.ts`

```ts
export type Block =
  | { type: "p";     text: string }
  | { type: "h2";    text: string }
  | { type: "ul";    items: string[] }
  | { type: "quote"; text: string }

export interface Post {
  slug, title, excerpt, date, readingMinutes, tags[], cover, body: Block[]
}
```

7 posts. `getPost(slug)`, `formatDate(iso)`. `cover` points at `/projects/<id>.webp` —
blog covers deliberately reuse project screenshots rather than duplicating files.

**Why a `Block` union instead of MDX:** full type safety, no MDX build pipeline, and the
renderer is a plain `switch` in `blog/[slug]/page.tsx`. The cost is verbose authoring.
**Adding a block type means updating both the union and that switch.**

---

## 6. Showcase — `src/data/showcase.ts`

`showcaseItems: ShowcaseItem[]` (6) and `principles: Principle[]` (4).
`showcaseImage(item)` → `` `/projects/${item.project}.webp` `` — so a showcase item points
at a project by id rather than storing its own image path.

---

## 7. Navigation — `src/data/navLinks.ts`

`navLinks: NavLink[]` → Work, Services, Process, Showcase, Case Studies, Blog, FAQ,
Contact, Resume. Consumed by `Navbar`.

---

## 8. Database (legacy) — `prisma/schema.prisma`

Used **only** by `/projects`, `/projects/[id]`, and one `siteContent` read in `MainLayout`,
`page.tsx` and `about/page.tsx`.

| Model | Status |
|---|---|
| `Project` | Live — backs `/projects*` |
| `SiteContent` | Live — one row, `id: "site-settings"` → `SiteConfig` in `src/types/site.ts` |
| `User` (with `password`) | **Dead** — auth was removed |
| `Skill`, `Service`, `Education` | **Dead** — the admin CMS was removed |

`src/lib/db-project.ts` → `toProject(row)` maps a DB row to the app `Project` type. It sets
`id = row.slug`, JSON-parses `tags`/`scope`/etc. inside a try/catch, and runs every image
URL through `safeImageUrl()` which allows only relative paths and `res.cloudinary.com`.

> ⚠️ `/projects` largely duplicates `/work`, and SQLite is why the Vercel build fails.
> Retiring the DB in favour of `src/data/projects.ts` is the recommended simplification —
> see `ARCHITECTURE.md` §9.

---

## 9. Content that is NOT in a data file

Worth knowing, because these are the exceptions:

| Content | Lives in | Should it move? |
|---|---|---|
| `/contact` page copy and `colorMap` | `ContactSection.tsx` | Low priority |
| `TechStack` tool list | `TechStack.tsx` | Could move to `site-content.ts` |
| Page titles & descriptions | each page's `metadata` export | No — this is the Next.js convention |
| Design tokens | `src/app/globals.css` `@theme` | No |
| Animation timings | `src/lib/motion.ts` | No |

---

## 10. Rules

1. **Content changes are data-file changes.** If you are editing a component to change
   wording, stop and check whether the string belongs in `src/data/`.
2. **Never import React into `src/data/`.** These modules are consumed by both server and
   client components.
3. **Keep types next to their data** (`Project` in `projects.ts`, `Post` in `blog.ts`).
   Only genuinely shared types go in `src/types/`.
4. **Use `shippedProjects` for public listings**, not `projects`.
5. **Do not invent statistics, testimonials or client names.** `stats` is empty because
   fabricated numbers were removed once already.
6. **Verify project URLs before adding them.** Six of ten store URLs were wrong on first
   pass; each one is now confirmed to resolve.
