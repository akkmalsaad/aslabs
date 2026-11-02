import Image from "next/image";
import { ScrollFade } from "@/components/motion/ScrollFade";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SocialPushButton } from "@/components/ui/SocialPushButton";
import { about } from "@/lib/about";
import { site } from "@/lib/site";
import { socials } from "@/lib/socials";
import logo from "../../../assets/logo/as-labs-horizontal-black-accent.svg";

const pad = (n: number) => String(n).padStart(2, "0");

export function About() {
  return (
    <Section
      id="about"
      theme="light"
      navId="about"
      aria-labelledby="about-heading"
      className="pb-(--space-section)"
    >
      <Container>
        {/* Desktop (lg): the label sits in column 1 as a margin note and the content spans columns
            2–11, so the composition is centred with one free column either side; text 2–6,
            principles 8–11. Tablet keeps the label in columns 1–3. */}
        <div className="grid gap-y-8 border-t border-line pt-(--space-block) md:grid-cols-12 md:gap-x-8">
          <h2 id="about-heading" className="eyebrow flex items-center gap-3 self-start md:col-span-3 md:pt-[0.6em] lg:col-span-1 lg:whitespace-nowrap">
            <span aria-hidden className="h-px w-6 bg-ignition" />
            About
          </h2>

          <ScrollFade className="md:col-span-9 lg:col-span-10">
            <p className="font-heading text-[clamp(1.75rem,1.1rem+2.4vw,3.5rem)] leading-[1.12] font-normal tracking-[-0.01em]">
              {/* The artwork's base sits on the viewBox's bottom edge, so baseline alignment
                  rests it on the text baseline; 0.78em ≈ the heading face's cap height (Bevan: 0.777em). Sized inline so the
                  base `img { display: block; max-width: 100% }` reset can never win. */}
              <Image
                src={logo}
                alt={site.name}
                unoptimized
                style={{ display: "inline-block", height: "0.78em", width: "auto", maxWidth: "none", verticalAlign: "baseline" }}
              />{" "}
              {about.statement}
            </p>
          </ScrollFade>
        </div>

        <div className="mt-(--space-block) grid gap-y-12 md:grid-cols-12 md:gap-x-8">
          <ScrollFade className="flex flex-col gap-5 text-lede text-muted md:col-span-5 md:col-start-4 lg:col-start-2">
            {/* Same size and colour as the paragraphs; set apart by a little extra space. */}
            <p className="mb-3">
              {about.intro.map((segment) =>
                "strong" in segment ? (
                  <strong key={segment.text} className="font-medium">
                    {segment.text}
                  </strong>
                ) : (
                  segment.text
                ),
              )}
            </p>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </ScrollFade>

          <div className="md:col-span-3 md:col-start-10 lg:col-span-4 lg:col-start-8">
            <ul className="flex flex-col">
              {about.principles.map((principle, i) => (
                <li key={principle.title} className="border-t border-line py-5 first:border-t-0 first:pt-0 md:first:pt-1.5">
                  <ScrollFade delay={i * 0.08}>
                    <p className="font-mono text-xs text-muted">{pad(i + 1)}</p>
                    <h3 className="mt-2 font-normal">{principle.title}</h3>
                    <p className="mt-1 text-sm text-muted">{principle.body}</p>
                  </ScrollFade>
                </li>
              ))}
            </ul>

            {/* Below the principles, not one of them. The column is narrowest on tablets
                (~154px at 768), hence the smaller md size; there the row wraps (two buttons, the
                third centred below). Below 375px the gap narrows so three buttons fit; on lg the
                size eases from ~80px at 1024 to 96px at ~1175 for the same reason (with room for
                a classic scrollbar). From lg the
                block shrinks to the button row and centres in the column, heading centred over it. */}
            <ScrollFade
              delay={about.principles.length * 0.08}
              className="mt-8 flex flex-col items-center gap-5 [--push-size:5.25rem] md:mt-10 md:items-start md:[--push-size:4.375rem] lg:mx-auto lg:w-fit lg:items-center lg:[--push-size:clamp(5rem,10.5vw_-_1.7rem,6rem)] xl:[--push-size:6.5rem]"
            >
              <h3 className="eyebrow">Follow the journey</h3>
              <ul className="flex flex-wrap justify-center gap-x-[clamp(1rem,43.6vw_-_7.725rem,2.5rem)] gap-y-5 md:gap-x-3 lg:gap-x-5 xl:gap-x-6">
                {socials.map((social) => (
                  <li key={social.name}>
                    <SocialPushButton social={social} />
                  </li>
                ))}
              </ul>
            </ScrollFade>
          </div>
        </div>
      </Container>
    </Section>
  );
}
