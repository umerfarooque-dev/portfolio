# DESIGN SYSTEM

**Reverse-engineered from the existing code.** Nothing here is invented or aspirational —
every value is read from `src/app/globals.css` or from the components that use it.

Single source of truth: the `@theme` block in **`src/app/globals.css`**.
There is **no `tailwind.config.js`** — Tailwind v4 reads tokens from `@theme`.

---

## ⚠️ First: there are two design systems in this repo

| | **Current system** | **Legacy system** |
|---|---|---|
| Where | `/`, `/work`, `/services`, `/blog`, `/case-studies`, `/about` | `/projects`, `/projects/[id]`, `/contact` |
| Palette | near-black `#080808` + **one** lime accent `#c8ff00`, no gradients | sky-blue → purple → violet gradients, glassmorphism |
| Type | `.t-h1`/`.t-h2`/`.t-h3`/`.t-label` + `text-h1…` tokens | `<Heading size="xl">`, `<Text size="lg">` |
| Components | `AnimatedText`, `ScrollRevealText`, `MediaReveal`, `ProjectImage`, `Magnetic` | `GlassCard`, `Heading`, `Text`, `Button`, `ProjectCard` |
| Container | `.shell` / `max-w-[var(--container-grid)] px-[var(--gutter)]` | `<Container>` (`max-w-7xl`) |

Files still on the legacy palette (count of `sky-*`/`purple-*`/`violet-*`/`amber-*` classes):

```
16  src/components/organisms/ContactSection.tsx   ← live on / and /contact
 6  src/components/atoms/Logo.tsx
 4  src/app/projects/[id]/page.tsx
 3  src/components/atoms/Button.tsx
 2  src/components/organisms/TechStack.tsx
 2  src/components/organisms/ProjectsSection.tsx
 1  src/components/molecules/ProjectCard.tsx
```

**Converting these is a redesign, not a cleanup. Do not do it unless explicitly asked.**
When you *are* asked, start with `ContactSection` — it is the most visible.

---

## Colour

```css
--color-bg:        #080808;   /* page background, near-black */
--color-surface:   #111111;   /* cards, inputs, panels */
--color-ink:       #f0eee8;   /* body + headings, warm off-white */
--color-muted:     #f0eee859; /* secondary text — alpha 0.35 */
--color-line:      #f0eee81a; /* hairline borders — alpha 0.10 */
--color-accent:    #c8ff00;   /* lime; the ONLY accent */
--color-accent-dim:#c8ff0026; /* accent at 15% for fills */
```

Tailwind usage: `bg-bg`, `bg-surface`, `text-ink`, `text-muted`, `border-line`,
`text-accent`, `bg-accent-dim`.

Other colour facts:
- `::selection` → accent background, `--color-bg` text
- Scrollbar: 8px, track `--color-bg`, thumb `#f0eee826` → `#f0eee84d` on hover
- WhatsApp green `#25D366` is hardcoded in `HeroSection` and `FloatingWhatsApp` (brand colour, correct to hardcode)

### ⚠️ Known accessibility problem

`--color-muted` on `--color-bg` measures **2.82 : 1**. WCAG AA needs 4.5:1 for body text
and 3:1 for large text — it fails both. `text-muted` is used **125 times**.

A compliant replacement would be roughly `#f0eee8b8` (alpha ≈ 0.72, ≈ 4.6:1). This is
**deliberately not changed**, because it visibly alters every page. It is a design
decision, not a bug fix.

Also failing: `placeholder-gray-600` (`#4b5563`) on `bg-surface` = **2.50 : 1**, on the four
contact inputs.

---

## Typography

Two fonts, both via `next/font` in `src/app/layout.tsx` (self-hosted, `display: swap`):

| Role | Font | CSS variable | Tailwind |
|---|---|---|---|
| Sans / body / headings | **Inter** | `--font-inter` | `font-sans` |
| Mono / labels / numbers | **DM Mono** (300, 400, 500) | `--font-dm-mono` | `font-mono` |

### Scale — all fluid `clamp()`

