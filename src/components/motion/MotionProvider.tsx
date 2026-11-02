"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

// App-wide motion setup:
// - reducedMotion="user" makes every Motion animation respect the OS setting.
// - LazyMotion + `strict` keeps the bundle small: use `m.div` (from "motion/react")
//   instead of `motion.div`. Swap `domAnimation` for `domMax` if layout/drag
//   animations are ever needed.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
