"use client";

import { m, type Variants } from "motion/react";
import { transition } from "@/lib/motion";

type MaskRevealProps = {
  as?: "h1" | "h2" | "h3" | "p";
  /** One entry per visual line. */
  lines: readonly string[];
  id?: string;
  className?: string;
  /** Optional class per line (e.g. a muted first line). */
  lineClassNames?: readonly string[];
  /**
   * Extra room below each line for faces with long descenders (the display headings), so the
   * tail clears the mask well before the rise settles. Line spacing is unchanged.
   */
  deepDescenders?: boolean;
};

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const line: Variants = {
  hidden: { y: "105%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: transition.cinematic },
};

// Scroll-triggered headline reveal: each line rises from behind its own
// overflow mask. The observer sits on the (untransformed) wrapper, since the
// masked lines themselves start fully clipped.
export function MaskReveal({
  as: Tag = "h2",
  lines,
  id,
  className = "",
  lineClassNames = [],
  deepDescenders = false,
}: MaskRevealProps) {
  // Same pattern as the hero headline: the padding rides on the moving line (so the 105%
  // rise still starts fully hidden) and the mask's negative margin cancels it.
  const maskClass = deepDescenders ? "-mb-[0.3em] block overflow-hidden" : "-mb-[0.12em] block overflow-hidden pb-[0.12em]";
  const lineClass = deepDescenders ? "block pb-[0.3em]" : "block";
  return (
    <Tag id={id} className={className}>
      <m.span
        className="block"
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      >
        {lines.map((text, i) => (
          <span key={i} className={maskClass}>
            <m.span className={`${lineClass} ${lineClassNames[i] ?? ""}`} variants={line}>
              {text}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
