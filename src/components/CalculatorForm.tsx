"use client";

import { useState, useCallback, useEffect } from "react";
import type { CalcInput } from "@/lib/types";
import type { ValidationErrors } from "@/lib/validation";
import { DEFAULTS } from "@/lib/constants";

interface CalculatorFormProps {
  onSubmit: (input: CalcInput) => void;
  validationErrors?: ValidationErrors;
  firstErrorId?: string;
}

const TERM_OPTIONS = Array.from({ length: 40 }, (_, i) => i + 1);

function parseDKK(val: string): number {
  return Number(val.replace(/\D/g, "")) || 0;
}

function formatDKK(val: number): string {
  if (val === 0) return "";
  return val.toLocaleString("da-DK");
}

export function CalculatorForm({
  onSubmit,
  validationErrors = {},
  firstErrorId,
}: CalculatorFormProps) {
  const [purchasePriceDKK, setPurchasePriceDKK] = useState(3_500_000);
  const [downPaymentDKK, setDownPaymentDKK] = useState(300_000);
  const [interestRateAnnualPct, setInterestRateAnnualPct] = useState(2.5);
  const [termYears, setTermYears] = useState<number>(DEFAULTS.TERM_YEARS);
  const [propertyType, setPropertyType] = useState<"house" | "apartment">(
    "house"
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
  const [realkreditAmountDKK, setRealkreditAmountDKK] = useState(2_800_000);
  const [bankLoanInterestRatePct, setBankLoanInterestRatePct] = useState(4);
  const [bankLoanTermYears, setBankLoanTermYears] = useState<number | undefined>(undefined);
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
        bankLoanTermYears: bankLoanAmountDKK > 0 ? (bankLoanTermYears ?? termYears) : undefined,
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
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Købspris og udbetaling */}
      <section className="space-y-4">
        <h2 className={sectionTitle}>Købspris og udbetaling</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label
              htmlFor="purchasePriceDKK"
              className="block text-label text-text-secondary mb-1.5"
            >
              Boligens pris (DKK)
            </label>
            <input
              id="purchasePriceDKK"
              type="text"
              inputMode="numeric"
              {...makeDkkInputProps(
                "purchasePriceDKK",
                purchasePriceDKK,
                setPurchasePriceDKK,
                "3.500.000"
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
          </div>
          <div>
            <label
              htmlFor="downPaymentDKK"
              className="block text-label text-text-secondary mb-1.5"
            >
              Udbetaling (DKK)
            </label>
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
        <h2 className={sectionTitle}>Finansiering (Realkreditlån)</h2>
        {/* Række 1: Lånebeløb og Afdragsfrihed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label
              htmlFor="loanAmountDKK"
              className="block text-label text-text-secondary mb-1.5"
            >
              Lånebeløb (DKK)
            </label>
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
            <label
              htmlFor="interestOnly"
              className="block text-label text-text-secondary mb-1.5"
            >
              Afdragsfrihed
            </label>
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
            <label
              htmlFor="interestRateAnnualPct"
              className="block text-label text-text-secondary mb-1.5"
            >
              Rente
            </label>
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
            <label
              htmlFor="termYears"
              className="block text-label text-text-secondary mb-1.5"
            >
              Løbetid
            </label>
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
            <label className="block text-label text-text-secondary mb-1.5">
              Lånebeløb (DKK)
            </label>
            <div className="px-3 py-2.5 bg-brand-background border border-border rounded-md text-body text-text-primary">
              {formatDKK(bankLoanAmountDKK) || "0"}
            </div>
            <p className="mt-1.5 text-small text-text-muted">
              Købspris − udbetaling − realkreditlån = {formatDKK(bankLoanAmountDKK) || "0"} kr.
            </p>
          </div>
          <div>
            <label
              htmlFor="bankLoanInterestOnly"
              className="block text-label text-text-secondary mb-1.5"
            >
              Afdragsfrihed
            </label>
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
            <label
              htmlFor="bankLoanInterestRatePct"
              className="block text-label text-text-secondary mb-1.5"
            >
              Rente
            </label>
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
            <label
              htmlFor="bankLoanTermYears"
              className="block text-label text-text-secondary mb-1.5"
            >
              Løbetid
            </label>
            <select
              id="bankLoanTermYears"
              value={bankLoanTermYears === undefined ? "" : String(bankLoanTermYears)}
              onChange={(e) =>
                setBankLoanTermYears(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              className={inputClass("bankLoanTermYears")}
            >
              <option value="">Samme som realkredit ({termYears} år)</option>
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

      {/* Boligtype */}
      <section className="space-y-4">
        <h2 className={sectionTitle}>Boligtype</h2>
        <div className="max-w-xs">
          <label
            htmlFor="propertyType"
            className="block text-label text-text-secondary mb-1.5"
          >
            Type bolig
          </label>
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
      </section>

      {/* El, varme og vand */}
      <section className="space-y-4">
        <h2 className={sectionTitle}>El, varme og vand</h2>
        <div className="max-w-xs">
          <label
            htmlFor="ownerExpensesMonthlyDKK"
            className="block text-label text-text-secondary mb-1.5"
          >
            Ejerudgifter pr. måned (DKK)
          </label>
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
      </section>

      {/* Andre omkostninger */}
      <section className="space-y-4">
        <h2 className={sectionTitle}>Andre omkostninger</h2>
        <div className="space-y-4">
          <div className="max-w-xs">
            <label
              htmlFor="otherMonthlyDKK"
              className="block text-label text-text-secondary mb-1.5"
            >
              Øvrige månedlige (DKK) <span className="text-text-muted">– valgfrit</span>
            </label>
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
            <label
              htmlFor="includeMortgageRegistrationFee"
              className="text-body text-text-secondary"
            >
              Medtag tinglysningsafgift for pant (lån)
            </label>
          </div>
          {includeMortgageRegistrationFee && loanPrincipal > 0 && (
            <div className="max-w-xs">
              <label
                htmlFor="mortgagePrincipalDKK"
                className="block text-label text-text-secondary mb-1.5"
              >
                Pantsikret beløb (DKK)
              </label>
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
            <label
              htmlFor="otherUpfrontDKK"
              className="block text-label text-text-secondary mb-1.5"
            >
              Øvrige engangsomkostninger (DKK) <span className="text-text-muted">– valgfrit</span>
            </label>
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
          className="px-8 py-3 text-body font-semibold text-white bg-status-success rounded-md shadow-soft hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-opacity"
        >
          Beregn omkostninger
        </button>
      </div>
    </form>
  );
}
