import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hvad er en ejerskifteforsikring?",
  description:
    "En ejerskifteforsikring dækker skjulte fejl og mangler ved boligkøb. Læs mere om dækning, pris og om den er nødvendig for dig.",
  alternates: { canonical: canonicalUrl("/artikler/ejerskifteforsikring") },
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
            stede ved overtagelsen, men som først opdages senere. Kort sagt:
            Den hjælper dig som boligkøber med at undgå, at et uheldigt fund i
            huset bliver til en økonomisk katastrofe.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvornår bruges en ejerskifteforsikring?
            </h2>
            <p>
              En ejerskifteforsikring tegnes typisk i forbindelse med køb af hus
              eller ejerbolig. Den er frivillig for køber, men sælger skal
              tilbyde at betale halvdelen af præmien, hvis sælger ønsker at
              blive fritaget for det 10-årige ansvar for skjulte fejl og
              mangler. Forsikringen dækker normalt i 5 eller 10 år, afhængigt af
              den valgte løsning og om du vælger en basis- eller udvidet
              dækning. Beslutningen skal som regel træffes omkring
              overtagelsesdagen, så det er en god idé at indhente tilbud i god
              tid, når du nærmer dig køb af bolig.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad dækker ejerskifteforsikringen?
            </h2>
            <p>
              Ejerskifteforsikringen dækker typisk skader og fejl, som var
              til stede ved købet, men som du med rimelighed ikke kunne opdage.
              Det kan f.eks. være:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Skjulte konstruktionsfejl i vægge, tag eller fundament</li>
              <li>Ulovlige eller fejlbehæftede el- og VVS-installationer</li>
              <li>Skader på tag, fundament og bærende konstruktioner</li>
              <li>
                Forhold, der burde have været nævnt i tilstands- eller
                elinstallationsrapporten, men som mangler
              </li>
            </ul>
            <p>
              Til gengæld dækker forsikringen som udgangspunkt ikke almindeligt
              slid og ælde, kosmetiske forhold, mangler ved forhold du selv
              kender til før købet, eller forhold som tydeligt fremgår af
              rapporterne. Det er derfor vigtigt at læse
              forsikringsbetingelserne grundigt igennem og være opmærksom på
              eventuelle undtagelser og maksimaldækninger.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad koster en ejerskifteforsikring?
            </h2>
            <p>
              Prisen afhænger af boligens type, alder, stand og
              forsikringsselskab. Typisk ligger prisen mellem 10.000 og 30.000
              kr. for en 5-årig basisdækning. En 10-årig udvidet dækning kan
              koste betydeligt mere, men giver til gengæld længere
              tryghedsperiode og ofte bredere dækning.
            </p>
            <p>
              Sælger betaler som udgangspunkt halvdelen af præmien, hvis køber
              vælger at tegne ejerskifteforsikringen. Som køber betaler du
              derfor kun den anden halvdel. Derudover vil der ofte være en
              selvrisiko pr. skade, som typisk ligger på nogle få tusinde
              kroner. Det betyder, at forsikringen især er relevant ved større
              skader, hvor udgiften kan løbe op i mange tusinde eller hundredtusinde
              kroner.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Er en ejerskifteforsikring nødvendig?
            </h2>
            <p>
              Om en ejerskifteforsikring er ”nødvendig” afhænger af boligens
              stand, din økonomi og din risikovillighed. I ældre boliger kan
              risikoen for skjulte fejl være større, hvilket gør
              ejerskifteforsikringen mere relevant. I nyere byggerier kan
              risikoen være mindre, men der kan stadig gemme sig dyre fejl bag
              vægge, tag eller installationer.
            </p>
            <p>
              For mange boligkøbere giver forsikringen økonomisk tryghed, fordi
              uforudsete reparationer kan være meget omkostningstunge. Hvis
              din økonomi er stram, kan det være ekstra vigtigt at sikre sig
              mod store enkeltstående regninger, der kan vælte boligbudgettet.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Sådan vælger du mellem basis og udvidet dækning
            </h2>
            <p>
              De fleste forsikringsselskaber tilbyder både en basis
              ejerskifteforsikring og en udvidet version. Basisdækningen tager
              sig af de væsentligste skader, mens den udvidede ofte dækker flere
              typer fejl og har færre begrænsninger. Prisen er højere, men det
              kan være pengene værd, hvis boligen er kompleks, ældre eller har
              mange installationer.
            </p>
            <p>
              Overvej blandt andet boligens alder, tilstandsrapportens indhold
              og din egen økonomiske buffer. Det kan også være en god idé at
              indhente tilbud fra flere selskaber og spørge dem direkte, hvad
              forskellen konkret er mellem deres basis- og udvidede dækning for
              netop din bolig.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Ejerskifteforsikring og din samlede boligøkonomi
            </h2>
            <p>
              En ejerskifteforsikring er kun én del af de samlede omkostninger
              ved boligkøb. Ud over præmien skal du også tage højde for
              tinglysningsafgifter, udgifter til skøde og eventuelt pant,
              omkostninger til lån, ejerudgifter og løbende vedligeholdelse.
            </p>
            <p>
              Med Boligklarheds boligomkostningsberegner kan du samle mange af
              disse poster ét sted og se, hvordan de påvirker din månedlige
              boligøkonomi. Du kan ikke beregne prisen på selve
              ejerskifteforsikringen i beregneren, men du kan indtaste den som
              en del af dine engangsomkostninger, så du får et mere realistisk
              billede af, hvad boligkøbet samlet set koster dig.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              En ejerskifteforsikring beskytter køberen mod skjulte fejl og
              mangler, der ikke fremgår af tilstandsrapporten ved købet. Den er
              frivillig, men sælger skal betale halvdelen af præmien, hvis
              sælger ønsker at blive fritaget for sit ansvar. For mange
              boligkøbere er forsikringen en vigtig del af den samlede
              risikovurdering ved boligkøb, fordi den kan begrænse de økonomiske
              konsekvenser af uforudsete skader markant.
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
