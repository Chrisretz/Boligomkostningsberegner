/**
 * Henter aktuelle elspotpriser fra Energi Data Service (statens gratis,
 * åbne energi-API). Samme designprincipper som liveRates.ts:
 *
 * - Hentes altid serverside og caches, så brugerens browser aldrig
 *   kalder API'et direkte.
 * - Priser valideres; ligger en pris helt uden for et fornuftigt
 *   interval, kasseres timen frem for at blive vist.
 * - Fejler kaldet, falder vi tilbage til sidste vellykkede hentning i op
 *   til et døgn. Kan vi slet ikke hente, returnerer vi null, og siden
 *   viser en pæn "kunne ikke hentes"-besked.
 *
 * VIGTIGT: Spotprisen er råvareprisen på el (Nord Pool day-ahead). Den
 * er IKKE det, en husstand betaler. Oveni kommer transport/nettarif,
 * elafgift og moms. Se elprisEstimat() og de tydelige forbehold i UI'et.
 */

/**
 * Datasæt: DayAheadPrices (day-ahead-priser, 15-minutters opløsning).
 * Afløste det tidligere Elspotprices-datasæt, som blev frosset i
 * september 2025. Feltnavne: TimeDK og DayAheadPriceDKK (kr/MWh).
 */
const BASE = "https://api.energidataservice.dk/dataset/DayAheadPrices";

/** Rimeligt interval for en dansk spotpris i kr/MWh. Uden for dette er data suspekt. */
const MIN_MWH = -2000;
const MAX_MWH = 20_000;

export type PriceArea = "DK1" | "DK2";

export const AREA_LABELS: Record<PriceArea, string> = {
  DK1: "Vestdanmark (vest for Storebælt)",
  DK2: "Østdanmark (øst for Storebælt)",
};

export interface HourPrice {
  /** ISO-tidspunkt i dansk tid, fx "2026-07-23T14:00:00" */
  hourDK: string;
  /** Time på døgnet 0-23 (dansk tid) */
  hour: number;
  /** Spotpris i kr/kWh (råvarepris, ekskl. transport, afgift og moms) */
  spotKr: number;
}

export interface AreaPrices {
  area: PriceArea;
  /** Seneste kendte time */
  latest: HourPrice;
  /** Gennemsnit over de hentede timer, kr/kWh */
  averageKr: number;
  /** Billigste time i perioden */
  min: HourPrice;
  /** Dyreste time i perioden */
  max: HourPrice;
  /** Timepriser, ældst først (til graf) */
  hourly: HourPrice[];
}

export interface ElspotResult {
  areas: Record<PriceArea, AreaPrices>;
  /** ISO-tidsstempel for seneste time på tværs af områder */
  updatedAt: string;
}

interface Record_ {
  TimeDK?: string;
  PriceArea?: string;
  DayAheadPriceDKK?: number | null;
}

function hourOf(iso: string): number {
  const m = iso.match(/T(\d{2}):/);
  return m ? Number(m[1]) : 0;
}

/** "2026-07-23T23:45:00" → "2026-07-23T23" (times-spand som gruppenøgle). */
function hourKey(iso: string): string {
  return iso.slice(0, 13);
}

/**
 * Nuværende time i dansk tid som "YYYY-MM-DDTHH". Datasættet indeholder
 * også morgendagens day-ahead-priser, så vi skærer ved den aktuelle time
 * for ikke at vise fremtidige timer som "seneste".
 */
function nowHourKeyCopenhagen(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const hour = get("hour") === "24" ? "00" : get("hour");
  return `${get("year")}-${get("month")}-${get("day")}T${hour}`;
}

