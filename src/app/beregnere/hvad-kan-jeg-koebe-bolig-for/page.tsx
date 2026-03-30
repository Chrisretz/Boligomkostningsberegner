"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { LabelWithTooltip } from "@/components/LabelWithTooltip";
import { LoanCapacityResultsGate } from "@/components/LoanCapacityResultsGate";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { GEARING_DEFAULT } from "@/lib/loanCapacityConstants";

const INCOME_SLIDER_MIN = 200_000;
const INCOME_SLIDER_MAX = 2_500_000;
const INCOME_SLIDER_STEP = 25_000;

function formatKr(val: number): string {
  return val.toLocaleString("da-DK");
}

function parseNumber(val: string): number {
  return Number(val.replace(/\D/g, "")) || 0;
}

export default function HvadKanJegKoebeBoligForPage() {
  const [inputMode, setInputMode] = useState<"annual" | "monthly">("annual");
  const [annualIncome, setAnnualIncome] = useState(600_000);
  const [monthlyIncome, setMonthlyIncome] = useState(50_000);
  const [existingDebt, setExistingDebt] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const annualFromInput =
    inputMode === "annual" ? annualIncome : monthlyIncome * 12;
  const monthlyFromInput =
    inputMode === "monthly" ? monthlyIncome : annualIncome / 12;

  const maxLoanCapacityDefault = Math.round(annualFromInput * GEARING_DEFAULT);
  const maxLoanDefault = Math.max(0, maxLoanCapacityDefault - existingDebt);
  const estimatedPurchaseDefault = Math.round(maxLoanDefault / 0.8);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const syncFromAnnual = (v: number) => {
    setAnnualIncome(v);
    setMonthlyIncome(Math.round(v / 12));
  };
  const syncFromMonthly = (v: number) => {
    setMonthlyIncome(v);
    setAnnualIncome(v * 12);
  };

  return (
    <main className="min-h-screen py-12 px-4 overflow-x-hidden pb-24">
      <div className="container mx-auto max-w-5xl min-w-0">
        <header className="text-center mb-10">
          <h1 className="text-xl sm:text-2xl md:text-h1 text-text-primary mb-2 break-words">
            Hvad kan jeg købe bolig for?
          </h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Beregn dit lånerum ud fra din indtægt og en gearing på 4 (typisk
            tommelfingerregel). Efter beregning får du et kort resumé med det
            samme; den fulde tabel med gearinger 3,5–5 og den udvidede forklaring
            vises, når du har indtastet e-mail og accepteret vilkårene herfor.
            Resultatet er vejledende – banken vurderer din konkrete situation.
          </p>
        </header>

        <section className="bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 mb-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <LabelWithTooltip
                tooltip="Bankerne bruger typisk din bruttoindtægt (løn før skat og før arbejdsmarkedsbidrag) når de beregner gældsfaktor og hvor meget du kan låne. Det er den indtægt, der står på din lønseddel før fradrag. Indtast derfor din årlige eller månedlige bruttoindtægt her."
                className="block text-sm font-semibold text-text-primary uppercase tracking-wide mb-3"
              >
                Bruttoindtægt (før skat)
              </LabelWithTooltip>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setInputMode("annual")}
                    className={`px-3 py-2 text-body rounded-md ${
                      inputMode === "annual"
                        ? "bg-brand-primary text-white"
                        : "bg-border text-text-secondary hover:bg-border-strong"
                    }`}
                  >
                    Årlig
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode("monthly")}
                    className={`px-3 py-2 text-body rounded-md ${
                      inputMode === "monthly"
                        ? "bg-brand-primary text-white"
                        : "bg-border text-text-secondary hover:bg-border-strong"
                    }`}
                  >
                    Månedlig
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {inputMode === "annual" ? (
                    <>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={annualIncome ? formatKr(annualIncome) : ""}
                        onChange={(e) =>
                          syncFromAnnual(parseNumber(e.target.value))
                        }
                        className="w-40 px-3 py-2.5 bg-white border border-border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                      <span className="text-body text-text-secondary">kr/år</span>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={monthlyIncome ? formatKr(monthlyIncome) : ""}
                        onChange={(e) =>
                          syncFromMonthly(parseNumber(e.target.value))
                        }
                        className="w-40 px-3 py-2.5 bg-white border border-border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                      <span className="text-body text-text-secondary">kr/md</span>
                    </>
                  )}
                </div>
              </div>
              <p className="mt-2 text-small text-text-muted">
                Løn før skat og arbejdsmarkedsbidrag.{" "}
                {inputMode === "annual"
                  ? `Svarer til ${formatKr(monthlyFromInput)} kr/md.`
                  : `Svarer til ${formatKr(annualFromInput)} kr/år.`}
              </p>
              <div className="mt-4">
                <p className="text-small text-text-muted mb-2">
                  Juster indtægt med skyderen
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-small text-text-muted shrink-0 w-14">
                    {formatKr(INCOME_SLIDER_MIN)}
                  </span>
                  <input
                    type="range"
                    min={INCOME_SLIDER_MIN}
                    max={INCOME_SLIDER_MAX}
                    step={INCOME_SLIDER_STEP}
                    value={Math.min(INCOME_SLIDER_MAX, Math.max(INCOME_SLIDER_MIN, annualFromInput))}
                    onChange={(e) =>
                      syncFromAnnual(Number(e.target.value))
                    }
                    className="range-slider flex-1"
                    aria-label="Juster bruttoindtægt"
                  />
                  <span className="text-small text-text-muted shrink-0 w-16 text-right">
                    {formatKr(INCOME_SLIDER_MAX)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <LabelWithTooltip
                htmlFor="existingDebt"
                tooltip="Eksisterende gæld er alt, du allerede skylder og som banken tæller med i din gældsfaktor: SU-lån, billån, forbrugslån, kreditkortgæld, andet banklån osv. Jo højere gæld, jo mindre kan du typisk låne til bolig. Indtast 0, hvis du ikke har anden gæld. Beløbet er det samlede resterende gældsbeløb."
                className="block text-sm font-semibold text-text-primary uppercase tracking-wide mb-1.5"
              >
                Eksisterende gæld (DKK) <span className="text-text-muted font-normal normal-case">– valgfrit</span>
              </LabelWithTooltip>
              <input
                id="existingDebt"
                type="text"
                inputMode="numeric"
                value={existingDebt ? formatKr(existingDebt) : ""}
                onChange={(e) => setExistingDebt(parseNumber(e.target.value))}
                placeholder="0"
                className="w-40 px-3 py-2.5 bg-white border border-border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <p className="mt-1.5 text-small text-text-muted">
                Fx SU-lån, billån, forbrugslån eller kreditkort. Trækkes fra dit lånerum.
              </p>
            </div>
            <div className="rounded-md bg-border/30 p-3 text-small text-text-secondary">
              <p className="font-medium text-text-primary mb-1">Om gearing og gældsfaktor</p>
              <p>
                Banken vurderer typisk, at din samlede gæld (boliglån + anden gæld) ikke må overstige
                en vis gearing af din bruttoindtægt – ofte omkring 4. Det betyder, at du &quot;kan få lov at
                optage&quot; op til cirka 4 gange din årlige bruttoindtægt i samlet gæld. Har du allerede
                gæld, trækkes den fra, så det resterende er det, du kan låne til bolig. Beregneren
                bruger samme tommelfingerregel og viser dit estimerede lånerum ved forskellige
                gearinger.
              </p>
            </div>
            <div>
              <p className="text-small text-text-secondary">
                Gearing bruges som <strong>4</strong> i hovedresultatet (typisk
                anbefaling). Følsomhedsanalyse viser resultat ved 3,5 – 5.
              </p>
            </div>
            <button
              type="submit"
              className="min-h-[48px] px-8 py-3 text-body font-semibold text-white bg-status-success rounded-md shadow-soft hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 touch-manipulation"
            >
              Beregn lånerum
            </button>
          </form>
        </section>

        {hasCalculated && (
          <div ref={resultRef} className="mt-16">
            <h2 className="text-h2 text-text-primary mb-6">Dit lånerum</h2>
            <LoanCapacityResultsGate
              snapshotKey={`${annualFromInput}:${existingDebt}:${inputMode}`}
              formatKr={formatKr}
              annualFromInput={annualFromInput}
              existingDebt={existingDebt}
              inputMode={inputMode}
              maxLoanCapacityDefault={maxLoanCapacityDefault}
              maxLoanDefault={maxLoanDefault}
              estimatedPurchaseDefault={estimatedPurchaseDefault}
            />
          </div>
        )}

        <p className="text-small text-text-muted text-center mb-8">
          Beregningen er vejledende. Den tager ikke højde for skat eller bankens
          egne krav til rådighedsbeløb. Eksisterende gæld er med i beregningen,
          når du indtaster den. Brug resultatet som pejlemærke og bekræft med
          din bank.
        </p>

        <p className="text-center">
          <Link
            href="/beregnere"
            className="text-body text-brand-primary hover:underline"
          >
            ← Alle beregnere
          </Link>
          {" · "}
          <Link
            href="/beregn"
            className="text-body text-brand-primary hover:underline"
          >
            Boligomkostningsberegner
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}
