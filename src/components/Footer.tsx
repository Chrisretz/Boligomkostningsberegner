import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-brand-surface mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/privacy"
              className="text-body text-text-secondary hover:text-text-primary"
            >
              Privatlivspolitik
            </Link>
            <Link
              href="/cookies"
              className="text-body text-text-secondary hover:text-text-primary"
            >
              Cookies
            </Link>
            <Link
              href="/disclaimer"
              className="text-body text-text-secondary hover:text-text-primary"
            >
              Ansvarsfraskrivelse
            </Link>
            <Link
              href="/artikler"
              className="text-body text-text-secondary hover:text-text-primary"
            >
              Artikler
            </Link>
            <Link
              href="/beregn"
              className="text-body text-text-secondary hover:text-text-primary"
            >
              Beregn
            </Link>
          </nav>
          <p className="text-small text-text-muted">
            Vi kan modtage kommission fra partnere. Det koster ikke ekstra for
            dig.
          </p>
        </div>
      </div>
    </footer>
  );
}
