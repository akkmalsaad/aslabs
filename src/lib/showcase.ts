// Services showcase (the dark sticky-card section after the hero).
// Each service pairs with an illustrative product mockup, chosen by `mockup`.

export type ShowcaseMockup = "website" | "store" | "saas" | "booking" | "automation";

export type ShowcaseService = {
  slug: string;
  title: string;
  summary: string;
  /** Short label shown beside the number on small screens. */
  tag: string;
  includes: string;
  /** Longer copy: tightens the text spacing on short desktop screens so it doesn't crowd. */
  denseText?: boolean;
  mockup: ShowcaseMockup;
};

export const showcaseServices: ShowcaseService[] = [
  {
    slug: "websites",
    title: "Web Design for Growing Teams & Businesses",
    summary:
      "Custom websites that build trust, turn visitors into enquiries, and make content easy for your team to manage as your business grows.",
    tag: "Websites",
    includes: "Design, development, CMS",
    denseText: true,
    mockup: "website",
  },
  {
    slug: "ecommerce",
    title: "E-commerce Development",
    summary: "Online stores that make browsing, buying, and managing orders feel effortless.",
    tag: "E-commerce",
    includes: "Storefront, checkout, order admin",
    mockup: "store",
  },
  {
    slug: "saas",
    title: "SaaS & Web Systems",
    summary: "Custom platforms that bring your workflows, customers, and data together.",
    tag: "Web systems",
    includes: "Dashboards, accounts, billing",
    mockup: "saas",
  },
  {
    slug: "mobile",
    title: "Mobile App Development",
    summary: "Intuitive mobile apps built around what your users need to do.",
    tag: "Mobile apps",
    includes: "iOS and Android apps",
    mockup: "booking",
  },
  {
    slug: "automation",
    title: "Business Tools & Automation",
    summary: "Connected tools that simplify repetitive work and keep your business moving.",
    tag: "Automation",
    includes: "Internal tools, integrations, workflows",
    mockup: "automation",
  },
];

/** Where service enquiries go (the Contact section). */
export const serviceEnquiryHref = "#contact";
