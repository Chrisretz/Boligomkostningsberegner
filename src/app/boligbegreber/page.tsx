import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleSchema } from "@/lib/structured-data";
import { BegreberExplorer } from "@/components/BegreberExplorer";

export const metadata: Metadata = {
  title: "Boligbegreber | Boligklarhed",
  description:
    "Få korte og lange forklaringer på vigtige begreber inden for boligkøb og boligøkonomi – søg i alfabetisk oversigt og fold forklaringer ud.",
  alternates: { canonical: canonicalUrl("/boligbegreber") },
};

export default function BoligbegreberPage() {
  const articleSchema = getArticleSchema({
    title: "Boligbegreber",
    description:
      "Kort og lange forklaringer på vigtige begreber inden for boligkøb og boligøkonomi.",
    path: "/boligbegreber",
  });

  return (
    <main className="min-h-screen py-12 px-4 overflow-x-hidden pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto max-w-3xl">
        <p className="mb-4">
          <Link
            href="/artikler"
            className="text-body text-brand-primary hover:underline"
          >
            ← Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-6">Boligbegreber</h1>
        <p className="text-body text-text-secondary mb-8">
          En samlet ordliste over vigtige begreber inden for boligkøb. Brug
          søgefeltet for at finde hurtigt, eller hop til et bogstav (A–Æ) og
          fold derefter forklaringerne ud.
        </p>

        <BegreberExplorer />
      </div>
    </main>
  );
}

