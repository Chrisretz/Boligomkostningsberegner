import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, SITE_URL, PATH_BOLIGLAAN_BEREGNER } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { BoligprisExplorer } from "@/components/BoligprisExplorer";

const PAGE_PATH = "/boligpriser";

const title = "Boligpriser pr. kommune – udvikling i kr. pr. m²";
const description =
  "Se udviklingen i boligpriser i din kommune: realiseret handelspris pr. m² for huse og ejerlejligheder, kvartal for kvartal tilbage til 1992. Kilde: Finans Danmark.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(PAGE_PATH) },
  ...socialMetadata({ path: PAGE_PATH, title, description }),
};

export default function BoligpriserPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Forside", path: "/" },
    { name: "Data", path: "/data" },
    { name: "Boligpriser", path: PAGE_PATH },
  ]);
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Boligpriser pr. kommune (kr. pr. m²)",
    description,
    url: `${SITE_URL}${PAGE_PATH}`,
    creator: { "@type": "Organization", name: "Boligklarhed", url: SITE_URL },
    isAccessibleForFree: true,
    inLanguage: "da-DK",
    isBasedOn: "Boligmarkedsstatistikken, Finans Danmark",
    variableMeasured: "Realiseret handelspris i kr. pr. m² pr. kvartal",
  };

  return (
    <main className="min-h-screen py-12 px-4 overflow-x-clip pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <div className="container mx-auto max-w-3xl min-w-0">
        <nav aria-label="Sti" className="mb-4 text-small text-text-muted">
          <Link href="/" className="hover:text-brand-primary">
            Forside
          </Link>{" "}
          /{" "}
          <Link href="/data" className="hover:text-brand-primary">
            Data
          </Link>{" "}
          / <span className="text-text-secondary">Boligpriser</span>
        </nav>

        <header className="mb-8">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand-accent mb-2">
            Boligpriser
          </p>
          <h1 className="text-h1 text-text-primary mb-3 break-words">
            Boligpriser i din kommune
          </h1>
          <p className="text-body text-text-secondary leading-relaxed max-w-2xl">
            Vælg område og se, hvordan den realiserede kvadratmeterpris har
            udviklet sig, kvartal for kvartal tilbage til 1992. Skift mellem
            huse og ejerlejligheder. Tallene er faktiske handelspriser, ikke
            udbudspriser.
          </p>
        </header>

        <BoligprisExplorer />

        <section aria-labelledby="forstaa" className="mt-12 max-w-2xl">
          <h2 id="forstaa" className="text-h2 text-text-primary mb-4">
            Sådan læser du tallene
          </h2>
          <div className="space-y-4 text-body text-text-secondary leading-relaxed">
            <p>
              Prisen er den{" "}
              <strong className="text-text-primary">
                realiserede handelspris pr. m²
              </strong>
              , altså hvad boliger faktisk er blevet handlet til, ikke hvad de
              blev udbudt til. Kvadratmeterprisen gør det muligt at sammenligne
              på tværs af boligstørrelser og områder.
            </p>
            <p>
              Vær varsom med at læse for meget ind i et enkelt kvartal i en lille
              kommune. Er der få handler, kan gennemsnittet svinge kraftigt fra
              kvartal til kvartal. Kig hellere på den længere tendens.
            </p>
            <p>
              Vil du regne på, hvad en konkret bolig koster at købe og eje, så
              brug vores{" "}
              <Link
                href="/beregn-dine-boligomkostninger"
                className="text-brand-primary font-medium hover:underline"
              >
                boligomkostningsberegner
              </Link>
              , og se hvad et{" "}
              <Link
                href={PATH_BOLIGLAAN_BEREGNER}
                className="text-brand-primary font-medium hover:underline"
              >
                realkreditlån
              </Link>{" "}
              til købet ville koste om måneden.
            </p>
            <p className="text-small text-text-muted">
              Datakilde: Boligmarkedsstatistikken, Finans Danmark. Gengivet med
              kildeangivelse. Tallene er vejledende.
            </p>
          </div>
        </section>

        <p className="mt-8">
          <Link href="/data" className="text-body text-brand-primary hover:underline">
            ← Al boligdata
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}
