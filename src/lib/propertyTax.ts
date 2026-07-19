/**
 * Vejledende estimat af ejendomsskat (ejendomsværdiskat + grundskyld)
 * ud fra købspris. Satser for 2026 – se PROPERTY_TAX i constants.ts.
 *
 * Antagelser (bevidst forenklede, markeres som vejledende i UI):
 * - Ejendomsværdien antages at svare til købsprisen.
 * - Beskatningsgrundlag = 80 % af værdien (forsigtighedsnedslag).
 * - Grundværdien skønnes som en fast andel af købsprisen (hus 25 %, lejlighed 10 %).
 * - Grundskyld beregnes med landsgennemsnitlig promille (7,4 ‰); den faktiske
 *   promille afhænger af kommunen (ca. 3-18 ‰).
 * - Skatterabat for eksisterende ejere er ikke relevant ved nykøb og medregnes ikke.
 */

import { PROPERTY_TAX } from "./constants";
import type { PropertyType } from "./types";

export interface PropertyTaxEstimate {
  /** Ejendomsværdiskat pr. år */
  evsAnnualDKK: number;
  /** Grundskyld pr. år (vejledende, landsgennemsnitlig promille) */
  grundskyldAnnualDKK: number;
  totalAnnualDKK: number;
  totalMonthlyDKK: number;
}

export function estimatePropertyTax(
  purchasePriceDKK: number,
  propertyType: PropertyType
): PropertyTaxEstimate {
  if (purchasePriceDKK <= 0) {
    return {
      evsAnnualDKK: 0,
      grundskyldAnnualDKK: 0,
      totalAnnualDKK: 0,
      totalMonthlyDKK: 0,
    };
  }

  // Ejendomsværdiskat af beskatningsgrundlaget (80 % af værdien)
  const evsBase = purchasePriceDKK * PROPERTY_TAX.VALUATION_BASE_FACTOR;
  const lowPart = Math.min(evsBase, PROPERTY_TAX.EVS_PROGRESSION_LIMIT_DKK);
  const highPart = Math.max(evsBase - PROPERTY_TAX.EVS_PROGRESSION_LIMIT_DKK, 0);
  const evsAnnual =
    lowPart * PROPERTY_TAX.EVS_RATE_LOW + highPart * PROPERTY_TAX.EVS_RATE_HIGH;

  // Grundskyld af 80 % af skønnet grundværdi
  const landShare =
    propertyType === "house"
      ? PROPERTY_TAX.LAND_SHARE_HOUSE
      : PROPERTY_TAX.LAND_SHARE_APT;
  const grundskyldBase =
    purchasePriceDKK * landShare * PROPERTY_TAX.VALUATION_BASE_FACTOR;
  const grundskyldAnnual =
    grundskyldBase * (PROPERTY_TAX.GRUNDSKYLD_AVG_PROMILLE / 1000);

  const totalAnnual = evsAnnual + grundskyldAnnual;
  return {
    evsAnnualDKK: Math.round(evsAnnual),
    grundskyldAnnualDKK: Math.round(grundskyldAnnual),
    totalAnnualDKK: Math.round(totalAnnual),
    totalMonthlyDKK: Math.round(totalAnnual / 12),
  };
}
