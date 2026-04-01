import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import {
  formatSitemapLastModified,
  getSitemapRows,
} from "@/lib/sitemap-data";

const title = "XML Sitemap";
const description =
  "Oversigt over sider i Boligklarheds XML-sitemap til søgemaskiner.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/sitemap") },
  robots: { index: false, follow: true },
  ...socialMetadata({
    path: "/sitemap",
    title,
    description,
  }),
};

export default function SitemapHtmlPage() {
  const rows = getSitemapRows();
  const count = rows.length;

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white px-4 sm:px-8 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            XML Sitemap
          </h1>
          <p className="text-sm sm:text-base text-white/95 leading-relaxed max-w-3xl">
            Dette XML-sitemap bruges af søgemaskiner til at finde og opdatere
            indhold på Boligklarhed. Den tekniske fil til crawlers findes som{" "}
            <Link
              href="/sitemap.xml"
              className="underline underline-offset-2 hover:text-white font-medium"
            >
              sitemap.xml
            </Link>
            .{" "}
            <a
              href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap"
              className="underline underline-offset-2 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Læs mere om XML-sitemaps
            </a>
            .
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        <p className="text-body text-text-primary mb-6">
          Denne oversigt indeholder{" "}
          <strong className="font-semibold text-text-primary tabular-nums">
            {count}
          </strong>{" "}
          {count === 1 ? "URL" : "URL'er"} fra sitemap.
        </p>

        <div className="rounded-md border border-border overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-brand-primary text-white">
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold border-b border-brand-primaryHover"
                >
                  URL
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold border-b border-brand-primaryHover text-right sm:text-left"
                >
                  Sidst opdateret
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.url}
                  className={
                    i % 2 === 0
                      ? "bg-white border-b border-border"
                      : "bg-brand-background/80 border-b border-border"
                  }
                >
                  <td className="px-4 py-2.5 align-top break-all">
                    <a
                      href={row.url}
                      className="text-status-info hover:underline font-medium"
                    >
                      {row.url}
                    </a>
                  </td>
                  <td className="px-4 py-2.5 align-top text-text-secondary tabular-nums whitespace-nowrap">
                    {formatSitemapLastModified(row.lastModified)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
