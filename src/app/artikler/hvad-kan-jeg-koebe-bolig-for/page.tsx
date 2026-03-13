import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Hvad kan jeg købe bolig for? | Boligklarhed",
  description:
    "Få overblik over hvordan du finder ud af, hvor meget bolig du har råd til. Rådighedsbeløb, gældsfaktor, udbetaling og den reelle månedlige boligudgift.",
  alternates: { canonical: canonicalUrl("/artikler/hvad-kan-jeg-koebe-bolig-for") },
  openGraph: {
    title: "Hvad kan jeg købe bolig for?",
    description:
      "Sådan finder du ud af, hvor meget bolig du har råd til – rådighedsbeløb, gældsfaktor og den reelle månedlige udgift.",
    url: canonicalUrl("/artikler/hvad-kan-jeg-koebe-bolig-for"),
  },
};

export default function HvadKanJegKoebeBoligForPage() {
  const articleSchema = getArticleSchema({
    title: "Hvad kan jeg købe bolig for?",
    description:
      "Få overblik over hvordan du finder ud af, hvor meget bolig du har råd til. Rådighedsbeløb, gældsfaktor, udbetaling og den reelle månedlige boligudgift.",
    path: "/artikler/hvad-kan-jeg-koebe-bolig-for",
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
          Hvad kan jeg købe bolig for?
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Spørgsmålet &quot;Hvad kan jeg købe bolig for?&quot; handler ikke
            kun om, hvor stort et lån du må tage. Det handler om, hvad du
            reelt har råd til at betale hver måned – når både lån, ejerudgifter,
            vedligehold og din øvrige økonomi er med i regnestykket. Her får du
            et overblik over de vigtigste begreber og hvordan du kan bruge en
            boligomkostningsberegner til at finde svaret.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Rådighedsbeløb og gældsfaktor
            </h2>
            <p>
              Banken vurderer typisk, hvor meget du kan låne, ud fra din
              indtægt og din gæld. Den såkaldte <strong>gældsfaktor</strong> er
              et loft for, hvor mange gange din årlige indtægt du må låne – fx
              fire til seks gange. Det giver et groft beløb til boligkøb, men
              det siger ikke noget om, hvad du faktisk har <em>råd</em> til at
              betale hver måned i ydelse, skat, forsikring og vedligehold.
            </p>
            <p>
              Derfor bruger banken også <strong>rådighedsbeløbet</strong>: det
              beløb, der er tilbage efter skat, faste udgifter og en
              minimumsforbrug. Din boligydelse (lån + ejerudgifter + evt.
              vedligehold) må ikke æde hele rådighedsbeløbet – der skal være
              luft til uforudsete udgifter og livskvalitet. Når du ved, hvor
              stort et rådighedsbeløb du har, kan du arbejde baglæns og finde
              ud af, hvor høj en månedlig boligudgift du kan bære – og dermed
              hvilken købspris det svarer til.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Udbetaling og engangsomkostninger
            </h2>
            <p>
              &quot;Hvad kan jeg købe bolig for?&quot; afhænger også af, hvor
              meget du har sparet op. Du skal som minimum have en
              <strong> udbetaling</strong> (typisk mindst 5 % af købsprisen) og
              desuden dække <strong>engangsomkostninger</strong> som tinglysning
              af skøde og pant, evt. ejerskifteforsikring og andre
              flytteomkostninger. Disse beløb betales ved overtagelse og kan
              løbe op i titusindvis af kroner – så selv om du &quot;må&quot;
              låne til en dyr bolig, kan det være, at du ikke har kontanter
              nok til at komme ind.
            </p>
            <p>
              En boligomkostningsberegner viser dig både den samlede
              engangsomkostning og den månedlige udgift for forskellige
              købspriser og udbetalinger. På den måde kan du teste, hvad der
              passer til din økonomi.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Den reelle månedlige boligudgift
            </h2>
            <p>
              Den beløb du betaler til banken hver måned er kun én del af
              regnestykket. Du skal også regne med <strong>ejerudgifter</strong>
              (grundskyld, ejendomsskat, forsikring, vand, varme, fællesudgifter),
              og mange anbefaler at lægge en <strong>vedligeholdelsesreserve</strong>
              oven i (fx 1–1,5 % af købsprisen pr. år). Når du lægger det
              sammen, får du den reelle månedlige boligudgift – og den bør
              være lavere end dit rådighedsbeløb, så du har buffer til
              rentestigninger og uforudsete udgifter.
            </p>
            <p>
              En rentestest (fx +1 % eller +2 % rente) viser, hvad der sker med
              din ydelse, hvis renten stiger. Det giver et mere realistisk
              billede af, hvor meget bolig du trygt kan købe for.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Sådan finder du ud af det i praksis
            </h2>
            <p>
              Start med at kende din egen økonomi: indtægt, gæld, faste
              udgifter og hvor meget du har sparet op. Derefter kan du bruge en
              boligomkostningsberegner til at indtaste forskellige købspriser,
              udbetalinger og renteniveau – og se den samlede månedlige udgift
              inkl. ejerudgifter og vedligehold. Sammenlign med det beløb, du
              reelt har råd til at afsætte til bolig hver måned. Den købspris,
              hvor den månedlige udgift matcher din økonomi (med luft til
              rentestigninger), er et godt bud på, hvad du kan købe bolig for.
            </p>
            <p>
              <Link href="/beregn" className="text-brand-primary hover:underline font-medium">
                Brug vores boligomkostningsberegner her
              </Link>{" "}
              for at teste forskellige scenarier og få et overblik over
              engangsomkostninger og månedlig total.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              &quot;Hvad kan jeg købe bolig for?&quot; afhænger af rådighedsbeløb,
              gældsfaktor, udbetaling og den reelle månedlige boligudgift (lån +
              ejerudgifter + vedligehold). Brug en boligomkostningsberegner til
              at sammenligne købspriser med den samlede udgift og en
              rentestest – så får du et mere reelt svar end ud fra lånebeløbet
              alene.
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
