import Link from "next/link";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { RealkreditBeregner } from "@/components/RealkreditBeregner";
import { BOLIGLAAN_BEREGNER_FAQ } from "@/lib/artikel-faq/boliglaan-beregner";
import {
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { getFaqPageSchema } from "@/lib/structured-data";

const faqSchema = getFaqPageSchema([...BOLIGLAAN_BEREGNER_FAQ]);

export default function BoliglaanBeregnerPage() {
  return (
    <main className="min-h-screen py-12 px-4 overflow-x-clip pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto max-w-4xl min-w-0">
        <header className="mb-8">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand-accent mb-2">
            Realkreditlån beregner
          </p>
          <h1 className="text-h1 text-text-primary mb-3 break-words">
            Beregn dit realkreditlån
          </h1>
          <p className="text-body text-text-secondary leading-relaxed max-w-2xl">
            Vælg lånetype og se med det samme, hvad lånet koster om måneden, hvad
            det koster at etablere, og hvordan gælden afvikles over tid. Renterne
            hentes fra aktuelle obligationskurser, og bidragssatsen beregnes ud
            fra din belåningsgrad. Alt er vejledende og gratis – uden login.
          </p>
        </header>

        <RealkreditBeregner />

        <section className="mt-14 max-w-2xl" aria-labelledby="forstaa-heading">
          <h2 id="forstaa-heading" className="text-h2 text-text-primary mb-4">
            Sådan læser du beregningen
          </h2>
          <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-4">
            <p>
              Et <strong className="text-text-primary">realkreditlån</strong>{" "}
              består af tre løbende dele: renter, afdrag og bidrag. Renter og
              afdrag udgør tilsammen din annuitet, som ved fast rente er den
              samme hele vejen. Bidraget er realkreditinstituttets løbende
              gebyr og beregnes af restgælden, så det falder over tid.
            </p>
            <p>
              <strong className="text-text-primary">Lånetypen</strong> afgør,
              hvor ofte renten kan ændre sig. Et fastforrentet lån har samme
              rente i hele løbetiden, mens tilpasningslån som F3 og F5 får ny
              rente med faste mellemrum, og F-kort følger markedet tættest. Jo
              kortere rentebinding, jo lavere er startrenten typisk, men jo
              større er usikkerheden.{" "}
              <Link
                href="/artikler/sammenligning-af-laanetyper"
                className="text-brand-primary font-medium hover:underline"
              >
                Læs mere om lånetyperne og prøv den interaktive sammenligning
              </Link>
              .
            </p>
            <p>
              <strong className="text-text-primary">Afdragsfrihed</strong>{" "}
              sænker ydelsen i en periode, men gælden står stille, og ydelsen
              stiger, når friheden udløber, fordi det samme beløb skal afdrages
              over færre år. Det gør lånet dyrere samlet set.
            </p>
            <p>
              <strong className="text-text-primary">
                Etableringsomkostningerne
              </strong>{" "}
              er de gebyrer, du betaler for at oprette lånet: tinglysning af
              pant, lånesagsgebyr og afregningsprovision. Ved fastforrentede lån
              kan der desuden være et kurstab, hvis obligationskursen er under
              100.
            </p>
          </div>
        </section>

        <section
          className="mt-12 max-w-2xl"
          id="faq"
          aria-labelledby="faq-heading"
        >
          <h2 id="faq-heading" className="text-h2 text-text-primary mb-4">
            Ofte stillede spørgsmål om realkreditlån
          </h2>
          <ul className="not-prose space-y-3">
            {BOLIGLAAN_BEREGNER_FAQ.map((item) => (
              <li key={item.question}>
                <details className="group rounded-md border border-border bg-brand-surface px-4 py-3 shadow-soft">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <span className="text-body font-semibold text-text-primary">
                      {item.question}
                    </span>
                    <span className="text-xl text-text-muted group-open:hidden">
                      +
                    </span>
                    <span className="text-xl text-text-muted hidden group-open:inline">
                      −
                    </span>
                  </summary>
                  <p className="mt-2 text-body text-text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10">
          <Link
            href="/beregnere"
            className="text-body text-brand-primary hover:underline"
          >
            ← Alle beregnere
          </Link>
          {" · "}
          <Link
            href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
            className="text-body text-brand-primary hover:underline"
          >
            Hvad kan jeg købe bolig for?
          </Link>
          {" · "}
          <Link
            href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
            className="text-body text-brand-primary hover:underline"
          >
            Boligomkostningsberegner
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}
