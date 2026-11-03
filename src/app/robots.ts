import type { MetadataRoute } from "next";
import { indexable } from "@/lib/seo";
import { site } from "@/lib/site";

// Production: crawl everything, point at the sitemap. Vercel previews stay crawlable (but list
// no sitemap) so crawlers can fetch the page and see its noindex; a Disallow would hide it.
export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    return { rules: { userAgent: "*", allow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
