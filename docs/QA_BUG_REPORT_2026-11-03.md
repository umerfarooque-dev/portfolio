# Portfolio QA Bug Report

**Audit date:** 3 November 2026  
**Assessment:** Hold release sign-off until P1 findings are resolved or explicitly accepted. No critical outage was observed in the tested paths. This is a targeted QA audit, not a certification that the site has no other defects.

## Baseline and scope

- Repository: `D:\react-portfolio\umer-next-js-portfolio`.
- Base commit: `1b1d88ba5c61f9e1442317c3662687335e9f8d83`, plus existing uncommitted Software Engineer / AI Automation / service-priority changes.
- Runtime: local production server at `http://localhost:3100`, Next.js 16.3.8, Chrome on Windows. Findings apply to this local candidate; the deployed Vercel version was not compared or signed off.
- Methods: browser interactions, DOM observations, production HTTP checks, compiled HTML inspection, PDF text extraction, and targeted source review.
- Application code was not changed. Existing working changes were preserved. No valid enquiry was submitted and no email or WhatsApp message was sent.

Severity describes impact; priority describes repair order. **S2** = major functional/content defect, **S3** = minor defect. **P1** = resolve before release sign-off, **P2** = next planned correction. Owners below are suggested roles, not assignments to named people.

## Findings register

| ID | Finding | Severity | Priority | Evidence/status | Suggested owner |
|---|---|---|---|---|---|
| QA-001 | Menu-to-enquiry flow corrupts the body scroll lock | S2 | P1 | Browser reproduced | Frontend |
| QA-002 | Draft `[ADD METRIC]` text is published as project results | S2 | P1 | Browser and production HTML confirmed | Content + frontend |
| QA-003 | Downloadable resume contradicts confirmed employment history | S2 | P1 | PDF/source comparison; previously unchanged asset | Portfolio owner/content |
| QA-004 | Services search/social description omits the new primary offerings | S3 | P2 | Production HTML and source confirmed | Content/SEO |

### QA-001 — Menu-to-enquiry flow corrupts the body scroll lock

**Location:** shared header and enquiry dialog; reproduced on `/contact` at desktop width.

**Reproduction**

1. Load `/contact` with no overlay open.
2. Open **Toggle menu**.
3. Click the header **Start Project** action while the menu is open.
4. Wait for the enquiry form to appear and the menu to finish closing.
5. Close the enquiry using **Close enquiry**.

**Expected:** The page stays locked while the dialog is open and returns to its original scroll state after both overlays close.

**Actual:** With the dialog open and the menu removed, `document.body.style.overflow` is `""`. After closing the dialog, it becomes `"hidden"` although the dialog is closed. This leaves the native page overflow lock active and can prevent normal scrolling. Reloading the page clears the state. Wheel/touch behavior across other browsers remains to be tested; the incorrect lock state itself was directly observed.

**Evidence:** Settled DOM observations:

```json
{"dialog": true, "menu": false, "overflow": ""}
{"dialog": false, "overflow": "hidden"}
```

**Cause:** `Navbar.tsx:106–125` and `ContactPopup.tsx:52–57` independently save and restore the same body overflow property. The popup can capture the menu's `hidden` value, while the closing menu restores the earlier unlocked value. The popup subsequently restores the stale `hidden` value.

**Recommendation:** Give overlay scroll locking a shared owner or reference-counted lock with one original-state snapshot. Include focus restoration in the overlay interaction review.

**Retest acceptance:** Menu → enquiry → close restores the exact initial overflow state. Repeat with Escape, backdrop close, direct enquiry opening, and mobile touch scrolling; background stays locked whenever an overlay remains open.

### QA-002 — Draft metrics are visible to visitors

**Location:** `/work` and case studies for `vadu`, `refreshlifepro`, and `taxformhero`.

**Reproduction**

1. Open `/work` with **All** selected.
2. Find VADU, Refresh Life Pro, and Tax Form Hero.
3. Read the results beneath each project, or open the corresponding `/case-studies/<slug>` page.

**Expected:** Results contain verified values, or omit unavailable metrics.

**Actual:** Eight metric entries contain the literal draft value `[ADD METRIC]`: VADU 2, Refresh Life Pro 3, Tax Form Hero 3. The work index displays all eight and the three case studies repeat them. This makes the portfolio look unfinished and publishes unusable result claims.

**Evidence:** Browser accessibility output on `/work` exposed these strings. Compiled HTML, with script blocks excluded, confirms the same counts. See [draft-metrics.json](../output/qa/draft-metrics.json). Source: `src/data/projects.ts:128`, `:255`, `:408`; `isShipped` only excludes IDs containing `placeholder`, so it does not reject draft result values.

**Recommendation:** Remove unverified result entries until genuine evidence is available. Add a content-quality check rejecting draft tokens in published content. Do not replace them with invented figures.

**Retest acceptance:** No `[ADD METRIC]` text appears in visible content or server-rendered output on work, case-study, legacy project and homepage surfaces. Remaining numerical claims have supporting evidence.

### QA-003 — Resume and portfolio employment history disagree

**Location:** `/resume/Umer-Farooque-Resume.pdf`, linked from the site.

**Reproduction**

1. Read the employment history on `/about`.
2. Open the downloadable resume and compare the job dates and headline.

**Expected:** The downloadable document agrees with the owner's confirmed employment dates and current positioning.

**Actual:**

| Field | Resume PDF | Confirmed portfolio data |
|---|---|---|
| MGN Ventures | April 2026–Present | Apr–Aug 2026; last day 24 August 2026; previous employment |
| Tafsol | January 2024–March 2026 | January 2024–April 2026 |
| Positioning | Full-Stack Web Developer; “3 years” summary | Software Engineer / AI Automation; numeric experience claim removed |

