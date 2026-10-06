# PROJECT MAP

What every directory is for, what belongs there, and what must not be touched.

---

## Top level

```
umer-next-js-portfolio/
├── docs/                  ← this documentation layer ("the brain")
├── prisma/                ← DB schema, migrations, local SQLite file
├── public/                ← static assets served at the web root
├── scripts/               ← one-off maintenance scripts (image optimisation)
├── src/                   ← all application code
├── AGENTS.md              ← agent rules; Next.js manages the top block
├── CLAUDE.md              ← just `@AGENTS.md`
├── next.config.ts         ← security headers, CSP, image allow-list
├── eslint.config.mjs      ← flat config; ignores src/generated
├── postcss.config.mjs     ← Tailwind v4 via @tailwindcss/postcss
├── tsconfig.json          ← strict, `@/*` → `./src/*`
└── package.json
```

**There is no `tailwind.config.js` and there should not be.** Tailwind v4 reads its tokens
from the `@theme` block in `src/app/globals.css`.

---

## `src/app/` — routes (App Router)

```
src/app/
├── layout.tsx             ← root layout: fonts, <head>, skip link, MainLayout
├── template.tsx           ← per-navigation wrapper (page transition)
├── globals.css            ← ⚠️ THE design system lives here (@theme)
├── page.tsx               ← homepage; composes 13 sections
├── not-found.tsx          ← site-wide 404 (unmatched URLs + every notFound() call)
├── sitemap.ts             ← 53 URLs, generated from src/data/*
├── robots.ts              ← allow all, disallow /api/, points at the sitemap
├── opengraph-image.tsx    ← 1200×630 social card via next/og
├── icon.png               ← favicon (App Router convention)
├── about/page.tsx
├── work/page.tsx
├── services/page.tsx + [slug]/page.tsx       (13 SSG pages)
├── blog/page.tsx + [slug]/page.tsx           (7 SSG pages)
├── case-studies/page.tsx + [slug]/page.tsx   (26 SSG pages)
├── contact/page.tsx
├── projects/page.tsx + [id]/page.tsx         ← LEGACY, DB-driven
└── api/contact/route.ts   ← the only API route
```

**Modify here when:** adding a route, changing page-level metadata, changing which
sections appear on a page, or changing `revalidate`.

**Do NOT here:** put presentation logic or content strings. Pages compose components and
read from `src/data/`. Keep them thin.

**Watch out:** `page.tsx` files are **server components**. Adding an `onClick` to one
breaks the build at prerender time. Use the stretched-link pattern (an absolutely
positioned `<Link>` filling the card) as `case-studies/[slug]/page.tsx` does.

---

## `src/components/` — atomic design

```
src/components/
├── atoms/        ← smallest reusable pieces (12 files)
├── molecules/    ← small compositions (2 files)
├── organisms/    ← full page sections (21 files)
├── providers/    ← context/side-effect wrappers (2 files)
└── templates/    ← MainLayout (1 file)
```

| Folder | Purpose | Notes |
|---|---|---|
| `atoms/` | Text reveals, cursor, magnetic wrapper, image fallback, progress bar, plus the legacy `Button`/`Heading`/`Text`/`GlassCard` | Mostly client components because they animate |
| `molecules/` | `FloatingWhatsApp`, `ProjectCard` (legacy) | — |
| `organisms/` | One file per page section — `HeroSection`, `WorkSection`, `ServicesSection`, `ProcessSection`, `ShowcaseSection`, `Footer`, `Navbar`, `Loader`, … | This is where almost all UI work happens |
| `providers/` | `MotionProvider` (reduced-motion config), `SmoothScroll` (Lenis↔GSAP) | ⚠️ Fragile wiring — see `ANIMATIONS.md` |
| `templates/` | `MainLayout` — chrome shared by all 58 routes | Server component; one Prisma read |

**Modify here when:** changing how a section looks or behaves.

**Do NOT here:** hardcode copy, project data, URLs or social links. Import from
`src/data/`. If you need a new section, add an organism — do not inline it in a page.

**Naming:** PascalCase files, named exports (`export const Foo = …`), one component per
file. Follow it.

---

## `src/data/` — all site content (the CMS)

```
src/data/
├── site.ts            ← SITE identity, HERO_LABEL_ROWS, FOOTER_COLUMNS
├── site-content.ts    ← services, processSteps, stats, testimonials, faqs, footerGroups
├── projects.ts        ← Project type + merge of all project sources (754 lines)
├── store-projects.ts  ← 10 Shopify storefronts
├── custom-projects.ts ← 7 React/Next apps
├── services-pages.ts  ← 13 service detail pages
├── blog.ts            ← 7 posts as structured Block[] (no MDX)
├── showcase.ts        ← showcase carousel items + principles
└── navLinks.ts        ← header navigation
```

**This is the content layer. Editing content means editing these files and nothing else.**

**Modify here when:** adding/changing a project, post, service, FAQ, testimonial, nav
item, or any personal detail.

**Do NOT here:** import React or any component. These are plain data modules consumed by
both server and client components — a React import would drag components into the data
graph.

**Watch out:** `projects.ts` exports `projects = [...storeProjects, ...customProjects,
...otherProjects]`. Adding a project to the wrong file still works but puts it in the
wrong group — `getProjectGroup()` drives the `/work` filters.

---

## `src/lib/` — pure logic, no JSX

| File | Purpose | Safe to touch? |
|---|---|---|
| `motion.ts` | Shared Framer Motion variants, easings, durations | ⚠️ Changing a variant affects ~15 sections |
| `gsap.ts` | **Single** GSAP plugin registration point; exports `gsap`, `ScrollTrigger` | ⚠️ Never register plugins elsewhere |
| `prisma.ts` | Prisma client singleton (dev hot-reload safe) | Yes |
| `db-project.ts` | Maps a DB row → `Project`; allow-lists image hosts | Yes, carefully — it is a security boundary |
| `case-studies.ts` | Derives case studies by filtering `projects.ts` | Yes |
| `hero-slides.ts` | Reads `public/hero/` at **build time** via `fs` | Server-only — never import from a client component |
| `utils.ts` | `cn()` = `twMerge(clsx(...))` | Yes |
| `site-data.ts` | `getSiteConfig()` / `getProjects()` / `getProjectRow()` — the **only** place Prisma is read from a route. Wrapped in React `cache` and degrades to `src/data/*` when there is no database | Yes — but keep the failure tolerance |

Input validation for the contact form lives with the route that uses it, as a Zod schema in
`src/app/api/contact/route.ts` — there is no shared validation module.

**Do NOT:** put JSX or React hooks here. Hooks go in `src/hooks/`.

---

## `src/hooks/`

| File | Purpose |
|---|---|
| `useMediaQuery.ts` | `useSyncExternalStore`-based media query + `usePrefersReducedMotion()` |
| `useScrollReveal.ts` | Legacy IntersectionObserver reveal, used only by `ProjectsSection` |

**Modify here when:** you need shared client-side reactive behaviour. Always SSR-safe
(return a sensible snapshot on the server — `useMediaQuery` returns `false`).

---

## `src/types/`

`site.ts` — the `SiteConfig` type for the Prisma `siteContent` row, consumed by
`HeroSection`, `AboutSection`, `Footer` as an optional prop.

Everything else is typed locally next to its data (`Project` in `projects.ts`, `Post` in
`blog.ts`, …). Keep that convention: **types live with their data**, not in a dumping
ground.

---

## `src/generated/` — 🚫 DO NOT TOUCH, DO NOT READ

Two stale Prisma client dumps (~150 MB) plus leftover `.tmp` engine binaries. The schema
has **no `output =`**, so `prisma generate` writes to `node_modules/.prisma/client`
instead and these directories are never refreshed. They are gitignored.

**Import Prisma types from `@prisma/client`, never from `@/generated/*`.**

---

## `public/`

```
public/
├── hero/          ← hero slideshow images, read at build time by lib/hero-slides.ts
├── projects/      ← project + blog cover screenshots, WebP, optimised ✅
├── images/        ← ⚠️ 7 MB of unoptimised PNGs (incl. a 1.4 MB favicon)
├── resume/        ← Umer-Farooque-Resume.pdf
└── uploads/       ← ⚠️ 4.8 MB of leftover duplicates, dead
```

**Modify here when:** adding images. **Run `npm run images` afterwards** — it re-encodes
`public/projects` to WebP. Note the script does *not* cover `public/images`.

**Watch out:** adding a file to `public/hero/` automatically adds a hero slide. Numeric
filename order controls slide order.

---

## `prisma/`

| File | Note |
|---|---|
| `schema.prisma` | SQLite. Models: `User` (dead — auth was removed), `Project`, `SiteContent`, `Skill`, `Service`, `Education` |
| `migrations/` | Committed |
| `seed.ts` | Local seeding |
| `dev.db` | **Gitignored** — this is why the Vercel build has no database |

---

## `scripts/`

`optimize-images.mjs` — re-encodes to WebP at ≤1400px, quality 76. Run via `npm run images`.
Reads files into a Buffer first because sharp holds a Windows file handle when given a path.

Its `DIRS` list is `["public/projects", "public/blog"]`. `public/blog` no longer exists —
blog covers were deduplicated into `public/projects` — and the script skips a missing
directory, so this is harmless. **`public/images` is not covered**, which is why 7 MB of
unoptimised PNGs still ship from there.

---

## Quick "where do I change X?" index

| Change | File |
|---|---|
| A project's title or URL | `src/data/store-projects.ts` or `custom-projects.ts` |
| Email / phone / socials | `src/data/site.ts` |
| A colour or font size | `src/app/globals.css` → `@theme` |
| Homepage section order | `src/app/page.tsx` |
| Nav items | `src/data/navLinks.ts` |
| Footer links | `src/data/site.ts` → `FOOTER_COLUMNS` |
| Page `<title>`/description | that page's `metadata` export |
| Security headers / CSP | `next.config.ts` |
| Contact form fields | `ContactSection.tsx` **and** `api/contact/route.ts` (both!) |
| An animation's timing | `src/lib/motion.ts`, or the component for one-offs |
