"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChartTooltip } from "@/components/useChartTooltip";

/**
 * Interaktiv boligpris-graf. Henter den forudberegnede fil fra /public og
 * lader brugeren vælge område, sammenligne med et andet område, skifte
 * mellem huse og lejligheder, og zoome tidsperioden med en dobbelt-slider.
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

const COLOR_A = "#1E3A5F"; // primær (mørkeblå)
const COLOR_B = "#E08D3C"; // sammenligning (amber)
const MIN_SPAN = 4; // mindst et års visning

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
  const [compareId, setCompareId] = useState(""); // "" = ingen
  const [category, setCategory] = useState<Category>("hus");
  const [range, setRange] = useState<[number, number]>([0, 0]);

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
        setRange([0, json.quarters.length - 1]);
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

  const areaA = data.areas.find((a) => a.id === areaId) ?? data.areas[0];
  const areaB = compareId ? data.areas.find((a) => a.id === compareId) : null;
  const seriesA = category === "hus" ? areaA.hus : areaA.lejl;
  const seriesB = areaB ? (category === "hus" ? areaB.hus : areaB.lejl) : null;
  const hasData = seriesA.some((v) => v != null);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
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
            className="w-full px-3 py-2.5 bg-white border border-border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
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

        <div className="min-w-0">
          <label
            htmlFor="boligpris-sammenlign"
            className="block text-small text-text-secondary mb-1"
          >
            Sammenlign med
          </label>
          <select
            id="boligpris-sammenlign"
            value={compareId}
            onChange={(e) => setCompareId(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="">Ingen</option>
            {grouped.map((g) => (
              <optgroup key={g.type} label={g.label}>
                {g.areas
                  .filter((a) => a.id !== areaId)
                  .map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div
        className="inline-flex rounded-md border border-border bg-brand-surface p-1 mb-5"
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

      {hasData ? (
        <>
          <PriceLineChart
            quarters={data.quarters}
            seriesA={seriesA}
            seriesB={seriesB}
            nameA={areaA.name}
            nameB={areaB?.name ?? null}
            category={category}
            range={range}
          />
          <RangeSlider
            quarters={data.quarters}
            range={range}
            onChange={setRange}
          />
        </>
      ) : (
        <div className="rounded-md border border-dashed border-border bg-brand-background/50 p-6 text-body text-text-secondary">
          {category === "lejl"
            ? `Der er ikke nok handler med ejerlejligheder i ${areaA.name} til at vise en pålidelig prisudvikling. Prøv huse, eller vælg et større område.`
            : `Ingen data for ${areaA.name}.`}
        </div>
      )}

      <p className="mt-4 text-small text-text-muted leading-relaxed">
        Realiseret handelspris i kr. pr. m² for{" "}
        {category === "hus" ? "parcel- og rækkehuse" : "ejerlejligheder"}. Kilde:{" "}
        {data.source}. På mindre områder kan enkelte kvartaler svinge meget,
        fordi der er få handler.
      </p>
    </div>
  );
}

/** Bygger et SVG-path og bryder linjen ved manglende værdier (null). */
function buildPath(
  vals: (number | null)[],
  x: (i: number) => number,
  y: (v: number) => number
): string {
  let d = "";
  let pen = false;
  vals.forEach((v, i) => {
    if (v == null) {
      pen = false;
      return;
    }
    d += `${pen ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)} `;
    pen = true;
  });
  return d.trim();
}

/** Sidste ikke-null værdi og år-til-år-ændring for en serie. */
function latestAndYoy(series: (number | null)[], quarters: string[]) {
  let lastIdx = -1;
  for (let i = series.length - 1; i >= 0; i -= 1) {
    if (series[i] != null) {
      lastIdx = i;
      break;
    }
  }
  if (lastIdx < 0) return null;
  const v = series[lastIdx] as number;
  const prev = series[lastIdx - 4];
  const yoy =
    typeof prev === "number" && prev > 0
      ? Math.round(((v - prev) / prev) * 1000) / 10
      : null;
  return { v, q: quarters[lastIdx], yoy };
}

