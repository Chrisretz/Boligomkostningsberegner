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

  // Afregningsprovision beregnes af kursværdien (pålydende × kurs/100),
  // ikke af pålydende. Kendes kursen ikke, bruges pålydende som skøn.
  const settlementBase =
    kurs != null && kurs > 0 ? loanDKK * (kurs / 100) : loanDKK;
  const settlement = Math.max(
    Math.round(settlementBase * REALKREDIT_FEES.SETTLEMENT_RATE),
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

/**
 * Årlige omkostninger i procent (ÅOP).
 *
 * ÅOP er den effektive årlige rente, der får det beløb, låntager reelt
 * får stillet til rådighed, til at svare til nutidsværdien af alle
 * fremtidige ydelser. Definitionen følger kreditaftaleloven.
 *
 * Modellen her:
 * - Provenu = lånets pålydende × effektiv kurs / 100 (kurstab trukket fra).
 * - Etableringsgebyrer trækkes fra provenuet, da låntager også betaler dem.
 * - Ydelsesstrømmen er de månedlige ydelser inkl. bidrag.
 * - For variable lån antages den aktuelle rente at fortsætte hele
 *   løbetiden – samme konvention som institutternes egne ÅOP-tal.
 *
 * Den månedlige interne rente findes ved bisektion, og ÅOP opgøres som
 * (1 + i)^12 − 1.
 */
export interface AaopInput {
  /** Lånets pålydende */
  loanDKK: number;
  /** Effektiv kurs efter kursfradrag; null eller ≥100 → provenu = pålydende */
  effectiveKurs?: number | null;
  /** Etableringsgebyrer betalt af låntager */
  feesDKK: number;
  /** Månedlige ydelser inkl. bidrag (fra beregnForloeb) */
  monthlyPayments: number[];
}

export function beregnAaop(input: AaopInput): number | null {
  const { loanDKK, effectiveKurs, feesDKK, monthlyPayments } = input;
  if (loanDKK <= 0 || monthlyPayments.length === 0) return null;

  const kursFactor =
    effectiveKurs != null && effectiveKurs > 0 ? effectiveKurs / 100 : 1;
  const netProceeds = loanDKK * kursFactor - feesDKK;
  if (netProceeds <= 0) return null;

  // Nutidsværdi af ydelser ved månedlig rente i. Falder monotont i i.
  const npv = (i: number): number =>
    monthlyPayments.reduce(
      (sum, p, idx) => sum + p / Math.pow(1 + i, idx + 1),
      0
    );

  // Vi søger i, hvor npv(i) = netProceeds. Bisektion i et bredt interval.
  let lo = 0;
  let hi = 0.5; // 0,5 % pr. md ≈ 6 % p.a. øvre start; udvid hvis nødvendigt
  while (npv(hi) > netProceeds && hi < 5) hi *= 2;
  if (npv(hi) > netProceeds) return null;

  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    if (npv(mid) > netProceeds) lo = mid;
    else hi = mid;
  }
  const monthly = (lo + hi) / 2;
  const aaop = (Math.pow(1 + monthly, 12) - 1) * 100;
  return Math.round(aaop * 100) / 100;
}
