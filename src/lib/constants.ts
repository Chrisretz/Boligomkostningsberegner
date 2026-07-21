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

/**
 * Etableringsomkostninger ved optagelse af realkreditlån.
 * Kilde: Totalkredits prisblad for privatkunder, gældende pr. 1. juli 2026.
 * Vejledende – låneformidler (pengeinstitut) kan opkræve yderligere gebyrer.
 */
export const REALKREDIT_FEES = {
  /** Lånesagsgebyr til realkreditinstituttet (op til) */
  LOAN_CASE_FEE_DKK: 4000,
  /** Afregningsprovision: % af kursværdien, minimum 150 kr */
  SETTLEMENT_RATE: 0.0015,
  SETTLEMENT_MIN_DKK: 150,
  /** Kursfradrag ved udbetaling (kurspoint) – trækkes fra obligationskursen */
  PRICE_DEDUCTION_POINTS: 0.2,
  RATES_VERIFIED: "juli 2026",
} as const;

/**
 * Ejendomsskat (boligskattereformen, satser for 2026).
 * Kilder: Skatteministeriet / Vurderingsportalen. Verificér årligt.
 */
export const PROPERTY_TAX = {
  /** Ejendomsværdiskat: 0,51 % af beskatningsgrundlag op til progressionsgrænsen */
  EVS_RATE_LOW: 0.0051,
  /** 1,4 % af beskatningsgrundlag over progressionsgrænsen */
  EVS_RATE_HIGH: 0.014,
  /** Progressionsgrænse 2026 (beskatningsgrundlag) */
  EVS_PROGRESSION_LIMIT_DKK: 9_007_000,
  /** Beskatningsgrundlag = 80 % af vurderingen (forsigtighedsnedslag) */
  VALUATION_BASE_FACTOR: 0.8,
  /** Gennemsnitlig grundskyldspromille i Danmark efter reformen (vejledende) */
  GRUNDSKYLD_AVG_PROMILLE: 7.4,
  /** Antaget grundværdi-andel af købspris (vejledende skøn til estimat) */
  LAND_SHARE_HOUSE: 0.25,
  LAND_SHARE_APT: 0.1,
  /** Satser senest verificeret */
  RATES_VERIFIED: "juli 2026",
} as const;

export const DEFAULTS = {
  TERM_YEARS: 30,
  INTEREST_RATE_PCT: 4.0,
  /** Vejledende bidragssats på realkreditlån (% pr. år af restgæld) ved ca. 80 % belåning */
  BIDRAG_RATE_PCT: 0.75,
  /** Hus: 1,5% af købspris pr. år (antagelse) */
  MAINT_HOUSE_RATE: 0.015,
  /** Lejlighed: 1,0% af købspris pr. år (antagelse) */
  MAINT_APT_RATE: 0.01,
  /** Gennemsnitlig elpris inkl. tariffer (vejledende) – bruges til el-estimat */
  EL_PRICE_KR_PER_KWH: 2.5,
  CTA_ID: "loan_offers_v1",
  REDIRECT_ROUTE: "/go/loan",
} as const;
