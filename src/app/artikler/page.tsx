import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Artikler",
  description:
    "Lær mere om boligkøb – tinglysning, realkreditlån, ejerskifteforsikring og andre vigtige emner.",
  alternates: { canonical: canonicalUrl("/artikler") },
};

const articles = [
  {
    slug: "tinglysning",
    title: "Hvad er tinglysning?",
    description: "Lær hvordan tinglysning sikrer dit ejerskab og hvilke afgifter der betales ved køb af bolig.",
  },
  {
    slug: "ejerskifteforsikring",
    title: "Hvad er en ejerskifteforsikring?",
    description: "Få overblik over hvad ejerskifteforsikring dækker, hvad den koster og om den er nødvendig for dig.",
  },
  {
    slug: "realkreditlan",
    title: "Realkreditlån: Sådan fungerer det",
    description: "Få overblik over realkreditlån, annuitetslån, F1/F3/F5 og hvordan din månedlige ydelse beregnes.",
  },
  {
    slug: "vedligehold",
    title: "Vedligehold af bolig: Hvor meget skal jeg sætte af?",
    description: "Lær tommelfingerreglen for vedligehold (1 % lejlighed, 1,5 % hus) og hvad pengene dækker over tid.",
  },
  {
    slug: "eksisterende-pantebrev",
    title: "Spar på tinglysning: Udnyt eksisterende pantebrev",
    description: "Lær hvordan du reducerer omkostningerne til tinglysning af pant ved at overtage eller genbruge allerede tinglyste pantebreve.",
  },
] as const;

export default function ArtiklerPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-2">Artikler</h1>
        <p className="text-body text-text-secondary mb-8">
          Vejledning og viden om boligkøb – fra tinglysning og realkreditlån til
          ejerskifteforsikring og mere.
        </p>

        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/artikler/${article.slug}`}
                className="block p-4 rounded-lg border border-border bg-brand-surface hover:border-border-strong transition-colors group"
              >
                <h2 className="text-h3 text-text-primary group-hover:text-brand-primary transition-colors">
                  {article.title}
                </h2>
                <p className="mt-2 text-body text-text-secondary">
                  {article.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8">
          <Link
            href="/"
            className="text-body text-brand-primary hover:underline"
          >
            Tilbage til forsiden
          </Link>
        </p>
      </div>
    </main>
  );
}
