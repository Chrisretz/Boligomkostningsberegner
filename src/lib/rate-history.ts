/**
 * Månedlig historik over den toneangivende realkreditrente.
 *
 * Sitet henter kun aktuelle kurser fra Totalkredit og gemmer ikke selv
 * historik. Denne fil er derfor det manuelle arkiv bag rentebarometeret:
 * én post pr. måned med niveauet for den toneangivende 30-årige
 * fastforrentede obligation (med afdrag) samt de vigtigste variable lån.
 *
 * VIGTIGT: Tilføj kun tal, du faktisk har aflæst. Der må ikke opdigtes
 * historiske renter. Grafen bygges op måned for måned, efterhånden som
 * der tilføjes poster. Den planlagte månedsopgave (renteniveauer) minder
 * om at snapshotte den aktuelle rente hertil.
 *
 * Rækkefølge: ældst først.
 */

export type RateSnapshot = {
  /** Første i måneden, ISO (YYYY-MM-DD). Bruges til akse og sortering. */
  date: string;
  /** Kort månedsetiket til visning, fx "jul. 2026". */
  label: string;
  /** Toneangivende 30-årig fast rente med afdrag, i procent. */
  fast: number;
  /** F5/RenteMax kontantrente med afdrag, i procent. Udelades hvis ukendt. */
  f5?: number;
  /** F3 kontantrente med afdrag, i procent. Udelades hvis ukendt. */
  f3?: number;
  /** F-kort beregningsrente, i procent. Udelades hvis ukendt. */
  fKort?: number;
};

/**
 * Historik. Seedet med niveauet kontrolleret i juli 2026 (samme tal som
 * de verificerede niveauer i renter.ts). Nye måneder tilføjes nedenfor.
 */
export const RATE_HISTORY: readonly RateSnapshot[] = [
  {
    date: "2026-07-01",
    label: "jul. 2026",
    fast: 4.0,
    f5: 2.8,
    f3: 2.6,
    fKort: 2.3,
  },
];

/** Nyeste post, eller null hvis historikken er tom. */
export function latestSnapshot(): RateSnapshot | null {
  return RATE_HISTORY.length > 0 ? RATE_HISTORY[RATE_HISTORY.length - 1] : null;
}

/**
 * Ændring i den faste rente fra næstsidste til sidste post, i
 * procentpoint. null hvis der er færre end to poster.
 */
export function fastRateChangePp(): number | null {
  if (RATE_HISTORY.length < 2) return null;
  const last = RATE_HISTORY[RATE_HISTORY.length - 1];
  const prev = RATE_HISTORY[RATE_HISTORY.length - 2];
  return Math.round((last.fast - prev.fast) * 100) / 100;
}
