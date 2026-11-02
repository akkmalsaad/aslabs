import { IPhoneFrame } from "@/components/ui/IPhoneFrame";
import type { ProjectMedia } from "@/lib/projects";

// Mobile app example: two real BookFlow screens (iPhone 6.9" captures, 1320×2868, the
// frame's native display ratio, so they fill the screen without cropping or bands).
// The captures include their own status bar and tab bar; the frame adds only the island.

const dashboard: ProjectMedia = {
  src: "/projects/bookflow/services-dashboard.png",
  alt: "BookFlow dashboard showing today's priority booking, a business snapshot of revenue, upcoming bookings, profit and expenses, and the reminder queue",
  width: 1320,
  height: 2868,
};

const calendar: ProjectMedia = {
  src: "/projects/bookflow/services-calendar.png",
  alt: "BookFlow booking calendar for October 2026 with booked days marked and the schedule for 20 October below",
  width: 1320,
  height: 2868,
};

// Phones render at roughly 18% of the viewport on desktop and a third of it below lg.
const sizes = "(min-width: 1024px) 18vw, 34vw";

// Body 46% of the composition wide (1000:2093); the left phone sits 6% of a phone lower.
export function BookingMockup() {
  return (
    <div className="relative aspect-[100/102.06] w-[min(100cqw,97.98cqh)]">
      <div className="absolute bottom-0 left-[2%] w-[46%]">
        <IPhoneFrame media={dashboard} sizes={sizes} className="w-full" />
      </div>
      <div className="absolute top-0 right-[2%] w-[46%]">
        <IPhoneFrame media={calendar} sizes={sizes} className="w-full" />
      </div>
    </div>
  );
}
