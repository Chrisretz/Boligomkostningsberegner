"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsPanel } from "@/components/ResultsPanel";
import { AffiliateCta } from "@/components/AffiliateCta";
import { calculate } from "@/lib/calc";
import { CALCULATION_UI_DELAY_MS } from "@/lib/calculationUiDelay";
import { validateCalcInput } from "@/lib/validation";
import type { CalcInput, CalcOutput } from "@/lib/types";
import { trackCalcSubmit, trackCalcResultView } from "@/lib/track";
import { PATH_BOLIGLAAN_BEREGNER } from "@/lib/site";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

type ResultPhase = "idle" | "calculating" | "ready";

export default function BeregnPage() {
  const [output, setOutput] = useState<CalcOutput | null>(null);
  const [lastInput, setLastInput] = useState<CalcInput | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<string, string>>
  >({});
  const [firstErrorId, setFirstErrorId] = useState<string | undefined>();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [resultPhase, setResultPhase] = useState<ResultPhase>("idle");
  const resultsAnchorRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLElement>(null);
  const calculationTimeoutRef = useRef<number | null>(null);
  const pendingInputRef = useRef<CalcInput | null>(null);

  useEffect(() => {
    return () => {
      if (calculationTimeoutRef.current !== null) {
        window.clearTimeout(calculationTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = useCallback((input: CalcInput) => {
    const validated = validateCalcInput(input);
    if (!validated.success) {
      if (calculationTimeoutRef.current !== null) {
        window.clearTimeout(calculationTimeoutRef.current);
        calculationTimeoutRef.current = null;
      }
      pendingInputRef.current = null;
      setResultPhase("idle");
      setValidationErrors(validated.errors);
      const firstKey = Object.keys(validated.errors)[0];
      setFirstErrorId(firstKey ? `${firstKey}-error` : undefined);
      setOutput(null);
      setLastInput(null);
      if (firstKey) {
        setTimeout(() => {
          document
            .getElementById(firstKey)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
      }
      return;
    }
    if (calculationTimeoutRef.current !== null) {
      window.clearTimeout(calculationTimeoutRef.current);
    }
    setValidationErrors({});
    setFirstErrorId(undefined);
    resultsAnchorRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
    flushSync(() => {
      setResultPhase("calculating");
    });
    pendingInputRef.current = validated.data;

    calculationTimeoutRef.current = window.setTimeout(() => {
      calculationTimeoutRef.current = null;
      const data = pendingInputRef.current;
      pendingInputRef.current = null;
      if (!data) return;
      const result = calculate(data);
      setLastInput(data);
      setOutput(result);
      setResultPhase("ready");
      trackCalcSubmit({
        purchasePriceBucket:
          data.purchasePriceDKK < 1_000_000
            ? "0-1m"
            : data.purchasePriceDKK < 3_000_000
              ? "1-3m"
              : data.purchasePriceDKK < 5_000_000
                ? "3-5m"
                : "5m+",
        propertyType: data.propertyType,
        includeMortgageFee: data.includeMortgageRegistrationFee,
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
    }, CALCULATION_UI_DELAY_MS);
  }, []);

  const handleDownloadPdf = useCallback(async () => {
    if (
      !lastInput ||
      !output ||
      isGeneratingPdf ||
      resultPhase === "calculating"
    )
      return;
    setIsGeneratingPdf(true);
    try {
      // Lazy-load PDF library only when user requests export.
      const { generateBeregningPdf } = await import("@/lib/pdf");
      generateBeregningPdf(lastInput, output);
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [isGeneratingPdf, lastInput, output, resultPhase]);

  return (
    <main className="min-h-screen py-12 px-4 overflow-x-hidden pb-24">
      <div className="container mx-auto max-w-7xl min-w-0">
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
          <p className="text-body text-text-secondary max-w-2xl mx-auto mt-4">
            Engangsomkostninger som tinglysning følger blandt andet de officielle
            satser – du kan læse om aktuelle tinglysningsafgifter hos{" "}
            <a
              href="https://skat.dk/erhverv/afgifter-paa-varer-og-ydelser-punktafgifter/nyhedsbrev-afgifter/tinglysningsafgift-ny-afgiftssats-pr-1-januar-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary underline hover:no-underline"
            >
              Skattestyrelsen
            </a>
            .
          </p>
          <p className="text-small text-text-muted max-w-2xl mx-auto mt-4">
            Læs også guiden{" "}
            <Link href={PATH_BOLIGLAAN_BEREGNER} className="text-brand-primary hover:underline font-medium">
              Boliglån beregner
            </Link>{" "}
            – 80/15/5, typiske spørgsmål og eksempler på ydelse.
          </p>
        </header>

        {/* Input-kort */}
        <section className="bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 mb-16">
          <CalculatorForm
            onSubmit={handleSubmit}
            validationErrors={validationErrors}
            firstErrorId={firstErrorId}
            isCalculating={resultPhase === "calculating"}
          />
        </section>

        {/* Fast anker: altid i DOM, så scroll kan skje i samme klik som timeren starter */}
        <div
          ref={resultsAnchorRef}
          id="beregn-dine-boligomkostninger-resultat"
          className="h-px w-full scroll-mt-24"
          aria-hidden
        />

        {/* Resultater / beregning */}
        {(resultPhase === "calculating" || resultPhase === "ready") && (
          <section
            ref={resultRef}
            className="mt-12 md:mt-16"
            aria-live="polite"
          >
            {resultPhase === "calculating" && (
              <div className="max-w-2xl mx-auto flex flex-col items-center justify-center rounded-xl border border-border bg-white py-14 px-6 shadow-soft">
                <div
                  className="h-12 w-12 rounded-full border-[3px] border-brand-primary border-t-transparent animate-spin mb-5"
                  aria-hidden
                />
                <p className="text-body font-semibold text-text-primary text-center">
                  Beregner dine boligomkostninger…
                </p>
                <p className="text-small text-text-muted text-center mt-1">
                  Samler engangsomkostninger, månedlig ydelse og rentetest
                </p>
              </div>
            )}
            {resultPhase === "ready" && output && lastInput && (
              <>
                <h2 className="text-h2 text-text-primary mb-6 text-center md:text-left">
                  Dine omkostninger
                </h2>
                <ResultsPanel
                  key={`${lastInput.purchasePriceDKK}-${lastInput.downPaymentDKK}-${lastInput.interestRateAnnualPct}`}
                  output={output}
                />
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
              </>
            )}
          </section>
        )}

        {resultPhase === "idle" && !output && (
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
