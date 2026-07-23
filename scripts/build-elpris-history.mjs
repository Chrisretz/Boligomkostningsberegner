/**
 * Bygger elprisernes månedshistorik og skriver den til en statisk fil,
 * så /elpriser-siden bare læser færdige månedstal i stedet for at hente
 * store datamængder ved hvert sidevisning.
 *
 * Kør lokalt: `npm run elpris:history`
 * Kræver netværk (henter fra Energi Data Service).
 *
 * Henter PÆNT: ét kald ad gangen med pause imellem og automatisk
 * genforsøg ved HTTP 429 (rate limit), så API'et ikke afviser os.
 *
 * Datakilder:
 * - Elspotprices (time-opløsning) for måneder før okt. 2025.
 * - DayAheadPrices (15-min) for nyere måneder.
 */

import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const API = "https://api.energidataservice.dk/dataset";
const DAYAHEAD_FROM = "2025-10-01";
const HISTORY_YEARS = 3; // Antal års historik i grafen.
const MIN_MWH = -2000;
const MAX_MWH = 20000;
const MIN_POINTS_PER_MONTH = 100;
const PAGE_SIZE = 5000;

// Skånsom hentning for at undgå rate limit (429).
const DELAY_MS = 1500;
const MAX_RETRIES = 6;

const MONTHS_SHORT = [
  "jan.", "feb.", "mar.", "apr.", "maj", "jun.",
  "jul.", "aug.", "sep.", "okt.", "nov.", "dec.",
];

