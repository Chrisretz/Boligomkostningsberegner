/**
 * Tests af parsingen af Totalkredits obligationsdata.
 *
 * Svarene er forkortede, men strukturen og værdierne er kopieret direkte
 * fra det rigtige API, så testene fanger det, der reelt kan gå galt:
 * ændrede felter, urealistiske tal og manglende data.
 */

import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { fetchLiveRates, __resetLastGoodCache } from "../liveRates";

const FAST = {
  groups: [
    {
      entries: [
        // Lukket for tilbud – skal ignoreres, selvom kursen er højest
        {
          name: "5% 2056 med afdrag",
          lifetime: "30 år",
          isOpenForOffer: false,
          effectiveRate: "4,68 %",
          priceRate: "104,52",
        },
        // Toneangivende: åben og højeste kurs
        {
          name: "4% 2056 med afdrag",
          lifetime: "30 år",
          isOpenForOffer: true,
          effectiveRate: "4,21 %",
          priceRate: "98,36",
        },
        {
          name: "3,5% 2056 med afdrag",
          lifetime: "30 år",
          isOpenForOffer: true,
          effectiveRate: "4,02 %",
          priceRate: "95,20",
        },
        {
          name: "4% 2056 med op til 10 års afdragsfrihed",
          lifetime: "30 år",
          isOpenForOffer: true,
          effectiveRate: "4,27 %",
          priceRate: "97,58",
        },
        // Plus-lån med 30 års afdragsfrihed skal ikke vælges
        {
          name: "4% 2056 med op til 30 års afdragsfrihed",
          lifetime: "30 år",
          isOpenForOffer: true,
          effectiveRate: "4,31 %",
          priceRate: "96,23",
        },
        // Kortere løbetid skal ikke med
        {
          name: "3,5% 2046 med afdrag",
          lifetime: "20 år",
          isOpenForOffer: true,
          effectiveRate: "3,94 %",
          priceRate: "97,10",
        },
      ],
    },
  ],
  lastUpdatedTimestamp: "2026-07-14T06:45:37.203",
};

const TILPASNING = {
  groups: [
    {
      entries: [
        { name: "F3 med afdrag", innerInterestGrossValue: "2,79%" },
        {
          name: "F3 med op til 10 års afdragsfrihed",
          innerInterestGrossValue: "2,77%",
        },
        { name: "F5 med afdrag", innerInterestGrossValue: "2,96%" },
        {
          name: "F5 med op til 10 års afdragsfrihed",
          innerInterestGrossValue: "2,94%",
        },
      ],
    },
  ],
  lastUpdatedTimestamp: "2026-07-13T07:50:16.95",
};

const VARIABEL = {
  groups: [
    {
      entries: [
        {
          name: "Aktuel rente 2,3892%, refinansiering 01-07-2029",
          expectedRate: "2,5452 %",
          priceRate: "100,43",
        },
      ],
    },
  ],
  lastUpdatedTimestamp: "2026-07-15T05:51:05.677",
};

function mockFetch(
  responses: Record<string, unknown | null>,
  ok = true
): void {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      const match = Object.entries(responses).find(([key]) =>
        url.includes(key)
      );
      if (!match || match[1] === null) return { ok: false } as Response;
      return {
        ok,
        json: async () => match[1],
      } as Response;
    })
  );
}

