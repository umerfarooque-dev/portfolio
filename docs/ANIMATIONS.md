# ANIMATIONS

Three libraries, each doing a different job. This file explains what each animation is,
what triggers it, and how to change it without breaking the others.

| Library | Job |
|---|---|
| **Framer Motion 12** | Declarative component animation, variants, `AnimatePresence`, scroll-linked values |
| **GSAP 3.15 + ScrollTrigger** | Scroll-driven timelines, pinning, word-split reveals |
| **Lenis 1.3** | Scroll inertia (moves the real scroll position) |

---

## ⚠️ The one thing to read before touching anything

**`src/components/providers/SmoothScroll.tsx` wires all three together.** 56 lines, and
every scroll animation on the site depends on them:

```ts
const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)),
                          touchMultiplier: 1.6 });

lenis.on("scroll", ScrollTrigger.update);   // ScrollTrigger follows Lenis
const tick = time => lenis.raf(time * 1000);
gsap.ticker.add(tick);                      // GSAP's ticker drives Lenis
gsap.ticker.lagSmoothing(0);                // no frame-skipping on jank
```

Why it is built this way:
- Lenis moves the **real** scroll position, so `position: sticky` and anchor links keep
  working (a transformed-wrapper smooth-scroll library would break both).
- ScrollTrigger updates on every Lenis frame, so pinned sections don't lag a frame behind.
- `lagSmoothing(0)` stops GSAP from skipping frames when the main thread stalls.

**If you remove or reorder these lines, pinning and every scroll reveal desync at once.**
Reduced-motion users get an early `return` and native scrolling.

Also here: a document-level click handler routes `a[href^="#"]` through
`lenis.scrollTo(target, { offset: -80 })`. **That −80 must stay in sync with
`scroll-padding-top: 80px` in `globals.css`.**

---

## Where timings live

| What | Where |
|---|---|
| CSS easings & durations | `src/app/globals.css` → `@theme` (`--ease-out`, `--duration-normal`, …) |
| JS easings, durations, shared variants | `src/lib/motion.ts` (`EASE_OUT`, `DUR`, `itemVariants`, …) |
| GSAP easing names | `src/lib/gsap.ts` (`EASE_OUT_CSS = "power4.out"`, `EASE_IN_OUT_CSS = "power4.inOut"`) |
| GSAP plugin registration | `src/lib/gsap.ts` — **the only place** |

The CSS and JS token sets mirror each other:
`--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` ↔ `EASE_OUT = [0.16, 1, 0.3, 1]`.
**Change one, change the other.**

### `src/lib/motion.ts` — shared variants

`containerVariants` (stagger 0.08) · `itemVariants` · `cardVariants` · `popVariants` ·
`slideIn(direction)` · `rotatingWordVariants` · `pageVariants` · `staggerContainer(stagger, delay)` ·
`viewportOnce = { once: true, margin: "-100px" }`

> This file exists partly to solve a TypeScript problem: inline variants containing
> `type: "spring"` widen to `string` and previously caused 28 build errors. Keep new
> variants here and typed as `Variants` / `Transition`.

---

## Inventory

### 1. Page transition
**Where:** `src/app/template.tsx` · **Trigger:** every navigation · **Tech:** Framer Motion
`template.tsx` (not `layout.tsx`) is used deliberately — Next remounts a template on each
navigation, which re-fires the entrance. Uses `pageVariants` from `lib/motion.ts`.

### 2. Loader
**Where:** `organisms/Loader.tsx` · **Trigger:** first paint · **Tech:** Framer `AnimatePresence`
SSR-visible (`useState(true)`) so the page is covered from the first paint instead of
flashing content. Counts **real image decodes**, holds for `MIN_MS = 1400`, hard ceiling 3 s,
exits with a clip-path wipe. Sets `document.body.style.overflow = "hidden"` while up.
**Skipped entirely under reduced motion**, and the `<noscript>` rule in `layout.tsx` hides it
when JS never runs.
**To change:** `MIN_MS` at the top. ⚠️ This is the main reason LCP is poor — it gates
content for ≥1.4 s.

### 3. Hero slideshow (Ken Burns + wave wipe)
**Where:** `organisms/HeroSlideshow.tsx` · **Trigger:** timer · **Tech:** Framer + CSS keyframes
All slides stay mounted. Transition is a **wave `clip-path` polygon wipe** over 1.2 s with
`cubic-bezier(.76, 0, .24, 1)`. Each slide carries
`motion-safe:animate-[drift_16s_ease-in-out_infinite_alternate]` for the Ken Burns drift
(`scale 1.06 → 1.12` + translate). Two scrims keep text legible: `bg-bg/45` plus
`bg-gradient-to-t from-bg via-bg/40 to-transparent`.
**To change slides:** add/remove files in `public/hero/` — `lib/hero-slides.ts` reads the
directory at build time and sorts numerically.

