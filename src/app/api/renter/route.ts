import { NextResponse } from "next/server";
import { fetchLiveRates } from "@/lib/liveRates";
import { RATE_BY_LOAN_TYPE, RATE_SOURCE } from "@/lib/renter";

export const runtime = "nodejs";
/** Genvalideres én gang i døgnet; kurserne opdateres kun få gange dagligt. */
export const revalidate = 86_400;

/**
 * GET /api/renter
 *
 * Returnerer vejledende renteniveauer pr. lånetype. Henter aktuelle tal
 * fra Totalkredits offentlige obligationsdata og falder tilbage til de
 * statiske niveauer i renter.ts, hvis kilden er nede eller svarer med
 * noget uventet. Klienten skal derfor aldrig håndtere en fejl.
 */
export async function GET() {
  const live = await fetchLiveRates();

  if (!live) {
    return NextResponse.json(
      {
        source: "static" as const,
        updatedAt: null,
        updatedLabel: RATE_SOURCE.updated,
        medAfdrag: RATE_BY_LOAN_TYPE,
        afdragsfri: RATE_BY_LOAN_TYPE,
        kursFast: { medAfdrag: null, afdragsfri: null },
      },
      { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" } }
    );
  }

  // Statiske niveauer udfylder de lånetyper, kilden ikke dækker (fx F1-F2)
  return NextResponse.json(
    {
      source: "live" as const,
      updatedAt: live.updatedAt,
      updatedLabel: null,
      medAfdrag: { ...RATE_BY_LOAN_TYPE, ...live.medAfdrag },
      afdragsfri: { ...RATE_BY_LOAN_TYPE, ...live.afdragsfri },
      kursFast: live.kursFast,
    },
    { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" } }
  );
}
