import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { getArticleDates } from "@/lib/article-dates";
import { TVANGSAUKTIONER_FAQ } from "@/lib/artikel-faq/tvangsauktioner";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/tvangsauktioner";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema([...TVANGSAUKTIONER_FAQ]);

const title = "Tvangsauktioner: guide til muligheder og faldgruber";
const description =
  "Tvangsauktioner i Danmark: muligheder, risici og fogedret. Overblik over økonomi og finansiering – brug Boligklarhed til budget og beregning.";

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

export default function TvangsauktionerPage() {
  const articleSchema = getArticleSchema({
    title:
      "Tvangsauktioner: en guide til at forstå muligheder og faldgruber",
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
          Tvangsauktioner: en guide til at forstå muligheder og faldgruber
        </h1>
        <ArticleMeta {...dates} />

        <article className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Hos Boligklarhed hjælper vi dig med at navigere i boligmarkedets
            mange facetter. Tvangsauktioner kan virke som et komplekst område,
            men med den rette viden kan de også repræsentere en mulighed. Vores
            mål er at give dig gennemsigtighed og værktøjer til at træffe
            velinformerede beslutninger — uanset om du overvejer at købe på
            tvangsauktion, eller blot vil forstå processen bedre.
          </p>
          <p>
            En <strong className="text-text-primary">tvangsauktion</strong> er
            en offentlig auktion over fast ejendom, som afholdes af fogedretten.
            Det sker typisk, når en ejer ikke kan betale sine gældsforpligtelser,
            ofte{" "}
            <Link
              href="/artikler/realkreditlan"
              className="text-brand-primary underline hover:no-underline"
            >
              realkreditlån
            </Link>{" "}
            eller banklån, og den kreditor, der har pant i ejendommen, begærer
            den solgt for at inddække sit tab. For en potentiel køber kan det
            betyde en bolig til en pris under markedsniveau — men der er også
            risici og særlige forhold, du skal kende.
          </p>
          <p>
            I denne guide gennemgår vi, hvad en tvangsauktion indebærer,
            hvordan processen typisk forløber, og hvad du bør overveje før du
            byder. Vi tilbyder{" "}
            <strong className="text-text-primary">
              ikke juridisk eller finansiel rådgivning
            </strong>
            ; formålet er at klæde dig på med viden, så du kan bruge vores
            værktøjer til at vurdere den økonomiske side af en potentiel
            handel.
          </p>

          <section aria-labelledby="hvad-er-tvangsauktion">
            <h2
              id="hvad-er-tvangsauktion"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Hvad er en tvangsauktion — og hvorfor sælges boliger på
              tvangsauktion?
            </h2>
            <p>
              Essensen er, at en bolig sælges under tvang for at dække gæld.
              Kan du fx ikke betale ydelser på dit lån, kan realkreditinstituttet
              med pant i ejendommen på sigt begære salg på tvangsauktion for at
              få dækket det skyldige beløb. Det er en lovhjemlet mekanisme til at
              beskytte kreditorer.
            </p>
            <p>
              Boliger kommer på tvangsauktion af mange årsager: økonomiske
              vanskeligheder (arbejdsløshed, skilsmisse, sygdom), eller fx
              manglende betaling af{" "}
              <Link
                href="/artikler/grundskyld-og-ejendomsskat"
                className="text-brand-primary underline hover:no-underline"
              >
                ejendomsskat
              </Link>{" "}
              og andre krav, hvor kommunen kan begære tvangsauktion. Det er
              ofte{" "}
              <strong className="text-text-primary">sidste udvej</strong> efter
              længere sagsforløb, hvor der er forsøgt andre løsninger. Som
              køber handler det om at forstå mekanismerne, så du kan vurdere
              situationen objektivt. Overordnet om fogedret og processen kan du
              læse mere hos{" "}
              <a
                href="https://www.domstol.dk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Domstolene
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="fordele-ulemper">
            <h2
              id="fordele-ulemper"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Fordele og ulemper ved boligkøb på tvangsauktion
            </h2>
            <p>
              Det kan både være en god handel og en risikabel affære. Vej de
              potentielle fordele op mod ulemperne.
            </p>
            <h3 className="text-h3 text-text-primary pt-2">
              Fordele ved tvangsauktion
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">
                  Potentielt lavere pris:
                </strong>{" "}
                Mulighed for at købe under markedspris, fordi salget skal
                gennemføres effektivt og uden traditionel forhandling med
                sælger.
              </li>
              <li>
                <strong className="text-text-primary">
                  Ingen lang forhandling med sælger:
                </strong>{" "}
                Prisen afgøres i budrunden efter auktionens vilkår.
              </li>
            </ul>
            <h3 className="text-h3 text-text-primary pt-4">
              Ulemper og risici ved tvangsauktion
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">
                  Ingen fortrydelsesret:
                </strong>{" "}
                Når du har vundet bud og fået hammeren, er købet bindende —
                ikke som ved almindeligt køb med fortrydelsesret.
              </li>
              <li>
                <strong className="text-text-primary">
                  Du bærer risikoen for mangler:
                </strong>{" "}
                Typisk køber du «som beset» — med de fejl og mangler, der følger
                med, inden for rammerne af salgsopstilling og lovgivning.
              </li>
              <li>
                <strong className="text-text-primary">
                  Ingen ejerskifteforsikring som ved almindeligt køb:
                </strong>{" "}
                Læs mere om{" "}
                <Link
                  href="/artikler/ejerskifteforsikring"
                  className="text-brand-primary underline hover:no-underline"
                >
                  ejerskifteforsikring
                </Link>{" "}
                ved normale handler — på tvangsauktion er vilkårene anderledes.
              </li>
              <li>
                <strong className="text-text-primary">Korte frister:</strong>{" "}
                Til undersøgelse af ejendommen og finansiering.
              </li>
              <li>
                <strong className="text-text-primary">
                  Skjulte og ekstra udgifter:
                </strong>{" "}
                Udover auktionsbuddet kommer bl.a.{" "}
                <Link
                  href="/artikler/tinglysning"
                  className="text-brand-primary underline hover:no-underline"
                >
                  tinglysning
                </Link>
                , advokat, istandsættelse og{" "}
                <Link
                  href="/artikler/vedligehold"
                  className="text-brand-primary underline hover:no-underline"
                >
                  vedligehold
                </Link>
                . Brug vores{" "}
                <Link
                  href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                  className="text-brand-primary underline hover:no-underline"
                >
                  boligomkostningsberegner
                </Link>{" "}
                til et realistisk overblik.
              </li>
              <li>
                <strong className="text-text-primary">Beboere:</strong> Hvis
                ejendommen er beboet, kan udsmidning eller fraflytning blive din
                opgave som ny ejer — et forhold du bør afklare juridisk.
              </li>
            </ul>
          </section>

          <section aria-labelledby="proces-tvangsauktion">
            <h2
              id="proces-tvangsauktion"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Proces: sådan forløber en tvangsauktion typisk
            </h2>
            <p>
              Processen er reguleret ved lov og foregår i fogedretten. De
              typiske trin er:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Begæring:</strong> En
                kreditor med pant indgiver begæring om tvangsauktion.
              </li>
              <li>
                <strong className="text-text-primary">
                  Sagsbehandling:
                </strong>{" "}
                Fogedretten behandler sagen, og der fastsættes dato for
                auktionen.
              </li>
              <li>
                <strong className="text-text-primary">Annoncering:</strong>{" "}
                Auktionen kunngøres bl.a. i{" "}
                <a
                  href="https://www.statstidende.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline hover:no-underline"
                >
                  Statstidende
                </a>
                , i medier og på relevante portaler.
              </li>
              <li>
                <strong className="text-text-primary">
                  Salgsopstilling og besigtigelse:
                </strong>{" "}
                Der udarbejdes oplysninger om ejendommen (herunder tekniske
                forhold, servitutter, gæld). Benyt besigtigelse — eventuelt med
                byggesagkyndig.
              </li>
              <li>
                <strong className="text-text-primary">Auktion:</strong>{" "}
                Tvangsauktionen afholdes i fogedretten; der kan være regler om
                første og eventuelt anden auktion, afhængigt af sagen og bud.
              </li>
              <li>
                <strong className="text-text-primary">Bud og overtagelse:</strong>{" "}
                Den vindende byder betaler efter vilkår, og der følger skridt
                mod overtagelse — med omkostninger til bl.a. tinglysning.
              </li>
            </ol>
            <p>
              Detaljer varierer fra sag til sag; søg altid{" "}
              <strong className="text-text-primary">advokatbistand</strong> ved
              konkret køb.
            </p>
          </section>

          <section aria-labelledby="oekonomi-tvangsauktion">
            <h2
              id="oekonomi-tvangsauktion"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Økonomi, omkostninger og finansiering ved tvangsauktion
            </h2>
            <p>
              Det er mere end selve auktionsbuddet: du skal have finansiering på
              plads, kende{" "}
              <Link
                href="/artikler/sammenligning-af-laanetyper"
                className="text-brand-primary underline hover:no-underline"
              >
                realkredit og banklån
              </Link>
              , og et realistisk billede af engangs- og løbende omkostninger.
              Banken kan være forsigtig ved finansiering af tvangsauktioner
              netop pga. risiko og manglende ejerskifteforsikring. Traditionelt
              kræves typisk mindst ca. 5 % udbetaling; realkredit kan dække op
              til ca. 80 % af købsprisen efter gældende regler — resten ofte som
              banklån med kortere løbetid.
            </p>
            <p>
              Læs mere om{" "}
              <Link
                href="/artikler/tinglysning"
                className="text-brand-primary underline hover:no-underline"
              >
                tinglysningsafgifter
              </Link>{" "}
              og aktuelle satser hos{" "}
              <a
                href="https://skat.dk/erhverv/afgifter-paa-varer-og-ydelser-punktafgifter/nyhedsbrev-afgifter/tinglysningsafgift-ny-afgiftssats-pr-1-januar-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Skattestyrelsen
              </a>
              . Budgetter med{" "}
              <Link
                href="/artikler/vedligehold"
                className="text-brand-primary underline hover:no-underline"
              >
                vedligehold
              </Link>{" "}
              (fx ca. 1,5 % af købspris pr. år for hus og 1 % for lejlighed) kan
              for ejendomme fra tvangsauktion være højere, hvis standen er
              svag.
            </p>

            <div className="overflow-x-auto rounded-md border border-border my-4 not-prose">
              <table className="w-full text-left text-small md:text-body">
                <caption className="sr-only">
                  Oversigt over typiske omkostninger ved køb på tvangsauktion
                </caption>
                <thead>
                  <tr className="border-b border-border bg-brand-surface">
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Omkostningstype
                    </th>
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Type
                    </th>
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Vejledende beløb/andel
                    </th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Auktionsbud</td>
                    <td className="py-2 px-3">Engangsudgift</td>
                    <td className="py-2 px-3">Varierer (dit bud)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Tinglysningsafgift</td>
                    <td className="py-2 px-3">Engangsudgift</td>
                    <td className="py-2 px-3">Fast del + variabel del af køb</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Advokathjælp</td>
                    <td className="py-2 px-3">Engangsudgift</td>
                    <td className="py-2 px-3">Varierer</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Istandsættelse</td>
                    <td className="py-2 px-3">Engangsudgift</td>
                    <td className="py-2 px-3">Meget varierende</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Vedligehold (årligt)</td>
                    <td className="py-2 px-3">Løbende</td>
                    <td className="py-2 px-3">Ofte ca. 1–1,5 % af købspris</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Ejendomsskat m.m.</td>
                    <td className="py-2 px-3">Løbende</td>
                    <td className="py-2 px-3">Afhænger af ejendom</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Forsikringer</td>
                    <td className="py-2 px-3">Løbende</td>
                    <td className="py-2 px-3">Hus + indbo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Med{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary underline hover:no-underline"
              >
                boligomkostningsberegneren
              </Link>{" "}
              får du et hurtigt, vejledende overblik over mange poster for en
              given pris og finansiering. Resultaterne erstatter ikke bank eller
              rådgiver.
            </p>
          </section>

          <section aria-labelledby="boligklarhed-vaerktoejer">
            <h2
              id="boligklarhed-vaerktoejer"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Brug Boligklarheds beregnere ved tvangsauktion
            </h2>
            <p>
              De økonomiske principper ligner et almindeligt køb: samlede
              omkostninger, ydelser og løbende budget.
            </p>
            <h3 className="text-h3 text-text-primary pt-2">
              Boligomkostningsberegner
            </h3>
            <p>
              Brug{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary underline hover:no-underline"
              >
                boligomkostningsberegneren
              </Link>{" "}
              til at estimere månedlige ydelser (realkredit og bankdel),{" "}
              <Link
                href="/artikler/elforbrug-husstand"
                className="text-brand-primary underline hover:no-underline"
              >
                el-estimat
              </Link>
              ,{" "}
              <Link
                href="/artikler/ejerudgifter"
                className="text-brand-primary underline hover:no-underline"
              >
                ejerudgifter
              </Link>
              , vedligehold og engangsomkostninger som tinglysning. Du kan
              afprøve rentescenarier og se rentetest (+1 % / +2 %). Beregningen
              kører i din browser; du skal ikke oprette konto.
            </p>
            <p>
              Bemærk: Ved tvangsauktion kan du normalt{" "}
              <strong className="text-text-primary">ikke</strong> tegne
              ejerskifteforsikring som ved almindeligt køb — indtastning af
              ejerskifte i beregneren er derfor ikke relevant på samme måde.
            </p>
            <h3 className="text-h3 text-text-primary pt-4">
              Beregner: Hvad kan jeg købe bolig for?
            </h3>
            <p>
              Før du byder, er det fornuftigt at kende dit cirka-lånerum.{" "}
              <Link
                href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                className="text-brand-primary underline hover:no-underline"
              >
                Beregneren «Hvad kan jeg købe bolig for?»
              </Link>{" "}
              giver et vejledende skøn ud fra indtægt og gæld — suppleret af
              bankens egen kreditvurdering, når du skal have tilsagn.
            </p>
            <h3 className="text-h3 text-text-primary pt-4">
              Artikler og begreber om boligøkonomi
            </h3>
            <p>
              I{" "}
              <Link href="/artikler" className="text-brand-primary underline hover:no-underline">
                artikelsektionen
              </Link>{" "}
              og under{" "}
              <Link
                href="/boligbegreber"
                className="text-brand-primary underline hover:no-underline"
              >
                boligbegreber
              </Link>{" "}
              finder du forklaringer på finansiering, vedligehold, forsikring og
              mere — relevant uanset om købet sker på tvangsauktion eller
              ordinært.
            </p>
          </section>

          <section aria-labelledby="raad-foer-bud">
            <h2
              id="raad-foer-bud"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Råd før du byder på tvangsauktion
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Læs salgsopstilling og vilkår grundigt (gæld, hæftelser,
                servitutter).
              </li>
              <li>
                Besigtig ejendommen; overvej byggesagkyndig med til
                besigtigelsen.
              </li>
              <li>
                Indhent skriftligt finansieringstilsagn fra banken før bud.
              </li>
              <li>
                Sæt et maksimumbud på forhold, der inkluderer alle omkostninger —
                ikke kun auktionsprisen.
              </li>
              <li>
                Overvej advokat med erfaring i tvangsauktioner til dokumenter og
                auktion.
              </li>
              <li>Forstå auktionens konkrete vilkår fuldt ud før du byder.</li>
            </ul>
            <p>
              Køb på tvangsauktion kræver omhu og realistiske forventninger til
              både pris og risiko. Brug Boligklarhed til overblik over
              budgettet — og professionelle rådgivere til det juridiske.
            </p>
          </section>

          <section aria-labelledby="faq-tvangsauktion">
            <h2
              id="faq-tvangsauktion"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Ofte stillede spørgsmål om tvangsauktion
            </h2>
            <div className="space-y-6 not-prose">
              {TVANGSAUKTIONER_FAQ.map((item) => (
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

          <section className="rounded-md border border-border bg-brand-background/50 p-4 text-small text-text-muted">
            <p className="m-0">
              Artiklen er vejledende og udgør ikke juridisk eller finansiel
              rådgivning. Søg altid professionel rådgivning ved konkrete
              tvangsauktioner og dokumenter.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
