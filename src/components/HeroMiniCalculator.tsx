"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculate } from "@/lib/calc";
import { DEFAULTS } from "@/lib/constants";
import { PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";

const PRICE_MIN = 1_000_000;
const PRICE_MAX = 15_000_000;
const PRICE_STEP = 100_000;
const DOWN_PCT_OPTIONS = [5, 10, 20] as const;

function formatKr(val: number): string {
  return val.toLocaleString("da-DK");
}

/**
 * Mini-beregner til forsidens hero: købspris-slider + udbetalingsvalg
 * med live månedstal. Sender værdierne videre til den fulde beregner.
 */
export function HeroMiniCalculator() {
  const [priceDKK, setPriceDKK] = useState(4_000_000);
  const [downPct, setDownPct] = useState<number>(5);

  const downPaymentDKK = Math.round((priceDKK * downPct) / 100);

  const output = useMemo(() => {
    const realkredit = Math.min(
      Math.round(priceDKK * 0.8),
      priceDKK - downPaymentDKK
    );
    return calculate({
      purchasePriceDKK: priceDKK,
      downPaymentDKK,
      interestRateAnnualPct: DEFAULTS.INTEREST_RATE_PCT,
      termYears: DEFAULTS.TERM_YEARS,
      propertyType: "house",
      ownerExpensesMonthlyDKK: 0,
      includeMortgageRegistrationFee: true,
      realkreditPrincipalDKK: realkredit,
      bankLoanAmountDKK: Math.max(priceDKK - downPaymentDKK - realkredit, 0),
      bankLoanInterestRatePct: 6,
      bankLoanTermYears: 10,
    });
  }, [priceDKK, downPaymentDKK]);

  const fullCalcHref = `${PATH_BOLIGOMKOSTNINGER_BEREGNER}?pris=${priceDKK}&udbetaling=${downPaymentDKK}`;

  return (
    <div className="mt-10 mx-auto max-w-2xl rounded-xl bg-white shadow-card p-6 md:p-7 text-left">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <p className="text-small font-semibold uppercase tracking-wide text-text-muted">
          Prøv med det samme
        </p>
        <p className="text-small text-text-muted">
          4 % rente · 30 år · hus (vejledende)
        </p>
      </div>

      <label
        htmlFor="hero-price"
        className="block text-label text-text-secondary mb-1.5"
      >
        Købspris:{" "}
        <span className="font-semibold text-text-primary tabular-nums">
          {formatKr(priceDKK)} kr
        </span>
      </label>
      <input
        id="hero-price"
        type="range"
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={PRICE_STEP}
        value={priceDKK}
        onChange={(e) => setPriceDKK(Number(e.target.value))}
        className="range-slider w-full"
        aria-label="Vælg købspris"
      />

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-label text-text-secondary mr-1">Udbetaling:</span>
        {DOWN_PCT_OPTIONS.map((pct) => (
          <button
            key={pct}
            type="button"
            onClick={() => setDownPct(pct)}
            className={`px-3 py-1.5 text-small rounded-md transition-colors ${
              downPct === pct
                ? "bg-brand-primary text-white"
                : "bg-border/60 text-text-secondary hover:bg-border"
            }`}
          >
            {pct} % ({formatKr(Math.round((priceDKK * pct) / 100))} kr)
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-t border-border mt-5 pt-5">
        <div>
          <p className="text-small text-text-muted mb-1">
            Ca. samlet boligudgift pr. måned
          </p>
          <p className="text-3xl font-bold text-text-primary tabular-nums leading-none">
            {formatKr(output.base.monthlyTotalDKK)} kr
          </p>
          <p className="text-small text-text-muted mt-2 tabular-nums">
            Kontantbehov ved køb: {formatKr(output.cashNeededAtCloseDKK)} kr
          </p>
        </div>
        <Link
          href={fullCalcHref}
          className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:bg-brand-primaryHover transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 shrink-0"
        >
          Se fuld beregning →
        </Link>
      </div>
      <p className="text-small text-text-muted mt-4 leading-relaxed">
        Inkl. lån, bidrag, estimeret ejendomsskat, vedligehold og tinglysning.
        Justér alle detaljer i den fulde beregner.
      </p>
    </div>
  );
}
