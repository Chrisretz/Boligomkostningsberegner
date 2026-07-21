/**
 * Tests af bidragsberegningen.
 *
 * Prisbladet oplyser både intervalsatser (0-40 %, 40-60 %, over 60 %) og
 * færdigberegnede satser for hele lån (0-60 %, 0-75 %, 0-80 %). Vi bruger
 * kun intervalsatserne i koden, så de færdigberegnede rækker fungerer som
 * uafhængigt facit på, at vægtningen er korrekt.
 */

import { describe, it, expect } from "vitest";
import { calculateBidrag, type LoanType } from "../bidrag";

const VALUE = 3_000_000;

function rate(ltvPct: number, loanType: LoanType, interestOnly = false) {
  return calculateBidrag({
    loanDKK: VALUE * (ltvPct / 100),
    propertyValueDKK: VALUE,
    loanType,
    interestOnly,
  });
}

describe("intervalsatser rammer prisbladets tal", () => {
  it("0-40 % svarer til første interval", () => {
    expect(rate(40, "fast").baseRatePct).toBe(0.45);
    expect(rate(40, "f1f2").baseRatePct).toBe(0.75);
  });
});

describe("vægtet sats matcher prisbladets færdigberegnede rækker", () => {
  // Række "0-60%" i prisbladet
  it("60 % belåning", () => {
    expect(rate(60, "fast").baseRatePct).toBe(0.59);
    expect(rate(60, "renteMaxF5F10").baseRatePct).toBe(0.69);
    expect(rate(60, "fKort").baseRatePct).toBe(0.69);
    expect(rate(60, "f3f4").baseRatePct).toBe(0.89);
    expect(rate(60, "f1f2").baseRatePct).toBe(0.94);
  });

  // Række "0-75%"
  it("75 % belåning", () => {
    expect(rate(75, "fast").baseRatePct).toBe(0.71);
    expect(rate(75, "renteMaxF5F10").baseRatePct).toBe(0.84);
    expect(rate(75, "fKort").baseRatePct).toBe(0.86);
    expect(rate(75, "f3f4").baseRatePct).toBe(1.04);
    expect(rate(75, "f1f2").baseRatePct).toBe(1.13);
  });

  // Række "0-80%"
  it("80 % belåning", () => {
    expect(rate(80, "fast").baseRatePct).toBe(0.74);
    expect(rate(80, "renteMaxF5F10").baseRatePct).toBe(0.88);
    expect(rate(80, "fKort").baseRatePct).toBe(0.9);
    expect(rate(80, "f3f4").baseRatePct).toBe(1.08);
    expect(rate(80, "f1f2").baseRatePct).toBe(1.18);
  });
});

describe("tillæg for afdragsfrihed", () => {
  it("matcher prisbladet ved 60, 75 og 80 % (fast rente)", () => {
    expect(rate(60, "fast", true).interestOnlyAddOnPct).toBe(0.01);
    expect(rate(75, "fast", true).interestOnlyAddOnPct).toBe(0.14);
    expect(rate(80, "fast", true).interestOnlyAddOnPct).toBe(0.17);
  });

  it("matcher prisbladet ved 60, 75 og 80 % (øvrige lån)", () => {
    expect(rate(60, "f1f2", true).interestOnlyAddOnPct).toBe(0.12);
    expect(rate(75, "f1f2", true).interestOnlyAddOnPct).toBe(0.23);
    expect(rate(80, "f1f2", true).interestOnlyAddOnPct).toBe(0.25);
  });

  it("giver intet tillæg når der afdrages", () => {
    expect(rate(80, "fast", false).interestOnlyAddOnPct).toBe(0);
    expect(rate(80, "fast", false).ratePct).toBe(
      rate(80, "fast", false).baseRatePct
    );
  });
});

describe("kanttilfælde", () => {
  it("returnerer 0 uden lån", () => {
    expect(
      calculateBidrag({
        loanDKK: 0,
        propertyValueDKK: VALUE,
        loanType: "fast",
        interestOnly: false,
      }).ratePct
    ).toBe(0);
  });

  it("højere belåning giver højere sats", () => {
    expect(rate(80, "fast").baseRatePct).toBeGreaterThan(
      rate(40, "fast").baseRatePct
    );
  });

  it("variabel rente er dyrere end fast i alle intervaller", () => {
    for (const ltv of [40, 60, 75, 80]) {
      expect(rate(ltv, "f1f2").baseRatePct).toBeGreaterThan(
        rate(ltv, "fast").baseRatePct
      );
    }
  });
});