**Impact:** Recruiters receive contradictory availability and employment information. The PDF still carries the experience-duration wording the owner requested removing from the portfolio.

**Evidence:** PDF text extracted locally with `pypdf`; comparison against `src/data/site.ts` and `src/data/page-content.ts`. The asset responds HTTP 200 as `application/pdf`. This is an existing content gap: `docs/CONTEXT.md` explicitly says the downloadable resume was unchanged, so it is not classified as a newly introduced regression.

**Recommendation:** Update the resume using the confirmed history and current positioning, preserving April 2026 as an approximate MGN start month. Validate both PDF text and rendered layout before replacing the download.

**Retest acceptance:** Downloaded PDF and About agree on both jobs, dates and availability; no unwanted numeric experience claim remains. Verify the replacement document opens and the download link still works.

### QA-004 — Services metadata remains on the earlier positioning

**Location:** `/services`; `src/app/services/page.tsx:15–17`.

**Reproduction:** Open `/services`, compare its introduction with the HTML meta description and Open Graph description.

**Expected:** Search/social descriptions accurately summarize the new lead services: AI Automation, CRO and Speed Optimization.

**Actual:** The description remains:

> WordPress, WooCommerce, Shopify, Laravel, React and Next.js development, plus platform migrations to Shopify.

The visible introduction explicitly prioritizes AI Automation, CRO and Speed Optimization, but the metadata mentions none of them. The shared SEO helper propagates the older description to social metadata. The automated SEO audit checks consistency and presence, so it passes despite this editorial mismatch.

**Impact:** Search/social preview copy does not represent the requested service focus. No ranking loss was measured or inferred.

**Recommendation:** Store an updated services description in the data layer and reuse it for metadata. Review other route descriptions editorially against their visible purpose.

**Retest acceptance:** Generated meta, Open Graph and Twitter descriptions reflect the primary offerings while remaining consistent with the page. Re-run the SEO audit.

## Existing accepted issues and outstanding risks

These are not counted as new bugs and were not fixed during this audit.

| Item | Existing record / current limitation | Follow-up |
|---|---|---|
| Muted text contrast | Existing documented low-contrast token in `DESIGN_SYSTEM.md` / `AI_GUIDE.md`; mobile hero text also appears faint | Design-approved contrast review; full accessibility audit still required |
| Introductory loader | Documented minimum delay of about 1.4 seconds | Measure production LCP before changing the intentional animation |
| Email delivery configuration | Sender/provider configuration is an existing deployment concern; current production values were not verified | Confirm verified sender and perform an authorized end-to-end delivery test |
| Rate limiting | Contact route explicitly uses per-instance memory; cold starts and multiple instances do not share limits | Review edge/shared throttling if abuse warrants it; no load/abuse test performed |
| Project preview gaps | Work browser view shows fallback “Preview unavailable” on several projects | Obtain valid captures; fallback behavior itself is working |
| Documentation drift | Historical sections still claim 58 routes, 19 services and superseded missing-schema/focus issues despite newer correction notes | Consolidate docs so historical warnings cannot be mistaken for current defects |

WhatsApp currently opens a `wa.me` link. An automatic chatbot is a proposed feature, not an implemented integration; its absence is not logged as a regression.

## Test execution and evidence

| Check | Result | Limits |
|---|---|---|
| `npx tsc --noEmit` | Passed | Static type analysis |
| `npx eslint src` | Passed | Does not validate editorial completeness or overlay interactions |
| `npm run build` | Passed; generated 115 static pages | Local candidate, not Vercel deployment verification |
| `node scripts/check-seo.mjs` | Passed: 108 content pages, 136 JSON-LD blocks, 79 sitemap canonicals | Structural SEO, not ranking/indexing or copy relevance |
| Local internal URLs/assets | 108 unique non-Next internal references returned no HTTP errors with HEAD requests | HEAD success does not prove every interaction, image or external destination works |
| HTTP smoke | 11 expected-success routes/assets returned 200; two missing routes returned 404 | See [http-smoke.json](../output/qa/http-smoke.json) |
| Contact API negative cases | Malformed JSON, empty object and invalid email returned 400; GET returned 405 | No valid send, delivery, quota or provider failure test |
| Empty contact form | Email/service/message errors appeared; focus moved to email | No external submission |
| Work filter | WordPress selected and rendered 14 project articles, matching its label | Other filter transitions not exhaustively tested |
| Responsive overflow sampling | Homepage at 390/768/1280; filtered work at 320/1920: document width did not exceed viewport | Sampling only; not every route or orientation. Mobile homepage visually inspected |
| Dialog interaction | Open/close worked, with QA-001 lock-state defect | Full keyboard/screen-reader matrix pending |

Internal reference results: [internal-links.json](../output/qa/internal-links.json). Evidence JSON files contain observations only, with no secrets or successful contact submissions. Screenshot inspection was performed in the browser session; no screenshot files are attached to this report.

## Release gates and remaining coverage

1. Resolve QA-001 and verify overlay lifecycle on desktop and mobile.
2. Remove draft metrics and align the downloadable resume with confirmed facts.
3. Correct services metadata and re-run static/build/SEO checks after fixes.
4. Before production sign-off, verify the deployed revision and run an authorized contact-delivery check, representative external-link checks, keyboard/screen-reader testing, reduced-motion testing, Safari/Firefox and real-device testing, plus production performance measurements.

Search Console verification/indexing, measured search rankings, Lighthouse/Core Web Vitals, browser/device compatibility beyond Chrome viewport sampling, database-backed overrides, external project availability, PDF visual rendering, penetration testing and load testing are **not signed off** by this report.
