import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { calculators } from "@/lib/calculators";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

const title = "Beregnere: boligomkostninger, lånerum og boliglån";
const description =
  "Gratis boligberegnere: omkostninger, månedlig ydelse og købeevne. Vejledende boliglåns- og boligberegning for boligkøbere.";
const ogTitle = "Beregnere til boligkøb – boligomkostninger og lånerum";
const ogDescription =
  "Samlet oversigt over Boligklarheds beregnere: boligomkostninger, lånerum og købeevne. Gratis værktøjer til boliglån og boligkøb.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/beregnere") },
  ...socialMetadata({
    path: "/beregnere",
    title: ogTitle,
    description: ogDescription,
  }),
};

export default function BeregnerePage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-h1 text-text-primary mb-3 break-words">
          Beregnere til boligkøb
        </h1>
        <p className="text-body text-text-secondary mb-8 text-lg leading-relaxed">
          Her finder du vores <strong className="font-semibold text-text-primary">gratis boligberegnere</strong>, der hjælper dig med at forstå{" "}
          <strong className="font-semibold text-text-primary">omkostninger ved boligkøb</strong>,{" "}
          <strong className="font-semibold text-text-primary">boliglån</strong> og{" "}
          <strong className="font-semibold text-text-primary">lånerum</strong>, før du booker møde i banken.           Brug dem som et første overblik – resultaterne er vejledende og erstatter ikke bankens kreditvurdering. Satser for fx tinglysningsafgift følger blandt andet{" "}
          <a
            href="https://skat.dk/erhverv/afgifter-paa-varer-og-ydelser-punktafgifter/nyhedsbrev-afgifter/tinglysningsafgift-ny-afgiftssats-pr-1-januar-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary underline hover:no-underline font-medium"
          >
            Skattestyrelsen
          </a>
          .
        </p>

        <section
          className="mb-10 rounded-md border border-border bg-brand-surface/70 p-6 md:p-8"
          aria-labelledby="beregnere-om-heading"
        >
          <h2 id="beregnere-om-heading" className="text-h2 text-text-primary mb-4">
            Hvorfor bruge en boligberegner online?
          </h2>
          <div className="space-y-4 text-body text-text-secondary leading-relaxed">
            <p>
              Når du overvejer <strong className="font-semibold text-text-primary">boligkøb</strong>, er der to spørgsmål, de fleste starter med: Hvad koster det at eje boligen hver måned – og hvor meget kan jeg egentlig låne? En <strong className="font-semibold text-text-primary">boligberegner</strong> samler typiske satser og regler, så du kan sammenligne scenarier (fx andel af <strong className="font-semibold text-text-primary">realkredit</strong> og banklån, <strong className="font-semibold text-text-primary">udbetaling</strong> og rente) uden at skulle indtaste alt i et regneark selv.
            </p>
            <p>
              På Boligklarhed kan du kombinere værktøjerne: Først får du overblik over <strong className="font-semibold text-text-primary">engangs- og løbende omkostninger</strong> med{" "}
              <Link href={PATH_BOLIGOMKOSTNINGER_BEREGNER} className="text-brand-primary font-medium hover:underline">
                boligomkostningsberegneren
              </Link>
              , derefter kan du estimere <strong className="font-semibold text-text-primary">hvad du kan købe bolig for</strong> ud fra indtægt og gearing med{" "}
              <Link
                href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                className="text-brand-primary font-medium hover:underline"
              >
                lånerums-beregneren
              </Link>
              . Så dækker du både budgettet og den øvre prisramme – et godt udgangspunkt for dialog med rådgiver og bank.
            </p>
          </div>
        </section>

        <section
          className="mb-10 rounded-md border border-border bg-brand-surface/70 p-6 md:p-8"
          aria-labelledby="beregnere-valg-heading"
        >
          <h2 id="beregnere-valg-heading" className="text-h2 text-text-primary mb-4">
            Sådan vælger du den rigtige beregner
          </h2>
          <div className="space-y-4 text-body text-text-secondary leading-relaxed">
            <p>
              <strong className="font-semibold text-text-primary">Boligomkostningsberegneren</strong> er oplagt, når du har en konkret bolig eller pris for øje – du kan indtaste købspris, låneprofil og ejerudgifter og få et bud på månedlig ydelse, bidrag og engangsomkostninger. Den er særligt nyttig, hvis du vil sammenligne fast og variabel rente eller teste, hvordan en rentestigning påvirker økonomien.
            </p>
            <p>
              <strong className="font-semibold text-text-primary">Beregneren &quot;Hvad kan jeg købe bolig for?&quot;</strong> er rettet mod <strong className="font-semibold text-text-primary">lånerum og gældsfaktor</strong>: Du angiver bruttoindtægt og eksisterende gæld og ser et vejledende maksimum for <strong className="font-semibold text-text-primary">boliglån</strong> og en estimeret købspris ud fra typisk finansiering. Den supplerer ikke bankens egne modeller, men giver et hurtigt pejlemærke, mange efterspørger, når de søger efter en <strong className="font-semibold text-text-primary">boliglån beregner</strong> eller vil forstå deres råderum.
            </p>
            <p>
              Vil du dykke ned i begreber som tinglysning, ejerudgifter eller realkredit, finder du også{" "}
              <Link href="/artikler" className="text-brand-primary font-medium hover:underline">
                artikler om boligkøb
              </Link>{" "}
              og en ordliste under{" "}
              <Link href="/boligbegreber" className="text-brand-primary font-medium hover:underline">
                boligbegreber
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-h2 text-text-primary mb-2">Vores beregnere</h2>
          <p className="text-body text-text-secondary mb-8">
            Klik videre til den beregner, der passer til dit spørgsmål. Alt er gratis og kræver ikke login.
          </p>

          <div className="space-y-4" role="list">
            {calculators.map((calc) => (
              <Link
                key={calc.id}
                href={calc.href}
                className="block p-6 rounded-md border border-border bg-brand-surface shadow-soft hover:border-border-strong hover:bg-border/10 transition-colors group"
              >
                <h3 className="text-h3 text-text-primary group-hover:text-brand-primary transition-colors">
                  {calc.title}
                </h3>
                <p className="mt-2 text-body text-text-secondary">
                  {calc.description}
                </p>
                <span className="mt-3 inline-block text-body font-medium text-brand-primary">
                  Gå til beregneren →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-4 mb-10 rounded-md border border-dashed border-border bg-brand-background/50 p-5 md:p-6">
          <p className="font-medium text-text-primary">Vejledende resultater</p>
          <p>
            Beregnerne er gratis at bruge og bygger på typiske regler og satser. Resultaterne er vejledende – dine konkrete tal afhænger af bank, realkreditinstitut og din personlige situation. Brug dem som beslutningsstøtte sammen med vores artikler og professionel rådgivning, når du er klar til at binde dig økonomisk.
          </p>
        </div>

        <p className="mt-8">
          <Link
            href="/"
            className="text-body text-brand-primary hover:underline"
          >
            Tilbage til forsiden
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}
