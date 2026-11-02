import type { ComponentPropsWithoutRef } from "react";
import type { NavId } from "@/lib/site";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  id: string;
  theme: "light" | "dark";
  /** Marks this section as a menu destination for active-section tracking. */
  navId?: NavId;
};

// Page section shell. Sets the colour theme (which the fixed logo/menu read
// through `data-nav-theme`) and, for menu destinations, makes the section
// focusable so menu navigation can move focus into it.
export function Section({ id, theme, navId, className = "", ...props }: SectionProps) {
  return (
    <section
      id={id}
      data-nav-theme={theme}
      data-nav-id={navId}
      tabIndex={navId ? -1 : undefined}
      className={`${theme === "dark" ? "theme-dark" : "theme-light"} ${className}`}
      {...props}
    />
  );
}
