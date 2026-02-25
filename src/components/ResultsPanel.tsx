"use client";

import type { CalcOutput } from "@/lib/types";

function formatKr(val: number): string {
  return val.toLocaleString("da-DK") + " kr";
}

interface ResultsPanelProps {
  output: CalcOutput;
}

export function ResultsPanel({ output }: ResultsPanelProps) {
  const { base, plus1, plus2 } = output;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      {/* Etableringsomkostninger */}
      <div className="bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 min-w-0">
        <h3 className="text-h3 text-text-primary mb-4">
          Etableringsomkostninger
        </h3>
        <ul className="space-y-2 text-body text-text-secondary">
          <li className="flex justify-between">
            <span>Tinglysningsafgift</span>
            <span>
              {formatKr(output.upfrontDeedFeeDKK + output.upfrontMortgageFeeDKK)}
            </span>
          </li>
          {output.upfrontOtherDKK > 0 ? (
            <li className="flex justify-between gap-4">
              <span className="min-w-0">Bank & gebyrer</span>
              <span className="shrink-0">{formatKr(output.upfrontOtherDKK)}</span>
            </li>
          ) : (
            <li className="flex justify-between gap-4">
              <span className="min-w-0">Bank & gebyrer</span>
              <span className="shrink-0">{formatKr(0)}</span>
            </li>
          )}
          <li className="flex justify-between gap-4 pt-3 mt-3 border-t border-border font-semibold text-text-primary">
            <span className="min-w-0">Samlet udbetaling</span>
            <span className="shrink-0">{formatKr(output.cashNeededAtCloseDKK)}</span>
          </li>
        </ul>
      </div>

      {/* Månedlige udgifter */}
      <div className="bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 min-w-0">
        <h3 className="text-h3 text-text-primary mb-4">
          Månedlige udgifter
        </h3>
        <ul className="space-y-3 text-body text-text-secondary">
          <li className="flex justify-between gap-4">
            <span className="min-w-0">Boliglån</span>
            <span className="shrink-0">{formatKr(base.monthlyPaymentDKK)}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="min-w-0">Ejerudgifter</span>
            <span className="shrink-0">{formatKr(output.breakdownMonthly.ownerExpensesMonthlyDKK)}</span>
          </li>
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
          <li className="flex justify-between gap-4 pt-3 mt-3 border-t border-border font-semibold text-text-primary text-h3">
            <span className="min-w-0">Samlet pr. måned</span>
            <span className="shrink-0">{formatKr(base.monthlyTotalDKK)}</span>
          </li>
        </ul>
      </div>

      {/* Rentestest */}
      <div className="bg-brand-surface rounded-md border border-border shadow-soft p-6 md:p-8 min-w-0">
        <h3 className="text-h3 text-text-primary mb-4">
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
