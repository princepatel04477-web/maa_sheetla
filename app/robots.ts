import { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The lead vault holds customer PII — keep it out of every search index.
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
