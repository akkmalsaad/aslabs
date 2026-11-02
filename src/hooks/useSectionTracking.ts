"use client";

import { useEffect, useState, type RefObject } from "react";
import type { NavId } from "@/lib/site";

export type NavTheme = "light" | "dark";

/** Surface under the chrome when no themed section is hit (the page canvas). */
const FALLBACK_THEME: NavTheme = "light";
/**
 * Dead band around the probe point. The theme only changes once the surface
 * on both sides of the logo's centre agrees, so a boundary sitting exactly
 * under the logo can't make it flicker.
 */
const HYSTERESIS_PX = 4;
/** A section becomes "active" once its top passes this fraction of the viewport. */
const ACTIVE_PROBE = 0.4;

/** Theme of whatever is painted at (x, y), ignoring the fixed navigation itself. */
function themeAt(x: number, y: number): NavTheme | null {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest("[data-nav-chrome]")) continue;
    const themed = el.closest<HTMLElement>("[data-nav-theme]");
    return (themed?.dataset.navTheme as NavTheme | undefined) ?? FALLBACK_THEME;
  }
  return null;
}

/**
 * Reads two things from the page on scroll/resize (one rAF-throttled pass):
 * - `theme`: the `data-nav-theme` of the surface actually behind the logo's
 *   centre, measured from the logo element itself (so safe areas, responsive
 *   sizes and the compact scale are all accounted for)
 * - `active`: the last `data-nav-id` section whose top has passed 40% of the viewport
 */
export function useSectionTracking(probeRef: RefObject<HTMLElement | null>) {
  const [state, setState] = useState<{ active: NavId; theme: NavTheme }>({
    active: "home",
    theme: FALLBACK_THEME,
  });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      const probe = probeRef.current?.getBoundingClientRect();
      const x = probe ? probe.left + probe.width / 2 : 48;
      const y = probe ? probe.top + probe.height / 2 : 48;
      const above = themeAt(x, y - HYSTERESIS_PX);
      const below = themeAt(x, y + HYSTERESIS_PX);

      const anchors = document.querySelectorAll<HTMLElement>("[data-nav-id]");
      const line = window.innerHeight * ACTIVE_PROBE;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let active: NavId = "home";
      for (const el of anchors) {
        if (atBottom || el.getBoundingClientRect().top <= line) {
          active = el.dataset.navId as NavId;
        }
      }

      setState((prev) => {
        const theme = above && above === below ? above : prev.theme;
        return prev.active === active && prev.theme === theme ? prev : { active, theme };
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Mobile browser chrome collapsing/expanding resizes the visual viewport.
    window.visualViewport?.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
    };
  }, [probeRef]);

  return state;
}
