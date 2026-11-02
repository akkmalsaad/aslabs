// Drawn stand-ins for photography in the website mockup: soft light, depth blur, vignette
// and a touch of grain so they read as photos at mockup scale. Each fills its box (slice).
// Gradient ids are prefixed per scene; each scene renders once on the page.

const fill = "absolute inset-0 size-full";

function Grain({ id, opacity = 0.07 }: { id: string; opacity?: number }) {
  return (
    <>
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.2 -0.35" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} opacity={opacity} />
    </>
  );
}

/** Modern house at dusk, warm interior light, pool in the foreground. */
export function DuskHouse() {
  return (
    <svg viewBox="0 0 120 125" preserveAspectRatio="xMidYMid slice" className={fill}>
      <defs>
        <linearGradient id="dh-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1d2633" />
          <stop offset="0.38" stopColor="#5b5c6c" />
          <stop offset="0.6" stopColor="#c58f70" />
          <stop offset="0.74" stopColor="#efc08f" />
        </linearGradient>
        <radialGradient id="dh-sun" cx="0.78" cy="0.58" r="0.45">
          <stop offset="0" stopColor="#ffdcae" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffdcae" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dh-concrete" x1="0" x2="1">
          <stop offset="0" stopColor="#d9d0c2" />
          <stop offset="1" stopColor="#968b7c" />
        </linearGradient>
        <linearGradient id="dh-timber" x1="0" x2="1">
          <stop offset="0" stopColor="#6b513c" />
          <stop offset="1" stopColor="#35281e" />
        </linearGradient>
        <linearGradient id="dh-glow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffe2ad" />
          <stop offset="1" stopColor="#e8934f" />
        </linearGradient>
        <linearGradient id="dh-lawn" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3d4935" />
          <stop offset="1" stopColor="#1a2118" />
        </linearGradient>
        <linearGradient id="dh-pool" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#6f8f99" />
          <stop offset="1" stopColor="#21363f" />
        </linearGradient>
        <radialGradient id="dh-vignette" cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
        <filter id="dh-soft">
          <feGaussianBlur stdDeviation="0.9" />
        </filter>
        <filter id="dh-blur">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      <rect width="120" height="125" fill="url(#dh-sky)" />
      <rect width="120" height="125" fill="url(#dh-sun)" />
      <path d="M0 80Q24 68 50 75T120 71V100H0Z" fill="#4a4652" opacity="0.75" filter="url(#dh-soft)" />
      <g fill="#262b27" filter="url(#dh-soft)">
        <circle cx="6" cy="76" r="9" />
        <circle cx="15" cy="70" r="8" />
        <circle cx="108" cy="66" r="10" />
        <circle cx="118" cy="72" r="9" />
      </g>

      {/* Lower concrete volume with full-height glazing. */}
      <rect x="12" y="70" width="80" height="27" fill="url(#dh-concrete)" />
      <rect x="27" y="73.5" width="56" height="23.5" fill="url(#dh-glow)" />
      <rect x="31" y="90" width="17" height="4.5" rx="1" fill="#6a4630" opacity="0.7" />
      <circle cx="66" cy="78" r="1.6" fill="#fff4d8" />
      <path d="M66 73.5v2.9" stroke="#3b302a" strokeWidth="0.4" />
      <circle cx="74" cy="90" r="3.4" fill="#4c5a3c" opacity="0.8" />
      <g stroke="#3b302a" strokeWidth="0.8">
        <path d="M41 73.5V97M55 73.5V97M69 73.5V97" />
      </g>

      {/* Timber cantilever above. */}
      <rect x="38" y="51" width="70" height="2" fill="#221e1b" />
      <rect x="40" y="53" width="66" height="17.5" fill="url(#dh-timber)" />
      <g stroke="#000" strokeOpacity="0.22" strokeWidth="0.35">
        {Array.from({ length: 32 }, (_, i) => (
          <path key={i} d={`M${41 + i * 2} 53v17.5`} />
        ))}
      </g>
      <rect x="50" y="56.5" width="34" height="10" fill="url(#dh-glow)" opacity="0.92" />
      <path d="M61.5 56.5v10M73 56.5v10" stroke="#3b302a" strokeWidth="0.6" />
      <rect x="40" y="70.5" width="66" height="2.4" fill="#000" opacity="0.28" />

      <rect y="97" width="120" height="28" fill="url(#dh-lawn)" />
      <path d="M8 103H106L116 117H-2Z" fill="url(#dh-pool)" />
      <path d="M30 104H82L84 111H28Z" fill="#f2b06a" opacity="0.3" filter="url(#dh-soft)" />
      <g stroke="#cfe3e8" strokeOpacity="0.35" strokeWidth="0.4">
        <path d="M14 108h30M52 110h40M24 113h26M70 106h22" />
      </g>
      <g fill="#141a13" filter="url(#dh-blur)">
        <ellipse cx="6" cy="122" rx="16" ry="9" />
        <ellipse cx="114" cy="124" rx="14" ry="7" />
      </g>

      <rect width="120" height="125" fill="url(#dh-vignette)" />
      <Grain id="dh-grain" />
    </svg>
  );
}

