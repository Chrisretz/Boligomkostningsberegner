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

const BASE = "https://api.energidataservice.dk/dataset/Elspotprices";

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
  HourDK?: string;
  PriceArea?: string;
  SpotPriceDKK?: number | null;
}

function hourOf(iso: string): number {
  const m = iso.match(/T(\d{2}):/);
  return m ? Number(m[1]) : 0;
}

async function fetchArea(area: PriceArea, hours: number): Promise<HourPrice[]> {
  const filter = encodeURIComponent(JSON.stringify({ PriceArea: [area] }));
  const url = `${BASE}?filter=${filter}&sort=HourDK%20DESC&limit=${hours}`;
  const res = await fetch(url, {
    // Day-ahead-priser offentliggøres én gang dagligt. Ét døgns cache er
    // rigeligt og belaster kilden mindst muligt.
    next: { revalidate: 3600 },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`elspot ${area}: ${res.status}`);
  const data = (await res.json()) as { records?: Record_[] };
  const rows = data.records ?? [];
  const out: HourPrice[] = [];
  for (const r of rows) {
    if (!r.HourDK || typeof r.SpotPriceDKK !== "number") continue;
    if (r.SpotPriceDKK < MIN_MWH || r.SpotPriceDKK > MAX_MWH) continue;
    out.push({
      hourDK: r.HourDK,
      hour: hourOf(r.HourDK),
      // MWh → kWh, afrundet til øre
      spotKr: Math.round((r.SpotPriceDKK / 1000) * 100) / 100,
    });
  }
  // API'et leverer nyest først; vend til ældst først til grafen
  return out.reverse();
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