### 4. Word-split heading reveal
**Where:** `atoms/AnimatedText.tsx` · **Trigger:** scroll into view, or mount with `immediate`
**Tech:** GSAP
Per-word `y: 28 → 0` and `blur(12px) → blur(0)`, stagger `0.035`, ease `power4.out`.
**Important:** words start at `opacity: 0`. The `[data-animate]` `<noscript>` rule is the
no-JS safety net — do not remove the attribute.
**To change:** stagger and duration are constants at the top of the file.

### 5. Scroll-linked colour fill
**Where:** `atoms/ScrollRevealText.tsx` · **Trigger:** scroll position · **Tech:** Framer `useScroll` + `useTransform`
Each word gets its own `useTransform` mapping scroll progress to colour, so the sentence
fills left-to-right as you scroll. `offset`, `from` and `to` are props.
**Watch out:** one motion value per word — keep input to a sentence or two.

### 6. Media reveal
**Where:** `atoms/MediaReveal.tsx` · **Trigger:** `whileInView`, `once: true`, `margin: "-80px"`
**Tech:** Framer
`clip-path: inset(100% 0 0 0) → inset(0)` over 1 s, child `scale: 1.12 → 1` over 1.2 s, both
`EASE_OUT`. Only `clip-path` and `transform` animate — no per-frame layout.
Returns a plain `<div>` under reduced motion.

### 7. Work grid stagger
**Where:** `organisms/WorkGrid.tsx`, `WorkSection.tsx` · **Trigger:** `whileInView`
`staggerChildren: 0.12`, cards `y: 50` over 0.7 s, image `scale 1 → 1.06` over 0.6 s, arrow
`x: 0 → 6px` over 0.3 s. Transform and opacity only.

### 8. Cursor-following work preview
**Where:** `organisms/WorkSection.tsx` · **Trigger:** row hover
A 340×240 preview follows the pointer. ⚠️ Depends on `key` and `style` props that were
accidentally stripped once — if the preview mispositions or flickers, check those first.

### 9. Magnetic buttons
**Where:** `atoms/Magnetic.tsx` · **Trigger:** pointer move · **Tech:** Framer springs
Spring `{ stiffness: 220, damping: 18, mass: 0.4 }`; inner content drifts a further 0.35×
for parallax. Writes to motion values → **zero React renders while hovering.** The spring
lag is what reads as weight. Bypassed under reduced motion.
**Used by:** `Navbar` START PROJECT pill, `HeroSection` CTAs.

### 10. Custom cursor
**Where:** `atoms/Cursor.tsx` · **Trigger:** pointer move · **Tech:** Framer
Accent disc, `size = label ? 68 : 12`. Reads `data-cursor-text` off the hovered element and
shows it as a label. Gated to `pointer: fine`.
**To label a target:** add `data-cursor-text="Read"` to that element — don't edit `Cursor`.
⚠️ Adds `.has-custom-cursor` → `cursor: none` document-wide, so a mount failure leaves no
pointer.

### 11. Pinned horizontal process scroll — most fragile
**Where:** `organisms/ProcessSection.tsx` · **Trigger:** scroll · **Tech:** GSAP ScrollTrigger

```ts
gsap.matchMedia().add(
  { isDesktop: "(min-width: 768px)", noReduce: "(prefers-reduced-motion: no-preference)" },
  ctx => {
    const distance = () => Math.max(0, track.scrollWidth - panel.clientWidth);
    gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: {
      trigger: rootRef.current, start: "top top", end: () => "+=" + distance(),
      pin: panel, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true } });
  });
```

Why each piece matters:
- `matchMedia` → pin only on `md+` **and** only without reduced motion. Below that the
  markup already works as a plain `overflow-x-auto` swipe.
- `distance()` is a **function**, and `invalidateOnRefresh: true`, so the travel recomputes
  on resize instead of caching a stale width.
- `anticipatePin: 1` removes the jump as the pin engages.
- `scrub: 1` gives one second of catch-up, which is what makes it feel attached to the wheel.
- `mm.revert()` in cleanup kills the ScrollTrigger — **without it, navigating away leaves a
  pinned ghost.**

**How to modify safely:** change `scrub`, or the card width (`md:w-[420px]`). Do **not**
remove `matchMedia`, `invalidateOnRefresh` or `mm.revert()`. Test by resizing the window and
by navigating away and back.

### 12. Showcase arc carousel
**Where:** `organisms/ShowcaseSection.tsx` · **Trigger:** continuous `requestAnimationFrame`
**Tech:** raw rAF, no library
Constants at the top of the file:
```
STEP 76 · DIP 26 · TILT 4 · SPEED 0.18 · FADE_START 1.5 · FADE_END 2.6
```
The loop writes transforms **directly to the DOM** — deliberately zero React state per
frame. `circularOffset()` handles wrap-around so the belt is seamless. Carries
`data-lenis-prevent` so Lenis doesn't hijack its inner scroll.
**To change:** edit the constants. Do not restructure the loop into React state — that was
the point of writing it this way.

