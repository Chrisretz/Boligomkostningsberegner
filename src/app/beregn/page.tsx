"use client";

import { useState, useCallback, useRef } from "react";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsPanel } from "@/components/ResultsPanel";
import { AffiliateCta } from "@/components/AffiliateCta";
import { calculate } from "@/lib/calc";
import { validateCalcInput } from "@/lib/validation";
import type { CalcInput, CalcOutput } from "@/lib/types";
import { trackCalcSubmit, trackCalcResultView } from "@/lib/track";

export default function BeregnPage() {
  const [output, setOutput] = useState<CalcOutput | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [firstErrorId, setFirstErrorId] = useState<string | undefined>();
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

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Centreret header */}
        <header className="text-center mb-10">
          <h1 className="text-h1 text-text-primary mb-2">
            Boligomkostningsberegner
          </h1>
          <p className="text-body text-text-secondary">
            Beregn hvad det reelt koster at købe og eje din bolig.
          </p>
        </header>

        {/* Input-kort */}
        <section className="bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 mb-spacing-section">
          <CalculatorForm
            onSubmit={handleSubmit}
            validationErrors={validationErrors}
            firstErrorId={firstErrorId}
          />
        </section>

        {/* Resultater */}
        {output && (
          <section ref={resultRef}>
            <h2 className="text-h2 text-text-primary mb-6">
              Dine omkostninger
            </h2>
            <ResultsPanel output={output} />
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
    </main>
  );
}
