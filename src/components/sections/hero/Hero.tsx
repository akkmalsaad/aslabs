import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PushPill } from "@/components/ui/SocialPushButton";
import { hero } from "@/lib/site";
import { headlineIntro, intro, introStyle } from "@/lib/motion";
import { HeroVisual } from "./HeroVisual";
import { ScrollCue } from "./ScrollCue";
import { ToolStrip } from "./ToolStrip";

// Headline split into words of characters for the reveal. `index` runs across both lines,
// so the stagger carries on from the first line into the second.
const headlineLines = (() => {
  let index = 0;
  return hero.headline.map((line) =>
    line.split(" ").map((word) => Array.from(word, (char) => ({ char, index: index++ }))),
  );
})();

// Same arrow and hover nudge as the ButtonLink these CTAs used.
function CtaArrow() {
  return (
    <span aria-hidden className="transition-transform duration-(--dur-micro) ease-out group-hover:translate-x-0.5">
      →
    </span>
  );
}

// First-load sequence (CSS, timed by `intro` in lib/motion.ts):
// logo → menu → eyebrow → visuals → actions → tools → scroll cue; the headline reveals
// character by character as soon as the hero's own entrances finish (`headlineIntro`).
export function Hero() {
  return (
    <Section
      id="top"
      theme="light"
      navId="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col"
    >
      <Container className="grid flex-1 content-center gap-y-14 pt-[calc(var(--nav-zone)+1.5rem)] pb-6 md:gap-y-16 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:pt-(--nav-zone)">
        {/* Desktop: the copy sits slightly above centre to balance the visual. Offset (not a
            transform) so the children's intro animations are untouched; eases to 0 on short
            laptop screens (720px tall) to keep clear of the fixed logo, full 3rem from 840px. */}
        <div className="flex flex-col lg:relative lg:col-span-7 lg:-top-[clamp(0rem,(100svh_-_45rem)_*_0.4,3rem)]">
          <p className="eyebrow intro-rise flex items-center gap-3" style={introStyle(intro.eyebrow)}>
            <span aria-hidden className="h-px w-6 bg-ignition" />
            {hero.eyebrow}
          </p>

          {/* Bevan (Regular 400 is its only, true weight: no synthetic bold). Sizes keep the longer
              line ("digital products.", ~9.17em at −0.01em) inside its column with ~3% to spare, so
              it stays two lines without overflow: ~91% of the viewport on phones and tablets, and
              on lg ~536px at 1024 → 780px cap. Leading clears the `g` in "design" over the `d`/`l`
              of "digital". Characters are inline-blocks so they can rise; each word is kept
              unbreakable so wrapping still happens only between words.
              Screen readers get the plain text, not the split copy. */}
          <h1
            id="hero-heading"
            className="mt-6 font-heading text-[min(9.5vw,6.5rem)] leading-[1.2] font-normal tracking-[-0.01em] sm:mt-8 lg:text-[clamp(3.25rem,6vw_-_6px,5.125rem)]"
          >
            <span className="sr-only">{hero.headline.join(" ")}</span>
            {headlineLines.map((words, i) => (
              <span key={hero.headline[i]} aria-hidden className="block">
                {words.map((chars, w) => (
                  <Fragment key={w}>
                    {w > 0 && " "}
                    <span className="whitespace-nowrap">
                      {chars.map(({ char, index }) => (
                        <span
                          key={index}
                          className="intro-char"
                          style={introStyle(headlineIntro.start + index * headlineIntro.charStagger)}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </Fragment>
                ))}
              </span>
            ))}
          </h1>

          <div className="intro-rise mt-8 flex flex-wrap gap-3 sm:mt-10" style={introStyle(intro.actions)}>
            {/* Push pills at the old 48px buttons' size: 6px housing + cap padding = the old
                px-6 (and the secondary's 1px border). */}
            <PushPill href={hero.primaryCta.href} tone="ink" className="h-12 text-sm font-medium" capClassName="px-[18px]">
              {hero.primaryCta.label}
              <CtaArrow />
            </PushPill>
            <PushPill href={hero.secondaryCta.href} className="h-12 text-sm font-medium" capClassName="px-[19px]">
              {hero.secondaryCta.label}
              <CtaArrow />
            </PushPill>
          </div>
        </div>

        <div className="w-full max-w-[36rem] justify-self-end md:w-[82%] lg:col-span-5 lg:w-full lg:max-w-none">
          <HeroVisual />
        </div>

        {/* Full-width last row, centred with the content so it stays close; the negative
            margin trims the grid's row gap to a modest one. */}
        <ToolStrip className="-mt-8 md:-mt-10 lg:col-span-12" />
      </Container>

      <Container className="pb-[calc(var(--edge-bottom)+0.5rem)]">
        <ScrollCue />
      </Container>
    </Section>
  );
}
