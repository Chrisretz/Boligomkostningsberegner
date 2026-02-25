import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privatlivspolitik | Boligomkostningsberegner",
  description: "Privatlivspolitik for Boligomkostningsberegner.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-6">Privatlivspolitik</h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-4">
          <section>
            <h2 className="text-h3 text-text-primary">Formål</h2>
            <p>
              Denne privatlivspolitik beskriver, hvordan vi behandler dine data
              i forbindelse med brug af Boligomkostningsberegner.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Hvilke data</h2>
            <p>
              Indtastede tal i beregneren behandles lokalt i din browser og
              gemmes ikke på vores server i MVP-versionen.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Statistik</h2>
            <p>
              Hvis du accepterer statistikcookies, indsamler vi aggregerede
              besøgsdata til at forbedre beregneren. Disse data er anonymiserede.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Dine rettigheder</h2>
            <p>
              Du har ret til indsigt, berigtigelse, sletning og indsigelse. For
              at gøre brug af disse rettigheder, kontakt os på den angivne
              e-mail.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Kontakt</h2>
            <p>
              Ved spørgsmål til behandlingen af dine data, kontakt os gerne på
              [indsæt e-mail].
            </p>
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
