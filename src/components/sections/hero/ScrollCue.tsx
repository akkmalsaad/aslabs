"use client";

import { m, useScroll, useTransform } from "motion/react";
import { intro, introStyle } from "@/lib/motion";

// Fades away as soon as the visitor has clearly started scrolling.
export function ScrollCue() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <div className="intro-rise" style={introStyle(intro.cue)}>
      <m.a href="#work" style={{ opacity }} className="eyebrow inline-flex items-center gap-4 py-2 hover:text-fg">
        <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-line">
          <span className="cue-travel absolute inset-x-0 top-0 h-1/3 bg-fg" />
        </span>
        Scroll
      </m.a>
    </div>
  );
}
