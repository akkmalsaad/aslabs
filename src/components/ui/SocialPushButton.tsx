"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion, type HTMLMotionProps, type Variants } from "motion/react";
import { brandColors } from "@/lib/site";
import type { Social, SocialTone } from "@/lib/socials";

// A physical push button: a stationary round housing with a raised cap in a recessed well.
// Only the cap moves. Size comes from the parent's `--push-size` (diameter of the housing).
// Light comes from above, so raised parts cast shadows downward and catch a top highlight.

type Tone = {
  housing: string;
  housingShadow: string;
  ring: string;
  well: string;
  wellShadow: string;
  cap: string;
  /** Raised and pressed cap shadows: same shadow list, so Motion can interpolate between them. */
  capRaised: string;
  capPressed: string;
  icon: string;
  indicator: string;
};

const tones: Record<SocialTone, Tone> = {
  // Near-black housing, a slightly lighter cap, white mark.
  ink: {
    housing: "linear-gradient(180deg, #2a2e37, #0f1116)",
    housingShadow:
      "inset 0 1px 0 rgb(255 255 255 / 0.14), inset 0 -1px 2px rgb(0 0 0 / 0.5), 0 1px 2px rgb(11 13 18 / 0.18), 0 12px 22px -10px rgb(11 13 18 / 0.45)",
    ring: "rgb(255 255 255 / 0.07)",
    well: "#07080b",
    wellShadow: "inset 0 2px 3px rgb(0 0 0 / 0.6), 0 1px 0 rgb(255 255 255 / 0.08)",
    cap: "linear-gradient(180deg, #3a3f4a, #1c2028)",
    capRaised:
      "0 5px 8px -2px rgb(0 0 0 / 0.55), 0 1px 1px rgb(0 0 0 / 0.4), inset 0 1px 0 rgb(255 255 255 / 0.22), inset 0 -2px 3px rgb(0 0 0 / 0.3)",
    capPressed:
      "0 1px 2px -1px rgb(0 0 0 / 0.7), 0 0 1px rgb(0 0 0 / 0.6), inset 0 1px 0 rgb(255 255 255 / 0.08), inset 0 2px 4px rgb(0 0 0 / 0.35)",
    icon: brandColors.paper,
    indicator: "rgb(255 255 255 / 0.3)",
  },
  // Ignition cap on a darker orange housing, ink mark.
  ignition: {
    housing: "linear-gradient(180deg, #f2511f, #c7340d)",
    housingShadow:
      "inset 0 1px 0 rgb(255 214 196 / 0.55), inset 0 -1px 2px rgb(120 25 0 / 0.45), 0 1px 2px rgb(11 13 18 / 0.14), 0 12px 22px -10px rgb(150 40 5 / 0.5)",
    ring: "rgb(120 25 0 / 0.16)",
    well: "#a92a06",
    wellShadow: "inset 0 2px 3px rgb(90 18 0 / 0.55), 0 1px 0 rgb(255 200 175 / 0.35)",
    cap: `linear-gradient(180deg, #ff6a3d, ${brandColors.ignition} 55%, #ef420f)`,
    capRaised:
      "0 5px 8px -2px rgb(120 28 0 / 0.5), 0 1px 1px rgb(120 28 0 / 0.35), inset 0 1px 0 rgb(255 222 205 / 0.7), inset 0 -2px 3px rgb(150 35 0 / 0.3)",
    capPressed:
      "0 1px 2px -1px rgb(120 28 0 / 0.65), 0 0 1px rgb(120 28 0 / 0.55), inset 0 1px 0 rgb(255 222 205 / 0.25), inset 0 2px 4px rgb(130 30 0 / 0.35)",
    icon: brandColors.ink,
    indicator: "rgb(255 226 212 / 0.75)",
  },
};

/** Cap travel, px: raised above the well's centre at rest, sunk below it when pressed. */
const RAISED_Y = -2.5;
const PRESSED_Y = 3;

// Shared by every push button: press in fast, spring back out with a hint of overshoot.
const pressIn = { duration: 0.12, ease: "easeOut" } as const;
const springBack = { type: "spring", visualDuration: 0.3, bounce: 0.25 } as const;

/**
 * Cap animation for every push button. Reduced motion: no travel, the shadow and highlight
 * change alone show the press.
 */
function capVariants(tone: Tone, reduceMotion: boolean, travel: { raised: number; pressed: number; pressedScale: number }): Variants {
  return {
    rest: {
      y: reduceMotion ? 0 : travel.raised,
      scale: 1,
      boxShadow: tone.capRaised,
      transition: springBack,
    },
    pressed: {
      y: reduceMotion ? 0 : travel.pressed,
      scale: reduceMotion ? 1 : travel.pressedScale,
      boxShadow: tone.capPressed,
      transition: pressIn,
    },
  };
}

