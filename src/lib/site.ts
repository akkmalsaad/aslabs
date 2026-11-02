// Site-wide content and configuration.
// Copy lives here (not in components) so sections stay presentational.

export const site = {
  name: "Akkmal Saad Labs",
  shortName: "AS Labs",
  description: "Apps, web systems and tools built from idea to launch.",
  // Set NEXT_PUBLIC_SITE_URL in production so OG/canonical URLs are absolute.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

// Hex values for places CSS variables can't reach (SVG fill attributes, meta tags).
export const brandColors = {
  ink: "#0B0D12",
  paper: "#FFFFFF",
  ignition: "#FF4A1C",
  canvas: "#F3F3EF",
} as const;

export const contact = {
  email: "akkmal@aslabs.my",
  whatsapp: {
    display: "017-238 0450",
    // Malaysian mobile 017-238 0450 → +60 17-238 0450 (country code, drop leading 0)
    href: "https://wa.me/60172380450",
  },
  address: [
    "A-15-3A HON City Garden Commercial Centre,",
    "Jalan Nirwana, Taman Nirwana,",
    "68000 Ampang, Selangor.",
  ],
  registration: "TR0350853-T",
} as const;

export type NavId = "home" | "work" | "about" | "contact";

// `target` is the id of the section each item scrolls to.
export const navItems: readonly { id: NavId; label: string; target: string }[] = [
  { id: "home", label: "Home", target: "top" },
  { id: "work", label: "Services", target: "work" },
  { id: "about", label: "About", target: "about" },
  { id: "contact", label: "Contact", target: "contact" },
];

export const hero = {
  eyebrow: site.name,
  // One entry per visual line, so the intro can reveal them line by line.
  headline: ["I design & build", "digital products."],
  primaryCta: { label: "My Services", href: "#work" },
  secondaryCta: { label: "Let’s work together", href: "#contact" },
} as const;
