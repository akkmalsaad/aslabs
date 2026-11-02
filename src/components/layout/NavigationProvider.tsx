"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { useReducedMotion } from "motion/react";
import { useSectionTracking, type NavTheme } from "@/hooks/useSectionTracking";
import { navItems, type NavId } from "@/lib/site";

type NavigationState = {
  active: NavId;
  theme: NavTheme;
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: (restoreFocus?: boolean) => void;
  navigateTo: (id: NavId) => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  /** The fixed logo; the surface behind its centre sets `theme`. */
  logoRef: RefObject<HTMLElement | null>;
};

const NavigationContext = createContext<NavigationState | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const logoRef = useRef<HTMLElement>(null);
  const { active, theme } = useSectionTracking(logoRef);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  const navigateTo = useCallback(
    (id: NavId) => {
      setMenuOpen(false);
      const target = navItems.find((item) => item.id === id)?.target;
      const el = target ? document.getElementById(target) : null;
      if (!el) return;
      el.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" });
      // Move focus with the scroll so keyboard and screen reader users land in the section.
      el.focus({ preventScroll: true });
    },
    [reduceMotion],
  );

  // While open: Escape closes (and returns focus), clicking outside closes.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };
    const onPointer = (event: PointerEvent) => {
      if (!(event.target as Element | null)?.closest("[data-menu-root]")) closeMenu();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen, closeMenu]);

  const value = useMemo(
    () => ({ active, theme, menuOpen, toggleMenu, closeMenu, navigateTo, menuButtonRef, logoRef }),
    [active, theme, menuOpen, toggleMenu, closeMenu, navigateTo],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNavigation must be used inside <NavigationProvider>");
  return context;
}
