"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BIDRAG_SOURCE,
  LOAN_TYPE_LABELS,
  LOAN_TYPE_SHORT_LABELS,
  calculateBidrag,
  type LoanType,
} from "@/lib/bidrag";
import { LAANETYPE_INFO } from "@/lib/laanetypeInfo";
import { beregnForloeb } from "@/lib/laaneforloeb";
import { beregnEtablering, beregnAaop } from "@/lib/realkredit";
import { RATE_BY_LOAN_TYPE, RATE_SOURCE } from "@/lib/renter";
import { REALKREDIT_FEES } from "@/lib/constants";
import {
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { trackGaEvent } from "@/lib/trackGaEvent";

const LOAN_MIN = 100_000;
const LOAN_MAX = 10_000_000;
const LOAN_STEP = 50_000;
const IO_YEARS = 10;

/** Faldende rentebinding, længst forudsigelighed først. */
const LOAN_TYPES: LoanType[] = ["fast", "renteMaxF5F10", "f3f4", "f1f2", "fKort"];
const TERM_OPTIONS = [10, 15, 20, 25, 30];

function kr(n: number): string {
  return n.toLocaleString("da-DK");
}
function pct(n: number): string {
  return n.toFixed(2).replace(".", ",") + " %";
}
function parseDKK(v: string): number {
  return Number(v.replace(/\D/g, "")) || 0;
}

interface RatesResponse {
  source: "live" | "static";
  updatedAt: string | null;
  medAfdrag: Record<string, number>;
  afdragsfri: Record<string, number>;
  kursFast: { medAfdrag: number | null; afdragsfri: number | null };
}

export function RealkreditBeregner() {
  const [loanDKK, setLoanDKK] = useState(2_000_000);
  const [propertyDKK, setPropertyDKK] = useState(2_500_000); // 80 % belåning
  const [loanType, setLoanType] = useState<LoanType>("fast");
  const [interestOnly, setInterestOnly] = useState(false);
  const [termYears, setTermYears] = useState(30);
  const [rates, setRates] = useState<RatesResponse | null>(null);

  const [rateOverride, setRateOverride] = useState<number | null>(null);
  const [bidragOverride, setBidragOverride] = useState<number | null>(null);

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

  const autoRate =
    (interestOnly ? rates?.afdragsfri : rates?.medAfdrag)?.[loanType] ??
    RATE_BY_LOAN_TYPE[loanType];
  const ratePct = rateOverride ?? autoRate;

  const autoBidrag = calculateBidrag({
    loanDKK,
    propertyValueDKK: propertyDKK,
    loanType,
    interestOnly,
  }).ratePct;
  const bidragPct = bidragOverride ?? autoBidrag;

  const ltvPct =
    propertyDKK > 0 ? Math.min(100, (loanDKK / propertyDKK) * 100) : 0;

  const forloeb = useMemo(
    () =>
      beregnForloeb({
        ratePct,
        bidragPct,
        termYears,
        interestOnlyYears: interestOnly ? IO_YEARS : 0,
        principalDKK: loanDKK,
      }),
    [ratePct, bidragPct, termYears, interestOnly, loanDKK]
  );

  // Kurstab kun for fastforrentede lån; variable ligger nær kurs 100.
  const kurs =
    loanType === "fast"
      ? interestOnly
        ? rates?.kursFast.afdragsfri
        : rates?.kursFast.medAfdrag
      : null;
  const etablering = useMemo(
    () => beregnEtablering({ loanDKK, kurs }),
    [loanDKK, kurs]
  );

  const aaop = useMemo(
    () =>
      beregnAaop({
        loanDKK,
        effectiveKurs: etablering.effectiveKurs,
        feesDKK: etablering.totalFeesDKK,
        monthlyPayments: forloeb.monthlyPayments,
      }),
    [loanDKK, etablering.effectiveKurs, etablering.totalFeesDKK, forloeb.monthlyPayments]
  );

  const info = LAANETYPE_INFO[loanType];

  // ── Diagram: årlige betalinger, afdrag/renter/bidrag stablet nedefra ──
  const W = 640;
  const H = 200;
  const PAD = { left: 8, right: 8, top: 10, bottom: 24 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const barGap = 2;
  const barW = plotW / termYears - barGap;
  const maxYear = Math.max(...forloeb.yearly.map((y) => y.totalDKK), 1);
  const barX = (yr: number) => PAD.left + (yr - 1) * (barW + barGap);
  const barH = (a: number) => (a / maxYear) * plotH;
  const SEGMENTS = [
    { key: "principalDKK" as const, label: "Afdrag", color: "#B08A45" },
    { key: "interestDKK" as const, label: "Renter", color: "#1E3A5F" },
    { key: "bidragDKK" as const, label: "Bidrag", color: "#6F91BA" },
  ];
  const axisYears = [1, ...TERM_OPTIONS.filter((y) => y <= termYears && y > 1)];

  const dkkField =
    "w-full px-3 py-2.5 bg-white border border-border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary";

  return (
    <div className="rounded-xl border border-border bg-brand-surface shadow-soft p-5 md:p-7">
      {/* ── Input ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label
            htmlFor="rk-loan"
            className="block text-label text-text-secondary mb-1.5"
          >
            Lånebeløb (realkredit)
          </label>
          <input
            id="rk-loan"
            type="text"
            inputMode="numeric"
            value={loanDKK ? kr(loanDKK) : ""}
            onChange={(e) => setLoanDKK(parseDKK(e.target.value))}
            className={dkkField}
          />
          <input
            type="range"
            min={LOAN_MIN}
            max={LOAN_MAX}
            step={LOAN_STEP}
            value={Math.min(LOAN_MAX, Math.max(LOAN_MIN, loanDKK))}
            onChange={(e) => setLoanDKK(Number(e.target.value))}
            className="range-slider w-full mt-3"
            aria-label="Justér lånebeløb"
          />
        </div>
        <div>
          <label
            htmlFor="rk-value"
            className="block text-label text-text-secondary mb-1.5"
          >
            Boligens værdi{" "}
            <span className="text-text-muted">– bestemmer bidragssats</span>
          </label>
          <input
            id="rk-value"
            type="text"
            inputMode="numeric"
            value={propertyDKK ? kr(propertyDKK) : ""}
            onChange={(e) => setPropertyDKK(parseDKK(e.target.value))}
            className={dkkField}
          />
          <p className="mt-2 text-small text-text-muted">
            Belåningsgrad:{" "}
            <span className="font-medium text-text-secondary">
              {Math.round(ltvPct)} %
            </span>
            {ltvPct > 80 && (
              <span className="text-status-warning">
                {" "}
                – realkredit dækker normalt højst 80 %
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Lånetype */}
      <div className="mt-5">
        <p className="text-label text-text-secondary mb-1.5">Lånetype</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Vælg lånetype">
          {LOAN_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setLoanType(t);
                setRateOverride(null);
              }}
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
      </div>

      {/* Afdrag + løbetid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <p className="text-label text-text-secondary mb-1.5">Afdrag</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setInterestOnly(false);
                setRateOverride(null);
                setBidragOverride(null);
              }}
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
              onClick={() => {
                setInterestOnly(true);
                setRateOverride(null);
                setBidragOverride(null);
              }}
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
        </div>
        <div>
          <label
            htmlFor="rk-term"
            className="block text-label text-text-secondary mb-1.5"
          >
            Løbetid
          </label>
          <select
            id="rk-term"
            value={termYears}
            onChange={(e) => setTermYears(Number(e.target.value))}
            className={dkkField}
          >
            {TERM_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y} år
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rente + bidrag, redigerbare */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label
            htmlFor="rk-rate"
            className="block text-label text-text-secondary mb-1.5"
          >
            Rente
          </label>
          <input
            id="rk-rate"
            type="text"
            inputMode="decimal"
            value={pct(ratePct)}
            onChange={(e) => {
              const n = Number(
                e.target.value.replace("%", "").replace(",", ".").trim()
              );
              setRateOverride(Number.isFinite(n) ? n : 0);
            }}
            className={dkkField}
          />
          <p className="mt-1.5 text-small text-text-muted">
            {rateOverride === null
              ? rates?.source === "live"
                ? "Aktuel kurs fra Totalkredit"
                : "Vejledende niveau"
              : "Din egen rente"}
            {rateOverride !== null && (
              <>
                {" · "}
                <button
                  type="button"
                  onClick={() => setRateOverride(null)}
                  className="text-brand-primary underline hover:no-underline"
                >
                  brug aktuel
                </button>
              </>
            )}
          </p>
        </div>
        <div>
          <label
            htmlFor="rk-bidrag"
            className="block text-label text-text-secondary mb-1.5"
          >
            Bidragssats
          </label>
          <input
            id="rk-bidrag"
            type="text"
            inputMode="decimal"
            value={pct(bidragPct)}
            onChange={(e) => {
              const n = Number(
                e.target.value.replace("%", "").replace(",", ".").trim()
              );
              setBidragOverride(Number.isFinite(n) ? n : 0);
            }}
            className={dkkField}
          />
          <p className="mt-1.5 text-small text-text-muted">
            {bidragOverride === null
              ? `Beregnet ved ${Math.round(ltvPct)} % belåning`
              : "Din egen sats"}
            {bidragOverride !== null && (
              <>
                {" · "}
                <button
                  type="button"
                  onClick={() => setBidragOverride(null)}
                  className="text-brand-primary underline hover:no-underline"
                >
                  beregn igen
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* ── Resultat ── */}
      <div className="mt-8 rounded-xl bg-brand-primary text-white p-5 md:p-6">
        <p className="text-small uppercase tracking-wide text-white/70 mb-1">
          Ydelse pr. måned, år 1 (rente, bidrag og afdrag)
        </p>
        <p className="text-3xl md:text-4xl font-bold tabular-nums leading-tight">
          {kr(forloeb.firstPaymentDKK)} kr
        </p>
        <p className="text-small text-white/80 mt-2">
          {interestOnly ? (
            <>
              Efter {IO_YEARS} år:{" "}
              <span className="font-semibold">
                {kr(forloeb.paymentAfterInterestOnlyDKK)} kr/md
              </span>
            </>
          ) : (
            <>
              Sidste år:{" "}
              <span className="font-semibold">
                {kr(Math.round(forloeb.yearly[forloeb.yearly.length - 1].totalDKK / 12))} kr/md
              </span>
            </>
          )}
          {" · "}Samlede renter og bidrag over {termYears} år:{" "}
          <span className="font-semibold">{kr(forloeb.totalCostDKK)} kr</span>
        </p>
        {aaop != null && (
          <div className="mt-4 pt-4 border-t border-white/20 flex items-baseline justify-between gap-4">
            <span className="text-small text-white/80">
              ÅOP – årlige omkostninger i procent
            </span>
            <span className="text-2xl font-bold tabular-nums">
              {pct(aaop)}
            </span>
          </div>
        )}
      </div>

      {/* Diagram */}
      <figure className="mt-6">
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
          aria-label={`Årlige betalinger over ${termYears} år fordelt på afdrag, renter og bidrag.`}
        >
          {forloeb.yearly.map((yr) => {
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
          {axisYears.map((yr) => (
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
      </figure>

      {/* Etableringsomkostninger */}
      <div className="mt-6 rounded-lg border border-border p-5">
        <h3 className="text-body font-semibold text-text-primary mb-3">
          Etableringsomkostninger
        </h3>
        <ul className="space-y-2 text-body text-text-secondary">
          <li className="flex justify-between gap-4">
            <span>Tinglysning af pant</span>
            <span className="tabular-nums">
              {kr(etablering.tinglysningDKK)} kr
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span>Lånesagsgebyr</span>
            <span className="tabular-nums">
              {kr(etablering.loanCaseFeeDKK)} kr
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span>Afregningsprovision</span>
            <span className="tabular-nums">
              {kr(etablering.settlementDKK)} kr
            </span>
          </li>
          <li className="flex justify-between gap-4 items-baseline pt-3 mt-1 border-t border-border">
            <span className="font-semibold text-text-primary">
              Gebyrer i alt ved etablering
            </span>
            <span className="text-xl font-bold text-text-primary tabular-nums">
              {kr(etablering.totalFeesDKK)} kr
            </span>
          </li>
        </ul>
        {etablering.kurstabDKK > 0 && etablering.effectiveKurs != null && (
          <p className="mt-3 text-small text-text-muted leading-relaxed">
            Ved en kurs på{" "}
            {etablering.effectiveKurs.toLocaleString("da-DK", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            (efter kursfradrag) får du udbetalt ca.{" "}
            {kr(etablering.kurstabDKK)} kr mindre end lånets pålydende. Det er
            ikke en kontant regning, men betyder, at et fastforrentet lån
            skal være tilsvarende større for at dække dit behov.
          </p>
        )}
        <p className="mt-3 text-small text-text-muted leading-relaxed">
          Dit pengeinstitut kan opkræve yderligere gebyrer for at formidle
          lånet. Beløbene er vejledende, jf. Totalkredits prisblad pr.{" "}
          {REALKREDIT_FEES.RATES_VERIFIED}.
        </p>
      </div>

      {/* Forklaring af lånetype */}
      <div className="mt-6 rounded-lg bg-brand-background p-4 md:p-5">
        <p className="text-body font-semibold text-text-primary mb-1">
          {LOAN_TYPE_LABELS[loanType]}: {info.headline.toLowerCase()}
        </p>
        <p className="text-small text-text-secondary leading-relaxed mb-2">
          {info.body}
        </p>
        <p className="text-small text-text-secondary leading-relaxed">
          <span className="font-semibold text-text-primary">Vær opmærksom:</span>{" "}
          {info.risiko}
        </p>
      </div>

      {/* Kilde + videre */}
      <p className="mt-5 text-small text-text-muted leading-relaxed">
        {rates?.source === "live"
          ? "Renten er hentet fra Totalkredits kursliste"
          : "Renten er et vejledende niveau"}
        {rates?.updatedAt
          ? `, opdateret ${new Date(rates.updatedAt).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })}`
          : rateOverride === null
            ? ` pr. ${RATE_SOURCE.updated}`
            : ""}
        . Bidragssatsen følger{" "}
        <a
          href={BIDRAG_SOURCE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary underline hover:no-underline"
        >
          {BIDRAG_SOURCE.institute}s prisblad
        </a>
        . Beregningen er vejledende og er ikke et lånetilbud. Den antager fast
        rente i hele løbetiden og medregner ikke skattefradrag.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
          onClick={() =>
            trackGaEvent("beregner_link", { fra: "realkredit", til: "boligomkostninger" })
          }
          className="inline-flex justify-center items-center min-h-[48px] px-6 py-3 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:bg-brand-primaryHover transition-colors"
        >
          Se din samlede boligudgift
        </Link>
        <Link
          href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
          className="inline-flex justify-center items-center min-h-[48px] px-6 py-3 text-body font-semibold text-brand-primary border border-brand-primary rounded-md hover:bg-brand-primary/5 transition-colors"
        >
          Hvad kan jeg låne?
        </Link>
      </div>
    </div>
  );
}
