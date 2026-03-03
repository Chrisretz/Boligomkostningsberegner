import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SITE_URL = "https://www.boligklarhed.dk";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get("host") ?? "";

  // 301: non-www -> www (kun i production for boligklarhed.dk)
  if (host === "boligklarhed.dk") {
    const redirect = new URL(url.pathname + url.search, SITE_URL);
    return NextResponse.redirect(redirect, 301);
  }

  return NextResponse.next();
}
