import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// The site is a single public page; sections are anchors on it, not separate URLs.
// No lastModified: there is no reliable content date to report.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/` }];
}
