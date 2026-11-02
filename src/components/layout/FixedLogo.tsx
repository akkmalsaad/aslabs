"use client";

import { useState } from "react";
import Image from "next/image";
import { m, useMotionValueEvent, useScroll } from "motion/react";
import { intro, introStyle, transition } from "@/lib/motion";
import { site } from "@/lib/site";
import { useNavigation } from "./NavigationProvider";
// The brand kit's own files, used as-is. The white variant is the same artwork,
// swapped in over dark sections so the logo never disappears.
import logoOnLight from "../../../assets/logo/as-labs-stacked-black-accent.svg";
import logoOnDark from "../../../assets/logo/as-labs-stacked-white-accent.svg";

const COMPACT_AFTER_PX = 64;

// Theme crossfade: the incoming variant sits on top and fades in over the
// outgoing one, which stays fully opaque underneath and only drops out once
// the fade has finished. The mark never dips towards transparent mid-change.
const variantVisible = "z-[1] opacity-100 transition-opacity duration-(--dur-micro) ease-out";
const variantHidden = "z-0 opacity-0 transition-opacity duration-0 delay-(--dur-micro)";

export function FixedLogo() {
  const { theme, navigateTo, logoRef } = useNavigation();
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > COMPACT_AFTER_PX));

  return (
    <a
      href="#top"
      aria-label={`${site.name}, back to top`}
      onClick={(event) => {
        event.preventDefault();
        navigateTo("home");
      }}
      className="intro-rise pointer-events-auto block"
      style={introStyle(intro.logo, {
        "--intro-duration": "var(--dur-cinematic)",
        "--intro-y": "-0.5rem",
        "--intro-scale": "1.04",
        "--intro-blur": "8px",
      })}
    >
      {/* Scale lives on this wrapper only; the two variants inside never move. */}
      <m.span
        ref={logoRef}
        className="relative block w-(--logo-width) origin-top-left"
        initial={false}
        animate={{ scale: compact ? 0.9 : 1 }}
        transition={transition.ui}
      >
        {/* Both preloaded so the first switch never waits on a network request. */}
        <Image
          src={logoOnLight}
          alt=""
          unoptimized
          preload
          className={`relative block h-auto w-full ${theme === "dark" ? variantHidden : variantVisible}`}
        />
        <Image
          src={logoOnDark}
          alt=""
          unoptimized
          preload
          className={`absolute inset-0 block h-auto w-full ${theme === "dark" ? variantVisible : variantHidden}`}
        />
      </m.span>
    </a>
  );
}
