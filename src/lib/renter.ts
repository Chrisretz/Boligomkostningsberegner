/**
 * Vejledende renteniveauer pr. lånetype.
 *
 * Der findes ingen offentlig, gratis API med dagsaktuelle
 * realkreditkurser. Institutternes kurslister indlæses med JavaScript og
 * kan ikke hentes stabilt, og de officielle statistikker fra
 * Nationalbanken og Danmarks Statistik offentliggøres som månedlige
 * gennemsnit med flere ugers forsinkelse.
 *
 * Derfor vedligeholdes niveauerne her manuelt og opdateres af en
 * planlagt opgave. Datoen vises altid i brugerfladen, så et forældet tal
 * er synligt frem for at fejle i stilhed.
 *
 * VIGTIGT: Renten er ikke det samme som den effektive rente, brugeren
 * får. Den afhænger af kurs på handelsdagen, kursskæring og kurstab.
 * Tallene er niveauer til budgettering, ikke et lånetilbud.
 */

import type { LoanType } from "@/lib/bidrag";

export const RATE_SOURCE = {
  /** Dato hvor niveauerne senest blev kontrolleret */
  updated: "21. juli 2026",
  /** Bruges i teksten under rentefeltet */
  note: "Vejledende niveau – den endelige rente afhænger af kursen på handelsdagen.",
} as const;

/**
 * Vejledende årlig rente i procent pr. lånetype.
 * Afrundet til nærmeste 0,05 procentpoint, da præcision ud over det er
 * illusorisk, når kursen ændrer sig flere gange dagligt.
 */
export const RATE_BY_LOAN_TYPE: Record<LoanType, number> = {
  fast: 4.0,
  renteMaxF5F10: 2.8,
  fKort: 2.3,
  f3f4: 2.6,
  f1f2: 2.35,
};

export function getSuggestedRate(loanType: LoanType): number {
  return RATE_BY_LOAN_TYPE[loanType];
}
