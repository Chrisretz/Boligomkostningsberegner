/**
 * Henter aktuelle renteniveauer fra Totalkredits offentlige
 * obligationsdata (samme JSON, som deres egen kursside bruger).
 *
 * Designprincipper:
 * - Hentes altid serverside og caches, så brugerens browser aldrig
 *   kalder Totalkredit direkte.
 * - Alle værdier valideres; ligger en rente uden for et fornuftigt
 *   interval, kasseres den frem for at blive vist.
 * - Fejler kaldet, falder vi tilbage til de statiske niveauer i
 *   renter.ts. Beregneren virker altid.
 * - Tidsstemplet fra kilden vises i UI'et, så brugeren kan se, hvor
 *   friske tallene er.
 *
 * Tallene er kurser fra ét institut og udgør ikke et lånetilbud.
 */

import type { LoanType } from "@/lib/bidrag";

const BASE =
  "https://www.totalkredit.dk/api/bondinformation/table?domain=totalkredit&tableId=";

const TABLES = {
  fast: "privat-udbetaling-af-laan-aktuelle-kurser-kunder",
  tilpasning: "privat-udbetaling-af-laan-kontantrenter-raadgivere-og-kunder",
  variabel: "privat-udbetaling-af-variabel-laan-aktuelle-kurser-kunder",
} as const;

/** Rimeligt interval for en dansk realkreditrente. Uden for dette er data suspekt. */
const MIN_RATE = 0.1;
const MAX_RATE = 12;

interface BondEntry {
  name?: string;
  lifetime?: string;
  isOpenForOffer?: boolean;
  effectiveRate?: string;
  priceRate?: string;
  innerInterestGrossValue?: string;
  expectedRate?: string;
}

interface BondTable {
  groups?: { entries?: BondEntry[] }[];
  lastUpdatedTimestamp?: string;
}

/** "2,79%" / "4,21 %" → 4.21. Returnerer null hvis værdien ikke giver mening. */
function parsePct(raw: string | undefined): number | null {
  if (!raw) return null;
  const n = Number(raw.replace("%", "").replace(",", ".").trim());
  if (!Number.isFinite(n) || n < MIN_RATE || n > MAX_RATE) return null;
  return n;
}

function parseNum(raw: string | undefined): number | null {
  if (!raw) return null;
  const n = Number(raw.replace(",", ".").trim());
  return Number.isFinite(n) ? n : null;
}

async function fetchTable(tableId: string): Promise<BondTable | null> {
  try {
    const res = await fetch(`${BASE}${tableId}`, {
      // Kurserne opdateres få gange dagligt; en time er rigeligt.
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as BondTable;
  } catch {
    return null;
  }
}

function entries(table: BondTable | null): BondEntry[] {
  return table?.groups?.flatMap((g) => g.entries ?? []) ?? [];
}

/**
 * Toneangivende fastforrentede obligation: den åbne 30-årige med
 * kursen tættest på 100. Lån lukkes for tilbud over kurs 99,80, så den
 * højeste åbne kurs er den, en køber reelt får.
 */
function leadingFixedRate(
  table: BondTable | null,
  interestOnly: boolean
): number | null {
  const wanted = interestOnly ? "afdragsfrihed" : "med afdrag";
  const candidates = entries(table)
    .filter(
      (e) =>
        e.isOpenForOffer === true &&
        e.lifetime === "30 år" &&
        (e.name ?? "").includes(wanted) &&
        // "op til 30 års afdragsfrihed" er et særligt produkt (plus-lån)
        !(e.name ?? "").includes("30 års afdragsfrihed")
    )
    .map((e) => ({ rate: parsePct(e.effectiveRate), price: parseNum(e.priceRate) }))
    .filter(
      (c): c is { rate: number; price: number } =>
        c.rate !== null && c.price !== null
    )
    .sort((a, b) => b.price - a.price);
  return candidates[0]?.rate ?? null;
}

/** Kontantrente for fx "F3" eller "F5" med/uden afdragsfrihed. */
function tilpasningRate(
  table: BondTable | null,
  prefix: "F3" | "F5",
  interestOnly: boolean
): number | null {
  const match = entries(table).find((e) => {
    const name = e.name ?? "";
    if (!name.startsWith(prefix)) return false;
    return interestOnly
      ? name.includes("afdragsfrihed")
      : name.includes("med afdrag");
  });
  return parsePct(match?.innerInterestGrossValue);
}

/** F-kort: dagens beregningsrente inkl. rentetillæg. */
function fKortRate(table: BondTable | null): number | null {
  const match = entries(table).find((e) => e.expectedRate);
  return parsePct(match?.expectedRate);
}

export interface LiveRates {
  /** Rente pr. lånetype, delt op efter afdragsfrihed. null = ingen data */
  medAfdrag: Partial<Record<LoanType, number>>;
  afdragsfri: Partial<Record<LoanType, number>>;
  /** ISO-tidsstempel fra kilden */
  updatedAt: string | null;
}

export async function fetchLiveRates(): Promise<LiveRates | null> {
  const [fast, tilpasning, variabel] = await Promise.all([
    fetchTable(TABLES.fast),
    fetchTable(TABLES.tilpasning),
    fetchTable(TABLES.variabel),
  ]);

  if (!fast && !tilpasning && !variabel) return null;

  const fkort = fKortRate(variabel);

  const medAfdrag: Partial<Record<LoanType, number>> = {};
  const afdragsfri: Partial<Record<LoanType, number>> = {};

  const set = (
    target: Partial<Record<LoanType, number>>,
    key: LoanType,
    value: number | null
  ) => {
    if (value !== null) target[key] = value;
  };

  set(medAfdrag, "fast", leadingFixedRate(fast, false));
  set(afdragsfri, "fast", leadingFixedRate(fast, true));
  set(medAfdrag, "f3f4", tilpasningRate(tilpasning, "F3", false));
  set(afdragsfri, "f3f4", tilpasningRate(tilpasning, "F3", true));
  set(medAfdrag, "renteMaxF5F10", tilpasningRate(tilpasning, "F5", false));
  set(afdragsfri, "renteMaxF5F10", tilpasningRate(tilpasning, "F5", true));
  // F-kort har samme rente uanset afdragsprofil
  set(medAfdrag, "fKort", fkort);
  set(afdragsfri, "fKort", fkort);
  // F1-F2 udbydes ikke længere af Totalkredit; falder tilbage til statisk niveau.

  if (
    Object.keys(medAfdrag).length === 0 &&
    Object.keys(afdragsfri).length === 0
  ) {
    return null;
  }

  const timestamps = [fast, tilpasning, variabel]
    .map((t) => t?.lastUpdatedTimestamp)
    .filter((t): t is string => Boolean(t))
    .sort();

  return {
    medAfdrag,
    afdragsfri,
    // Ældste tidsstempel er det ærligste: så gammelt er det dårligste tal
    updatedAt: timestamps[0] ?? null,
  };
}
