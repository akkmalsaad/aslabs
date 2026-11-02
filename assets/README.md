# AS Labs — web assets

Drop this folder into your portfolio's static/public folder (e.g. `public/brand/` in Vite or Next.js, or next to `index.html` in a plain site). Open `preview.html` in any browser to see everything. It has all images built in, so it works on its own.

```
logo/      SVG logos: stacked, horizontal and mark-only, each in 5 colour variants
png/       Transparent PNGs of the same logos (2000 px wide)
favicon/   favicon.ico, favicon.svg, apple-touch-icon, 192/512 icons, site.webmanifest
social/    og-image.png (1200×630) for link previews
react/     AsLabsLogo.jsx: inline-SVG component
_source/   build_assets.py (regenerates everything), make_preview.py (rebuilds preview.html)
```

## Which file to use

| Where | File |
|---|---|
| Navbar (dark site) | `logo/as-labs-horizontal-white-accent.svg` |
| Navbar (light site) | `logo/as-labs-horizontal-black-accent.svg` |
| Hero / about section | `logo/as-labs-stacked-white-accent.svg` |
| Footer, small spaces | `logo/as-labs-mark-white.svg` |
| Inline + CSS colour | `logo/as-labs-*.svg` with no colour suffix (uses `currentColor`) |

Colour suffixes: `-white`, `-black`, `-white-accent` / `-black-accent` (orange slash), none = `currentColor`.

## HTML

```html
<!-- in <head> (paths assume the folder is served at /brand/) -->
<link rel="icon" href="/brand/favicon/favicon.ico" sizes="any">
<link rel="icon" href="/brand/favicon/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/brand/favicon/apple-touch-icon.png">
<link rel="manifest" href="/brand/favicon/site.webmanifest">
<meta name="theme-color" content="#0B0D12">
<meta property="og:image" content="https://YOUR-DOMAIN/brand/social/og-image.png">
<meta name="twitter:card" content="summary_large_image">

<!-- navbar -->
<a href="/" class="logo">
  <img src="/brand/logo/as-labs-horizontal-white-accent.svg" alt="AS Labs" height="32">
</a>
```

The icon paths inside `site.webmanifest` are relative, so the folder works at any URL.

## React / Next.js

```jsx
import AsLabsLogo from "./brand/react/AsLabsLogo";

<AsLabsLogo variant="horizontal" accent="#FF4A1C" style={{ height: 32, color: "#fff" }} />
<AsLabsLogo variant="stacked" className="h-40 text-white" />   // Tailwind
<AsLabsLogo variant="mark" />
```

The logo takes its colour from the CSS `color` of its parent, so it automatically follows a light/dark theme.

## Brand colours

| Name | Hex | Use |
|---|---|---|
| Deep Space | `#0B0D12` | background, dark logo |
| Paper | `#FFFFFF` | light background, light logo |
| Ignition | `#FF4A1C` | the slash and accents only, never the letters |

## Rules

- Minimum size: the mark at 24 px tall. Below that the thin cuts close up.
- Clear space: keep a margin of at least the height of the "LABS" letters around the logo.
- Don't stretch, rotate, outline or recolour the letters. Only the slash takes the accent colour.

## Rebuilding

`_source/build_assets.py` uses the master files in `../as-labs-logo/` (mark) and `../as-labs-logo-v2/` (LABS lettering). It needs Python with `fonttools` and `Pillow`, plus Google Chrome for the PNG exports.

LABS is set in Arial Black (outlined, so no font loading is needed on your site).
