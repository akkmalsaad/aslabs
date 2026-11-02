"use client";

import { Children, useRef, useState, type ReactNode } from "react";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ProjectProgress } from "./ProjectProgress";

type ProjectStackProps = {
  /** Accessible name of the list, e.g. "Services". */
  label: string;
  /** Singular item name for the progress counter, e.g. "Service". */
  itemLabel: string;
  /** One card per child, in order. */
  children: ReactNode;
};

/**
 * Sticky stacked showcase.
 *
 * Every <li> is a full-viewport `position: sticky` slot, so each card pins at
 * the top while the next one scrolls up over it. Overall progress p (0 → 1)
 * spans the whole stack; card i is being covered while p is in
 * [i / (n-1), (i+1) / (n-1)], and recedes over exactly that range.
 */
export function ProjectStack({ label, itemLabel, children }: ProjectStackProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const cards = Children.toArray(children);
  const total = cards.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Separate, looser range for showing the progress indicator.
  const { scrollYProgress: presence } = useScroll({ target: ref, offset: ["start 0.6", "end 0.4"] });

  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setCurrent(Math.min(total - 1, Math.round(p * (total - 1)))),
  );
  useMotionValueEvent(presence, "change", (p) => setInView(p > 0 && p < 1));

  return (
    <>
      <ol ref={ref} aria-label={label}>
        {cards.map((card, i) => (
          <li key={i} className="sticky top-0 h-svh">
            <div className="container-page h-full pt-(--nav-zone) pb-(--dock-zone)">
              <StackedCard index={i} total={total} progress={scrollYProgress} reduceMotion={reduceMotion}>
                {card}
              </StackedCard>
            </div>
          </li>
        ))}
      </ol>
      <ProjectProgress current={current} total={total} visible={inView} itemLabel={itemLabel} />
    </>
  );
}

type StackedCardProps = {
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  children: ReactNode;
};

function StackedCard({ index, total, progress, reduceMotion, children }: StackedCardProps) {
  // The last card is never covered, so it keeps its resting values throughout.
  // (Ranges must stay within 0–1: Motion may hand these to the browser's ScrollTimeline.)
  const recedes = index < total - 1;
  const range = recedes ? [index / (total - 1), (index + 1) / (total - 1)] : [0, 1];
  const move = recedes && !reduceMotion;

  const scale = useTransform(progress, range, [1, move ? 0.955 : 1]);
  const y = useTransform(progress, range, [0, move ? -28 : 0]);
  const shade = useTransform(progress, range, [0, recedes ? 0.5 : 0]);

  return (
    <m.div style={{ scale, y }} className="relative h-full origin-top">
      {children}
      {/* Darkens the receding card (opacity only: cheaper than a brightness filter). */}
      <m.div
        aria-hidden
        style={{ opacity: shade }}
        className="pointer-events-none absolute inset-0 rounded-(--card-radius) bg-ink"
      />
    </m.div>
  );
}
