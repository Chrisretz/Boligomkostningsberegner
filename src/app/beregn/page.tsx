"use client";

import { useState, useCallback, useRef } from "react";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsPanel } from "@/components/ResultsPanel";
import { AffiliateCta } from "@/components/AffiliateCta";
import { calculate } from "@/lib/calc";
import { validateCalcInput } from "@/lib/validation";
import type { CalcInput, CalcOutput } from "@/lib/types";
import { trackCalcSubmit, trackCalcResultView } from "@/lib/track";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

export default function BeregnPage() {
  const [output, setOutput] = useState<CalcOutput | null>(null);
  const [lastInput, setLastInput] = useState<CalcInput | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<string, string>>
  >({});
  const [firstErrorId, setFirstErrorId] = useState<string | undefined>();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback((input: CalcInput) => {
    const validated = validateCalcInput(input);
    if (!validated.success) {
      setValidationErrors(validated.errors);
      const firstKey = Object.keys(validated.errors)[0];
      setFirstErrorId(firstKey ? `${firstKey}-error` : undefined);
      setOutput(null);
      if (firstKey) {
        setTimeout(() => {
          document
            .getElementById(firstKey)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
      }
      return;
    }
    setValidationErrors({});
    setFirstErrorId(undefined);
    setLastInput(validated.data);
    const result = calculate(validated.data);
    setOutput(result);
    trackCalcSubmit({
      purchasePriceBucket:
        validated.data.purchasePriceDKK < 1_000_000
          ? "0-1m"
          : validated.data.purchasePriceDKK < 3_000_000
            ? "1-3m"
            : validated.data.purchasePriceDKK < 5_000_000
              ? "3-5m"
              : "5m+",
      propertyType: validated.data.propertyType,
      includeMortgageFee: validated.data.includeMortgageRegistrationFee,
    });
    trackCalcResultView({
      monthlyTotalBucket:
        result.base.monthlyTotalDKK < 10_000
          ? "0-10k"
          : result.base.monthlyTotalDKK < 20_000
            ? "10-20k"
            : result.base.monthlyTotalDKK < 35_000
              ? "20-35k"
              : "35k+",
      ratePct: result.base.interestRateAnnualPct,
    });
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const handleDownloadPdf = useCallback(async () => {
    if (!lastInput || !output || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      // Lazy-load PDF library only when user requests export.
      const { generateBeregningPdf } = await import("@/lib/pdf");
      generateBeregningPdf(lastInput, output);
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [isGeneratingPdf, lastInput, output]);

  return (
    <main className="min-h-screen py-12 px-4 overflow-x-hidden pb-24">
      <div className="container mx-auto max-w-5xl min-w-0">
        {/* Centreret header */}
        <header className="text-center mb-10">
          <h1 className="text-xl sm:text-2xl md:text-h1 text-text-primary mb-2 break-words">
            Beregn dine boligomkostninger
          </h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Brug boligomkostningsberegneren til at se, hvad det reelt koster at
            købe og eje din bolig. Du kan teste forskellige scenarier for
            købspris, udbetaling, rente og løbetid, så du får et bedre billede
            af, hvor robust din boligøkonomi er – både her og nu og hvis
            forudsætningerne ændrer sig.
          </p>
        </header>

        {/* Input-kort */}
        <section className="bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 mb-16">
          <CalculatorForm
            onSubmit={handleSubmit}
            validationErrors={validationErrors}
            firstErrorId={firstErrorId}
          />
        </section>

        {/* Resultater */}
        {output && lastInput && (
          <section ref={resultRef} className="mt-16">
            <h2 className="text-h2 text-text-primary mb-6">
              Dine omkostninger
            </h2>
            <ResultsPanel output={output} />
            <details className="group mt-6 rounded-md border border-border bg-brand-surface shadow-soft overflow-hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-left hover:bg-border/30 transition-colors">
                <span className="text-body font-medium text-text-primary">
                  Sådan er resultaterne beregnet
                </span>
                <span className="text-text-muted font-medium tabular-nums group-open:hidden">
                  +
                </span>
                <span className="text-text-muted font-medium tabular-nums hidden group-open:inline">
                  −
                </span>
              </summary>
              <div className="border-t border-border px-4 py-4 space-y-3 text-small text-text-secondary">
                <p>
                  <strong className="text-text-primary">Månedlig ydelse:</strong>{" "}
                  summen af renter, afdrag, ejerudgifter og løbende driftsposter
                  (fx forsikring/vedligehold) ud fra dine indtastninger.
                </p>
                <p>
                  <strong className="text-text-primary">Engangsomkostninger:</strong>{" "}
                  omkostninger ved selve boligkøbet, fx tinglysning, evt.
                  låneoprettelse og andre poster inkluderet i beregnerens model.
                </p>
                <p>
                  <strong className="text-text-primary">Rentetest:</strong> viser
                  et stresstest-scenarie ved højere rente, så du kan se om
                  budgettet stadig hænger sammen.
                </p>
                <p>
                  Tallene er vejledende og afhænger af bankens konkrete vilkår og
                  din økonomi.
                </p>
              </div>
            </details>
            <div className="flex justify-center mt-8 mb-6">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center justify-center min-h-[48px] gap-2 px-6 py-3 text-body font-medium text-brand-primary border border-brand-primary rounded-md hover:bg-brand-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 touch-manipulation disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-brand-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {isGeneratingPdf ? "Genererer PDF..." : "Download PDF"}
              </button>
            </div>
            <p className="text-small text-text-muted text-center my-8">
              Bemærk: Beregningerne er vejledende og indeholder ikke skat.
            </p>
            <div className="flex justify-center max-w-md mx-auto">
              <AffiliateCta placement="result_bottom" />
            </div>
          </section>
        )}

        {!output && (
          <p className="text-small text-text-muted text-center mb-8">
            Udfyld formularen og klik &quot;Beregn omkostninger&quot; for at se
            resultaterne.
          </p>
        )}
      </div>
      <ScrollToTopButton />
    </main>
  );
}
