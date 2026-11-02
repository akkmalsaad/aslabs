import type { ReactNode } from "react";
import Image from "next/image";
import type { DeviceKind, ProjectMedia } from "@/lib/projects";

type DeviceFrameProps = {
  kind: DeviceKind;
  /** Shown on the placeholder screen until real media exists. */
  label: string;
  media?: ProjectMedia;
  /** Responsive hint for next/image. */
  sizes?: string;
  /** Sizing (width); the frame keeps its own aspect ratio. */
  className?: string;
  /** Custom screen content (absolutely positioned), shown instead of media or the placeholder. */
  children?: ReactNode;
};

// All proportions are relative (%, cqw) so a frame looks identical at any size.
const shell: Record<DeviceKind, string> = {
  phone: "aspect-[9/19.5] rounded-[17%/7.85%] bg-ink p-[3.2%]",
  browser: "flex aspect-[16/10.6] flex-col rounded-[1.6%/2.4%] bg-paper ring-1 ring-ink/10",
  panel: "aspect-[4/5] rounded-[7%/5.6%] bg-paper p-[3.5%] ring-1 ring-ink/10",
};

const screen: Record<DeviceKind, string> = {
  phone: "h-full rounded-[14%/6.5%]",
  browser: "flex-1",
  panel: "h-full rounded-[4.5%/3.6%]",
};

const labelSize: Record<DeviceKind, string> = {
  phone: "text-[12cqw]",
  browser: "text-[5.5cqw]",
  panel: "text-[10cqw]",
};

export function DeviceFrame({ kind, label, media, sizes = "50vw", className = "", children }: DeviceFrameProps) {
  return (
    <div className={`relative shadow-device ${shell[kind]} ${className}`}>
      {kind === "browser" && (
        <div aria-hidden className="flex aspect-[100/5.5] w-full shrink-0 items-center gap-[0.9%] border-b border-ink/[0.06] px-[2%]">
          <span className="aspect-square w-[1%] rounded-full bg-ink/15" />
          <span className="aspect-square w-[1%] rounded-full bg-ink/15" />
          <span className="aspect-square w-[1%] rounded-full bg-ink/15" />
          <span className="mx-auto h-[42%] w-[30%] rounded-full bg-ink/[0.05]" />
        </div>
      )}

      <div className={`relative overflow-hidden ${screen[kind]}`}>
        {children ? (
          children
        ) : media ? (
          <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover object-top" />
        ) : (
          <div
            aria-hidden
            className="@container absolute inset-0 grid place-items-center bg-[linear-gradient(165deg,#f8f8f5_0%,#e8e8e3_100%)] text-ink"
          >
            <span className={`font-semibold tracking-[-0.04em] ${labelSize[kind]}`}>{label}</span>
          </div>
        )}
        {kind === "phone" && (
          <span aria-hidden className="absolute top-[2.2%] left-1/2 h-[2.6%] w-[30%] -translate-x-1/2 rounded-full bg-ink" />
        )}
      </div>
    </div>
  );
}
