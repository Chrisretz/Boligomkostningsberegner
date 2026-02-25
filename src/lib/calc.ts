/**
 * Beregningsmotor for boligomkostninger – jf. PRD specifikation
 */

import type { CalcInput, CalcOutput, ScenarioOutput } from "./types";
import { CONSTANTS, DEFAULTS } from "./constants";

function ceilToNearest100(x: number): number {
  return Math.ceil(x / 100) * 100;
}

function roundDKK(x: number): number {
  return Math.round(x);
}

function calcMonthlyPayment(
  principal: number,
  annualRatePct: number,
  termYears: number
): number {
  if (principal <= 0) return 0;
  const n = termYears * 12;
  const r = (annualRatePct / 100) / 12;
  if (r === 0) return principal / n;
  const pow = Math.pow(1 + r, n);
  return (principal * (r * pow)) / (pow - 1);
}

function calcDeedFee(purchasePrice: number): number {
  const variable = ceilToNearest100(purchasePrice * CONSTANTS.DEED_RATE);
  return CONSTANTS.DEED_FIXED_DKK + variable;
}

function calcMortgageFee(mortgagePrincipal: number): number {
  const variable = ceilToNearest100(
    mortgagePrincipal * CONSTANTS.MORTGAGE_RATE
  );
  return CONSTANTS.MORTGAGE_FIXED_DKK + variable;
}

function calcMaintenanceMonthly(
  purchasePrice: number,
  propertyType: "house" | "apartment"
): number {
  const annualRate =
    propertyType === "house"
      ? DEFAULTS.MAINT_HOUSE_RATE
      : DEFAULTS.MAINT_APT_RATE;
  return (purchasePrice * annualRate) / 12;
}

function scenario(
  input: CalcInput,
  annualRatePct: number
): ScenarioOutput {
  const loanPrincipal = Math.max(
    input.purchasePriceDKK - input.downPaymentDKK,
    0
  );
  const payment = calcMonthlyPayment(
    loanPrincipal,
    annualRatePct,
    input.termYears
  );
  const otherMonthly = input.otherMonthlyDKK ?? 0;
  const maintenance = calcMaintenanceMonthly(
    input.purchasePriceDKK,
    input.propertyType
  );
  const monthlyTotal =
    payment +
    input.ownerExpensesMonthlyDKK +
    maintenance +
    otherMonthly;
  return {
    interestRateAnnualPct: annualRatePct,
    monthlyPaymentDKK: roundDKK(payment),
    monthlyTotalDKK: roundDKK(monthlyTotal),
  };
}

export function calculate(input: CalcInput): CalcOutput {
  const loanPrincipal = Math.max(
    input.purchasePriceDKK - input.downPaymentDKK,
    0
  );
  const deedFee = calcDeedFee(input.purchasePriceDKK);
  const includeMortgage =
    input.includeMortgageRegistrationFee && loanPrincipal > 0;
  const mortgagePrincipal = includeMortgage
    ? (input.mortgagePrincipalDKK ?? loanPrincipal)
    : 0;
  const mortgageFee = includeMortgage
    ? calcMortgageFee(mortgagePrincipal)
    : 0;
  const upfrontOther = input.otherUpfrontDKK ?? 0;
  const upfrontTotal = deedFee + mortgageFee + upfrontOther;
  const cashNeeded = input.downPaymentDKK + upfrontTotal;
  const maintenanceMonthly = calcMaintenanceMonthly(
    input.purchasePriceDKK,
    input.propertyType
  );

  const base = scenario(input, input.interestRateAnnualPct);
  const plus1 = scenario(input, input.interestRateAnnualPct + 1);
  const plus2 = scenario(input, input.interestRateAnnualPct + 2);

  return {
    loanPrincipalDKK: roundDKK(loanPrincipal),
    upfrontDeedFeeDKK: roundDKK(deedFee),
    upfrontMortgageFeeDKK: roundDKK(mortgageFee),
    upfrontOtherDKK: roundDKK(upfrontOther),
    upfrontTotalDKK: roundDKK(upfrontTotal),
    cashNeededAtCloseDKK: roundDKK(cashNeeded),
    maintenanceMonthlyDKK: roundDKK(maintenanceMonthly),
    base,
    plus1,
    plus2,
    breakdownMonthly: {
      ownerExpensesMonthlyDKK: roundDKK(input.ownerExpensesMonthlyDKK),
      otherMonthlyDKK: roundDKK(input.otherMonthlyDKK ?? 0),
      maintenanceMonthlyDKK: roundDKK(maintenanceMonthly),
    },
    assumptions: [
      "Låneydelse beregnes som én annuitet (forenkling).",
      "Vedligehold estimeres som en fast procent af købspris pr. år (vejledende).",
      "Pantafgift beregnes af pantsikret beløb (default: lånebeløb).",
    ],
    exclusions: [
      "Skattefradrag og individuelle skatteforhold er ikke medregnet.",
      "Ejendomsskatter (grundskyld/ejendomsværdiskat) beregnes ikke automatisk i MVP.",
      "Forsyning (el/vand/varme) er kun med, hvis du indtaster det i Øvrige månedlige omkostninger.",
    ],
  };
}
