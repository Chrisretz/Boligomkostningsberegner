import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Genererer robots.txt med tilladelse til alle crawlers og link til sitemap.
 * Tilgængelig på https://www.boligklarhed.dk/robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
