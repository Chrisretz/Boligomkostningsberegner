import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/go"], // affiliate redirects – dækker /go og /go/*
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
