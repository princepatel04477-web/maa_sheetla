import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The lead vault holds customer PII — keep it out of every search index.
      disallow: ["/admin/", "/api/"],
    },
    sitemap: "https://maasheetla.com/sitemap.xml",
  };
}
