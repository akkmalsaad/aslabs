// Services showcase (the dark sticky-card section after the hero).
// Each service pairs with an illustrative product mockup, chosen by `mockup`.

export type ShowcaseMockup = "website" | "store" | "saas" | "booking" | "automation";

export type ShowcaseService = {
  slug: string;
  title: string;
  summary: string;
  /** Short label shown beside the number on small screens. */
  tag: string;
  /** Deliverables in project order; build with `included()` so every card carries the shared commitments. */
  includes: string[];
  /** Longer copy: tightens the text spacing on short desktop screens so it doesn't crowd. */
  denseText?: boolean;
  mockup: ShowcaseMockup;
};

/** One-line summary under the Services heading; also the plain-language service list for search. */
export const servicesIntro =
  "Websites, online stores, custom web systems, mobile apps and business tools for businesses in Malaysia, designed and built end to end.";

/** Shared commitments around each service's own deliverables, in the order a project runs. */
const included = (...specific: string[]) => [
  "Project consultation & scope planning",
  "Custom design & development",
  ...specific,
  "3 design revision rounds",
  "Testing & quality checks",
  "Launch assistance",
  "Handover walkthrough",
  "30-day bug-fix support",
];

/** Shown once beneath the cards: what the inclusions do and don't cover. */
export const inclusionsNote =
  "Inclusions are confirmed in your project proposal. Three design revision rounds cover consolidated feedback within the agreed scope. Bug-fix support covers defects in delivered functionality for 30 days after launch. New features, ongoing maintenance, hosting, domains, and third-party fees are quoted separately.";

export const showcaseServices: ShowcaseService[] = [
  {
    slug: "websites",
    title: "Web Design for Growing Teams & Businesses",
    summary:
      "Custom websites that build trust, turn visitors into enquiries, and make content easy for your team to manage as your business grows.",
    tag: "Websites",
    includes: included("Mobile-responsive layouts", "Content management setup", "Basic technical SEO"),
    denseText: true,
    mockup: "website",
  },
  {
    slug: "ecommerce",
    title: "E-commerce Development",
    summary: "Online stores that make browsing, buying, and managing orders feel effortless.",
    tag: "E-commerce",
    includes: included(
      "Responsive storefront",
      "Product & order management",
      "Payment gateway integration",
      "Basic technical SEO",
    ),
    mockup: "store",
  },
  {
    slug: "saas",
    title: "SaaS & Web Systems",
    summary: "Custom platforms that bring your workflows, customers, and data together.",
    tag: "Web systems",
    includes: included(
      "Responsive interface",
      "Agreed workflow implementation",
      "User roles & permissions, as agreed in project scope",
    ),
    mockup: "saas",
  },
  {
    slug: "mobile",
    title: "Mobile App Development",
    summary: "Intuitive mobile apps built around what your users need to do.",
    tag: "Mobile apps",
    includes: included(
      "Layouts for agreed target devices",
      "Core app functionality",
      "App-store submission assistance, where applicable",
    ),
    mockup: "booking",
  },
  {
    slug: "automation",
    title: "Business Tools & Automation",
    summary: "Connected tools that simplify repetitive work and keep your business moving.",
    tag: "Automation",
    includes: included(
      "Agreed business workflows",
      "Data import & export, as agreed in project scope",
      "Documentation",
    ),
    mockup: "automation",
  },
];

/** Where service enquiries go (the Contact section). */
export const serviceEnquiryHref = "#contact";
