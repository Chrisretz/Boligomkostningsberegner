import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Beregn boligomkostninger",
  description:
    "Beregn hvad det reelt koster at købe og eje din bolig. Engangsomkostninger, månedlig total og stress test.",
  alternates: { canonical: canonicalUrl("/beregn") },
};

export default function BeregnLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
