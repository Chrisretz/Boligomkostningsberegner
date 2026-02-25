/**
 * Konstanter for boligomkostningsberegner – jf. Skattestyrelsen og PRD
 * Hold opdateret før launch.
 */

export const CONSTANTS = {
  /** Tinglysningsafgift – ejerforhold (skøde) */
  DEED_FIXED_DKK: 1850,
  DEED_RATE: 0.006, // 0,6% af afgiftsgrundlag

  /** Tinglysningsafgift – pant i fast ejendom og andelsboliger */
  MORTGAGE_FIXED_DKK: 1825,
  MORTGAGE_RATE: 0.0125, // 1,25% af pantsikret beløb
} as const;

export const DEFAULTS = {
  TERM_YEARS: 30,
  INTEREST_RATE_PCT: 4.0,
  /** Hus: 1,5% af købspris pr. år (antagelse) */
  MAINT_HOUSE_RATE: 0.015,
  /** Lejlighed: 1,0% af købspris pr. år (antagelse) */
  MAINT_APT_RATE: 0.01,
  CTA_ID: "loan_offers_v1",
  REDIRECT_ROUTE: "/go/loan",
} as const;
