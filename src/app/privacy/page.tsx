import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Privatlivspolitik";
const description =
  "Privatlivspolitik for Boligklarhed: Læs hvordan vi behandler personoplysninger og cookies, når du bruger boligomkostningsberegneren på boligklarhed.dk.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/privacy") },
  ...socialMetadata({
    path: "/privacy",
    title,
    description,
  }),
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-6">Privatlivspolitik</h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <section>
            <h2 className="text-h3 text-text-primary">Formål</h2>
            <p>
              Denne privatlivspolitik beskriver, hvordan vi behandler dine data
              i forbindelse med brug af Boligomkostningsberegner. Vi ønsker at
              give dig et gennemsigtigt overblik over, hvilke oplysninger vi
              behandler, til hvilke formål, og hvilke rettigheder du har i
              forhold til dine personoplysninger, når du bruger
              boligklarhed.dk.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Hvilke data behandler vi?</h2>
            <p>
              Indtastede tal i beregneren behandles lokalt i din browser og
              gemmes ikke på vores server i MVP-versionen. Det betyder, at de
              konkrete beløb, du indtaster i boligomkostningsberegneren, kun er
              synlige for dig og forsvinder igen, når du lukker siden eller
              rydder din browsers data.
            </p>
            <p>
              Hvis du kontakter os via e-mail eller andre kanaler, kan vi
              behandle de oplysninger, du selv vælger at give os (f.eks. navn,
              kontaktoplysninger og indholdet af din henvendelse) med det formål
              at kunne besvare dig. Vi beder dig undgå at sende følsomme
              personoplysninger, medmindre det er strengt nødvendigt.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Statistik</h2>
            <p>
              Hvis du accepterer statistikcookies, indsamler vi aggregerede
              besøgsdata til at forbedre beregneren. Disse data er
              anonymiserede og bruges til at forstå, hvordan boligklarhed.dk
              bliver anvendt – f.eks. hvilke sider der bliver besøgt, og om
              brugere falder fra bestemte steder i forløbet.
            </p>
            <p>
              Statistikdata bruges udelukkende til at analysere brugen af
              hjemmesiden og til at udvikle nye funktioner og forbedre
              brugeroplevelsen. Vi forsøger så vidt muligt at begrænse
              indsamlingen til det, der er nødvendigt, og vi bruger ikke
              statistikdata til målrettet annoncering.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Retsgrundlag</h2>
            <p>
              Behandlingen af nødvendige tekniske data for at kunne vise
              hjemmesiden og levere boligomkostningsberegneren sker på baggrund
              af vores legitime interesse i at drive og vedligeholde tjenesten.
              Behandlingen af statistikdata, som ikke er strengt nødvendige,
              sker på baggrund af dit samtykke til statistikcookies.
            </p>
            <p>
              Hvis du kontakter os direkte, behandler vi dine oplysninger på
              baggrund af vores legitime interesse i at kunne besvare
              henvendelser og yde support i forhold til brugen af
              boligklarhed.dk.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Dine rettigheder</h2>
            <p>
              Du har ret til indsigt, berigtigelse, sletning og indsigelse. For
              at gøre brug af disse rettigheder, kontakt os på den angivne
              e-mail. Du kan også læse mere om databeskyttelse og dine rettigheder
              hos{" "}
              <a
                href="https://www.datatilsynet.dk/borger/hvad-er-dine-rettigheder/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Datatilsynet
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Kontakt</h2>
            <p>
              Ved spørgsmål til behandlingen af dine data, kontakt os gerne på
              [indsæt e-mail].
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Opbevaringsperiode og sletning
            </h2>
            <p>
              Vi opbevarer kun personoplysninger, så længe det er nødvendigt for
              at opfylde de formål, de er indsamlet til, eller så længe vi er
              forpligtet hertil i henhold til gældende lovgivning. Statistikdata
              opbevares typisk i en begrænset periode og i aggregeret form, så
              de ikke kan henføres til enkeltpersoner.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Ændringer i privatlivspolitikken
            </h2>
            <p>
              Denne privatlivspolitik kan blive opdateret, hvis vi ændrer
              funktionalitet på boligklarhed.dk, tager nye analyseværktøjer i
              brug eller hvis lovgivningen ændrer sig. Den seneste version vil
              altid være tilgængelig på denne side, og større ændringer vil så
              vidt muligt blive gjort tydelige for brugerne.
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
