/**
 * Estimat af årligt elforbrug (kWh) efter boligtype og antal personer.
 * Baseret på Energistyrelsen/EWII (gennemsnitligt forbrug) og elberegner.dk.
 *
 * Kilder:
 * - https://www.ewii.dk/privat/el/elforbrug-husstand/
 * - https://elberegner.dk/guides/mit-elforbrug/
 *
 * Tal svarer til "normalt" forbrug (ikke lavt/højt). Elvarme og elbil er ikke inkluderet.
 */

import type { PropertyType, HouseholdSize } from "./types";

export type { HouseholdSize };

/**
 * Gennemsnitligt årligt elforbrug (kWh) – lejlighed ca. 80 m², hus ca. 160 m².
 * Energistyrelsen: familie 2+2 typisk 4.500–5.000 kWh; 1 person ca. 1.600 kWh.
 */
const KWH_PER_YEAR: Record<PropertyType, Record<HouseholdSize, number>> = {
  apartment: {
    1: 1_600,
    2: 2_200,
    3: 2_700,
    4: 3_200,
    5: 3_700, // 5+ ekstrapoleret
  },
  house: {
    1: 2_800,
    2: 3_500,
    3: 4_200,
    4: 4_800,
    5: 5_500, // 5+ ekstrapoleret
  },
};

/**
 * Returnerer estimeret årligt elforbrug i kWh for given boligtype og husstandsstørrelse.
 */
export function getEstimatedYearlyKWh(
  propertyType: PropertyType,
  householdSize: HouseholdSize
): number {
  return KWH_PER_YEAR[propertyType][householdSize];
}

/**
 * Beregner estimeret månedlig eludgift i DKK.
 * @param propertyType – hus eller lejlighed
 * @param householdSize – antal personer (1–5, 5 = 5+)
 * @param pricePerKWh – pris inkl. transport m.m. (default fra constants)
 */
export function estimateMonthlyElDKK(
  propertyType: PropertyType,
  householdSize: HouseholdSize,
  pricePerKWh: number
): number {
  const yearlyKWh = getEstimatedYearlyKWh(propertyType, householdSize);
  return Math.round((yearlyKWh / 12) * pricePerKWh);
}
