"use client";

import type { CalcOutput } from "@/lib/types";
import { CALCULATOR_FORM_ID } from "@/components/CalculatorForm";

function formatKr(val: number): string {
  return val.toLocaleString("da-DK");
}

/**
 * Live-resumé af beregningen, der opdaterer mens brugeren taster.
 * Desktop: sticky panel i højre side. Mobil: kompakt bar fast i bunden.
 */
export function LiveSummary({ output }: { output: CalcOutput | null }) {
  if (!output) return null;

  return (
    <>
      {/* Desktop: sticky sidepanel */}
      <aside
        className="hidden lg:block sticky top-24"
        aria-label="Løbende overblik over beregningen"
      >
        <div className="rounded-xl border border-border bg-white shadow-soft p-6">
          <p className="text-small font-semibold uppercase tracking-wide text-text-muted mb-1">
            Dit overblik – opdateres live
          </p>
          <p className="text-small text-text-muted mb-4">
            Ca. pr. måned inkl. lån, bidrag, skat og drift
          </p>
          <p className="text-3xl font-bold text-text-primary tabular-nums leading-tight mb-4">
            {formatKr(output.base.monthlyTotalDKK)} kr
            <span className="text-body font-normal text-text-muted">/md</span>
          </p>
          <ul className="space-y-2 text-small text-text-secondary border-t border-border pt-4 mb-4">
            <li className="flex justify-between gap-3">
              <span>Kontantbehov ved køb</span>
              <span className="font-semibold text-text-primary tabular-nums">
                {formatKr(output.cashNeededAtCloseDKK)} kr
              </span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Ved +1 % rente</span>
              <span className="tabular-nums">
                {formatKr(output.plus1.monthlyTotalDKK)} kr/md
              </span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Ved +2 % rente</span>
              <span className="tabular-nums">
                {formatKr(output.plus2.monthlyTotalDKK)} kr/md
              </span>
            </li>
          </ul>
          <button
            type="submit"
            form={CALCULATOR_FORM_ID}
            className="w-full min-h-[44px] px-4 py-2.5 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:bg-brand-primaryHover transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            Se fuld beregning
          </button>
          <p className="text-small text-text-muted mt-3 leading-relaxed">
            Vejledende tal. Den fulde beregning viser alle poster og
            engangsomkostninger.
          </p>
        </div>
      </aside>

      {/* Mobil: fast bundbar */}
      <div
        className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
        aria-label="Løbende overblik over beregningen"
      >
        <div className="min-w-0">
          <p className="text-small text-text-muted leading-none mb-1">
            Ca. pr. måned
          </p>
          <p className="text-lg font-bold text-text-primary tabular-nums leading-none">
            {formatKr(output.base.monthlyTotalDKK)} kr
          </p>
        </div>
        <button
          type="submit"
          form={CALCULATOR_FORM_ID}
          className="shrink-0 min-h-[44px] px-5 py-2.5 text-body font-semibold text-white bg-brand-primary rounded-md hover:bg-brand-primaryHover transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
        >
          Fuld beregning
        </button>
      </div>
    </>
  );
}
