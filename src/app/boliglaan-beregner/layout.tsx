import type { Metadata } from "next";
import { canonicalUrl, PATH_BOLIGLAAN_BEREGNER } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Boliglån beregner – beregn ydelse og boligbudget";
const description =
  "Gratis boliglånsberegner og guide: 80/15/5-finansiering, månedlig ydelse, typiske omkostninger og FAQ. Beregn dit boliglån og boligomkostninger hos Boligklarhed.";

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
