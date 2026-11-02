"""Builds the AS LABS web asset pack.

Mark  : the refined "worm" AS from ../../as-labs-logo/build.py
LABS  : Arial Black outlines, optically spaced, from ../../as-labs-logo-v2/build.py

Run with a Python that has fontTools + Pillow:
    python3 build_assets.py
"""
import importlib.util, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
PACK = os.path.dirname(HERE)
ROOT = os.path.dirname(PACK)


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    return mod

v1 = load("mark_build", os.path.join(ROOT, "as-labs-logo", "build.py"))
v2 = load("labs_build", os.path.join(ROOT, "as-labs-logo-v2", "build.py"))

H, W, XR, MARK_W, MID_B = v1.H, v1.W, v1.XR, v1.MARK_W, v1.MID_B
ACCENT, INK, PAPER = "#FF4A1C", "#0B0D12", "#FFFFFF"
TITLE = "AS Labs"


def rnd(d):
    """Shorten path data: 1 decimal place."""
    def f(m):
        s = f"{float(m.group()):.1f}"
        s = s.rstrip("0").rstrip(".")
        return "0" if s in ("-0", "") else s
    return re.sub(r"-?\d+\.\d+|-?\d+", f, d)


MARK_D = rnd(v1.MAIN + " " + v1.CROSS)
SLASH_D = rnd(v1.SLASH)

# ---------- LABS, stacked: cap height = stroke W, ink spans A foot -> S bowl ----------
LABS_CAP = W
LABS_GAP = round(W * 0.40)
labs_base = H + LABS_GAP + LABS_CAP
print("spacing LABS (stacked) …")
stk_paths, _ = v2.build_labs(0.0, XR, LABS_CAP, labs_base)
LABS_STACK_D = rnd(" ".join(stk_paths))
STACK_W, STACK_H = MARK_W, labs_base

# ---------- LABS, horizontal: cap spans crossbar top -> baseline (grid-aligned) ----------
F = v2.Glyphs(v2.F_LABS)
h_cap = H - MID_B
s = h_cap / F.bounds("L")[3]
track = 0.18 * h_cap / s                # +18% of cap height between letters
x = MARK_W + W * 1.25 - F.bounds("L")[0] * s
hp = []
for ch in "LABS":
    hp.append(F.path(ch, x, H, s))
    x += (F.g(ch).width + track) * s
HORIZ_W = x - (F.g("S").width - F.bounds("S")[2] + track) * s
LABS_HORIZ_D = rnd(" ".join(hp))
HORIZ_H = H


def svg(w, h, body, pad=0, bg=None, rx=0, size=None):
    vw, vh = w + 2 * pad, h + 2 * pad
    attrs = f' width="{size[0]}" height="{size[1]}"' if size else ""
    bgr = f'<rect width="{vw:.0f}" height="{vh:.0f}" rx="{rx:.0f}" fill="{bg}"/>' if bg else ""
    tr = f' transform="translate({pad:.0f} {pad:.0f})"' if pad else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw:.0f} {vh:.0f}"{attrs} '
            f'role="img" aria-label="{TITLE}"><title>{TITLE}</title>{bgr}<g{tr}>{body}</g></svg>\n')


def body(kind, fg, accent=None):
    acc = accent or fg
    out = f'<path fill="{fg}" d="{MARK_D}"/><path fill="{acc}" d="{SLASH_D}"/>'
    if kind == "stacked":
        out += f'<path fill="{fg}" d="{LABS_STACK_D}"/>'
    elif kind == "horizontal":
        out += f'<path fill="{fg}" d="{LABS_HORIZ_D}"/>'
    return out


DIMS = {"stacked": (STACK_W, STACK_H), "horizontal": (HORIZ_W, HORIZ_H), "mark": (MARK_W, H)}
VARIANTS = {                      # suffix: (fg, accent)
    "": ("currentColor", None),   # inherits CSS `color` when inlined
    "-white": (PAPER, None),
    "-black": (INK, None),
    "-white-accent": (PAPER, ACCENT),
    "-black-accent": (INK, ACCENT),
}


def write(rel, data, mode="w"):
    p = os.path.join(PACK, rel); os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, mode) as fh: fh.write(data)
    return p


def icon_svg(size=512, rounded=True, scale=0.84):
    """Mark on a Deep Space square; used for favicon + app icons."""
    s = size * scale / MARK_W
    tx, ty = (size - MARK_W * s) / 2, (size - H * s) / 2
    rx = size * 0.22 if rounded else 0
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">'
            f'<rect width="{size}" height="{size}" rx="{rx:.0f}" fill="{INK}"/>'
            f'<g transform="translate({tx:.2f} {ty:.2f}) scale({s:.5f})">{body("mark", PAPER, ACCENT)}</g></svg>\n')


def og_svg():
    w, h = 1200, 630
    s = 540 / STACK_W
    tx, ty = (w - STACK_W * s) / 2, (h - STACK_H * s) / 2
    grid = "".join(f'<line x1="0" y1="{y}" x2="{w}" y2="{y}" stroke="#FFFFFF" stroke-opacity="0.04"/>' for y in range(0, h, 42))
    grid += "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="{h}" stroke="#FFFFFF" stroke-opacity="0.04"/>' for x in range(0, w, 42))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
            f'<rect width="{w}" height="{h}" fill="{INK}"/>{grid}'
            f'<g transform="translate({tx:.2f} {ty:.2f}) scale({s:.5f})">{body("stacked", PAPER, ACCENT)}</g></svg>\n')


CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def to_png(svg_path, png_path, w, h, scale=1):
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                    "--default-background-color=00000000", f"--force-device-scale-factor={scale}",
                    f"--window-size={w},{h}", f"--screenshot={png_path}", "file://" + svg_path],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


if __name__ == "__main__":
    from PIL import Image
    tmp = os.path.join(HERE, ".tmp"); os.makedirs(tmp, exist_ok=True)
    for d in ("logo", "png", "favicon", "social", "react"):
        os.makedirs(os.path.join(PACK, d), exist_ok=True)

    # 1. SVG logos
    for kind, (w, h) in DIMS.items():
        for suf, (fg, acc) in VARIANTS.items():
            write(f"logo/as-labs-{kind}{suf}.svg", svg(w, h, body(kind, fg, acc)))

    # 2. PNG logos (transparent, 2x of a 1000px-wide layout)
    for kind, (w, h) in DIMS.items():
        for suf in ("-white", "-black", "-white-accent", "-black-accent"):
            fg, acc = VARIANTS[suf]
            k = 1000 / w
            src = os.path.join(tmp, f"{kind}{suf}.svg")
            open(src, "w").write(svg(w, h, body(kind, fg, acc), size=(round(w * k), round(h * k))))
            to_png(src, os.path.join(PACK, f"png/as-labs-{kind}{suf}.png"), round(w * k), round(h * k), 2)

    # 3. Favicon + app icons
    write("favicon/favicon.svg", icon_svg(512, True, 0.84))
    big = os.path.join(tmp, "icon-1024.png"); src = os.path.join(tmp, "icon.svg")
    open(src, "w").write(icon_svg(1024, True, 0.84)); to_png(src, big, 1024, 1024)
    flat = os.path.join(tmp, "icon-flat-1024.png"); src2 = os.path.join(tmp, "icon-flat.svg")
    open(src2, "w").write(icon_svg(1024, False, 0.80)); to_png(src2, flat, 1024, 1024)
    mask = os.path.join(tmp, "icon-mask-1024.png"); src3 = os.path.join(tmp, "icon-mask.svg")
    open(src3, "w").write(icon_svg(1024, False, 0.66)); to_png(src3, mask, 1024, 1024)
    im, imf, imm = Image.open(big).convert("RGBA"), Image.open(flat).convert("RGBA"), Image.open(mask).convert("RGBA")
    im.resize((192, 192), Image.LANCZOS).save(os.path.join(PACK, "favicon/icon-192.png"))
    im.resize((512, 512), Image.LANCZOS).save(os.path.join(PACK, "favicon/icon-512.png"))
    imm.resize((512, 512), Image.LANCZOS).save(os.path.join(PACK, "favicon/icon-maskable-512.png"))
    imf.resize((180, 180), Image.LANCZOS).convert("RGB").save(os.path.join(PACK, "favicon/apple-touch-icon.png"))
    imf.resize((256, 256), Image.LANCZOS).save(os.path.join(PACK, "favicon/favicon.ico"),
                                               sizes=[(16, 16), (32, 32), (48, 48)])
    write("favicon/site.webmanifest", json.dumps({
        "name": "AS Labs", "short_name": "AS Labs",
        "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
                  {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
                  {"src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png",
                   "purpose": "maskable"}],
        "theme_color": INK, "background_color": INK, "display": "standalone"}, indent=2) + "\n")

    # 4. Social share image
    src = os.path.join(tmp, "og.svg"); open(src, "w").write(og_svg())
    to_png(src, os.path.join(tmp, "og.png"), 1200, 630)
    Image.open(os.path.join(tmp, "og.png")).convert("RGB").save(os.path.join(PACK, "social/og-image.png"))

    # 5. React component (inline SVG, inherits text colour)
    write("react/AsLabsLogo.jsx", f'''// AS Labs logo as an inline React component.
// Colour follows the CSS `color` of the parent; pass accent="#FF4A1C" for the orange slash.
//   <AsLabsLogo variant="horizontal" className="h-8 text-white" />
const VIEW = {{
  stacked: "0 0 {STACK_W:.0f} {STACK_H:.0f}",
  horizontal: "0 0 {HORIZ_W:.0f} {HORIZ_H:.0f}",
  mark: "0 0 {MARK_W:.0f} {H:.0f}",
}};
const MARK = "{MARK_D}";
const SLASH = "{SLASH_D}";
const LABS = {{
  stacked: "{LABS_STACK_D}",
  horizontal: "{LABS_HORIZ_D}",
}};

export default function AsLabsLogo({{ variant = "horizontal", accent, title = "AS Labs", ...props }}) {{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={{VIEW[variant]}} role="img" aria-label={{title}} {{...props}}>
      <title>{{title}}</title>
      <path fill="currentColor" d={{MARK}} />
      <path fill={{accent || "currentColor"}} d={{SLASH}} />
      {{LABS[variant] && <path fill="currentColor" d={{LABS[variant]}} />}}
    </svg>
  );
}}
''')
    print("done")