/** Linjegraf med en eller to serier og hover-tooltip. Zoomet til `range`. */
function PriceLineChart({
  quarters,
  seriesA,
  seriesB,
  nameA,
  nameB,
  category,
  range,
}: {
  quarters: string[];
  seriesA: (number | null)[];
  seriesB: (number | null)[] | null;
  nameA: string;
  nameB: string | null;
  category: Category;
  range: [number, number];
}) {
  const { containerRef, bind, tooltip } = useChartTooltip();

  const [start, end] = range;
  const visQuarters = quarters.slice(start, end + 1);
  const visA = seriesA.slice(start, end + 1);
  const visB = seriesB ? seriesB.slice(start, end + 1) : null;
  const n = visQuarters.length;

  const W = 680;
  const H = 260;
  const PAD = { left: 48, right: 12, top: 12, bottom: 26 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const allVals = [
    ...visA.filter((v): v is number => v != null),
    ...(visB ? visB.filter((v): v is number => v != null) : []),
  ];
  const min = allVals.length ? Math.min(...allVals) : 0;
  const max = allVals.length ? Math.max(...allVals) : 1;
  const lo = Math.floor((min * 0.95) / 1000) * 1000;
  const hi = Math.ceil((max * 1.05) / 1000) * 1000;
  const span = hi - lo || 1;

  const x = (i: number) =>
    PAD.left + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const y = (v: number) => PAD.top + plotH - ((v - lo) / span) * plotH;

  const pathA = buildPath(visA, x, y);
  const pathB = visB ? buildPath(visB, x, y) : "";

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => lo + span * t);
  const yearFirst: Record<string, number> = {};
  visQuarters.forEach((q, i) => {
    const yr = q.slice(0, 4);
    if (!(yr in yearFirst)) yearFirst[yr] = i;
  });
  const yearKeys = Object.keys(yearFirst);
  const yearsToLabel = yearKeys.filter(
    (_, idx) => idx % Math.max(1, Math.ceil(yearKeys.length / 7)) === 0
  );

  const statA = latestAndYoy(seriesA, quarters);
  const statB = seriesB ? latestAndYoy(seriesB, quarters) : null;
  const catLabel = category === "hus" ? "huse" : "lejligheder";

  return (
    <figure>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3">
        <div>
          <span className="text-3xl font-bold text-text-primary tabular-nums">
            {statA ? kr(statA.v) : "–"}{" "}
            <span className="text-body font-medium text-text-muted">kr/m²</span>
          </span>
          <span className="ml-2 inline-flex items-center gap-1.5 text-small text-text-muted align-middle">
            <span
              className="inline-block w-3 h-[3px] rounded"
              style={{ backgroundColor: COLOR_A }}
            />
            {nameA}
          </span>
          {statA?.yoy != null && (
            <span
              className={`ml-2 text-small font-medium align-middle ${statA.yoy >= 0 ? "text-green-700" : "text-red-700"}`}
            >
              {statA.yoy >= 0 ? "+" : ""}
              {String(statA.yoy).replace(".", ",")} % på et år
            </span>
          )}
        </div>
        {statB && nameB && (
          <div>
            <span className="text-xl font-bold text-text-primary tabular-nums">
              {kr(statB.v)}{" "}
              <span className="text-small font-medium text-text-muted">
                kr/m²
              </span>
            </span>
            <span className="ml-2 inline-flex items-center gap-1.5 text-small text-text-muted align-middle">
              <span
                className="inline-block w-3 h-[3px] rounded"
                style={{ backgroundColor: COLOR_B }}
              />
              {nameB}
            </span>
            {statB.yoy != null && (
              <span
                className={`ml-2 text-small font-medium align-middle ${statB.yoy >= 0 ? "text-green-700" : "text-red-700"}`}
              >
                {statB.yoy >= 0 ? "+" : ""}
                {String(statB.yoy).replace(".", ",")} %
              </span>
            )}
          </div>
        )}
      </div>

      <div ref={containerRef} className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Udvikling i realiseret m2-pris for ${catLabel} i ${nameA}${nameB ? ` sammenlignet med ${nameB}` : ""}, fra ${visQuarters[0] ?? ""} til ${visQuarters[n - 1] ?? ""}.`}
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

          {pathB && (
            <path
              d={pathB}
              fill="none"
              stroke={COLOR_B}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}
          <path
            d={pathA}
            fill="none"
            stroke={COLOR_A}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {visQuarters.map((q, i) => (
            <rect
              key={q}
              x={x(i) - (n <= 1 ? 20 : plotW / n / 2)}
              y={PAD.top}
              width={n <= 1 ? 40 : Math.max(6, plotW / n)}
              height={plotH}
              fill="transparent"
              className="cursor-default outline-none"
              {...bind(
                <span>
                  <strong>{q}</strong>
                  <br />
                  {nameA}: {visA[i] != null ? `${kr(visA[i] as number)} kr/m²` : "–"}
                  {visB && nameB && (
                    <>
                      <br />
                      {nameB}:{" "}
                      {visB[i] != null ? `${kr(visB[i] as number)} kr/m²` : "–"}
                    </>
                  )}
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

/** Dobbelt-håndtags slider til at vælge kvartalsinterval. */
function RangeSlider({
  quarters,
  range,
  onChange,
}: {
  quarters: string[];
  range: [number, number];
  onChange: (r: [number, number]) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<null | "start" | "end">(null);
  const max = quarters.length - 1;
  const [start, end] = range;

  const idxFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      return Math.round(ratio * max);
    },
    [max]
  );

  useEffect(() => {
    if (!active) return;
    const move = (e: PointerEvent) => {
      const idx = idxFromClientX(e.clientX);
      if (active === "start") {
        onChange([Math.min(idx, end - MIN_SPAN), end]);
      } else {
        onChange([start, Math.max(idx, start + MIN_SPAN)]);
      }
    };
    const up = () => setActive(null);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [active, start, end, idxFromClientX, onChange]);

  const pct = (i: number) => (max <= 0 ? 0 : (i / max) * 100);

  const onKey = (which: "start" | "end") => (e: React.KeyboardEvent) => {
    let delta = 0;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -1;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = 1;
    else return;
    e.preventDefault();
    if (which === "start") {
      onChange([
        Math.min(Math.max(0, start + delta), end - MIN_SPAN),
        end,
      ]);
    } else {
      onChange([
        start,
        Math.max(Math.min(max, end + delta), start + MIN_SPAN),
      ]);
    }
  };

  return (
    <div className="mt-4 px-1">
      <div
        ref={trackRef}
        className="relative h-9 select-none touch-none"
        style={{ touchAction: "none" }}
      >
        {/* Banetrack */}
        <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 rounded-full bg-border" />
        {/* Valgt segment */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-primary/70"
          style={{ left: `${pct(start)}%`, right: `${100 - pct(end)}%` }}
        />
        {/* Håndtag start */}
        <button
          type="button"
          role="slider"
          aria-label="Startkvartal"
          aria-valuemin={0}
          aria-valuemax={end - MIN_SPAN}
          aria-valuenow={start}
          aria-valuetext={quarters[start]}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setActive("start");
          }}
          onKeyDown={onKey("start")}
          className="absolute top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-brand-primary shadow cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-brand-primary"
          style={{ left: `${pct(start)}%` }}
        />
        {/* Håndtag slut */}
        <button
          type="button"
          role="slider"
          aria-label="Slutkvartal"
          aria-valuemin={start + MIN_SPAN}
          aria-valuemax={max}
          aria-valuenow={end}
          aria-valuetext={quarters[end]}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setActive("end");
          }}
          onKeyDown={onKey("end")}
          className="absolute top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-brand-primary shadow cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-brand-primary"
          style={{ left: `${pct(end)}%` }}
        />
      </div>
      <div className="flex justify-between text-small text-text-muted tabular-nums">
        <span>{quarters[start]}</span>
        <span>{quarters[end]}</span>
      </div>
    </div>
  );
}
