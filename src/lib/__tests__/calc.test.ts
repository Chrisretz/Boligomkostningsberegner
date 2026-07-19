/**
 * Unit tests for beregningsmotoren (calc.ts) og ejendomsskat-estimatet.
 * Kør: npm test
 */

import { describe, it, expect } from "vitest";
import { calculate } from "../calc";
import { estimatePropertyTax } from "../propertyTax";
import type { CalcInput } from "../types";

/** Standard-input: hus 5 mio., 5 % udbetaling, 80 % realkredit, 4 % rente, 30 år. */
function baseInput(overrides: Partial<CalcInput> = {}): CalcInput {
  return {
    purchasePriceDKK: 5_000_000,
    downPaymentDKK: 250_000,
    interestRateAnnualPct: 4,
    termYears: 30,
    interestOnly: false,
    propertyType: "house",
    ownerExpensesMonthlyDKK: 0,
    otherMonthlyDKK: 0,
    bidragRatePct: 0.75,
    includePropertyTax: false, // slås eksplicit til i skattetests
    includeMortgageRegistrationFee: false,
    otherUpfrontDKK: 0,
    realkreditPrincipalDKK: 4_000_000,
    bankLoanAmountDKK: 750_000,
    bankLoanInterestRatePct: 6,
    bankLoanTermYears: 10,
    bankLoanInterestOnly: false,
    ...overrides,
  };
}

describe("annuitetsydelse", () => {
  it("beregner korrekt annuitet for realkreditlån (4 mio., 4 %, 30 år)", () => {
    const out = calculate(
      baseInput({ bankLoanAmountDKK: 0, realkreditPrincipalDKK: 4_000_000, downPaymentDKK: 1_000_000 })
    );
    // Facit: 19.096,61 kr/md (uafhængigt beregnet)
    expect(out.base.realkreditMonthlyDKK).toBe(19097);
  });

  it("beregner korrekt annuitet for banklån (750.000, 6 %, 10 år)", () => {
    const out = calculate(baseInput());
    // Facit: 8.326,54 kr/md
    expect(out.base.bankLoanMonthlyDKK).toBe(8327);
  });

  it("afdragsfrihed giver ren rentebetaling", () => {
    const out = calculate(
      baseInput({
        interestOnly: true,
        bankLoanAmountDKK: 0,
        realkreditPrincipalDKK: 4_000_000,
        downPaymentDKK: 1_000_000,
      })
    );
    // 4.000.000 × 4 % / 12 = 13.333,33
    expect(out.base.realkreditMonthlyDKK).toBe(13333);
  });

  it("0 % rente giver lineært afdrag", () => {
    const out = calculate(
      baseInput({
        interestRateAnnualPct: 0,
        bankLoanAmountDKK: 0,
        realkreditPrincipalDKK: 3_600_000,
        downPaymentDKK: 1_400_000,
      })
    );
    // 3.600.000 / 360 = 10.000
    expect(out.base.realkreditMonthlyDKK).toBe(10000);
  });
});

describe("lånefordeling", () => {
  it("realkredit begrænses til samlet finansiering", () => {
    const out = calculate(
      baseInput({
        downPaymentDKK: 2_000_000,
        realkreditPrincipalDKK: 4_000_000, // over totalFinance på 3 mio.
        bankLoanAmountDKK: 0,
      })
    );
    expect(out.loanPrincipalDKK).toBe(3_000_000);
    expect(out.base.bankLoanMonthlyDKK).toBe(0);
  });
});

describe("engangsomkostninger (tinglysning 2026)", () => {
  it("skødeafgift: 1.850 kr + 0,6 % oprundet til nærmeste 100", () => {
    const out = calculate(baseInput());
    // 5.000.000 × 0,6 % = 30.000 → 1.850 + 30.000 = 31.850
    expect(out.upfrontDeedFeeDKK).toBe(31_850);
  });

  it("skødeafgift oprunder variabel del", () => {
    const out = calculate(baseInput({ purchasePriceDKK: 5_012_345 }));
    // 5.012.345 × 0,6 % = 30.074,07 → oprundet 30.100 → + 1.850 = 31.950
    expect(out.upfrontDeedFeeDKK).toBe(31_950);
  });

  it("pantafgift: 1.825 kr + 1,25 % af pantsikret beløb", () => {
    const out = calculate(
      baseInput({
        includeMortgageRegistrationFee: true,
        mortgagePrincipalDKK: 4_000_000,
      })
    );
    // 4.000.000 × 1,25 % = 50.000 → 1.825 + 50.000 = 51.825
    expect(out.upfrontMortgageFeeDKK).toBe(51_825);
  });

  it("kontantbehov = udbetaling + engangsomkostninger", () => {
    const out = calculate(baseInput());
    expect(out.cashNeededAtCloseDKK).toBe(250_000 + out.upfrontTotalDKK);
  });
});

