import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Hvad bruger en husstand i strøm?",
  description:
    "Elforbrug i danske husstande: gennemsnit efter boligtype og personer. Kilde: Energistyrelsen m.fl.",
  alternates: { canonical: canonicalUrl("/artikler/elforbrug-husstand") },
  openGraph: {
    title: "Hvad bruger en husstand i strøm?",
    description:
      "Elforbrug i danske husstande: gennemsnit efter boligtype og personer. Kilde: Energistyrelsen m.fl.",
    url: canonicalUrl("/artikler/elforbrug-husstand"),
  },
};

export default function ElforbrugHusstandPage() {
  const articleSchema = getArticleSchema({
    title: "Hvad bruger en husstand i strøm?",
    description:
      "Elforbrug i danske husstande: gennemsnit efter boligtype og personer. Kilde: Energistyrelsen m.fl.",
    path: "/artikler/elforbrug-husstand",
  });
  return (
    <main className="min-h-screen py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
          Hvad bruger en husstand i strøm?
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Når du beregner dine boligomkostninger, er el en af de løbende
            udgifter, der kan være svær at skønne på – især hvis du ikke har
            boet i en tilsvarende bolig før. Hvor meget strøm bruger en
            husstand typisk, og hvordan kan du bruge det til at estimere din
            månedlige elregning? Her får du et overblik baseret på tal fra
            Energistyrelsen og andre anerkendte kilder, så du kan sætte et
            realistisk beløb ind i din boligøkonomi.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvor meget el bruger en husstand i gennemsnit?
            </h2>
            <p>
              Elforbruget varierer med boligtype, antal personer og vaner.
              Ifølge <strong>Energistyrelsen</strong> bruger en gennemsnitsfamilie
              på to voksne og to børn typisk mellem{" "}
              <strong>4.500 og 5.000 kWh om året</strong>. Det er et godt
              pejlemærke for et hus eller en større lejlighed med fire
              personer. For én person angiver Energistyrelsen et gennemsnit på
              omkring <strong>1.600 kWh om året</strong> – svarende til cirka
              133 kWh om måneden eller 4,38 kWh om dagen.
            </p>
            <p>
              Kilderne er ikke helt ens – fordi forbrug afhænger af boligens
              størrelse, opvarmningsform og antal apparater – men tallene giver
              et brugbart udgangspunkt. På <a
                href="https://www.ewii.dk/privat/el/elforbrug-husstand/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                EWIIs side om elforbrug i husstanden
              </a>{" "}
              finder du blandt andet oversigter over typisk forbrug for
              lejligheder på omkring 80 m² og parcelhuse på omkring 160 m²,
              opdelt efter antal personer (lavt, normalt og højt forbrug).
              Sådanne tal bruges ofte som reference, når man vil vurdere, om
              ens eget forbrug er “normalt” eller afviger.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Gennemsnitligt elforbrug: lejlighed vs. hus
            </h2>
            <p>
              Større boliger og flere beboere betyder som regel mere strøm til
              belysning, apparater og evt. opvarmning. Derfor er
              gennemsnitsforbruget typisk højere i et hus end i en lejlighed.
              På <a
                href="https://elberegner.dk/guides/mit-elforbrug/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                elberegner.dks guide til elforbrug
              </a>{" "}
              kan du blandt andet se eksempler på gennemsnitligt forbrug for
              henholdsvis lejlighed (ca. 80 m²) og hus (ca. 150 m²) med 2 og 4
              personer – med opdeling i lavt, normalt og højt forbrug. For en
              lejlighed med to personer ligger det gennemsnitlige forbrug ofte
              omkring 2.000–2.100 kWh om året; for fire personer i et hus kan
              det ligge omkring 5.000 kWh om året eller mere, afhængigt af
              vaner og bolig.
            </p>
            <p>
              Kort sagt: Jo flere personer og jo større bolig, desto højere er
              det typiske elforbrug – og desto vigtigere er det at have et
              skøn med i budgettet, når du beregner dine samlede
              boligomkostninger.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvor meget strøm bruger én person?
            </h2>
            <p>
              Som nævnt bruger en enlig i gennemsnit omkring{" "}
              <strong>1.600 kWh om året</strong> ifølge Energistyrelsen. Det
              kan være sværere at spare markant, fordi visse apparater – som
              køleskab, fryser og basisbelysning – stort set bruger den samme
              mængde strøm uanset antal beboere. Derfor har enlige ofte et
              højere forbrug pr. person end familier. Et realistisk mål for en
              enlig kan være omkring 1.500 kWh om året, mens et lavere forbrug
              (fx omkring 1.000 kWh) ofte kræver bevidst sparetiltag eller at man
              bor sammen med andre. Du kan læse mere om gennemsnit per person på
              fx{" "}
              <a
                href="https://www.energifyn.dk/privat/el/vaerd-at-vide-om-el/sa-meget-el-bruger-en-person-i-gennemsnit/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                Energifyns artikel om, hvor meget el en person bruger i gennemsnit
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Elvarme og elbil øger forbruget
            </h2>
            <p>
              Tallene ovenfor gælder typisk boliger <strong>uden</strong> elvarme
              og uden opladning af elbil hjemme. Har du elvarme (varmepumpe,
              elradiatorer el.lign.), vil dit årlige forbrug ofte være
              betydeligt højere – især i et hus. Oplader du en elbil derhjemme,
              kan det ifølge eksempler fra branchen udgøre et tillæg på
              cirka 2.100–3.000 kWh om året ved en kørsel på omkring 15.000 km,
              afhængigt af bil og kørselsmønster. Når du budgetterer med el, bør
              du derfor lægge ekstra til, hvis du har elvarme eller elbil.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Brug el-estimat i boligomkostningsberegneren
            </h2>
            <p>
              På Boligklarhed kan du i <Link href="/beregn" className="text-brand-primary hover:underline">boligomkostningsberegneren</Link> vælge{" "}
              <strong>antal personer i husstanden</strong> under &quot;El, varme og
              vand&quot;. Beregneren bruger derefter gennemsnitstal for
              elforbrug (baseret på data fra Energistyrelsen og EWII) for
              henholdsvis lejlighed og hus, så du får et vejledende estimat af
              din månedlige eludgift. Estimatet indgår i den samlede månedlige
              boligudgift sammen med låneydelse, ejerudgifter og vedligehold.
              Du kan altid justere ved at lade feltet stå tomt og i stedet
              indtaste et eget beløb under &quot;Øvrige månedlige&quot;, hvis du
              kender dit forbrug eller forventer elvarme/elbil.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Kilder og læs mere
            </h2>
            <p>
              Tallene i denne artikel er vejledende og bygger på offentlige og
              brancheanerkendte kilder:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href="https://www.ewii.dk/privat/el/elforbrug-husstand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  EWII – Elforbrug husstande
                </a>{" "}
                (oversigt over typisk forbrug for lejlighed og hus, opdelt efter personer).
              </li>
              <li>
                <a
                  href="https://elberegner.dk/guides/mit-elforbrug/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  elberegner.dk – Mit elforbrug
                </a>{" "}
                (guide med gennemsnit for lejlighed og hus, 2 og 4 personer).
              </li>
              <li>
                <a
                  href="https://www.energifyn.dk/privat/el/vaerd-at-vide-om-el/sa-meget-el-bruger-en-person-i-gennemsnit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  Energifyn – Så meget el bruger en person i gennemsnit
                </a>
                .
              </li>
              <li>
                Energistyrelsen (gennemsnitstal for husstande og personer, som
                citeres af flere elselskaber og portaler).
              </li>
            </ul>
            <p>
              Elprisen varierer med elselskab, aftaletype og tidspunkt. Vores
              beregner bruger et vejledende gennemsnit pr. kWh – du kan altid
              slå den aktuelle pris op hos dit elselskab og justere budgettet
              derefter.
            </p>
          </section>

          <p className="pt-4">
            <Link
              href="/artikler"
              className="text-body text-brand-primary hover:underline"
            >
              ← Tilbage til Artikler
            </Link>
            {" · "}
            <Link
              href="/beregn"
              className="text-body text-brand-primary hover:underline"
            >
              Gå til beregneren
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
