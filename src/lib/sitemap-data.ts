import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import {
  PATH_BOLIGLAAN_BEREGNER,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_KONTAKT,
  SITE_URL,
} from "@/lib/site";

/** Ikke-artikel-sider (rækkefølge bevares i sitemap). */
const SITEMAP_PREFIX_PATHS = [
  "",
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_BOLIGLAAN_BEREGNER,
  "/beregnere",
  "/hvad-kan-jeg-koebe-bolig-for",
  "/artikler",
] as const;

const SITEMAP_SUFFIX_PATHS = [
  "/privacy",
  "/cookies",
  "/disclaimer",
  "/om-os",
  PATH_KONTAKT,
  "/boligbegreber",
] as const;

/** Alle paths i XML-sitemap: kerne + én URL per artikel (fra `articles.ts`) + juridisk/kontakt. */
export const SITEMAP_PATHS: readonly string[] = [
  ...SITEMAP_PREFIX_PATHS,
  ...articles.map((a) => `/artikler/${a.slug}`),
  ...SITEMAP_SUFFIX_PATHS,
];

export type SitemapRow = {
  url: string;
  lastModified: Date;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  priority: number;
};

export function getSitemapRows(): SitemapRow[] {
  const lastModified = new Date();

  return SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency:
      path === "" ||
      path === PATH_BOLIGOMKOSTNINGER_BEREGNER ||
      path === PATH_BOLIGLAAN_BEREGNER
        ? ("weekly" as const)
        : ("monthly" as const),
    priority:
      path === ""
        ? 1
        : path === PATH_BOLIGOMKOSTNINGER_BEREGNER
          ? 0.9
          : path === PATH_BOLIGLAAN_BEREGNER
            ? 0.85
            : path === PATH_KONTAKT
              ? 0.65
              : 0.7,
  }));
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  return getSitemapRows().map(
    ({ url, lastModified, changeFrequency, priority }) => ({
      url,
      lastModified,
      changeFrequency,
      priority,
    })
  );
}

/** Visning som i sitemap-oversigt (UTC, som klassiske sitemap-UI'er). */
export function formatSitemapLastModified(d: Date): string {
  return d.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " +00:00");
}
