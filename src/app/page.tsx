import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import {
  softwareApplicationSchema,
  faqSchema,
} from "@/lib/structured-data";
import { FAQ_ITEMS } from "@/lib/faq";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { InclusionCardsCarousel } from "@/components/InclusionCardsCarousel";

export const metadata = {
  alternates: { canonical: canonicalUrl("/") },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <section className="py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-h1 text-text-primary mb-4">
            Boligberegner – hvad koster boligen reelt?
          </h1>
          <p className="text-body text-text-secondary mb-8 max-w-2xl mx-auto">
            Online boligomkostningsberegner til danske boligkøbere. Beregn alle vigtige omkostninger ved boligkøb – tinglysning, pant, engangsomkostninger, ejerudgifter, vedligehold og månedlig ydelse på realkreditlån og evt. banklån – samlet ét sted. Få samtidig en rentestest (+1% og +2%), så du kan se, om dit boligbudget også holder, hvis renten stiger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-4 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:bg-brand-primaryHover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors w-full sm:w-auto"
            >
              Beregn boligomkostninger
            </Link>
            <Link
              href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-4 text-body font-semibold text-brand-primary border-2 border-brand-primary bg-transparent rounded-md hover:bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors w-full sm:w-auto"
            >
              Hvad kan jeg købe bolig for?
            </Link>
          </div>
          <p className="text-small text-text-muted mt-4 max-w-md mx-auto">
            Vælg den beregner, der passer til dit spørgsmål – du kan bruge begge til at få det fulde billede.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-h2 text-text-primary mb-6 text-center">
            Vælg din beregner
          </h2>
          <p className="text-body text-text-secondary mb-8 max-w-3xl mx-auto text-center">
            Boligklarhed tilbyder to værktøjer: én der viser, hvad en given bolig koster at købe og eje, og én der viser, hvor meget du typisk kan låne og hvilken købspris det svarer til. Brug begge for at få det fulde billede.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="block bg-brand-surface rounded-md border border-border shadow-soft p-6 hover:border-brand-primary hover:shadow-md transition-colors text-left group"
            >
              <h3 className="text-h3 text-text-primary mb-2 group-hover:text-brand-primary">
                Boligomkostningsberegner
              </h3>
              <p className="text-body text-text-secondary mb-4">
                Indtast købspris, udbetaling, rente og løbetid. Få engangsomkostninger, månedlig ydelse og rentestest – så du ved, hvad boligen reelt koster at købe og eje.
              </p>
              <span className="text-body font-medium text-brand-primary">
                Gå til beregneren →
              </span>
            </Link>
            <Link
              href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
              className="block bg-brand-surface rounded-md border border-border shadow-soft p-6 hover:border-brand-primary hover:shadow-md transition-colors text-left group"
            >
              <h3 className="text-h3 text-text-primary mb-2 group-hover:text-brand-primary">
                Hvad kan jeg købe bolig for?
              </h3>
              <p className="text-body text-text-secondary mb-4">
                Indtast din indtægt og evt. gæld. Få et vejledende lånerum og et skøn over maksimal købspris – ud fra gældsfaktor og typisk 80 % finansiering.
              </p>
              <span className="text-body font-medium text-brand-primary">
                Gå til beregneren →
              </span>
            </Link>
          </div>

          <h2 className="text-h2 text-text-primary mb-6 text-center">
            Hvad inkluderer vi?
          </h2>
          <p className="text-body text-text-secondary mb-8 max-w-3xl mx-auto text-center">
            Boligklarhed samler de vigtigste omkostninger ved boligkøb i én beregning, så du slipper for at regne i regneark eller gætte dig frem. Beregnerne følger de officielle satser og typiske tommelfingerregler, så du får et realistisk billede af, hvad det koster at købe og eje din bolig – både ved overtagelse og hver måned.
          </p>
          <InclusionCardsCarousel />
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-h2 text-text-primary mb-6 text-center">
            Sådan virker det
          </h2>
          <p className="text-body text-text-secondary mb-8 max-w-3xl mx-auto text-center">
            Boligklarhed er bygget til at være enkel nok til at bruge på få minutter, men detaljeret nok til at give dig et solidt beslutningsgrundlag. Du indtaster få nøgletal, hvorefter boligomkostningsberegneren regner engangsomkostninger, månedlig total og rentestest ud for dig – uden at du behøver forstå alle formler bag.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white font-semibold mb-3">
                1
              </span>
              <h3 className="text-h3 text-text-primary mb-2">Indtast tal</h3>
              <p className="text-body text-text-secondary">
                Indtast købspris, udbetaling, rente, løbetid, boligtype og dine forventede ejerudgifter. Du kan også justere afdragsfrihed, andre lån og engangsomkostninger, så beregningen passer til netop dit boligkøb.
              </p>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white font-semibold mb-3">
                2
              </span>
              <h3 className="text-h3 text-text-primary mb-2">Beregn</h3>
              <p className="text-body text-text-secondary">
                Beregneren samler alle boligomkostninger ét sted og viser både engangsomkostninger ved overtagelse og din samlede månedlige boligudgift. Du får et hurtigt overblik over, hvor meget boligen koster dig her og nu – og på sigt.
              </p>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white font-semibold mb-3">
                3
              </span>
              <h3 className="text-h3 text-text-primary mb-2">Sammenlign</h3>
              <p className="text-body text-text-secondary">
                Se stress test med +1% og +2% rente, så du kan vurdere, hvordan ændringer i renten påvirker din samlede boligøkonomi. Brug resultatet til at sammenligne forskellige lån, boliger og prisniveauer, før du siger ja til et boligkøb.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-h2 text-text-primary mb-6 text-center">
            Hvad er Boligklarhed – og hvem er det til?
          </h2>
          <div className="space-y-4 text-body text-text-secondary max-w-3xl mx-auto">
            <p>
              Boligklarhed er et uafhængigt værktøj til dig, der står over for et boligkøb og gerne vil forstå
              alle omkostninger ved boligkøbet, før du skriver under. I stedet for at sidde med et kompliceret
              regneark eller løse noter, kan du bruge boligomkostningsberegneren til hurtigt at se, hvad boligen
              reelt koster dig hver måned og ved overtagelse.
            </p>
            <p>
              Beregneren er særligt relevant for førstegangskøbere, men også for erfarne boligkøbere, der vil have
              et opdateret billede af deres boligbudget. Du kan teste forskellige scenarier – for eksempel højere
              eller lavere udbetaling, forskellig rente, kortere eller længere løbetid og om du skal vælge
              afdragsfrihed på realkreditlånet eller et ekstra banklån.
            </p>
            <p>
              Resultatet kan du bruge i dialogen med bank eller realkreditinstitut, når du skal diskutere lån,
              boligbudget og hvor meget du kan købe bolig for. Boligklarhed erstatter ikke personlig rådgivning,
              men giver dig et bedre udgangspunkt og de tal, du har brug for, samlet ét sted.
            </p>
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

      <section
        className="py-12 px-4 border-t border-border"
        aria-labelledby="faq-heading"
      >
        <div className="container mx-auto max-w-2xl">
          <h2
            id="faq-heading"
            className="text-h2 text-text-primary mb-6 text-center"
          >
            Ofte stillede spørgsmål
          </h2>
          <ul className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <li key={index}>
                <details className="group rounded-md border border-border bg-brand-surface px-4 py-3 shadow-soft">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-h3 text-text-primary">
                      {item.question}
                    </span>
                    <span className="ml-3 text-xl text-text-muted group-open:hidden">
                      +
                    </span>
                    <span className="ml-3 text-xl text-text-muted hidden group-open:inline">
                      −
                    </span>
                  </summary>
                  <p className="mt-2 text-body text-text-secondary">
                    {item.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ScrollToTopButton />
    </main>
  );
}
