import type { ReactNode } from "react";

// Close-up product shot of a front-facing MacBook Pro (space black) on a shelf against a light
// wall, drawn on a 1200×1180 canvas. The laptop is centred at x=795, so its right side runs off
// the frame, as in a cropped studio photo. Screen content renders as HTML inside the display.
//
// Display: 1154×744 at (218, 166), the 14" MacBook Pro ratio (≈1.55:1), with a 112×24 notch.
//
// Framing (container is a size container): the canvas is as tall as the container, and the
// notch sits at 66% of its width, as in the reference crop, moving right only as far as needed
// to keep the base's left edge 2% in from the side. Wall, shelf and cabinet extend sideways
// past the canvas so any aspect ratio is filled; the container clips the rest.

const W = 1200;
const H = 1180;
const screen = { x: 218, y: 166, w: 1154, h: 744 };
/** How far the room extends past each side of the canvas (canvas units). */
const room = 1200;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

type MacBookSceneProps = {
  /** Fills the strip under the notch so the content starts below it. */
  screenColor: string;
  children: ReactNode;
};

export function MacBookScene({ screenColor, children }: MacBookSceneProps) {
  return (
    <div
      className="absolute top-0 aspect-[1200/1180] h-full"
      // Canvas width is 101.695cqh; notch at 66.25% of it, base edge 56.67% left of the notch.
      style={{ left: "calc(max(66cqw, 2cqw + 57.63cqh) - 67.37cqh)" }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="mb-wall" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e7e6e4" />
            <stop offset="0.65" stopColor="#dedddb" />
            <stop offset="1" stopColor="#d2d1cf" />
          </linearGradient>
          <radialGradient id="mb-wall-light" gradientUnits="userSpaceOnUse" cx="340" cy="200" r="1050">
            <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mb-shelf" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#d9d8d6" />
            <stop offset="1" stopColor="#c5c4c2" />
          </linearGradient>
          <linearGradient id="mb-cabinet" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#56534f" />
            <stop offset="1" stopColor="#3d3a37" />
          </linearGradient>
          <radialGradient id="mb-knob" cx="0.4" cy="0.32" r="0.75">
            <stop offset="0" stopColor="#8a8681" />
            <stop offset="0.6" stopColor="#57534f" />
            <stop offset="1" stopColor="#3a3734" />
          </radialGradient>
          <linearGradient id="mb-lid" x1="0" x2="1">
            <stop offset="0" stopColor="#3b3c40" />
            <stop offset="0.35" stopColor="#2a2b2e" />
            <stop offset="1" stopColor="#323337" />
          </linearGradient>
          <linearGradient id="mb-hinge" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#0d0e10" />
            <stop offset="0.45" stopColor="#26272b" />
            <stop offset="1" stopColor="#1a1b1e" />
          </linearGradient>
          <linearGradient id="mb-base-top" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#5b5c61" />
            <stop offset="1" stopColor="#323337" />
          </linearGradient>
          <linearGradient id="mb-base-front" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#2d2e32" />
            <stop offset="0.5" stopColor="#1b1c1f" />
            <stop offset="1" stopColor="#0e0f11" />
          </linearGradient>
          <linearGradient id="mb-base-sheen" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.8" stopColor="#fff" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="mb-scoop" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e2e1df" />
            <stop offset="1" stopColor="#a7a6a4" />
          </linearGradient>
          <filter id="mb-blur-s" x="-10%" y="-200%" width="120%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="mb-blur-l" x="-10%" y="-200%" width="120%" height="500%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id="mb-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.1 -0.4" />
          </filter>
          <radialGradient id="mb-vignette" gradientUnits="userSpaceOnUse" cx="760" cy="560" r="1000">
            <stop offset="0.6" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.14" />
          </radialGradient>
        </defs>

        {/* Room: wall, shelf top, cabinet front. */}
        <rect x={-room} width={W + 2 * room} height="1004" fill="url(#mb-wall)" />
        <rect x={-room} width={W + 2 * room} height="1004" fill="url(#mb-wall-light)" />
        <rect x={-room} y="1000" width={W + 2 * room} height="24" fill="url(#mb-shelf)" />
        <path d={`M${-room} 1023.5H${W + room}`} stroke="#ecebe9" strokeWidth="1.2" />
        <rect x={-room} y="1024" width={W + 2 * room} height={H - 1024} fill="url(#mb-cabinet)" />
        <rect x={-room} y="1024" width={W + 2 * room} height="10" fill="#000" opacity="0.18" />
        <path d="M808 1026V1180" stroke="#2c2a27" strokeWidth="3" />
        <path d="M811 1026V1180" stroke="#6b6762" strokeWidth="1" opacity="0.6" />
        <ellipse cx="962" cy="1142" rx="26" ry="9" fill="#000" opacity="0.25" filter="url(#mb-blur-s)" />
        <circle cx="960" cy="1132" r="25" fill="url(#mb-knob)" />

        {/* Shadows the laptop casts on the shelf and wall. */}
        <ellipse cx="795" cy="1001" rx="720" ry="16" fill="#000" opacity="0.2" filter="url(#mb-blur-l)" />
        <ellipse cx="795" cy="999" rx="690" ry="5" fill="#000" opacity="0.5" filter="url(#mb-blur-s)" />
        <rect x="190" y="150" width="1210" height="790" rx="34" fill="#000" opacity="0.1" filter="url(#mb-blur-l)" />

        {/* Base: feet, front edge with thumb scoop, top face. */}
        <rect x="178" y="993" width="118" height="9" rx="4.5" fill="#0b0b0c" />
        <rect x="1294" y="993" width="118" height="9" rx="4.5" fill="#0b0b0c" />
        <path d="M119 960H1471V984A14 14 0 0 1 1457 998H133A14 14 0 0 1 119 984Z" fill="url(#mb-base-front)" />
        <path d="M119 960H1471V984A14 14 0 0 1 1457 998H133A14 14 0 0 1 119 984Z" fill="url(#mb-base-sheen)" />
        <path d="M123 953H1467A4 4 0 0 1 1471 957V961H119V957A4 4 0 0 1 123 953Z" fill="url(#mb-base-top)" />
        <path d="M121 961.5H1469" stroke="#fff" strokeOpacity="0.16" strokeWidth="1" />
        <path d="M697 961H893V964A8 8 0 0 1 885 972H705A8 8 0 0 1 697 964Z" fill="url(#mb-scoop)" />

        {/* Hinge seen from the front. */}
        <path d="M214 918H1376V948A6 6 0 0 1 1370 954H220A6 6 0 0 1 214 948Z" fill="url(#mb-hinge)" />
        <path d="M218 953.5H1372" stroke="#fff" strokeOpacity="0.1" strokeWidth="1" />

        {/* Lid: aluminium rim, black bezel, display. */}
        <path
          d="M232 146H1358A32 32 0 0 1 1390 178V914A12 12 0 0 1 1378 926H212A12 12 0 0 1 200 914V178A32 32 0 0 1 232 146Z"
          fill="url(#mb-lid)"
        />
        <path d="M206 170A26 26 0 0 1 232 147H1358" fill="none" stroke="#fff" strokeOpacity="0.32" strokeWidth="1.4" />
        <path d="M201.5 180V912" stroke="#fff" strokeOpacity="0.14" strokeWidth="1" />
        <rect x="206" y="152" width="1178" height="768" rx="25" fill="#060607" />
        <rect x={screen.x} y={screen.y} width={screen.w} height={screen.h} rx="12" fill="#0b0b0d" />

        <rect x={-room} width={W + 2 * room} height={H} fill="url(#mb-vignette)" />
        <rect x={-room} width={W + 2 * room} height={H} filter="url(#mb-grain)" opacity="0.05" />
      </svg>

      {/* Display: content is clipped to the panel's rounded corners. */}
      <div
        className="absolute overflow-hidden rounded-[1.04%/1.61%]"
        style={{
          left: pct(screen.x, W),
          top: pct(screen.y, H),
          width: pct(screen.w, W),
          height: pct(screen.h, H),
          background: screenColor,
        }}
      >
        {/* Starts below the notch (24 of 744 units, plus a little air). */}
        <div className="absolute inset-x-0 top-[3.8%] bottom-0">{children}</div>

        <span className="absolute top-0 left-1/2 grid h-[3.23%] w-[9.71%] -translate-x-1/2 place-items-center rounded-b-[18%/42%] bg-[#060607]">
          <span className="aspect-square w-[6%] rounded-full bg-[radial-gradient(circle_at_35%_35%,#3b4560,#0b0d14_70%)]" />
        </span>
        {/* Glass: soft reflection and a dark inner edge. */}
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(118deg,rgb(255_255_255/0.09)_0%,rgb(255_255_255/0.025)_30%,transparent_48%)] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.35)]" />
      </div>
    </div>
  );
}
