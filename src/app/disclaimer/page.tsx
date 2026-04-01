import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Ansvarsfraskrivelse";
const description =
  "Ansvarsfraskrivelse for Boligklarhed: Beregningerne i boligomkostningsberegneren er vejledende og erstatter ikke finansiel eller juridisk rådgivning.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/disclaimer") },
  ...socialMetadata({
    path: "/disclaimer",
    title,
    description,
  }),
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-6">Ansvarsfraskrivelse</h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <section>
            <h2 className="text-h3 text-text-primary">Vejledende beregninger</h2>
            <p>
              Boligklarhed stiller en boligomkostningsberegner til rådighed, som
              hjælper dig med at få overblik over omkostninger ved boligkøb.
              Alle beregninger i værktøjet er vejledende og baseret på generelle
              forudsætninger, satser og tommelfingerregler. Resultaterne kan
              derfor ikke betragtes som hverken finansiel, juridisk eller
              skattemæssig rådgivning. Dine faktiske omkostninger afhænger blandt
              andet af aftaler med bank og realkreditinstitut, boligens konkrete
              forhold, valg af forsikringer og eventuelle individuelle vilkår.
            </p>
            <p>
              Vi anbefaler altid, at du bruger beregningen som et
              beslutningsstøtteværktøj og ikke som det eneste grundlag for at
              indgå bindende aftaler. Før du træffer endelige beslutninger om
              lån, boligkøb eller større økonomiske dispositioner, bør du tale
              med din bank, dit realkreditinstitut, en boligadvokat eller andre
              relevante rådgivere.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Data, satser og forudsætninger</h2>
            <p>
              De satser og beregningsmetoder, der anvendes i
              boligomkostningsberegneren, er udvalgt for at give et realistisk
              og gennemsigtigt overblik. Satser for tinglysning, pant og andre
              offentlige afgifter kan imidlertid ændre sig over tid, og der kan
              være særlige regler eller undtagelser, som ikke er fuldt ud
              afspejlet i værktøjet. Vi kan derfor ikke garantere, at alle
              oplysninger til enhver tid er fuldt opdaterede eller dækkende for
              din specifikke situation.
            </p>
            <p>
              Du har selv ansvaret for at kontrollere dine indtastede tal og
              for at sikre, at de stemmer overens med de oplysninger, du har fra
              banker, realkreditinstitutter, offentlige myndigheder og øvrige
              samarbejdspartnere. Hvis du er i tvivl om, hvilke værdier du skal
              bruge, bør du indhente et konkret tilbud eller en beregning hos
              din egen rådgiver. Aktuelle satser for offentlige afgifter
              (herunder tinglysning) kan du altid tjekke hos{" "}
              <a
                href="https://skat.dk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Skattestyrelsen
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Intet ansvar for dispositioner</h2>
            <p>
              Brug af Boligklarhed og de tilgængelige beregninger sker på eget
              ansvar. Vi påtager os intet ansvar for tab, direkte eller indirekte
              skade, manglende indtjening eller andre konsekvenser, som måtte
              opstå ved brug af beregneren eller de oplysninger, der præsenteres
              på siden. Dette gælder uanset om tabet skyldes fejl i
              beregningerne, mangelfulde data, misforståelser eller
              fortolkningsfejl.
            </p>
            <p>
              Eventuelle beslutninger om boligkøb, finansiering, omlægning af
              lån eller andre økonomiske dispositioner træffes alene af dig som
              bruger. Vi anbefaler, at du altid sammenholder resultaterne fra
              Boligklarhed med egne budgetter og uafhængig rådgivning, før du
              foretager væsentlige ændringer i din økonomi.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Eksterne links og samarbejdspartnere</h2>
            <p>
              På boligklarhed.dk kan der forekomme links til eksterne
              samarbejdspartnere, fx banker, realkreditinstitutter eller andre
              tjenester. Disse links stilles til rådighed som en service og er
              ikke et udtryk for, at vi anbefaler en bestemt udbyder frem for en
              anden. Vi har ikke ansvar for indhold, priser, produkter eller
              rådgivning leveret af tredjeparter, og eventuelle aftaler, du
              indgår med sådanne udbydere, er udelukkende et anliggende mellem
              dig og den pågældende udbyder.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opdateringer af ansvarsfraskrivelsen</h2>
            <p>
              Ansvarsfraskrivelsen kan blive opdateret løbende, efterhånden som
              vi udvikler nye funktioner i boligomkostningsberegneren eller som
              lovgivning og praksis ændrer sig. Vi anbefaler derfor, at du
              gennemlæser denne side med jævne mellemrum, hvis du bruger
              Boligklarhed i forbindelse med en konkret boligbeslutning. Den
              seneste version vil altid være tilgængelig her på siden.
            </p>
          </section>
        </div>

        <p className="mt-8">
          <Link
            href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
            className="text-body text-brand-primary hover:underline"
          >
            Gå til beregneren
          </Link>
        </p>
      </div>
    </main>
  );
}
