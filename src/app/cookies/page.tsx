import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettings } from "@/components/CookieSettings";

export const metadata: Metadata = {
  title: "Cookies | Boligomkostningsberegner",
  description: "Information om cookies på Boligomkostningsberegner.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-6">Cookies</h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-4">
          <section>
            <h2 className="text-h3 text-text-primary">Kategorier</h2>
            <p>
              Vi bruger teknisk nødvendige cookies for at siden fungerer korrekt.
              Disse kan ikke deaktiveres.
            </p>
            <p>
              Med dit samtykke bruger vi statistikcookies til at forbedre
              beregneren. Du kan til enhver tid ændre dit valg nedenfor.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Cookie-indstillinger</h2>
            <CookieSettings />
          </section>
        </div>

        <p className="mt-8">
          <Link
            href="/"
            className="text-body text-brand-primary hover:underline"
          >
            Tilbage til forsiden
          </Link>
        </p>
      </div>
    </main>
  );
}
