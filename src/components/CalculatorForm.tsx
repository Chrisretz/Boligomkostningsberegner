"use client";

import { useState, useCallback } from "react";
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
  const [includeMortgageRegistrationFee, setIncludeMortgageRegistrationFee] =
    useState(true);
  const [mortgagePrincipalDKK, setMortgagePrincipalDKK] = useState<
    number | undefined
  >(undefined);
  const [otherUpfrontDKK, setOtherUpfrontDKK] = useState(0);
  const [isRenteFocused, setIsRenteFocused] = useState(false);
  const [renteInputValue, setRenteInputValue] = useState("");
  const [editingDkkField, setEditingDkkField] = useState<string | null>(null);
  const [editingDkkValue, setEditingDkkValue] = useState("");

  const loanPrincipal = Math.max(purchasePriceDKK - downPaymentDKK, 0);

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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const input: CalcInput = {
        purchasePriceDKK,
        downPaymentDKK,
        interestRateAnnualPct,
        termYears,
        propertyType,
        ownerExpensesMonthlyDKK,
        otherMonthlyDKK: otherMonthlyDKK || 0,
        includeMortgageRegistrationFee,
        mortgagePrincipalDKK:
          includeMortgageRegistrationFee && loanPrincipal > 0
            ? (mortgagePrincipalDKK ?? loanPrincipal)
            : undefined,
        otherUpfrontDKK: otherUpfrontDKK || 0,
      };
      onSubmit(input);
    },
    [
      purchasePriceDKK,
      downPaymentDKK,
      interestRateAnnualPct,
      termYears,
      propertyType,
      ownerExpensesMonthlyDKK,
      otherMonthlyDKK,
      includeMortgageRegistrationFee,
      mortgagePrincipalDKK,
      loanPrincipal,
      otherUpfrontDKK,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Samme afstand mellem titel og input for alle – procenter under input */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
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
        </div>

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

        <div className="md:col-span-2">
          <label
            htmlFor="propertyType"
            className="block text-label text-text-secondary mb-1.5"
          >
            Boligtype
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
        </div>
      </div>

      {/* Flere indstillinger – skjult som standard */}
      <details className="text-body">
        <summary className="cursor-pointer text-text-secondary hover:text-text-primary">
          Flere indstillinger
        </summary>
        <div className="mt-4 space-y-4 pt-4 border-t border-border">
      <div>
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
      </div>

      <div>
        <label
          htmlFor="otherMonthlyDKK"
          className="block text-label text-text-secondary mb-1.5"
        >
          Øvrige månedlige omkostninger (DKK) <span className="text-text-muted">– valgfrit</span>
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
        <div>
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

      <div>
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
      </details>

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
