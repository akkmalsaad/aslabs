import type { CSSProperties } from "react";
import type { Transition } from "motion/react";

// One motion language for the whole site. Mirrors the --ease-* and --dur-*
// custom properties in globals.css; change both together.

type Bezier = [number, number, number, number];

export const ease: Record<"out" | "inOut", Bezier> = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
};

export const duration = {
  /** Hover, press, icon morphs */
  micro: 0.3,
  /** Menus, reveals, state changes */
  ui: 0.6,
  /** Hero / headline sequences */
  cinematic: 0.9,
} as const;

export const transition = {
  micro: { duration: duration.micro, ease: ease.out },
  ui: { duration: duration.ui, ease: ease.out },
  cinematic: { duration: duration.cinematic, ease: ease.out },
} satisfies Record<string, Transition>;

export const spring = {
  /** UI state changes: settles without visible overshoot. */
  ui: { type: "spring", duration: 0.55, bounce: 0.06 },
  /** Smoothing for pointer- and scroll-driven values (useSpring options). */
  follow: { stiffness: 110, damping: 22, mass: 0.7 },
} as const;

/** Stagger between sibling items (menu links, list rows). */
export const stagger = 0.04;

/**
 * First-load timeline, in seconds from first paint. Everything except the hero
 * headline settles in ~2s; the headline then reveals (see `headlineIntro`).
 */
export const intro = {
  logo: 0.1,
  menu: 0.3,
  eyebrow: 0.35,
  lede: 0.82,
  actions: 0.94,
  visuals: [0.64, 0.76, 0.88],
  tools: 1.1,
  cue: 1.35,
} as const;

// CSS durations of the entrances above (globals.css): .intro-rise runs --dur-ui unless
// overridden; .intro-visual runs 0.95s.
const introVisualDuration = 0.95;

// The headline overlaps the last hero entrance's ease-out tail by this much: by then the
// phone mockup has under half a pixel left to travel, so it already reads as settled.
const headlineTailOverlap = 0.33;

/**
 * Hero headline, revealed character by character as the other visible hero entrances
 * (label, visuals, actions, tool strip) settle. The fixed logo/menu, the decorative
 * scroll cue and continuous loops (tool marquee) aren't waited on.
 */
export const headlineIntro = {
  start:
    Math.max(
      intro.eyebrow + duration.ui,
      ...intro.visuals.map((delay) => delay + introVisualDuration),
      intro.actions + duration.ui,
      intro.tools + duration.ui,
    ) - headlineTailOverlap,
  charStagger: 0.09,
};

/** Inline style for the CSS intro classes (.intro-rise / .intro-char / .intro-visual). */
export function introStyle(delay: number, vars: Record<`--${string}`, string> = {}): CSSProperties {
  return { "--intro-delay": `${delay}s`, ...vars } as CSSProperties;
}
