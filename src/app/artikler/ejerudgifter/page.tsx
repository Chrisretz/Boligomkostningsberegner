import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleDates } from "@/lib/article-dates";
import { EJERUDGIFTER_FAQ } from "@/lib/artikel-faq/ejerudgifter";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/ejerudgifter";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(EJERUDGIFTER_FAQ);

const title = "Hvad dækker ejerudgifter? Komplet guide til boligejere";
const description =
  "Ejerudgifter forklaret: grundskyld, ejendomsværdiskat, ejerforeningsbidrag, forsikring og hvad der ikke er ejerudgifter. Sammenlign hus og lejlighed og brug boligomkostningsberegneren.";

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

export default function EjerudgifterPage() {
  const articleSchema = getArticleSchema({
    title: "Hvad dækker ejerudgifter? Komplet guide til boligejere",
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
          Hvad dækker ejerudgifter? Komplet guide til boligejere
        </h1>
        <ArticleMeta {...dates} />

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Når drømmen om egen bolig spirer, er det let at fokusere på
            købsprisen og det månedlige banklån. Men som vi hos Boligklarhed
            ved, er den reelle omkostning ved at eje en bolig mere kompleks.
            Ejerudgifterne er en central del af dit boligbudget, og de kan
            variere betydeligt. Men hvad dækker ejerudgifter egentlig, og
            hvordan påvirker de din økonomi?
          </p>
          <p>
            På Boligklarhed.dk er vi dedikerede til at give dig fuld klarhed
            over boligøkonomien. Vi tilbyder onlineværktøjer, der hjælper dig
            med at vurdere de samlede omkostninger ved boligkøb og ejerskab.
            Vores formål er at udstyre dig med den viden, du har brug for, til
            at træffe informerede beslutninger – især hvis du er
            førstegangskøber. Med vores{" "}
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="text-brand-primary font-medium underline hover:no-underline"
            >
              online boligomkostningsberegner
            </Link>{" "}
            kan du få et realistisk billede af, hvad din fremtidige bolig koster
            – både her og nu, og på den lange bane.
          </p>
          <p>
            Denne artikel dykker ned i alt, hvad der handler om ejerudgifter, så
            du kan forstå hver eneste post og undgå ubehagelige overraskelser.
          </p>

          <section aria-labelledby="hvad-er-ejerudgifter-heading">
            <h2
              id="hvad-er-ejerudgifter-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Hvad er ejerudgifter?
            </h2>
            <p>
              Ejerudgifter er de faste, løbende omkostninger, der følger med at
              eje en bolig. De er uafhængige af dit forbrug af el, vand og
              varme. Hvor købsprisen er en engangsudgift, og låneafdragene er
              knyttet til din finansiering, er ejerudgifterne en fast månedlig
              post, der bidrager til den samlede pris for at bo i din bolig. Det
              er vigtigt at have et realistisk billede af disse udgifter fra
              starten, da de har stor betydning for, hvor meget du reelt har
              råd til at bo for.
            </p>
            <p>
              Når vi snakker om, hvad dækker ejerudgifter, er det essentielt at
              skelne dem fra forbrugsudgifter (el, vand, varme, internet m.m.)
              og fra lånets ydelser. Vores beregner tager højde for alle disse
              elementer for at give dig et komplet billede af din
              boligøkonomi.
            </p>
          </section>

          <section aria-labelledby="typiske-ejerudgiftsposter-heading">
            <h2
              id="typiske-ejerudgiftsposter-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Typiske poster: Hvad dækker ejerudgifter?
            </h2>
            <p>
              Ejerudgifterne består typisk af flere forskellige poster. Her
              gennemgår vi de mest almindelige, som du vil støde på, uanset om du
              køber hus eller ejerlejlighed.
            </p>

            <h3 className="text-h3 text-text-primary mt-6">
              Grundskyld og ejendomsskat til kommunen
            </h3>
            <p>
              En af de største poster under hvad dækker ejerudgifter er
              ejendomsskatten, også kendt som grundskyld. Denne skat betales til
              kommunen og beregnes ud fra grundens offentlige ejendomsvurdering.
              Det er en årlig afgift, som typisk opdeles i rater og betales
              løbende. Grundskylden er en vigtig faktor at medregne i dit
              budget, da den kan udgøre en betydelig del af dine faste udgifter.{" "}
              Du kan læse mere om grundskyld og ejendomsskat i vores artikel om{" "}
              <Link
                href="/artikler/grundskyld-og-ejendomsskat"
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                grundskyld og ejendomsskat
              </Link>
              .
            </p>

            <h3 className="text-h3 text-text-primary mt-6">
              Ejendomsværdiskat til staten
            </h3>
            <p>
              Ejendomsværdiskatten betales til staten og beregnes ud fra
              ejendommens samlede offentlige ejendomsvurdering, det vil sige
              både grund og bygning. Ligesom grundskylden er det en årlig skat,
              der opkræves løbende. Ejendomsværdiskatten er en del af din
              samlede skat og fremgår typisk af din årsopgørelse.
            </p>

            <h3 className="text-h3 text-text-primary mt-6">
              Ejerforeningsbidrag, vej- og kloakafgift
            </h3>
            <p>
              Hvis du køber en ejerlejlighed, vil en stor del af dine
              ejerudgifter gå til ejerforeningen. Dette bidrag dækker typisk
              fællesudgifter som vedligeholdelse af ejendommens fællesarealer
              (tag, facade, trappeopgange), renovation, administration,
              forsikring af bygningen, og nogle gange endda varme og vand (hvis
              det er centralt styret). Det er vigtigt at gennemgå
              ejerforeningens regnskaber og budgetter grundigt for at forstå,
              hvad dækker ejerudgifter i en ejerlejlighed præcist. Du kan finde
              mere information i vores artikel om{" "}
              <Link
                href="/artikler/ejerlejlighed"
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                ejerlejlighed
              </Link>
              .
            </p>
            <p>
              For husejere er der ofte udgifter til vejbidrag (hvis vejen er
              privat) og kloakafgifter til kommunen.
            </p>

            <h3 className="text-h3 text-text-primary mt-6">
              Husforsikring og ejendomsforsikring
            </h3>
            <p>
              En husforsikring er en essentiel del af at eje en bolig. Den dækker
              skader på selve bygningen forårsaget af eksempelvis brand,
              vandskade, storm eller indbrud. Det er vigtigt at have en
              fyldestgørende forsikring for at beskytte din investering.
              Udgiften til husforsikring er en fast post, der indgår i beregningen
              af, hvad dækker ejerudgifter.
            </p>
            <p>
              Bemærk, at husforsikringen ikke dækker dit indbo. Til det skal du
              have en særskilt indboforsikring.
            </p>

            <h3
              id="oversigt-ejerudgiftsposter"
              className="text-h3 text-text-primary mt-8 mb-3"
            >
              Oversigt: Typiske ejerudgiftsposter
            </h3>
            <div className="overflow-x-auto rounded-md border border-border my-4 not-prose">
            <table className="w-full text-left text-small md:text-body">
              <caption className="sr-only">
                Tabel: ejerudgiftsposter, typiske boligtyper og korte beskrivelser.
              </caption>
              <thead>
                <tr className="border-b border-border bg-brand-surface">
                  <th
                    scope="col"
                    className="py-2 px-3 font-semibold text-text-primary"
                  >
                    Ejerudgiftspost
                  </th>
                  <th
                    scope="col"
                    className="py-2 px-3 font-semibold text-text-primary"
                  >
                    Typisk for
                  </th>
                  <th
                    scope="col"
                    className="py-2 px-3 font-semibold text-text-primary"
                  >
                    Beskrivelse
                  </th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border">
                  <td className="py-2 px-3">Ejendomsskat (grundskyld)</td>
                  <td className="py-2 px-3">Alle boligtyper</td>
                  <td className="py-2 px-3">Skat af grundværdien til kommunen.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-3">Ejendomsværdiskat</td>
                  <td className="py-2 px-3">Alle boligtyper</td>
                  <td className="py-2 px-3">
                    Skat af ejendommens værdi til staten.
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-3">Ejerforeningsbidrag</td>
                  <td className="py-2 px-3">Ejerlejlighed</td>
                  <td className="py-2 px-3">Fællesudgifter i ejerforeningen.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-3">Husforsikring</td>
                  <td className="py-2 px-3">Hus, ejerlejlighed</td>
                  <td className="py-2 px-3">Dækker skader på selve bygningen.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-3">Vej- og kloakafgift</td>
                  <td className="py-2 px-3">Hus</td>
                  <td className="py-2 px-3">Afhænger af beliggenhed/kommune.</td>
                </tr>
              </tbody>
            </table>
            </div>
          </section>

          <section aria-labelledby="ejerudgifter-ikke-heading">
            <h2
              id="ejerudgifter-ikke-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Hvad dækker ejerudgifter ikke?
            </h2>
            <p>
              For at skabe fuld klarhed er det lige så vigtigt at forstå, hvad
              ejerudgifter ikke dækker. Disse udgifter skal du budgettere for
              separat:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Forbrugsafgifter:</strong> Udgifter til el, vand, varme,
                gas og internet er ikke en del af ejerudgifterne, medmindre de
                er inkluderet i ejerforeningsbidraget for en ejerlejlighed. Vi
                hos Boligklarhed tilbyder et el-estimat for husstande baseret på
                gennemsnitligt forbrug i{" "}
                <Link
                  href="/artikler/elforbrug-husstand"
                  className="text-brand-primary font-medium underline hover:no-underline"
                >
                  vores artikel om elforbrug i husstanden
                </Link>
                , så du kan budgettere realistisk.
              </li>
              <li>
                <strong>Låneomkostninger:</strong> Dine månedlige afdrag på
                realkreditlån og banklån er en separat post. Vores
                boligomkostningsberegner tager højde for dem, men de indgår ikke i
                selve definitionen af ejerudgifter. Realkreditlån er typisk
                amortiserende lån med en løbetid på 30 år, mens banklån ofte har
                en kortere løbetid på 10 eller 20 år. Læs mere om realkreditlån i{" "}
                <Link
                  href="/artikler/realkreditlan"
                  className="text-brand-primary font-medium underline hover:no-underline"
                >
                  vores artikel om realkreditlån
                </Link>
                .
              </li>
              <li>
                <strong>Indboforsikring:</strong> Som nævnt dækker
                husforsikringen ikke dit indbo. En indboforsikring er en
                selvstændig udgift, der forsikrer dine ejendele mod f.eks.
                brand, vandskade og tyveri.
              </li>
              <li>
                <strong>Vedligeholdelsesudgifter:</strong> Selvom nogle
                ejerforeningsbidrag dækker fælles vedligeholdelse, skal du som
                boligejer budgettere med løbende vedligeholdelse af din bolig. Vi
                anbefaler, baseret på tommelfingerregler, at du afsætter omkring{" "}
                1,5 % af købsprisen årligt til vedligeholdelse af et hus og 1,0
                % for en ejerlejlighed. Denne post er afgørende for at bevare din
                boligs værdi og undgå store uforudsete udgifter. Læs mere i{" "}
                <Link
                  href="/artikler/vedligehold"
                  className="text-brand-primary font-medium underline hover:no-underline"
                >
                  vores artikel om vedligeholdelse
                </Link>
                .
              </li>
            </ul>
          </section>

          <section aria-labelledby="beregn-ejerudgifter-heading">
            <h2
              id="beregn-ejerudgifter-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Hvordan beregnes ejerudgifter?
            </h2>
            <p>
              Beregningen af ejerudgifter er ikke altid ligetil og afhænger af
              flere faktorer. Offentlige satser og ejendomsvurderinger spiller en
              stor rolle. Her er de typiske elementer, der indgår i beregningen:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Ejendomsvurdering:</strong> Både grundskyld og
                ejendomsværdiskat baseres på den offentlige ejendomsvurdering,
                som fastsættes af Vurderingsstyrelsen.
              </li>
              <li>
                <strong>Kommunale satser:</strong> Grundskyldspromillen varierer
                fra kommune til kommune. Det er derfor vigtigt at undersøge den
                specifikke kommunes sats, hvor boligen er beliggende.
              </li>
              <li>
                <strong>Ejerforeningens økonomi:</strong> For ejerlejligheder
                afhænger ejerforeningsbidraget af foreningens udgifter til drift,
                vedligeholdelse og eventuelle gæld. Et sundt budget og en
                langsigtet vedligeholdelsesplan er tegn på en velfungerende
                ejerforening.
              </li>
              <li>
                <strong>Forsikringspræmier:</strong> Prisen på din
                husforsikring afhænger af boligens størrelse, konstruktion,
                beliggenhed og den valgte dækning. Det kan betale sig at indhente
                tilbud fra flere forsikringsselskaber.
              </li>
            </ul>
            <p>
              På Boligklarhed.dk har vi indbygget disse faktorer i vores{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                online boligomkostningsberegner
              </Link>
              , så du nemt kan få et retvisende estimat af de månedlige
              ejerudgifter for en specifik bolig. Vores beregninger følger
              officielle satser og typiske tommelfingerregler, og resultaterne er
              vejledende – de tjener som beslutningsstøtte, ikke finansiel eller
              juridisk rådgivning.
            </p>
          </section>

          <section aria-labelledby="hvorfor-ejerudgifter-heading">
            <h2
              id="hvorfor-ejerudgifter-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Hvorfor er ejerudgifter vigtige for dit budget?
            </h2>
            <p>
              At have et klart overblik over, hvad dækker ejerudgifter, er
              afgørende for din boligøkonomi af flere årsager:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Realistisk budget:</strong> Ejerudgifterne kan udgøre en
                betydelig del af dine faste månedlige udgifter. Ved at
                inkludere dem får du et mere realistisk billede af, hvad din bolig
                koster dig hver måned, og kan undgå at undervurdere dine udgifter.
              </li>
              <li>
                <strong>Købsbeslutning:</strong> Når du overvejer at købe en
                bolig, er det fristende kun at fokusere på salgsprisen. Men en
                bolig med en lav købspris kan have overraskende høje
                ejerudgifter, som på sigt gør den dyrere end en bolig med en højere
                købspris og lavere faste udgifter. Vores værktøj kan hjælpe dig
                med at sondere terrænet og vurdere lånerum for forskellige
                boliger. På siden{" "}
                <Link
                  href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                  className="text-brand-primary font-medium underline hover:no-underline"
                >
                  Hvad kan jeg købe bolig for
                </Link>{" "}
                kan du se dine muligheder.
              </li>
              <li>
                <strong>Lånegodkendelse:</strong> Når banken vurderer din
                økonomi i forbindelse med et boliglån, tager de højde for alle
                dine faste udgifter, herunder ejerudgifterne. En høj ejerudgift
                kan mindske det beløb, du kan låne, og dermed prisen på den bolig,
                du kan købe. Banken ser på din evne til at klare de samlede
                boligomkostninger.
              </li>
              <li>
                <strong>{'\u00d8konomisk robusthed:'}</strong> Ved at kende til og
                budgettere med dine ejerudgifter kan du opbygge en mere robust
                økonomi. Det minimerer risikoen for at blive presset økonomisk,
                hvis udgifterne viser sig at være højere end forventet.
              </li>
            </ul>
          </section>

          <section aria-labelledby="hus-vs-ejerlejlighed-heading">
            <h2
              id="hus-vs-ejerlejlighed-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Ejerudgifter: Hus sammenlignet med ejerlejlighed
            </h2>
            <p>
              Der er grundlæggende forskelle i, hvad dækker ejerudgifter, alt
              efter om du køber et hus eller en ejerlejlighed:
            </p>
            <h3 className="text-h3 text-text-primary mt-6">
              Ejerudgifter ved huskøb
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Du betaler selv for al vedligeholdelse af din ejendom, både inde
                og ude.
              </li>
              <li>
                Du betaler direkte for renovation, vand, el, varme m.m., og du
                vælger selv leverandører.
              </li>
              <li>Du betaler grundskyld og ejendomsværdiskat.</li>
              <li>Du betaler selv for husforsikring.</li>
              <li>
                Der kan være udgifter til private fællesveje eller lokale
                grundejerforeninger.
              </li>
            </ul>
            <h3 className="text-h3 text-text-primary mt-6">
              Ejerudgifter ved ejerlejlighed
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                En stor del af vedligeholdelsen af fælles dele af ejendommen
                (tag, facade, trappeopgang, el-installationer i fælleskælderen)
                dækkes af ejerforeningsbidraget.
              </li>
              <li>
                Nogle forbrugsudgifter (f.eks. varme og vand) kan være inkluderet
                i ejerforeningsbidraget, men det varierer meget. El og internet
                betales typisk separat.
              </li>
              <li>
                Du betaler grundskyld og ejendomsværdiskat som en del af
                ejerudgifterne.
              </li>
              <li>
                Forsikring af selve bygningen (husforsikring) er som regel
                inkluderet i ejerforeningsbidraget. Du skal dog altid købe din
                egen indboforsikring.
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
              kan hjælpe dig med at sammenligne de samlede omkostninger for
              forskellige boligtyper, så du kan træffe det rigtige valg for din
              situation. Beregneren er 100 % gratis at bruge, og vi beder ikke om
              kontooprettelse eller login. Dine indtastede data gemmes ikke;
              beregningen foregår udelukkende i din browser.
            </p>
          </section>

          <section aria-labelledby="opsummering-ejerudgifter-heading">
            <h2
              id="opsummering-ejerudgifter-heading"
              className="text-h2 text-text-primary mb-3"
            >
              Opsummering: Ejerudgifter og næste skridt
            </h2>
            <p>
              For at opsummere er ejerudgifter de faste, månedlige udgifter, der
              knytter sig til ejerskabet af en bolig, og som du skal betale ud
              over dine låneydelser og forbrug. Når vi taler om, hvad dækker
              ejerudgifter, inkluderer det typisk ejendomsskat (grundskyld),
              ejendomsværdiskat, husforsikring og for ejerlejligheder
              ejerforeningsbidrag.
            </p>
            <p>
              Som Danmarks online boligomkostningsberegner er det vores mission
              hos Boligklarhed at gøre din boligrejse mere transparent. Vi ved,
              at boligkøb kan være komplekst, især for førstegangskøbere, og vores
              mål er at give dig de værktøjer og den information, du behøver, for
              at føle dig sikker i dine beslutninger.
            </p>
            <p>
              Vi opfordrer dig til at bruge vores gratis{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                boligomkostningsberegner
              </Link>
              , der giver dig et vejledende og personligt overblik over de samlede
              udgifter for den bolig, du overvejer. Du kan også udforske vores{" "}
              <Link
                href="/artikler"
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                artikelunivers
              </Link>{" "}
              og{" "}
              <Link
                href="/boligbegreber"
                className="text-brand-primary font-medium underline hover:no-underline"
              >
                ordbog med boligbegreber
              </Link>{" "}
              for at udvide din viden om boligmarkedet.
            </p>
          </section>

          <section aria-labelledby="faq-ejerudgifter-heading">
            <h2
              id="faq-ejerudgifter-heading"
              className="text-h2 text-text-primary mb-4"
            >
              FAQ: Ofte stillede spørgsmål om ejerudgifter
            </h2>
            <p>
              Vi forstår, at der kan opstå mange spørgsmål omkring boligøkonomi.
              Her besvarer vi nogle af de mest almindelige spørgsmål relateret
              til, hvad dækker ejerudgifter.
            </p>
            <div className="space-y-5">
              {EJERUDGIFTER_FAQ.map((item) => (
                <div key={item.question}>
                  <h3 className="text-h3 text-text-primary mb-2">
                    {item.question}
                  </h3>
                  <p className="text-body text-text-secondary">{item.answer}</p>
                </div>
              ))}
            </div>
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
