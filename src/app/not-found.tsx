import Link from "next/link";
import { Calculator, FileText, Wallet } from "lucide-react";
import {
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";

export const metadata = {
  title: "Siden blev ikke fundet",
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  {
    href: PATH_BOLIGOMKOSTNINGER_BEREGNER,
    title: "Boligomkostningsberegner",
    description:
      "Se hvad boligen koster om måneden – lån, bidrag, ejendomsskat og vedligehold.",
    icon: <Calculator size={22} strokeWidth={2} aria-hidden />,
  },
  {
    href: PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
    title: "Hvad kan jeg købe bolig for?",
    description: "Beregn dit vejledende lånerum ud fra indtægt og gæld.",
    icon: <Wallet size={22} strokeWidth={2} aria-hidden />,
  },
  {
    href: "/artikler",
    title: "Artikler om boligøkonomi",
    description:
      "Guides til tinglysning, realkredit, ejerudgifter og boligkøb generelt.",
    icon: <FileText size={22} strokeWidth={2} aria-hidden />,
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand-accent mb-3">
          Fejl 404
        </p>
        <h1 className="text-h1 text-text-primary mb-4">
          Vi kunne ikke finde siden
        </h1>
        <p className="text-body text-text-secondary max-w-xl mx-auto mb-10">
          Siden er måske flyttet eller slettet – eller adressen indeholder en
          tastefejl. Her er de mest brugte steder på Boligklarhed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-10">
          {SUGGESTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card-lift block p-5 rounded-lg border border-border bg-white shadow-soft hover:border-brand-primary group"
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-primary text-white mb-3"
                aria-hidden
              >
                {s.icon}
              </span>
              <p className="text-body font-semibold text-text-primary group-hover:text-brand-primary leading-snug mb-1.5">
                {s.title}
              </p>
              <p className="text-small text-text-secondary leading-relaxed">
                {s.description}
              </p>
            </Link>
          ))}
        </div>

        <p>
          <Link
            href="/"
            className="text-body text-brand-primary hover:underline font-medium"
          >
            ← Tilbage til forsiden
          </Link>
        </p>
      </div>
    </main>
  );
}
