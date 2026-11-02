import { DuskHouse, Facade, Kitchen, LivingRoom } from "./photos";
import { Icon, icons } from "./shared";

// Illustrative business website: an architecture & interiors studio's home page.

const work = [
  { label: "Residential", Photo: LivingRoom },
  { label: "Kitchens", Photo: Kitchen },
  { label: "Renovation", Photo: Facade },
];

export function WebsiteMockup() {
  return (
    <div className="@container absolute inset-0 bg-[#f7f5f0] text-[#1c1b19]">
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between px-[4cqw] py-[1.8cqw]">
          <span className="flex items-center gap-[0.9cqw] text-[2.1cqw] leading-none font-semibold tracking-[-0.03em]">
            <span className="grid size-[2.2cqw] place-items-center rounded-[0.5cqw] bg-[#1c1b19]">
              <span className="h-[1cqw] w-[1cqw] rounded-t-full bg-[#f7f5f0]" />
            </span>
            Halden
          </span>
          <nav className="flex gap-[2.6cqw] text-[1.3cqw] leading-none text-[#1c1b19]/55">
            <span className="text-[#1c1b19]">Projects</span>
            <span>Studio</span>
            <span>Services</span>
            <span>Journal</span>
            <span>Contact</span>
          </nav>
          <span className="rounded-full border border-[#1c1b19]/15 px-[1.7cqw] py-[0.9cqw] text-[1.2cqw] leading-none font-medium">
            Book a consultation
          </span>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[0.9fr_1.1fr] gap-[3.4cqw] px-[4cqw] pt-[1.2cqw] pb-[3.6cqw]">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[1cqw] leading-none tracking-[0.16em] text-[#1c1b19]/50 uppercase">
              Architecture &amp; interiors
            </p>
            <p className="mt-[1.8cqw] font-display text-[4.5cqw] leading-[1.06] tracking-[-0.03em]">
              Homes shaped around the way you live.
            </p>
            <p className="mt-[1.8cqw] max-w-[31cqw] text-[1.35cqw] leading-[1.55] text-[#1c1b19]/60">
              Calm, light-filled homes and interiors, designed and delivered from first sketch to final
              fit-out.
            </p>
            <div className="mt-[2.6cqw] flex items-center gap-[2cqw]">
              <span className="flex items-center gap-[0.8cqw] rounded-full bg-[#b4552d] px-[2.2cqw] py-[1.25cqw] text-[1.35cqw] leading-none font-medium text-white shadow-[0_0.6cqw_1.6cqw_-0.6cqw_rgb(180_85_45/0.6)]">
                Book a consultation
                <Icon d={icons.arrowRight} size="1.4cqw" />
              </span>
              <span className="border-b border-[#1c1b19]/30 pb-[0.3cqw] text-[1.35cqw] leading-none font-medium">
                View projects
              </span>
            </div>
            <div className="mt-[3.4cqw] flex gap-[1.4cqw]">
              {work.map(({ label, Photo }) => (
                <div key={label} className="w-[8cqw]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[0.7cqw]">
                    <Photo />
                  </div>
                  <p className="mt-[0.8cqw] text-[1.05cqw] leading-none text-[#1c1b19]/60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.4cqw] shadow-[0_1cqw_3cqw_-1.5cqw_rgb(28_27_25/0.5)]">
            <DuskHouse />
            <div className="absolute inset-x-[2cqw] bottom-[2cqw] flex items-end justify-between">
              <span className="rounded-[0.9cqw] bg-white/90 px-[1.5cqw] py-[1.1cqw] backdrop-blur">
                <span className="block font-mono text-[0.9cqw] leading-none tracking-[0.14em] text-[#1c1b19]/50 uppercase">
                  Featured
                </span>
                <span className="mt-[0.6cqw] block text-[1.3cqw] leading-none font-medium">Hillside House</span>
              </span>
              <span className="flex gap-[0.6cqw] pb-[0.6cqw]">
                <span className="h-[0.6cqw] w-[2.4cqw] rounded-full bg-white" />
                <span className="size-[0.6cqw] rounded-full bg-white/50" />
                <span className="size-[0.6cqw] rounded-full bg-white/50" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
