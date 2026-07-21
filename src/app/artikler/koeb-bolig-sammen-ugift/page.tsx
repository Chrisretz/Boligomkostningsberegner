import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleDates } from "@/lib/article-dates";
import { KOEB_BOLIG_SAMMEN_UGIFT_FAQ } from "@/lib/artikel-faq/koeb-bolig-sammen-ugift";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";
import { PartnerCta } from "@/components/PartnerCta";

const ARTICLE_PATH = "/artikler/koeb-bolig-sammen-ugift";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(KOEB_BOLIG_SAMMEN_UGIFT_FAQ);

const title = "Køb bolig sammen som ugifte: det skal I have styr på";
const description =
  "Ugifte samlevende arver ikke hinanden. Få styr på samejeoverenskomst, gældsbrev, testamente og forsikring, før I køber bolig sammen.";

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

export default function KoebBoligSammenUgiftPage() {
  const articleSchema = getArticleSchema({
    title,
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
            ← Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-3">
          Køb bolig sammen som ugifte: det skal I have styr på
        </h1>
        <ArticleMeta {...dates} path={ARTICLE_PATH} />

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Hvert år køber tusindvis af danske par bolig sammen uden at være
            gift. Det er både almindeligt og uproblematisk, så længe alt går
            godt. Problemet opstår, når noget ændrer sig: I går fra hinanden,
            den ene dør, eller den ene vil sælge, mens den anden vil blive
            boende. Her opdager mange, at loven behandler ugifte samlevende helt
            anderledes end ægtefæller.
          </p>
          <p>
            Denne guide gennemgår de fire ting, I bør have på plads, før I
            skriver under: samejeoverenskomsten, gældsbrevet, testamentet og
            forsikringerne. Det tager typisk nogle få timer og koster en brøkdel
            af, hvad en konflikt senere ville koste.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Den vigtigste forskel: I arver ikke hinanden
            </h2>
            <p>
              Som ugifte samlevende har I{" "}
              <strong className="text-text-primary">ingen arveret</strong> efter
              hinanden. Det gælder, uanset om I har boet sammen i to eller tyve
              år, og uanset om I ejer boligen sammen. Dør den ene, går dennes
              andel af boligen til afdødes børn eller øvrige slægtninge, ikke
              til partneren.
            </p>
            <p>
              Konsekvensen kan være hård: Den efterladte ejer nu bolig sammen
              med afdødes arvinger og kan i værste fald blive tvunget til at
              sælge for at betale dem deres andel. Ægtefæller er derimod
              beskyttet af arveloven og kan ofte sidde i uskiftet bo.
            </p>
            <p>
              Løsningen er et testamente. Ugifte samlevende kan desuden oprette
              et såkaldt udvidet samlevertestamente, der stiller jer tættere på
              ægtefællers position arvemæssigt. Det kræver blandt andet, at I
              har boet sammen i mindst to år, venter barn eller har fælles barn.
              Reglerne har flere betingelser, end der er plads til her, så
              undersøg dem hos en advokat eller på{" "}
              <a
                href="https://www.borger.dk/familie-og-boern/arv-og-testamente"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Borger.dk om arv og testamente
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Samejeoverenskomsten: jeres vigtigste aftale
            </h2>
            <p>
              En samejeoverenskomst er en skriftlig aftale om, hvordan I ejer
              boligen, og hvad der sker, hvis I går fra hinanden. Den er ikke
              lovpligtig, men den er den enkeltstående aftale, der forebygger
              flest konflikter. Uden den står I med to modstridende hukommelser
              om, hvad I egentlig aftalte for fem år siden.
            </p>
            <p>En brugbar samejeoverenskomst tager typisk stilling til:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Ejerandele.</strong> Ejer
                I 50/50, eller afspejler fordelingen, at den ene har lagt mere i
                udbetaling?
              </li>
              <li>
                <strong className="text-text-primary">
                  Fordeling af udgifter.
                </strong>{" "}
                Hvem betaler hvad af ydelse, ejerudgifter, forsikring og
                vedligehold, og hvordan håndteres større renoveringer?
              </li>
              <li>
                <strong className="text-text-primary">Brud.</strong> Hvem har
                ret til at blive boende, og hvor lang tid har den anden til at
                flytte?
              </li>
              <li>
                <strong className="text-text-primary">Udkøb.</strong> Hvordan
                værdiansættes boligen, hvis den ene skal købe den anden ud? Ofte
                aftales et gennemsnit af to eller tre mæglervurderinger.
              </li>
              <li>
                <strong className="text-text-primary">Salg.</strong> Hvad sker
                der, hvis ingen af jer kan eller vil overtage boligen alene?
              </li>
            </ul>
            <p>
              Vær særligt konkret omkring værdiansættelsen. Det er dér, de
              fleste konflikter opstår, fordi den, der skal købes ud, naturligt
              ønsker en høj vurdering, mens den, der bliver boende, ønsker en
              lav.
            </p>
          </section>

          <PartnerCta
            partnerSlug="boligvurdering"
            heading="Få et uafhængigt skøn over boligens værdi"
            body="Skal den ene købe den anden ud, er en uafhængig vurdering et godt udgangspunkt for forhandlingen. Valuea.dk sender en gratis og uforpligtende vurderingsrapport."
            buttonLabel="Få en gratis vurderingsrapport"
            placement="artikel-koeb-bolig-sammen-ugift"
          />

          <section>
            <h2 className="text-h3 text-text-primary">
              Gældsbrev: når I ikke lægger lige meget
            </h2>
            <p>
              Det er almindeligt, at den ene har sparet mere op end den anden.
              Måske lægger den ene 400.000 kr i udbetaling, mens den anden
              lægger 100.000 kr. Her har I grundlæggende to muligheder.
            </p>
            <p>
              <strong className="text-text-primary">Skæve ejerandele:</strong> I
              ejer boligen i forholdet 80/20 eller en anden fordeling, der
              afspejler indskuddet. Fordelen er, at forskellen automatisk følger
              boligens værdiudvikling. Ulempen er, at fordelingen kan føles
              skæv, hvis I efterfølgende betaler lige meget af på lånet i mange
              år.
            </p>
            <p>
              <strong className="text-text-primary">Gældsbrev:</strong> I ejer
              50/50, og den ene udsteder et gældsbrev på forskellen, altså
              150.000 kr i eksemplet ovenfor. Beløbet betales tilbage ved salg
              eller brud. Fordelen er, at ejerskabet er enkelt; ulempen er, at
              beløbet typisk ikke stiger med boligens værdi, medmindre I
              aftaler det.
            </p>
            <p>
              Der er ikke ét rigtigt valg. Det vigtige er, at I vælger bevidst,
              skriver det ned og forstår konsekvensen af begge modeller. Husk
              også at forholde jer til, hvad der sker, hvis den ene senere
              betaler for en større renovering alene.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Forsikring: hvem betaler ydelsen, hvis noget sker?
            </h2>
            <p>
              To lønninger bærer typisk boligydelsen. Falder den ene væk på
              grund af sygdom eller dødsfald, står den anden alene med en udgift,
              der var beregnet til to. Overvej derfor, om I har brug for en
              livsforsikring, der dækker restgælden, og se på, hvad I allerede
              har via arbejdsgiver eller pensionsordning. Mange har mere dækning,
              end de tror, men beløbet passer sjældent til den konkrete gæld.
            </p>
            <p>
              Husk desuden den almindelige{" "}
              <Link
                href="/artikler/indboforsikring"
                className="text-brand-primary underline hover:no-underline"
              >
                indboforsikring
              </Link>{" "}
              og, ved køb af hus,{" "}
              <Link
                href="/artikler/ejerskifteforsikring"
                className="text-brand-primary underline hover:no-underline"
              >
                ejerskifteforsikring
              </Link>
              . Begge dele hører til de løbende udgifter, I bør have med i
              budgettet fra start.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Sådan kommer I i gang
            </h2>
            <p>
              Rækkefølgen er enkel. Beregn først, hvad boligen reelt koster jer
              hver måned, så I ved, hvad I går ind til. Aftal dernæst
              ejerandele og udgiftsfordeling, og få det skrevet ned i en
              samejeoverenskomst. Opret til sidst testamente, og tag stilling til
              forsikringsdækningen.
            </p>
            <p>
              Brug{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary underline hover:no-underline"
              >
                boligomkostningsberegneren
              </Link>{" "}
              til at se den samlede månedlige udgift inklusive bidrag,
              ejendomsskat og vedligehold, og{" "}
              <Link
                href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                className="text-brand-primary underline hover:no-underline"
              >
                lånerumsberegneren
              </Link>{" "}
              til at få et pejlemærke for, hvor meget I samlet kan låne.
            </p>
            <p>
              Denne artikel er generel information og ikke juridisk rådgivning.
              Ved børn fra tidligere forhold, selvstændig virksomhed eller
              væsentligt forskellige økonomiske bidrag bør I tale med en
              advokat om jeres konkrete situation.
            </p>
          </section>

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-h3 text-text-primary">
              Ofte stillede spørgsmål
            </h2>
            <ul className="not-prose space-y-3 mt-4">
              {KOEB_BOLIG_SAMMEN_UGIFT_FAQ.map((item) => (
                <li key={item.question}>
                  <details className="group rounded-md border border-border bg-brand-surface px-4 py-3 shadow-soft">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                      <span className="text-body font-semibold text-text-primary">
                        {item.question}
                      </span>
                      <span className="text-xl text-text-muted group-open:hidden">
                        +
                      </span>
                      <span className="text-xl text-text-muted hidden group-open:inline">
                        −
                      </span>
                    </summary>
                    <p className="mt-2 text-body text-text-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
