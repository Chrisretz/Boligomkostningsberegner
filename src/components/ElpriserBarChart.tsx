"use client";

import { useChartTooltip } from "@/components/useChartTooltip";

/**
 * Genbrugelig søjlegraf til elpris-siden. Ren SVG med den fælles
 * hover-tooltip. Serveren beregner søjlerne (værdi, farve, tooltip) og
 * sender dem hertil, så komponenten er ren visning.
 *
 * Nul-linjen håndteres, så negative priser (som kan forekomme ved meget
 * vind) tegnes nedad.
 */

export type Bar = {
  key: string;
  value: number;
  color: string;
  /** Tekst i tooltip ved hover. */
  tooltip: string;
  /** Vises som akse-etiket under søjlen, hvis sat. */
  axisLabel?: string;
};

export function ElpriserBarChart({
  bars,
  ariaLabel,
}: {
  bars: Bar[];
  ariaLabel: string;
}) {
  const { containerRef, bind, tooltip } = useChartTooltip();

  const W = 640;
  const H = 180;
  const PAD = { left: 8, right: 8, top: 10, bottom: 22 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  if (bars.length === 0) return null;

  const values = bars.map((b) => b.value);
  const maxVal = Math.max(...values, 0.01);
  const minVal = Math.min(...values, 0);
  const span = maxVal - minVal || 1;
  const zeroY = PAD.top + plotH - ((0 - minVal) / span) * plotH;

  const gap = 2;
  const barW = plotW / bars.length - gap;

  return (
    <div ref={containerRef} className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={ariaLabel}
      >
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={zeroY}
          y2={zeroY}
          stroke="#D7E1EC"
          strokeWidth={1}
        />
        {bars.map((b, i) => {
          const x = PAD.left + i * (barW + gap);
          const valueY = PAD.top + plotH - ((b.value - minVal) / span) * plotH;
          const y = Math.min(valueY, zeroY);
          const barHeight = Math.max(1, Math.abs(valueY - zeroY));
          return (
            <rect
              key={b.key}
              x={x}
              y={y}
              width={barW}
              height={barHeight}
              fill={b.color}
              className="cursor-default outline-none"
              aria-label={b.tooltip}
              {...bind(<span>{b.tooltip}</span>)}
            />
          );
        })}
        {bars.map((b, i) => {
          if (!b.axisLabel) return null;
          const x = PAD.left + i * (barW + gap) + barW / 2;
          return (
            <text
              key={`ax-${b.key}`}
              x={x}
              y={H - 6}
              textAnchor="middle"
              className="fill-text-muted"
              style={{ fontSize: 11 }}
            >
              {b.axisLabel}
            </text>
          );
        })}
      </svg>
      {tooltip}
    </div>
  );
}
