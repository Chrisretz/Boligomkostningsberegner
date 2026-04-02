"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import type { CalcInput, HouseholdSize } from "@/lib/types";
import type { ValidationErrors } from "@/lib/validation";
import { DEFAULTS } from "@/lib/constants";
import { estimateMonthlyElDKK, getEstimatedYearlyKWh } from "@/lib/electricity";

interface CalculatorFormProps {
  onSubmit: (input: CalcInput) => void;
  validationErrors?: ValidationErrors;
  firstErrorId?: string;
  isCalculating?: boolean;
}

const TERM_OPTIONS = Array.from({ length: 40 }, (_, i) => i + 1);
const PURCHASE_PRICE_SLIDER_MIN = 1_000_000;
const PURCHASE_PRICE_SLIDER_MAX = 20_000_000;
const PURCHASE_PRICE_SLIDER_STEP = 250_000;

function parseDKK(val: string): number {
  return Number(val.replace(/\D/g, "")) || 0;
}

function formatDKK(val: number): string {
  if (val === 0) return "";
  return val.toLocaleString("da-DK");
}

function LabelWithTooltip({
  htmlFor,
  children,
  tooltip,
  className = "",
}: {
  htmlFor?: string;
  children: React.ReactNode;
  tooltip: string;
  className?: string;
}) {
  const content = (
    <span className="group relative inline-block cursor-help border-b border-dotted border-current">
      {children}
      <span
        role="tooltip"
        className="absolute left-0 bottom-full mb-1.5 hidden w-72 max-w-[calc(100vw-2rem)] p-2.5 text-left text-small leading-snug text-white bg-gray-800 rounded shadow-lg group-hover:block z-20"
      >
        {tooltip}
      </span>
    </span>
  );
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={className}>
        {content}
      </label>
    );
  }
  return <span className={className}>{content}</span>;
}

