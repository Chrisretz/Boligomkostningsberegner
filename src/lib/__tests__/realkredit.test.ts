import { describe, it, expect } from "vitest";
import { beregnEtablering, beregnAaop } from "../realkredit";
import { beregnForloeb } from "../laaneforloeb";

describe("beregnEtablering", () => {
  it("tinglysning af pant: 1.825 kr + 1,25 % oprundet til nærmeste 100", () => {
    const r = beregnEtablering({ loanDKK: 2_000_000 });
    // 2.000.000 × 1,25 % = 25.000 → + 1.825 = 26.825
    expect(r.tinglysningDKK).toBe(26_825);
  });

  it("oprunder den variable del af tinglysning", () => {
    const r = beregnEtablering({ loanDKK: 2_012_345 });
    // 2.012.345 × 1,25 % = 25.154,3 → oprundet 25.200 → + 1.825 = 27.025
    expect(r.tinglysningDKK).toBe(27_025);
  });

  it("afregningsprovision er 0,15 % med minimum 150 kr", () => {
    expect(beregnEtablering({ loanDKK: 2_000_000 }).settlementDKK).toBe(3000);
    expect(beregnEtablering({ loanDKK: 50_000 }).settlementDKK).toBe(150);
  });

  it("summerer tinglysning, lånesagsgebyr og afregningsprovision", () => {
    const r = beregnEtablering({ loanDKK: 2_000_000 });
    expect(r.totalFeesDKK).toBe(r.tinglysningDKK + 4000 + r.settlementDKK);
  });

  it("beregner kurstab ud fra kurs minus kursfradrag", () => {
    const r = beregnEtablering({ loanDKK: 1_000_000, kurs: 98 });
    // effektiv kurs 97,8 → modtaget 978.000 → kurstab 22.000
    expect(r.effectiveKurs).toBeCloseTo(97.8, 5);
    expect(r.kurstabDKK).toBe(22_000);
  });

  it("giver intet kurstab ved kurs 100 eller derover", () => {
    // Kurs 100 minus 0,2 fradrag = 99,8 → lille tab. Over ~100,2 = 0.
    expect(beregnEtablering({ loanDKK: 1_000_000, kurs: 100.2 }).kurstabDKK).toBe(0);
  });

  it("udelader kurstab når kursen er ukendt", () => {
    const r = beregnEtablering({ loanDKK: 1_000_000 });
    expect(r.kurstabDKK).toBe(0);
    expect(r.effectiveKurs).toBeNull();
  });

  it("returnerer nul uden lån", () => {
    expect(beregnEtablering({ loanDKK: 0 }).totalFeesDKK).toBe(0);
  });
});

describe("beregnAaop", () => {
  it("ÅOP = den nominelle rente ved kurs 100, ingen gebyrer og intet bidrag", () => {
    const f = beregnForloeb({
      ratePct: 4,
      bidragPct: 0,
      termYears: 30,
      interestOnlyYears: 0,
      principalDKK: 1_000_000,
    });
    const aaop = beregnAaop({
      loanDKK: 1_000_000,
      effectiveKurs: 100,
      feesDKK: 0,
      monthlyPayments: f.monthlyPayments,
    });
    // Ren annuitet uden ekstra omkostninger → ÅOP ≈ nominel rente
    expect(aaop).toBeGreaterThan(4.0);
    expect(aaop).toBeLessThan(4.1);
  });

  it("bidrag hæver ÅOP over den nominelle rente", () => {
    const f = beregnForloeb({
      ratePct: 4,
      bidragPct: 0.74,
      termYears: 30,
      interestOnlyYears: 0,
      principalDKK: 1_000_000,
    });
    const aaop = beregnAaop({
      loanDKK: 1_000_000,
      effectiveKurs: 100,
      feesDKK: 0,
      monthlyPayments: f.monthlyPayments,
    })!;
    expect(aaop).toBeGreaterThan(4.7);
    expect(aaop).toBeLessThan(5.2);
  });

  it("kurstab og gebyrer hæver ÅOP yderligere", () => {
    const f = beregnForloeb({
      ratePct: 4,
      bidragPct: 0.74,
      termYears: 30,
      interestOnlyYears: 0,
      principalDKK: 1_000_000,
    });
    const udenTab = beregnAaop({
      loanDKK: 1_000_000,
      effectiveKurs: 100,
      feesDKK: 0,
      monthlyPayments: f.monthlyPayments,
    })!;
    const medTab = beregnAaop({
      loanDKK: 1_000_000,
      effectiveKurs: 97.8,
      feesDKK: 30_000,
      monthlyPayments: f.monthlyPayments,
    })!;
    expect(medTab).toBeGreaterThan(udenTab);
  });

  it("returnerer null uden ydelser eller lån", () => {
    expect(
      beregnAaop({ loanDKK: 0, feesDKK: 0, monthlyPayments: [] })
    ).toBeNull();
  });
});