async function fetchArea(area: PriceArea, hours: number): Promise<HourPrice[]> {
  const filter = encodeURIComponent(JSON.stringify({ PriceArea: [area] }));
  // 15-minutters opløsning (fire kvarter pr. time). Hent ekstra buffer,
  // fordi datasættet også rummer morgendagens priser, som vi filtrerer fra.
  const limit = (hours + 30) * 4;
  const url = `${BASE}?filter=${filter}&sort=TimeDK%20DESC&limit=${limit}`;
  const res = await fetch(url, {
    // Day-ahead-priser offentliggøres én gang dagligt. Én times cache er
    // rigeligt og belaster kilden mindst muligt.
    next: { revalidate: 3600 },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`dayahead ${area}: ${res.status}`);
  const data = (await res.json()) as { records?: Record_[] };
  const rows = data.records ?? [];

  // Saml kvartererne til timepriser (gennemsnit pr. time), så grafen og
  // tallene bliver i hele timer, som folk tænker i.
  const buckets = new Map<string, { sum: number; n: number; iso: string }>();
  for (const r of rows) {
    if (!r.TimeDK || typeof r.DayAheadPriceDKK !== "number") continue;
    if (r.DayAheadPriceDKK < MIN_MWH || r.DayAheadPriceDKK > MAX_MWH) continue;
    const key = hourKey(r.TimeDK);
    const b = buckets.get(key);
    if (b) {
      b.sum += r.DayAheadPriceDKK;
      b.n += 1;
    } else {
      buckets.set(key, { sum: r.DayAheadPriceDKK, n: 1, iso: `${key}:00:00` });
    }
  }

  const nowKey = nowHourKeyCopenhagen();
  const all: HourPrice[] = [];
  for (const { sum, n, iso } of buckets.values()) {
    // Skær fremtidige timer fra, så "seneste time" er nu, ikke i morgen.
    if (hourKey(iso) > nowKey) continue;
    const mwh = sum / n;
    all.push({
      hourDK: iso,
      hour: hourOf(iso),
      // MWh → kWh, afrundet til øre
      spotKr: Math.round((mwh / 1000) * 100) / 100,
    });
  }
  // Ældst først, og behold kun de seneste `hours` timer
  all.sort((a, b) => a.hourDK.localeCompare(b.hourDK));
  return all.slice(-hours);
}

function summarize(area: PriceArea, hourly: HourPrice[]): AreaPrices | null {
  if (hourly.length === 0) return null;
  const latest = hourly[hourly.length - 1];
  let min = hourly[0];
  let max = hourly[0];
  let sum = 0;
  for (const h of hourly) {
    if (h.spotKr < min.spotKr) min = h;
    if (h.spotKr > max.spotKr) max = h;
    sum += h.spotKr;
  }
  return {
    area,
    latest,
    averageKr: Math.round((sum / hourly.length) * 100) / 100,
    min,
    max,
    hourly,
  };
}

let lastGood: { result: ElspotResult; fetchedAt: number } | null = null;
const LAST_GOOD_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export async function fetchElspot(hours = 24): Promise<ElspotResult | null> {
  try {
    const [dk1, dk2] = await Promise.all([
      fetchArea("DK1", hours),
      fetchArea("DK2", hours),
    ]);
    const a1 = summarize("DK1", dk1);
    const a2 = summarize("DK2", dk2);
    if (!a1 || !a2) return recentLastGood();

    const updatedAt =
      a1.latest.hourDK > a2.latest.hourDK ? a1.latest.hourDK : a2.latest.hourDK;
    const result: ElspotResult = { areas: { DK1: a1, DK2: a2 }, updatedAt };
    lastGood = { result, fetchedAt: Date.now() };
    return result;
  } catch {
    return recentLastGood();
  }
}

function recentLastGood(): ElspotResult | null {
  if (!lastGood) return null;
  if (Date.now() - lastGood.fetchedAt > LAST_GOOD_MAX_AGE_MS) return null;
  return lastGood.result;
}

/** Kun til tests. */
export function __resetElspotCache(): void {
  lastGood = null;
}

const MONTHS_SHORT = [
  "jan.", "feb.", "mar.", "apr.", "maj", "jun.",
  "jul.", "aug.", "sep.", "okt.", "nov.", "dec.",
];

export interface MonthlyPrice {
  /** "2026-07" */
  month: string;
  /** "jul. 2026" */
  label: string;
  /** Månedens gennemsnitlige spotpris i kr/kWh (snit af DK1 og DK2). */
  avgKr: number;
}

/** Nuværende {år, måned} i dansk tid. */
function nowYearMonthCopenhagen(): { year: number; month: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { year: get("year"), month: get("month") };
}

const API = "https://api.energidataservice.dk/dataset";

/**
 * Datasæt til historik. Det nye DayAheadPrices (15-min) dækker de seneste
 * måneder. Det gamle Elspotprices (time-opløsning) er frosset 30. sep.
 * 2025, men dets historik er intakt og fire gange lettere at hente. Vi
 * bruger derfor timedata til de gamle måneder og 15-min til de nye.
 */
const DAYAHEAD_FROM = "2025-10-01";

type DatasetCfg = { dataset: string; timeCol: string; priceCol: string };
const CFG_HOURLY: DatasetCfg = {
  dataset: "Elspotprices",
  timeCol: "HourDK",
  priceCol: "SpotPriceDKK",
};
const CFG_QUARTER: DatasetCfg = {
  dataset: "DayAheadPrices",
  timeCol: "TimeDK",
  priceCol: "DayAheadPriceDKK",
};

/** Lægger et datasæts priser ind i månedsspande (sum + antal). */
async function accumulateMonthly(
  buckets: Map<string, { sum: number; n: number }>,
  cfg: DatasetCfg,
  area: PriceArea,
  start: string,
  end: string
): Promise<void> {
  if (start >= end) return;
  const filter = encodeURIComponent(JSON.stringify({ PriceArea: [area] }));
  const url =
    `${API}/${cfg.dataset}?filter=${filter}&start=${start}&end=${end}` +
    `&columns=${cfg.timeCol},${cfg.priceCol}&sort=${cfg.timeCol}%20ASC&limit=500000`;
  const res = await fetch(url, {
    next: { revalidate: 86_400 },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`history ${cfg.dataset} ${area}: ${res.status}`);
  const data = (await res.json()) as { records?: Record<string, unknown>[] };
  for (const r of data.records ?? []) {
    const time = r[cfg.timeCol];
    const price = r[cfg.priceCol];
    if (typeof time !== "string" || typeof price !== "number") continue;
    if (price < MIN_MWH || price > MAX_MWH) continue;
    const key = time.slice(0, 7); // "YYYY-MM"
    const m = buckets.get(key);
    if (m) {
      m.sum += price;
      m.n += 1;
    } else {
      buckets.set(key, { sum: price, n: 1 });
    }
  }
}

/** Månedsspande for ét område, sammensat af de to datasæt. */
async function fetchAreaMonthly(
  area: PriceArea,
  start: string,
  end: string
): Promise<Map<string, { sum: number; n: number }>> {
  const buckets = new Map<string, { sum: number; n: number }>();
  // Gamle måneder fra timedata, nye fra 15-min. Grænsen er DAYAHEAD_FROM.
  const hourlyEnd = end < DAYAHEAD_FROM ? end : DAYAHEAD_FROM;
  const quarterStart = start > DAYAHEAD_FROM ? start : DAYAHEAD_FROM;
  await Promise.all([
    accumulateMonthly(buckets, CFG_HOURLY, area, start, hourlyEnd),
    accumulateMonthly(buckets, CFG_QUARTER, area, quarterStart, end),
  ]);
  return buckets;
}

let historyCache: { data: MonthlyPrice[]; fetchedAt: number } | null = null;

/** Antal års historik der vises i grafen. Kan hæves til fx 5. */
export const HISTORY_YEARS = 3;

/** En måned skal have mindst så mange datapunkter for at tælle med. */
const MIN_POINTS_PER_MONTH = 100;

/**
 * Månedligt gennemsnit af spotprisen de seneste HISTORY_YEARS år, som snit
 * af DK1 og DK2. Historik er gratis i API'et, så grafen har data fra dag
 * ét. Den indeværende måned udelades, da den kun er delvis.
 */
export async function fetchElPriceHistory(): Promise<MonthlyPrice[] | null> {
  const { year, month } = nowYearMonthCopenhagen();
  // Start HISTORY_YEARS hele år tilbage, slut ved starten af denne måned.
  const start = `${year - HISTORY_YEARS}-${String(month).padStart(2, "0")}-01`;
  const end = `${year}-${String(month).padStart(2, "0")}-01`;

  try {
    const [dk1, dk2] = await Promise.all([
      fetchAreaMonthly("DK1", start, end),
      fetchAreaMonthly("DK2", start, end),
    ]);
    const keys = new Set([...dk1.keys(), ...dk2.keys()]);
    const out: MonthlyPrice[] = [];
    for (const key of keys) {
      const a = dk1.get(key);
      const b = dk2.get(key);
      const avgs: number[] = [];
      // Kræv et minimum af datapunkter, så en halv måned ikke skævvrider
      if (a && a.n >= MIN_POINTS_PER_MONTH) avgs.push(a.sum / a.n);
      if (b && b.n >= MIN_POINTS_PER_MONTH) avgs.push(b.sum / b.n);
      if (avgs.length === 0) continue;
      const mwh = avgs.reduce((s, v) => s + v, 0) / avgs.length;
      const [y, m] = key.split("-");
      out.push({
        month: key,
        label: `${MONTHS_SHORT[Number(m) - 1]} ${y}`,
        avgKr: Math.round((mwh / 1000) * 100) / 100,
      });
    }
    out.sort((x, y) => x.month.localeCompare(y.month));
    if (out.length === 0) return recentHistory();
    historyCache = { data: out, fetchedAt: Date.now() };
    return out;
  } catch {
    return recentHistory();
  }
}

function recentHistory(): MonthlyPrice[] | null {
  if (!historyCache) return null;
  if (Date.now() - historyCache.fetchedAt > LAST_GOOD_MAX_AGE_MS) return null;
  return historyCache.data;
}

/**
 * Vejledende omregning fra spotpris til den samlede pris, en husstand
 * typisk betaler pr. kWh. Tallene varierer meget efter netselskab,
 * leverandør og tidspunkt, så dette er et groft gennemsnit til at vise
 * størrelsesordenen, ikke et præcist tal.
 *
 * Samlet ≈ (spot + transport/nettarif + elafgift) × moms.
 */
export const ELPRIS_TILLAEG = {
  /** Transport, nettarif og systemtarif, kr/kWh (typisk gennemsnit). */
  transportKr: 0.55,
  /** Elafgift til staten, kr/kWh (vejledende niveau). */
  elafgiftKr: 0.76,
  /** Moms. */
  momsFactor: 1.25,
  /** Dato hvor tillæggene senest blev kontrolleret. */
  verified: "juli 2026",
} as const;

export function elprisEstimatKr(spotKr: number): number {
  const beforeMoms =
    spotKr + ELPRIS_TILLAEG.transportKr + ELPRIS_TILLAEG.elafgiftKr;
  return Math.round(beforeMoms * ELPRIS_TILLAEG.momsFactor * 100) / 100;
}
