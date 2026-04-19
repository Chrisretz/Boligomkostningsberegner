import type { Metadata } from "next";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { canonicalUrl } from "@/lib/site";
import { getArticleDates } from "@/lib/article-dates";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleSchema } from "@/lib/structured-data";
import { BegreberExplorer } from "@/components/BegreberExplorer";

const PAGE_PATH = "/boligbegreber";
const dates = getArticleDates(PAGE_PATH);

const title = "Boligbegreber";
const description =
  "Få korte og lange forklaringer på vigtige begreber inden for boligkøb og boligøkonomi – søg i alfabetisk oversigt og fold forklaringer ud.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/boligbegreber") },
  ...socialMetadata({
    path: PAGE_PATH,
    title,
    description,
  }),
};

export default function BoligbegreberPage() {
  const articleSchema = getArticleSchema({
    title: "Boligbegreber",
    description:
      "Kort og lange forklaringer på vigtige begreber inden for boligkøb og boligøkonomi.",
    path: PAGE_PATH,
    datePublished: dates.datePublished,
    dateModified: dates.dateModified,
  });

  return (
    <main className="min-h-screen py-12 px-4 overflow-x-hidden pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto max-w-5xl">
        <p className="mb-4">
          <Link
            href="/artikler"
            className="text-body text-brand-primary hover:underline"
          >
            ← Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-3">Boligbegreber</h1>
        <ArticleMeta {...dates} />
        <p className="text-body text-text-secondary mb-8">
          En samlet ordliste over vigtige begreber inden for boligkøb. Brug
          søgefeltet for at finde hurtigt, eller hop til et bogstav (A–Æ) og
          fold derefter forklaringerne ud. Officielle oplysninger om bolig,
          flytning, økonomi og dine rettigheder som borger samler{" "}
          <a
            href="https://www.borger.dk/bolig-og-flytning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary underline hover:no-underline"
          >
            Borger.dk under bolig og flytning
          </a>
          .
        </p>

        <BegreberExplorer />
      </div>
    </main>
  );
}

