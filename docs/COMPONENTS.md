# COMPONENT REGISTRY

## Employment history (2026-10-31)

AboutPageBody now renders the user-confirmed `WORK_EXPERIENCE` list and core
technologies between Background and How I work. Both roles have ended. AboutSection
uses `HOME_ABOUT_CONTENT` instead of database text overrides and displays
most-recent/previous team facts in a responsive one/two/four-column grid.

## Keyboard navigation (2026-10-31)

Navbar focuses the first navigation link when opened, cycles Tab/Shift+Tab
within the header and overlay, and restores previous focus when closed.
An open native dialog retains its own focus handling. The overlay uses
`data-lenis-prevent` for native scrolling. Global keyboard focus outlines use
the existing lime accent. AboutSection and Footer share `SITE.resumeUrl`.

## 2026-10-14 - Popup cancel cursor

Popup cursor fix: while ContactPopup is open, CSS restores native cursors across the document and dialog backdrop and hides the decorative cursor. Interactive descendants retain pointer styling, including close-button icons. The close target is now 44px with a non-intercepting icon. This avoids relying on z-index for a cursor beneath the native dialog top layer.


## Current reference alignment (2026-10-14)

PageIntro provides a shared editorial opener. BlogCards renders uniform borderless cards. AboutPageBody renders background and working principles. ShowcaseGrid renders existing showcase items. ProjectDetail owns dotted project hero, actual metadata/results, narrative, scope, gallery and related work. CaseStudyHighlights is an accessible project-story carousel with tab/arrow navigation, pause/play and eight-second auto advance; it pauses during hover, focus, hidden tabs and reduced motion.

FooterDots now animates dot positions, radius and brightness with a three-wave field rather than brightness alone. ContactPopup now contains the actual shared ContactPanel in a native dialog. FloatingWhatsApp is a persistent pill. Navbar and proposal CTAs open the dialog while retaining link fallback. WorkSection uses ten shipped projects with local prewarmed hover previews; full category filtering remains on /work.


## Contact form, pointer and loader update — 2026-10-14

- ContactPanel now uses a larger panel, clear field labels, direct-contact sidebar
  and a native service select containing all 19 services from the service catalogue.
  `data/contact.ts` owns copy, limits, channels and options; validation is shared
  with the API through `lib/contact-validation.ts`. The service is required.
- ContactPopup and ContactPanel use `data-native-cursor`. Scoped CSS restores
  native pointer/text cursors; Cursor hides its decorative disc inside these zones.
  This fixes the popup layer covering the custom cursor while the native one
  was hidden globally. It also preserves native select-menu behavior.
- BrandMark extracts the existing Navbar logo into a shared atom for Navbar and
  Loader. Loader now has a centered 80px mark, name/percentage and a thin progress
  line, matching the reference composition with Umer's branding. Lazy images do
  not block it; the hard deadline is 3 seconds. Cleanup restores previous overflow
  and clears all timers. Reduced motion skips the loader.

These entries supersede older ContactPanel/Loader descriptions below.

## Homepage update — 2026-10-14

- ServicesSection: six accessible accordion rows, dedicated Explore links, the
  correct `/services` overview link and six platform links. New copy lives in
  `homepage.ts`; reduced motion skips height/fade transitions.
- ApproachSection is now a server component with five benefit cards and a
  proposal CTA. It no longer uses the scroll-progress rail or showcase principles.
- CaseStudyHighlights is a server component used by the homepage, after client
  feedback and before ShowcaseSection. Three existing projects link to their
  real case-study pages; no testimonial quotes are introduced.
- ContactSection is now a server component used only on the homepage: a compact
  invitation with email, WhatsApp and `/contact` links. Its old inline form and
  headingAs prop were removed; ContactPanel is the single contact form.
- TechStack is no longer mounted on the homepage. BlogPreviewSection now comes
  between ShowcaseSection and AboutSection, following the reference order.

These entries supersede older ContactSection/ApproachSection descriptions below.

Every component worth knowing about. `C` = client component, `S` = server component.

QA note (2026-10-14): Navbar's Start project CTA reads `START_PROJECT_LINK` from
`src/data/navLinks.ts`, reaches `/contact` from every route, and closes the menu.
ContactPanel focuses the first invalid field from its newly computed validation
errors, without waiting for `aria-invalid` to render.

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
Hover images use the 680×480 local captures in `PROJECT_PREVIEWS`. They mount
eagerly when the section is within 600px on a desktop with a fine pointer, and
bypass runtime image optimization. Touch devices do not download these previews.
Reduced motion removes spring-following and preview fades.
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

Footer uses `FOOTER_CONTENT` for its pitch, availability and first-name wordmark
(`Umer`). `FooterDots` draws a decorative lime dot field, capped at 20fps;
it pauses offscreen and in hidden tabs, and is static under reduced motion.

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

### ContactPopup `C`
**Path:** `src/components/organisms/ContactPopup.tsx`
**Purpose:** Contact prompt that opens 15 s after arrival. Mounted once, in `MainLayout`.
**Restraint:** once per browser session (`sessionStorage` key `contact-popup-seen`), never
again once dismissed, and never on `/contact`.
**Accessibility:** `role="dialog"` + `aria-modal`, labelled and described, Escape closes,
Tab is trapped inside, focus moves in on open and returns to wherever it was on close.
**Reduced motion:** still shown — only the scale is dropped. Hiding content from
reduced-motion users would be the wrong trade.
**Important:** it is a prompt, **not a third form**. Two contact forms already exist
(`ContactPanel`, and the legacy inline one in `ContactSection`); a third would need its own
validation kept in step with the Zod schema.
**To change the delay:** `DELAY_MS` at the top of the file.

### ContactPanel `C`
**Path:** `src/components/organisms/ContactPanel.tsx`
**Purpose:** The whole `/contact` body — direct channels on the left, form on the right.
**Design:** Current system (lime on black). Used **only** by `/contact`.
**The form:** validates before posting, surfaces the route's own error message, announces
state through one `aria-live` region, cannot be double-submitted, swaps to a success panel,
and has real `focus-visible` rings. No `alert()`.
**Important:** `LIMITS` mirrors the Zod schema in `api/contact/route.ts` — **change both together.**
**Why it duplicates `ContactSection`:** the home page section is still the legacy design and was
deliberately left alone. When that section is converted it should adopt this form and the old
inline one should be deleted.

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
