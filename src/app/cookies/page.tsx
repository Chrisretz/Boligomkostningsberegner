import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettings } from "@/components/CookieSettings";
import { canonicalUrl } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Cookies";
const description =
  "Cookiepolitik for Boligklarhed: Få overblik over nødvendige cookies og statistikcookies, og se hvordan du kan ændre dine cookie-indstillinger.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/cookies") },
  ...socialMetadata({
    path: "/cookies",
    title,
    description,
  }),
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-6">Cookies</h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <section>
            <h2 className="text-h3 text-text-primary">Hvad er cookies?</h2>
            <p>
              Cookies er små tekstfiler, som gemmes på din computer, mobil eller
              tablet, når du besøger en hjemmeside. De bruges typisk til at få
              siden til at fungere, huske dine indstillinger, samle statistik og
              tilpasse indhold. På boligklarhed.dk bruger vi cookies på et
              begrænset niveau og uden markedsføringstracking – formålet er
              primært at sikre, at boligomkostningsberegneren virker stabilt og
              at vi kan forstå, hvordan den bliver brugt, så vi kan forbedre den
              over tid.
            </p>
            <p>
              Nogle cookies er nødvendige for, at hjemmesiden teknisk kan
              fungere, mens andre er valgfrie og kræver dit samtykke. Du kan
              til enhver tid ændre dit samtykke via cookie-indstillingerne
              nedenfor. Hvis du vælger kun at acceptere de nødvendige cookies,
              kan du stadig bruge beregneren, men vi får mindre statistik om
              brugen af sitet.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Kategorier</h2>
            <p>
              Vi bruger teknisk nødvendige cookies for at siden fungerer korrekt.
              Disse cookies sørger f.eks. for, at dine valg i cookie-banneret
              huskes, at siden vises sikkert, og at grundlæggende funktioner
              virker. Nødvendige cookies indeholder ikke personlige oplysninger,
              som kan identificere dig direkte, og de kan ikke fravælges, da
              hjemmesiden ellers ikke vil fungere som tiltænkt.
            </p>
            <p>
              Med dit samtykke bruger vi statistikcookies til at forbedre
              beregneren. Statistikcookies hjælper os med at forstå, hvilke
              sider der bliver besøgt, hvor ofte værktøjet bruges, og om
              der opstår fejl i brugerrejsen. Dataene samles i anonymiseret
              form, så vi ikke kan se, hvilke beregninger der tilhører dig som
              enkeltperson. Du kan til enhver tid ændre dit valg nedenfor.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Hvor længe gemmes cookies?</h2>
            <p>
              Cookies har en levetid, som varierer afhængigt af formålet. Nogle
              cookies slettes automatisk, når du lukker din browser
              (sessionscookies), mens andre kan blive liggende i en længere
              periode (persistente cookies). Vi tilstræber at bruge så korte
              levetider som muligt, særligt for statistikcookies, så vi kun
              gemmer data så længe, det er nødvendigt for at forstå brugen af
              boligomkostningsberegneren og forbedre oplevelsen.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Sådan ændrer eller sletter du cookies
            </h2>
            <p>
              Du kan til enhver tid ændre dit samtykke til cookies via
              indstillingerne her på siden. Derudover kan du i din browser
              slette eksisterende cookies eller blokere for, at der gemmes nye.
              Fremgangsmåden afhænger af, hvilken browser du bruger (f.eks.
              Chrome, Safari, Edge eller Firefox). I de fleste browsere finder
              du indstillingerne under &quot;Privatliv&quot;, &quot;Sikkerhed&quot;
              eller &quot;Website-data&quot;.
            </p>
            <p>
              Vær opmærksom på, at hvis du sletter eller blokerer cookies, kan
              det påvirke funktionaliteten på boligklarhed.dk og andre
              hjemmesider. Nogle funktioner vil muligvis ikke fungere som
              forventet, og du kan opleve at skulle acceptere cookies igen ved
              næste besøg.
            </p>
            <p>
              Regler for brug af cookies på hjemmesider er beskrevet nærmere hos{" "}
              <a
                href="https://www.datatilsynet.dk/regler-og-vejledning/cookies-og-lignende-teknologier"
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