beforeEach(() => {
  __resetLastGoodCache();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchLiveRates", () => {
  it("vælger den toneangivende åbne obligation ved fast rente", async () => {
    mockFetch({
      "privat-udbetaling-af-laan-aktuelle-kurser-kunder": FAST,
      kontantrenter: TILPASNING,
      "af-variabel-laan": VARIABEL,
    });
    const rates = await fetchLiveRates();
    // 4 % 2056 er åben og har højeste kurs – ikke den lukkede 5 %
    expect(rates?.medAfdrag.fast).toBe(4.21);
    expect(rates?.afdragsfri.fast).toBe(4.27);
  });

  it("henter F3 og F5 med og uden afdragsfrihed", async () => {
    mockFetch({
      "privat-udbetaling-af-laan-aktuelle-kurser-kunder": FAST,
      kontantrenter: TILPASNING,
      "af-variabel-laan": VARIABEL,
    });
    const rates = await fetchLiveRates();
    expect(rates?.medAfdrag.f3f4).toBe(2.79);
    expect(rates?.afdragsfri.f3f4).toBe(2.77);
    expect(rates?.medAfdrag.renteMaxF5F10).toBe(2.96);
    expect(rates?.afdragsfri.renteMaxF5F10).toBe(2.94);
  });

  it("returnerer kursen på den toneangivende fastforrentede obligation", async () => {
    mockFetch({
      "privat-udbetaling-af-laan-aktuelle-kurser-kunder": FAST,
      kontantrenter: TILPASNING,
      "af-variabel-laan": VARIABEL,
    });
    const rates = await fetchLiveRates();
    // 4 % 2056 med afdrag, kurs 98,36; med afdragsfrihed 97,58
    expect(rates?.kursFast.medAfdrag).toBe(98.36);
    expect(rates?.kursFast.afdragsfri).toBe(97.58);
  });

  it("bruger dagens beregningsrente for F-kort", async () => {
    mockFetch({
      "privat-udbetaling-af-laan-aktuelle-kurser-kunder": FAST,
      kontantrenter: TILPASNING,
      "af-variabel-laan": VARIABEL,
    });
    const rates = await fetchLiveRates();
    expect(rates?.medAfdrag.fKort).toBeCloseTo(2.5452, 4);
    expect(rates?.afdragsfri.fKort).toBeCloseTo(2.5452, 4);
  });

  it("bruger ældste tidsstempel som opdateringsdato", async () => {
    mockFetch({
      "privat-udbetaling-af-laan-aktuelle-kurser-kunder": FAST,
      kontantrenter: TILPASNING,
      "af-variabel-laan": VARIABEL,
    });
    const rates = await fetchLiveRates();
    expect(rates?.updatedAt).toBe("2026-07-13T07:50:16.95");
  });

  it("returnerer null når alle kald fejler", async () => {
    mockFetch({ x: null });
    expect(await fetchLiveRates()).toBeNull();
  });

  it("kasserer urealistiske renter", async () => {
    mockFetch({
      "privat-udbetaling-af-laan-aktuelle-kurser-kunder": {
        groups: [
          {
            entries: [
              {
                name: "4% 2056 med afdrag",
                lifetime: "30 år",
                isOpenForOffer: true,
                effectiveRate: "421 %",
                priceRate: "98,36",
              },
            ],
          },
        ],
      },
      kontantrenter: TILPASNING,
      "af-variabel-laan": VARIABEL,
    });
    const rates = await fetchLiveRates();
    expect(rates?.medAfdrag.fast).toBeUndefined();
    // De øvrige lånetyper påvirkes ikke
    expect(rates?.medAfdrag.f3f4).toBe(2.79);
  });

  it("klarer at én af tre kilder er nede", async () => {
    mockFetch({
      "privat-udbetaling-af-laan-aktuelle-kurser-kunder": null,
      kontantrenter: TILPASNING,
      "af-variabel-laan": VARIABEL,
    });
    const rates = await fetchLiveRates();
    expect(rates?.medAfdrag.fast).toBeUndefined();
    expect(rates?.medAfdrag.f3f4).toBe(2.79);
  });

  it("bruger sidste vellykkede hentning hvis kilden falder ud", async () => {
    mockFetch({
      "privat-udbetaling-af-laan-aktuelle-kurser-kunder": FAST,
      kontantrenter: TILPASNING,
      "af-variabel-laan": VARIABEL,
    });
    const first = await fetchLiveRates();
    expect(first?.medAfdrag.f3f4).toBe(2.79);

    // Alle kilder fejler nu – men vi har stadig gårsdagens tal
    mockFetch({ x: null });
    const second = await fetchLiveRates();
    expect(second?.medAfdrag.f3f4).toBe(2.79);
  });
});
