/**
 * Bygger elprisernes månedshistorik og skriver den til en statisk fil,
 * så /elpriser-siden bare læser 36 færdige tal i stedet for at hente
 * store datamængder ved hvert sidevisning.
 *
 * Kør lokalt: `npm run elpris:history`
 * Den månedlige planlagte opgave kører den også, så historikken holdes
 * ajour. Kræver netværk (henter fra Energi Data Service).
 *
 * Datakilder:
 * - Elspotprices (time-opløsning) for måneder før okt. 2025 (frosset,
 *   men historik intakt og let at hente).
 * - DayAheadPrices (15-min) for nyere måneder.
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const API = "https://api.energidataservice.dk/dataset";
const DAYAHEAD_FROM = "2025-10-01";
const HISTORY_YEARS = 3;
const MIN_MWH = -2000;
const MAX_MWH = 20000;
const MIN_POINTS_PER_MONTH = 100;
const PAGE_SIZE = 5000;

const MONTHS_SHORT = [
  "jan.", "feb.", "mar.", "apr.", "maj", "jun.",
  "jul.", "aug.", "sep.", "okt.", "nov.", "dec.",
];

const CFG_HOURLY = { dataset: "Elspotprices", timeCol: "HourDK", priceCol: "SpotPriceDKK" };
const CFG_QUARTER = { dataset: "DayAheadPrices", timeCol: "TimeDK", priceCol: "DayAheadPriceDKK" };

async function accumulate(buckets, cfg, area, start, end) {
  if (start >= end) return;
  const filter = encodeURIComponent(JSON.stringify({ PriceArea: [area] }));
  let offset = 0;
  for (let page = 0; page < 500; page += 1) {
    const url =
      `${API}/${cfg.dataset}?filter=${filter}&start=${start}&end=${end}` +
      `&columns=${cfg.timeCol},${cfg.priceCol}&sort=${cfg.timeCol}%20ASC` +
      `&offset=${offset}&limit=${PAGE_SIZE}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`${cfg.dataset} ${area}: HTTP ${res.status}`);
    const data = await res.json();
    const rows = data.records ?? [];
    if (rows.length === 0) break;
    for (const r of rows) {
      const time = r[cfg.timeCol];
      const price = r[cfg.priceCol];
      if (typeof time !== "string" || typeof price !== "number") continue;
      if (price < MIN_MWH || price > MAX_MWH) continue;
      const key = time.slice(0, 7);
      const m = buckets.get(key);
      if (m) {
        m.sum += price;
        m.n += 1;
      } else {
        buckets.set(key, { sum: price, n: 1 });
      }
    }
    offset += rows.length;
  }
}

async function areaMonthly(area, start, end) {
  const buckets = new Map();
  const hourlyEnd = end < DAYAHEAD_FROM ? end : DAYAHEAD_FROM;
  const quarterStart = start > DAYAHEAD_FROM ? start : DAYAHEAD_FROM;
  await accumulate(buckets, CFG_HOURLY, area, start, hourlyEnd);
  await accumulate(buckets, CFG_QUARTER, area, quarterStart, end);
  return buckets;
}

async function main() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const start = `${year - HISTORY_YEARS}-${String(month).padStart(2, "0")}-01`;
  const end = `${year}-${String(month).padStart(2, "0")}-01`;

  console.log(`Henter elprishistorik ${start} .. ${end} for DK1 og DK2 ...`);
  const [dk1, dk2] = await Promise.all([
    areaMonthly("DK1", start, end),
    areaMonthly("DK2", start, end),
  ]);

  const keys = [...new Set([...dk1.keys(), ...dk2.keys()])].sort();
  const rows = [];
  for (const key of keys) {
    const a = dk1.get(key);
    const b = dk2.get(key);
    const avgs = [];
    if (a && a.n >= MIN_POINTS_PER_MONTH) avgs.push(a.sum / a.n);
    if (b && b.n >= MIN_POINTS_PER_MONTH) avgs.push(b.sum / b.n);
    if (avgs.length === 0) continue;
    const mwh = avgs.reduce((s, v) => s + v, 0) / avgs.length;
    const [y, m] = key.split("-");
    rows.push({
      month: key,
      label: `${MONTHS_SHORT[Number(m) - 1]} ${y}`,
      avgKr: Math.round((mwh / 1000) * 100) / 100,
    });
  }

  if (rows.length === 0) throw new Error("Ingen data hentet.");

  const generated = `${year}-${String(month).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const body =
    `// AUTO-GENERERET af scripts/build-elpris-history.mjs. Rediger ikke manuelt.\n` +
    `// Kør \`npm run elpris:history\` for at opdatere.\n` +
    `import type { MonthlyPrice } from "./elpriser";\n\n` +
    `export const ELPRIS_HISTORY_GENERATED = "${generated}";\n\n` +
    `export const ELPRIS_HISTORY_DATA: MonthlyPrice[] = ${JSON.stringify(rows, null, 2)};\n`;

  const outPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "src",
    "lib",
    "elpris-history-data.ts"
  );
  writeFileSync(outPath, body, "utf8");
  console.log(`Skrev ${rows.length} måneder til src/lib/elpris-history-data.ts`);
}

main().catch((err) => {
  console.error("Fejl:", err.message);
  process.exit(1);
});
