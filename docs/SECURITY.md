# SECURITY

Verified by inspection and by live probing of a local production server on 2026-10-06.
**No secret values appear in this file.**

---

## Environment variables

Declared in `.env.example`. `.env` is gitignored (`.gitignore` → `.env*` with
`!.env.example`) and **is not tracked** — confirmed via `git ls-files`.

| Variable | Required | Used by | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | ✅ for the contact form | `api/contact/route.ts` | Server-only. Missing → endpoint returns 503 |
| `RESEND_FROM_EMAIL` | ✅ in production | `api/contact/route.ts` | Falls back to `onboarding@resend.dev`, the Resend **sandbox** sender, which only delivers to the account owner's own address |
| `CONTACT_TO_EMAIL` | optional | `api/contact/route.ts` | Falls back to `SITE.email` |
| `DATABASE_URL` | ✅ | `lib/prisma.ts` | Currently a SQLite file path — see *Known risks* |
| `NEXT_PUBLIC_SITE_URL` | recommended | `layout.tsx` | **Public** — exposed to the browser. Only ever put non-secret values behind `NEXT_PUBLIC_` |

### Dead variables still in the local `.env`

`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
`CLOUDINARY_API_SECRET`, `CLOUDINARY_URL` — all for features that were removed (NextAuth
and the admin CMS). **Unused credentials are liability with no benefit: remove them, and
rotate them if they were ever real.**

### Rules
1. Never commit `.env`.
2. Never prefix a secret with `NEXT_PUBLIC_` — that ships it to the browser.
3. Read secrets only inside server components, route handlers or server actions.
4. Never log a secret. `api/contact` logs the *provider's* error object, never the key.

---

## Secrets hygiene — ✅ verified clean

- No hardcoded API keys, tokens or passwords anywhere in `src/`, `prisma/` or `scripts/`.
- The only `re_…`-shaped strings are the placeholders in `.env.example` and
  `CONTACT_FORM_SETUP.md`.
- Binary matches in `src/generated/**` are Prisma query-engine DLLs, not secrets.

---

## The contact form — the only user input in the app

`src/components/organisms/ContactSection.tsx` → `POST /api/contact`
→ `src/app/api/contact/route.ts`

### Controls in place

| Control | Implementation |
|---|---|
| **Schema validation** | Zod: `email` required + format + ≤254 chars, `message` required + ≤5000, `name` optional ≤120, `subject` optional ≤200 |
| **Length caps** | Prevent megabyte payloads landing in an inbox |
| **Rate limiting** | In-memory sliding window, 3 requests / 60 s / IP, keyed off `x-forwarded-for` → `x-real-ip`; map pruned above 5000 keys |
| **HTML escaping** | `escapeHtml()` covers `& < > " '` before interpolating into the email body |
| **Header-injection defence** | `\r\n` stripped from the subject line |
| **Error containment** | Provider errors logged server-side, generic message returned (status never leaks the account or sending domain) |
| **Method restriction** | Only `POST` is exported → `GET`/`PUT` return 405 |
| **Lazy client init** | `new Resend(apiKey)` happens inside the handler, so a missing key cannot break the build |

### Verified by probing

```
POST invalid email           → 400 {"error":"Enter a valid email address"}
POST message > 5000 chars    → 400
4th request within 60 s      → 429 {"error":"Too many messages…"}
GET  /api/contact            → 405
PUT  /api/contact            → 405
```

### Known weaknesses

| Issue | Severity | Detail |
|---|---|---|
| Rate limit is per-instance | 🟡 Medium | In-memory, so on serverless it resets on cold start and is per-container. Fine against casual abuse and double-submits; not a real rate limiter. Use Upstash/Vercel KV if this ever gets traffic. |
| Rate limit counts failed validations | 🟡 Medium | `rateLimited()` runs *before* `safeParse`, so three typos lock a legitimate visitor out for 60 s. Validate first. |
| No CAPTCHA / honeypot | 🟡 Medium | A determined spammer rotating IPs gets through |
| No CSRF token | 🟢 Low | Not exploitable in a meaningful way: the endpoint only sends an email to the owner, and `SameSite=Lax` is the browser default. Worth noting, not worth fixing. |

**If you add a form field, add it to the Zod schema too.** Zod strips unknown keys silently,
so an unschema'd field is accepted and discarded. This has already happened once with
`subject` and is now fixed.

---

## Security headers — `next.config.ts`

All verified present on a live response:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
X-DNS-Prefetch-Control: on
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: …
```

`poweredByHeader: false` → `x-powered-by` absent (verified).

### CSP

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: blob: https://res.cloudinary.com;
connect-src 'self';
frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'
```

⚠️ **`'unsafe-inline'` + `'unsafe-eval'` in `script-src` means the CSP provides no real XSS
mitigation for script injection.**
- `'unsafe-inline'` is a genuine Next.js constraint without a nonce-based setup.
- `'unsafe-eval'` is probably **not** needed — the production webpack build, GSAP, Framer
  Motion and Lenis do not require `eval`. Worth testing its removal.

Not set: `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`,
`upgrade-insecure-requests`.

**If you add a third-party script, font or image host, you must widen the matching CSP
directive or it will be blocked.**

---

## Image pipeline — a real SSRF boundary

Two layers, both verified:

**1. `next.config.ts`** restricts the optimizer to an allow-list:
```ts
images: { remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }],
          formats: ["image/avif", "image/webp"] }
```

**2. `src/lib/db-project.ts`** → `safeImageUrl()` rejects any DB-supplied URL that is not
relative or on `ALLOWED_IMAGE_HOSTS`, so a poisoned row degrades to a placeholder rather
than crashing or proxying.

### Probe results

| `/_next/image?url=` | Status |
|---|---|
| `https://evil.example.com/a.png` | **400** ✅ |
| `http://169.254.169.254/latest/meta-data/` (cloud metadata) | **400** ✅ |
| `../../../etc/passwd` | **400** ✅ |
| `/../../package.json` | **400** ✅ |
| `https://res.cloudinary.com/demo/.../sample.jpg` | 200 (allow-listed) |
| `/projects/zero-lifestyle.webp` | 200, 2.3 KB AVIF |

⚠️ **Never set `hostname: "**"` in `remotePatterns`.** That turns the optimizer into an open
image proxy. It was set that way once and has been fixed.

---

## XSS surface — ✅ clean

- No `dangerouslySetInnerHTML`, `eval(`, `innerHTML` or `new Function` in application code.
  The only matches are inside the generated Prisma runtime, which is not application code.
- All content is rendered as React children, so JSX escapes it.
- All 12 `target="_blank"` anchors carry `rel="noopener noreferrer"` — verified by parsing
  whole tags, not line-matching.
- Email HTML is escaped server-side before interpolation.

If you add JSON-LD (see `SEO.md`), `JSON.stringify` the object rather than building the
string by hand.

---

## Authentication — none

NextAuth, `/dashboard`, `/login`, `/signup` and the auth API routes were all removed in an
earlier phase. **There is no authentication and no protected route.** The site is fully
public, which is correct for a portfolio.

The orphaned admin forms and unauthenticated mutation server actions that survived the
removal (`cms-actions.ts`, `project-actions.ts`, `CMSForm.tsx`, `ProjectForm.tsx`) have now
been deleted — see `CHANGELOG.md`. They were not reachable (no route imported them, so Next
never registered their action IDs) but they were a latent public write API to the database.

🔒 **If you ever re-add an admin area:** server actions are reachable by POST as soon as
something renders them. Every mutating action needs its own authorisation check — being on
an unlinked page is not protection.

Residual: `prisma/schema.prisma` still declares `User { password String }`, unused. Drop it
when convenient.

---

## Dependency audit

```
npm audit → 5 high, 0 critical, 0 moderate, 0 low
```

| Package | Path | Advisory |
|---|---|---|
| `braces` | transitive | stack-exhaustion DoS via deeply nested patterns |
| `micromatch` | via `braces` | — |
| `fast-glob` | via `micromatch` | — |
| `@next/eslint-plugin-next` | via `fast-glob` | — |
| `eslint-config-next` | direct **dev** dependency | — |

**Assessment: accept.** The entire chain is ESLint tooling. It never reaches the browser or
the server runtime, and the DoS vector requires feeding hostile glob patterns to your own
linter. The only fix is downgrading `eslint-config-next` to 14.2.35, a major regression
against Next 16. Re-check when `eslint-config-next` bumps its `fast-glob`.

Runtime dependencies — `next`, `react`, `prisma`, `resend`, `zod`, `framer-motion`, `gsap`,
`lenis`, `sharp` — are clean.

### Dependency policy
- Justify every addition; three animation libraries is already the ceiling.
- Prefer a few lines of code over a package.
- Re-run `npm audit` after any dependency change.
- The `cloudinary` package was removed as unused — do not re-add it without a consumer.

---

## Known risks, ranked

| # | Risk | Severity | Status |
|---|---|---|---|
| 1 | **SQLite on Vercel** — `prisma/dev.db` is gitignored, so the build has no database. `/projects/[id]` returns 500; other routes serve a frozen build-time cache | 🔴 Blocker | Open — needs hosted Postgres or dropping Prisma from public routes |
| 2 | CSP neutered by `unsafe-inline` + `unsafe-eval` | 🟡 Medium | Open |
| 3 | Resend sandbox sender — mail only reaches the account owner | 🟡 Medium | Open — set `RESEND_FROM_EMAIL` |
| 4 | Rate limiter is per-instance and counts failed validations | 🟡 Medium | Partially open |
| 5 | Dead `NEXTAUTH_*` / `CLOUDINARY_*` credentials in `.env` | 🟡 Medium | Open — remove and rotate |
| 6 | No COOP / CORP headers | 🟢 Low | Open |
| 7 | Unused `User.password` column in the schema | 🟢 Low | Open |
| 8 | 5 dev-only npm advisories | 🟢 Low | Accepted |
| 9 | `src/generated/client` was not gitignored — 75 MB incl. engine binaries could have been committed | 🟢 Low | **Fixed** |
| 10 | Unauthenticated orphaned server actions | 🟡 Medium | **Fixed** (deleted) |

---

## Pre-deployment security checklist

- [ ] `DATABASE_URL` points at a real hosted database (or Prisma is removed from public routes)
- [ ] `RESEND_API_KEY` set in Vercel
- [ ] `RESEND_FROM_EMAIL` set to a **verified domain** sender
- [ ] `CONTACT_TO_EMAIL` set
- [ ] `NEXT_PUBLIC_SITE_URL` set to the production origin
- [ ] `NEXTAUTH_*` and `CLOUDINARY_*` removed from all environments, and rotated if ever real
- [ ] `.env` confirmed untracked (`git ls-files | grep env` → only `.env.example`)
- [ ] Headers verified on the deployed origin: `curl -D - -o /dev/null https://…`
- [ ] Contact form tested end-to-end against the real Resend account
- [ ] `npm audit` reviewed
- [ ] `npx tsc --noEmit && npx eslint src && npm run build` all clean
