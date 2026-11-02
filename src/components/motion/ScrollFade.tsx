"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { transition } from "@/lib/motion";

type ScrollFadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Travel distance in px; keep small. */
  y?: number;
};

// Quiet entrance for supporting content: rises a little and fades in, once.
export function ScrollFade({ children, className, delay = 0, y = 20 }: ScrollFadeProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ ...transition.ui, delay }}
    >
      {children}
    </m.div>
  );
}
