import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGLAAN_BEREGNER,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { getArticleDates } from "@/lib/article-dates";
import { REALKREDITLAN_BEREGNER_FAQ } from "@/lib/artikel-faq/realkreditlan-beregner";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/realkreditlan-beregner";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema([...REALKREDITLAN_BEREGNER_FAQ]);

const title = "Realkreditlån beregner: Få overblik over dine boligomkostninger";
const description =
  "Brug Boligklarheds boligomkostningsberegner som realkreditlån beregner: ydelse, 80/15/5, banklån, tinglysning, vedligehold og ejerudgifter — gratis og uden login.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(ARTICLE_PATH) },
  ...socialMetadata({
    path: ARTICLE_PATH,
    title,
    description,
  }),
};

export default function RealkreditlanBeregnerArticlePage() {
  const articleSchema = getArticleSchema({
    title:
      "Realkreditlån beregner: Få overblik over dine boligomkostninger",
    description,
    path: ARTICLE_PATH,
    datePublished: dates.datePublished,
    dateModified: dates.dateModified,
  });

  return (
    <main className="min-h-screen py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto max-w-2xl">
        <p className="mb-4">
          <Link
            href="/artikler"
            className="text-body text-brand-primary hover:underline"
          >
            {"\u2190"} Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-3">
          Realkreditlån beregner: Få overblik over dine boligomkostninger
        </h1>
        <ArticleMeta {...dates} />

        <article className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Drømmer du om at købe bolig, men mangler det fulde overblik over
            økonomien? Hos Boligklarhed ved vi, hvor vigtigt det er at forstå
            alle omkostninger ved boligkøb og ejerskab. Derfor har vi udviklet en
            online{" "}
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="text-brand-primary underline hover:no-underline font-medium"
            >
              boligomkostningsberegner
            </Link>
            , der hjælper dig med at vurdere dit lånerum og se, hvad et{" "}
            <Link
              href="/artikler/realkreditlan"
              className="text-brand-primary underline hover:no-underline"
            >
              realkreditlån
            </Link>{" "}
            reelt vil koste i månedlig ydelse og hvad du skal budgettere med
            samlet.
          </p>
          <p>
            Vores mission er at give dig gennemsigtighed og uafhængig indsigt,
            så du kan træffe velinformerede beslutninger. Med vores værktøjer får
            du et realistisk billede af de samlede udgifter — fra engangsudgifter
            ved købet til løbende månedlige betalinger og ejendommens
            driftsomkostninger.
          </p>
          <p>
            Vi tror på klarhed, især for{" "}
            <Link
              href="/artikler/boligkoeb-foerste-gang"
              className="text-brand-primary underline hover:no-underline"
            >
              førstegangskøbere
            </Link>
            . Vores beregner er 100 % gratis at bruge, kræver ingen login, og vi
            gemmer aldrig dine indtastede data. Alle beregninger foregår direkte
            i din browser.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 not-prose my-4">
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="inline-flex justify-center items-center min-h-[48px] px-6 py-3 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:opacity-90"
            >
              Åbn boligomkostningsberegner
            </Link>
            <Link
              href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
              className="inline-flex justify-center items-center min-h-[48px] px-6 py-3 text-body font-semibold text-brand-primary border border-brand-primary rounded-md hover:bg-brand-primary/5"
            >
              Hvad kan jeg købe bolig for?
            </Link>
          </div>

          <section aria-labelledby="hvad-er-realkredit">
            <h2
              id="hvad-er-realkredit"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Hvad er et realkreditlån — og hvorfor er det vigtigt at beregne det?
            </h2>
            <p>
              Et realkreditlån er den billigste måde at finansiere op til 80 % af
              din boligs købspris i Danmark. Det er et lån med pant i ejendommen,
              ydet af realkreditinstitutter. De øvrige ca. 20 % finansieres
              typisk med{" "}
              <strong className="text-text-primary">udbetaling (5 %)</strong> og{" "}
              <Link
                href="/artikler/sammenligning-af-laanetyper"
                className="text-brand-primary underline hover:no-underline"
              >
                banklån
              </Link>{" "}
              — derfor er realkreditlånet ofte den største del af din gæld ved{" "}
              <Link
                href="/artikler/boligkoeb-foerste-gang"
                className="text-brand-primary underline hover:no-underline"
              >
                boligkøb
              </Link>
              .
            </p>
            <p>
              At bruge en realkreditlån beregner — i praksis vores{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary underline hover:no-underline"
              >
                boligomkostningsberegner
              </Link>{" "}
              — er essentielt, fordi du får indblik i månedlige ydelser,
              renteniveau og lånetyper, der passer til din økonomi. Uden overblik
              risikerer du at undervurdere de samlede udgifter.
            </p>
            <p>
              Vores{" "}
              <Link
                href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                className="text-brand-primary underline hover:no-underline"
              >
                «Hvad kan jeg købe bolig for?»
              </Link>{" "}
              og den generelle boligomkostningsberegner tager højde for
              realkreditlån som en central del af beregningen og hjælper dig med
              at forstå, hvor stort et realkreditlån der er realistisk ud fra
              indkomst og gæld — suppleret af bankens egen kreditvurdering, når du
              søger om lån. Læs også{" "}
              <Link
                href="/artikler/saadan-vurderer-banken-dit-boliglan"
                className="text-brand-primary underline hover:no-underline"
              >
                hvordan banken vurderer dit boliglån
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="laanetyper">
            <h2
              id="laanetyper"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Forskellige typer af realkreditlån
            </h2>
            <p>
              Realkreditlån findes i flere variationer, og valget kan have stor
              betydning for din økonomi. De mest almindelige er{" "}
              <strong className="text-text-primary">annuitetslån</strong>, hvor
              du betaler en fast ydelse med faldende rentebidrag og stigende
              afdrag over løbetiden — typisk op til 30 år. Du kan læse mere om de
              forskellige typer i vores artikel om{" "}
              <Link
                href="/artikler/sammenligning-af-laanetyper"
                className="text-brand-primary underline hover:no-underline"
              >
                sammenligning af lånetyper
              </Link>{" "}
              og i guiden om{" "}
              <Link
                href="/artikler/realkreditlan"
                className="text-brand-primary underline hover:no-underline"
              >
                realkreditlån
              </Link>
              .
            </p>
            <p className="font-medium text-text-primary">De mest kendte lånetyper:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">F-kort eller F1-lån:</strong>{" "}
                Renten justeres typisk årligt — lav startydelse, men højere
                renterisiko.
              </li>
              <li>
                <strong className="text-text-primary">F3-lån:</strong> Renten er
                fastlåst i 3 år — balance mellem stabilitet og potentielt lavere
                rente end F5.
              </li>
              <li>
                <strong className="text-text-primary">F5-lån:</strong> Renten
                fast i 5 år — mere budgetro end kortere F-lån.
              </li>
              <li>
                <strong className="text-text-primary">
                  Obligationslån med fast rente:
                </strong>{" "}
                Fast rente i hele løbetiden (ofte op til 30 år) — maksimal
                budgetsikkerhed, men typisk højere startrente.
              </li>
            </ul>
            <p>
              Når du bruger vores beregner, tager vi ikke kun højde for
              typiske renteantagelser, men også{" "}
              <Link
                href="/artikler/vedligehold"
                className="text-brand-primary underline hover:no-underline"
              >
                vedligehold
              </Link>
              ,{" "}
              <Link
                href="/artikler/ejerudgifter"
                className="text-brand-primary underline hover:no-underline"
              >
                ejerudgifter
              </Link>{" "}
              og engangsomkostninger, så du får et samlet billede.
            </p>
          </section>

          <section aria-labelledby="saa-fungerer">
            <h2
              id="saa-fungerer"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Sådan fungerer vores realkreditlån beregner og boligomkostningsberegner
            </h2>
            <p>
              Beregneren er designet til at give dig et detaljeret overblik over
              omkostninger ved boligkøb og ejerskab. Sådan er flowet:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Du indtaster oplysninger om den bolig, du overvejer (fx
                købspris, boligtype, størrelse).
              </li>
              <li>
                Beregneren tager højde for den krævede udbetaling på mindst 5 %
                af købsprisen og realkreditlån op til 80 % af købsprisen. De
                resterende ca. 15 % finansieres ofte med banklån, typisk med 10
                eller 20 års løbetid.
              </li>
              <li>
                Vi estimerer engangsudgifter som{" "}
                <Link
                  href="/artikler/tinglysning"
                  className="text-brand-primary underline hover:no-underline"
                >
                  tinglysningsafgift
                </Link>{" "}
                og{" "}
                <Link
                  href="/artikler/ejerskifteforsikring"
                  className="text-brand-primary underline hover:no-underline"
                >
                  ejerskifteforsikring
                </Link>
                .
              </li>
              <li>
                Du får overblik over månedlige udgifter: ydelser på realkredit og
                banklån, løbende ejerudgifter og et estimat for vedligeholdelse.
              </li>
            </ol>
            <p>
              Du kan også køre en{" "}
              <strong className="text-text-primary">rentestresstest</strong> i
              beregneren, så du ser, hvad der sker med ydelserne, hvis renten
              stiger — et vigtigt redskab for at vurdere din økonomiske
              robusthed. Relateret landing:{" "}
              <Link
                href={PATH_BOLIGLAAN_BEREGNER}
                className="text-brand-primary underline hover:no-underline"
              >
                Boliglån beregner
              </Link>{" "}
              (guide + sammenligning af eksempler).
            </p>
          </section>

          <section aria-labelledby="vedligehold-drifts">
            <h2
              id="vedligehold-drifts"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Vedligeholdelse og driftsomkostninger — ofte overset i budgettet
            </h2>
            <p>
              En vigtig del af klarhed over boligomkostninger er at medregne{" "}
              <Link
                href="/artikler/vedligehold"
                className="text-brand-primary underline hover:no-underline"
              >
                vedligeholdelse
              </Link>
              . Vi bruger typiske tommelfingerregler:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Hus:</strong> ca. 1,5 % af
                købsprisen årligt til vedligeholdelse.
              </li>
              <li>
                <strong className="text-text-primary">Ejerlejlighed:</strong> ca.
                1 % af købsprisen årligt.
              </li>
            </ul>
            <p>
              Derudover estimerer vi el baseret på gennemsnitligt forbrug fra
              Energistyrelsen/EWII — typisk for en lejlighed på ca. 80 m² eller et
              hus på ca. 160 m² uden elvarme/elbil. Læs mere i artiklen om{" "}
              <Link
                href="/artikler/elforbrug-husstand"
                className="text-brand-primary underline hover:no-underline"
              >
                elforbrug i husstanden
              </Link>
              .
            </p>
            <p>
              Husk også poster som{" "}
              <Link
                href="/artikler/grundskyld-og-ejendomsskat"
                className="text-brand-primary underline hover:no-underline"
              >
                ejendomsskat og grundskyld
              </Link>
              , ejerforeningsudgifter for ejerlejligheder, og forsikringer som hus-
              og{" "}
              <Link
                href="/artikler/indboforsikring"
                className="text-brand-primary underline hover:no-underline"
              >
                indboforsikring
              </Link>
              , samt øvrige{" "}
              <Link
                href="/artikler/ejerudgifter"
                className="text-brand-primary underline hover:no-underline"
              >
                ejerudgifter
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="brug-til">
            <h2
              id="brug-til"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Hvad kan du bruge Boligklarheds realkreditlån beregner til?
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Før boligjagt:</strong> Få en
                idé om lånerum og prisklasse.
              </li>
              <li>
                <strong className="text-text-primary">Når du har fundet en bolig:</strong>{" "}
                Indtast konkrete tal og få detaljeret overblik.
              </li>
              <li>
                <strong className="text-text-primary">Ved forhandling:</strong> Brug
                tallene som beslutningsstøtte til dit råderum.
              </li>
              <li>
                <strong className="text-text-primary">Til budgetlægning:</strong> Se
                månedlige udgifter og planlæg fremad.
              </li>
            </ul>
            <p>
              Resultaterne er{" "}
              <strong className="text-text-primary">vejledende</strong> og ikke
              finansiel eller juridisk rådgivning. Søg altid professionel rådgivning
              ved endelige beslutninger om lån og køb.
            </p>
          </section>

          <section aria-labelledby="online-vaerktoejer">
            <h2
              id="online-vaerktoejer"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Få klarhed med Boligklarheds online værktøjer
            </h2>
            <p>
              Udover boligomkostningsberegneren finder du{" "}
              <Link
                href="/artikler"
                className="text-brand-primary underline hover:no-underline"
              >
                artikler
              </Link>{" "}
              om alt fra{" "}
              <Link
                href="/artikler/tinglysning"
                className="text-brand-primary underline hover:no-underline"
              >
                tinglysning
              </Link>{" "}
              til{" "}
              <Link
                href="/artikler/ejerskifteforsikring"
                className="text-brand-primary underline hover:no-underline"
              >
                ejerskifteforsikring
              </Link>
              , og et{" "}
              <Link
                href="/boligbegreber"
                className="text-brand-primary underline hover:no-underline"
              >
                opslagsværk med boligbegreber
              </Link>
              . Vi ønsker at klæde dig på til boligkøb — uanset om du er
              førstegangskøber eller erfaren.
            </p>
            <p>
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary underline hover:no-underline font-medium"
              >
                Åbn boligomkostningsberegneren
              </Link>{" "}
              og tag det første skridt mod en mere klar boligøkonomi.
            </p>
            <p className="text-small text-text-muted">
              Vi anvender teknisk nødvendige cookies for at sikre, at
              beregnere fungerer, og med dit samtykke statistik-cookies til at
              forbedre oplevelsen. Læs mere under{" "}
              <Link
                href="/cookies"
                className="text-brand-primary underline hover:no-underline"
              >
                cookies
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="faq-realkredit-beregner">
            <h2
              id="faq-realkredit-beregner"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Ofte stillede spørgsmål om realkreditlån beregner
            </h2>
            <div className="space-y-6 not-prose">
              {REALKREDITLAN_BEREGNER_FAQ.map((item) => (
                <div key={item.question}>
                  <h3 className="text-h3 text-text-primary mb-2">
                    {item.question}
                  </h3>
                  <p className="text-body text-text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-border bg-brand-background/50 p-4 text-small text-text-muted not-prose">
            <p className="m-0">
              Artiklen er vejledende og udgør ikke finansiel eller juridisk
              rådgivning. Kontakt bank eller realkreditinstitut for konkrete
              tilbud og vurdering af din situation.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
