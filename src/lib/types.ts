/**
 * TypeScript interfaces – jf. PRD
 */

export type PropertyType = "house" | "apartment";

export interface CalcInput {
  purchasePriceDKK: number;
  downPaymentDKK: number;
  interestRateAnnualPct: number;
  termYears: number;
  interestOnly?: boolean;
  propertyType: PropertyType;
  ownerExpensesMonthlyDKK: number;
  otherMonthlyDKK?: number;
  includeMortgageRegistrationFee: boolean;
  mortgagePrincipalDKK?: number;
  otherUpfrontDKK?: number;
  /** Realkreditlån: beløb (valgfri; hvis sat bruges det, og banklån = købspris − udbetaling − dette) */
  realkreditPrincipalDKK?: number;
  /** Bolig- / banklån: beløb (0 = ingen banklån; kan beregnes som købspris − udbetaling − realkredit) */
  bankLoanAmountDKK?: number;
  bankLoanInterestRatePct?: number;
  bankLoanTermYears?: number;
  bankLoanInterestOnly?: boolean;
}

export interface ScenarioOutput {
  interestRateAnnualPct: number;
  monthlyPaymentDKK: number;
  monthlyTotalDKK: number;
  realkreditMonthlyDKK: number;
  bankLoanMonthlyDKK: number;
}

export interface CalcOutput {
  loanPrincipalDKK: number;
  upfrontDeedFeeDKK: number;
  upfrontMortgageFeeDKK: number;
  upfrontOtherDKK: number;
  upfrontTotalDKK: number;
  cashNeededAtCloseDKK: number;
  maintenanceMonthlyDKK: number;
  base: ScenarioOutput;
  plus1: ScenarioOutput;
  plus2: ScenarioOutput;
  breakdownMonthly: {
    ownerExpensesMonthlyDKK: number;
    otherMonthlyDKK: number;
    maintenanceMonthlyDKK: number;
    realkreditMonthlyDKK: number;
    bankLoanMonthlyDKK: number;
  };
  assumptions: string[];
  exclusions: string[];
}
