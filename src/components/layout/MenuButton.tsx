"use client";

import { m } from "motion/react";
import { intro, introStyle, transition } from "@/lib/motion";
import { useNavigation } from "./NavigationProvider";

// Two parallel strokes that converge and cross into a close icon.
const strokes = [
  { closed: { y: -3.5, rotate: 0 }, open: { y: 0, rotate: 45 } },
  { closed: { y: 3.5, rotate: 0 }, open: { y: 0, rotate: -45 } },
];

export function MenuButton() {
  const { menuOpen, toggleMenu, theme, menuButtonRef } = useNavigation();

  const tone =
    theme === "dark"
      ? "text-paper border-white/15 bg-ink/40 hover:bg-white/10"
      : "text-ink border-ink/10 bg-canvas/60 hover:bg-ink/5";

  return (
    <button
      ref={menuButtonRef}
      type="button"
      data-menu-root
      aria-expanded={menuOpen}
      aria-controls="site-navigation"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      onClick={toggleMenu}
      className={`intro-rise pointer-events-auto relative grid size-11 place-items-center rounded-full border backdrop-blur-md transition-colors duration-(--dur-micro) ease-out sm:size-12 ${tone}`}
      style={introStyle(intro.menu, { "--intro-y": "-0.5rem" })}
    >
      {strokes.map((stroke, i) => (
        <m.span
          key={i}
          aria-hidden
          className="absolute h-[1.5px] w-[1.125rem] rounded-full bg-current"
          initial={false}
          animate={menuOpen ? stroke.open : stroke.closed}
          transition={transition.micro}
        />
      ))}
    </button>
  );
}
