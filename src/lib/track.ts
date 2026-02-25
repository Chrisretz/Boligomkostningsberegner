/**
 * Analytics wrapper – no-op hvis ingen consent / ingen provider
 * Bruges til cta_click, calc_submit, calc_result_view, consent_update
 */

export function trackCtaClick(payload: {
  ctaId: string;
  placement: string;
}): void {
  if (typeof window === "undefined") return;
  // TODO: Integrér med GA4 eller anden provider efter consent
  console.debug("[analytics] cta_click", payload);
}

export function trackCalcSubmit(payload: {
  purchasePriceBucket?: string;
  downPaymentPctBucket?: string;
  propertyType?: string;
  includeMortgageFee?: boolean;
}): void {
  if (typeof window === "undefined") return;
  console.debug("[analytics] calc_submit", payload);
}

export function trackCalcResultView(payload: {
  monthlyTotalBucket?: string;
  ratePct?: number;
}): void {
  if (typeof window === "undefined") return;
  console.debug("[analytics] calc_result_view", payload);
}

export function trackConsentUpdate(payload: { analytics: boolean }): void {
  if (typeof window === "undefined") return;
  console.debug("[analytics] consent_update", payload);
}
