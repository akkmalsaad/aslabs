// Project showcase data.
// Screens live in public/projects/<slug>/ — leave `media` undefined until real
// screenshots exist; device frames render a neutral placeholder screen instead.

export type DeviceKind = "phone" | "browser" | "panel";

export type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  statement: string;
  category: string;
  platform?: string;
  year?: string;
  /** How the product is framed in visuals. `panel` = neutral, no device chrome. */
  device: DeviceKind;
  /** Case study or live product URL; the CTA shows "coming soon" without it. */
  href?: string;
  media?: ProjectMedia;
};

export const projects: Project[] = [
  {
    slug: "bookflow",
    name: "BookFlow",
    statement:
      "Mobile-first business management for freelancers and independent professionals, so the running of the business fits in a pocket.",
    category: "Business management",
    platform: "Mobile app",
    device: "phone",
  },
  {
    slug: "ranting",
    name: "Ranting",
    statement:
      "A web-based management platform for martial arts clubs, giving the people who run them one place to keep the club organised.",
    category: "Club management",
    platform: "Web platform",
    device: "browser",
  },
  {
    slug: "nukil",
    name: "Nukil",
    statement: "A calm space for reflection and journaling, designed to make writing things down feel easy.",
    category: "Reflection & journaling",
    // TODO: set platform once confirmed.
    device: "panel",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