| Token | Size | Line height | Letter spacing |
|---|---|---|---|
| `text-h1` | `clamp(48px, 6vw, 96px)` | 0.95 | −0.03em |
| `text-h2` | `clamp(36px, 4vw, 64px)` | 1 | −0.03em |
| `text-h3` | `clamp(24px, 3vw, 40px)` | 1.1 | −0.03em |
| `text-body` | `clamp(14px, 1.2vw, 18px)` | 1.6 | — |
| `text-small` | `clamp(11px, 1vw, 13px)` | 1.5 | — |
| `text-label` | `11px` fixed | 1 | **0.15em** |

Extra tokens: `--tracking-tight: -0.03em`, `--leading-tight: 1.25`, `--leading-snug: 1.375`,
`--leading-relaxed: 1.625`.

### Utility classes (in `globals.css`, not `@theme`)

| Class | Equivalent |
|---|---|
| `.t-h1` | `text-h1` size/leading/tracking + `font-weight: 500` |
| `.t-h2` | `text-h2` + `font-weight: 500` |
| `.t-h3` | `text-h3` + `font-weight: 500` |
| `.t-label` | mono, 11px, `0.15em`, uppercase |
| `.t-small` | `text-small` |

**Headings are `font-weight: 500`, never bold.** That is intentional.

Both forms exist in the codebase — `className="t-h2"` and
`className="text-h2 font-medium"`. They are equivalent; prefer `.t-h2` for brevity and
match whatever the surrounding file uses.

---

## Layout & spacing

```css
--container-grid: 1440px;                      /* max content width */
--grid-gap: 24px;
--spacing-section: clamp(80px, 10vw, 160px);   /* vertical section rhythm */
--gutter: 20px;      /* :root       */
--gutter: 40px;      /* ≥768px      */
```

Three container idioms, all valid:
```html
<div class="shell">                                                    <!-- the class -->
<div class="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">  <!-- explicit -->
<Container>                                                            <!-- legacy, max-w-7xl -->
```
Use `.shell` or the explicit form for new work.

Section padding patterns in use: `py-[var(--spacing-section)]`,
`py-[clamp(48px,6vw,96px)]`, and `pt-40 md:pt-56` on page headers (clearing the fixed nav).

`html { scroll-behavior: smooth; scroll-padding-top: 80px }` — the 80px matches the
`lenis.scrollTo` offset in `SmoothScroll.tsx`. **Change both together.**

---

## Radius, blur, shadows

```css
--radius-sm: 0.25rem;   /* rounded-sm — the default everywhere */
--blur-sm: 8px;  --blur-md: 12px;  --blur-xl: 24px;
```

- **One radius.** The current system uses `rounded-sm` for every card, panel and input.
  `rounded-full` is used only for pills and CTAs.
- **No shadow tokens.** The current system uses borders (`border-line`), not shadows.
  Shadows appear only in legacy code (`shadow-2xl` on `FloatingWhatsApp`,
  `hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]` on the contact button).
- **Glass effects** are legacy only — `GlassCard` and the backdrop blurs in
  `/projects/[id]`. The current system is flat surfaces + hairlines.

---

## Motion tokens

```css
--duration-fast:   0.2s;
--duration-normal: 0.4s;
--duration-slow:   0.8s;
--duration-slower: 1.2s;

--ease-out:     cubic-bezier(0.16, 1, 0.3, 1);     /* the default */
--ease-in-out:  cubic-bezier(0.76, 0, 0.24, 1);    /* wipes, clip-paths */
--ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1); /* pops */
```

Mirrored for JS in `src/lib/motion.ts` as `EASE_OUT`, `EASE_IN_OUT`, `EASE_ELASTIC` and
`DUR`. **If you change a value in one place, change it in the other.**

Keyframes defined in `@theme`:

