# Designplan for Boligklarhed

*Prioriteret plan for designoptimering af resten af sitet, efter samme princip som forsiden: typografi og hierarki først, grafik hvor tal skal forstås, animationer som sidste lag. Status juli 2026.*

## Allerede gennemført

Forsiden har fået mørkeblå hero med display-typografi og guld-eyebrow, tillidsbadges, sektionsrytme med skiftende baggrunde og hover-løft på kort. Resultatvisningen har fordelings-bar og rentestest-søjler med count-up. Nyt logo med guld-accent er implementeret i topbar, favicons og manifest. Cookie-banner er optimeret compliant. Knapper og farver er ensrettet til brand-blå.

**Fase 4-6 er delvist gennemført:** /beregnere har fået ikon-kort (Lucide) med "Mest brugte"-badge i guld, forsidens "Sådan virker det" bruger ikoner i stedet for tal, footeren har CTA-bånd øverst ("Klar til at regne på dit boligkøb?"), og der er genereret et rigtigt OG-billede (1200x630, `public/og-image.png`) med logo og tagline, som al social metadata nu peger på. Udestår: Lighthouse-gennemgang (kør lokalt), /boligbegreber-polish, om-os/kontakt, 404-side, indholdsfortegnelse og læsetid på artikler.

**Fase 3 er delvist gennemført:** Sticky-fix (`overflow-x-clip` i stedet for `overflow-x-hidden`, som brød position sticky), artikel-typografi via `.prose`-styles (luftigere linjeafstand, guld-streg under H2, guld-markers på lister) og `ArticleExtras.tsx` i artikel-layoutet: navy beregner-CTA-boks plus "Læs også" med tre relaterede artikler fra samme kategori på alle artikelsider. Ikke gjort fra Fase 3: indholdsfortegnelse, læsetid (kræver ord-tælling pr. artikel).

**Fase 1 er gennemført:** Sticky live-resumé på boligomkostningsberegneren (desktop-sidepanel + mobil bundbar, opdaterer live via `onInputChange`), formularsektioner som hvide kort, delay reduceret til 200 ms ved gentagne beregninger. **Fase 2 er gennemført:** Mini-beregner i forsidens hero (`HeroMiniCalculator.tsx`) med købspris-slider, udbetalingsvalg og live månedstal; sender `?pris=&udbetaling=` videre til den fulde beregner, som læser dem ved load. **Fra Fase 6:** Inter loades nu via next/font i stedet for ekstern CSS-import. Ikke gjort fra Fase 1: "valgfrit-felter bag fold" (bevidst udskudt).

## Fase 1: Beregner-siderne (størst brugerværdi)

Beregnerne er produktets kerne og det, søgetrafikken lander på. To ting mangler:

**1a. Sticky live-resumé på boligomkostningsberegneren.** Formularen er lang (7 sektioner). På desktop: et sticky panel i højre side, der viser månedlig total, kontantbehov og rentestest live, mens man taster, med count-up ved ændringer. Beregningen er ren klient-matematik, så det koster intet performancemæssigt. Den kunstige 1-sekunds delay udgår ved efterfølgende beregninger. På mobil: en kompakt sticky bund-bar med månedstallet. Dette er den enkeltændring, der mest får sitet til at føles som et rigtigt produkt.
Filer: `beregn-dine-boligomkostninger/page.tsx`, `CalculatorForm.tsx` (onChange-callback), ny `StickySummary.tsx`.

**1b. Visuel sektionsinddeling af formularen.** De 7 sektioner er i dag kun adskilt af overskrifter og luft. Giv hver sektion et diskret kort (hvid baggrund, border, radius) på den lyseblå side-baggrund, med lille nummerering eller ikon. Gør "valgfrit"-felter visuelt sekundære, evt. bag en "Vis flere muligheder"-fold, så førstegangsbrugeren kun ser de 5-6 vigtigste felter.
Filer: `CalculatorForm.tsx`, `beregn-dine-boligomkostninger/page.tsx`.

