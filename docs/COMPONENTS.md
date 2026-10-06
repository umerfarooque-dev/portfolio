# COMPONENT REGISTRY

Every component worth knowing about. `C` = client component, `S` = server component.

Read only the entries you need — that is the point of this file.

---

## Atoms — `src/components/atoms/`

### AnimatedText `C` · 117L
**Path:** `src/components/atoms/AnimatedText.tsx`
**Purpose:** The site's primary heading animation. Splits text into words and reveals them
with GSAP (`y: 28 → 0`, `blur(12px) → blur(0)`, stagger 0.035, `power4.out`).
**Props:** `text`, `className?`, `as?` (ElementType, default `h2`), `accentFrom?` (index
from which trailing words turn accent-coloured), `muted?`, `immediate?` (animate on mount
instead of on scroll), `delay?`
**Depends on:** `@/lib/gsap`
**Used by:** 15 files — every page header and most section headings
**Important:** Words start at `opacity: 0`, so a JS failure would hide the text. The
`<noscript>` rule in `layout.tsx` un-hides `[data-animate]` to cover that. Was rewritten
from `createElement` to JSX (`const Tag = as as ElementType`) to satisfy
`react-hooks/refs` — do not revert.
**Safe to modify:** timing and stagger. Do **not** remove the `data-animate` attribute.

### ScrollRevealText `C` · 107L
**Path:** `src/components/atoms/ScrollRevealText.tsx`
**Purpose:** Per-word colour fill driven by scroll position (`useScroll` + `useTransform`).
**Props:** `text`, `className?`, `as?`, `offset?`, `to?` (settled colour), `from?`
**Used by:** `AboutSection`, `ApproachSection`, `FaqSection`, `ServicesSection`,
`WorkSection`
**Important:** Each word gets its own `useTransform`, so very long strings create many
motion values. Keep inputs to a sentence or two.

### MediaReveal `C` · 50L
**Purpose:** Uncovers an image as it scrolls in — `clip-path: inset(100% 0 0 0) → inset(0)`
over 1 s, with the child easing from `scale: 1.12 → 1` over 1.2 s.
**Props:** `children`, `className?`, `delay?`
**Used by:** `WorkGrid`, `blog/page.tsx`, `blog/[slug]`
**Important:** Returns a plain `<div>` when reduced motion is set. Only `clip-path` and
`transform` animate, so there is no per-frame layout.

### Magnetic `C` · 65L
**Purpose:** Pulls its child toward the pointer on a spring (stiffness 220, damping 18),
with the inner content drifting a further 0.35×.
**Props:** `children`, `strength?` (default 0.35), `className?`
**Used by:** `Navbar` (START PROJECT pill), `HeroSection` (CTAs)
**Important:** Writes to motion values, so hovering costs **no** React renders. Bypassed
entirely under reduced motion.

### Cursor `C` · 95L
**Purpose:** Custom accent-coloured cursor disc. Grows from 12 px to 68 px and shows a
label when hovering an element with `data-cursor-text`.
**Important:** Adds `.has-custom-cursor` to the document, which sets `cursor: none`
globally — so if this component fails to mount, there is no pointer. Gated to
`pointer: fine` via `useMediaQuery`. **To label a hover target, add
`data-cursor-text="Read"` to it** rather than editing this file.

### ProjectImage `S` · 59L
**Purpose:** Renders `next/image` when a screenshot exists, otherwise a monogram
placeholder card reading "Private build".
**Props:** `src?`, `alt`, `title`, `sizes?`, `priority?`, `className?`
**Used by:** `WorkSection`, `WorkGrid`
**Important:** This is the correct way to render a project image — three projects have no
screenshot. Do not swap it back to a bare `<Image>`.

### ScrollProgress `C` · 24L
Accent progress bar at the top of the viewport. `useScroll` → `useSpring` → `scaleX`.
Used once, by `MainLayout`.

### Container `S` · 20L
`max-w-7xl` + responsive padding. **Legacy** — current-system sections use the
`mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]` pattern or the `.shell`
class instead. Still used by `ContactSection` and `TechStack`.

### Legacy atoms — `Button` `C`, `Heading` `S`, `Text` `S`, `GlassCard` `S`, `Logo` `S`
Part of the original portfolio design (sky/purple gradients, glassmorphism). Used only by
`/projects`, `/projects/[id]` and `ProjectsSection`.
**Do not use these in new work on the current design system** — and do not delete them
either, the legacy pages depend on them. See `DESIGN_SYSTEM.md`.

