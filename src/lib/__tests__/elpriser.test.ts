import { describe, it, expect } from "vitest";
import { elprisEstimatKr, ELPRIS_TILLAEG } from "../elpriser";

describe("elprisEstimatKr", () => {
  it("lægger transport, afgift og moms oveni spotprisen", () => {
    const spot = 0.69;
    const forventet =
      Math.round(
        (spot + ELPRIS_TILLAEG.transportKr + ELPRIS_TILLAEG.elafgiftKr) *
          ELPRIS_TILLAEG.momsFactor *
          100
      ) / 100;
    expect(elprisEstimatKr(spot)).toBe(forventet);
  });

  it("giver en realistisk samlet pris omkring 2,5 kr/kWh ved normal spotpris", () => {
    const est = elprisEstimatKr(0.69);
    expect(est).toBeGreaterThan(2);
    expect(est).toBeLessThan(3);
  });

  it("er stadig positiv ved negativ spotpris, fordi afgifter dominerer", () => {
    // Negative spotpriser sker ved meget vind og lavt forbrug
    expect(elprisEstimatKr(-0.1)).toBeGreaterThan(0);
  });

  it("stiger monotont med spotprisen", () => {
    expect(elprisEstimatKr(1.0)).toBeGreaterThan(elprisEstimatKr(0.5));
  });
});
