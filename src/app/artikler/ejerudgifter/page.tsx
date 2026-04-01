import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Hvad er ejerudgifter?",
  description:
    "Ejerudgifter: grundskyld, ejendomsskat, forsikring, vand, varme og fællesudgifter som boligejer.",
  alternates: { canonical: canonicalUrl("/artikler/ejerudgifter") },
  openGraph: {
    title: "Hvad er ejerudgifter?",
    description:
      "Ejerudgifter: grundskyld, ejendomsskat, forsikring, vand, varme og fællesudgifter som boligejer.",
    url: canonicalUrl("/artikler/ejerudgifter"),
  },
};

export default function EjerudgifterPage() {
  const articleSchema = getArticleSchema({
    title: "Hvad er ejerudgifter?",
    description:
      "Ejerudgifter: grundskyld, ejendomsskat, forsikring, vand, varme og fællesudgifter som boligejer.",
    path: "/artikler/ejerudgifter",
  });
  return (
    <main className="min-h-screen py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto max-w-2xl">
        <p className="mb-4">
          <Link
            href="/artikler"
            className="text-body text-brand-primary hover:underline"
          >
            ← Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-8">
          Hvad er ejerudgifter?
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Når du ejer en bolig – enten et hus eller en ejerlejlighed – har du
            løbende udgifter ud over selve låneydelsen. Disse kaldes ofte
            <strong> ejerudgifter</strong> og omfatter skat, forsikring, vand,
            varme og for lejligheder også fællesudgifter. De indgår i den
            samlede månedlige boligudgift og er derfor vigtige at kende, når du
            vurderer, hvad du har råd til at betale for din bolig.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Grundskyld og ejendomsskat
            </h2>
            <p>
              Som boligejer betaler du <strong>grundskyld</strong> og evt.
              <strong> ejendomsskat</strong> til kommunen. Grundskyld er en
              årlig skat baseret på ejendommens vurdering og er ens for alle
              ejere i samme kommune med samme type bolig. Ejendomsskat (eller
              ejendomsværdiskat) kan også være gældende afhængigt af
              vurderingen. Beløbene varierer meget fra kommune til kommune og
              fra bolig til bolig – den foreløbige ejendomsvurdering, som skatten
              bl.a. knytter sig til, kan du slå op på{" "}
              <a
                href="https://www.vurderingsportalen.dk/ejerbolig/vurdering/foreloebige-vurderinger"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Vurderingsportalen
              </a>
              . Herfra kan du også finde vej til mere om grundskyld og
              ejendomsskat hos Skattestyrelsen.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Forsikring
            </h2>
            <p>
              En <strong>indboforsikring</strong> dækker typisk indbo, brand,
              vandskade og indbrud. Mange vælger også en
              <strong> husforsikring</strong> (for huse), der dækker selve
              bygningen. Præmien afhænger af boligens størrelse, beliggenhed og
              hvad du vælger at have med. Forsikring udgør ofte en betydelig
              del af de månedlige ejerudgifter og bør medtages i din
              boligbudget.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Vand, varme og el
            </h2>
            <p>
              <strong>Vand og varme</strong> (og ofte en del af el) betales
              løbende som ejerudgifter. I ejerlejligheder er en del ofte
              inkluderet i fællesudgifterne; i huse betaler du typisk direkte til
              forsyningensselskab og varmeforsyning. Beløbene svinger med
              sæson og forbrug, men du bør afsætte et gennemsnitligt månedligt
              beløb i din økonomi.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Fællesudgifter (ejerlejlighed)
            </h2>
            <p>
              I en <strong>ejerlejlighed</strong> betaler du ofte
              <strong> fællesudgifter</strong> til ejendomsadministrationen. De
              dækker bl.a. opvarmning og vand til fællesarealer, rengøring,
              vedligehold af trappeopgang og facade, forsikring af bygningen og
              evt. portør og have. Beløbet fremgår af boligannoncen eller
              ejendomsoplysninger og bør medtages i din vurdering af den
              samlede månedlige boligudgift.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvorfor ejerudgifter betyder noget for boligkøb
            </h2>
            <p>
              Din reelle boligudgift er ikke kun låneydelsen – det er låneydelse
              plus ejerudgifter plus (hvis du regner det med) en vedligeholdelsesreserve.
              Hvis du kun kigger på, hvad du skal betale til banken, kan du
              overvurdere, hvad du har råd til. Derfor bør enhver
              boligomkostningsberegner have et felt til ejerudgifter pr. måned,
              så du får et samlet billede.
            </p>
            <p>
              <Link href="/beregn" className="text-brand-primary hover:underline font-medium">
                Brug vores beregner her
              </Link>{" "}
              til at indtaste dine forventede ejerudgifter og se den samlede
              månedlige boligomkostning.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              Ejerudgifter er de løbende udgifter du har som boligejer:
              grundskyld, ejendomsskat, forsikring, vand, varme og for
              ejerlejligheder fællesudgifter. De indgår i den samlede månedlige
              boligudgift og bør medtages, når du vurderer, hvad du har råd til
              at betale for din bolig.
            </p>
          </section>
        </div>

        <p className="mt-8">
          <Link
            href="/artikler"
            className="text-body text-brand-primary hover:underline"
          >
            Se alle artikler
          </Link>
        </p>
      </div>
    </main>
  );
}
