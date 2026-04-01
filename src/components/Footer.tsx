import Link from "next/link";
import { PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-brand-primary text-white">
      <div className="container mx-auto py-14 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-3">
            <div className="text-small font-semibold text-white/90">
              Nyttige links
            </div>
            <nav className="space-y-2">
              <Link
                href="/privacy"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Privatlivspolitik
              </Link>
              <Link
                href="/cookies"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Cookies
              </Link>
              <Link
                href="/disclaimer"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Ansvarsfraskrivelse
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-small font-semibold text-white/90">
              Lær og forstå
            </div>
            <nav className="space-y-2">
              <Link
                href="/artikler"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Artikler
              </Link>
              <Link
                href="/boligbegreber"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Boligbegreber
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-small font-semibold text-white/90">
              Beregn
            </div>
            <nav className="space-y-2">
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Boligomkostningsberegner
              </Link>
              <Link
                href="/beregnere"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Alle beregnere
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-small font-semibold text-white/90">Om</div>
            <nav className="space-y-2">
              <Link
                href="/om-os"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Om os
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-small text-white/60">
            Vi kan modtage kommission fra partnere. Det koster ikke ekstra for
            dig.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link
              href="/privacy"
              className="text-small text-white/60 hover:text-white transition-colors"
            >
              Privatliv
            </Link>
            <Link
              href="/cookies"
              className="text-small text-white/60 hover:text-white transition-colors"
            >
              Cookies
            </Link>
            <Link
              href="/disclaimer"
              className="text-small text-white/60 hover:text-white transition-colors"
            >
              Ansvarsfraskrivelse
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
