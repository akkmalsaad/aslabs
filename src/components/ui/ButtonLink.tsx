import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
};

// Colours come from the surrounding theme-light / theme-dark section.
const variants = {
  primary: "bg-fg text-bg hover:opacity-90",
  secondary: "border border-line text-fg hover:border-fg",
};

export function ButtonLink({ variant = "primary", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={`group inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-medium transition-[opacity,border-color] duration-(--dur-micro) ease-out ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-(--dur-micro) ease-out group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}
