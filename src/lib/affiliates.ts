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

/**
 * Bygger et Partner-ads-link, der lander på en konkret underside hos
 * annoncøren i stedet for forsiden. Målsiden skal URL-encodes.
 */
function partnerAdsDeeplink(bannerId: number, targetUrl: string): string {
  return `https://www.partner-ads.com/dk/klikbanner.php?partnerid=57153&bannerid=${bannerId}&htmlurl=${encodeURIComponent(targetUrl)}`;
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
  // Deeplinket til siden om testamente for samlevende – langt bedre
  // konvertering end forsiden, da læseren netop har læst om arv.
  "testamente-samlevende": {
    slug: "testamente-samlevende",
    name: "Jura-Docs",
    url: partnerAdsDeeplink(
      99220,
      "https://jura-docs.dk/testamente/testamente-samlevende/"
    ),
    network: "partner-ads",
  },
  samejeoverenskomst: {
    slug: "samejeoverenskomst",
    name: "Jura-Docs",
    url: partnerAdsDeeplink(99220, "https://jura-docs.dk/samejeoverenkomst/"),
    network: "partner-ads",
  },
};

export function getPartner(slug: string): AffiliatePartner | null {
  return AFFILIATE_PARTNERS[slug] ?? null;
}
