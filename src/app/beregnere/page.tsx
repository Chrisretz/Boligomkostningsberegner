import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { calculators, type CalculatorId } from "@/lib/calculators";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { BookOpen, Calculator, Clock, Wallet } from "lucide-react";

const CALCULATOR_ICONS: Record<CalculatorId, React.ReactNode> = {
  "boliglaan-beregner": <BookOpen size={24} strokeWidth={2} aria-hidden />,
  boligomkostninger: <Calculator size={24} strokeWidth={2} aria-hidden />,
  "hvad-kan-jeg-koebe-bolig-for": <Wallet size={24} strokeWidth={2} aria-hidden />,
};

/** Kort, intuitiv "brug den her når..."-linje til hvert kort. */
const CALCULATOR_BEST_FOR: Record<CalculatorId, string> = {
  "boliglaan-beregner": "når du vil kende ydelsen på et konkret lån",
  boligomkostninger: "når du har en pris og vil se de samlede udgifter",
  "hvad-kan-jeg-koebe-bolig-for": "når du vil vide, hvad du har råd til",
};

/** Beregneren vi fremhæver som den mest brugte */
const FEATURED_ID: CalculatorId = "boligomkostninger";

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
        <header className="max-w-2xl">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand-accent mb-2">
            Gratis værktøjer
          </p>
          <h1 className="text-h1 text-text-primary mb-3 break-words">
            Beregnere til boligkøb
          </h1>
          <p className="text-body text-text-secondary text-lg leading-relaxed">
            Tre værktøjer, der giver dig et hurtigt overblik over økonomien i et
            boligkøb. Vælg det, der matcher dit spørgsmål. Alt er gratis og
            kræver ikke login.
          </p>
        </header>

        <section className="mt-10 mb-14" aria-label="Vores beregnere">
          <div
            className="grid gap-5 md:grid-cols-3 stagger-reveal"
            role="list"
          >
            {calculators.map((calc) => (
              <Link
                key={calc.id}
                href={calc.href}
                role="listitem"
                className="card-lift group relative flex flex-col rounded-2xl border border-border bg-brand-surface p-6 shadow-soft hover:border-brand-primary"
              >
                {calc.id === FEATURED_ID && (
                  <span className="absolute right-4 top-4 rounded-full bg-brand-accent/15 px-2.5 py-0.5 text-small font-semibold text-brand-accent">
                    Mest brugte
                  </span>
                )}
                <span
                  className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-primary text-white transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3"
                  aria-hidden
                >
                  {CALCULATOR_ICONS[calc.id]}
                </span>
                <h2 className="text-h3 text-text-primary group-hover:text-brand-primary transition-colors">
                  {calc.title}
                </h2>
                <p className="mt-1 text-small font-medium text-brand-accent">
                  Bedst {CALCULATOR_BEST_FOR[calc.id]}
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-small text-text-muted">
                  <Clock size={14} strokeWidth={2} aria-hidden />
                  Tager ca. {calc.minutes} {calc.minutes === 1 ? "minut" : "minutter"}
                </p>
                <p className="mt-3 flex-1 text-body text-text-secondary leading-relaxed">
                  {calc.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-body font-semibold text-brand-primary">
                  Gå til beregneren
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-6 rounded-xl border border-dashed border-border bg-brand-background/50 px-5 py-4 text-small text-text-secondary leading-relaxed">
            Resultaterne er vejledende og bygger på typiske regler og satser.
            Dine konkrete tal afhænger af bank, realkreditinstitut og din
            situation. Satser for fx tinglysningsafgift følger blandt andet{" "}
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
        </section>

        <div className="max-w-3xl space-y-10">
          <section aria-labelledby="beregnere-om-heading">
            <h2
              id="beregnere-om-heading"
              className="text-h2 text-text-primary mb-4"
            >
              Hvorfor bruge en boligberegner online?
            </h2>
            <div className="space-y-4 text-body text-text-secondary leading-relaxed">
              <p>
                Når du overvejer{" "}
                <strong className="font-semibold text-text-primary">
                  boligkøb
                </strong>
                , er der to spørgsmål, de fleste starter med: Hvad koster det at
                eje boligen hver måned, og hvor meget kan jeg egentlig låne? En{" "}
                <strong className="font-semibold text-text-primary">
                  boligberegner
                </strong>{" "}
                samler typiske satser og regler, så du kan sammenligne scenarier
                (fx andel af{" "}
                <strong className="font-semibold text-text-primary">
                  realkredit
                </strong>{" "}
                og banklån,{" "}
                <strong className="font-semibold text-text-primary">
                  udbetaling
                </strong>{" "}
                og rente) uden at skulle indtaste alt i et regneark selv.
              </p>
              <p>
                På Boligklarhed kan du kombinere værktøjerne: Først får du
                overblik over{" "}
                <strong className="font-semibold text-text-primary">
                  engangs- og løbende omkostninger
                </strong>{" "}
                med{" "}
                <Link
                  href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                  className="text-brand-primary font-medium hover:underline"
                >
                  boligomkostningsberegneren
                </Link>
                , derefter kan du estimere{" "}
                <strong className="font-semibold text-text-primary">
                  hvad du kan købe bolig for
                </strong>{" "}
                ud fra indtægt og gearing med{" "}
                <Link
                  href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                  className="text-brand-primary font-medium hover:underline"
                >
                  lånerums-beregneren
                </Link>
                . Så dækker du både budgettet og den øvre prisramme, et godt
                udgangspunkt for dialog med rådgiver og bank.
              </p>
            </div>
          </section>

          <section aria-labelledby="beregnere-valg-heading">
            <h2
              id="beregnere-valg-heading"
              className="text-h2 text-text-primary mb-4"
            >
              Sådan vælger du den rigtige beregner
            </h2>
            <div className="space-y-4 text-body text-text-secondary leading-relaxed">
              <p>
                <strong className="font-semibold text-text-primary">
                  Boligomkostningsberegneren
                </strong>{" "}
                er oplagt, når du har en konkret bolig eller pris for øje. Du kan
                indtaste købspris, låneprofil og ejerudgifter og få et bud på
                månedlig ydelse, bidrag og engangsomkostninger. Den er særligt
                nyttig, hvis du vil sammenligne fast og variabel rente eller
                teste, hvordan en rentestigning påvirker økonomien.
              </p>
              <p>
                <strong className="font-semibold text-text-primary">
                  Beregneren &quot;Hvad kan jeg købe bolig for?&quot;
                </strong>{" "}
                er rettet mod{" "}
                <strong className="font-semibold text-text-primary">
                  lånerum og gældsfaktor
                </strong>
                : Du angiver bruttoindtægt og eksisterende gæld og ser et
                vejledende maksimum for{" "}
                <strong className="font-semibold text-text-primary">
                  boliglån
                </strong>{" "}
                og en estimeret købspris ud fra typisk finansiering. Den
                supplerer ikke bankens egne modeller, men giver et hurtigt
                pejlemærke, mange efterspørger, når de vil forstå deres råderum.
              </p>
              <p>
                Vil du dykke ned i begreber som tinglysning, ejerudgifter eller
                realkredit, finder du også{" "}
                <Link
                  href="/artikler"
                  className="text-brand-primary font-medium hover:underline"
                >
                  artikler om boligkøb
                </Link>{" "}
                og en ordliste under{" "}
                <Link
                  href="/boligbegreber"
                  className="text-brand-primary font-medium hover:underline"
                >
                  boligbegreber
                </Link>
                .
              </p>
            </div>
          </section>
        </div>

        <p className="mt-12">
          <Link href="/" className="text-body text-brand-primary hover:underline">
            ← Tilbage til forsiden
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}
