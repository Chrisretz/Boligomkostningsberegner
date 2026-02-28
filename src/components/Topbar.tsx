import Link from "next/link";

export function Topbar() {
  return (
    <header className="border-b border-border bg-brand-surface">
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="text-h3 text-text-primary font-semibold shrink-0"
          >
            Boligomkostningsberegner
          </Link>
          <nav className="flex items-center gap-4 md:gap-6 flex-wrap">
            <Link
              href="/"
              className="text-body font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Forside
            </Link>
            <Link
              href="/artikler"
              className="text-body font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Artikler
            </Link>
            <Link
              href="/beregn"
              className="px-4 py-2 text-body font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primaryHover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
            >
              Beregn
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
