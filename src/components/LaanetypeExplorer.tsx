"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BIDRAG_SOURCE,
  LOAN_TYPE_LABELS,
  LOAN_TYPE_SHORT_LABELS,
  type LoanType,
} from "@/lib/bidrag";
import { LAANETYPE_INFO } from "@/lib/laanetypeInfo";
import { beregnForloeb } from "@/lib/laaneforloeb";
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

/**
 * Sorteret efter rentebinding, længst først: fast rente i 30 år, så
 * fem, tre og ét år, og til sidst F-kort, hvor renten sættes hvert
 * halve år. Rækkefølgen svarer til faldende forudsigelighed.
 */
const LOAN_TYPES: LoanType[] = [
  "fast",
  "renteMaxF5F10",
  "f3f4",
  "f1f2",
  "fKort",
];

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

  // Stablet søjlediagram: ét år pr. søjle, delt i renter, bidrag og afdrag
  const W = 640;
  const H = 220;
  const PAD = { left: 8, right: 8, top: 12, bottom: 26 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const barGap = 2;
  const barW = plotW / TERM_YEARS - barGap;
  /** Højeste årsbetaling afgør skalaen; sammenlign mod referencen, så
   *  skiftet mellem afdrag og afdragsfrihed ikke ændrer y-aksen. */
  const maxYear = Math.max(
    ...result.yearly.map((y) => y.totalDKK),
    ...reference.yearly.map((y) => y.totalDKK)
  );
  const barX = (year: number) => PAD.left + (year - 1) * (barW + barGap);
  const barH = (amount: number) => (amount / maxYear) * plotH;

  /**
   * Rækkefølgen er nedefra og op: afdrag, renter, bidrag.
   *
   * Det er ikke tilfældigt. Afdrag og renter udgør tilsammen annuiteten,
   * som er konstant ved fast rente, så grænsen mellem renter og bidrag
   * bliver en vandret linje gennem hele forløbet. Bidraget ovenpå er så
   * det eneste, der skrumper, i takt med at restgælden falder.
   */
  const SEGMENTS = [
    { key: "principalDKK" as const, label: "Afdrag", color: "#B08A45" },
    { key: "interestDKK" as const, label: "Renter", color: "#1E3A5F" },
    { key: "bidragDKK" as const, label: "Bidrag", color: "#6F91BA" },
  ];

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
            {LOAN_TYPE_SHORT_LABELS[t]}
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

      {/* Stablet søjlediagram */}
      <figure>
        <figcaption className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
          {SEGMENTS.map((s) => (
            <span
              key={s.key}
              className="inline-flex items-center gap-1.5 text-small text-text-secondary"
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              {s.label}
            </span>
          ))}
        </figcaption>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Årlige betalinger pr. lånt million fordelt på renter, bidrag og afdrag over ${TERM_YEARS} år. Første år betales ${kr(result.yearly[0].interestDKK)} kr i renter, ${kr(result.yearly[0].bidragDKK)} kr i bidrag og ${kr(result.yearly[0].principalDKK)} kr i afdrag.`}
        >
          {result.yearly.map((yr) => {
            let offset = 0;
            return (
              <g key={yr.year}>
                {SEGMENTS.map((s) => {
                  const h = barH(yr[s.key]);
                  const yPos = PAD.top + plotH - offset - h;
                  offset += h;
                  if (h <= 0) return null;
                  return (
                    <rect
                      key={s.key}
                      x={barX(yr.year)}
                      y={yPos}
                      width={barW}
                      height={h}
                      fill={s.color}
                    >
                      <title>{`År ${yr.year}: ${s.label} ${kr(yr[s.key])} kr`}</title>
                    </rect>
                  );
                })}
              </g>
            );
          })}
          {/* Markering af hvor afdragsfriheden slutter */}
          {interestOnly && (
            <line
              x1={barX(IO_YEARS + 1) - barGap / 2}
              x2={barX(IO_YEARS + 1) - barGap / 2}
              y1={PAD.top}
              y2={PAD.top + plotH}
              stroke="#B91C1C"
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />
          )}
          {[1, 10, 20, 30].map((yr) => (
            <text
              key={yr}
              x={barX(yr) + barW / 2}
              y={H - 8}
              textAnchor="middle"
              className="fill-text-muted"
              style={{ fontSize: 11 }}
            >
              {yr === 1 ? "År 1" : `${yr}`}
            </text>
          ))}
        </svg>
        <p className="text-small text-text-muted mt-2 leading-relaxed">
          Årlige betalinger pr. lånt million.{" "}
          {interestOnly
            ? `Den røde streg markerer, hvor afdragsfriheden udløber efter ${IO_YEARS} år. Frem til da er der intet afdrag, og gælden står stille.`
            : "Læg mærke til den vandrette grænse mellem renter og bidrag: afdrag og renter udgør tilsammen præcis det samme beløb hvert år, selvom fordelingen vender undervejs. Det eneste, der falder, er bidraget, fordi det beregnes af restgælden."}
        </p>
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

      <details className="mt-5 rounded-lg border border-border bg-brand-background/60 px-4 py-3">
        <summary className="cursor-pointer text-small font-semibold text-text-primary">
          Hvilke tal bruger beregningen?
        </summary>
        <div className="mt-3 space-y-2 text-small text-text-secondary leading-relaxed">
          <p>
            <strong className="text-text-primary">Rente:</strong>{" "}
            {pct(ratePct)} for {LOAN_TYPE_LABELS[loanType].toLowerCase()}{" "}
            {interestOnly ? "med afdragsfrihed" : "med afdrag"}.{" "}
            {rates?.source === "live" ? (
              <>
                Hentet automatisk fra Totalkredits offentlige kursliste
                {rates.updatedAt
                  ? `, senest opdateret ${new Date(rates.updatedAt).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })}`
                  : ""}
                . For fastforrentede lån bruges den effektive rente på den
                toneangivende åbne obligation; for tilpasningslån bruges
                kontantrenten; for F-kort dagens beregningsrente inklusive
                rentetillæg.
              </>
            ) : (
              <>
                Vejledende niveau, da den automatiske hentning ikke er
                tilgængelig lige nu.
              </>
            )}
          </p>
          <p>
            <strong className="text-text-primary">Bidragssats:</strong>{" "}
            {pct(bidragPct)}, beregnet ved 80 % belåning ud fra{" "}
            <a
              href={BIDRAG_SOURCE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary underline hover:no-underline"
            >
              {BIDRAG_SOURCE.institute}s prisblad
            </a>{" "}
            pr. {BIDRAG_SOURCE.validFrom}
            {interestOnly ? ", inklusive tillæg for afdragsfrihed" : ""}. Ved
            lavere belåning er satsen mærkbart lavere.
          </p>
          <p>
            <strong className="text-text-primary">Sådan skal tallene læses:</strong>{" "}
            Der er tale om estimater fra ét institut, ikke et lånetilbud, og
            andre institutter har andre satser. Beregningen antager, at renten
            er uændret i hele løbetiden, hvilket for variable lån netop ikke er
            realistisk; den viser, hvad du betaler i dag, ikke hvad du ender
            med. Kurstab, gebyrer, KundeKroner-rabat og rentefradrag indgår
            ikke.
          </p>
          <p>
            Vil du regne på din egen bolig med din egen belåningsgrad, så brug{" "}
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="text-brand-primary underline hover:no-underline"
            >
              boligomkostningsberegneren
            </Link>
            .
          </p>
        </div>
      </details>
    </div>
  );
}
