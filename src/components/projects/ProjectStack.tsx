"use client";

import { Children, createRef, useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
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
 * Every <li> is an at-least-full-viewport `position: sticky` slot, so each card
 * pins while the next one scrolls up over it. A card taller than the screen
 * (long content on short viewports) scrolls until its bottom is in view and
 * pins there instead (`--slot-h` feeds its sticky `top`). Card i recedes while
 * slot i+1 travels from the bottom of the viewport to the top, whatever the
 * slot heights.
 */
export function ProjectStack({ label, itemLabel, children }: ProjectStackProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const cards = Children.toArray(children);
  const total = cards.length;
  // One ref per slot, made once (the card list is static).
  const [slots] = useState(() => cards.map(() => createRef<HTMLLIElement>()));

  // Separate, looser range for showing the progress indicator.
  const { scrollYProgress: presence } = useScroll({ target: ref, offset: ["start 0.6", "end 0.4"] });

  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState(false);
  // A card counts as passed once the next one has covered half of it.
  const onCover = useCallback(
    (index: number, passed: boolean) => setCurrent((c) => (passed ? Math.max(c, index + 1) : Math.min(c, index))),
    [],
  );
  useMotionValueEvent(presence, "change", (p) => setInView(p > 0 && p < 1));

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        (entry.target as HTMLElement).style.setProperty("--slot-h", `${entry.borderBoxSize[0].blockSize}px`);
      }
    });
    for (const slot of slots) if (slot.current) observer.observe(slot.current);
    return () => observer.disconnect();
  }, [slots]);

  return (
    <>
      <ol ref={ref} aria-label={label}>
        {cards.map((card, i) => (
          <li
            key={i}
            ref={slots[i]}
            className="sticky top-[min(0px,calc(100svh_-_var(--slot-h,100svh)))] flex min-h-svh flex-col"
          >
            <div className="container-page flex flex-1 flex-col pt-(--nav-zone) pb-(--dock-zone)">
              <StackedCard
                index={i}
                coveredBy={slots[i + 1]}
                reduceMotion={reduceMotion}
                onCover={onCover}
              >
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
  /** The next slot; absent for the last card, which is never covered. */
  coveredBy?: RefObject<HTMLLIElement | null>;
  reduceMotion: boolean;
  onCover: (index: number, passed: boolean) => void;
  children: ReactNode;
};

function StackedCard({ index, coveredBy, reduceMotion, onCover, children }: StackedCardProps) {
  // The last card is never covered, so it keeps its resting values throughout.
  const recedes = coveredBy !== undefined;
  const move = recedes && !reduceMotion;

  // 0 as the next slot's top enters at the bottom of the viewport, 1 as it reaches the top.
  const { scrollYProgress: cover } = useScroll({ target: coveredBy, offset: ["start end", "start start"] });
  useMotionValueEvent(cover, "change", (p) => {
    if (recedes) onCover(index, p >= 0.5);
  });

  const scale = useTransform(cover, [0, 1], [1, move ? 0.955 : 1]);
  const y = useTransform(cover, [0, 1], [0, move ? -28 : 0]);
  // A function keeps opacity on the JS path with scale and y: Motion would otherwise hand it to
  // a browser ViewTimeline, which mis-measures the sticky slot it tracks.
  const shade = useTransform(cover, (p) => (recedes ? p * 0.5 : 0));

  return (
    <m.div style={{ scale, y }} className="relative flex flex-1 origin-top flex-col">
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
