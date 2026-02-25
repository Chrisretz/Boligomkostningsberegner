import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-h1 text-text-primary mb-4">
            Hvad koster boligen reelt?
          </h1>
          <p className="text-body text-text-secondary mb-8 max-w-2xl mx-auto">
            Engangsomkostninger + månedlig total + stress test.
          </p>
          <Link
            href="/beregn"
            className="inline-block px-8 py-4 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:bg-brand-primaryHover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
          >
            Beregn på 60 sek
          </Link>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-h2 text-text-primary mb-6 text-center">
            Hvad inkluderer vi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-surface rounded-md border border-border shadow-soft p-spacing-card text-center">
              <h3 className="text-h3 text-text-primary mb-2">
                Tinglysning
              </h3>
              <p className="text-body text-text-secondary">
                Skøde- og pantafgifter jf. Skattestyrelsens satser
              </p>
            </div>
            <div className="bg-brand-surface rounded-md border border-border shadow-soft p-spacing-card text-center">
              <h3 className="text-h3 text-text-primary mb-2">
                Vedligehold
              </h3>
              <p className="text-body text-text-secondary">
                Estimeret vedligeholdelse baseret på boligtype
              </p>
            </div>
            <div className="bg-brand-surface rounded-md border border-border shadow-soft p-spacing-card text-center">
              <h3 className="text-h3 text-text-primary mb-2">
                Ejerudgifter
              </h3>
              <p className="text-body text-text-secondary">
                Skat, forsikring og andre faste ejeromkostninger
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-h2 text-text-primary mb-6 text-center">
            Sådan virker det
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white font-semibold mb-3">
                1
              </span>
              <h3 className="text-h3 text-text-primary mb-2">Indtast tal</h3>
              <p className="text-body text-text-secondary">
                Købspris, udbetaling, rente og boligtype
              </p>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white font-semibold mb-3">
                2
              </span>
              <h3 className="text-h3 text-text-primary mb-2">Beregn</h3>
              <p className="text-body text-text-secondary">
                Få overblik over engangsomkostninger og månedlig total
              </p>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white font-semibold mb-3">
                3
              </span>
              <h3 className="text-h3 text-text-primary mb-2">Sammenlign</h3>
              <p className="text-body text-text-secondary">
                Se stress test med +1% og +2% rente
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-brand-surface rounded-md border border-border shadow-soft p-spacing-card text-center">
            <p className="text-body text-text-secondary">
              Vejledende beregning – ikke finansiel rådgivning.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
