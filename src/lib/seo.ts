// Search metadata and structured data. Server-only: read by the root layout, the home page,
// robots.ts and sitemap.ts. Everything here mirrors visible content (site, showcase, socials);
// keep it that way when the copy changes.

import { contact, site } from "@/lib/site";
import { showcaseServices } from "@/lib/showcase";
import { socials } from "@/lib/socials";

export const seo = {
  title: "AS Labs | Website & System Developer in Malaysia",
  description:
    "Akkmal Saad designs and builds websites, online stores, custom web systems and mobile apps for businesses in Malaysia, from the first conversation to launch.",
  ogImage: { url: "/brand/social/og-image.png", width: 1200, height: 630, alt: "AS Labs logo" },
} as const;

/**
 * Vercel preview and development deployments must stay out of search results; production (and
 * any non-Vercel host) is indexable. VERCEL_ENV is a Vercel system variable set at build time.
 */
export const indexable = process.env.VERCEL_ENV !== "preview" && process.env.VERCEL_ENV !== "development";

const absolute = (path: string) => new URL(path, `${site.url}/`).toString();

// What each service card offers, in plain search terms (the card titles are marketing copy).
const serviceTypes: Record<string, string> = {
  websites: "Website design and development",
  ecommerce: "E-commerce website development",
  saas: "Custom web system and web application development",
  mobile: "Mobile app development",
  automation: "Business tools and workflow automation",
};

const malaysia = { "@type": "Country", name: "Malaysia" } as const;

/** One JSON-LD graph for the home page: the site, AS Labs, Akkmal Saad and the five services. */
export function homeJsonLd() {
  const ids = {
    website: absolute("/#website"),
    webpage: absolute("/#webpage"),
    organization: absolute("/#organization"),
    person: absolute("/#akkmal-saad"),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: absolute("/"),
        name: site.shortName,
        alternateName: site.name,
        description: seo.description,
        inLanguage: "en",
        publisher: { "@id": ids.organization },
      },
      {
        "@type": "WebPage",
        "@id": ids.webpage,
        url: absolute("/"),
        name: seo.title,
        description: seo.description,
        inLanguage: "en",
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.organization },
        primaryImageOfPage: absolute(seo.ogImage.url),
      },
      {
        "@type": "Organization",
        "@id": ids.organization,
        name: site.shortName,
        alternateName: site.name,
        url: absolute("/"),
        logo: absolute("/brand/favicon/icon-512.png"),
        image: absolute(seo.ogImage.url),
        description: seo.description,
        founder: { "@id": ids.person },
        email: contact.email,
        // The WhatsApp number from Contact in international form (017-… → +60 17-…).
        telephone: `+60 ${contact.whatsapp.display.replace(/^0/, "")}`,
        // Same address the footer shows under "Studio".
        address: {
          "@type": "PostalAddress",
          streetAddress: "HON City Garden Commercial Centre, Jalan Nirwana, Taman Nirwana",
          postalCode: "68000",
          addressLocality: "Ampang",
          addressRegion: "Selangor",
          addressCountry: "MY",
        },
        areaServed: malaysia,
      },
      {
        "@type": "Person",
        "@id": ids.person,
        name: "Akkmal Saad",
        jobTitle: "Full-Stack Developer",
        url: absolute("/"),
        worksFor: { "@id": ids.organization },
        knowsAbout: ["Website development", "Web application development", "UI/UX design", "Mobile app development"],
        sameAs: socials.map((social) => social.href),
      },
      ...showcaseServices.map((service) => ({
        "@type": "Service",
        "@id": absolute(`/#service-${service.slug}`),
        name: service.title,
        serviceType: serviceTypes[service.slug] ?? service.tag,
        description: service.summary,
        url: absolute("/#work"),
        provider: { "@id": ids.organization },
        areaServed: malaysia,
      })),
    ],
  };
}
