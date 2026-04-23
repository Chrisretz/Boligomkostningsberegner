import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { getArticleDates } from "@/lib/article-dates";
import { VAELG_EJENDOMSMAEGLER_FAQ } from "@/lib/artikel-faq/vaelg-ejendomsmaegler";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/vaelg-ejendomsmaegler";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema([...VAELG_EJENDOMSMAEGLER_FAQ]);

const title = "Vælg den rette ejendomsmægler til dit boligsalg";
const description =
  "Guide til at vælge ejendomsmægler: opgaver, salær, lokalkendskab og salgsstrategi. Brug Boligklarheds beregnere til at skabe økonomisk klarhed før du underskriver.";

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

export default function VaelgEjendomsmaeglerPage() {
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
            {"\u2190"} Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-3">
          Vælg den rette ejendomsmægler til dit boligsalg
        </h1>
        <ArticleMeta {...dates} />

        <article className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            At sælge en bolig er en af livets store beslutninger — og for mange
            en af de økonomisk mest betydningsfulde transaktioner. Når du står
            over for et boligsalg, er valget af den rette{" "}
            <strong className="text-text-primary">ejendomsmægler</strong>{" "}
            afgørende for processens succes. Hos Boligklarhed sælger vi ikke
            boliger, men vi hjælper dig med at forstå de økonomiske aspekter,
            så du er bedre forberedt, når du taler med en mægler.
          </p>
          <p>
            Denne guide gennemgår, hvad en ejendomsmægler gør, hvordan du
            finder den rette til dine behov, og hvordan du kan bruge
            Boligklarheds gratis beregnere til at skabe et solidt økonomisk
            overblik — uanset om du skal{" "}
            <Link
              href="/artikler/boligkoeb-foerste-gang"
              className="text-brand-primary underline hover:no-underline"
            >
              købe bolig for første gang
            </Link>{" "}
            eller sælge din nuværende.
          </p>

          <section aria-labelledby="hvad-er-ejendomsmaegler">
            <h2
              id="hvad-er-ejendomsmaegler"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Hvad er en ejendomsmægler, og hvad kan de gøre for dig?
            </h2>
            <p>
              En ejendomsmægler er en professionel formidler mellem køber og
              sælger på boligmarkedet. Deres primære opgave er at formidle salg
              af fast ejendom — fra parcelhuse og{" "}
              <Link
                href="/artikler/ejerlejlighed"
                className="text-brand-primary underline hover:no-underline"
              >
                ejerlejligheder
              </Link>{" "}
              til sommerhuse og landejendomme. Men rollen strækker sig langt
              ud over blot at vise boligen frem.
            </p>
            <h3 className="text-h3 text-text-primary pt-2">
              Ejendomsmæglerens centrale opgaver
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">
                  Vurdering af din bolig:
                </strong>{" "}
                Mægleren fastsætter en realistisk udbudspris ud fra
                markedsvilkår, stand, beliggenhed og andre relevante faktorer.
                Salgsvurderingen er ofte gratis og uforpligtende.
              </li>
              <li>
                <strong className="text-text-primary">
                  Salgsmateriale og markedsføring:
                </strong>{" "}
                Professionelle billeder, beskrivelser, plantegninger og
                annoncering på boligportaler — fx{" "}
                <a
                  href="https://www.boligsiden.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline hover:no-underline"
                >
                  Boligsiden
                </a>{" "}
                — og egne platforme.
              </li>
              <li>
                <strong className="text-text-primary">Fremvisninger:</strong>{" "}
                Mægleren håndterer fremvisninger, besvarer spørgsmål fra
                interesserede og fremhæver boligens styrker.
              </li>
              <li>
                <strong className="text-text-primary">Forhandling:</strong> En
                erfaren mægler forhandler på dine vegne for at opnå den bedst
                mulige pris og vilkår.
              </li>
              <li>
                <strong className="text-text-primary">
                  Juridisk og administrativ håndtering:
                </strong>{" "}
                Mægleren sikrer korrekte dokumenter — fx købsaftale, skøde og
                refusionsopgørelse — og koordinerer med advokat, bank og
                øvrige parter. Reglerne findes bl.a. i{" "}
                <a
                  href="https://www.retsinformation.dk/eli/lta/2014/526"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline hover:no-underline"
                >
                  lov om formidling af fast ejendom
                </a>
                .
              </li>
            </ul>
            <p>
              En kompetent ejendomsmægler giver dig adgang til ekspertise og
              erfaring, som er værdifuld i en bolighandel. Indsigt i marked og
              fagligt netværk kan forkorte salgsprocessen og optimere
              salgsprisen.
            </p>
          </section>

          <section aria-labelledby="vaelg-rette-maegler">
            <h2
              id="vaelg-rette-maegler"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Hvordan vælger du den rette ejendomsmægler?
            </h2>
            <p>
              Det danske boligmarked har mange dygtige mæglere, men du skal
              finde den, der passer til dig og din bolig. Her er de vigtigste
              kriterier at vurdere.
            </p>
            <h3 className="text-h3 text-text-primary pt-2">
              Lokalkendskab og erfaring
            </h3>
            <p>
              En mægler med solidt lokalkendskab forstår prisniveau,
              køberprofil og de unikke karakteristika ved dit nabolag. Spørg
              ind til, hvor mange boliger de har solgt i dit område, og hvor
              længe de har været aktive lokalt.
            </p>
            <h3 className="text-h3 text-text-primary pt-4">
              Salgsstrategi og markedsføring
            </h3>
            <p>
              Bed potentielle mæglere præsentere en konkret{" "}
              <strong className="text-text-primary">salgsstrategi</strong> for
              netop din bolig: Hvilke kanaler? Hvilken fotostil? Tidslinje? En
              god strategi tiltrækker de rette købere og maksimerer chancen for
              et hurtigt salg til den ønskede pris. I dag bruges online
              boligportaler som{" "}
              <a
                href="https://home.dk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                home.dk
              </a>{" "}
              og{" "}
              <a
                href="https://edc.dk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                edc.dk
              </a>{" "}
              af en stor del af køberne.
            </p>
            <h3 className="text-h3 text-text-primary pt-4">
              Kemien skal være i orden
            </h3>
            <p>
              I et længere salgsforløb skal I kunne arbejde tæt sammen. Vælg
              en mægler, du har tillid til og oplever er lydhør over for dine
              ønsker og behov — ikke kun den, der lover den højeste pris.
            </p>
            <h3 className="text-h3 text-text-primary pt-4">
              Sammenlign tilbud fra flere ejendomsmæglere
            </h3>
            <p>
              Indhent altid tilbud og vurderinger fra{" "}
              <strong className="text-text-primary">2–3 ejendomsmæglere</strong>
              . Sammenlign ikke kun salær, men også hvad du får for pengene —
              markedsføringspakker, rådgivning og den samlede service. Vær
              opmærksom på inkluderede ydelser, variable gebyrer og eventuelle
              tillægsydelser. Du kan bruge{" "}
              <a
                href="https://www.boligsiden.dk/maeglerguide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Boligsidens mæglerguide
              </a>{" "}
              til at finde og sammenligne mæglere i dit område.
            </p>
            <p>
              Før du skriver under på en formidlingsaftale, kan det være en god
              idé at stille spørgsmål om forventet salgspris, salgsperiode og
              opsigelsesvilkår.
            </p>
          </section>

          <section aria-labelledby="udgifter-ejendomsmaegler">
            <h2
              id="udgifter-ejendomsmaegler"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Hvilke udgifter er der ved en ejendomsmægler?
            </h2>
            <p>
              Når du sælger gennem en ejendomsmægler, skal du forvente en
              række udgifter. De varierer mellem mæglere og efter aftalen.
              Sammen med selve salærerne bør du holde øje med engangsudgifter
              og de løbende ejerudgifter, som skal afregnes korrekt på
              overtagelsesdagen.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Mæglersalær:</strong>{" "}
                Betaling for mæglerens arbejde — vurdering, markedsføring,
                fremvisninger, forhandling og administrativ håndtering. Kan være
                fast pris, en procentdel af salgsprisen eller en kombination.
              </li>
              <li>
                <strong className="text-text-primary">
                  Markedsføringsudgifter:
                </strong>{" "}
                Ofte inkluderet, men kan være en separat post. Dækker
                annoncering, foto, drone, video mv.
              </li>
              <li>
                <strong className="text-text-primary">Sagsomkostninger:</strong>{" "}
                Administrative udgifter til dokumentation og attester.
              </li>
              <li>
                <strong className="text-text-primary">
                  Tinglysningsafgift:
                </strong>{" "}
                Skødet skal tinglyses ved salg. Se vores artikel om{" "}
                <Link
                  href="/artikler/tinglysning"
                  className="text-brand-primary underline hover:no-underline"
                >
                  tinglysning
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
                .
              </li>
              <li>
                <strong className="text-text-primary">
                  Eventuel advokatbistand:
                </strong>{" "}
                Mange vælger egen advokat til at gennemgå købsaftalen, også når
                mægleren håndterer det juridiske.
              </li>
              <li>
                <strong className="text-text-primary">
                  Ejerudgifter og ejendomsskat:
                </strong>{" "}
                Afregnes korrekt mellem køber og sælger på overtagelsesdagen.
                Læs mere om{" "}
                <Link
                  href="/artikler/ejerudgifter"
                  className="text-brand-primary underline hover:no-underline"
                >
                  ejerudgifter
                </Link>{" "}
                og{" "}
                <Link
                  href="/artikler/grundskyld-og-ejendomsskat"
                  className="text-brand-primary underline hover:no-underline"
                >
                  grundskyld og ejendomsskat
                </Link>
                .
              </li>
            </ul>

            <div className="overflow-x-auto rounded-md border border-border my-4 not-prose">
              <table className="w-full text-left text-small md:text-body">
                <caption className="sr-only">
                  Oversigt over typiske udgifter ved brug af ejendomsmægler
                </caption>
                <thead>
                  <tr className="border-b border-border bg-brand-surface">
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Post
                    </th>
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Type
                    </th>
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Vejledende niveau
                    </th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Mæglersalær</td>
                    <td className="py-2 px-3">Engangsudgift</td>
                    <td className="py-2 px-3">
                      Ofte 1,5–5 % af salgsprisen eller fast pris
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Markedsføring, foto, video</td>
                    <td className="py-2 px-3">Engangsudgift</td>
                    <td className="py-2 px-3">
                      Varierer – tjek om inkluderet i salær
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Tinglysning af skøde</td>
                    <td className="py-2 px-3">Engangsudgift</td>
                    <td className="py-2 px-3">
                      Fast del + variabel del af købesum
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Advokatbistand</td>
                    <td className="py-2 px-3">Engangsudgift</td>
                    <td className="py-2 px-3">Varierer efter aftale</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Energimærke</td>
                    <td className="py-2 px-3">Engangsudgift</td>
                    <td className="py-2 px-3">Afhænger af boligtype</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Ejerudgifter / grundskyld</td>
                    <td className="py-2 px-3">Løbende</td>
                    <td className="py-2 px-3">
                      Afregnes pr. overtagelsesdato
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Få altid en klar oversigt over alle omkostninger fra din mægler,
              så du kender det forventede{" "}
              <strong className="text-text-primary">nettoprovenu</strong>. Hos
              Boligklarhed beregner vi ikke selve mæglersalærer, men vores
              værktøjer giver dig overblik over mange af de øvrige omkostninger
              både ved salg og køb.
            </p>
          </section>

          <section aria-labelledby="boligklarhed-hjaelper">
            <h2
              id="boligklarhed-hjaelper"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Sådan kan Boligklarhed hjælpe dig i processen
            </h2>
            <p>
              Selvom vi ikke agerer som ejendomsmægler, er Boligklarhed din
              partner, når det gælder{" "}
              <strong className="text-text-primary">
                klarhed over boligens økonomi
              </strong>
              . Vi tilbyder gratis og uafhængige værktøjer, der giver dig et
              solidt fundament for at træffe informerede beslutninger.
            </p>
            <h3 className="text-h3 text-text-primary pt-2">
              Vores gratis boligberegnere
            </h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <Link
                  href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                  className="text-brand-primary underline hover:no-underline"
                >
                  Boligomkostningsberegneren
                </Link>
                : Beregn engangsudgifter (tinglysning af skøde og pantebreve)
                samt løbende månedlige udgifter til realkreditlån, banklån,
                ejerudgifter og vedligehold. Få desuden en rentetest (+1 % /
                +2 %), så du ser, hvordan dit budget påvirkes af stigende
                renter — særligt nyttigt, når du overvejer et{" "}
                <Link
                  href="/artikler/realkreditlan"
                  className="text-brand-primary underline hover:no-underline"
                >
                  realkreditlån
                </Link>
                .
              </li>
              <li>
                <Link
                  href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                  className="text-brand-primary underline hover:no-underline"
                >
                  Hvad kan jeg købe bolig for?
                </Link>
                : Estimerer hvor meget du kan låne, og dermed den vejledende
                maksimale købspris ud fra indkomst og gæld. Uvurderlig for
                førstegangskøbere og alle, der vil kende deres{" "}
                <Link
                  href="/artikler/saadan-vurderer-banken-dit-boliglan"
                  className="text-brand-primary underline hover:no-underline"
                >
                  lånerum
                </Link>{" "}
                før mødet med bank og mægler.
              </li>
            </ol>
            <p>
              Vi opdaterer løbende vores beregnere i 2026 for at følge
              officielle satser og typiske regler — fx vedligeholdelses&shy;
              omkostninger på{" "}
              <Link
                href="/artikler/vedligehold"
                className="text-brand-primary underline hover:no-underline"
              >
                1,5 % for hus og 1,0 % for lejlighed pr. år
              </Link>{" "}
              og et lovpligtigt minimumsudbetaling på 5 % af købsprisen.
            </p>
            <h3 className="text-h3 text-text-primary pt-4">
              Fordele ved at bruge Boligklarhed
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">
                  Fuldstændig anonymitet:
                </strong>{" "}
                Ingen konto eller login. Alle beregninger kører lokalt i din
                browser, og vi gemmer ikke dine indtastede data. Vi bruger kun
                teknisk nødvendige cookies til funktionalitet og statistiske
                cookies med dit samtykke — se vores{" "}
                <Link
                  href="/privacy"
                  className="text-brand-primary underline hover:no-underline"
                >
                  privatlivspolitik
                </Link>
                .
              </li>
              <li>
                <strong className="text-text-primary">
                  Uafhængig information:
                </strong>{" "}
                Vores artikler giver dybdegående indsigt i fx{" "}
                <Link
                  href="/artikler/sammenligning-af-laanetyper"
                  className="text-brand-primary underline hover:no-underline"
                >
                  sammenligning af lånetyper
                </Link>{" "}
                og{" "}
                <Link
                  href="/artikler/ejerskifteforsikring"
                  className="text-brand-primary underline hover:no-underline"
                >
                  ejerskifteforsikring
                </Link>
                , så du kan stille de rigtige spørgsmål til mægler og bank.
              </li>
              <li>
                <strong className="text-text-primary">
                  Enkel og forståelig:
                </strong>{" "}
                Vi gør komplekse emner om boligfinansiering enkle, især for
                førstegangskøbere. Resultaterne er vejledende og erstatter
                ikke bindende finansiel eller juridisk rådgivning.
              </li>
            </ul>
          </section>

          <section aria-labelledby="maegler-som-koeber">
            <h2
              id="maegler-som-koeber"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Overvejelser ved boligkøb — ejendomsmæglerens rolle for dig som køber
            </h2>
            <p>
              Mens ejendomsmægleren primært varetager sælgerens interesser,
              spiller de også en vigtig rolle for dig som køber. En
              professionel mægler skal give dig alle relevante oplysninger om
              boligen og agere som formidler i forhandlingsprocessen.
            </p>
            <h3 className="text-h3 text-text-primary pt-2">
              Ejendomsmæglerens rolle set fra køberens side
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Information:</strong>{" "}
                Mægleren skal give dig tilstandsrapport,{" "}
                <Link
                  href="/artikler/energimaerker-og-boligokonomi"
                  className="text-brand-primary underline hover:no-underline"
                >
                  energimærke
                </Link>
                , lokalplaner og servitutter.
              </li>
              <li>
                <strong className="text-text-primary">
                  Fremvisning og spørgsmål:
                </strong>{" "}
                Mægleren fremviser boligen, besvarer spørgsmål og kan give
                indsigt i nærområdet, skoler og transport.
              </li>
              <li>
                <strong className="text-text-primary">Kontaktpunkt:</strong>{" "}
                Når du har fundet den rette bolig, er mægleren dit primære
                kontaktpunkt for budgivning og de indledende forhandlinger.
              </li>
              <li>
                <strong className="text-text-primary">
                  Formidling af eksperter:
                </strong>{" "}
                Mæglere anbefaler ofte advokater, byggesagkyndige eller
                finansielle rådgivere — men du vælger altid selv frit.
              </li>
            </ul>
            <p>
              Selvom mægleren repræsenterer sælger, skal de agere loyalt og
              ansvarligt over for alle parter. Det betyder korrekte oplysninger
              og ingen tilbageholdelse af væsentlig information. Når du har
              fundet en bolig, er det en god idé at bruge{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary underline hover:no-underline"
              >
                boligomkostningsberegneren
              </Link>{" "}
              til at få et uafhængigt overblik over de fremtidige omkostninger,
              før du lægger bud eller skriver under på en købsaftale.
            </p>
            <h3 className="text-h3 text-text-primary pt-4">
              Typiske spørgsmål fra ejendomsmægleren til køber
            </h3>
            <div className="overflow-x-auto rounded-md border border-border my-4 not-prose">
              <table className="w-full text-left text-small md:text-body">
                <caption className="sr-only">
                  Typiske emner en ejendomsmægler afdækker hos køber
                </caption>
                <thead>
                  <tr className="border-b border-border bg-brand-surface">
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Kategori
                    </th>
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Eksempel på spørgsmål
                    </th>
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Vigtighed
                    </th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Boligtype</td>
                    <td className="py-2 px-3">
                      Hus, lejlighed, sommerhus?
                    </td>
                    <td className="py-2 px-3">Høj</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Beliggenhed</td>
                    <td className="py-2 px-3">
                      Specifikke områder, by eller land?
                    </td>
                    <td className="py-2 px-3">Høj</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Størrelse</td>
                    <td className="py-2 px-3">
                      Antal værelser, kvm, have?
                    </td>
                    <td className="py-2 px-3">Medium</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Budget</td>
                    <td className="py-2 px-3">
                      Økonomiske rammer og forhåndsgodkendelse
                    </td>
                    <td className="py-2 px-3">Høj</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Tidsramme</td>
                    <td className="py-2 px-3">
                      Hvornår vil I flytte?
                    </td>
                    <td className="py-2 px-3">Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Vær forberedt med svar på disse spørgsmål — det strømliner
              processen og hjælper mægleren med at finde de mest relevante
              boliger til dig.
            </p>
          </section>

          <section aria-labelledby="faq-ejendomsmaegler">
            <h2
              id="faq-ejendomsmaegler"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Ofte stillede spørgsmål om ejendomsmæglere og bolighandel
            </h2>
            <div className="space-y-6 not-prose">
              {VAELG_EJENDOMSMAEGLER_FAQ.map((item) => (
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
              rådgivning. Søg altid professionel rådgivning hos ejendomsmægler,
              advokat og bank ved konkret salg eller køb af bolig. Officielle
              oplysninger om bolig og flytning finder du også på{" "}
              <a
                href="https://www.borger.dk/bolig-og-flytning"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Borger.dk
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