describe("bidrag på realkreditlån", () => {
  it("beregnes som sats af hovedstol og indgår i månedlig total", () => {
    const out = calculate(baseInput());
    // 4.000.000 × 0,75 % / 12 = 2.500
    expect(out.base.bidragMonthlyDKK).toBe(2500);
    expect(out.breakdownMonthly.bidragMonthlyDKK).toBe(2500);
  });

  it("er uændret i rentestest (+1 % / +2 %)", () => {
    const out = calculate(baseInput());
    expect(out.plus1.bidragMonthlyDKK).toBe(out.base.bidragMonthlyDKK);
    expect(out.plus2.bidragMonthlyDKK).toBe(out.base.bidragMonthlyDKK);
  });

  it("er 0 uden realkreditlån", () => {
    const out = calculate(
      baseInput({ realkreditPrincipalDKK: 0, bankLoanAmountDKK: 4_750_000 })
    );
    expect(out.base.bidragMonthlyDKK).toBe(0);
  });
});

describe("ejendomsskat (2026-satser)", () => {
  it("estimerer ejendomsværdiskat under progressionsgrænsen", () => {
    const est = estimatePropertyTax(5_000_000, "house");
    // EVS: 80 % af 5 mio. = 4 mio. × 0,51 % = 20.400 kr/år
    expect(est.evsAnnualDKK).toBe(20_400);
    // Grundskyld: 5 mio. × 25 % × 80 % = 1 mio. × 7,4 ‰ = 7.400 kr/år
    expect(est.grundskyldAnnualDKK).toBe(7_400);
    expect(est.totalMonthlyDKK).toBe(Math.round(27_800 / 12));
  });

  it("bruger 1,4 % over progressionsgrænsen (9.007.000 kr)", () => {
    const est = estimatePropertyTax(15_000_000, "house");
    // Base 12 mio.: 9.007.000 × 0,51 % + 2.993.000 × 1,4 % = 87.837,70
    expect(est.evsAnnualDKK).toBe(87_838);
  });

  it("lejlighed bruger lavere grundværdi-andel end hus", () => {
    const hus = estimatePropertyTax(5_000_000, "house");
    const lejlighed = estimatePropertyTax(5_000_000, "apartment");
    expect(lejlighed.grundskyldAnnualDKK).toBeLessThan(hus.grundskyldAnnualDKK);
    expect(lejlighed.evsAnnualDKK).toBe(hus.evsAnnualDKK);
  });

  it("indgår i månedlig total når includePropertyTax er sat", () => {
    const uden = calculate(baseInput({ includePropertyTax: false }));
    const med = calculate(baseInput({ includePropertyTax: true }));
    const est = estimatePropertyTax(5_000_000, "house");
    expect(med.breakdownMonthly.propertyTaxMonthlyDKK).toBe(est.totalMonthlyDKK);
    expect(med.base.monthlyTotalDKK - uden.base.monthlyTotalDKK).toBe(
      est.totalMonthlyDKK
    );
    expect(med.propertyTaxIsEstimate).toBe(true);
  });

  it("manuel værdi overstyrer estimatet", () => {
    const out = calculate(
      baseInput({ includePropertyTax: true, propertyTaxMonthlyOverrideDKK: 3_000 })
    );
    expect(out.breakdownMonthly.propertyTaxMonthlyDKK).toBe(3_000);
    expect(out.propertyTaxIsEstimate).toBe(false);
  });
});

describe("vedligehold", () => {
  it("hus: 1,5 % af købspris pr. år", () => {
    const out = calculate(baseInput());
    expect(out.maintenanceMonthlyDKK).toBe(Math.round((5_000_000 * 0.015) / 12));
  });

  it("lejlighed: 1,0 % af købspris pr. år", () => {
    const out = calculate(baseInput({ propertyType: "apartment" }));
    expect(out.maintenanceMonthlyDKK).toBe(Math.round((5_000_000 * 0.01) / 12));
  });
});

describe("rentestest", () => {
  it("plus1/plus2 bruger +1 og +2 procentpoint", () => {
    const out = calculate(baseInput());
    expect(out.plus1.interestRateAnnualPct).toBe(5);
    expect(out.plus2.interestRateAnnualPct).toBe(6);
    expect(out.plus1.monthlyTotalDKK).toBeGreaterThan(out.base.monthlyTotalDKK);
    expect(out.plus2.monthlyTotalDKK).toBeGreaterThan(out.plus1.monthlyTotalDKK);
  });
});

describe("månedlig total", () => {
  it("er summen af alle poster", () => {
    const out = calculate(
      baseInput({
        includePropertyTax: true,
        ownerExpensesMonthlyDKK: 4_000,
        otherMonthlyDKK: 500,
      })
    );
    const b = out.breakdownMonthly;
    const sum =
      out.base.monthlyPaymentDKK +
      b.bidragMonthlyDKK +
      b.propertyTaxMonthlyDKK +
      b.ownerExpensesMonthlyDKK +
      b.estimatedElMonthlyDKK +
      b.maintenanceMonthlyDKK +
      b.otherMonthlyDKK;
    // Afrunding kan give ±2 kr forskel mellem summen af afrundede poster og totalen
    expect(Math.abs(out.base.monthlyTotalDKK - sum)).toBeLessThanOrEqual(2);
  });
});
