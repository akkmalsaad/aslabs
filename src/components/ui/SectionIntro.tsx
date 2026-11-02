import { MaskReveal } from "@/components/motion/MaskReveal";

type SectionIntroProps = {
  eyebrow: string;
  lines: readonly string[];
  headingId: string;
  /** Use the display treatment (own leading/tracking, deep descender room) instead of the default. */
  display?: boolean;
  /** From `lg` up, stack the label over the headline and centre both instead of the margin-column offset. */
  centered?: boolean;
  /**
   * Centre the headline on the full content width (the width of the cards below) while the
   * label stays at the left edge: above the headline below `lg`, beside its first line from
   * `lg` (same grid row, so it never pushes the headline off-centre).
   */
  centerHeading?: boolean;
};

// The display treatment has its own tracking/leading at this size; the size itself is unchanged.
const headingFont = {
  default: "font-normal leading-[1.1]",
  display: "font-heading font-normal leading-[1.1] tracking-[-0.01em]",
};

const layout = {
  default: { eyebrow: "md:col-span-3 md:pt-[0.9em]", heading: "md:col-span-9" },
  centered: {
    eyebrow: "md:col-span-3 md:pt-[0.9em] lg:col-span-full lg:justify-center lg:pt-0",
    heading: "md:col-span-9 lg:col-span-full lg:text-center",
  },
  centerHeading: {
    // Explicit start: an auto-placed label would add a column rather than overlap the headline's row.
    eyebrow: "md:col-span-full lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:pt-[0.9em]",
    heading: "text-center md:col-span-full lg:row-start-1",
  },
};

// Editorial section opener: small label in the margin column, headline offset to the right.
export function SectionIntro({ eyebrow, lines, headingId, display = false, centered = false, centerHeading = false }: SectionIntroProps) {
  const align = centered ? layout.centered : centerHeading ? layout.centerHeading : layout.default;
  return (
    <div className="grid gap-y-5 md:grid-cols-12 md:gap-x-8">
      <p className={`eyebrow flex items-center gap-3 self-start ${align.eyebrow}`}>
        <span aria-hidden className="h-px w-6 bg-ignition" />
        {eyebrow}
      </p>
      <MaskReveal
        as="h2"
        id={headingId}
        lines={lines}
        deepDescenders={display}
        className={`text-headline ${display ? headingFont.display : headingFont.default} ${align.heading}`}
      />
    </div>
  );
}
