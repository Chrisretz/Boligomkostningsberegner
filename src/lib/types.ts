/**
 * TypeScript interfaces – jf. PRD
 */

export type PropertyType = "house" | "apartment";

export interface CalcInput {
  purchasePriceDKK: number;
  downPaymentDKK: number;
  interestRateAnnualPct: number;
  termYears: number;
  propertyType: PropertyType;
  ownerExpensesMonthlyDKK: number;
  otherMonthlyDKK?: number;
  includeMortgageRegistrationFee: boolean;
  mortgagePrincipalDKK?: number;
  otherUpfrontDKK?: number;
}

export interface ScenarioOutput {
  interestRateAnnualPct: number;
  monthlyPaymentDKK: number;
  monthlyTotalDKK: number;
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
  };
  assumptions: string[];
  exclusions: string[];
}