/** Calm living room, morning light across the wall. */
export function LivingRoom() {
  return (
    <svg viewBox="0 0 40 30" preserveAspectRatio="xMidYMid slice" className={fill}>
      <defs>
        <linearGradient id="lr-wall" x1="0" x2="1">
          <stop offset="0" stopColor="#efe7da" />
          <stop offset="1" stopColor="#cfc3b1" />
        </linearGradient>
        <linearGradient id="lr-floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c7a47c" />
          <stop offset="1" stopColor="#8d6d4d" />
        </linearGradient>
      </defs>
      <rect width="40" height="22" fill="url(#lr-wall)" />
      <path d="M6 0h9L22 22H11Z" fill="#fff8ea" opacity="0.55" />
      <rect y="22" width="40" height="8" fill="url(#lr-floor)" />
      <rect x="14" y="16" width="20" height="6.5" rx="1.6" fill="#b3a593" />
      <rect x="15" y="13.5" width="18" height="4" rx="1.4" fill="#c2b5a3" />
      <circle cx="7" cy="14" r="3.4" fill="#5d6b4b" />
      <circle cx="9" cy="12" r="2.6" fill="#6f7d5a" />
      <rect x="6" y="17" width="3" height="5" rx="0.6" fill="#d8cfc2" />
      <path d="M28 0v6" stroke="#3b3a36" strokeWidth="0.25" />
      <ellipse cx="28" cy="6.6" rx="2" ry="1.1" fill="#3b3a36" />
    </svg>
  );
}

/** Kitchen with deep green joinery and pendant lights. */
export function Kitchen() {
  return (
    <svg viewBox="0 0 40 30" preserveAspectRatio="xMidYMid slice" className={fill}>
      <defs>
        <linearGradient id="kt-wall" x1="0" x2="1">
          <stop offset="0" stopColor="#ebe6de" />
          <stop offset="1" stopColor="#d3cbbf" />
        </linearGradient>
        <linearGradient id="kt-joinery" x1="0" x2="1">
          <stop offset="0" stopColor="#4b5a4c" />
          <stop offset="1" stopColor="#2f3a31" />
        </linearGradient>
      </defs>
      <rect width="40" height="30" fill="url(#kt-wall)" />
      <rect x="0" y="4" width="40" height="7" fill="url(#kt-joinery)" />
      <rect x="0" y="17" width="40" height="13" fill="url(#kt-joinery)" />
      <rect x="0" y="16" width="40" height="1.6" fill="#efe9df" />
      <g stroke="#000" strokeOpacity="0.25" strokeWidth="0.25">
        <path d="M10 4v7M20 4v7M30 4v7M10 18v12M20 18v12M30 18v12" />
      </g>
      <g fill="#c99a5b">
        <path d="M13 0v12.5M27 0v12.5" stroke="#2b2a27" strokeWidth="0.2" />
        <ellipse cx="13" cy="13" rx="1.6" ry="0.9" />
        <ellipse cx="27" cy="13" rx="1.6" ry="0.9" />
      </g>
      <circle cx="13" cy="13.6" r="1.2" fill="#ffe9b8" opacity="0.6" />
      <circle cx="27" cy="13.6" r="1.2" fill="#ffe9b8" opacity="0.6" />
      <rect x="31" y="13" width="2.2" height="3" rx="0.4" fill="#d9d2c6" />
    </svg>
  );
}

/** Renovated terrace facade with timber screen. */
export function Facade() {
  return (
    <svg viewBox="0 0 40 30" preserveAspectRatio="xMidYMid slice" className={fill}>
      <defs>
        <linearGradient id="fc-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a9bccb" />
          <stop offset="1" stopColor="#e3e6e2" />
        </linearGradient>
        <linearGradient id="fc-wall" x1="0" x2="1">
          <stop offset="0" stopColor="#f2efe9" />
          <stop offset="1" stopColor="#cdc7bd" />
        </linearGradient>
      </defs>
      <rect width="40" height="30" fill="url(#fc-sky)" />
      <rect x="6" y="5" width="30" height="25" fill="url(#fc-wall)" />
      <rect x="10" y="9" width="14" height="10" fill="#8a6a4c" />
      <g stroke="#5a4331" strokeWidth="0.6">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M${11 + i * 1.75} 9v10`} />
        ))}
      </g>
      <rect x="27" y="9" width="6" height="21" fill="#3d4247" />
      <rect x="10" y="22" width="14" height="8" fill="#2f3438" opacity="0.85" />
      <rect x="4" y="4" width="34" height="1.4" fill="#2a2a28" />
      <circle cx="4" cy="26" r="4" fill="#56653f" />
    </svg>
  );
}
