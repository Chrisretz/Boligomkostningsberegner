"use client";

import type { CalcOutput } from "@/lib/types";

function formatKr(val: number): string {
  return val.toLocaleString("da-DK");
}

interface ResultsPanelProps {
  output: CalcOutput;
}

export function ResultsPanel({ output }: ResultsPanelProps) {
  const { base, plus1, plus2 } = output;
  const downPaymentDKK = Math.max(
    0,
    output.cashNeededAtCloseDKK - output.upfrontTotalDKK
  );

  return (
    <div className="mb-8">
      <div
        className="loan-capacity-hero-reveal rounded-xl border border-border bg-white shadow-soft px-5 py-8 sm:px-8 sm:py-9 md:px-10 text-center mb-8 md:mb-10"
        role="region"
        aria-label="Overblik over boligomkostninger"
      >
        <p className="text-lg sm:text-xl font-semibold text-brand-primary mb-2">
          Dit samlede boligbudget
        </p>
        <p className="text-small text-text-muted mb-1">
          Ca. pr. måned (ydelse, ejerudgifter og løbende poster)
        </p>
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight tabular-nums break-words leading-tight">
          {formatKr(base.monthlyTotalDKK)} kr
        </p>
        <p className="text-body text-text-secondary mt-5 max-w-xl mx-auto">
          Kontantbehov ved køb:{" "}
          <span className="font-semibold text-text-primary">
            {formatKr(output.cashNeededAtCloseDKK)} kr
          </span>
        </p>
        <p className="text-small text-text-muted mt-3 max-w-lg mx-auto leading-relaxed">
          Ved +1&nbsp;% rente: ca. {formatKr(plus1.monthlyTotalDKK)} kr/md · Ved
          +2&nbsp;%: ca. {formatKr(plus2.monthlyTotalDKK)} kr/md
        </p>
      </div>

      <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {/* Etableringsomkostninger – hvad du skal have op af lommen ved køb */}
      <div className="h-full bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 min-w-0">
        <h3 className="text-xl md:text-h3 leading-tight text-text-primary mb-4 break-words">
          Etableringsomkostninger
        </h3>
        <p className="text-small text-text-muted mb-4">
          Det samlede beløb du skal have op af lommen ved køb
        </p>
        <ul className="space-y-3 text-body text-text-secondary">
          <li className="flex justify-between gap-4">
            <span className="min-w-0">Udbetaling</span>
            <span className="shrink-0">{formatKr(downPaymentDKK)}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="min-w-0">Tinglysningsafgift</span>
            <span className="shrink-0">
              {formatKr(output.upfrontDeedFeeDKK + output.upfrontMortgageFeeDKK)}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="min-w-0">Bank & gebyrer</span>
            <span className="shrink-0">{formatKr(output.upfrontOtherDKK)}</span>
          </li>
          <li className="flex justify-between gap-4 items-baseline pt-4 mt-4 border-t border-border">
            <span className="min-w-0 text-body font-semibold text-text-primary">
              Samlet kontantbehov ved køb
            </span>
            <span className="shrink-0 text-xl sm:text-2xl font-bold text-text-primary tabular-nums">
              {formatKr(output.cashNeededAtCloseDKK)} kr
            </span>
          </li>
        </ul>
      </div>

      {/* Månedlige udgifter */}
      <div className="h-full bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 min-w-0">
        <h3 className="text-xl md:text-h3 leading-tight text-text-primary mb-4 break-words">
          Månedlige udgifter
        </h3>
        <ul className="space-y-3 text-body text-text-secondary">
          {output.breakdownMonthly.bankLoanMonthlyDKK > 0 ? (
            <>
              <li className="flex justify-between gap-4">
                <span className="min-w-0">Realkreditlån</span>
                <span className="shrink-0">{formatKr(output.breakdownMonthly.realkreditMonthlyDKK)}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="min-w-0">Bolig- / banklån</span>
                <span className="shrink-0">{formatKr(output.breakdownMonthly.bankLoanMonthlyDKK)}</span>
              </li>
            </>
          ) : (
            <li className="flex justify-between gap-4">
              <span className="min-w-0">Boliglån</span>
              <span className="shrink-0">{formatKr(base.monthlyPaymentDKK)}</span>
            </li>
          )}
          <li className="flex justify-between gap-4">
            <span className="min-w-0">Ejerudgifter</span>
            <span className="shrink-0">{formatKr(output.breakdownMonthly.ownerExpensesMonthlyDKK)}</span>
          </li>
          {output.breakdownMonthly.estimatedElMonthlyDKK > 0 && (
            <li className="flex justify-between gap-4">
              <span className="min-w-0">Estimeret el</span>
              <span className="shrink-0">{formatKr(output.breakdownMonthly.estimatedElMonthlyDKK)}</span>
            </li>
          )}
          <li className="flex justify-between gap-4">
            <span className="min-w-0">Vedligeholdelse</span>
            <span className="shrink-0">{formatKr(output.breakdownMonthly.maintenanceMonthlyDKK)}</span>
          </li>
          {output.breakdownMonthly.otherMonthlyDKK > 0 && (
            <li className="flex justify-between gap-4">
              <span className="min-w-0">Øvrige</span>
              <span className="shrink-0">{formatKr(output.breakdownMonthly.otherMonthlyDKK)}</span>
            </li>
          )}
          <li className="flex justify-between gap-4 items-baseline pt-4 mt-4 border-t border-border">
            <span className="min-w-0 break-words text-body font-semibold text-text-primary">
              Samlet pr. måned
            </span>
            <span className="shrink-0 text-xl sm:text-2xl font-bold text-text-primary tabular-nums">
              {formatKr(base.monthlyTotalDKK)} kr
            </span>
          </li>
        </ul>
      </div>

      {/* Rentestest */}
      <div className="h-full bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 min-w-0">
        <h3 className="text-xl md:text-h3 leading-tight text-text-primary mb-4 break-words">
          Rentestest
        </h3>
        <ul className="space-y-4 text-body text-text-secondary">
          <li className="flex justify-between gap-4 items-baseline">
            <span className="min-w-0 font-medium text-text-primary">+1% rente</span>
            <span className="text-lg sm:text-xl font-bold text-text-primary shrink-0 whitespace-nowrap tabular-nums">
              {formatKr(plus1.monthlyTotalDKK)} kr/md
            </span>
          </li>
          <li className="flex justify-between gap-4 items-baseline">
            <span className="min-w-0 font-medium text-text-primary">+2% rente</span>
            <span className="text-lg sm:text-xl font-bold text-text-primary shrink-0 whitespace-nowrap tabular-nums">
              {formatKr(plus2.monthlyTotalDKK)} kr/md
            </span>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
}
