import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Sådan vurderer banken hvad du kan låne til bolig | Boligklarhed",
  description:
    "Lær hvordan banken vurderer dit lånerum: gældsfaktor, rådighedsbeløb og kreditværdighed – og hvad det betyder for dit boligkøb.",
  alternates: {
    canonical: canonicalUrl("/artikler/saadan-vurderer-banken-dit-boliglan"),
  },
  openGraph: {
    title: "Sådan vurderer banken hvad du kan låne til bolig",
    description:
      "Gældsfaktor, rådighedsbeløb og kreditværdighed – sådan vurderer banken, hvor meget du kan låne til bolig.",
    url: canonicalUrl("/artikler/saadan-vurderer-banken-dit-boliglan"),
  },
};

export default function SaadanVurdererBankenDitBoliglanPage() {
  const articleSchema = getArticleSchema({
    title: "Sådan vurderer banken hvad du kan låne til bolig",
    description:
      "Lær hvordan banken vurderer dit lånerum: gældsfaktor, rådighedsbeløb og kreditværdighed – og hvad det betyder for dit boligkøb.",
    path: "/artikler/saadan-vurderer-banken-dit-boliglan",
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
          Sådan vurderer banken hvad du kan låne til bolig
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Når du skal købe bolig, er et af de første spørgsmål: hvor meget
            kan jeg overhovedet låne? Svaret afhænger af bankens vurdering af
            din økonomi. Bankerne følger både lovkrav og interne retningslinjer,
            og de ser især på din indtægt, din eksisterende gæld og dit
            rådighedsbeløb. Her får du et overblik over, hvordan banken typisk
            vurderer dit lånerum – og hvordan du selv kan få et bud med vores
            beregner.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Gældsfaktoren: hvor mange gange indtægten må du låne?
            </h2>
            <p>
              En central tommelfingerregel er <strong>gældsfaktoren</strong>:
              forholdet mellem din samlede gæld og din årlige bruttoindtægt.
              Banken vil typisk ikke låne dig mere, end at din samlede gæld
              (inkl. det nye boliglån) svarer til et vist antal gange din
              indtægt – ofte omkring 3,5–5 gange, afhængigt af bank og
              situation. Jo højere gearing (gældsfaktor) banken accepterer, jo
              mere kan du i teorien låne, men loftet er der for at sikre, at du
              ikke tager for stor gæld i forhold til din indtægt.
            </p>
            <p>
              Finanstilsynet udsteder vejledning om, hvordan kreditinstitutter
              skal vurdere kreditværdighed. Ifølge{" "}
              <a
                href="https://www.finanstilsynet.dk/nyheder-og-presse/nyheder-og-pressemeddelelser/2025/nov/ny-vejledning-tydeliggoer-fleksibilitet-i-kreditvaerdighedsvurderingen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 rounded"
              >
                Finanstilsynets vejledning om kreditværdighedsvurdering
              </a>{" "}
              skal der foretages en konkret og individuel vurdering af
              forbrugerens evne til at betjene lånet. Det betyder, at reglerne
              ikke er én fast gældsfaktor for alle – banken kan tilpasse
              vurderingen inden for lovens rammer.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Rådighedsbeløbet: hvor meget har du tilbage hver måned?
            </h2>
            <p>
              Gældsfaktoren giver et groft loft over lånebeløbet, men banken
              kigger også på <strong>rådighedsbeløbet</strong>: det beløb, der
              er tilbage efter skat, faste udgifter (bl.a. andre lån) og et
              skøn over minimumsforbrug til mad, transport, forsikring m.m.
              Din boligydelse (afdrag og renter på realkredit og evt. banklån)
              plus ejerudgifter må ikke æde hele rådighedsbeløbet – der skal
              være luft til uforudsete udgifter og en rimelig livskvalitet.
            </p>
            <p>
              Der findes anbefalede minimumsrådighedsbeløb (fx omkring 5.000 kr.
              for én voksen og mere for familier med børn), men den konkrete
              vurdering varierer fra bank til bank og fra husstand til
              husstand. Når du ved, hvor stort et rådighedsbeløb du har, kan
              du arbejde baglæns og finde ud af, hvor høj en månedlig boligudgift
              du kan bære – og dermed hvilken købspris og lånebeløb det svarer
              til.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Udbetaling og kreditværdighed
            </h2>
            <p>
              Ud over &quot;hvor meget må jeg låne?&quot; stiller banken krav om
              <strong> udbetaling</strong>: typisk mindst 5 % af købsprisen.
              Du skal desuden have råd til engangsomkostninger (tinglysning,
              evt. ejerskifteforsikring m.m.). Banken vurderer også din
              kreditværdighed ud fra betalingshistorik, jobstabilitet og
              øvrig gæld. Alt i alt er det en samlet vurdering – ikke blot ét
              tal.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Brug vores beregner til at få et bud på dit lånerum
            </h2>
            <p>
              Du behøver ikke vente på banken for at få et første bud. I vores
              beregner &quot;Hvad kan jeg købe bolig for?&quot; indtaster du din
              bruttoindtægt og evt. eksisterende gæld, og du får udregnet et
              vejledende lånerum ud fra forskellige gearing-tal (fx 3,5–5).
              Beregneren viser både maksimalt boliglån og et skøn over
              maksimal købspris ved 80 % finansiering.
            </p>
            <p>
              <Link
                href="/beregnere/hvad-kan-jeg-koebe-bolig-for"
                className="text-brand-primary hover:underline font-medium"
              >
                Brug beregneren &quot;Hvad kan jeg købe bolig for?&quot; her
              </Link>{" "}
              for at få et overblik over dit lånerum. Husk, at det er
              vejledende – den endelige vurdering laver banken ud fra din
              konkrete situation og deres kreditpolitik.
            </p>
            <p>
              Når du har et bud på købspris og lånebeløb, kan du supplere med
              vores{" "}
              <Link
                href="/beregn"
                className="text-brand-primary hover:underline"
              >
                boligomkostningsberegner
              </Link>{" "}
              for at se den konkrete månedlige ydelse, engangsomkostninger og
              rentestest – så du ved, hvad du reelt har råd til at betale
              hver måned.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              Banken vurderer, hvor meget du kan låne til bolig, ud fra
              gældsfaktor, rådighedsbeløb, udbetaling og din overordnede
              kreditværdighed. Finanstilsynet vejleder om, at vurderingen skal
              være konkret og individuel. Du kan selv få et vejledende bud ved
              at bruge vores beregner &quot;Hvad kan jeg købe bolig for?&quot; og
              derefter bruge boligomkostningsberegneren til at tjekke den
              månedlige udgift for den købspris, du overvejer.
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
