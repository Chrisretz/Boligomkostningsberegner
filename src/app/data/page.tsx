import type { Metadata } from "next";
import Link from "next/link";
import { datasets } from "@/lib/datasets";
import { canonicalUrl } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

const PAGE_PATH = "/data";

const title = "Boligdata – aktuelle renter og elpriser";
const description =
  "Aktuelle tal for boligøkonomien ét sted: realkreditrenter pr. lånetype og elpriser i Danmark. Opdateres automatisk fra officielle kilder.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(PAGE_PATH) },
  ...socialMetadata({ path: PAGE_PATH, title, description }),
};

export default function DataPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Forside", path: "/" },
    { name: "Data", path: PAGE_PATH },
  ]);

  return (
    <main className="min-h-screen py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto max-w-4xl">
        <header className="max-w-2xl mb-10">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand-accent mb-2">
            Boligdata
          </p>
          <h1 className="text-h1 text-text-primary mb-3 break-words">
            Aktuelle tal for boligøkonomien
          </h1>
          <p className="text-body text-text-secondary text-lg leading-relaxed">
            Vi samler de tal, der betyder noget for din boligøkonomi, ét sted og
            henter dem automatisk fra officielle kilder. Alt er gratis og uden
            login.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2" role="list">
          {datasets.map((d) => (
            <Link
              key={d.id}
              href={d.href}
              role="listitem"
              className="card-lift group flex flex-col rounded-2xl border border-border bg-brand-surface p-6 shadow-soft hover:border-brand-primary"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/10 px-2.5 py-0.5 text-small font-medium text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" aria-hidden />
                  {d.cadence}
                </span>
              </div>
              <h2 className="text-h3 text-text-primary group-hover:text-brand-primary transition-colors">
                {d.title}
              </h2>
              <p className="mt-1 text-small font-medium text-brand-accent">
                {d.tagline}
              </p>
              <p className="mt-3 flex-1 text-body text-text-secondary leading-relaxed">
                {d.description}
              </p>
              <p className="mt-4 text-small text-text-muted">Kilde: {d.source}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-body font-semibold text-brand-primary">
                Se tallene
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-dashed border-border bg-brand-background/50 px-5 py-4 text-small text-text-secondary leading-relaxed">
          Tallene er vejledende og hentes fra offentlige kilder. De er til
          overblik og budget, ikke bindende tilbud. Renter afhænger af kursen
          på handelsdagen, og elpriser af din konkrete elaftale.
        </p>

        <p className="mt-8">
          <Link href="/" className="text-body text-brand-primary hover:underline">
            ← Tilbage til forsiden
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}
