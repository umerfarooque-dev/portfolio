<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# This project: read `docs/` before you read `src/`

This repo has a documentation layer so you do not have to scan the codebase for every task.

**Read in this order:**

1. **`docs/CONTEXT.md`** — the project in one page: stack, routes, where content lives,
   critical rules, known issues. Always read this first.
2. **`docs/PROJECT_MAP.md`** — what each directory is for, and what not to touch.
3. **`docs/AI_GUIDE.md`** — the workflow, the rules, and the list of known issues that are
   deliberately open (do not "rediscover" or fix them unprompted).

Then read **only** the topic doc your task needs:

| Topic | File |
|---|---|
| System design, rendering, data flow | `docs/ARCHITECTURE.md` |
| A specific component | `docs/COMPONENTS.md` |
| Where a piece of content lives | `docs/DATA_MODEL.md` |
| Colours, type, spacing, patterns | `docs/DESIGN_SYSTEM.md` |
| How an animation works | `docs/ANIMATIONS.md` |
| Metadata, sitemap, crawling | `docs/SEO.md` |
| Env vars, headers, risks | `docs/SECURITY.md` |
| What changed and why | `docs/CHANGELOG.md` |

**Non-negotiables**

- Preserve the existing visual design. **Two design systems coexist** here — match the one
  the file you are editing already uses. See `docs/DESIGN_SYSTEM.md`.
- Content lives in `src/data/*.ts`. Never hardcode strings, URLs or project data in a
  component.
- Tailwind v4: tokens go in the `@theme` block in `src/app/globals.css`. Never add a
  `tailwind.config.js`.
- Never import from `src/generated/**` — it is stale generated Prisma output. Use
  `@prisma/client`.
- Every animation must honour `prefers-reduced-motion`.
- Before claiming done: `npx tsc --noEmit && npx eslint src && npm run build`. All three are
  currently clean.
- Update the relevant doc and `docs/CHANGELOG.md` when you change architecture or delete code.
