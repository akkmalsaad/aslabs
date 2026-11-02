# Akkmal Saad Labs — portfolio

Personal / product-studio portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Motion.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`) in production so Open Graph URLs are absolute.

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
