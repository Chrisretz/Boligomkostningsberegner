export const GEARING_DEFAULT = 4;
export const GEARING_SENSITIVITY = [3.5, 4, 4.5, 5] as const;
/**
 * Andel af købsprisen der antages finansieret med lån (80 % realkredit +
 * 15 % banklån = 95 %; mindst 5 % egen udbetaling jf. dansk standard).
 * Købspris estimeres som maks. boliglån / FINANCING_SHARE.
 */
export const FINANCING_SHARE = 0.95;

export const LOAN_CALCULATOR_ID = "hvad-kan-jeg-koebe-bolig-for" as const;
export const LOAN_LEAD_CONSENT_VERSION = "v2026-07-19";