## Fase 2: Mini-beregner i forsidens hero (konvertering)

Købspris-slider + udbetalings-hurtigvalg direkte i heroen, med live månedstal (genbruger `calculate()`), og "Se fuld beregning"-knap der sender værdierne med til beregneren via URL-parametre. Forsiden går fra at beskrive produktet til at VÆRE produktet. Kræver at beregneren kan læse `?pris=&udbetaling=` ved load.
Filer: `page.tsx`, ny `HeroMiniCalculator.tsx`, `beregn-dine-boligomkostninger/page.tsx` (URL-params).

## Fase 3: Artikel-læseoplevelsen (SEO-flanken)

25+ artikler er sitets trafikmotor, men læseoplevelsen er standard. Løft:

- Læsebredde og typografi: brødtekst i maks. ~70 tegn pr. linje, større linjeafstand, tydeligere H2/H3-hierarki med guld-detalje (fx tynd guldstreg under H2).
- Indholdsfortegnelse ("På denne side") som sticky sidebar på desktop for artikler over ~1.500 ord, med scroll-highlighting.
- Læsetid og opdateringsdato øverst (datoerne findes allerede i `article-dates.ts`).
- CTA-bokse i artiklerne: en genbrugelig "Prøv beregneren"-komponent med mini-eksempel i stedet for rene tekstlinks. Artikler er indgangen; beregneren er målet.
- Relaterede artikler nederst (3 kort) baseret på manuel tagging i `articles.ts`.
Filer: artikel-layout, `articles.ts`, ny `ArticleCta.tsx`, ny `TableOfContents.tsx`.

## Fase 4: Oversigtssider og støttesider

- `/beregnere`: kortene op i størrelse med ikon pr. beregner og "mest brugte"-markering.
- `/boligbegreber`: begrebs-explorer med alfabet-navigation og søgefelt øverst (komponenten findes, poler layout).
- `/om-os` og `/kontakt`: portræt/illustration, kortere tekst, trust-elementer (CVR, svartid). Lav prioritet, men billigt.

## Fase 5: Gennemgående detaljer

- Guld-accent-politik: guld bruges KUN til eyebrows, badges, H2-detaljer og logo-luppen. Aldrig på knapper eller links (bliver rodet). Skriv det ind her og håndhæv det.
- Ikonsæt: Lucide (MIT-licens, matcher stilen) til "Sådan virker det", beregner-kort og inklusions-karrusellen. Ét sæt, én stregtykkelse.
- Footer: den er funktionel; tilføj kun logo-mærket og en kort CTA-linje ("Klar til at regne på dit boligkøb?" + knap).
- 404-side med beregner-CTA (findes der en custom 404? ellers lav en).

## Fase 6: Teknisk polish (efter det visuelle)

- Font-loading: Inter loades i dag via Google Fonts CSS-import i globals.css; skift til `next/font` for at undgå FOUT og eksterne requests.
- Lighthouse-gennemgang på mobil (LCP på hero, CLS ved count-up/reveal-animationer; animationerne bruger transform, så CLS bør være ok, men verificér).
- Kontrast-tjek af guld på hvid (accent #B08A45 er ok til store elementer; brug aldrig til brødtekst).
- OG-billeder: generér social share-billeder med det nye logo og navy baggrund (i dag deles sider formentlig uden pæne previews). Kan genereres med samme sharp-pipeline som favicons.

## Anbefalet rækkefølge og omfang

1. Fase 1a+1b i én omgang (beregneren er kernen; sticky resumé + sektionskort hænger sammen).
2. Fase 2 (mini-beregner) når 1 er testet.
3. Fase 3 artiklerne, evt. i to bidder (typografi/CTA først, TOC/relaterede bagefter).
4. Fase 5-6 løbende; Fase 4 til sidst.

Hver fase afsluttes med: `npx tsc --noEmit`, `npm test`, `npm run build` lokalt, og et hurtigt klik-igennem på mobilbredde (DevTools, 375 px).
