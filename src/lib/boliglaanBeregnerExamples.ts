import { calculate } from "@/lib/calc";
import { validateCalcInput } from "@/lib/validation";
import type { CalcInput, CalcOutput } from "@/lib/types";

export type BoliglaanExample = {
  label: string;
  purchasePriceDKK: number;
  downPaymentDKK: number;
  realkreditDKK: number;
  bankLoanDKK: number;
  interestRealkreditPct: number;
  interestBankPct: number;
  termYears: number;
  output: CalcOutput;
};

function buildExample(
  label: string,
  purchasePriceDKK: number,
  downPaymentPct: number,
  interestRealkreditPct: number,
  interestBankPct: number
): BoliglaanExample | null {
  const downPaymentDKK = Math.round((purchasePriceDKK * downPaymentPct) / 100);
  const loanPrincipal = purchasePriceDKK - downPaymentDKK;
  const realkreditDKK = Math.min(
    Math.round((purchasePriceDKK * 80) / 100),
    loanPrincipal
  );
  const bankLoanDKK = Math.max(0, loanPrincipal - realkreditDKK);
  const raw: CalcInput = {
    purchasePriceDKK,
    downPaymentDKK,
    interestRateAnnualPct: interestRealkreditPct,
    termYears: 30,
    propertyType: "house",
    ownerExpensesMonthlyDKK: 0,
    includeMortgageRegistrationFee: true,
    realkreditPrincipalDKK: realkreditDKK,
    bankLoanInterestRatePct: bankLoanDKK > 0 ? interestBankPct : 0,
    bankLoanTermYears: 10,
    bankLoanInterestOnly: false,
  };
  const validated = validateCalcInput(raw);
  if (!validated.success) return null;
  return {
    label,
    purchasePriceDKK,
    downPaymentDKK,
    realkreditDKK,
    bankLoanDKK,
    interestRealkreditPct,
    interestBankPct,
    termYears: 30,
    output: calculate(validated.data),
  };
}

/** Faste scenarier til SEO-siden – tal fra samme beregningsmotor som beregneren. */
export function getBoliglaanBeregnerExamples(): BoliglaanExample[] {
  const list = [
    buildExample("Bolig til 2 mio. kr.", 2_000_000, 10, 4, 5.5),
    buildExample("Bolig til 3 mio. kr.", 3_000_000, 10, 4, 5.5),
    buildExample("Bolig til 4 mio. kr.", 4_000_000, 10, 4, 5.5),
  ].filter((x): x is BoliglaanExample => x != null);
  return list;
}
