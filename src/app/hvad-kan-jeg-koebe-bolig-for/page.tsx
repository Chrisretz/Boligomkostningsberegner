"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { LabelWithTooltip } from "@/components/LabelWithTooltip";
import { LoanCapacityResultsGate } from "@/components/LoanCapacityResultsGate";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { GEARING_DEFAULT } from "@/lib/loanCapacityConstants";
import { CALCULATION_UI_DELAY_MS } from "@/lib/calculationUiDelay";
import { PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";
import { trackGaEvent } from "@/lib/trackGaEvent";

const INCOME_SLIDER_MIN = 200_000;
const INCOME_SLIDER_MAX = 2_500_000;
const INCOME_SLIDER_STEP = 25_000;

type ResultPhase = "idle" | "calculating" | "ready";

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
  const [resultPhase, setResultPhase] = useState<ResultPhase>("idle");
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
    trackGaEvent("calculator_beregn_klik", { beregner_type: "lanerum" });
    setResultPhase("calculating");
    window.setTimeout(() => {
      setResultPhase("ready");
    }, CALCULATION_UI_DELAY_MS);
  }, []);

  useEffect(() => {
    if (resultPhase !== "ready") return;
    const id = window.setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(id);
  }, [resultPhase]);

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
            Resultatet er vejledende – banken vurderer din konkrete situation.{" "}
            <a
              href="https://www.finanstilsynet.dk/finansielle-temaer/forbruger-og-investorinformation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary underline hover:no-underline"
            >
              Finanstilsynet
            </a>{" "}
            har forbrugerinformation om lån og finansielle produkter.
          </p>
        </header>

        <section
          className="mb-10 max-w-3xl mx-auto rounded-md border border-border bg-brand-surface/60 p-6 md:p-8 text-left"
          aria-labelledby="seo-lanerum-heading"
        >
          <h2
            id="seo-lanerum-heading"
            className="text-h3 text-text-primary mb-4"
          >
            Lånerum og boliglån – sådan forstår du resultatet
          </h2>
          <div className="space-y-4 text-body text-text-secondary leading-relaxed">
            <p>
              Mange søger efter en <strong className="font-semibold text-text-primary">boliglån beregner</strong>, når de vil vide, hvor meget de kan låne til bolig og hvilken prisklasse der er realistisk. Denne side fungerer som et hurtigt, vejledende værktøj: Den estimerer dit <strong className="font-semibold text-text-primary">lånerum</strong> ud fra din bruttoindtægt og en gængs gearing (standard 4), og trækker den gæld fra, du allerede har. Du får altså et tommelfingerbillede af, hvor meget du kan lægge i boliglån – før du bruger bankens egne modeller og dokumentation.
            </p>
            <p>
              En <strong className="font-semibold text-text-primary">boliglån beregner</strong> i banken tager typisk flere forhold med (rådighedsbeløb, rente, boligens art og mere). Brug derfor resultatet her som et første pejlemærke og som supplement til vores{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary font-medium hover:underline"
              >
                boligomkostningsberegner
              </Link>
              , hvis du også vil se månedlig ydelse, bidrag og andre faste udgifter ved boligkøb.
            </p>
            <p>
              Gearing og gældsfaktor er centrale begreber, men de erstatter ikke bankens kreditvurdering. Jo mere du har styr på både lånerum og månedlige omkostninger, jo lettere er det at sammenligne tilbud og forhandle boliglån på et oplyst grundlag.
            </p>
          </div>
        </section>

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
              disabled={resultPhase === "calculating"}
              aria-busy={resultPhase === "calculating"}
              className="min-h-[48px] px-8 py-3 text-body font-semibold text-white bg-status-success rounded-md shadow-soft hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 touch-manipulation disabled:opacity-70 disabled:cursor-wait"
            >
              {resultPhase === "calculating" ? "Beregner…" : "Beregn lånerum"}
            </button>
          </form>
        </section>

        {(resultPhase === "calculating" || resultPhase === "ready") && (
          <div
            ref={resultRef}
            className="mt-12 md:mt-16 scroll-mt-24"
            aria-live="polite"
          >
            {resultPhase === "calculating" && (
              <div className="max-w-2xl mx-auto flex flex-col items-center justify-center rounded-xl border border-border bg-white py-14 px-6 shadow-soft">
                <div
                  className="h-12 w-12 rounded-full border-[3px] border-brand-primary border-t-transparent animate-spin mb-5"
                  aria-hidden
                />
                <p className="text-body font-semibold text-text-primary text-center">
                  Beregner dit lånerum…
                </p>
                <p className="text-small text-text-muted text-center mt-1">
                  Vi sammenholder indtægt, gearing og gæld
                </p>
              </div>
            )}
            {resultPhase === "ready" && (
              <>
                <h2 className="text-h2 text-text-primary mb-6 text-center md:text-left">
                  Dit lånerum
                </h2>
                <LoanCapacityResultsGate
                  key={`${annualFromInput}:${existingDebt}:${inputMode}`}
                  snapshotKey={`${annualFromInput}:${existingDebt}:${inputMode}`}
                  formatKr={formatKr}
                  annualFromInput={annualFromInput}
                  existingDebt={existingDebt}
                  inputMode={inputMode}
                  maxLoanCapacityDefault={maxLoanCapacityDefault}
                  maxLoanDefault={maxLoanDefault}
                  estimatedPurchaseDefault={estimatedPurchaseDefault}
                />
              </>
            )}
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
            href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
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