| Animation | Definition | Used by |
|---|---|---|
| `--animate-marquee` | `marquee 30s linear infinite` (`translateX(0 → -50%)`) | `Footer` (at 28s), `BrandsStrip` |
| `--animate-drift` | `drift 16s ease-in-out infinite alternate` (`scale 1.06 → 1.12` + translate) | `HeroSlideshow` Ken Burns |
| `--animate-equalize` | `equalize 1.1s ease-in-out infinite alternate` (`scaleY 0.4 → 1`) | `Navbar` sound toggle bars |
| `pulse` | `50% { opacity: 0.5 }` | availability dots |

Full behaviour: `ANIMATIONS.md`.

---

## Component patterns

### Buttons / CTAs (current system)
`rounded-full` pill, mono uppercase label, often wrapped in `<Magnetic>`:
```html
<Magnetic>
  <Link class="inline-flex items-center gap-2 rounded-full border border-line
               px-6 py-3 font-mono text-label uppercase tracking-wider
               transition-colors hover:border-accent hover:text-accent">
```
The legacy `<Button>` atom (gradient fill, `focus-visible:ring-sky-400`) is for legacy pages
only.

### Cards (current system)
```html
<div class="rounded-sm border border-line bg-surface/40 p-4
            transition-colors duration-[var(--duration-normal)] hover:border-accent">
```
Hover = border turns accent. Images inside scale `1 → 1.04` over `1.2s ease-[var(--ease-out)]`.

### Labels / eyebrows
```html
<span class="font-mono text-label uppercase tracking-wider text-muted">01 — Services</span>
```
Often with an accent-coloured index number.

### Section headers
`AnimatedText` for the heading, a mono eyebrow above, a `text-muted` lead paragraph below
capped with `max-w-[56ch]`. Headings cap at `max-w-[16ch]`–`max-w-[20ch]` so lines break
deliberately.

### Arrow affordance
```html
<span aria-hidden="true" class="transition-transform
      duration-[var(--duration-normal)] group-hover:translate-x-1.5">→</span>
```

### Utility classes
`.no-scrollbar` — hides scrollbars cross-browser.
`.has-custom-cursor` — set by `Cursor`; applies `cursor: none` to the document and all
interactive elements.

---

## Breakpoints

Tailwind defaults, unmodified: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.

`md (768px)` is the meaningful boundary — it switches `--gutter` from 20px to 40px, and it
is where `ProcessSection` turns its pinned horizontal scroll on via `gsap.matchMedia()`.

**Mobile-first.** Base styles target small screens; `md:`/`lg:` add complexity. Keep it
that way.

Responsive health: no 320px overflow found. `<body>` carries
`overflow-x-hidden w-full max-w-full`, page headers carry `w-full max-w-full overflow-hidden`,
and the only fixed widths are guarded (`max-w-[860px]`, `md:w-[420px]` with a `w-[80vw]`
fallback).

---

## Accessibility notes on the design

| Item | Status |
|---|---|
| `lang="en"`, viewport meta | ✅ |
| Skip-to-content link | ✅ `layout.tsx`, `sr-only focus:not-sr-only` |
| `prefers-reduced-motion` | ✅ CSS block + `MotionConfig` + per-component guards |
| Form labels | ✅ `htmlFor`/`id` on all contact inputs |
| Body text contrast | ❌ 2.82:1 (needs 4.5:1) |
| Placeholder contrast | ❌ 2.50:1 |
| Focus indicators | ❌ 23 controls use `focus:outline-none`; no global `:focus-visible` |
| `<h1>` per page | ❌ missing on `/about`, `/contact`, `/projects` |

Suggested minimal fix for focus (not applied — needs a design call):
```css
:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
```

---

## Rules for changing the design

1. **Change tokens, not components.** A colour or size change belongs in the `@theme` block.
2. **Never add `tailwind.config.js`.**
3. **Keep one accent.** The current system is deliberately monochrome + lime. Do not
   reintroduce gradients.
4. **Keep `rounded-sm`.** One radius everywhere.
5. **Borders, not shadows.**
6. **Headings are `font-weight: 500`.**
7. **Do not round the `clamp()` values** — they were extracted from a compiled reference
   stylesheet to match it exactly.
8. **If you change `--ease-*` or `--duration-*`, mirror it in `src/lib/motion.ts`.**