/** A link that presses the PushButtonFace inside it: press anywhere on the link and the cap sinks. */
export function PushLink(props: HTMLMotionProps<"a">) {
  return <m.a initial="rest" animate="rest" whileTap="pressed" {...props} />;
}

/** The housing and cap alone (decorative), sized by `--push-size`. Put it inside a PushLink. */
export function PushButtonFace({ tone: toneName, path, className = "" }: { tone: SocialTone; path: string; className?: string }) {
  const reduceMotion = useReducedMotion() ?? false;
  const tone = tones[toneName];
  const cap = capVariants(tone, reduceMotion, { raised: RAISED_Y, pressed: PRESSED_Y, pressedScale: 0.975 });

  return (
    <span
      aria-hidden
      className={`relative block size-(--push-size) rounded-full ${className}`}
      style={{ background: tone.housing, boxShadow: tone.housingShadow }}
    >
      {/* Position indicator and a faint concentric ring, both part of the fixed housing. */}
      <span
        className="absolute top-[4.5%] left-1/2 h-[8%] w-[4%] min-w-[3px] -translate-x-1/2 rounded-[1px]"
        style={{ background: tone.indicator }}
      />
      <span className="absolute inset-[8%] rounded-full border" style={{ borderColor: tone.ring }} />
      <span className="absolute inset-[17%] rounded-full" style={{ background: tone.well, boxShadow: tone.wellShadow }} />

      <m.span
        variants={cap}
        className="absolute inset-[19%] grid place-items-center overflow-hidden rounded-full"
        style={{ background: tone.cap }}
      >
        {/* Hover: the cap's top catches a little more light. */}
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgb(255_255_255/0.16),transparent_62%)] opacity-0 transition-opacity duration-180 ease-out group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" fill={tone.icon} className="relative size-[38%]">
          <path d={path} />
        </svg>
      </m.span>
    </span>
  );
}

export function SocialPushButton({ social }: { social: Social }) {
  return (
    <PushLink
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-(--push-size) cursor-pointer touch-manipulation flex-col items-center gap-3 select-none [-webkit-tap-highlight-color:transparent] focus-visible:outline-none"
    >
      <span className="font-mono text-[0.6875rem] leading-none tracking-[0.14em] whitespace-nowrap text-muted uppercase">
        {social.name}
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
      <PushButtonFace
        tone={social.tone}
        path={social.path}
        className="outline-offset-4 outline-ignition group-focus-visible:outline-2"
      />
    </PushLink>
  );
}

// Pill variant (service cards, hero CTAs): the round button's layers and values, stretched into
// a pill. Housing → ring (inset 2px) → recessed well (inset 5px) → cap (inset 6px), the same
// nesting as the round face; there's no room for the position indicator. Callers set the
// height on `className` and the cap's side padding on `capClassName`, so that housing + cap
// padding matches the button the pill replaced.
/** Cap travel, px: same direction as the round cap, scaled to the 1px well gap (3.5px total). */
const PILL_TRAVEL = { raised: -1.5, pressed: 2, pressedScale: 1 };

type PushPillProps = {
  href: string;
  tone?: SocialTone;
  className?: string;
  capClassName?: string;
  children: ReactNode;
};

/** A pill-shaped push button link; `children` (label, arrow) sit on the moving cap. */
export function PushPill({ href, tone: toneName = "ignition", className = "", capClassName = "px-[15px]", children }: PushPillProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const pill = tones[toneName];
  const cap = capVariants(pill, reduceMotion, PILL_TRAVEL);

  return (
    <PushLink
      href={href}
      className={`group relative inline-flex touch-manipulation rounded-full p-[6px] [-webkit-tap-highlight-color:transparent] ${className}`}
      style={{ background: pill.housing, boxShadow: pill.housingShadow, color: pill.icon }}
    >
      <span aria-hidden className="absolute inset-[2px] rounded-full border" style={{ borderColor: pill.ring }} />
      <span aria-hidden className="absolute inset-[5px] rounded-full" style={{ background: pill.well, boxShadow: pill.wellShadow }} />

      <m.span
        variants={cap}
        className={`relative flex items-center gap-2.5 overflow-hidden rounded-full ${capClassName}`}
        style={{ background: pill.cap }}
      >
        {/* Hover: the cap's top catches a little more light (same sheen as the round caps). */}
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgb(255_255_255/0.16),transparent_62%)] opacity-0 transition-opacity duration-180 ease-out group-hover:opacity-100" />
        {children}
      </m.span>
    </PushLink>
  );
}
