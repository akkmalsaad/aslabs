import { MaskReveal } from "@/components/motion/MaskReveal";
import { ScrollFade } from "@/components/motion/ScrollFade";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PushButtonFace, PushLink } from "@/components/ui/SocialPushButton";
import { contactMarks } from "@/lib/contactMarks";
import { contact } from "@/lib/site";
import type { SocialTone } from "@/lib/socials";

// `action` is the link's accessible name.
const channels: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  action: string;
  tone: SocialTone;
  mark: string;
}[] = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    action: `Send email to ${contact.email}`,
    tone: "ink",
    mark: contactMarks.email,
  },
  {
    label: "WhatsApp",
    value: contact.whatsapp.display,
    href: contact.whatsapp.href,
    external: true,
    action: `Contact via WhatsApp at ${contact.whatsapp.display} (opens WhatsApp)`,
    tone: "ignition",
    mark: contactMarks.whatsapp,
  },
];

export function Contact() {
  return (
    <Section
      id="contact"
      theme="dark"
      navId="contact"
      aria-labelledby="contact-heading"
      className="rounded-t-(--slab-radius)"
    >
      {/* Height follows the content; the footer continues directly below. */}
      <Container className="pt-[clamp(4rem,2.75rem+5vw,7rem)] pb-[clamp(2.5rem,2rem+2vw,3.5rem)]">
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-ignition" />
          Contact
        </p>

        {/* ~36px at 390 → ~48px at 768 → 64px cap from 1280. */}
        <MaskReveal
          as="h2"
          id="contact-heading"
          lines={["Have an idea?", "Let’s build it."]}
          lineClassNames={["text-muted"]}
          className="mt-5 font-heading text-[clamp(2.25rem,1.48rem+3.15vw,4rem)] leading-[1.08] font-normal tracking-[-0.01em] sm:mt-6"
        />

        {/* The headline mask's -0.12em margin eats into this, leaving ~40–44px. */}
        <ScrollFade className="mt-11 sm:mt-12 lg:mt-[3.25rem]">
          <ul className="border-t border-line">
            {channels.map((channel) => (
              <li key={channel.label} className="border-b border-line">
                {/* The whole row is the link; pressing anywhere on it pushes the button. */}
                <PushLink
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={channel.action}
                  className="group grid touch-manipulation grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 py-5 [-webkit-tap-highlight-color:transparent] sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:gap-x-6 sm:py-6 lg:py-7"
                >
                  <span className="eyebrow col-start-1 row-start-1">{channel.label}</span>
                  {/* ~18px on phones → 26px cap on desktop. */}
                  <span className="col-start-1 row-start-2 text-[clamp(1.125rem,0.97rem+0.75vw,1.625rem)] leading-tight font-medium tracking-[-0.02em] [overflow-wrap:anywhere] sm:col-start-2 sm:row-start-1">
                    {channel.value}
                  </span>
                  {/* 52px on phones, 60px from sm: the About button (104px) scaled down whole, so its
                      travel, rings and shadows shrink with it. Negative margins keep the 44px layout
                      box of the arrow it replaced, so the rows keep their height. */}
                  <span className="col-start-2 row-span-2 row-start-1 -my-1 size-13 sm:col-start-3 sm:row-span-1 sm:-my-2 sm:size-15">
                    <PushButtonFace
                      tone={channel.tone}
                      path={channel.mark}
                      className="origin-top-left scale-50 [--push-size:6.5rem] sm:scale-[0.5769]"
                    />
                  </span>
                </PushLink>
              </li>
            ))}
          </ul>
        </ScrollFade>
        {/* Address and registration continue directly below, in the footer. */}
      </Container>
    </Section>
  );
}
