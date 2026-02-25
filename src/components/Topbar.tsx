import Link from "next/link";

export function Topbar() {
  return (
    <header className="border-b border-border bg-brand-surface">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="text-h3 text-text-primary font-semibold">
          Boligomkostningsberegner
        </Link>
        <Link
          href="/beregn"
          className="px-4 py-2 text-body font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primaryHover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
        >
          Beregn
        </Link>
      </div>
    </header>
  );
}
