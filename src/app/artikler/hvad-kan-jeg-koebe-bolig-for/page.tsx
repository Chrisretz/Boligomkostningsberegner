import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
  PATH_KONTAKT,
} from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleDates } from "@/lib/article-dates";
import { HVAD_KAN_JEG_KOEBE_FAQ } from "@/lib/artikel-faq/hvad-kan-jeg-koebe-bolig-for";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/hvad-kan-jeg-koebe-bolig-for";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(HVAD_KAN_JEG_KOEBE_FAQ);

const title = "Hvad kan jeg købe bolig for? Få klarhed over dit budget i 2026";
const description =
  "Hvad kan jeg købe bolig for i 2026? Få overblik over indkomst, gæld, udbetaling, rådighedsbeløb, ejerudgifter og månedlig boligudgift – og test din købspris.";
const ogDescription =
  "Indkomst, gæld, udbetaling, rådighedsbeløb og ejerudgifter – sådan finder du ud af, hvad du kan købe bolig for i 2026.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(ARTICLE_PATH) },
  ...socialMetadata({
    path: ARTICLE_PATH,
    title,
    description: ogDescription,
  }),
};

export default function HvadKanJegKoebeBoligForPage() {
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
          Hvad kan jeg købe bolig for? Få klarhed over dit budget i 2026
        </h1>
        <ArticleMeta {...dates} />

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            At drømme om en ny bolig er spændende, men spørgsmålet{" "}
            <strong className="text-text-primary">
              &quot;hvad kan jeg købe bolig for?&quot;
            </strong>{" "}
            kan virke overvældende. Hos Boligklarhed forstår vi, at det er et af
            de første og vigtigste spørgsmål, du stiller dig selv, når
            boligdrømmen melder sig. Det handler om at skabe balance mellem dine
            drømme og din økonomiske virkelighed – og det er her, vi giver dig
            værktøjer og overblik, så du kan tage informerede beslutninger.
          </p>
          <p>
            Vi har bygget en gratis online{" "}
            <Link
              href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
              className="text-brand-primary font-medium underline hover:no-underline"
            >
              beregner til lånerum og købspris
            </Link>
            , der tager udgangspunkt i din indkomst, din gæld og din udbetaling
            og giver dig et realistisk billede af, hvor meget du kan låne, og
            hvad den maksimale købspris kan være. Et godt supplement om,
            hvordan indtægt, gæld og bankens regler hænger sammen, finder du i{" "}
            <a
              href="https://www.bolius.dk/saa-dyr-en-bolig-har-du-raad-til-at-koebe-3580"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary underline hover:no-underline"
            >
              Bolius&apos; artikel om råd til boligkøb
            </a>
            .
          </p>

          <section aria-labelledby="bankens-vurdering-heading">
            <h2
              id="bankens-vurdering-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Forstå bankens vurdering: hvad kan jeg købe bolig for?
            </h2>
            <p>
              Når en bank skal vurdere, hvor meget du kan låne til en bolig,
              ser de på en række faktorer. Det handler ikke kun om din
              nuværende indkomst, men om din samlede økonomiske stabilitet,
              gæld og evne til at afbetale lånet over tid. Kort sagt vurderer
              de din <strong>kreditværdighed</strong>. Finanstilsynet har i sin{" "}
              <a
                href="https://www.finanstilsynet.dk/nyheder-og-presse/nyheder-og-pressemeddelelser/2025/nov/ny-vejledning-tydeliggoer-fleksibilitet-i-kreditvaerdighedsvurderingen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                vejledning om kreditværdighedsvurdering
              </a>{" "}
              gjort det klart, at vurderingen skal være konkret og individuel –
              du er ikke bare et nummer i en formel.
            </p>

            <h3 className="text-h3 text-text-primary mt-6">
              Hvad kigger banken på, når de vurderer dit boliglån?
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Din indkomst:</strong>{" "}
                Både din og din eventuelle partners samlede husstandsindkomst
                er afgørende. En højere stabil indkomst giver typisk mulighed
                for at købe bolig for et højere beløb.
              </li>
              <li>
                <strong className="text-text-primary">Din gæld:</strong>{" "}
                Eksisterende gæld som SU-lån, billån eller forbrugslån
                reducerer dit rådighedsbeløb og dermed det beløb, du kan låne
                til bolig.
              </li>
              <li>
                <strong className="text-text-primary">Din udbetaling:</strong>{" "}
                Du skal som minimum selv kunne finansiere 5 % af boligens
                købspris kontant. En større udbetaling mindsker dit lånebehov
                og kan give dig bedre lånebetingelser.
              </li>
              <li>
                <strong className="text-text-primary">Dit rådighedsbeløb:</strong>{" "}
                Efter alle faste udgifter er betalt, vurderer banken, hvor
                mange penge du har tilbage til forbrug. Der er typisk
                minimumskrav, der stiger med antallet af voksne og børn i
                husstanden.
              </li>
              <li>
                <strong className="text-text-primary">Ejendommens værdi:</strong>{" "}
                Banken vurderer også den specifikke boligs værdi for at sikre,
                at lånet står i rimeligt forhold til pantet i ejendommen.
              </li>
              <li>
                <strong className="text-text-primary">Fremtidig økonomi:</strong>{" "}
                Jobsikkerhed, branche og fremtidige indkomstmuligheder kan også
                indgå i vurderingen.
              </li>
            </ul>
            <p>
              Faktorerne spiller sammen, og banken laver en helhedsvurdering. I
              vores artikel om{" "}
              <Link
                href="/artikler/saadan-vurderer-banken-dit-boliglan"
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                hvordan banken vurderer dit boliglån
              </Link>{" "}
              uddyber vi gældsfaktor, rådighedsbeløb og kreditvurdering – så du
              ved, hvad du går ind til, når du tager mødet i banken.
            </p>
          </section>

          <section aria-labelledby="opsparing-udbetaling-heading">
            <h2
              id="opsparing-udbetaling-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Din opsparing og udbetaling: en nøglefaktor
            </h2>
            <p>
              En solid opsparing er afgørende, når du skal købe bolig. Som
              nævnt er der krav om en{" "}
              <strong className="text-text-primary">
                minimumsudbetaling på 5 %
              </strong>{" "}
              af købsprisen. Den skal komme fra dine egne midler og kan ikke
              lånes via realkreditlån eller banklån. Jo mere du selv kan lægge,
              desto mindre skal du låne, hvilket sparer dig for renteudgifter
              og giver dig en stærkere forhandlingsposition.
            </p>
            <p>
              Udover selve udbetalingen skal du også medregne engangsomkostninger
              til{" "}
              <Link
                href="/artikler/tinglysning"
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                tinglysning af skøde og pant
              </Link>{" "}
              samt en eventuel{" "}
              <Link
                href="/artikler/ejerskifteforsikring"
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                ejerskifteforsikring
              </Link>
              . De kan løbe op i titusindvis af kroner og indgår normalt ikke i
              bankens lånevurdering – så du skal selv lægge pengene ved
              overtagelsen.
            </p>

            <h3
              id="udbetaling-tabel"
              className="text-h3 text-text-primary mt-6 mb-3"
            >
              Sådan påvirker udbetaling dit lånebehov
            </h3>
            <p>
              Realkreditlånet er begrænset til 80 % af ejendommens værdi, og
              banklånet dækker typisk de resterende 15 %. De første 5 % skal du
              selv lægge:
            </p>
            <div className="overflow-x-auto rounded-md border border-border my-4 not-prose">
              <table className="w-full text-left text-small md:text-body">
                <caption className="sr-only">
                  Tabel: Boligpris, minimumsudbetaling 5 %, maksimalt
                  realkreditlån 80 % og restbehov til banklån.
                </caption>
                <thead>
                  <tr className="border-b border-border bg-brand-surface">
                    <th
                      scope="col"
                      className="py-2 px-3 font-semibold text-text-primary"
                    >
                      Boligpris
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3 font-semibold text-text-primary"
                    >
                      Min. udbetaling (5 %)
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3 font-semibold text-text-primary"
                    >
                      Max. realkreditlån (80 %)
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3 font-semibold text-text-primary"
                    >
                      Restbehov (banklån)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">2.000.000 kr.</td>
                    <td className="py-2 px-3">100.000 kr.</td>
                    <td className="py-2 px-3">1.600.000 kr.</td>
                    <td className="py-2 px-3">300.000 kr.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">3.000.000 kr.</td>
                    <td className="py-2 px-3">150.000 kr.</td>
                    <td className="py-2 px-3">2.400.000 kr.</td>
                    <td className="py-2 px-3">450.000 kr.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">4.000.000 kr.</td>
                    <td className="py-2 px-3">200.000 kr.</td>
                    <td className="py-2 px-3">3.200.000 kr.</td>
                    <td className="py-2 px-3">600.000 kr.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Vil du nørde med, hvordan banklånet, realkreditlånet og
              afdragsfrihed påvirker hinanden? Læs vores guide til{" "}
              <Link
                href="/artikler/sammenligning-af-laanetyper"
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                lånetyper: realkredit, banklån og afdragsfrihed
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="indkomst-gaeldsfaktor-heading">
            <h2
              id="indkomst-gaeldsfaktor-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Hvor stor en del af din indkomst kan gå til bolig?
            </h2>
            <p>
              En tommelfingerregel blandt banker er, at dit samlede boliglån
              (realkreditlån og banklån) ikke bør overstige{" "}
              <strong className="text-text-primary">
                4–5 gange din husstands årlige bruttoindkomst
              </strong>{" "}
              før skat. Det kaldes <strong>gældsfaktoren</strong> og bruges til
              at vurdere, hvor stor en gæld du kan servicere. Har I fx en
              samlet årlig indtægt på 600.000 kr., ligger lånerummet typisk
              omkring 2,4–3 mio. kr.
            </p>
            <p>
              Husk, at det er en tommelfingerregel. Banken vægter også gæld,
              faste udgifter og rådighedsbeløb, og den endelige vurdering er
              individuel. Derfor er vores beregner{" "}
              <Link
                href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                &quot;Hvad kan jeg købe bolig for?&quot;
              </Link>{" "}
              værdifuld – den giver dig et mere præcist estimat baseret på
              dine egne tal og viser lånerum ved gearing 3,5–5.
            </p>
          </section>

          <section aria-labelledby="raadighedsbeloeb-heading">
            <h2
              id="raadighedsbeloeb-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Faste udgifter og rådighedsbeløb: hvad har det af betydning?
            </h2>
            <p>
              Udover lånebeløbet er det dit månedlige rådighedsbeløb, der i høj
              grad afgør, hvad du reelt kan købe bolig for. Banken vil sikre
              sig, at du har penge tilbage til mad, tøj, fornøjelser og
              uforudsete udgifter, når alle dine faste udgifter – inklusive de
              nye boligudgifter – er betalt.
            </p>

            <h3 className="text-h3 text-text-primary mt-6">
              Typiske faste udgifter ved at eje bolig
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Afdrag og renter på{" "}
                <Link
                  href="/artikler/realkreditlan"
                  className="text-brand-primary font-medium underline hover:no-underline"
                >
                  realkreditlån
                </Link>{" "}
                og banklån
              </li>
              <li>
                <Link
                  href="/artikler/ejerudgifter"
                  className="text-brand-primary font-medium underline hover:no-underline"
                >
                  Ejerudgifter
                </Link>
                : grundskyld, ejendomsværdiskat og fællesudgifter i
                ejerlejlighed (læs mere om{" "}
                <Link
                  href="/artikler/grundskyld-og-ejendomsskat"
                  className="text-brand-primary font-medium underline hover:no-underline"
                >
                  grundskyld og ejendomsskat
                </Link>
                )
              </li>
              <li>
                Forsikringer: husforsikring, ejerskifteforsikring og{" "}
                <Link
                  href="/artikler/indboforsikring"
                  className="text-brand-primary font-medium underline hover:no-underline"
                >
                  indboforsikring
                </Link>
              </li>
              <li>
                Forbrug: el, vand, varme og renovation – se vores artikel om{" "}
                <Link
                  href="/artikler/elforbrug-husstand"
                  className="text-brand-primary font-medium underline hover:no-underline"
                >
                  elforbrug i husstanden
                </Link>{" "}
                for realistiske tal
              </li>
              <li>Transport (bil, offentlig transport)</li>
              <li>Internet, mobil og streamingtjenester</li>
              <li>
                <Link
                  href="/artikler/vedligehold"
                  className="text-brand-primary font-medium underline hover:no-underline"
                >
                  Vedligehold af boligen
                </Link>{" "}
                – som tommelfingerregel sætter vi 1,5 % af købsprisen pr. år af
                til hus og 1,0 % til lejlighed
              </li>
            </ul>
            <p>
              Vores{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                boligomkostningsberegner
              </Link>{" "}
              hjælper dig med at samle alle disse løbende udgifter, så du får et
              komplet billede af, hvad det koster at bo i drømmeboligen.
              Vedligehold er en ofte overset post – tager du den med fra start,
              undgår du de ubehagelige overraskelser senere.
            </p>
          </section>

          <section aria-labelledby="beregn-koebspris-heading">
            <h2
              id="beregn-koebspris-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Beregn hvad du kan købe bolig for med Boligklarhed
            </h2>
            <p>
              Hos Boligklarhed har vi gjort det nemt at få et realistisk
              billede af, hvad du kan købe bolig for. Vores beregnere er gratis,
              kræver hverken oprettelse eller login, og dine indtastede data
              gemmes aldrig på vores servere – alle beregninger kører direkte i
              din egen browser. Du får et anonymt og uforpligtende overslag,
              som er et solidt grundlag for dine boligdrømme.
            </p>

            <h3 className="text-h3 text-text-primary mt-6">
              Hvad tager beregneren højde for?
            </h3>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Din bruttoindkomst (årlig eller månedlig)</li>
              <li>Din eksisterende gæld (SU-lån, billån, forbrugslån m.m.)</li>
              <li>Din opsparing til udbetaling</li>
              <li>Antal personer i husstanden</li>
              <li>Sammensætningen af realkreditlån og banklån</li>
            </ol>
            <p>
              Vi tager udgangspunkt i de gængse satser og regler, som bankerne
              også anvender, for at give dig et så retvisende resultat som
              muligt. Beregneren giver et øjebliksbillede af din økonomi og
              estimerer både lånerum og maksimal købspris for hus eller
              ejerlejlighed.
            </p>
            <p>
              Resultaterne er vejledende – den endelige vurdering kommer altid
              fra din bank. Men det giver dig{" "}
              <strong className="text-text-primary">klarhed</strong>, så du er
              langt bedre forberedt til samtalen med din rådgiver.
            </p>
          </section>

          <section aria-labelledby="stress-test-heading">
            <h2
              id="stress-test-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Stress-test din økonomi: er du klar til at købe bolig?
            </h2>
            <p>
              Udover at vise, hvad du kan købe bolig for under nuværende
              forhold, kan du også{" "}
              <strong className="text-text-primary">stress-teste</strong> din
              økonomi i vores boligomkostningsberegner. Du kan se, hvordan dit
              månedlige budget bliver påvirket, hvis renten stiger med fx 1 %
              eller 2 %. Det er et uvurderligt værktøj til at vurdere din
              økonomiske robusthed og sikre, at du kan bære udgifterne, selv
              hvis renten flytter sig.
            </p>
            <p>
              En boliginvestering er en langvarig forpligtelse, og det er
              klogt at tænke fremad. Forstår du din økonomis sårbarhed over
              for renteændringer, kan du roligere vælge et låneprodukt, der
              passer til din risikoprofil.
            </p>
          </section>

          <section aria-labelledby="boligjagt-heading">
            <h2
              id="boligjagt-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Start din boligjagt med Boligklarhed
            </h2>
            <p>
              Vi tror på, at viden og overblik er nøglen til en god
              bolighandel. Ved at bruge vores gratis beregnere og artikler –
              som vi opdaterer løbende i 2026 – kan du hurtigt få svar på
              spørgsmålet &quot;hvad kan jeg købe bolig for?&quot; og mange
              andre. Er det første gang, du er tæt på et boligkøb, så start
              også med vores guide til{" "}
              <Link
                href="/artikler/boligkoeb-foerste-gang"
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                boligkøb første gang
              </Link>
              .
            </p>
            <p>
              Boligklarhed er din partner i boligdrømmen. Vi tilbyder hverken
              finansiel eller juridisk rådgivning, men giver dig værktøjer og
              information, så du kan tage kontrol over din boligøkonomi.
              Spørgsmål til beregnerne eller artiklerne? Skriv til os på{" "}
              <Link
                href={PATH_KONTAKT}
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                vores kontaktside
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="faq-hvad-kan-jeg-koebe-heading">
            <h2
              id="faq-hvad-kan-jeg-koebe-heading"
              className="text-h2 text-text-primary mb-4"
            >
              Ofte stillede spørgsmål om at købe bolig
            </h2>
            <div className="space-y-5">
              {HVAD_KAN_JEG_KOEBE_FAQ.map((item) => (
                <div key={item.question}>
                  <h3 className="text-h3 text-text-primary mb-2">
                    {item.question}
                  </h3>
                  <p className="text-body text-text-secondary">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="opsummering-heading">
            <h2
              id="opsummering-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Opsummering: sådan finder du svaret på &quot;hvad kan jeg købe
              bolig for?&quot;
            </h2>
            <p>
              &quot;Hvad kan jeg købe bolig for?&quot; afhænger af din indkomst,
              gæld, udbetaling, gældsfaktor og rådighedsbeløb – og af den
              reelle månedlige boligudgift, når du lægger ydelse, ejerudgifter
              og vedligehold sammen. Brug vores{" "}
              <Link
                href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                beregner til lånerum
              </Link>{" "}
              til at få et bud på din maksimale købspris, og brug{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                boligomkostningsberegneren
              </Link>{" "}
              til at se den månedlige totalomkostning og stress-teste renten.
              Så er du godt rustet til mødet med banken – og til en boligpris,
              der reelt passer til din økonomi.
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
