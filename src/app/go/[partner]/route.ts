import { NextResponse } from "next/server";
import { getPartner } from "@/lib/affiliates";

/**
 * Affiliate-redirect: GET /go/[partner]
 * Fx /go/forsikring → Findforsikring.dk via Partner-ads sporingslink.
 * Ukendt partner sender til forsiden frem for at vise en fejl.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ partner: string }> }
) {
  const { partner } = await context.params;
  const match = getPartner(partner);
  if (!match) {
    return NextResponse.redirect(new URL("/", _request.url), 302);
  }
  return NextResponse.redirect(match.url, 302);
}
