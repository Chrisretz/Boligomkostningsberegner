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
    <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-8">
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
          <li className="flex justify-between gap-4 pt-3 mt-3 border-t border-border font-semibold text-text-primary">
            <span className="min-w-0">Samlet kontantbehov ved køb</span>
            <span className="shrink-0">{formatKr(output.cashNeededAtCloseDKK)}</span>
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
          <li className="flex justify-between gap-4 pt-3 mt-3 border-t border-border font-semibold text-text-primary text-xl md:text-h3 leading-tight">
            <span className="min-w-0 break-words">Samlet pr. måned</span>
            <span className="shrink-0">{formatKr(base.monthlyTotalDKK)}</span>
          </li>
        </ul>
      </div>

      {/* Rentestest */}
      <div className="h-full bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 min-w-0">
        <h3 className="text-xl md:text-h3 leading-tight text-text-primary mb-4 break-words">
          Rentestest
        </h3>
        <ul className="space-y-3 text-body text-text-secondary">
          <li className="flex justify-between gap-6">
            <span className="min-w-0">+1% rente</span>
            <span className="font-semibold text-text-primary shrink-0 whitespace-nowrap">
              {formatKr(plus1.monthlyTotalDKK)} pr md.
            </span>
          </li>
          <li className="flex justify-between gap-6">
            <span className="min-w-0">+2% rente</span>
            <span className="font-semibold text-text-primary shrink-0 whitespace-nowrap">
              {formatKr(plus2.monthlyTotalDKK)} pr md.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
