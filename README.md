# Akkmal Saad Labs — portfolio

Personal / product-studio portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Motion.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Deployment & SEO

Production runs at **https://aslabs.my** on Vercel.

- **Required Vercel environment variable (Production):** `NEXT_PUBLIC_SITE_URL=https://aslabs.my`.
  It is the origin for canonical URLs, Open Graph/X tags, `sitemap.xml`, `robots.txt` and the
  JSON-LD. Without it the code falls back to `https://aslabs.my` (never localhost). Do not set it
  to a `*.vercel.app` or preview URL. It is not a secret; no `.env` file is needed or committed.
- **Preview deployments are not indexed.** Builds with `VERCEL_ENV=preview` (or `development`)
  emit `noindex, nofollow`. Their `robots.txt` deliberately does not `Disallow` (and lists no
  sitemap) so crawlers can fetch pages and read the noindex; Vercel also sends
  `X-Robots-Tag: noindex` on preview URLs. Any Vercel Deployment Protection on previews is a
  project setting and is unaffected. Production stays indexable.
- SEO lives in `src/lib/seo.ts` (title, description, JSON-LD), `src/app/layout.tsx` (metadata),
  `src/app/sitemap.ts` and `src/app/robots.ts`. Keep the JSON-LD in step with the visible copy.

## Structure

```text
assets/                 Brand kit source (logos, favicons, OG image, build scripts). Don't edit by hand.
public/brand/           Web-served copy of the brand kit (logo, png, favicon, social)
public/projects/<slug>/ Project screenshots / device renders
public/images/          Other site imagery
src/app/                Routes, root layout, global styles
src/components/layout/  Navigation shell (fixed logo, menu, floating nav), Footer
src/components/sections/Hero (+ visual, scroll cue), SelectedWork, Services, About, Contact
src/components/projects/Sticky project stack, card, progress indicator
src/components/ui/      Small presentational primitives (DeviceFrame, Section, …)
src/components/motion/  MotionProvider, MaskReveal, ScrollFade
src/hooks/              useSectionTracking (active section + nav theme)
src/lib/                Content, project data, motion tokens + intro timeline
```

## Conventions

- **Content** lives in `src/lib/*` — sections only render it.
- **Design tokens** (colours, fluid type, spacing, easing) live in `src/app/globals.css`.
- **Animation** uses `m.*` components from `motion/react` (LazyMotion is `strict`). All Motion animations respect `prefers-reduced-motion` via `MotionProvider`.
- **Images** go through `next/image` (`DeviceFrame` for project visuals; set `media` in `src/lib/projects.ts`) so they're resized and served as AVIF/WebP.
- **Brand assets**: after regenerating `assets/` with `assets/_source/build_assets.py`, re-copy `logo/`, `png/`, `favicon/` and `social/` into `public/brand/`.