---

## Molecules — `src/components/molecules/`

### FloatingWhatsApp `C` · 56L
Fixed bottom-right WhatsApp button. Reads the number from `SITE`. Has a correct
`focus-visible:ring-2`.

### ProjectCard `S` · 82L
**Legacy.** Glass card for one project. Used only by `ProjectsSection`.
**Important:** project data comes from `src/data/projects.ts` — never hardcode project
details here.

---

## Organisms — `src/components/organisms/`

These are page sections. One file per section.

### HeroSection `C` · 144L
**Props:** `config?: SiteConfig`, `slides?: string[]`
**Composition:** two 3-column label rows (`HERO_LABEL_ROWS` from `site.ts`), an
availability chip, an `AnimatedText` `<h1>`, rounded-full CTAs with a `#25D366` WhatsApp
dot, and a bottom bar with a live Karachi clock (`tabular-nums`, GMT+5).
**Layout:** `flex min-h-svh flex-col justify-between`
**Important:** the only `<h1>` on the homepage. `slides` comes from `getHeroSlides()`,
which reads `public/hero/` at build time.

### HeroSlideshow `C` · 144L
**Props:** `slides?: string[]`, `alts?: string[]`
**Purpose:** Background slideshow behind the hero. All slides stay mounted; transitions
are a wave `clip-path` polygon wipe over 1.2 s (`cubic-bezier(.76,0,.24,1)`) with a
`drift` Ken Burns keyframe and two scrims (`bg-bg/45` + a gradient).
**Important:** `motion-safe:` prefix on the drift animation. Adding an image to
`public/hero/` adds a slide; numeric filename order sets the sequence.

### Navbar `C` · 289L — largest component
Node-graph logo SVG, two-line tagline, email/location stack, an **equalizer sound toggle**
(WebAudio blip + `localStorage`), a `Magnetic` START PROJECT pill, hamburger, and a
clip-path overlay menu.
**Reads:** `navLinks`, `SITE`
**Props:** `siteName?: string`
**Important:** at 289 lines this is the one component that would benefit from being split
(logo / sound toggle / overlay menu). Left intact because it works and splitting it risks
the overlay animation. If you touch it, extract rather than rewrite.

### WorkSection `C` · 162L
Homepage work list with a 340×240 preview that follows the cursor.
**Reads:** `projects`
**Important:** the hover preview uses `key` + `style` to position itself — both were
accidentally dropped once and had to be restored. The preview `<Image>` has `alt=""`
deliberately (it duplicates adjacent text).

### WorkGrid `C` · 160L
The `/work` page grid. Two columns, with the first two items spanning full width.
**Props:** `projects: Project[]`
**Animation:** `staggerChildren: 0.12`, cards `y: 50`, image `scale 1 → 1.06`

### ServicesSection `C` · 125L
Accordion: `01` index + `.text-h3` title + meta pill + rotating `+`. Open panel is
`md:grid-cols-[80px_1fr_280px]`.
**Reads:** `services` from `site-content.ts`

### ProcessSection `C` · 90L
**GSAP pinned horizontal scroll.** Uses `gsap.matchMedia()` so pinning applies on `md+`
only; below that it is a plain `overflow-x-auto` row. Cards are `w-[80vw]` on mobile,
`md:w-[420px]`.
**Reads:** `processSteps`
**Important:** the most fragile animation in the project. Read `ANIMATIONS.md` first.

### ShowcaseSection `C` · 275L
Continuous arc carousel driven by a `requestAnimationFrame` loop that writes transforms
straight to the DOM — **no React state per frame**.
**Constants:** `STEP 76`, `DIP 26`, `TILT 4`, `SPEED 0.18`, `FADE_START 1.5`, `FADE_END 2.6`
**Reads:** `showcaseItems`, `showcaseImage()`
**Important:** `circularOffset()` handles wrap-around. Has `data-lenis-prevent` so Lenis
does not hijack its inner scroll. To change speed or spacing, edit the constants at the
top — do not restructure the loop.

### Footer `C` · 186L
Six nav columns from `FOOTER_COLUMNS`, an availability marquee (`marquee 28s linear` +
`mask-image`), a `FitWordmark` that measures text after `document.fonts.ready` and scales
to ×0.995, and a copyright line.
**Props:** `config?: SiteConfig`

