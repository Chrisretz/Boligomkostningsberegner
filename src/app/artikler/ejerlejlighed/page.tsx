import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Hvad er en ejerlejlighed?",
  description:
    "Ejerlejlighed: ejerskab, fællesudgifter og omkostninger. Sådan adskiller det sig fra hus og andelsbolig.",
  alternates: { canonical: canonicalUrl("/artikler/ejerlejlighed") },
  openGraph: {
    title: "Hvad er en ejerlejlighed?",
    description:
      "Ejerlejlighed: ejerskab, fællesudgifter og omkostninger. Sådan adskiller det sig fra hus og andelsbolig.",
    url: canonicalUrl("/artikler/ejerlejlighed"),
  },
};

export default function EjerlejlighedPage() {
  const articleSchema = getArticleSchema({
    title: "Hvad er en ejerlejlighed?",
    description:
      "Ejerlejlighed: ejerskab, fællesudgifter og omkostninger. Sådan adskiller det sig fra hus og andelsbolig.",
    path: "/artikler/ejerlejlighed",
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
          Hvad er en ejerlejlighed?
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            En <strong>ejerlejlighed</strong> er en lejlighed, som du ejer – du
            køber ikke bare retten til at bo der, men selve lejligheden som
            fast ejendom. Du får et skøde på din lejlighed og bliver medejer af
            den fælles ejendom (trappeopgang, tag, facade, grund), som
            administreres gennem en ejendomsadministration. Ejerlejligheden er
            en af de mest almindelige boligformer i Danmark, især i byerne.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Ejerlejlighed vs. andelsbolig og hus
            </h2>
            <p>
              I en <strong>ejerlejlighed</strong> ejer du selve lejligheden og
              har typisk et realkreditlån eller banklån sikret med pant i den.
              I en <strong>andelsbolig</strong> ejer du i stedet andele i en
              andelsforening og har ret til at bo i en bestemt lejlighed – du
              ejer ikke selve lejligheden som fast ejendom, og finansieringen
              er ofte anderledes (andelslån). Et <strong>hus</strong> ejer du
              typisk inkl. grunden og har fuld råderet over bygning og have,
              men også fuldt ansvar for vedligehold.
            </p>
            <p>
              Ejerlejligheder passer ofte til dem, der vil eje sin bolig uden
              at stå for al vedligehold selv – en del af det løses via
              fællesudgifter og vedtægter i ejendommen.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Fællesudgifter og ejendomsadministration
            </h2>
            <p>
              Som ejer af en ejerlejlighed betaler du <strong>fællesudgifter</strong>
              til ejendommen. De dækker bl.a. opvarmning og vand til fællesarealer,
              rengøring, vedligehold af trappeopgang, facade og tag,
              forsikring af bygningen og evt. portør og have. Beløbet varierer
              fra ejendom til ejendom og fremgår af boligannoncen eller
              ejendomsoplysninger. Fællesudgifterne er en vigtig del af dine
              løbende ejerudgifter og bør medtages, når du beregner dine
              samlede boligomkostninger.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Vedligehold: ejerlejlighed vs. hus
            </h2>
            <p>
              I beregninger af boligomkostninger bruges ofte en lavere
              vedligeholdelsesreserve for ejerlejlighed end for hus – fx
              <strong> 1,0 % af købsprisen pr. år</strong> for ejerlejlighed
              mod 1,5 % for hus. Det skyldes, at en del vedligehold (tag,
              facade, fælles installationer) hænger sammen med fællesudgifterne
              og ikke kun din egen lejlighed. Du bør stadig afsætte noget til
              vedligehold inde i lejligheden (køkken, badeværelse, gulve,
              vinduer).
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Omkostninger ved køb af ejerlejlighed
            </h2>
            <p>
              Ved køb af ejerlejlighed betaler du – som ved hus – tinglysning
              af skøde og evt. pant (hvis du optager lån), og mange vælger også
              ejerskifteforsikring. Du skal have udbetaling (mindst 5 % af
              købsprisen) og dække engangsomkostningerne. Den månedlige udgift
              består af låneydelse, fællesudgifter og evt. grundskyld og
              ejendomsskat. En boligomkostningsberegner kan hjælpe dig med at
              samle alle poster og vælge &quot;ejerlejlighed&quot; som boligtype,
              så vedligehold beregnes med den rigtige sats.
            </p>
            <p>
              <Link href="/beregn" className="text-brand-primary hover:underline font-medium">
                Brug vores beregner her
              </Link>{" "}
              og vælg boligtypen ejerlejlighed for at få et overblik over dine
              reelle boligomkostninger.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              En ejerlejlighed er en lejlighed du ejer som fast ejendom, med
              skøde og typisk pant i. Du betaler fællesudgifter til
              ejendommen og har lavere vedligeholdelsesbehov end i et hus, men
              ejerudgifter og engangsomkostninger ved køb bør stadig medtages i
              din vurdering af, hvad boligen reelt koster.
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
