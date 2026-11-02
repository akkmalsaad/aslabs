"use client";

import { AnimatePresence, m, type Variants } from "motion/react";
import { duration, ease, stagger, transition } from "@/lib/motion";
import { navItems } from "@/lib/site";
import { useNavigation } from "./NavigationProvider";

const panel: Variants = {
  closed: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    filter: "blur(6px)",
    transition: { duration: duration.micro, ease: ease.inOut },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { ...transition.ui, staggerChildren: stagger, delayChildren: 0.06 },
  },
};

const item: Variants = {
  closed: { opacity: 0, y: 6 },
  open: { opacity: 1, y: 0, transition: transition.ui },
};

export function FloatingNavigation() {
  const { menuOpen, active, navigateTo } = useNavigation();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-(--edge-bottom) z-50 flex justify-center px-4">
      <AnimatePresence>
        {menuOpen && (
          <m.nav
            key="site-navigation"
            id="site-navigation"
            aria-label="Primary"
            data-menu-root
            className="pointer-events-auto rounded-full border border-white/10 bg-graphite/85 p-1.5 text-paper shadow-float backdrop-blur-xl"
            variants={panel}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="flex items-center">
              {navItems.map((navItem) => {
                const isActive = active === navItem.id;
                return (
                  <m.li key={navItem.id} variants={item}>
                    <a
                      href={`#${navItem.target}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        navigateTo(navItem.id);
                      }}
                      className={`relative flex h-11 items-center rounded-full px-3.5 font-mono max-[359px]:px-3 text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-300 ease-out sm:px-5 sm:text-xs ${isActive ? "text-paper" : "text-white/55 hover:text-paper"}`}
                    >
                      {navItem.label}
                      <span
                        aria-hidden
                        className={`absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-ignition transition-[opacity,scale] duration-300 ease-out ${isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                      />
                    </a>
                  </m.li>
                );
              })}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
