"use client";

import { AnimatePresence, m } from "motion/react";
import { useNavigation } from "@/components/layout/NavigationProvider";
import { duration, ease, transition } from "@/lib/motion";

type ProjectProgressProps = {
  current: number;
  total: number;
  visible: boolean;
  /** Singular item name for screen readers, e.g. "Service". */
  itemLabel: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

// "01 / 03" counter docked bottom-centre while the stack is on screen.
// Lifts out of the way when the floating navigation opens beneath it.
export function ProjectProgress({ current, total, visible, itemLabel }: ProjectProgressProps) {
  const { menuOpen } = useNavigation();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-(--edge-bottom) z-40 flex justify-center">
      <AnimatePresence>
        {visible && (
          <m.div
            key="progress"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: menuOpen ? -64 : 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, filter: "blur(4px)", transition: { duration: duration.micro, ease: ease.inOut } }}
            transition={transition.ui}
            className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-graphite/80 px-4 font-mono text-[0.6875rem] tracking-[0.14em] text-white/55 shadow-float backdrop-blur-xl"
          >
            <span className="sr-only">
              {itemLabel} {current + 1} of {total}
            </span>
            <span aria-hidden className="inline-grid overflow-hidden text-paper">
              <AnimatePresence initial={false}>
                <m.span
                  key={current}
                  className="[grid-area:1/1]"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={transition.ui}
                >
                  {pad(current + 1)}
                </m.span>
              </AnimatePresence>
            </span>
            <span aria-hidden>/</span>
            <span aria-hidden>{pad(total)}</span>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
