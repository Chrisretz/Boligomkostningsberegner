"use client";

import { useState } from "react";
import Link from "next/link";
import { LabelWithTooltip } from "@/components/LabelWithTooltip";
import {
  GEARING_DEFAULT,
  GEARING_SENSITIVITY,
  LOAN_CALCULATOR_ID,
  LOAN_LEAD_CONSENT_VERSION,
} from "@/lib/loanCapacityConstants";
import { bucketAnnualIncome } from "@/lib/leadBuckets";
import { trackLoanLeadSubmit } from "@/lib/track";

export type LoanCapacityResultsGateProps = {
  snapshotKey: string;
  formatKr: (n: number) => string;
  annualFromInput: number;
  existingDebt: number;
  inputMode: "annual" | "monthly";
  maxLoanCapacityDefault: number;
  maxLoanDefault: number;
  estimatedPurchaseDefault: number;
};

export function LoanCapacityResultsGate({
  snapshotKey,
  formatKr,
  annualFromInput,
  existingDebt,
  inputMode,
  maxLoanCapacityDefault,
  maxLoanDefault,
  estimatedPurchaseDefault,
}: LoanCapacityResultsGateProps) {
  const [unlockedSnapshot, setUnlockedSnapshot] = useState<string | null>(null);
  const fullUnlocked =
    unlockedSnapshot !== null && unlockedSnapshot === snapshotKey;

  const [email, setEmail] = useState("");
  const [consentTransactional, setConsentTransactional] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consentTransactional) {
      setError(
        "Du skal sætte kryds i feltet for at modtage beregningen på e-mail."
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/leads/loan-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          consentTransactional: true as const,
          consentMarketingPartners: consentMarketing,
          consentVersion: LOAN_LEAD_CONSENT_VERSION,
          calculatorId: LOAN_CALCULATOR_ID,
          inputMode,
          annualIncomeDkk: annualFromInput,
          existingDebtDkk: existingDebt,
          maxLoanDkk: maxLoanDefault,
          estimatedPurchaseDkk: estimatedPurchaseDefault,
          website: honeypot || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Noget gik galt. Prøv igen.");
        return;
      }
      trackLoanLeadSubmit({
        marketingConsent: consentMarketing,
        incomeBucket: bucketAnnualIncome(annualFromInput),
      });
      setUnlockedSnapshot(snapshotKey);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="rounded-md border border-border bg-brand-surface p-6 shadow-soft mb-6">
        <p className="text-body text-text-primary leading-relaxed">
          <strong>Ved gearing 4</strong> (vejledende) kan du ca. låne{" "}
          <strong>{formatKr(maxLoanDefault)} kr</strong> til boligen
          {existingDebt > 0 ? " (efter fradrag af angivet gæld)" : ""}. Med ca.{" "}
          80&nbsp;% finansiering svarer det til en estimeret købspris på ca.{" "}
          <strong>{formatKr(estimatedPurchaseDefault)} kr</strong>.
        </p>
      </div>

      {!fullUnlocked && (
        <div className="rounded-md border-2 border-dashed border-brand-primary/35 bg-brand-background p-6 md:p-8 mb-8">
          <h3 className="text-h3 text-text-primary mb-2">Få den fulde oversigt</h3>
          <p className="text-small text-text-secondary mb-5 max-w-2xl">
            Indtast din e-mail og accepter nedenfor, så viser vi hele tabellen med
            forskellige gearinger og den udvidede forklaring. Oplysningerne
            gemmes i overensstemmelse med dit samtykke og vores{" "}
            <Link href="/privacy" className="text-brand-primary hover:underline">
              privatlivspolitik
            </Link>
            , så vi kan følge op på henvendelsen.
          </p>
          <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-xl">
            <div>
              <label
                htmlFor="loan-lead-email"
                className="block text-small font-medium text-text-primary mb-1"
              >
                E-mail
              </label>
              <input
                id="loan-lead-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@email.dk"
                className="w-full px-4 py-2.5 bg-white border border-border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div className="hidden" aria-hidden>
              <label htmlFor="loan-lead-website">Website</label>
              <input
                id="loan-lead-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <label className="flex gap-3 items-start cursor-pointer">
              <input
                type="checkbox"
                checked={consentTransactional}
                onChange={(e) => setConsentTransactional(e.target.checked)}
                className="mt-1 shrink-0"
              />
              <span className="text-small text-text-secondary">
                Ja, jeg vil have vist den fulde oversigt og må kontaktes vedr.
                denne beregning og relateret service-e-mails om denne henvendelse.
              </span>
            </label>

            <label className="flex gap-3 items-start cursor-pointer">
              <input
                type="checkbox"
                checked={consentMarketing}
                onChange={(e) => setConsentMarketing(e.target.checked)}
                className="mt-1 shrink-0"
              />
              <span className="text-small text-text-secondary">
                Ja, Boligklarhed og udvalgte partnere (fx banker eller
                ejendomsmæglere) må kontakte mig med tilbud og rådgivning om bolig
                og finansiering. Jeg kan til enhver tid trække samtykket tilbage.
                <span className="block mt-1 text-text-muted">Valgfrit.</span>
              </span>
            </label>

            <p className="text-small text-text-muted">
              Du kan bruge beregneren uden markedsføringssamtykke (anden
              afkrydsning).
            </p>

            {error && (
              <p className="text-small text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="min-h-[48px] px-6 py-3 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 touch-manipulation disabled:opacity-60"
            >
              {loading ? "Gemmer…" : "Vis fuld oversigt"}
            </button>
          </form>
        </div>
      )}

      {fullUnlocked && (
        <>
          <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-8">
            <div className="h-full bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 min-w-0">
              <h3 className="text-xl md:text-h3 leading-tight text-text-primary mb-2 break-words">
                Ved gearing 4 (vejledende)
              </h3>
              <ul className="space-y-3 text-body text-text-secondary">
                {existingDebt > 0 && (
                  <li className="flex justify-between gap-4 text-text-muted">
                    <span className="min-w-0 break-words">
                      Samlet gældsrum (4 × indtægt)
                    </span>
                    <span className="shrink-0 text-right">
                      {formatKr(maxLoanCapacityDefault)} kr
                    </span>
                  </li>
                )}
                <li className="flex justify-between gap-4">
                  <span className="min-w-0 break-words">
                    Maks. boliglån
                    {existingDebt > 0
                      ? " (efter fradrag af eksisterende gæld)"
                      : ""}
                  </span>
                  <span className="font-semibold text-text-primary shrink-0 text-right">
                    {formatKr(maxLoanDefault)} kr
                  </span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="min-w-0 break-words">
                    Estimeret max. købspris (ca. 80 % finansiering)
                  </span>
                  <span className="font-semibold text-text-primary shrink-0 text-right">
                    {formatKr(estimatedPurchaseDefault)} kr
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-small text-text-muted">
                Købspris-estimatet antager, at du låner op til 80 % og lægger
                mindst 20 % i udbetaling. Brug{" "}
                <Link
                  href="/beregn"
                  className="text-brand-primary hover:underline"
                >
                  boligomkostningsberegneren
                </Link>{" "}
                for at se den konkrete månedlige ydelse.
              </p>
            </div>

            <div className="h-full bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 min-w-0">
              <LabelWithTooltip
                tooltip="Tabellen viser, hvor meget du kan optage i boliglån ved hver gearing, når eventuel eksisterende gæld er trukket fra. Det er det &quot;nye&quot; lån til bolig – ikke din samlede gæld. Banken vurderer også rådighedsbeløb; gearing er kun én af flere krav."
                className="block"
              >
                <h3 className="text-xl md:text-h3 leading-tight text-text-primary mb-4 break-words">
                  Følsomhedsanalyse (gearing)
                </h3>
              </LabelWithTooltip>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[360px] text-small md:text-body text-text-secondary">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-semibold text-text-primary">
                        Gearing
                      </th>
                      <th className="text-right py-2 font-semibold text-text-primary">
                        Maks. boliglån
                      </th>
                      <th className="text-right py-2 font-semibold text-text-primary">
                        Est. købspris
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {GEARING_SENSITIVITY.map((g) => {
                      const capacity = Math.round(annualFromInput * g);
                      const loan = Math.max(0, capacity - existingDebt);
                      const purchase = Math.round(loan / 0.8);
                      return (
                        <tr
                          key={g}
                          className={`border-b border-border ${
                            g === GEARING_DEFAULT
                              ? "bg-brand-primary/5 font-medium"
                              : ""
                          }`}
                        >
                          <td className="py-2">
                            {g}
                            {g === GEARING_DEFAULT && (
                              <span className="ml-1 text-small text-text-muted">
                                (standard)
                              </span>
                            )}
                          </td>
                          <td className="text-right py-2">
                            {formatKr(loan)} kr
                          </td>
                          <td className="text-right py-2">
                            {formatKr(purchase)} kr
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-small text-text-muted">
                Jo højere gearing, jo mere kan du låne – banken vurderer din
                konkrete gældsfaktor og rådighedsbeløb.
              </p>
            </div>
          </div>

          <details className="group rounded-md border border-border bg-brand-surface shadow-soft overflow-hidden mb-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-left hover:bg-border/30 transition-colors">
              <span className="text-body font-medium text-text-primary">
                Sådan er dit lånerum beregnet
              </span>
              <span className="text-text-muted font-medium tabular-nums group-open:hidden">
                +
              </span>
              <span className="text-text-muted font-medium tabular-nums hidden group-open:inline">
                −
              </span>
            </summary>
            <div className="border-t border-border px-4 py-4 space-y-3 text-small text-text-secondary">
              <p>
                <strong className="text-text-primary">Samlet gældsrum:</strong>{" "}
                bruttoindtægt ganget med valgt gearing (standard: 4).
              </p>
              <p>
                <strong className="text-text-primary">Maks. boliglån:</strong>{" "}
                samlet gældsrum minus eksisterende gæld (hvis angivet).
              </p>
              <p>
                <strong className="text-text-primary">Estimeret købspris:</strong>{" "}
                maks. boliglån divideret med 0,8 (antagelse om ca. 80 %
                finansiering).
              </p>
              <p>
                Banken ser også på rådighedsbeløb, jobsituation og øvrig risiko,
                så resultatet er et vejledende pejlemærke.
              </p>
            </div>
          </details>
        </>
      )}
    </>
  );
}
