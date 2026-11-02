import type { ReactNode } from "react";
import Image from "next/image";
import type { ProjectMedia } from "@/lib/projects";

type IPhoneFrameProps = {
  /** Full-screen capture at the device's native ratio (e.g. 1320×2868 for a 6.9" iPhone). */
  media?: ProjectMedia;
  /** Custom screen content (absolutely positioned), shown instead of media. */
  children?: ReactNode;
  /** Responsive hint for next/image. */
  sizes?: string;
  /** Load immediately (above-the-fold use). */
  eager?: boolean;
  /** Sizing (width); the frame keeps its own aspect ratio. */
  className?: string;
};

// Modern iPhone (6.9" Pro Max) mockup. All geometry is relative to the body width W, so the
// frame looks identical at any size:
//   band 0.9%W + black bezel 2.5% → display inset ≈ 3.4%W on every side;
//   display 1320:2868 (native capture ratio, so the screenshot fits without cropping);
//   body ≈ 1 : 2.093; display corner radius ≈ 14% of display width (62pt on a 440pt screen),
//   outer radii = display radius + inset. Dynamic Island 126×37pt, 11pt from the top.
// Percent radii are written horizontal/vertical because each axis resolves against its own side.
export function IPhoneFrame({ media, children, sizes = "30vw", eager = false, className = "" }: IPhoneFrameProps) {
  return (
    <div
      className={`relative aspect-[1000/2093] rounded-[16.5%/7.88%] bg-[linear-gradient(150deg,#3b3e45_0%,#15171c_24%,#0b0d12_60%,#25282e_100%)] p-[0.9%] shadow-device ${className}`}
    >
      {/* Black glass bezel. */}
      <div className="h-full rounded-[15.9%/7.52%] bg-black p-[2.5%] inset-ring-1 inset-ring-white/[0.06]">
        {/* Display: clips the capture to the screen's rounded corners. */}
        <div className="relative h-full overflow-hidden rounded-[14.1%/6.47%] bg-black">
          {children ??
            (media && (
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes={sizes}
                loading={eager ? "eager" : undefined}
                className="object-cover object-top"
              />
            ))}
          <span
            aria-hidden
            className="absolute top-[1.15%] left-1/2 aspect-[126/37] w-[28.6%] -translate-x-1/2 rounded-full bg-black"
          />
        </div>
      </div>
    </div>
  );
}
