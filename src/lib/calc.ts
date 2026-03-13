/**
 * Beregningsmotor for boligomkostninger – jf. PRD specifikation
 */

import type { CalcInput, CalcOutput, ScenarioOutput } from "./types";
import { CONSTANTS, DEFAULTS } from "./constants";
import { estimateMonthlyElDKK } from "./electricity";

function ceilToNearest100(x: number): number {
  return Math.ceil(x / 100) * 100;
}

function roundDKK(x: number): number {
  return Math.round(x);
}

function calcMonthlyPayment(
  principal: number,
  annualRatePct: number,
  termYears: number,
  interestOnly: boolean
): number {
  if (principal <= 0) return 0;
  if (interestOnly) {
    return (principal * (annualRatePct / 100)) / 12;
  }
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
  const totalFinance = Math.max(
    input.purchasePriceDKK - input.downPaymentDKK,
    0
  );
  const realkreditPrincipal =
    input.realkreditPrincipalDKK != null
      ? Math.min(
          input.realkreditPrincipalDKK,
          totalFinance
        )
      : Math.max(totalFinance - (input.bankLoanAmountDKK ?? 0), 0);
  const bankAmount = totalFinance - realkreditPrincipal;
  const realkreditPayment = calcMonthlyPayment(
    realkreditPrincipal,
    annualRatePct,
    input.termYears,
    input.interestOnly ?? false
  );
  const bankRate = input.bankLoanInterestRatePct ?? 0;
  const bankTerm = input.bankLoanTermYears ?? input.termYears;
  const bankInterestOnly = input.bankLoanInterestOnly ?? false;
  const bankPayment =
    bankAmount > 0
      ? calcMonthlyPayment(bankAmount, bankRate, bankTerm, bankInterestOnly)
      : 0;
  const payment = roundDKK(realkreditPayment + bankPayment);
  const otherMonthly = input.otherMonthlyDKK ?? 0;
  const maintenance = calcMaintenanceMonthly(
    input.purchasePriceDKK,
    input.propertyType
  );
  const estimatedEl =
    input.householdSize != null
      ? estimateMonthlyElDKK(
          input.propertyType,
          input.householdSize,
          DEFAULTS.EL_PRICE_KR_PER_KWH
        )
      : 0;
  const monthlyTotal =
    payment +
    input.ownerExpensesMonthlyDKK +
    estimatedEl +
    maintenance +
    otherMonthly;
  return {
    interestRateAnnualPct: annualRatePct,
    monthlyPaymentDKK: payment,
    monthlyTotalDKK: roundDKK(monthlyTotal),
    realkreditMonthlyDKK: roundDKK(realkreditPayment),
    bankLoanMonthlyDKK: roundDKK(bankPayment),
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
  const estimatedElMonthly =
    input.householdSize != null
      ? estimateMonthlyElDKK(
          input.propertyType,
          input.householdSize,
          DEFAULTS.EL_PRICE_KR_PER_KWH
        )
      : 0;

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
      estimatedElMonthlyDKK: roundDKK(estimatedElMonthly),
      otherMonthlyDKK: roundDKK(input.otherMonthlyDKK ?? 0),
      maintenanceMonthlyDKK: roundDKK(maintenanceMonthly),
      realkreditMonthlyDKK: base.realkreditMonthlyDKK,
      bankLoanMonthlyDKK: base.bankLoanMonthlyDKK,
    },
    assumptions: [
      input.interestOnly
        ? "Låneydelsen er kun rente (afdragsfrihed); der afdrages ikke på hovedstolen."
        : "Låneydelse beregnes som én annuitet (forenkling).",
      "Vedligehold estimeres som en fast procent af købspris pr. år (vejledende).",
      "Pantafgift beregnes af pantsikret beløb (default: lånebeløb).",
      ...(input.householdSize != null
        ? [
            `El-estimat baseret på gennemsnitligt forbrug (Energistyrelsen/EWII) for ${input.propertyType === "apartment" ? "lejlighed" : "hus"} med ${input.householdSize === 5 ? "5+" : input.householdSize} person(er) og vejledende elpris. Elvarme og elbil er ikke inkluderet.`,
          ]
        : []),
    ],
    exclusions: [
      "Skattefradrag og individuelle skatteforhold er ikke medregnet.",
      "Ejendomsskatter (grundskyld/ejendomsværdiskat) beregnes ikke automatisk i MVP.",
      input.householdSize == null
        ? "Forsyning (el/vand/varme) er kun med, hvis du indtaster det i Øvrige månedlige omkostninger eller vælger antal personer til el-estimat."
        : "El-estimat er vejledende; elvarme og elbil kan give højere forbrug.",
    ],
  };
}
