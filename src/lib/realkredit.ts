/**
 * Etableringsomkostninger ved optagelse af et realkreditlån.
 *
 * Dækker de gebyrer og afgifter, der betales, når lånet oprettes:
 * tinglysning af pant, lånesagsgebyr og afregningsprovision. Kurstab
 * behandles særskilt, fordi det ikke er en kontant udgift, men udtryk
 * for, at man modtager mindre end lånets pålydende.
 *
 * Kilder: Totalkredits prisblad (gebyrer) og CONSTANTS (tinglysning).
 * Tallene er vejledende; låneformidler kan opkræve yderligere gebyrer.
 */

import { CONSTANTS, REALKREDIT_FEES } from "./constants";

function ceilToNearest100(x: number): number {
  return Math.ceil(x / 100) * 100;
}

export interface EtableringInput {
  /** Lånets pålydende (hovedstol) */
  loanDKK: number;
  /**
   * Obligationskurs, hvis kendt. Bruges til at estimere kurstab. Ved
   * null eller ≥ 100 regnes med intet kurstab.
   */
  kurs?: number | null;
}

export interface EtableringResult {
  /** Tinglysningsafgift af pant: fast + 1,25 % oprundet */
  tinglysningDKK: number;
  loanCaseFeeDKK: number;
  settlementDKK: number;
  /** Sum af kontante gebyrer ved etablering */
  totalFeesDKK: number;
  /** Estimeret kurstab: forskellen mellem pålydende og udbetalt beløb */
  kurstabDKK: number;
  /** Effektiv kurs efter kursfradrag, eller null hvis ukendt */
  effectiveKurs: number | null;
}

export function beregnEtablering(input: EtableringInput): EtableringResult {
  const { loanDKK, kurs } = input;
  if (loanDKK <= 0) {
    return {
      tinglysningDKK: 0,
      loanCaseFeeDKK: 0,
      settlementDKK: 0,
      totalFeesDKK: 0,
      kurstabDKK: 0,
      effectiveKurs: null,
    };
  }

  const tinglysning =
    CONSTANTS.MORTGAGE_FIXED_DKK +
    ceilToNearest100(loanDKK * CONSTANTS.MORTGAGE_RATE);

  const settlement = Math.max(
    Math.round(loanDKK * REALKREDIT_FEES.SETTLEMENT_RATE),
    REALKREDIT_FEES.SETTLEMENT_MIN_DKK
  );

  const totalFees =
    tinglysning + REALKREDIT_FEES.LOAN_CASE_FEE_DKK + settlement;

  // Kurstab: modtaget beløb = lånets pålydende × (kurs − kursfradrag) / 100.
  let kurstab = 0;
  let effectiveKurs: number | null = null;
  if (kurs != null && kurs > 0) {
    effectiveKurs = kurs - REALKREDIT_FEES.PRICE_DEDUCTION_POINTS;
    const proceeds = loanDKK * (effectiveKurs / 100);
    kurstab = Math.max(Math.round(loanDKK - proceeds), 0);
  }

  return {
    tinglysningDKK: Math.round(tinglysning),
    loanCaseFeeDKK: REALKREDIT_FEES.LOAN_CASE_FEE_DKK,
    settlementDKK: settlement,
    totalFeesDKK: Math.round(totalFees),
    kurstabDKK: kurstab,
    effectiveKurs,
  };
}
