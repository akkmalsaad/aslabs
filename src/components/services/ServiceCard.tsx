import Image from "next/image";
import { PushPill } from "@/components/ui/SocialPushButton";
import { serviceEnquiryHref, type ShowcaseService } from "@/lib/showcase";
import automationPreview from "../../../assets/automation-preview.png";
import storePreview from "../../../assets/ecommerce preview.png";
import saasPreview from "../../../assets/SaaS preview.png";
import websitePreview from "../../../assets/services preview.png";
import { BookingMockup } from "./mockups/BookingMockup";

type ServiceCardProps = {
  service: ShowcaseService;
  index: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

// The website is a photo of a MacBook filling the panel, the store, SaaS and automation
// cards are photos of their devices, and the booking app brings its own phones.

// Same layout and treatment as the project card it replaces; the visual panel holds an
// illustrative interface instead of a project screenshot. Presentational only: the
// sticky/recede behaviour lives in ProjectStack.
export function ServiceCard({ service, index }: ServiceCardProps) {
  const headingId = `service-${service.slug}-heading`;
  const details = [{ term: "Includes", value: service.includes }];
  const fullBleed = service.mockup === "website";
  const storePhoto = service.mockup === "store";
  const saasPhoto = service.mockup === "saas";
  const automationPhoto = service.mockup === "automation";
  // Short desktop screens (≥1024 wide, ≤800 tall) only; written out in full for Tailwind.
  const dense = service.denseText;

  return (
    <article
      aria-labelledby={headingId}
      className="grid h-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-(--card-radius) border border-white/[0.08] bg-graphite lg:grid-cols-12 lg:grid-rows-1"
    >
      <div className="flex flex-col gap-5 p-5 sm:gap-6 sm:p-8 lg:col-span-5 lg:justify-between lg:p-12 xl:p-14">
        <div className="eyebrow flex items-center justify-between gap-4">
          <span>{pad(index + 1)}</span>
          <span className="lg:hidden">{service.tag}</span>
        </div>

        <div
          className={`flex flex-col gap-4 sm:gap-5 ${dense ? "[@media(min-width:1024px)_and_(max-height:800px)]:gap-3.5" : ""}`}
        >
          <h3 id={headingId} className="font-heading text-title leading-[1.1] font-normal tracking-[-0.01em]">
            {service.title}
          </h3>
          <p className="max-w-md text-muted sm:text-lg sm:leading-relaxed">{service.summary}</p>

          <dl
            className={`mt-2 hidden gap-x-6 gap-y-4 border-t border-line pt-6 text-sm lg:grid grid-cols-1 ${
              dense ? "[@media(min-width:1024px)_and_(max-height:800px)]:mt-0 [@media(min-width:1024px)_and_(max-height:800px)]:pt-4" : ""
            }`}
          >
            {details.map((d) => (
              <div key={d.term}>
                <dt className="eyebrow mb-1.5">{d.term}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className={`mt-1 sm:mt-3 ${dense ? "[@media(min-width:1024px)_and_(max-height:800px)]:mt-0" : ""}`}>
            <PushPill href={serviceEnquiryHref} className="h-11 text-sm font-medium">
              Discuss your project
              <span aria-hidden className="transition-transform duration-(--dur-micro) ease-out group-hover:translate-x-0.5">
                →
              </span>
            </PushPill>
          </div>
        </div>
      </div>

      <div className="relative border-t border-line bg-white/[0.025] lg:col-span-7 lg:border-t-0 lg:border-l">
        <p
          className={`pointer-events-none absolute top-4 left-5 z-10 font-mono text-[0.625rem] leading-none tracking-[0.14em] uppercase sm:top-5 sm:left-6 lg:top-7 lg:left-8 ${
            fullBleed ? "text-ink/45" : storePhoto ? "text-ink/60" : "text-subtle"
          }`}
        >
          Example interface
        </p>
        {/* The photo already includes the laptop, room and shadows: no device frame. Mockups
            below are decorative; the service is described in the text panel. */}
        {fullBleed ? (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={websitePreview}
              alt="MacBook on a desk showing an example architecture studio website"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="size-full object-cover object-center"
            />
          </div>
        ) : storePhoto ? (
          // Contained so all three devices stay whole; the backdrop runs from the photo's wall
          // (top edge) to its stone counter (bottom edge) so any leftover bands blend in.
          <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#b2a594,#cbb6a2)]">
            <Image
              src={storePreview}
              alt="MIRA skincare store with responsive layouts displayed on a MacBook, iPad, and iPhone."
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="size-full object-contain object-center"
            />
          </div>
        ) : saasPhoto ? (
          // Contained so the whole dashboard stays visible; the backdrop follows the photo's top
          // edge (lighter charcoal at the left, near-black at the right) so leftover bands blend in.
          // On phones the panel can be as wide as the photo, so the top strip is kept for the label.
          <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(90deg,#303134,#17181a)] pt-10 sm:pt-0">
            <Image
              src={saasPreview}
              alt="Kanso business dashboard showing revenue, invoices, and recent activity on a MacBook."
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="size-full object-contain object-center"
            />
          </div>
        ) : automationPhoto ? (
          // Contained so the laptop and dashboard stay whole; the backdrop matches the photo's
          // charcoal edges so any leftover bands blend in. On short phones the panel is wider than
          // the photo, so the top strip is kept for the label.
          <div className="absolute inset-0 overflow-hidden bg-[#434140] pt-10 sm:pt-0">
            <Image
              src={automationPreview}
              alt="Relay business automation dashboard on a MacBook, showing incoming requests, connected services, and workflow activity."
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="size-full object-contain object-center"
            />
          </div>
        ) : (
          <div aria-hidden className="absolute inset-[8%_10%] grid place-items-center [container-type:size] lg:inset-[10%]">
            <BookingMockup />
          </div>
        )}
      </div>
    </article>
  );
}