const CFG_HOURLY = { dataset: "Elspotprices", timeCol: "HourDK", priceCol: "SpotPriceDKK" };
const CFG_QUARTER = { dataset: "DayAheadPrices", timeCol: "TimeDK", priceCol: "DayAheadPriceDKK" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Henter JSON med pause og genforsøg ved 429. */
async function fetchJson(url) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (res.status === 429) {
      const retryAfter =
        Number(res.headers.get("retry-after")) || Math.min(60, 5 * (attempt + 1));
      console.log(`  429 rate limit — venter ${retryAfter}s (forsøg ${attempt + 1}/${MAX_RETRIES}) ...`);
      await sleep(retryAfter * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
  throw new Error("Gav op efter gentagne 429. Prøv igen senere.");
}

async function accumulate(buckets, cfg, area, start, end) {
  if (start >= end) return;
  const filter = encodeURIComponent(JSON.stringify({ PriceArea: [area] }));
  let offset = 0;
  for (let page = 0; page < 500; page += 1) {
    const url =
      `${API}/${cfg.dataset}?filter=${filter}&start=${start}&end=${end}` +
      `&columns=${cfg.timeCol},${cfg.priceCol}&sort=${cfg.timeCol}%20ASC` +
      `&offset=${offset}&limit=${PAGE_SIZE}`;
    const data = await fetchJson(url);
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
    await sleep(DELAY_MS); // pust mellem kald
  }
}

async function areaMonthly(area, start, end) {
  const buckets = new Map();
  const hourlyEnd = end < DAYAHEAD_FROM ? end : DAYAHEAD_FROM;
  const quarterStart = start > DAYAHEAD_FROM ? start : DAYAHEAD_FROM;
  // Sekventielt, ikke parallelt, for at være skånsom mod API'et.
  await accumulate(buckets, CFG_HOURLY, area, start, hourlyEnd);
  await accumulate(buckets, CFG_QUARTER, area, quarterStart, end);
  return buckets;
}

/** Alle "YYYY-MM" i vinduet: fra HISTORY_YEARS år tilbage til sidste hele måned. */
function monthKeysInWindow(year, month) {
  const keys = [];
  let cy = year - HISTORY_YEARS;
  let cm = month;
  while (cy < year || (cy === year && cm < month)) {
    keys.push(`${cy}-${String(cm).padStart(2, "0")}`);
    cm += 1;
    if (cm > 12) {
      cm = 1;
      cy += 1;
    }
  }
  return keys;
}

/** Første dag i måneden EFTER "YYYY-MM". */
function firstDayOfNextMonth(key) {
  const [y, m] = key.split("-").map(Number);
  const ny = m === 12 ? y + 1 : y;
  const nm = m === 12 ? 1 : m + 1;
  return `${ny}-${String(nm).padStart(2, "0")}-01`;
}

/** Læser allerede-gemte måneder fra datafilen (tom hvis den ikke findes). */
function readExisting(outPath) {
  if (!existsSync(outPath)) return [];
  try {
    const text = readFileSync(outPath, "utf8");
    const m = text.match(/ELPRIS_HISTORY_DATA:\s*MonthlyPrice\[\]\s*=\s*(\[[\s\S]*?\]);/);
    if (!m) return [];
    const arr = JSON.parse(m[1]);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function monthLabel(key) {
  const [y, m] = key.split("-");
  return `${MONTHS_SHORT[Number(m) - 1]} ${y}`;
}

async function main() {
  const outPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "src",
    "lib",
    "elpris-history-data.ts"
  );

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const targetKeys = monthKeysInWindow(year, month);
  const byMonth = new Map();
  for (const r of readExisting(outPath)) byMonth.set(r.month, r);

  // Kun de måneder i vinduet, vi ikke allerede har gemt. Det er "batchen".
  const missing = targetKeys.filter((k) => !byMonth.has(k));

  if (missing.length === 0) {
    console.log("Alle måneder i vinduet er allerede hentet. Ingen nye kald.");
  } else {
    const fetchStart = `${missing[0]}-01`;
    const fetchEnd = firstDayOfNextMonth(missing[missing.length - 1]);
    console.log(
      `Mangler ${missing.length} måned(er). Henter ${fetchStart} .. ${fetchEnd} (skånsomt) ...`
    );
    const dk1 = await areaMonthly("DK1", fetchStart, fetchEnd);
    const dk2 = await areaMonthly("DK2", fetchStart, fetchEnd);

    const missingSet = new Set(missing);
    for (const key of new Set([...dk1.keys(), ...dk2.keys()])) {
      if (!missingSet.has(key)) continue; // rør ikke måneder vi allerede har
      const a = dk1.get(key);
      const b = dk2.get(key);
      const avgs = [];
      if (a && a.n >= MIN_POINTS_PER_MONTH) avgs.push(a.sum / a.n);
      if (b && b.n >= MIN_POINTS_PER_MONTH) avgs.push(b.sum / b.n);
      if (avgs.length === 0) continue;
      const mwh = avgs.reduce((s, v) => s + v, 0) / avgs.length;
      byMonth.set(key, {
        month: key,
        label: monthLabel(key),
        avgKr: Math.round((mwh / 1000) * 100) / 100,
      });
    }
  }

  // Byg endeligt array: kun måneder i vinduet, ældst først.
  const rows = targetKeys.filter((k) => byMonth.has(k)).map((k) => byMonth.get(k));
  if (rows.length === 0) throw new Error("Ingen data at skrive.");

  const generated = `${year}-${String(month).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const body =
    `// AUTO-GENERERET af scripts/build-elpris-history.mjs. Rediger ikke manuelt.\n` +
    `// Kør \`npm run elpris:history\` for at opdatere.\n` +
    `import type { MonthlyPrice } from "./elpriser";\n\n` +
    `export const ELPRIS_HISTORY_GENERATED = "${generated}";\n\n` +
    `export const ELPRIS_HISTORY_DATA: MonthlyPrice[] = ${JSON.stringify(rows, null, 2)};\n`;

  writeFileSync(outPath, body, "utf8");
  console.log(`Skrev ${rows.length} måneder til src/lib/elpris-history-data.ts`);
}

main().catch((err) => {
  console.error("Fejl:", err.message);
  process.exit(1);
});
