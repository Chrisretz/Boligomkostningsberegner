import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { calculators } from "@/lib/calculators";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Beregnere",
  description:
    "Brug vores beregnere til boligkøb: boligomkostninger, lånerum og hvad du kan købe bolig for. Gratis værktøjer til danske boligkøbere.",
  alternates: { canonical: canonicalUrl("/beregnere") },
  openGraph: {
    title: "Beregnere | Boligklarhed",
    description:
      "Boligomkostningsberegner og beregner for lånerum. Find ud af, hvad det koster at købe bolig og hvor meget du kan låne.",
    url: canonicalUrl("/beregnere"),
  },
};

export default function BeregnerePage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-2">Beregnere</h1>
        <p className="text-body text-text-secondary mb-8">
          Brug vores værktøjer til at beregne omkostninger ved boligkøb og
          finde ud af, hvor meget du kan låne og købe bolig for.
        </p>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-4 mb-10">
          <p>
            Beregnerne er gratis at bruge og bygger på typiske regler og
            satser. Resultaterne er vejledende – dine konkrete tal afhænger af
            bank, realkreditinstitut og din situation. Brug dem som
            beslutningsstøtte sammen med vores artikler og evt. rådgivning.
          </p>
        </div>

        <div className="space-y-4" role="list">
          {calculators.map((calc) => (
            <Link
              key={calc.id}
              href={calc.href}
              className="block p-6 rounded-md border border-border bg-brand-surface shadow-soft hover:border-border-strong hover:bg-border/10 transition-colors group"
            >
              <h2 className="text-h3 text-text-primary group-hover:text-brand-primary transition-colors">
                {calc.title}
              </h2>
              <p className="mt-2 text-body text-text-secondary">
                {calc.description}
              </p>
              <span className="mt-3 inline-block text-body font-medium text-brand-primary">
                Gå til beregneren →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8">
          <Link
            href="/"
            className="text-body text-brand-primary hover:underline"
          >
            Tilbage til forsiden
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}
