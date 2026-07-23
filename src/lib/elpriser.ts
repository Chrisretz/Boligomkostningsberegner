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

import { ELPRIS_HISTORY_DATA } from "./elpris-history-data";

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

export interface MonthlyPrice {
  /** "2026-07" */
  month: string;
  /** "jul. 2026" */
  label: string;
  /** Månedens gennemsnitlige spotpris i kr/kWh (snit af DK1 og DK2). */
  avgKr: number;
}

/**
 * Månedshistorikken beregnes IKKE ved hvert sidevisning. Den er tunge
 * rådata, der kun ændrer sig én gang om måneden, så den bygges på forhånd
 * med `npm run elpris:history` (scripts/build-elpris-history.mjs) og
 * gemmes statisk. Siden læser bare de færdige månedstal her, hurtigt og
 * uden runtime-afhængighed af API'et.
 */
export function getElPriceHistory(): MonthlyPrice[] {
  return ELPRIS_HISTORY_DATA;
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
