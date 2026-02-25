import { NextRequest, NextResponse } from "next/server";

/**
 * Affiliate redirect – jf. PRD
 * GET /go/loan?src=beregn&variant=v1&placement=result_top
 * Redirecter til AFFILIATE_BASE_URL med UTM-parametre
 */
export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get("src") ?? "beregn";
  const variant = searchParams.get("variant") ?? "v1";
  const placement = searchParams.get("placement") ?? "result_top";

  const baseUrl =
    process.env.AFFILIATE_BASE_URL || "https://example.com/loan-offers";
  const campaign = process.env.AFFILIATE_CAMPAIGN || "tco_mvp";

  const utmParams = new URLSearchParams({
    utm_source: "boligomkostningsberegner",
    utm_medium: "web",
    utm_campaign: campaign,
    utm_content: `${src}_${variant}_${placement}`,
  });

  const redirectUrl = baseUrl.includes("?")
    ? `${baseUrl}&${utmParams.toString()}`
    : `${baseUrl}?${utmParams.toString()}`;

  return NextResponse.redirect(redirectUrl, 302);
}
