"use client";

import { GEARING_DEFAULT, FINANCING_SHARE } from "@/lib/loanCapacityConstants";

/**
 * Grafik til lånerumsberegneren. Ren CSS som i ResultsCharts, ingen
 * chart-biblioteker, og samme brandafledte farveskala.
 */

/** Realkredit, banklån, udbetaling – mørkest for den største post. */
const SPLIT_COLORS = {
  realkredit: "#1E3A5F",
  banklaan: "#4E729E",
  udbetaling: "#B9CBDE",
} as const;

/** Andele i den klassiske 80/15/5-model. */
const REALKREDIT_SHARE = 0.8;
const BANK_SHARE = 0.15;

function formatKr(n: number): string {
  return n.toLocaleString("da-DK");
}

/**
 * Stablet bar der viser, hvordan købsprisen deles i realkreditlån,
 * banklån og egen udbetaling. Gør 80/15/5-modellen konkret i kroner.
 */
export function PurchaseSplitChart({
  estimatedPurchase,
}: {
  estimatedPurchase: number;
}) {
  if (estimatedPurchase <= 0) return null;

  const segments = [
    {
      key: "realkredit",
      label: "Realkreditlån",
      share: REALKREDIT_SHARE,
      note: "op til 80 %",
      value: Math.round(estimatedPurchase * REALKREDIT_SHARE),
      color: SPLIT_COLORS.realkredit,
    },
    {
      key: "banklaan",
      label: "Banklån",
      share: BANK_SHARE,
      note: "typisk 15 %",
      value: Math.round(estimatedPurchase * BANK_SHARE),
      color: SPLIT_COLORS.banklaan,
    },
    {
      key: "udbetaling",
      label: "Egen udbetaling",
      share: 1 - FINANCING_SHARE,
      note: "mindst 5 %",
      value: Math.round(estimatedPurchase * (1 - FINANCING_SHARE)),
      color: SPLIT_COLORS.udbetaling,
    },
  ];

  return (
    <div
      className="rounded-xl border border-border bg-white shadow-soft p-6 md:p-8 mb-6"
      role="img"
      aria-label={`Købsprisen på ${formatKr(estimatedPurchase)} kr fordelt på realkreditlån, banklån og udbetaling`}
    >
      <h3 className="text-xl md:text-h3 leading-tight text-text-primary mb-1">
        Sådan finansieres købsprisen
      </h3>
      <p className="text-small text-text-muted mb-5">
        Købspris ca. {formatKr(estimatedPurchase)} kr
      </p>

      <div className="bar-grow flex h-5 w-full overflow-hidden rounded-full">
        {segments.map((s) => (
          <div
            key={s.key}
            className="h-full"
            style={{ width: `${s.share * 100}%`, backgroundColor: s.color }}
            title={`${s.label}: ${formatKr(s.value)} kr`}
          />
        ))}
      </div>

      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 text-small">
        {segments.map((s) => (
          <li key={s.key} className="min-w-0">
            <span className="flex items-center gap-2 text-text-secondary">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              <span className="truncate">{s.label}</span>
            </span>
            <span className="mt-1 block font-semibold text-text-primary tabular-nums">
              {formatKr(s.value)} kr
            </span>
            <span className="text-text-muted">{s.note}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-small text-text-muted leading-relaxed">
        Udbetalingen skal komme fra din egen opsparing og kan ikke lånes.
        Oven i den skal du selv dække engangsomkostninger som tinglysning.
      </p>
    </div>
  );
}

/**
 * Følsomhedsanalysen som vandrette barer i stedet for tal alene.
 * Standardgearingen fremhæves, så man ser sit eget udgangspunkt.
 */
export function GearingBars({
  annualIncome,
  existingDebt,
  gearings,
}: {
  annualIncome: number;
  existingDebt: number;
  gearings: readonly number[];
}) {
  const rows = gearings.map((g) => {
    const capacity = Math.round(annualIncome * g);
    const loan = Math.max(0, capacity - existingDebt);
    return {
      gearing: g,
      loan,
      purchase: Math.round(loan / FINANCING_SHARE),
      isDefault: g === GEARING_DEFAULT,
    };
  });

  const max = Math.max(...rows.map((r) => r.purchase));
  if (max <= 0) return null;

  return (
    <ul className="space-y-4">
      {rows.map((r) => (
        <li key={r.gearing}>
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <span className="text-small font-medium text-text-primary">
              Gearing {String(r.gearing).replace(".", ",")}
              {r.isDefault && (
                <span className="ml-1.5 font-normal text-text-muted">
                  standard
                </span>
              )}
            </span>
            <span className="text-body font-bold text-text-primary shrink-0 whitespace-nowrap tabular-nums">
              {formatKr(r.purchase)} kr
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-border/50 overflow-hidden">
            <div
              className="bar-grow h-full rounded-full"
              style={{
                width: `${(r.purchase / max) * 100}%`,
                backgroundColor: r.isDefault ? "#1E3A5F" : "#94AECC",
              }}
            />
          </div>
          <p className="mt-1 text-small text-text-muted tabular-nums">
            Maks. boliglån {formatKr(r.loan)} kr
          </p>
        </li>
      ))}
    </ul>
  );
}