### 13. Marquees
**Where:** `organisms/Footer.tsx` (28 s), `BrandsStrip.tsx` · **Tech:** CSS keyframes
`marquee` translates `0 → -50%` with the content duplicated, so the loop is seamless. The
footer adds a `mask-image` fade at both edges.
**To change speed:** the duration in the `animation` shorthand, or the `--animate-marquee`
token in `@theme`.

### 14. Services accordion
**Where:** `organisms/ServicesSection.tsx` · **Tech:** Framer `AnimatePresence` + `layout`
Height auto↔0 with a rotating `+`. Open panel becomes `md:grid-cols-[80px_1fr_280px]`.

### 15. Testimonial carousel
**Where:** `organisms/TestimonialsSection.tsx` · **Tech:** Framer `AnimatePresence`
In `x: 40 → 0`, out `x: 0 → -40`, 0.5 s. Renders `null` when `testimonials` is empty.

### 16. Scroll progress bar
**Where:** `atoms/ScrollProgress.tsx` · **Tech:** Framer `useScroll` → `useSpring` → `scaleX`
Accent bar, `transform-origin: left`. Spring-smoothed so it eases rather than tracking
exactly.

### 17. Footer wordmark fit
**Where:** `organisms/Footer.tsx` → `FitWordmark`
Measures the text after `document.fonts.ready` and scales to ×0.995 of the container, so the
wordmark spans the full width at any viewport. ⚠️ Must wait for `fonts.ready` or it measures
the fallback font and mis-sizes.

### 18. Sound toggle equalizer
**Where:** `organisms/Navbar.tsx` · **Tech:** CSS `equalize` keyframe + WebAudio
Three bars animate `scaleY: 0.4 → 1` on alternate. A WebAudio blip plays on toggle; state
persists in `localStorage`.

### 19. Nav overlay menu
**Where:** `organisms/Navbar.tsx` · **Tech:** Framer
Clip-path reveal, matching the `MediaReveal`/`Loader` idiom. Links stagger in.

### 20. Hover micro-interactions (CSS only)
Card border → accent; image `scale 1 → 1.04` over `1.2s ease-[var(--ease-out)]`; arrow
`group-hover:translate-x-1.5`; icon containers `group-hover:scale-110`.

---

## Reduced motion — how it is handled

Four layers, all already in place:

1. **`MotionProvider`** — `<MotionConfig reducedMotion="user">` makes Framer skip transform
   and layout animations while still cross-fading opacity and colour.
2. **CSS** — `@media (prefers-reduced-motion: reduce)` clamps every animation and transition
   to `0.01ms` and disables `scroll-behavior`.
3. **Per-component guards** — `usePrefersReducedMotion()` from `src/hooks/useMediaQuery.ts`
   in `Cursor`, `Magnetic`, `MediaReveal`, `HeroSlideshow`, `Loader`.
4. **GSAP** — `SmoothScroll` returns early; `ProcessSection` gates on
   `(prefers-reduced-motion: no-preference)` inside `matchMedia`.

**Any new animation must honour this.** Use `usePrefersReducedMotion()` for JS-driven motion
and `motion-safe:` for CSS-driven motion. The CSS media query alone does **not** stop
JavaScript animation.

---

## Performance notes

- Animate **`transform`, `opacity` and `clip-path` only.** Never `width`, `height`, `top`
  or `left`.
- `will-change` is applied narrowly (`md:will-change-transform` on the process track). Do
  not sprinkle it — it costs memory.
- The showcase belt and the magnetic buttons bypass React entirely on purpose.
- Current cost: the homepage ships **332 KB gzip** of JS across 19 chunks, and three
  animation libraries are on the critical path. If you need to cut payload, this is where
  the weight is.

---

## Debugging checklist

| Symptom | Look at |
|---|---|
| Pinned section jumps or ghosts after navigation | `mm.revert()` in `ProcessSection` cleanup |
| Pin travel wrong after resize | `invalidateOnRefresh` and `distance()` being a function |
| Scroll reveals fire at the wrong point | `SmoothScroll` — is `ScrollTrigger.update` still bound to `lenis.on("scroll")`? |
| Anchor links jump instead of easing | the click handler in `SmoothScroll`; check `offset: -80` vs `scroll-padding-top` |
| Headings invisible | GSAP failed → `[data-animate]` left at `opacity: 0`; check the `<noscript>` rule and `lib/gsap.ts` |
| Cursor disappears | `Cursor` didn't mount but `.has-custom-cursor` was applied |
| Showcase stutters | the rAF loop is being forced through React state |
| Footer wordmark wrong size | `document.fonts.ready` not awaited |
| ScrollTrigger registered twice | something imported `gsap/ScrollTrigger` directly instead of `@/lib/gsap` |

For runtime inspection, `next dev` forwards browser console errors to the terminal, and the
dev server exposes an MCP endpoint at `/_next/mcp` with `get_compilation_issues` and
`compile_route`. See `node_modules/next/dist/docs/01-app/02-guides/ai-agents.md`.
