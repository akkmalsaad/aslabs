import { intro, introStyle } from "@/lib/motion";
import { tools } from "@/lib/tools";

// Identical copies of the list on the track. The loop travels half the track (three copies),
// which must stay wider than the widest container, or an empty gap shows before it wraps.
const COPIES = 6;

// Slow, constant drift (CSS: .tool-strip / .tool-track in globals.css). Pauses on hover.
// Reduced motion: only the first copy remains, as a static row that scrolls horizontally.
export function ToolStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`intro-rise min-w-0 ${className}`} style={introStyle(intro.tools)}>
      <div data-tool-strip className="tool-strip overflow-hidden py-2">
        <div data-track className="tool-track flex w-max">
          {Array.from({ length: COPIES }, (_, copy) => (
            <ul
              key={copy}
              aria-label={copy === 0 ? "Tools I build with" : undefined}
              aria-hidden={copy > 0 || undefined}
              className={`flex shrink-0 ${copy > 0 ? "motion-reduce:hidden" : ""}`}
            >
              {tools.map((tool) => (
                // Trailing padding (not gap) so every copy is the same width and the loop is exact.
                <li
                  key={tool.name}
                  className="flex items-center gap-2 pr-6 text-sm whitespace-nowrap text-muted sm:pr-8 sm:text-[0.9375rem]"
                >
                  <span aria-hidden className="grid size-5 shrink-0 place-items-center text-fg/70 sm:size-[1.375rem]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-full"
                      style={{ transform: `translateY(${tool.y ?? 0}%) scale(${tool.scale ?? 1})` }}
                    >
                      <path d={tool.path} />
                    </svg>
                  </span>
                  <span>{tool.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
