import type { Metadata } from "next";
import { canonicalUrl, PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Beregn boligomkostninger";
const description =
  "Boliglån beregner og boligbudget: beregn ydelse, engangsomkostninger, månedlig total og rentestress. Vejledende tal til boligkøb.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(PATH_BOLIGOMKOSTNINGER_BEREGNER) },
  ...socialMetadata({
    path: PATH_BOLIGOMKOSTNINGER_BEREGNER,
    title,
    description,
  }),
};

export default function BeregnLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
