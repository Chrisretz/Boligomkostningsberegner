import type { Metadata } from "next";
import { canonicalUrl, PATH_BOLIGLAAN_BEREGNER } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Realkreditlån beregner – ydelse, bidrag og kurstab";
const description =
  "Beregn dit realkreditlån med aktuelle kurser: vælg lånetype, afdrag eller afdragsfrihed, og se månedlig ydelse, etableringsomkostninger og afdragsprofil.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(PATH_BOLIGLAAN_BEREGNER) },
  ...socialMetadata({
    path: PATH_BOLIGLAAN_BEREGNER,
    title,
    description,
  }),
};

export default function BoliglaanBeregnerLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
