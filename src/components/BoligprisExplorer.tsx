"use client";

import { useEffect, useMemo, useState } from "react";
import { useChartTooltip } from "@/components/useChartTooltip";

/**
 * Interaktiv boligpris-graf. Henter den forudberegnede fil fra /public og
 * lader brugeren vælge område og skifte mellem huse og lejligheder.
 * Data: Boligmarkedsstatistikken, Finans Danmark.
 */

type AreaType = "land" | "region" | "landsdel" | "kommune";

type Area = {
  id: string;
  name: string;
  type: AreaType;
  hus: (number | null)[];
  lejl: (number | null)[];
};

type Payload = {
  generated: string;
  source: string;
  unit: string;
  price: string;
  quarters: string[];
  areas: Area[];
};

type Category = "hus" | "lejl";

function kr(n: number): string {
  return n.toLocaleString("da-DK");
}

const TYPE_LABEL: Record<AreaType, string> = {
  land: "Hele landet",
  region: "Regioner",
  landsdel: "Landsdele",
  kommune: "Kommuner",
};

export function BoligprisExplorer() {
  const [data, setData] = useState<Payload | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">(
    "loading"
  );
  const [areaId, setAreaId] = useState("00");
  const [category, setCategory] = useState<Category>("hus");

  useEffect(() => {
    let alive = true;
    fetch("/data/boligpriser.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json: Payload) => {
        if (!alive) return;
        if (!json.areas || json.areas.length === 0) {
          setStatus("empty");
          return;
        }
        setData(json);
        setStatus("ready");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  const grouped = useMemo(() => {
    if (!data) return [];
    const order: AreaType[] = ["land", "region", "landsdel", "kommune"];
    return order
      .map((t) => ({
        type: t,
        label: TYPE_LABEL[t],
        areas: data.areas
          .filter((a) => a.type === t)
          .sort((a, b) => a.name.localeCompare(b.name, "da-DK")),
      }))
      .filter((g) => g.areas.length > 0);
  }, [data]);

  if (status === "loading") {
    return (
      <div className="rounded-xl border border-border bg-brand-surface p-8 text-center text-text-muted">
        Henter boligpriser…
      </div>
    );
  }
  if (status === "empty") {
    return (
      <div className="rounded-md border border-dashed border-border bg-brand-background/50 p-6 text-body text-text-secondary leading-relaxed">
        Boligpris-dataene er endnu ikke bygget. Kør{" "}
        <code className="text-small">npm run boligpris:history</code> for at
        hente dem fra Finans Danmark.
      </div>
    );
  }
  if (status === "error" || !data) {
    return (
      <div className="rounded-md border border-dashed border-border bg-brand-background/50 p-6 text-body text-text-secondary">
        Kunne ikke hente boligpriserne lige nu. Prøv igen om lidt.
      </div>
    );
  }

  const area = data.areas.find((a) => a.id === areaId) ?? data.areas[0];
  const series = category === "hus" ? area.hus : area.lejl;
  const hasData = series.some((v) => v != null);

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 mb-5">
        <div className="min-w-0">
          <label
            htmlFor="boligpris-omraade"
            className="block text-small text-text-secondary mb-1"
          >
            Område
          </label>
          <select
            id="boligpris-omraade"
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            className="w-full sm:w-64 px-3 py-2.5 bg-white border border-border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            {grouped.map((g) => (
              <optgroup key={g.type} label={g.label}>
                {g.areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div
          className="inline-flex rounded-md border border-border bg-brand-surface p-1"
          role="group"
          aria-label="Boligtype"
        >
          {(["hus", "lejl"] as Category[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 text-body rounded ${
                category === c
                  ? "bg-brand-primary text-white font-medium"
                  : "text-text-secondary hover:text-brand-primary"
              }`}
            >
              {c === "hus" ? "Huse" : "Lejligheder"}
            </button>
          ))}
        </div>
      </div>

      {hasData ? (
        <PriceLineChart
          quarters={data.quarters}
          series={series}
          areaName={area.name}
          category={category}
        />
      ) : (
        <div className="rounded-md border border-dashed border-border bg-brand-background/50 p-6 text-body text-text-secondary">
          {category === "lejl"
            ? `Der er ikke nok handler med ejerlejligheder i ${area.name} til at vise en pålidelig prisudvikling. Prøv huse, eller vælg et større område.`
            : `Ingen data for ${area.name}.`}
        </div>
      )}

      <p className="mt-4 text-small text-text-muted leading-relaxed">
        Realiseret handelspris i kr. pr. m² for{" "}
        {category === "hus" ? "parcel- og rækkehuse" : "ejerlejligheder"}.
        Kilde: {data.source}. På mindre områder kan enkelte kvartaler svinge
        meget, fordi der er få handler.
      </p>
    </div>
  );
}

/** Linjegraf over kvartalsvise m2-priser med hover-tooltip. */
function PriceLineChart({
  quarters,
  series,
  areaName,
  category,
}: {
  quarters: string[];
  series: (number | null)[];
  areaName: string;
  category: Category;
}) {
  const { containerRef, bind, tooltip } = useChartTooltip();

  const points = quarters
    .map((q, i) => ({ q, v: series[i] }))
    .filter((p): p is { q: string; v: number } => p.v != null);

  const W = 680;
  const H = 260;
  const PAD = { left: 48, right: 12, top: 12, bottom: 26 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const values = points.map((p) => p.v);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = Math.floor((min * 0.95) / 1000) * 1000;
  const hi = Math.ceil((max * 1.05) / 1000) * 1000;
  const span = hi - lo || 1;

  const x = (i: number) =>
    PAD.left + (points.length === 1 ? plotW / 2 : (i / (points.length - 1)) * plotW);
  const y = (v: number) => PAD.top + plotH - ((v - lo) / span) * plotH;

  const line = points.map((p, i) => `${x(i)},${y(p.v)}`).join(" ");

  const latest = points[points.length - 1];
  const yearAgoIdx = points.length - 5; // 4 kvartaler tilbage
  const yoy =
    yearAgoIdx >= 0 && points[yearAgoIdx].v > 0
      ? Math.round(((latest.v - points[yearAgoIdx].v) / points[yearAgoIdx].v) * 1000) / 10
      : null;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => lo + span * t);
  const yearFirst: Record<string, number> = {};
  points.forEach((p, i) => {
    const yr = p.q.slice(0, 4);
    if (!(yr in yearFirst)) yearFirst[yr] = i;
  });
  const yearsToLabel = Object.keys(yearFirst).filter(
    (_, idx, arr) => idx % Math.ceil(arr.length / 7) === 0
  );

  return (
    <figure>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
        <span className="text-3xl font-bold text-text-primary tabular-nums">
          {kr(latest.v)}{" "}
          <span className="text-body font-medium text-text-muted">kr/m²</span>
        </span>
        <span className="text-small text-text-muted">
          {areaName}, {category === "hus" ? "huse" : "lejligheder"}, seneste
          kvartal ({latest.q})
        </span>
        {yoy != null && (
          <span
            className={`text-small font-medium ${yoy >= 0 ? "text-green-700" : "text-red-700"}`}
          >
            {yoy >= 0 ? "+" : ""}
            {String(yoy).replace(".", ",")} % på et år
          </span>
        )}
      </div>

      <div ref={containerRef} className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Udvikling i realiseret m2-pris for ${category === "hus" ? "huse" : "lejligheder"} i ${areaName}, fra ${points[0].q} til ${latest.q}.`}
        >
          {yTicks.map((val, i) => {
            const yy = y(val);
            return (
              <g key={i}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={yy}
                  y2={yy}
                  stroke="#E2E6EC"
                  strokeWidth={1}
                />
                <text
                  x={PAD.left - 6}
                  y={yy + 3}
                  textAnchor="end"
                  className="fill-text-muted"
                  style={{ fontSize: 11 }}
                >
                  {Math.round(val / 1000)}k
                </text>
              </g>
            );
          })}
          <polyline
            points={line}
            fill="none"
            stroke="#1E3A5F"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {points.map((p, i) => (
            <rect
              key={p.q}
              x={x(i) - Math.max(3, plotW / points.length / 2)}
              y={PAD.top}
              width={Math.max(6, plotW / points.length)}
              height={plotH}
              fill="transparent"
              className="cursor-default outline-none"
              aria-label={`${p.q}: ${kr(p.v)} kr/m²`}
              {...bind(
                <span>
                  {p.q}: {kr(p.v)} kr/m²
                </span>
              )}
            />
          ))}
          {yearsToLabel.map((yr) => {
            const i = yearFirst[yr];
            return (
              <text
                key={yr}
                x={x(i)}
                y={H - 8}
                textAnchor="middle"
                className="fill-text-muted"
                style={{ fontSize: 11 }}
              >
                {yr}
              </text>
            );
          })}
        </svg>
        {tooltip}
      </div>
    </figure>
  );
}
