import { describe, it, expect } from "vitest";
import { beregnForloeb, LOAN_PER_MILLION } from "../laaneforloeb";

describe("beregnForloeb", () => {
  it("afdrager hele hovedstolen over løbetiden", () => {
    const r = beregnForloeb({
      ratePct: 4,
      bidragPct: 0,
      termYears: 30,
      interestOnlyYears: 0,
    });
    expect(r.points[r.points.length - 1].balanceDKK).toBe(0);
  });

  it("rammer den kendte annuitet ved 4 % over 30 år", () => {
    const r = beregnForloeb({
      ratePct: 4,
      bidragPct: 0,
      termYears: 30,
      interestOnlyYears: 0,
    });
    // 1 mio. kr, 4 %, 360 mdr → 4.774,15 kr/md
    expect(r.firstPaymentDKK).toBe(4774);
  });

  it("lægger bidrag oven i ydelsen", () => {
    const uden = beregnForloeb({
      ratePct: 4,
      bidragPct: 0,
      termYears: 30,
      interestOnlyYears: 0,
    });
    const med = beregnForloeb({
      ratePct: 4,
      bidragPct: 0.74,
      termYears: 30,
      interestOnlyYears: 0,
    });
    // Første måned: 0,74 % af 1 mio. / 12 = 616,67 kr
    expect(med.firstPaymentDKK - uden.firstPaymentDKK).toBe(617);
  });

  it("holder restgælden uændret i afdragsfriheden", () => {
    const r = beregnForloeb({
      ratePct: 4,
      bidragPct: 0.9,
      termYears: 30,
      interestOnlyYears: 10,
    });
    expect(r.balanceAfter10YearsDKK).toBe(LOAN_PER_MILLION);
  });

  it("giver lavere startydelse men højere ydelse bagefter ved afdragsfrihed", () => {
    const medAfdrag = beregnForloeb({
      ratePct: 4,
      bidragPct: 0.74,
      termYears: 30,
      interestOnlyYears: 0,
    });
    const afdragsfri = beregnForloeb({
      ratePct: 4,
      bidragPct: 0.91,
      termYears: 30,
      interestOnlyYears: 10,
    });
    expect(afdragsfri.firstPaymentDKK).toBeLessThan(medAfdrag.firstPaymentDKK);
    expect(afdragsfri.paymentAfterInterestOnlyDKK).toBeGreaterThan(
      medAfdrag.firstPaymentDKK
    );
  });

  it("gør lånet dyrere samlet set ved afdragsfrihed", () => {
    const medAfdrag = beregnForloeb({
      ratePct: 4,
      bidragPct: 0.74,
      termYears: 30,
      interestOnlyYears: 0,
    });
    const afdragsfri = beregnForloeb({
      ratePct: 4,
      bidragPct: 0.74,
      termYears: 30,
      interestOnlyYears: 10,
    });
    expect(afdragsfri.totalCostDKK).toBeGreaterThan(medAfdrag.totalCostDKK);
  });

  it("giver 31 punkter til diagrammet ved 30 års løbetid", () => {
    const r = beregnForloeb({
      ratePct: 3,
      bidragPct: 0.5,
      termYears: 30,
      interestOnlyYears: 0,
    });
    expect(r.points).toHaveLength(31);
    expect(r.points[0]).toEqual({ year: 0, balanceDKK: LOAN_PER_MILLION });
  });

  it("fordeler årets betalinger på renter, bidrag og afdrag", () => {
    const r = beregnForloeb({
      ratePct: 4,
      bidragPct: 0.74,
      termYears: 30,
      interestOnlyYears: 0,
    });
    const y1 = r.yearly[0];
    expect(y1.year).toBe(1);
    // Summen skal stemme med delene
    expect(y1.totalDKK).toBe(
      y1.interestDKK + y1.bidragDKK + y1.principalDKK
    );
    // Første år går langt det meste til renter
    expect(y1.interestDKK).toBeGreaterThan(y1.principalDKK);
    // Sidste år er det omvendt
    const last = r.yearly[r.yearly.length - 1];
    expect(last.principalDKK).toBeGreaterThan(last.interestDKK);
  });

  it("har intet afdrag i afdragsfrihedsperioden", () => {
    const r = beregnForloeb({
      ratePct: 4,
      bidragPct: 0.91,
      termYears: 30,
      interestOnlyYears: 10,
    });
    for (const y of r.yearly.slice(0, 10)) {
      expect(y.principalDKK).toBe(0);
    }
    expect(r.yearly[10].principalDKK).toBeGreaterThan(0);
  });

  it("summen af alle års betalinger svarer til totalen", () => {
    const r = beregnForloeb({
      ratePct: 3.5,
      bidragPct: 0.6,
      termYears: 30,
      interestOnlyYears: 0,
    });
    const sum = r.yearly.reduce((acc, y) => acc + y.totalDKK, 0);
    // Afrunding pr. år kan give nogle få kroners forskel
    expect(Math.abs(sum - r.totalPaidDKK)).toBeLessThan(60);
  });

  it("håndterer 0 % rente som lineært afdrag", () => {
    const r = beregnForloeb({
      ratePct: 0,
      bidragPct: 0,
      termYears: 10,
      interestOnlyYears: 0,
    });
    expect(r.firstPaymentDKK).toBe(Math.round(LOAN_PER_MILLION / 120));
    expect(r.totalCostDKK).toBe(0);
  });
});
