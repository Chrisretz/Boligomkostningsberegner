/**
 * TypeScript interfaces – jf. PRD
 */

export type PropertyType = "house" | "apartment";

/** Antal personer i husstanden (5 = 5 eller flere). Bruges til el-estimat. */
export type HouseholdSize = 1 | 2 | 3 | 4 | 5;

export interface CalcInput {
  purchasePriceDKK: number;
  downPaymentDKK: number;
  interestRateAnnualPct: number;
  termYears: number;
  interestOnly?: boolean;
  propertyType: PropertyType;
  /** Valgfrit: boligens størrelse i m² */
  squareMeters?: number;
  /** Valgfrit: antal personer – bruges til at estimere månedlig eludgift */
  householdSize?: HouseholdSize;
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
    /** Estimeret el pr. måned (fra husstandsstørrelse + boligtype), 0 hvis ikke valgt */
    estimatedElMonthlyDKK: number;
    otherMonthlyDKK: number;
    maintenanceMonthlyDKK: number;
    realkreditMonthlyDKK: number;
    bankLoanMonthlyDKK: number;
  };
  assumptions: string[];
  exclusions: string[];
}
