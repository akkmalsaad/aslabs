// Small building blocks shared by the service mockups. Mockup screens are sized in cqw
// (the screen's width), so they scale with whatever frame holds them.

/** Stroke icon on a 24×24 grid; `d` may hold several subpaths. */
export function Icon({ d, size, className = "" }: { d: string; size: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <path d={d} />
    </svg>
  );
}

export const icons = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
} as const;
