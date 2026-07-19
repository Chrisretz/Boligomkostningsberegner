"use client";

import type { CalcOutput } from "@/lib/types";

function formatKr(val: number): string {
  return val.toLocaleString("da-DK");
}

/** Farveskala afledt af brand-blå – mørkest for de største/vigtigste poster. */
const SEGMENT_COLORS = [
  "#1E3A5F",
  "#35567E",
  "#4E729E",
  "#6F91BA",
  "#94AECC",
  "#B9CBDE",
  "#D7E1EC",
];

type Segment = { label: string; value: number };

/**
 * Stablet vandret bar der viser fordelingen af den månedlige boligudgift,
 * med tilhørende forklaring. Ren CSS – ingen chart-libraries.
 */
export function MonthlyBreakdownChart({ output }: { output: CalcOutput }) {
  const b = output.breakdownMonthly;
  const loanMonthly = output.base.monthlyPaymentDKK;

  const segments: Segment[] = [
    { label: "Boliglån (ydelse)", value: loanMonthly },
    { label: "Bidrag (realkredit)", value: b.bidragMonthlyDKK },
    {
      label: output.propertyTaxIsEstimate
        ? "Ejendomsskat (estimat)"
        : "Ejendomsskat",
      value: b.propertyTaxMonthlyDKK,
    },
    { label: "Ejerudgifter", value: b.ownerExpensesMonthlyDKK },
    { label: "Estimeret el", value: b.estimatedElMonthlyDKK },
    { label: "Vedligehold", value: b.maintenanceMonthlyDKK },
    { label: "Øvrige", value: b.otherMonthlyDKK },
  ].filter((s) => s.value > 0);

  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (total <= 0) return null;

  return (
    <div
      className="rounded-xl border border-border bg-white shadow-soft p-6 md:p-8 mb-8"
      role="img"
      aria-label={`Fordeling af månedlig boligudgift på i alt ${formatKr(total)} kr`}
    >
      <h3 className="text-xl md:text-h3 leading-tight text-text-primary mb-1">
        Sådan fordeler din månedlige udgift sig
      </h3>
      <p className="text-small text-text-muted mb-5">
        I alt ca. {formatKr(total)} kr pr. måned
      </p>
      <div className="bar-grow flex h-5 w-full overflow-hidden rounded-full">
        {segments.map((s, i) => (
          <div
            key={s.label}
            className="h-full"
            style={{
              width: `${(s.value / total) * 100}%`,
              backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
            }}
            title={`${s.label}: ${formatKr(s.value)} kr`}
          />
        ))}
      </div>
      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-small text-text-secondary">
        {segments.map((s, i) => (
          <li key={s.label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 min-w-0">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
                }}
                aria-hidden
              />
              <span className="truncate">{s.label}</span>
            </span>
            <span className="shrink-0 tabular-nums">
              {formatKr(s.value)} kr
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Rentestest som tre vandrette barer (nuværende rente, +1 %, +2 %),
 * skaleret mod det højeste scenarie.
 */
export function RateStressBars({ output }: { output: CalcOutput }) {
  const rows = [
    {
      label: `Ved ${String(output.base.interestRateAnnualPct).replace(".", ",")} % (din rente)`,
      value: output.base.monthlyTotalDKK,
      color: "#1E3A5F",
    },
    {
      label: "+1 % rente",
      value: output.plus1.monthlyTotalDKK,
      color: "#B45309",
    },
    {
      label: "+2 % rente",
      value: output.plus2.monthlyTotalDKK,
      color: "#B91C1C",
    },
  ];
  const max = Math.max(...rows.map((r) => r.value));
  if (max <= 0) return null;

  return (
    <ul className="space-y-4">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <span className="text-small font-medium text-text-primary min-w-0">
              {r.label}
            </span>
            <span className="text-body font-bold text-text-primary shrink-0 whitespace-nowrap tabular-nums">
              {formatKr(r.value)} kr/md
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-border/50 overflow-hidden">
            <div
              className="bar-grow h-full rounded-full"
              style={{
                width: `${(r.value / max) * 100}%`,
                backgroundColor: r.color,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
