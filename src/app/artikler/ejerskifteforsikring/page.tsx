import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvad er en ejerskifteforsikring? | Boligomkostningsberegner",
  description:
    "En ejerskifteforsikring dækker skjulte fejl og mangler ved boligkøb. Læs mere om dækning, pris og om den er nødvendig for dig.",
};

export default function EjerskifteforsikringPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <p className="mb-4">
          <Link
            href="/artikler"
            className="text-body text-brand-primary hover:underline"
          >
            ← Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-8">
          Hvad er en ejerskifteforsikring?
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            En ejerskifteforsikring er en forsikring, der dækker skjulte fejl og
            mangler ved en bolig, som ikke fremgår af tilstandsrapporten eller
            elinstallationsrapporten på købstidspunktet. Forsikringen beskytter
            køberen mod uforudsete udgifter til skader, der allerede var til
            stede ved overtagelsen, men som først opdages senere.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvornår bruges en ejerskifteforsikring?
            </h2>
            <p>
              En ejerskifteforsikring tegnes typisk i forbindelse med køb af hus
              eller ejerbolig. Den er frivillig for køber, men sælger skal
              tilbyde at betale halvdelen af præmien, hvis sælger ønsker at
              blive fritaget for det 10-årige ansvar for skjulte fejl og mangler.
              Forsikringen dækker normalt i 5 eller 10 år, afhængigt af den
              valgte løsning.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad dækker ejerskifteforsikringen?
            </h2>
            <p>Ejerskifteforsikringen dækker typisk:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Skjulte konstruktionsfejl</li>
              <li>Ulovlige installationer</li>
              <li>Skader på tag, fundament og bærende konstruktioner</li>
              <li>Forhold, der ikke er nævnt i tilstandsrapporten</li>
            </ul>
            <p>
              Den dækker ikke almindeligt slid, forhold der er nævnt i
              rapporterne, eller problemer som køber kendte til før købet.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad koster en ejerskifteforsikring?
            </h2>
            <p>
              Prisen afhænger af boligens type, alder og forsikringsselskab.
              Typisk ligger prisen mellem 10.000 og 30.000 kr. for en 5-årig
              dækning. En 10-årig udvidet dækning kan koste betydeligt mere.
              Sælger betaler som udgangspunkt halvdelen af præmien, hvis køber
              vælger at tegne forsikringen.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Er en ejerskifteforsikring nødvendig?
            </h2>
            <p>
              Det afhænger af boligens stand og købers risikovillighed. I ældre
              boliger kan risikoen for skjulte fejl være større, hvilket gør
              ejerskifteforsikringen mere relevant. For mange boligkøbere giver
              forsikringen økonomisk tryghed, da uforudsete reparationer kan være
              meget omkostningstunge.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              En ejerskifteforsikring beskytter køberen mod skjulte fejl og
              mangler, der ikke fremgår af tilstandsrapporten ved købet. Den er
              frivillig, men sælger skal betale halvdelen, hvis sælger ønsker at
              blive fritaget for sit ansvar. For mange boligkøbere er den en
              vigtig del af den samlede risikovurdering ved boligkøb.
            </p>
          </section>
        </div>

        <p className="mt-8">
          <Link
            href="/artikler"
            className="text-body text-brand-primary hover:underline"
          >
            Se alle artikler
          </Link>
        </p>
      </div>
    </main>
  );
}
