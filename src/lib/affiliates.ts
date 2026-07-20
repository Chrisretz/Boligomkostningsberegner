/**
 * Register over affiliate-partnere.
 *
 * Links går altid gennem vores egen /go/[slug]-route, så vi kan
 * skifte partner ét sted, måle klik i GA4 og undgå at sprede
 * sporingslinks ud i indholdet.
 *
 * Alle links skal markeres rel="nofollow sponsored", og der skal stå
 * en synlig oplysning om kommission ved hvert link (markedsføringsloven).
 */

export interface AffiliatePartner {
  /** Sti-segment i /go/[slug] */
  slug: string;
  name: string;
  /** Sporingslink fra netværket */
  url: string;
  /** Netværk – til intern dokumentation */
  network: "partner-ads" | "adtraction" | "direkte";
}

export const AFFILIATE_PARTNERS: Record<string, AffiliatePartner> = {
  forsikring: {
    slug: "forsikring",
    name: "Findforsikring.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=57153&bannerid=60068",
    network: "partner-ads",
  },
  boligvurdering: {
    slug: "boligvurdering",
    name: "Valuea.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=57153&bannerid=71154",
    network: "partner-ads",
  },
};

export function getPartner(slug: string): AffiliatePartner | null {
  return AFFILIATE_PARTNERS[slug] ?? null;
}