export function CalculatorForm({
  onSubmit,
  validationErrors = {},
  firstErrorId,
  isCalculating = false,
}: CalculatorFormProps) {
  const [purchasePriceDKK, setPurchasePriceDKK] = useState(5_000_000);
  const [downPaymentDKK, setDownPaymentDKK] = useState(250_000);
  const [interestRateAnnualPct, setInterestRateAnnualPct] = useState(2.5);
  const [termYears, setTermYears] = useState<number>(DEFAULTS.TERM_YEARS);
  const [propertyType, setPropertyType] = useState<"house" | "apartment">(
    "house"
  );
  const [squareMeters, setSquareMeters] = useState<number>(0);
  const [householdSize, setHouseholdSize] = useState<HouseholdSize | undefined>(
    undefined
  );
  const [ownerExpensesMonthlyDKK, setOwnerExpensesMonthlyDKK] = useState(0);
  const [otherMonthlyDKK, setOtherMonthlyDKK] = useState(0);
  const [interestOnly, setInterestOnly] = useState(false);
  const [includeMortgageRegistrationFee, setIncludeMortgageRegistrationFee] =
    useState(true);
  const [mortgagePrincipalDKK, setMortgagePrincipalDKK] = useState<
    number | undefined
  >(undefined);
  const [otherUpfrontDKK, setOtherUpfrontDKK] = useState(0);
  const [realkreditAmountDKK, setRealkreditAmountDKK] = useState(4_000_000);
  const [bankLoanInterestRatePct, setBankLoanInterestRatePct] = useState(4);
  const [bankLoanTermYears, setBankLoanTermYears] = useState(10);
  const [bankLoanInterestOnly, setBankLoanInterestOnly] = useState(false);
  const [isRenteFocused, setIsRenteFocused] = useState(false);
  const [renteInputValue, setRenteInputValue] = useState("");
  const [isBankRenteFocused, setIsBankRenteFocused] = useState(false);
  const [bankRenteInputValue, setBankRenteInputValue] = useState("");
  const [editingDkkField, setEditingDkkField] = useState<string | null>(null);
  const [editingDkkValue, setEditingDkkValue] = useState("");

  const loanPrincipal = Math.max(purchasePriceDKK - downPaymentDKK, 0);
  const bankLoanAmountDKK = Math.max(0, loanPrincipal - realkreditAmountDKK);

  // Hold udbetaling mindst 5 % af købspris (realkredit og udbetaling er uafhængige)
  useEffect(() => {
    if (purchasePriceDKK <= 0) return;
    const minDown = Math.round((purchasePriceDKK * 5) / 100);
    if (downPaymentDKK < minDown) {
      setDownPaymentDKK(minDown);
    }
  }, [purchasePriceDKK, downPaymentDKK]);

  // Hold realkreditlån max 80 % af købspris og max (købspris − udbetaling)
  useEffect(() => {
    if (purchasePriceDKK <= 0) return;
    const maxRealkredit = Math.round((purchasePriceDKK * 80) / 100);
    const maxRealkreditGivenDown = loanPrincipal;
    const cap = Math.min(maxRealkredit, maxRealkreditGivenDown);
    if (realkreditAmountDKK > cap) {
      setRealkreditAmountDKK(cap);
    }
  }, [purchasePriceDKK, loanPrincipal, realkreditAmountDKK]);

  function makeDkkInputProps(
    field: string,
    value: number,
    setValue: (n: number) => void,
    placeholder?: string
  ) {
    const isEditing = editingDkkField === field;
    const parsed = parseDKK(editingDkkValue);
    return {
      value: isEditing
        ? formatDKK(parsed)
        : value === 0
          ? ""
          : formatDKK(value),
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
        setEditingDkkField(field);
        setEditingDkkValue(value === 0 ? "" : String(value));
        setTimeout(() => e.target.select(), 0);
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isEditing) {
          setEditingDkkValue(String(parseDKK(e.target.value)));
        } else {
          setValue(parseDKK(e.target.value));
        }
      },
      onBlur: () => {
        const parsedVal = parseDKK(editingDkkValue);
        setValue(parsedVal);
        setEditingDkkField(null);
      },
      placeholder,
    };
  }

  const setDownPaymentFromPct = useCallback(
    (pct: number) => {
      const val = Math.round((purchasePriceDKK * pct) / 100);
      setDownPaymentDKK(val);
    },
    [purchasePriceDKK]
  );

  const maxRealkredit = Math.min(
    purchasePriceDKK > 0 ? Math.round((purchasePriceDKK * 80) / 100) : 0,
    loanPrincipal
  );
  const setRealkreditAmountFromValue = useCallback(
    (amount: number) => {
      const capped = Math.min(Math.max(0, amount), maxRealkredit);
      setRealkreditAmountDKK(capped);
    },
    [maxRealkredit]
  );

  const setRealkreditAmountFromPct = useCallback(
    (pct: number) => {
      const amount = Math.round((purchasePriceDKK * pct) / 100);
      setRealkreditAmountDKK(Math.min(amount, maxRealkredit));
    },
    [purchasePriceDKK, maxRealkredit]
  );

  const LOAN_PCT_OPTIONS = [80, 75, 70, 65] as const;
  const loanPctOfPrice =
    purchasePriceDKK > 0
      ? Math.round((realkreditAmountDKK / purchasePriceDKK) * 100)
      : 0;
  const downPaymentPctOfPrice =
    purchasePriceDKK > 0
      ? Math.round((downPaymentDKK / purchasePriceDKK) * 100)
      : 0;

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const input: CalcInput = {
        purchasePriceDKK,
        downPaymentDKK,
        interestRateAnnualPct,
        termYears,
        interestOnly,
        propertyType,
        squareMeters: squareMeters > 0 ? squareMeters : undefined,
        householdSize: householdSize ?? undefined,
        ownerExpensesMonthlyDKK,
        otherMonthlyDKK: otherMonthlyDKK || 0,
        includeMortgageRegistrationFee,
        mortgagePrincipalDKK:
          includeMortgageRegistrationFee && realkreditAmountDKK > 0
            ? (mortgagePrincipalDKK ?? realkreditAmountDKK)
            : undefined,
        otherUpfrontDKK: otherUpfrontDKK || 0,
        realkreditPrincipalDKK: realkreditAmountDKK,
        bankLoanAmountDKK: bankLoanAmountDKK,
        bankLoanInterestRatePct: bankLoanAmountDKK > 0 ? bankLoanInterestRatePct : undefined,
        bankLoanTermYears: bankLoanAmountDKK > 0 ? bankLoanTermYears : undefined,
        bankLoanInterestOnly: bankLoanAmountDKK > 0 ? bankLoanInterestOnly : undefined,
      };
      onSubmit(input);
    },
    [
      purchasePriceDKK,
      downPaymentDKK,
      interestRateAnnualPct,
      termYears,
      interestOnly,
      propertyType,
      squareMeters,
      householdSize,
      ownerExpensesMonthlyDKK,
      otherMonthlyDKK,
      includeMortgageRegistrationFee,
      mortgagePrincipalDKK,
      realkreditAmountDKK,
      bankLoanAmountDKK,
      otherUpfrontDKK,
      bankLoanInterestRatePct,
      bankLoanTermYears,
      bankLoanInterestOnly,
      termYears,
      onSubmit,
    ]
  );

  const inputClass = (field: string) =>
    `w-full px-3 py-2.5 bg-white border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${
      validationErrors[field]
        ? "border-status-danger"
        : "border-border"
    }`;

  const RENTE_VALG = [2, 2.5, 3, 4];

  function formatRente(val: number, decimals = 2): string {
    return val.toFixed(decimals).replace(".", ",") + " %";
  }

  function parseRente(val: string): number {
    const cleaned = val.replace(/%/g, "").replace(",", ".").trim();
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  }

  const sectionTitle = "text-sm font-semibold text-text-primary uppercase tracking-wide mb-3";

  return (
    <form onSubmit={handleSubmit} className="space-y-16" noValidate>
      {/* Generel information */}
      <section className="space-y-4">
        <h2 className={sectionTitle}>Generel information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <LabelWithTooltip
              htmlFor="propertyType"
              tooltip="Vælg om boligen er et hus eller en ejerlejlighed. Det påvirker vedligeholdelsesberegningen: hus bruger 1,5 % af købsprisen pr. år, lejlighed 1,0 %, som gennemsnitlig reserve til vedligehold."
              className="block text-label text-text-secondary mb-1.5"
            >
              Type bolig
            </LabelWithTooltip>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value as "house" | "apartment")
              }
              className={inputClass("propertyType")}
            >
              <option value="house">Hus</option>
              <option value="apartment">Lejlighed</option>
            </select>
            <p className="mt-1.5 text-small text-text-muted">
              Vedligehold beregnes automatisk (1,5 % hus / 1 % lejlighed af købspris pr. år).
            </p>
          </div>
          <div>
            <LabelWithTooltip
              htmlFor="squareMeters"
              tooltip="Boligens størrelse i kvadratmeter. Valgfrit felt – bruges til at give et bedre overblik over din bolig."
              className="block text-label text-text-secondary mb-1.5"
            >
              Antal kvadratmeter (m²) <span className="text-text-muted">– valgfrit</span>
            </LabelWithTooltip>
            <input
              id="squareMeters"
              type="text"
              inputMode="numeric"
              value={squareMeters > 0 ? squareMeters : ""}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "");
                setSquareMeters(v === "" ? 0 : Math.min(9999, Number(v)));
              }}
              placeholder="fx 120"
              className={inputClass("squareMeters")}
            />
          </div>
        </div>
        <div className="max-w-xs">
          <LabelWithTooltip
            htmlFor="householdSize"
            tooltip="Vælg antal personer for at få et vejledende estimat af månedlig eludgift baseret på gennemsnitligt forbrug (Energistyrelsen/EWII). Estimatet gælder typisk lejlighed på ca. 80 m² eller hus på ca. 160 m² uden elvarme/elbil. Du kan lade feltet stå tom, hvis du selv vil indtaste el i Øvrige månedlige."
            className="block text-label text-text-secondary mb-1.5"
          >
            Antal personer i husstanden <span className="text-text-muted">– valgfrit (til el-estimat)</span>
          </LabelWithTooltip>
          <select
            id="householdSize"
            value={householdSize ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setHouseholdSize(v === "" ? undefined : (Number(v) as HouseholdSize));
            }}
            className={inputClass("householdSize")}
          >
            <option value="">Vælg …</option>
            <option value={1}>1 person</option>
            <option value={2}>2 personer</option>
            <option value={3}>3 personer</option>
            <option value={4}>4 personer</option>
            <option value={5}>5 eller flere</option>
          </select>
          {householdSize != null && (
            <p className="mt-1.5 text-small text-text-muted">
              Estimeret el: ca. {getEstimatedYearlyKWh(propertyType, householdSize).toLocaleString("da-DK")} kWh/år →{" "}
              {formatDKK(estimateMonthlyElDKK(propertyType, householdSize, DEFAULTS.EL_PRICE_KR_PER_KWH))} kr/md.
              (vejledende pris {DEFAULTS.EL_PRICE_KR_PER_KWH} kr/kWh)
            </p>
          )}
        </div>
      </section>

      {/* Købspris og udbetaling */}
      <section className="space-y-4">
        <h2 className={sectionTitle}>Købspris og udbetaling</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <LabelWithTooltip
              htmlFor="purchasePriceDKK"
              tooltip="Boligens pris er den aftalte købspris for ejendommen (hus eller lejlighed), som du indtaster her. Beløbet bruges som udgangspunkt for udbetaling, realkreditlån, evt. banklån og vedligehold."
              className="block text-label text-text-secondary mb-1.5"
            >
              Boligens pris (DKK)
            </LabelWithTooltip>
            <input
              id="purchasePriceDKK"
              type="text"
              inputMode="numeric"
              {...makeDkkInputProps(
                "purchasePriceDKK",
                purchasePriceDKK,
                setPurchasePriceDKK,
                "5.000.000"
              )}
              className={inputClass("purchasePriceDKK")}
              aria-invalid={!!validationErrors.purchasePriceDKK}
            />
            {validationErrors.purchasePriceDKK && (
              <p
                id="purchasePriceDKK-error"
                className="mt-1 text-small text-status-danger"
                role="alert"
              >
                {validationErrors.purchasePriceDKK}
              </p>
            )}
            <div className="mt-4">
              <p className="text-small text-text-muted mb-2">
                Juster købspris med skyderen
              </p>
              <div className="flex items-center gap-3">
                <span className="text-small text-text-muted shrink-0 w-14">
                  {formatDKK(PURCHASE_PRICE_SLIDER_MIN)}
                </span>
                <input
                  type="range"
                  min={PURCHASE_PRICE_SLIDER_MIN}
                  max={PURCHASE_PRICE_SLIDER_MAX}
                  step={PURCHASE_PRICE_SLIDER_STEP}
                  value={Math.min(
                    PURCHASE_PRICE_SLIDER_MAX,
                    Math.max(PURCHASE_PRICE_SLIDER_MIN, purchasePriceDKK)
                  )}
                  onChange={(e) =>
                    setPurchasePriceDKK(Number(e.target.value))
                  }
                  className="range-slider flex-1"
                  aria-label="Juster boligens pris"
                />
                <span className="text-small text-text-muted shrink-0 w-16 text-right">
                  {formatDKK(PURCHASE_PRICE_SLIDER_MAX)}
                </span>
              </div>
            </div>
          </div>
          <div>
            <LabelWithTooltip
              htmlFor="downPaymentDKK"
              tooltip="Udbetaling er det beløb, du selv lægger ved køb af boligen (egenkapital). Resten finansieres typisk med realkreditlån og evt. banklån. Udbetalingen skal som minimum være 5 % af købsprisen."
              className="block text-label text-text-secondary mb-1.5"
            >
              Udbetaling (DKK)
            </LabelWithTooltip>
            <input
              id="downPaymentDKK"
              type="text"
              inputMode="numeric"
              {...makeDkkInputProps(
                "downPaymentDKK",
                downPaymentDKK,
                setDownPaymentDKK,
                "300.000"
              )}
              className={inputClass("downPaymentDKK")}
              aria-invalid={!!validationErrors.downPaymentDKK}
            />
            <div className="flex gap-2 mt-1.5">
              {[5, 10, 15, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPaymentFromPct(pct)}
                  className="px-3 py-1.5 text-small bg-border rounded hover:bg-border-strong text-text-secondary"
                >
                  {pct}%
                </button>
              ))}
            </div>
            {validationErrors.downPaymentDKK && (
              <p
                id="downPaymentDKK-error"
                className="mt-1.5 text-small text-status-danger"
                role="alert"
              >
                {validationErrors.downPaymentDKK}
              </p>
            )}
            {purchasePriceDKK > 0 && (
              <p className="mt-1.5 text-small text-text-muted">
                Udbetaling svarer til {downPaymentPctOfPrice} % af købsprisen.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Finansiering (Realkreditlån) */}
      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className={sectionTitle}>Finansiering (Realkreditlån)</h2>
          <p className="text-small text-text-secondary">
            <Link
              href="/artikler/realkreditlan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 rounded"
            >
              Læs mere om realkreditlån her
            </Link>
          </p>
        </div>
        {/* Række 1: Lånebeløb og Afdragsfrihed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <LabelWithTooltip
              htmlFor="loanAmountDKK"
              tooltip="Det beløb, du ønsker at låne som realkreditlån. Må højst udgøre 80 % af købsprisen. Resten af finansieringen (købspris minus udbetaling minus dette beløb) beregnes som banklån."
              className="block text-label text-text-secondary mb-1.5"
            >
              Lånebeløb (DKK)
            </LabelWithTooltip>
            <input
              id="loanAmountDKK"
              type="text"
              inputMode="numeric"
              {...makeDkkInputProps(
                "loanAmountDKK",
                realkreditAmountDKK,
                setRealkreditAmountFromValue,
                "0"
              )}
              className={inputClass("loanAmountDKK")}
              aria-invalid={!!validationErrors.realkreditPrincipalDKK}
            />
            {validationErrors.realkreditPrincipalDKK && (
              <p className="mt-1.5 text-small text-status-danger" role="alert">
                {validationErrors.realkreditPrincipalDKK}
              </p>
            )}
            <div className="flex gap-2 mt-1.5">
              {LOAN_PCT_OPTIONS.map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setRealkreditAmountFromPct(pct)}
                  className={`px-3 py-1.5 text-small rounded hover:bg-border-strong ${
                    loanPctOfPrice === pct
                      ? "bg-brand-primary text-white"
                      : "bg-border text-text-secondary"
                  }`}
                >
                  {pct} %
                </button>
              ))}
            </div>
            {purchasePriceDKK > 0 && (
              <p className="mt-1.5 text-small text-text-muted">
                Lånebeløbet svarer til {loanPctOfPrice} % af købsprisen.
              </p>
            )}
          </div>
          <div>
            <LabelWithTooltip
              htmlFor="interestOnly"
              tooltip="Ved afdragsfrihed betaler du i en periode kun renter af lånet; der afdrages ikke på hovedstolen. Ydelsen bliver derfor lavere i den periode, men gælden forbliver uændret indtil afdragsfriheden udløber."
              className="block text-label text-text-secondary mb-1.5"
            >
              Afdragsfrihed
            </LabelWithTooltip>
            <select
              id="interestOnly"
              value={interestOnly ? "ja" : "nej"}
              onChange={(e) => setInterestOnly(e.target.value === "ja")}
              className={inputClass("interestOnly")}
            >
              <option value="nej">Nej</option>
              <option value="ja">Ja</option>
            </select>
          </div>
        </div>
        {/* Række 2: Rente og Løbetid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <LabelWithTooltip
              htmlFor="interestRateAnnualPct"
              tooltip="Den årlige rente på realkreditlånet (f.eks. F1, F3 eller F5). Renten bruges til at beregne din månedlige ydelse. Brug den rente, du forventer eller har tilbudt fra banken."
              className="block text-label text-text-secondary mb-1.5"
            >
              Rente
            </LabelWithTooltip>
            <input
              id="interestRateAnnualPct"
              type="text"
              inputMode="decimal"
              value={
                isRenteFocused
                  ? renteInputValue
                  : interestRateAnnualPct === 0
                    ? ""
                    : formatRente(interestRateAnnualPct)
              }
              onChange={(e) => {
                if (isRenteFocused) {
                  setRenteInputValue(e.target.value);
                } else {
                  setInterestRateAnnualPct(parseRente(e.target.value));
                }
              }}
              onFocus={(e) => {
                setIsRenteFocused(true);
                const raw =
                  interestRateAnnualPct === 0
                    ? ""
                    : interestRateAnnualPct
                        .toFixed(2)
                        .replace(".", ",");
                setRenteInputValue(raw);
                setTimeout(() => e.target.select(), 0);
              }}
              onBlur={() => {
                const parsed = parseRente(renteInputValue);
                setInterestRateAnnualPct(parsed);
                setIsRenteFocused(false);
              }}
              className={inputClass("interestRateAnnualPct")}
              placeholder="2,5 %"
              aria-invalid={!!validationErrors.interestRateAnnualPct}
            />
            <div className="flex gap-2 mt-1.5">
              {RENTE_VALG.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setInterestRateAnnualPct(r)}
                  className={`px-3 py-1.5 text-small rounded hover:bg-border-strong ${
                    interestRateAnnualPct === r
                      ? "bg-brand-primary text-white"
                      : "bg-border text-text-secondary"
                  }`}
                >
                  {formatRente(r, 1)}
                </button>
              ))}
            </div>
            {validationErrors.interestRateAnnualPct && (
              <p
                id="interestRateAnnualPct-error"
                className="mt-1.5 text-small text-status-danger"
                role="alert"
              >
                {validationErrors.interestRateAnnualPct}
              </p>
            )}
          </div>
          <div>
            <LabelWithTooltip
              htmlFor="termYears"
              className="block text-label text-text-secondary mb-1.5"
              tooltip="Løbetiden er den periode, lånet er beregnet over (typisk 30 år). Jo længere løbetid, jo lavere månedlig ydelse, men flere renter i alt. Ved afdragsfrihed påvirker løbetiden ikke den månedlige ydelse i afdragsfrihedsperioden."
            >
              Løbetid
            </LabelWithTooltip>
            <select
              id="termYears"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className={inputClass("termYears")}
              aria-invalid={!!validationErrors.termYears}
            >
              {TERM_OPTIONS.map((y) => (
                <option key={y} value={y}>
                  {y} år
                </option>
              ))}
            </select>
            {validationErrors.termYears && (
              <p
                id="termYears-error"
                className="mt-1 text-small text-status-danger"
                role="alert"
              >
                {validationErrors.termYears}
              </p>
            )}
          </div>
        </div>
        {interestOnly && (
          <p className="text-small text-text-muted">
            Ved afdragsfrihed betaler du kun renter; der afdrages ikke på gælden i den valgte periode.
          </p>
        )}
      </section>

      {/* Finansiering (bolig- / banklån) */}
      <section className="space-y-4">
        <h2 className={sectionTitle}>Finansiering (bolig- / banklån)</h2>
        {/* Række 1: Lånebeløb (beregnet) og Afdragsfrihed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <LabelWithTooltip
              tooltip="Banklånet er den del af finansieringen, der ikke dækkes af realkreditlån. Beløbet beregnes automatisk som: købspris minus udbetaling minus realkreditlån. Når dette beløb er over 0, bruges rente og løbetid herunder til at beregne den månedlige ydelse til banklånet."
              className="block text-label text-text-secondary mb-1.5"
            >
              Lånebeløb (DKK)
            </LabelWithTooltip>
            <div className="px-3 py-2.5 bg-brand-background border border-border rounded-md text-body text-text-primary">
              {formatDKK(bankLoanAmountDKK) || "0"}
            </div>
            <p className="mt-1.5 text-small text-text-muted">
              Købspris − udbetaling − realkreditlån = {formatDKK(bankLoanAmountDKK) || "0"} kr.
            </p>
          </div>
          <div>
            <LabelWithTooltip
              htmlFor="bankLoanInterestOnly"
              tooltip="Ved afdragsfrihed på banklånet betaler du kun renter i en periode; der afdrages ikke på hovedstolen. Banklån har ofte kortere løbetid end realkredit (fx 10 år) og kan have afdragsfrihed de første år."
              className="block text-label text-text-secondary mb-1.5"
            >
              Afdragsfrihed
            </LabelWithTooltip>
            <select
              id="bankLoanInterestOnly"
              value={bankLoanInterestOnly ? "ja" : "nej"}
              onChange={(e) => setBankLoanInterestOnly(e.target.value === "ja")}
              className={inputClass("bankLoanInterestOnly")}
            >
              <option value="nej">Nej</option>
              <option value="ja">Ja</option>
            </select>
          </div>
        </div>
        {/* Række 2: Rente og Løbetid (identisk med realkredit) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <LabelWithTooltip
              htmlFor="bankLoanInterestRatePct"
              tooltip="Renten på banklånet er typisk højere end på realkreditlån, fordi lånet ikke er obligationssikret. Indtast den rente, du forventer eller har tilbudt fra banken."
              className="block text-label text-text-secondary mb-1.5"
            >
              Rente
            </LabelWithTooltip>
            <input
              id="bankLoanInterestRatePct"
              type="text"
              inputMode="decimal"
              value={
                isBankRenteFocused
                  ? bankRenteInputValue
                  : bankLoanInterestRatePct === 0
                    ? ""
                    : (bankLoanInterestRatePct.toFixed(2).replace(".", ",") + " %")
              }
              onChange={(e) => {
                if (isBankRenteFocused) {
                  setBankRenteInputValue(e.target.value);
                } else {
                  setBankLoanInterestRatePct(parseRente(e.target.value));
                }
              }}
              onFocus={(e) => {
                setIsBankRenteFocused(true);
                setBankRenteInputValue(
                  bankLoanInterestRatePct === 0 ? "" : bankLoanInterestRatePct.toFixed(2).replace(".", ",")
                );
                setTimeout(() => e.target.select(), 0);
              }}
              onBlur={() => {
                setBankLoanInterestRatePct(parseRente(bankRenteInputValue));
                setIsBankRenteFocused(false);
              }}
              className={inputClass("bankLoanInterestRatePct")}
              placeholder="4 %"
            />
            <div className="flex gap-2 mt-1.5">
              {[3, 4, 5, 6].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setBankLoanInterestRatePct(r)}
                  className={`px-3 py-1.5 text-small rounded hover:bg-border-strong ${
                    bankLoanInterestRatePct === r
                      ? "bg-brand-primary text-white"
                      : "bg-border text-text-secondary"
                  }`}
                >
                  {formatRente(r, 1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <LabelWithTooltip
              htmlFor="bankLoanTermYears"
              tooltip="Løbetiden på banklånet er ofte kortere end på realkreditlån (fx 10 eller 20 år). Standard er sat til 10 år. Løbetiden bruges til at beregne den månedlige ydelse."
              className="block text-label text-text-secondary mb-1.5"
            >
              Løbetid
            </LabelWithTooltip>
            <select
              id="bankLoanTermYears"
              value={bankLoanTermYears}
              onChange={(e) => setBankLoanTermYears(Number(e.target.value))}
              className={inputClass("bankLoanTermYears")}
            >
              {TERM_OPTIONS.map((y) => (
                <option key={y} value={y}>
                  {y} år
                </option>
              ))}
            </select>
          </div>
        </div>
        {bankLoanInterestOnly && (
          <p className="text-small text-text-muted">
            Ved afdragsfrihed betaler du kun renter på banklånet.
          </p>
        )}
      </section>

      {/* El, varme og vand */}
      <section className="space-y-4">
        <h2 className={sectionTitle}>El, varme og vand</h2>
        <div className="space-y-4">
          <div className="max-w-xs">
            <LabelWithTooltip
              htmlFor="ownerExpensesMonthlyDKK"
              tooltip="Månedlige faste udgifter som ejer: fællesudgifter (for lejlighed), varme, vand, forsikring, grundskyld, ejendomsskat m.m. Indtast et gennemsnitligt beløb pr. måned, så det indgår i den samlede omkostningsberegning."
              className="block text-label text-text-secondary mb-1.5"
            >
              Ejerudgifter pr. måned (DKK)
            </LabelWithTooltip>
          <input
            id="ownerExpensesMonthlyDKK"
            type="text"
            inputMode="numeric"
            {...makeDkkInputProps(
              "ownerExpensesMonthlyDKK",
              ownerExpensesMonthlyDKK,
              setOwnerExpensesMonthlyDKK,
              "0"
            )}
            className={inputClass("ownerExpensesMonthlyDKK")}
            aria-invalid={!!validationErrors.ownerExpensesMonthlyDKK}
          />
          {validationErrors.ownerExpensesMonthlyDKK && (
            <p
              id="ownerExpensesMonthlyDKK-error"
              className="mt-1 text-small text-status-danger"
              role="alert"
            >
              {validationErrors.ownerExpensesMonthlyDKK}
            </p>
          )}
          <p className="mt-1.5 text-small text-text-muted">
            Fx fællesudgifter, varme, vand, forsikring, grundskyld.
          </p>
          </div>
        </div>
      </section>

      {/* Andre omkostninger */}
      <section className="space-y-4">
        <h2 className={sectionTitle}>Andre omkostninger</h2>
        <div className="space-y-4">
          <div className="max-w-xs">
            <LabelWithTooltip
              htmlFor="otherMonthlyDKK"
              tooltip="Andre månedlige omkostninger du vil medregne, f.eks. el, bredbånd, havearbejde eller budget til renovering. Valgfrit felt – indtast 0, hvis du ikke vil inkludere noget."
              className="block text-label text-text-secondary mb-1.5"
            >
              Øvrige månedlige (DKK) <span className="text-text-muted">– valgfrit</span>
            </LabelWithTooltip>
            <input
              id="otherMonthlyDKK"
              type="text"
              inputMode="numeric"
              {...makeDkkInputProps(
                "otherMonthlyDKK",
                otherMonthlyDKK,
                setOtherMonthlyDKK,
                "0"
              )}
              className={inputClass("otherMonthlyDKK")}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="includeMortgageRegistrationFee"
              type="checkbox"
              checked={includeMortgageRegistrationFee}
              onChange={(e) =>
                setIncludeMortgageRegistrationFee(e.target.checked)
              }
              className="w-4 h-4 rounded border-border text-brand-primary focus:ring-brand-primary"
            />
            <LabelWithTooltip
              htmlFor="includeMortgageRegistrationFee"
              tooltip="Tinglysningsafgift betales til Tinglysningsretten når du optager pant i boligen (realkredit og evt. banklån). Afgiften afhænger af det pantsikrede beløb. Kryds af for at medregne den i de samlede engangsomkostninger."
              className="text-body text-text-secondary"
            >
              Medtag tinglysningsafgift for pant (lån)
            </LabelWithTooltip>
          </div>
          {includeMortgageRegistrationFee && loanPrincipal > 0 && (
            <div className="max-w-xs">
              <LabelWithTooltip
                htmlFor="mortgagePrincipalDKK"
                tooltip="Det beløb, der skal tinglyses som pant (typisk det samlede lån: realkredit + banklån). Tinglysningsafgiften beregnes ud fra dette beløb. Standard er sat til det samlede lånebeløb."
                className="block text-label text-text-secondary mb-1.5"
              >
                Pantsikret beløb (DKK)
              </LabelWithTooltip>
              <input
                id="mortgagePrincipalDKK"
                type="text"
                inputMode="numeric"
                value={
                  editingDkkField === "mortgagePrincipalDKK"
                    ? formatDKK(parseDKK(editingDkkValue))
                    : (mortgagePrincipalDKK ?? loanPrincipal) === 0
                      ? ""
                      : formatDKK(mortgagePrincipalDKK ?? loanPrincipal)
                }
                onFocus={(e) => {
                  setEditingDkkField("mortgagePrincipalDKK");
                  const v = mortgagePrincipalDKK ?? loanPrincipal;
                  setEditingDkkValue(v === 0 ? "" : String(v));
                  setTimeout(() => e.target.select(), 0);
                }}
                onChange={(e) => {
                  if (editingDkkField === "mortgagePrincipalDKK") {
                    setEditingDkkValue(String(parseDKK(e.target.value)));
                  } else {
                    const v = parseDKK(e.target.value);
                    setMortgagePrincipalDKK(v || undefined);
                  }
                }}
                onBlur={() => {
                  const v = parseDKK(editingDkkValue);
                  setMortgagePrincipalDKK(v || undefined);
                  setEditingDkkField(null);
                }}
                className={inputClass("mortgagePrincipalDKK")}
                placeholder={formatDKK(loanPrincipal)}
                aria-invalid={!!validationErrors.mortgagePrincipalDKK}
              />
              {validationErrors.mortgagePrincipalDKK && (
                <p
                  id="mortgagePrincipalDKK-error"
                  className="mt-1 text-small text-status-danger"
                  role="alert"
                >
                  {validationErrors.mortgagePrincipalDKK}
                </p>
              )}
            </div>
          )}
          <div className="max-w-xs">
            <LabelWithTooltip
              htmlFor="otherUpfrontDKK"
              tooltip="Engangsudgifter ved køb, som ikke allerede er medregnet: fx mæglerhonorar, flytning, nye møbler eller mindre renovering. Valgfrit – indtast 0, hvis du ikke vil tilføje noget."
              className="block text-label text-text-secondary mb-1.5"
            >
              Øvrige engangsomkostninger (DKK) <span className="text-text-muted">– valgfrit</span>
            </LabelWithTooltip>
            <input
              id="otherUpfrontDKK"
              type="text"
              inputMode="numeric"
              {...makeDkkInputProps(
                "otherUpfrontDKK",
                otherUpfrontDKK,
                setOtherUpfrontDKK,
                "0"
              )}
              className={inputClass("otherUpfrontDKK")}
            />
          </div>
        </div>
      </section>

      <div className="flex justify-center pt-2" id={firstErrorId}>
        <button
          type="submit"
          disabled={isCalculating}
          aria-busy={isCalculating}
          className="min-h-[48px] px-8 py-3 text-body font-semibold text-white bg-status-success rounded-md shadow-soft hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-opacity touch-manipulation disabled:opacity-70 disabled:cursor-wait"
        >
          {isCalculating ? "Beregner…" : "Beregn omkostninger"}
        </button>
      </div>
    </form>
  );
}
