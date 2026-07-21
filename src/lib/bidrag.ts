/**
 * Beregning af bidragssats på realkreditlån.
 *
 * Satserne er intervalopdelte: hver del af lånet inden for et
 * belåningsinterval har sin egen sats, og den effektive sats er det
 * vægtede gennemsnit over lånets samlede belåningsgrad. Resultatet
 * rundes op til to decimaler, som instituttet selv gør.
 *
 * Kilde: Totalkredits prisblad for privatkunder, gældende pr. 1. juli 2026.
 * Andre institutter har andre satser – tallene er derfor vejledende og
 * skal verificeres hos eget institut.
 *
 * VIGTIGT: Kontrollér satserne mod et aktuelt prisblad mindst hvert
 * halve år, og opdater BIDRAG_SOURCE når du gør.
 */

export const BIDRAG_SOURCE = {
  institute: "Totalkredit",
  validFrom: "1. juli 2026",
  url: "https://www.totalkredit.dk/boliglan/kurser-og-priser/",
  /** KundeKroner-rabat p.a. hos Totalkredit (frem til 31/12 2029) */
  kundeKronerRabatPct: 0.25,
} as const;

export type LoanType =
  | "fast"
  | "renteMaxF5F10"
  | "fKort"
  | "f3f4"
  | "f1f2";

export const LOAN_TYPE_LABELS: Record<LoanType, string> = {
  fast: "Fast rente",
  renteMaxF5F10: "F5-F10 / RenteMax",
  fKort: "F-kort",
  f3f4: "F3-F4",
  f1f2: "F1-F2",
};

/**
 * Korte etiketter til knapper, hvor pladsen er trang. Renten, vi henter,
 * er netop F5's og F3's kontantrente, så det er også de mest ærlige navne.
 */
export const LOAN_TYPE_SHORT_LABELS: Record<LoanType, string> = {
  fast: "Fast rente",
  renteMaxF5F10: "F5",
  fKort: "F-kort",
  f3f4: "F3",
  f1f2: "F1",
};

/** Belåningsintervaller i procent af boligens værdi. */
interface Band {
  /** Nedre grænse (inkl.) i procent */
  from: number;
  /** Øvre grænse i procent; Infinity for øverste interval */
  to: number;
  rates: Record<LoanType, number>;
  /** Tillæg ved afdragsfrihed – fast rente har sin egen sats */
  interestOnlyAddOnFast: number;
  interestOnlyAddOnOther: number;
}

/** Ejerboliger, jf. prisbladet. */
const BANDS: readonly Band[] = [
  {
    from: 0,
    to: 40,
    rates: {
      fast: 0.45,
      renteMaxF5F10: 0.5,
      fKort: 0.5,
      f3f4: 0.7,
      f1f2: 0.75,
    },
    interestOnlyAddOnFast: 0.0,
    interestOnlyAddOnOther: 0.1,
  },
  {
    from: 40,
    to: 60,
    rates: {
      fast: 0.85,
      renteMaxF5F10: 1.05,
      fKort: 1.05,
      f3f4: 1.25,
      f1f2: 1.3,
    },
    interestOnlyAddOnFast: 0.02,
    interestOnlyAddOnOther: 0.15,
  },
  {
    from: 60,
    to: Infinity,
    rates: {
      fast: 1.2,
      renteMaxF5F10: 1.45,
      fKort: 1.55,
      f3f4: 1.65,
      f1f2: 1.9,
    },
    interestOnlyAddOnFast: 0.65,
    interestOnlyAddOnOther: 0.65,
  },
];

/** Rund op til to decimaler, som instituttet gør. */
function ceil2(x: number): number {
  return Math.ceil(x * 100 - 1e-9) / 100;
}

export interface BidragInput {
  /** Realkreditlånets størrelse */
  loanDKK: number;
  /** Boligens værdi (købspris) */
  propertyValueDKK: number;
  loanType: LoanType;
  interestOnly: boolean;
}

export interface BidragResult {
  /** Effektiv bidragssats i procent pr. år */
  ratePct: number;
  /** Belåningsgrad i procent */
  ltvPct: number;
  /** Bidraget alene, uden tillæg for afdragsfrihed */
  baseRatePct: number;
  /** Tillæg for afdragsfrihed (0 hvis der afdrages) */
  interestOnlyAddOnPct: number;
}

/**
 * Vægtet bidragssats over lånets belåningsintervaller.
 *
 * Eksempel: et lån på 80 % af værdien med fast rente og afdrag ligger
 * halvdelen i 0-40 %, en fjerdedel i 40-60 % og en fjerdedel over 60 %,
 * hvilket giver (0,45 + 0,85/2 + 1,20/2) / 2 ≈ 0,74 %.
 */
export function calculateBidrag(input: BidragInput): BidragResult {
  const { loanDKK, propertyValueDKK, loanType, interestOnly } = input;
  if (loanDKK <= 0 || propertyValueDKK <= 0) {
    return { ratePct: 0, ltvPct: 0, baseRatePct: 0, interestOnlyAddOnPct: 0 };
  }

  const ltvPct = (loanDKK / propertyValueDKK) * 100;

  let weightedBase = 0;
  let weightedAddOn = 0;
  for (const band of BANDS) {
    const upper = Math.min(ltvPct, band.to);
    const share = Math.max(upper - band.from, 0);
    if (share <= 0) continue;
    const weight = share / ltvPct;
    weightedBase += band.rates[loanType] * weight;
    weightedAddOn +=
      (loanType === "fast"
        ? band.interestOnlyAddOnFast
        : band.interestOnlyAddOnOther) * weight;
  }

  const baseRatePct = ceil2(weightedBase);
  const interestOnlyAddOnPct = interestOnly ? ceil2(weightedAddOn) : 0;

  return {
    ratePct: ceil2(weightedBase + (interestOnly ? weightedAddOn : 0)),
    ltvPct,
    baseRatePct,
    interestOnlyAddOnPct,
  };
}
