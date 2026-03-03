import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const staticPaths = [
  "",
  "/beregn",
  "/artikler",
  "/artikler/tinglysning",
  "/artikler/ejerskifteforsikring",
  "/privacy",
  "/cookies",
  "/disclaimer",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" || path === "/beregn" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/beregn" ? 0.9 : 0.7,
  }));
}
