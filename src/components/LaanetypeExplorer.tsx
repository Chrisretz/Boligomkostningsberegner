"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LOAN_TYPE_LABELS, type LoanType } from "@/lib/bidrag";
import { LAANETYPE_INFO } from "@/lib/laanetypeInfo";
import { beregnForloeb, LOAN_PER_MILLION } from "@/lib/laaneforloeb";
import { RATE_BY_LOAN_TYPE } from "@/lib/renter";
import { PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";

/**
 * Interaktiv sammenligning af lånetyper pr. lånt million.
 *
 * Beløbene er pr. million, så typerne kan sammenlignes uden at brugeren
 * skal indtaste noget. Renterne hentes fra /api/renter, som falder
 * tilbage til statiske niveauer, hvis kilden er nede.
 */

const TERM_YEARS = 30;
const IO_YEARS = 10;
/** Bidragssats ved 80 % belåning, jf. Totalkredits prisblad. */
const BIDRAG_MED_AFDRAG = 0.74;
const BIDRAG_AFDRAGSFRI = 0.74 + 0.17;

const LOAN_TYPES = Object.keys(LOAN_TYPE_LABELS) as LoanType[];

function kr(n: number): string {
  return n.toLocaleString("da-DK");
}

function pct(n: number): string {
  return n.toFixed(2).replace(".", ",") + " %";
}

interface RatesResponse {
  source: "live" | "static";
  updatedAt: string | null;
  medAfdrag: Record<string, number>;
  afdragsfri: Record<string, number>;
}

export function LaanetypeExplorer() {
  const [loanType, setLoanType] = useState<LoanType>("fast");
  const [interestOnly, setInterestOnly] = useState(false);
  const [rates, setRates] = useState<RatesResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/renter")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d) setRates(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const ratePct =
    (interestOnly ? rates?.afdragsfri : rates?.medAfdrag)?.[loanType] ??
    RATE_BY_LOAN_TYPE[loanType];
  const bidragPct = interestOnly ? BIDRAG_AFDRAGSFRI : BIDRAG_MED_AFDRAG;

  const result = useMemo(
    () =>
      beregnForloeb({
        ratePct,
        bidragPct,
        termYears: TERM_YEARS,
        interestOnlyYears: interestOnly ? IO_YEARS : 0,
      }),
    [ratePct, bidragPct, interestOnly]
  );

  /** Sammenligningsgrundlag: samme lån med afdrag fra start. */
  const reference = useMemo(
    () =>
      beregnForloeb({
        ratePct,
        bidragPct: BIDRAG_MED_AFDRAG,
        termYears: TERM_YEARS,
        interestOnlyYears: 0,
      }),
    [ratePct]
  );

  const info = LAANETYPE_INFO[loanType];

  // Diagram
  const W = 640;
  const H = 200;
  const PAD = { left: 8, right: 8, top: 12, bottom: 24 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const x = (year: number) => PAD.left + (year / TERM_YEARS) * plotW;
  const y = (balance: number) =>
    PAD.top + plotH - (balance / LOAN_PER_MILLION) * plotH;

  const line = (points: { year: number; balanceDKK: number }[]) =>
    points.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.year).toFixed(1)},${y(p.balanceDKK).toFixed(1)}`).join(" ");

  return (
    <div className="not-prose my-8 rounded-xl border border-border bg-white shadow-soft p-5 md:p-7">
      <p className="text-small font-semibold uppercase tracking-[0.15em] text-brand-accent mb-1">
        Prøv selv
      </p>
      <h2 className="text-h3 text-text-primary mb-1">
        Sammenlign lånetyper pr. lånt million
      </h2>
      <p className="text-small text-text-secondary mb-5">
        Vælg en lånetype og se, hvad den koster, og hvordan gælden udvikler
        sig over {TERM_YEARS} år.
      </p>

      {/* Vælgere */}
      <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Vælg lånetype">
        {LOAN_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setLoanType(t)}
            aria-pressed={loanType === t}
            className={`px-3 py-2 text-small rounded-md transition-colors ${
              loanType === t
                ? "bg-brand-primary text-white"
                : "bg-border/60 text-text-secondary hover:bg-border"
            }`}
          >
            {LOAN_TYPE_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Vælg afdragsprofil">
        <button
          type="button"
          onClick={() => setInterestOnly(false)}
          aria-pressed={!interestOnly}
          className={`px-3 py-2 text-small rounded-md transition-colors ${
            !interestOnly
              ? "bg-brand-primary text-white"
              : "bg-border/60 text-text-secondary hover:bg-border"
          }`}
        >
          Med afdrag
        </button>
        <button
          type="button"
          onClick={() => setInterestOnly(true)}
          aria-pressed={interestOnly}
          className={`px-3 py-2 text-small rounded-md transition-colors ${
            interestOnly
              ? "bg-brand-primary text-white"
              : "bg-border/60 text-text-secondary hover:bg-border"
          }`}
        >
          {IO_YEARS} års afdragsfrihed
        </button>
      </div>

      {/* Forklaring */}
      <div className="rounded-lg bg-brand-background p-4 mb-6">
        <p className="text-body font-semibold text-text-primary mb-1">
          {info.headline}
        </p>
        <p className="text-small text-text-secondary leading-relaxed mb-2">
          {info.body}
        </p>
        <p className="text-small text-text-secondary leading-relaxed">
          <span className="font-semibold text-text-primary">Vær opmærksom:</span>{" "}
          {info.risiko}
        </p>
      </div>

      {/* Nøgletal */}
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <dt className="text-small text-text-muted">Rente</dt>
          <dd className="text-h3 text-text-primary tabular-nums">
            {pct(ratePct)}
          </dd>
        </div>
        <div>
          <dt className="text-small text-text-muted">Bidrag</dt>
          <dd className="text-h3 text-text-primary tabular-nums">
            {pct(bidragPct)}
          </dd>
        </div>
        <div>
          <dt className="text-small text-text-muted">Ydelse pr. måned</dt>
          <dd className="text-h3 text-text-primary tabular-nums">
            {kr(result.firstPaymentDKK)} kr
          </dd>
        </div>
        <div>
          <dt className="text-small text-text-muted">Restgæld efter 10 år</dt>
          <dd className="text-h3 text-text-primary tabular-nums">
            {kr(result.balanceAfter10YearsDKK)} kr
          </dd>
        </div>
      </dl>

      {/* Diagram */}
      <figure>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Restgæld pr. lånt million over ${TERM_YEARS} år. Efter 10 år er restgælden ${kr(result.balanceAfter10YearsDKK)} kr.`}
        >
          {/* Vandrette hjælpelinjer ved 0, 500.000 og 1 mio. */}
          {[0, 0.5, 1].map((f) => (
            <line
              key={f}
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(f * LOAN_PER_MILLION)}
              y2={y(f * LOAN_PER_MILLION)}
              stroke="#E5E7EB"
              strokeWidth={1}
            />
          ))}
          {/* Reference: samme lån med afdrag fra start */}
          {interestOnly && (
            <path
              d={line(reference.points)}
              fill="none"
              stroke="#CBD5E1"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
          )}
          <path
            d={line(result.points)}
            fill="none"
            stroke="#1E3A5F"
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          {/* Årstal */}
          {[0, 10, 20, 30].map((yr) => (
            <text
              key={yr}
              x={x(yr)}
              y={H - 6}
              textAnchor={yr === 0 ? "start" : yr === 30 ? "end" : "middle"}
              className="fill-text-muted"
              style={{ fontSize: 11 }}
            >
              {yr === 0 ? "Start" : `${yr} år`}
            </text>
          ))}
        </svg>
        <figcaption className="text-small text-text-muted mt-2 leading-relaxed">
          Restgæld pr. lånt million.{" "}
          {interestOnly
            ? "Den stiplede linje viser samme lån med afdrag fra start."
            : "Gælden falder langsomt i begyndelsen, fordi det meste af ydelsen går til renter."}
        </figcaption>
      </figure>

      {/* Konsekvens */}
      <div className="mt-6 rounded-lg border border-border p-4">
        <p className="text-small text-text-secondary leading-relaxed">
          Over hele løbetiden betaler du{" "}
          <strong className="text-text-primary">
            {kr(result.totalCostDKK)} kr
          </strong>{" "}
          i renter og bidrag pr. lånt million
          {interestOnly && (
            <>
              , altså{" "}
              <strong className="text-text-primary">
                {kr(result.totalCostDKK - reference.totalCostDKK)} kr mere
              </strong>{" "}
              end med afdrag fra start. Til gengæld er ydelsen{" "}
              {kr(reference.firstPaymentDKK - result.firstPaymentDKK)} kr lavere
              om måneden de første {IO_YEARS} år, hvorefter den stiger til{" "}
              {kr(result.paymentAfterInterestOnlyDKK)} kr
            </>
          )}
          .
        </p>
      </div>

      <p className="text-small text-text-muted mt-4 leading-relaxed">
        {rates?.source === "live"
          ? "Renterne er hentet fra Totalkredits kursliste"
          : "Renterne er vejledende niveauer"}
        {rates?.updatedAt
          ? `, opdateret ${new Date(rates.updatedAt).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })}`
          : ""}
        . Bidrag er beregnet ved 80 % belåning. Beregningen antager fast
        rente i hele forløbet og medregner ikke kurstab, gebyrer eller
        rentefradrag. Vil du regne på din egen bolig, så brug{" "}
        <Link
          href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
          className="text-brand-primary underline hover:no-underline"
        >
          boligomkostningsberegneren
        </Link>
        .
      </p>
    </div>
  );
}