### Loader `C` · 146L
SSR-visible page loader (`useState(true)`) with a real image-decode counter,
`MIN_MS = 1400`, a 3 s ceiling and a clip-path exit. Carries `data-loader`.
**Important:** sets `document.body.style.overflow = "hidden"` while visible, and gates
first paint for at least 1.4 s — this is why LCP is poor. Skipped entirely under reduced
motion. The `<noscript>` rule hides it when JS never runs.

### TestimonialsSection `C` · 153L
Carousel of real Upwork reviews. **Renders `null` when `testimonials` is empty** — the
array is guarded on purpose.

### FaqSection `C` · 48L
Two-column `<dl>`, **not** an accordion. Reads `faqs`.

### Shared-heading note — `AboutSection`, `ContactSection`, `ProjectsSection`
`AboutSection` and `ContactSection` render on **both** the home page and their own standalone
page. Each takes `headingAs?: "h1" | "h2"` (default `"h2"`); `/about` and `/contact` pass
`"h1"`. That keeps exactly one `<h1>` per page without giving the home page three of them.
`ProjectsSection` renders `h1` directly because `/projects` is its only consumer. Only the
tag changes — the type scale comes from the className.

### BrandsStrip `C` · 48L / ApproachSection `C` · 84L / BlogPreviewSection `C` · 108L / TechStack `C` · 111L / AboutSection `C` · 87L
Straightforward sections reading from `projects`, `showcase.principles`, `blog.posts`, a
local list, and `SITE`/`config` respectively.
**`TechStack` and `AboutSection`** still use legacy gradient styling.

### ProjectsSection `C` · 155L
**Legacy.** The `/projects` page grid with filters and "Load more".
**Props:** `projects: Project[]`, `initialCount?`
**Uses:** `ProjectCard`, `Button`, `Heading`, `Container`, `useScrollReveal`

### ContactSection `C` · 133L
**Legacy styling** (sky→purple gradients) but it is the live `/contact` page *and* the
homepage contact section.
**Contains:** `CONTACT_LINKS` (now derived from `SITE`), a `colorMap`, an inline
`WhatsAppIcon`, and an inline `ContactForm`.
**Important:**
- The form posts `{ name, email, subject, message }` to `/api/contact`. **If you add a
  field here you must also add it to the Zod schema in the route** or it is silently
  dropped.
- Feedback is still a native `alert()` — no loading state, no `aria-live`. Known gap.
- Section numbering ("07 — Contact") renders on the standalone `/contact` page where the
  sequence is meaningless.

---

## Providers — `src/components/providers/`

### MotionProvider `C` · 15L
`<MotionConfig reducedMotion="user">`. Wraps everything. Makes Framer skip transform and
layout animations for reduced-motion users while still cross-fading opacity and colour.

### SmoothScroll `C` · 56L
⚠️ **The most load-bearing 56 lines in the project.**
Creates Lenis, then:
- `lenis.on("scroll", ScrollTrigger.update)`
- `gsap.ticker.add(time => lenis.raf(time * 1000))`
- intercepts anchor clicks → `lenis.scrollTo(target, { offset: -80 })`
- destroys Lenis on unmount

Breaking any of these lines breaks every scroll animation on the site at once. See
`ANIMATIONS.md` before editing.

---

## Templates — `src/components/templates/`

### MainLayout `S` · 35L
**Props:** `children`
Server component. Reads `siteContent` from Prisma (wrapped in `.catch(() => null)`), then
renders the full chrome: `MotionProvider` → `Loader`, `Cursor`, `SmoothScroll`,
`ScrollProgress`, `Navbar`, `<main id="main">`, `Footer`, `FloatingWhatsApp`.
**Important:** wraps all 58 routes. `#main` is the skip-link target. Keep it a server
component — making it client would push the whole tree to the client.

---

## Conventions for new components

- Named export: `export const Foo = (...) => ...`
- PascalCase filename matching the export
- Place by role: reusable primitive → `atoms/`, page section → `organisms/`
- `"use client"` **only** if you use hooks, state, refs or browser APIs
- Read content from `src/data/`, never inline it
- Reuse variants from `src/lib/motion.ts` rather than writing inline transitions
- Guard animation with `usePrefersReducedMotion()`
- Add a short block comment explaining *why*, matching the existing density — the codebase
  is well-commented and new code should match
