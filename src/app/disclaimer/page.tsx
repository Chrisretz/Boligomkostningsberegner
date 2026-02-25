import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ansvarsfraskrivelse | Boligomkostningsberegner",
  description: "Ansvarsfraskrivelse for Boligomkostningsberegner.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-6">Ansvarsfraskrivelse</h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-4">
          <p>
            Beregningerne er vejledende og udgør ikke finansiel rådgivning.
            Resultater afhænger af dine konkrete vilkår, boligtype og udgifter.
            Tjek altid satser og endelige omkostninger med din bank,
            realkreditinstitut og relevante myndigheder.
          </p>
          <p>
            Vi påtager os intet ansvar for beslutninger truffet ud fra
            beregningerne på denne side.
          </p>
        </div>

        <p className="mt-8">
          <Link
            href="/beregn"
            className="text-body text-brand-primary hover:underline"
          >
            Gå til beregneren
          </Link>
        </p>
      </div>
    </main>
  );
}
