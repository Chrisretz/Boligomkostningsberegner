import type { MetadataRoute } from "next";
import { PATH_BOLIGOMKOSTNINGER_BEREGNER, SITE_URL } from "@/lib/site";

export const SITEMAP_STATIC_PATHS = [
  "",
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  "/beregnere",
  "/hvad-kan-jeg-koebe-bolig-for",
  "/artikler",
  "/artikler/tinglysning",
  "/artikler/ejerskifteforsikring",
  "/artikler/realkreditlan",
  "/artikler/sammenligning-af-laanetyper",
  "/artikler/energimaerker-og-boligokonomi",
  "/artikler/vedligehold",
  "/artikler/eksisterende-pantebrev",
  "/artikler/hvad-kan-jeg-koebe-bolig-for",
  "/artikler/ejerudgifter",
  "/artikler/ejerlejlighed",
  "/artikler/boligkoeb-foerste-gang",
  "/artikler/grundskyld-og-ejendomsskat",
  "/artikler/indboforsikring",
  "/artikler/elforbrug-husstand",
  "/privacy",
  "/cookies",
  "/disclaimer",
  "/om-os",
  "/boligbegreber",
] as const;

export type SitemapRow = {
  url: string;
  lastModified: Date;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  priority: number;
};

export function getSitemapRows(): SitemapRow[] {
  const lastModified = new Date();

  return SITEMAP_STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency:
      path === "" || path === PATH_BOLIGOMKOSTNINGER_BEREGNER
        ? ("weekly" as const)
        : ("monthly" as const),
    priority:
      path === ""
        ? 1
        : path === PATH_BOLIGOMKOSTNINGER_BEREGNER
          ? 0.9
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
