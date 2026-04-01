import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Boligkøb første gang: Sådan gør du",
  description:
    "Boligkøb første gang: udbetaling, omkostningsberegner, tinglysning og forsikring – guide til trygt køb.",
  alternates: { canonical: canonicalUrl("/artikler/boligkoeb-foerste-gang") },
  openGraph: {
    title: "Boligkøb første gang: Sådan gør du",
    description:
      "Boligkøb første gang: udbetaling, omkostningsberegner, tinglysning og forsikring – guide til trygt køb.",
    url: canonicalUrl("/artikler/boligkoeb-foerste-gang"),
  },
};

export default function BoligkoebFoersteGangPage() {
  const articleSchema = getArticleSchema({
    title: "Boligkøb første gang: Sådan gør du",
    description:
      "Boligkøb første gang: udbetaling, omkostningsberegner, tinglysning og forsikring – guide til trygt køb.",
    path: "/artikler/boligkoeb-foerste-gang",
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
          Boligkøb første gang: Sådan gør du
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            At købe bolig første gang kan føles overvældende – der er mange
            begreber, omkostninger og trin at holde styr på. Denne guide giver
            dig et overblik over de vigtigste skridt: fra opsparing og
            økonomisk vurdering over søgning og køb til tinglysning og
            overtagelse. Du behøver ikke være ekspert; du skal bare have en
            plan og et overblik over, hvad det reelt koster.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              1. Spar op til udbetaling og omkostninger
            </h2>
            <p>
              Du skal som minimum have <strong>5 % af købsprisen</strong> i
              udbetaling (egenkapital). I praksis er det ofte bedre at spare
              mere op, så du ikke belåner dig for hårdt. Derudover kommer
              <strong> engangsomkostninger</strong>: tinglysning af skøde og
              pant, evt. ejerskifteforsikring, og andre flytteomkostninger.
              Disse kan nemt løbe op i 50.000–150.000 kr. eller mere afhængigt
              af boligens pris og din situation. Brug en boligomkostningsberegner
              til at få et konkret tal for, hvor meget du skal have sparet op,
              før du begynder at kigge seriøst på boliger.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              2. Find ud af, hvad du har råd til
            </h2>
            <p>
              Banken vurderer, hvor meget du må låne ud fra indtægt og gæld
              (gældsfaktor og rådighedsbeløb). Men det, du <em>må</em> låne, er
              ikke det samme som det, du har <em>råd</em> til at betale hver
              måned. Den reelle boligudgift inkluderer låneydelse, ejerudgifter
              (grundskyld, forsikring, vand, varme, fællesudgifter) og en
              buffer til vedligehold. Brug en beregner til at teste forskellige
              købspriser og se den samlede månedlige udgift inkl. rentestest –
              så ved du, hvilket prisniveau der passer til din økonomi.
            </p>
            <p>
              <Link href="/beregn" className="text-brand-primary hover:underline font-medium">
                Prøv vores boligomkostningsberegner her
              </Link>{" "}
              for at se engangsomkostninger og månedlig total.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              3. Forstå de vigtigste omkostninger
            </h2>
            <p>
              Før du køber, er det smart at kende grundtallene:{" "}
              <strong>tinglysning</strong> af skøde (fast afgift + procent af
              købspris), <strong>tinglysning af pant</strong> (når du optager
              lån), <strong>ejerskifteforsikring</strong> (valgfri men ofte
              anbefalet) og <strong>vedligehold</strong> (typisk 1–1,5 % af
              købsprisen pr. år). Vi har artikler om hvert emne under Artikler –
              brug dem som opslagsværk, når du læser annoncer og snakker med
              bank og mægler.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              4. Søg bolig og få finansiering på plads
            </h2>
            <p>
              Når du ved, hvad du har råd til, kan du søge bolig med det
              prisniveau i baghovedet. Få en godkendt lånetilbud (eller
              principgodkendelse) fra banken i god tid, så du kan handle hurtigt
              når du finder noget. Læs tilstandsrapport og evt. elrapport
              grundigt, og overvej ejerskifteforsikring for at dække skjulte
              fejl. Brug en advokat eller rådgiver til at gennemgå købskontrakt
              og skøde.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              5. Efter køb: tinglysning og overtagelse
            </h2>
            <p>
              Når handlen er indgået, skal skødet og evt. pant tinglyses hos
              Tinglysningsretten. Det sker typisk i samarbejde med din bank og
              advokat. Sørg for at have kontanter klar til tinglysningsafgifter
              og øvrige omkostninger på overtagelsesdagen. Når alt er
              tinglyst og nøglerne er overdraget, er du officielt boligejer.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Brug vores værktøjer og artikler
            </h2>
            <p>
              Under <Link href="/artikler" className="text-brand-primary hover:underline">Artikler</Link>{" "}
              finder du guides til tinglysning, pant, ejerskifteforsikring,
              realkreditlån, vedligehold og mere. Kombiner dem med
              boligomkostningsberegneren, så du har både tal og viden med, når
              du køber bolig første gang.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              Boligkøb første gang: Spar op til udbetaling og engangsomkostninger,
              brug en beregner til at finde ud af, hvad du har råd til at betale
              hver måned, lær de vigtigste omkostninger at kende, få
              finansiering og advokat på plads, og sørg for tinglysning og
              overtagelse. Med en plan og et overblik over de reelle omkostninger
              bliver første boligkøb mere overskueligt.
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
