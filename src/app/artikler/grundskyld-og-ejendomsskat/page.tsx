import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Hvad er grundskyld og ejendomsskat?",
  description:
    "Få overblik over grundskyld og ejendomsskat: hvad du betaler som boligejer, hvordan beløbene beregnes og hvordan de indgår i dine ejerudgifter.",
  alternates: { canonical: canonicalUrl("/artikler/grundskyld-og-ejendomsskat") },
  openGraph: {
    title: "Hvad er grundskyld og ejendomsskat?",
    description:
      "Grundskyld og ejendomsskat er skatter du betaler som boligejer. Her får du overblik over beregning og hvad det betyder for dine boligomkostninger.",
    url: canonicalUrl("/artikler/grundskyld-og-ejendomsskat"),
  },
};

export default function GrundskyldOgEjendomsskatPage() {
  const articleSchema = getArticleSchema({
    title: "Hvad er grundskyld og ejendomsskat?",
    description:
      "Få overblik over grundskyld og ejendomsskat: hvad du betaler som boligejer, hvordan beløbene beregnes og hvordan de indgår i dine ejerudgifter.",
    path: "/artikler/grundskyld-og-ejendomsskat",
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
          Hvad er grundskyld og ejendomsskat?
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Som boligejer betaler du løbende skat til kommunen i form af{" "}
            <strong>grundskyld</strong> og evt. <strong>ejendomsskat</strong>
            (ejendomsværdiskat). Begge er en del af dine ejerudgifter og
            indgår i den samlede månedlige boligudgift. Her får du et overblik
            over, hvad de er, hvordan de beregnes og hvorfor de betyder noget
            for din boligøkonomi.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad er grundskyld?
            </h2>
            <p>
              <strong>Grundskyld</strong> er en årlig skat, som ejere af
              fast ejendom betaler til kommunen. Skatten er knyttet til
              ejendommens <strong>grundværdi</strong> – dvs. værdien af grunden
              – og beregnes ud fra den offentlige vurdering. Grundskylden er
              ens for alle i samme kommune med samme type og beliggenhed af
              grund, uanset om du har bygget et palads eller et lille hus på
              grunden.
            </p>
            <p>
              Beløbet kan variere meget fra kommune til kommune og fra
              adresse til adresse. Du kan typisk finde et skøn på din kommune
              eller via Skattestyrelsens oplysninger om din ejendom. Mange
              betaler grundskyld via den årlige forskudsopgørelse eller som
              en del af den samlede skattebetaling.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad er ejendomsskat (ejendomsværdiskat)?
            </h2>
            <p>
              <strong>Ejendomsskat</strong> (ofte omtalt som ejendomsværdiskat)
              er en skat der er knyttet til ejendommens <strong>værdi</strong> –
              både grund og bygning. Ikke alle ejendomme er omfattet; det
              afhænger af den offentlige vurdering. Hvis din bolig er over en
              vis værdigrænse, skal du betale ejendomsskat af den del der
              overstiger grænsen. Satserne og reglerne kan ændre sig med
              skattelovgivningen.
            </p>
            <p>
              Ejendomsskatten betales typisk årligt og indgår i den samlede
              skattebillet sammen med grundskyld. For mange boligejere er det
              en væsentlig del af de løbende ejerudgifter, som bør medtages i
              budgettet.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Beregningseksempel: grundskyld
            </h2>
            <p>
              Grundskylden beregnes som en procentdel af ejendommens{" "}
              <strong>grundværdi</strong> (værdien af grunden ifølge den
              offentlige vurdering). I dag bruges typisk omkring 80 % af
              grundværdien som beskatningsgrundlag, der ganges med kommunens{" "}
              <strong>grundskyldspromille</strong>. Promillen sættes af den
              enkelte kommune inden for et lovbestemt loft og varierer derfor
              fra kommune til kommune.
            </p>
            <p>
              <strong>Eksempel:</strong> Antag at grundværdien for din bolig er
              1.500.000 kr. og at din kommunes grundskyldspromille er 25.
              Beskatningsgrundlaget er 80 % af 1.500.000 kr. = 1.200.000 kr.
              Grundskylden udgør derefter 25 promille af 1.200.000 kr., dvs.
              1.200.000 × 0,025 = <strong>30.000 kr. om året</strong> (2.500
              kr. pr. måned). I en anden kommune med lavere promille vil
              beløbet være lavere; med højere promille højere.
            </p>
            <p>
              Ejendomsskat (ejendomsværdiskat) beregnes efter andre regler og
              gælder for ejendomme over en vis værdigrænse. De præcise satser,
              grænser og undtagelser finder du på{" "}
              <a
                href="https://skat.dk/borger/bolig-og-ejendomme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Skattestyrelsens hjemmeside om bolig og ejendomme
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvorfor betyder det noget for boligkøb?
            </h2>
            <p>
              Når du vurderer, hvad du har råd til at betale for en bolig, er
              det ikke nok at kigge på låneydelsen. Du skal også regne med
              <strong> ejerudgifter</strong> – herunder grundskyld og
              ejendomsskat – samt forsikring, vand, varme og for
              ejerlejligheder fællesudgifter. Jo højere grundskyld og
              ejendomsskat er i den kommune eller for den ejendom du kigger
              på, jo højere bliver din reelle månedlige boligudgift.
            </p>
            <p>
              Det kan derfor være en god idé at tjekke niveauet af grundskyld
              og evt. ejendomsskat for de boliger du overvejer – fx via
              boligannoncen, ejendomsoplysninger eller kommunen. Så undgår du
              overraskelser efter købet.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Læs mere hos Skat
            </h2>
            <p>
              For officielle oplysninger om grundskyld, ejendomsskat og
              opkrævning (fx via forskudsopgørelsen) kan du gå direkte til
              kilden:{" "}
              <a
                href="https://skat.dk/borger/bolig-og-ejendomme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Skattestyrelsens side om bolig og ejendomme (skat.dk)
              </a>
              . Der finder du også vejledning om boligskat på
              forskudsopgørelsen og hvordan du registrerer din bolig.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Sådan får du overblik over alle ejerudgifter
            </h2>
            <p>
              Grundskyld og ejendomsskat er to af flere poster under
              ejerudgifter. Du kan læse mere om de øvrige i vores artikel om{" "}
              <Link href="/artikler/ejerudgifter" className="text-brand-primary hover:underline">
                hvad ejerudgifter er
              </Link>
              . I vores boligomkostningsberegner kan du indtaste dine
              forventede ejerudgifter pr. måned (herunder et gennemsnit for
              skat) og få den samlede månedlige boligudgift.
            </p>
            <p>
              <Link href="/beregn" className="text-brand-primary hover:underline font-medium">
                Brug vores beregner her
              </Link>{" "}
              for at se, hvordan ejerudgifter inkl. grundskyld og skat
              påvirker din samlede boligøkonomi.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              Grundskyld er en årlig skat til kommunen baseret på ejendommens
              grundværdi. Ejendomsskat (ejendomsværdiskat) er knyttet til
              ejendommens samlede værdi og gælder for ejendomme over en vis
              værdigrænse. Begge indgår i dine ejerudgifter og bør medtages,
              når du beregner din reelle månedlige boligudgift og vurderer,
              hvad du har råd til at købe.
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
