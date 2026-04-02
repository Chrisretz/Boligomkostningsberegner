import Image from "next/image";
import Link from "next/link";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { BOLIGLAAN_BEREGNER_FAQ } from "@/lib/artikel-faq/boliglaan-beregner";
import { getBoliglaanBeregnerExamples } from "@/lib/boliglaanBeregnerExamples";
import {
  PATH_BOLIGLAAN_BEREGNER,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { getFaqPageSchema } from "@/lib/structured-data";

function formatKr(n: number): string {
  return n.toLocaleString("da-DK");
}

const faqSchema = getFaqPageSchema([...BOLIGLAAN_BEREGNER_FAQ]);

export default function BoliglaanBeregnerPage() {
  const examples = getBoliglaanBeregnerExamples();

  return (
    <main className="min-h-screen py-12 px-4 overflow-x-hidden pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto max-w-3xl min-w-0">
        <article>
          <h1 className="text-h1 text-text-primary mb-4 break-words">
            Boliglån beregner – beregn ydelse og omkostninger ved boligkøb
          </h1>
          <p className="text-body text-text-secondary text-lg leading-relaxed mb-6">
            Med en <strong className="font-semibold text-text-primary">boliglånsberegner</strong> kan du hurtigt få et{" "}
            <strong className="font-semibold text-text-primary">vejledende skøn</strong> over månedlig ydelse og hvad du skal have med til købet. På Boligklarhed foregår det i{" "}
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="text-brand-primary font-medium hover:underline"
            >
              boligomkostningsberegneren
            </Link>
            , som splitter <strong className="font-semibold text-text-primary">realkredit og banklån</strong>, medtager typisk <strong className="font-semibold text-text-primary">vedligehold</strong> og viser også{" "}
            <strong className="font-semibold text-text-primary">engangsomkostninger</strong> som tinglysning.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="inline-flex justify-center items-center min-h-[48px] px-6 py-3 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              Beregn boliglån og boligbudget
            </Link>
            <Link
              href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
              className="inline-flex justify-center items-center min-h-[48px] px-6 py-3 text-body font-semibold text-brand-primary border border-brand-primary rounded-md hover:bg-brand-primary/5 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              Beregn hvad du kan købe for
            </Link>
          </div>

          <nav
            className="rounded-md border border-border bg-brand-surface/80 p-4 mb-12 text-small text-text-secondary"
            aria-label="Indhold på siden"
          >
            <span className="font-medium text-text-primary">På denne side: </span>
            <a href={`${PATH_BOLIGLAAN_BEREGNER}#hvad-er`} className="text-brand-primary hover:underline">
              Hvad er en boliglånsberegner?
            </a>
            {" · "}
            <a href={`${PATH_BOLIGLAAN_BEREGNER}#brug`} className="text-brand-primary hover:underline">
              Sådan bruger du den
            </a>
            {" · "}
            <a href={`${PATH_BOLIGLAAN_BEREGNER}#finansiering`} className="text-brand-primary hover:underline">
              80/15/5
            </a>
            {" · "}
            <a href={`${PATH_BOLIGLAAN_BEREGNER}#maanedlig`} className="text-brand-primary hover:underline">
              Månedlig ydelse
            </a>
            {" · "}
            <a href={`${PATH_BOLIGLAAN_BEREGNER}#eksempler`} className="text-brand-primary hover:underline">
              Eksempler
            </a>
            {" · "}
            <a href={`${PATH_BOLIGLAAN_BEREGNER}#pavirker`} className="text-brand-primary hover:underline">
              Hvad påvirker lånet?
            </a>
            {" · "}
            <a href={`${PATH_BOLIGLAAN_BEREGNER}#glemte-udgifter`} className="text-brand-primary hover:underline">
              Ofte glemte udgifter
            </a>
            {" · "}
            <a href={`${PATH_BOLIGLAAN_BEREGNER}#faq`} className="text-brand-primary hover:underline">
              FAQ
            </a>
          </nav>

          <section className="mb-12" id="hvad-er" aria-labelledby="hvad-er-heading">
            <h2 id="hvad-er-heading" className="text-h2 text-text-primary mb-3">
              Hvad er en boliglånsberegner?
            </h2>
            <p className="text-body text-text-secondary leading-relaxed">
              En boliglånsberegner estimerer, hvad det koster at finansiere en bolig ud fra fx købspris, udbetaling, rente og løbetid. Resultatet er altid{" "}
              <strong className="font-semibold text-text-primary">vejledende</strong>: Din bank ser også på rådighedsbeløb, bidrag og dokumentation.
            </p>
          </section>

          <section className="mb-12" id="brug" aria-labelledby="brug-heading">
            <h2 id="brug-heading" className="text-h2 text-text-primary mb-3">
              Sådan bruger du vores boliglånsberegner
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-body text-text-secondary leading-relaxed">
              <li>Indtast købspris og udbetaling (mindst 5 % af prisen).</li>
              <li>Angiv hvor meget der finansieres med realkredit – typisk op til 80 % af købsprisen.</li>
              <li>Vælg rente og løbetid for realkredit (og for banklån, hvis du har en bankdel).</li>
              <li>Tilføj ejerudgifter og eventuelle andre faste poster, hvis du vil se det samlede månedlige budget.</li>
              <li>Læs månedlig ydelse, kontantbehov ved køb og rentetest (+1 % / +2 %).</li>
            </ol>

            <div className="mt-8 space-y-8">
              <figure className="m-0">
                <Image
                  src="/images/boligomkostningsberegner-input.png"
                  alt="Udsnit af boligomkostningsberegneren: generel information om boligtype og husstand samt købspris, slider og udbetaling med procentknapper."
                  width={1024}
                  height={583}
                  className="w-full h-auto rounded-lg border border-border shadow-soft"
                  sizes="(max-width: 768px) 100vw, 736px"
                />
                <figcaption className="mt-2 text-small text-text-muted leading-relaxed">
                  Sådan ser indtastningen ud: boligtype, købspris (fx med skyder), udbetaling og genvejsknapper til typiske udbetalingsprocenter.
                </figcaption>
              </figure>
              <figure className="m-0">
                <Image
                  src="/images/boligomkostningsberegner-resultat.png"
                  alt="Resultat fra boligomkostningsberegneren: samlet boligbudget pr. måned, kontantbehov ved køb, rentetest og tre kort med etableringsomkostninger, månedlige udgifter og rentestigning."
                  width={1024}
                  height={754}
                  className="w-full h-auto rounded-lg border border-border shadow-soft"
                  sizes="(max-width: 768px) 100vw, 736px"
                />
                <figcaption className="mt-2 text-small text-text-muted leading-relaxed">
                  Efter du har klikket «Beregn omkostninger»: overblik over månedligt budget, kontantbehov ved køb og de tre resultatkort (etablering, månedligt, rentetest).
                </figcaption>
              </figure>
            </div>

            <p className="mt-6 text-body text-text-secondary">
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary font-medium hover:underline"
              >
                Åbn boligomkostningsberegneren
              </Link>
            </p>
          </section>

          <section className="mb-12" id="finansiering" aria-labelledby="finansiering-heading">
            <h2 id="finansiering-heading" className="text-h2 text-text-primary mb-3">
              Hvordan finansieres et boligkøb typisk? (80/15/5)
            </h2>
            <p className="text-body text-text-secondary leading-relaxed mb-4">
              Mange boligkøb i Danmark følger en{" "}
              <strong className="font-semibold text-text-primary">80/15/5-model</strong> som udgangspunkt: op til{" "}
              <strong className="font-semibold text-text-primary">80 % realkreditlån</strong>, op til{" "}
              <strong className="font-semibold text-text-primary">15 % banklån</strong> og mindst{" "}
              <strong className="font-semibold text-text-primary">5 % udbetaling</strong>. Den præcise fordeling aftales med banken.
            </p>
            <div
              className="flex h-10 w-full rounded-full overflow-hidden border border-border text-small font-medium text-white"
              role="img"
              aria-label="Fordeling: 80 procent realkredit, 15 procent banklån, 5 procent egen udbetaling"
            >
              <div className="flex-[80] bg-brand-primary flex items-center justify-center min-w-0 px-2">
                80&nbsp;% realkredit
              </div>
              <div className="flex-[15] bg-text-primary flex items-center justify-center min-w-0 px-2">
                15&nbsp;% bank
              </div>
              <div className="flex-[5] bg-status-success flex items-center justify-center min-w-0 px-1 text-white text-xs sm:text-small leading-tight text-center">
                5&nbsp;% egen
              </div>
            </div>
            <p className="text-small text-text-muted mt-2">
              Illustrationen er forenklet – din egen fordeling kan afvige.
            </p>
          </section>

          <section className="mb-12" id="maanedlig" aria-labelledby="maanedlig-heading">
            <h2 id="maanedlig-heading" className="text-h2 text-text-primary mb-3">
              Hvad består den månedlige ydelse typisk af?
            </h2>
            <p className="text-body text-text-secondary leading-relaxed mb-4">
              På realkreditdelen betaler du som regel <strong className="font-semibold text-text-primary">renter</strong> og{" "}
              <strong className="font-semibold text-text-primary">afdrag</strong> (medmindre du vælger afdragsfrihed). Til kommer{" "}
              <strong className="font-semibold text-text-primary">bidrag</strong> til realkreditinstituttet. Banklånet har sit eget rente- og afdragsløb. I Boligklarheds beregner indgår ydelsen som et samlet skøn ud fra din rente og løbetid; bidrag er ikke udsplitet som separat linje.
            </p>
            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full text-left text-body text-text-secondary min-w-[280px]">
                <thead>
                  <tr className="border-b border-border bg-brand-surface">
                    <th className="py-2 px-3 font-semibold text-text-primary">Element</th>
                    <th className="py-2 px-3 font-semibold text-text-primary">Kort forklaring</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-text-primary">Rente</td>
                    <td className="py-2 px-3">Årlig pris for at låne beløbet – påvirker ydelsen direkte.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-text-primary">Bidrag</td>
                    <td className="py-2 px-3">Løbende omkostning til realkredit ud over renter (afhænger bl.a. af belåningsgrad).</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-text-primary">Afdrag</td>
                    <td className="py-2 px-3">Afkast på hovedstolen, så gælden nedbringes over løbetiden.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-text-primary">Banklån</td>
                    <td className="py-2 px-3">Dækker ofte den del af købsprisen, som ligger ud over realkreditloftet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-small text-text-muted">
              Læs mere om realkredit i artiklen{" "}
              <Link href="/artikler/realkreditlan" className="text-brand-primary hover:underline">
                Realkreditlån: Sådan fungerer det
              </Link>
              .
            </p>
          </section>

          <section className="mb-12" id="eksempler" aria-labelledby="eksempler-heading">
            <h2 id="eksempler-heading" className="text-h2 text-text-primary mb-3">
              Eksempler på boliglån og månedligt budget
            </h2>
            <p className="text-body text-text-secondary leading-relaxed mb-4">
              Nedenfor er tre scenarier med <strong className="font-semibold text-text-primary">10 % udbetaling</strong>,{" "}
              <strong className="font-semibold text-text-primary">80 % realkredit</strong> af købsprisen og resten som banklån. Realkreditrente{" "}
              <strong className="font-semibold text-text-primary">4 %</strong>, bankrente{" "}
              <strong className="font-semibold text-text-primary">5,5 %</strong> over 10 år, realkreditløbetid 30 år, hus uden tilvalg af el-estimat. Tallene kommer fra{" "}
              <strong className="font-semibold text-text-primary">samme beregningsmotor</strong> som i beregneren.
            </p>
            <div className="space-y-6">
              {examples.map((ex) => (
                <div
                  key={ex.purchasePriceDKK}
                  className="rounded-md border border-border bg-brand-surface p-5 md:p-6 shadow-soft"
                >
                  <h3 className="text-h3 text-text-primary mb-3">{ex.label}</h3>
                  <ul className="text-small text-text-secondary space-y-1 mb-4">
                    <li>Købspris: {formatKr(ex.purchasePriceDKK)} kr</li>
                    <li>Udbetaling: {formatKr(ex.downPaymentDKK)} kr</li>
                    <li>Realkredit: {formatKr(ex.realkreditDKK)} kr</li>
                    <li>Banklån: {formatKr(ex.bankLoanDKK)} kr</li>
                  </ul>
                  <p className="text-body text-text-primary font-semibold">
                    Samlet ca. {formatKr(ex.output.base.monthlyTotalDKK)} kr/md{" "}
                    <span className="font-normal text-text-secondary">
                      (lån + vedligehold efter beregnerens model)
                    </span>
                  </p>
                  <p className="text-small text-text-muted mt-1">
                    Kontantbehov ved køb (inkl. tinglysning m.m.): ca.{" "}
                    {formatKr(ex.output.cashNeededAtCloseDKK)} kr
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-body text-text-secondary">
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary font-medium hover:underline"
              >
                Tilpas tal i beregneren
              </Link>
            </p>
          </section>

          <section className="mb-12" id="pavirker" aria-labelledby="pavirker-heading">
            <h2 id="pavirker-heading" className="text-h2 text-text-primary mb-3">
              Hvad påvirker dit boliglån mest?
            </h2>
            <ul className="list-disc list-inside space-y-2 text-body text-text-secondary leading-relaxed">
              <li>
                <strong className="font-semibold text-text-primary">Købspris og lånebeløb</strong> – jo mere du låner, jo højere ydelse (alt andet lige).
              </li>
              <li>
                <strong className="font-semibold text-text-primary">Udbetaling</strong> – højere egenkapital reducerer gæld og ofte den månedlige byrde.
              </li>
              <li>
                <strong className="font-semibold text-text-primary">Rente og løbetid</strong> – højere rente eller kortere løbetid giver typisk højere ydelse.
              </li>
              <li>
                <strong className="font-semibold text-text-primary">Fordeling realkredit/bank</strong> – banklån har ofte anden rente og løbetid end realkredit.
              </li>
              <li>
                <strong className="font-semibold text-text-primary">Fast vs. variabel rente</strong> – påvirker usikkerhed og startydelse; brug rentetest i beregneren.
              </li>
            </ul>
            <p className="mt-4 text-body text-text-secondary">
              Sammenligning af lånetyper:{" "}
              <Link
                href="/artikler/sammenligning-af-laanetyper"
                className="text-brand-primary font-medium hover:underline"
              >
                artikel om lånetyper
              </Link>
              .
            </p>
          </section>

          <section className="mb-12" id="glemte-udgifter" aria-labelledby="glemte-heading">
            <h2 id="glemte-heading" className="text-h2 text-text-primary mb-3">
              Hvilke udgifter glemmer mange ved boliglån og boligkøb?
            </h2>
            <p className="text-body text-text-secondary leading-relaxed mb-3">
              Bankberegninger fokuserer ofte på lånet. Det samlede billede bør også rumme:
            </p>
            <ul className="list-disc list-inside space-y-2 text-body text-text-secondary leading-relaxed">
              <li>Tinglysning af skøde og pant</li>
              <li>Advokat eller køberrådgivning</li>
              <li>Ejerskifteforsikring</li>
              <li>Flytning og evt. renovering før indflytning</li>
              <li>Faste ejerudgifter og vedligehold</li>
              <li>Buffer til uforudsete udgifter</li>
            </ul>
            <p className="mt-4 text-body text-text-secondary">
              Boligomkostningsberegneren samler{" "}
              <strong className="font-semibold text-text-primary">dele af dette</strong> (fx tinglysning og vedligehold). Læs også{" "}
              <Link href="/artikler/tinglysning" className="text-brand-primary font-medium hover:underline">
                om tinglysning
              </Link>{" "}
              og{" "}
              <Link href="/artikler/ejerskifteforsikring" className="text-brand-primary font-medium hover:underline">
                ejerskifteforsikring
              </Link>
              .
            </p>
          </section>

          <section className="mb-12" id="koebe" aria-labelledby="koebe-heading">
            <h2 id="koebe-heading" className="text-h2 text-text-primary mb-3">
              Boliglån beregner vs. «hvad kan jeg købe bolig for?»
            </h2>
            <p className="text-body text-text-secondary leading-relaxed">
              <strong className="font-semibold text-text-primary">Boliglån / boligbudget:</strong> Du kender (eller tester) en købspris og vil se ydelse, engangsomkostninger og rentesensitivitet – det dækker{" "}
              <Link href={PATH_BOLIGOMKOSTNINGER_BEREGNER} className="text-brand-primary font-medium hover:underline">
                boligomkostningsberegneren
              </Link>
              .{" "}
              <strong className="font-semibold text-text-primary">Købeevne:</strong> Du vil vide, hvor meget du ca. kan låne ud fra indtægt og gearing – det dækker{" "}
              <Link
                href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                className="text-brand-primary font-medium hover:underline"
              >
                beregneren «Hvad kan jeg købe bolig for?»
              </Link>
              .
            </p>
          </section>

          <section className="mb-12" id="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-h2 text-text-primary mb-4">
              Ofte stillede spørgsmål om boliglån og beregning
            </h2>
            <div className="space-y-6">
              {BOLIGLAAN_BEREGNER_FAQ.map((item) => (
                <div key={item.question}>
                  <h3 className="text-body font-semibold text-text-primary mb-2">
                    {item.question}
                  </h3>
                  <p className="text-body text-text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="rounded-xl border border-border bg-brand-surface p-6 md:p-8 text-center mb-8"
            aria-labelledby="cta-afslut-heading"
          >
            <h2 id="cta-afslut-heading" className="text-h2 text-text-primary mb-3">
              Klar til at beregne?
            </h2>
            <p className="text-body text-text-secondary mb-5 max-w-xl mx-auto">
              Gå direkte til beregneren og indtast dine tal – det er gratis og uden login.
            </p>
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="inline-flex justify-center items-center min-h-[48px] px-8 py-3 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              Åbn boliglånsberegneren
            </Link>
          </section>
        </article>

        <p className="text-small text-text-muted mb-6">
          Sidst opdateret konceptuelt for at afspejle gældende model for boligfinansiering og beregnerens funktion. Ser du fejl,{" "}
          <Link href="/om-os" className="text-brand-primary hover:underline">
            kontakt os gerne
          </Link>
          .
        </p>

        <p>
          <Link href="/beregnere" className="text-body text-brand-primary hover:underline">
            ← Alle beregnere
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}
