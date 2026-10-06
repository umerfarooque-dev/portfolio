# Deploy Guide — GitHub + Vercel

Repo: `umerfarooque00786/next-js-updated-portfolio`

## Branches

| Branch | Use | Vercel |
|---|---|---|
| `master` | Source of truth, all work lands here | — (CI only) |
| `development` | Staging / feature verification | Preview URLs |
| `deployment` | Production-ready code | **Production (live)** |

## 1. Database: kuch karne ki zaroorat nahi ✅

Pehle yahan likha tha ke live site ke liye hosted database chahiye. **Ab nahi.**

Site ka saara content `src/data/*.ts` mein hai. Prisma sirf ek **optional override** hai
(`src/lib/site-data.ts`). Agar `DATABASE_URL` set nahi hai ya DB reachable nahi, to har
query chup-chaap `null` return karti hai aur page static data par fall back ho jata hai.

Verified: database ke **bilkul bagair** build pass hoti hai (exit 0, zero warnings) aur
saare 14 routes 200 dete hain — `/projects` aur `/projects/[id]` bhi.

> Baad mein agar real DB chahiye: Neon ya Vercel Postgres banayein,
> `prisma/schema.prisma` mein `provider = "postgresql"` karein, `DATABASE_URL` set karein,
> `prisma migrate deploy` chalayein. Code already DB ko utha lega — kuch badalna nahi padega.

**SQLite Vercel par kaam nahi karta** — `prisma/dev.db` gitignored hai aur rehna chahiye.

## 2. Environment variables (Vercel → Settings → Environment Variables)

Contact form ke liye zaroori:

| Variable | Zaroori? | Value |
|---|---|---|
| `RESEND_API_KEY` | ✅ | Resend dashboard se |
| `RESEND_FROM_EMAIL` | ✅ | **Verified domain** ka sender. Set na karein to `onboarding@resend.dev` (sandbox) use hota hai, jo sirf aapke apne Resend account email par deliver karta hai |
| `CONTACT_TO_EMAIL` | optional | Default `SITE.email` |
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://<your-domain>` — canonical URLs isi se bante hain |
| `DATABASE_URL` | ❌ | **Chhod dein.** Zaroorat nahi (point 1 dekhein) |

Ye purane variables **mat** add karein — feature hi remove ho gaya hai:
`NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `CLOUDINARY_*`. Local `.env` se bhi hata dein, aur agar
kabhi real values thi to **rotate** kar dein.

## 3. Vercel connect karein

1. [vercel.com](https://vercel.com) → GitHub se sign in
2. **Add New Project** → Import `umerfarooque00786/next-js-updated-portfolio`
3. Framework: **Next.js** (auto-detect ho jayega). Build command default rakhein —
   `package.json` ka `build` script already `next build --webpack` hai
4. **Settings → Git → Production Branch** = `deployment`
   (taake sirf `deployment` par push se live deploy ho)
5. Point 2 ke environment variables add karein
6. **Deploy**

Iske baad:
- `deployment` par push → **production** deploy
- `development` (ya kisi bhi branch) par push → **preview** URL

## 4. Daily workflow

```bash
# kaam master par
git add -A
git commit -m "..."
git push origin master

# staging par bhejna
git checkout development
git merge master
git push origin development      # -> Vercel preview

# live release
git checkout deployment
git merge development
git push origin deployment       # -> Vercel production

git checkout master
```

## 5. CI pipeline — `.github/workflows/ci.yml`

**Trigger:** push ya PR on `master`, `development`, `deployment`.

**`verify` job** (fail hone par pipeline rukti hai):
1. `npm ci` (postinstall → `prisma generate`)
2. `npx tsc --noEmit`
3. `npx eslint src`
4. `npm run build`
5. Bundle size job summary mein

**`audit` job** (informational, fail nahi karta): `npm audit --omit=dev` aur full audit.

> Pehle wali workflow mein `npx next lint` tha — Next.js 16 mein ye command **exist hi nahi
> karti**, aur `continue-on-error: true` ki wajah se step hamesha pass dikhta tha. Type check
> bhi nahi tha. Ab teeno checks real hain.

Status: GitHub repo → **Actions** tab.

## 6. Pre-deploy checklist

- [ ] `npx tsc --noEmit && npx eslint src && npm run build` — teeno clean
- [ ] Vercel production branch = `deployment`
- [ ] `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` set
- [ ] `NEXTAUTH_*` / `CLOUDINARY_*` kahin set nahi
- [ ] Deploy ke baad contact form ek dafa test karein (real email aani chahiye)
- [ ] Headers check: `curl -D - -o /dev/null https://<domain>`

## 7. Deploy ke baad: ye 3 cheezein pending hain

Site live chalegi, lekin ye abhi missing hain (details `docs/SEO.md`):

1. **`og:image` nahi hai** — WhatsApp/LinkedIn par link share karne par koi image nahi
   aayegi. Portfolio ke liye sabse bada fix.
2. **`sitemap.xml` aur `robots.txt` nahi hain** — 58 routes crawl hone ke liye chhod diye gaye hain.
3. **3 pages par `<h1>` nahi hai** — `/about`, `/contact`, `/projects`.

Baqi known issues: `docs/AI_GUIDE.md` → "Current known issues".
