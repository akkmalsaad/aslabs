"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { IPhoneFrame } from "@/components/ui/IPhoneFrame";
import { intro, introStyle, spring } from "@/lib/motion";
import { getProject, type ProjectMedia } from "@/lib/projects";
import storePreview from "../../../../assets/ecommerce-hero-transparent.png";
import ipadPreview from "../../../../assets/new ipad hero preview.png";

// Hero-only BookFlow screen (iPhone 6.9" capture); the Selected Work card is unaffected.
const bookflowScreen: ProjectMedia = {
  src: "/projects/bookflow/hero-dashboard.png",
  alt: "BookFlow dashboard",
  width: 1320,
  height: 2868,
};

// Layered composition inside a 5:4 box. Positions are % of the box.
// depth: 0 = far (moves least) … 1 = near (moves most).
// A layer with `screen` renders as a real iPhone with that capture; one with `photo` renders that
// image on its own (transparent PNG that already includes its devices, so no frame).
const layers = [
  {
    slug: "ranting",
    // Low enough that the store's own iPhone stays hidden behind BookFlow, parallax included.
    position: "top-[4%] left-[8%] w-[80%]",
    depth: 0.35,
    rotate: 0,
    introRotate: -2,
    photo: {
      src: storePreview,
      alt: "MIRA skincare store with responsive layouts displayed on a MacBook, iPad, and iPhone.",
      sizes: "(min-width: 1024px) 30vw, 70vw",
      className: "h-auto w-full",
    },
  },
  {
    slug: "nukil",
    // Same bottom-left anchor and height as the 4:5 panel it replaced (32% wide); the iPad is
    // narrower (996×1321 device in a 1086×1448 PNG), so 30.16% wide.
    position: "bottom-[5%] left-0 w-[30.16%]",
    depth: 0.65,
    rotate: -3,
    introRotate: -6,
    photo: {
      src: ipadPreview,
      alt: "Relay business automation dashboard displayed on a black iPad Pro.",
      sizes: "(min-width: 1024px) 15vw, 35vw",
      // Bleeds the PNG's transparent margins (46/44/76/51 px) so the device itself lands on the
      // old panel's box. Percent margins resolve against the width (996 px).
      className: "mt-[-7.63%] mb-[-5.12%] ml-[-4.62%] h-auto w-[109.04%] max-w-none",
    },
  },
  {
    slug: "bookflow",
    position: "right-[4%] bottom-0 w-[28%]",
    depth: 1,
    rotate: 2.5,
    introRotate: 6,
    screen: bookflowScreen,
  },
] as const;

// Hero-only: a tight contact shadow in place of the iPhone frame's wide shadow-device, whose
// 120px blur stacked into a gray haze behind the overlapping devices.
const contactShadow = "shadow-[0_1px_2px_rgb(11_13_18/0.08),0_8px_16px_-8px_rgb(11_13_18/0.22)]!";

/** Max pointer drift for the nearest layer, px. */
const POINTER_RANGE = 8;
/** Max scroll drift for the nearest layer as the hero leaves, px. */
const SCROLL_RANGE = 90;

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // Pointer position normalised to -1…1, smoothed. Fine pointers only.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, spring.follow);
  const smoothY = useSpring(pointerY, spring.follow);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, pointerX, pointerY]);

  // 0 → 1 while the composition scrolls out of view.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  return (
    <div ref={ref} aria-hidden className="relative aspect-[5/4] w-full">
      {layers.map((layer, i) => {
        const project = getProject(layer.slug);
        if (!project) return null;
        return (
          <div key={layer.slug} className={`absolute ${layer.position}`} style={{ zIndex: i }}>
            <div
              className="intro-visual"
              style={introStyle(intro.visuals[i], { "--intro-rotate": `${layer.introRotate}deg` })}
            >
              <ParallaxLayer
                depth={layer.depth}
                pointerX={smoothX}
                pointerY={smoothY}
                scroll={scrollYProgress}
                disabled={reduceMotion}
              >
                <div style={{ rotate: `${layer.rotate}deg` }}>
                  {"photo" in layer ? (
                    // Intrinsic ratio, nothing cropped.
                    <Image
                      src={layer.photo.src}
                      alt={layer.photo.alt}
                      sizes={layer.photo.sizes}
                      loading="eager"
                      className={`object-contain ${layer.photo.className}`}
                    />
                  ) : (
                    <IPhoneFrame media={layer.screen} sizes="(min-width: 1024px) 12vw, 28vw" eager className={`w-full ${contactShadow}`} />
                  )}
                </div>
              </ParallaxLayer>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type ParallaxLayerProps = {
  depth: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scroll: MotionValue<number>;
  disabled: boolean;
  children: ReactNode;
};

function ParallaxLayer({ depth, pointerX, pointerY, scroll, disabled, children }: ParallaxLayerProps) {
  const x = useTransform(pointerX, (v) => (disabled ? 0 : -v * POINTER_RANGE * depth));
  const y = useTransform([pointerY, scroll], ([p, s]: number[]) =>
    disabled ? 0 : -p * POINTER_RANGE * depth - s * SCROLL_RANGE * depth,
  );
  return <m.div style={{ x, y }}>{children}</m.div>;
}
