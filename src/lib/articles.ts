/**
 * Fælles data for artikler og kategorier – bruges af /artikler-siden og Topbar-dropdown.
 */

export const articles = [
  { slug: "tinglysning", title: "Hvad er tinglysning?", description: "Lær hvordan tinglysning sikrer dit ejerskab og hvilke afgifter der betales ved køb af bolig." },
  { slug: "ejerskifteforsikring", title: "Hvad er en ejerskifteforsikring?", description: "Få overblik over hvad ejerskifteforsikring dækker, hvad den koster og om den er nødvendig for dig." },
  { slug: "realkreditlan", title: "Realkreditlån: Sådan fungerer det", description: "Få overblik over realkreditlån, annuitetslån, F1/F3/F5 og hvordan din månedlige ydelse beregnes." },
  { slug: "realkreditlan-beregner", title: "Realkreditlån beregner og boligomkostninger", description: "Realkreditlån beregner i boligomkostningsberegneren: ydelse, 80/15/5, banklån, tinglysning og vedligehold – gratis uden login." },
  { slug: "sammenligning-af-laanetyper", title: "Lånetyper ved boligkøb: overblik og sammenligning", description: "Alle lånetyper forklaret: fast rente, F1/F3/F5, afdragsfrihed og banklån. Se forskellen på ydelse og risiko." },
  { slug: "vedligehold", title: "Hvad koster vedligehold af hus og bolig?", description: "Vedligeholdelse koster typisk 1,5 % af husets værdi om året, 1 % for lejlighed. Se hvad beløbet dækker." },
  { slug: "eksisterende-pantebrev", title: "Spar på tinglysning: Udnyt eksisterende pantebrev", description: "Lær hvordan du reducerer omkostningerne til tinglysning af pant ved at overtage eller genbruge allerede tinglyste pantebreve." },
  { slug: "hvad-kan-jeg-koebe-bolig-for", title: "Hvor meget kan jeg låne til bolig?", description: "Tommelfingerreglerne bag bankens vurdering: gældsfaktor, rådighedsbeløb og udbetaling – og hvad de betyder for dit lånerum." },
  { slug: "saadan-vurderer-banken-dit-boliglan", title: "Sådan vurderer banken hvad du kan låne til bolig", description: "Lær hvordan banken vurderer dit lånerum: gældsfaktor, rådighedsbeløb og kreditværdighed – og hvad det betyder for dit boligkøb." },
  { slug: "ejerudgifter", title: "Hvad dækker ejerudgifter? Guide til hus og lejlighed", description: "Grundskyld, ejendomsværdiskat, forsikring og ejerforening – og hvad der ikke er med i tallet." },
  { slug: "ejerlejlighed", title: "Hvad er en ejerlejlighed?", description: "Få overblik over ejerskab, fællesudgifter og hvordan ejerlejlighed adskiller sig fra hus og andelsbolig." },
  { slug: "boligkoeb-foerste-gang", title: "Boligkøb første gang: Sådan gør du", description: "Guide til førstegangskøbere: spar op, beregn omkostninger, forstå tinglysning og træf et trygt valg." },
  { slug: "grundskyld-og-ejendomsskat", title: "Hvad er grundskyld og ejendomsskat?", description: "Få overblik over grundskyld og ejendomsskat – hvad du betaler som boligejer og hvordan det indgår i dine ejerudgifter." },
  { slug: "indboforsikring", title: "Hvad er en indboforsikring?", description: "Lær hvad indboforsikring dækker, hvorfor boligejere bør have den og hvordan den indgår i dine ejerudgifter." },
  { slug: "elforbrug-husstand", title: "Hvad bruger en husstand i strøm?", description: "Gennemsnitligt elforbrug for lejlighed og hus – efter antal personer. Kildehenvisninger til Energistyrelsen, EWII og elberegner.dk." },
  { slug: "energimaerker-og-boligokonomi", title: "Energimærker og boligbudget: A–G ved boligkøb", description: "Energimærke A–G: hvad det betyder for varme, el og månedlige omkostninger – og hvordan du bruger mærket i boligbudgettet." },
  { slug: "tvangsauktioner", title: "Tvangsauktioner: guide til muligheder og faldgruber", description: "Tvangsauktioner i Danmark: muligheder, risici og fogedret. Overblik over økonomi og finansiering – brug Boligklarhed til budget og beregning." },
  { slug: "vaelg-ejendomsmaegler", title: "Vælg den rette ejendomsmægler til dit boligsalg", description: "Guide til at vælge ejendomsmægler: opgaver, salær, lokalkendskab og salgsstrategi. Brug Boligklarheds beregnere til økonomisk overblik før du underskriver." },
  { slug: "koeb-bolig-sammen-ugift", title: "Køb bolig sammen som ugifte: det skal I have styr på", description: "Ugifte samlevende arver ikke hinanden. Få styr på samejeoverenskomst, gældsbrev, testamente og forsikring, før I køber bolig sammen." },
] as const;

/**
 * Kategorier følger købsrejsen: før du køber → finansiering → ved købet →
 * når du ejer. Rækkefølgen bruges direkte i artikeloversigten.
 */
export const articleCategories = [
  { id: "overblik", title: "1. Før du køber", description: "Boligtyper, førstegangskøb, fælles køb, ejendomsmægler og tvangsauktioner.", slugs: ["boligkoeb-foerste-gang", "ejerlejlighed", "koeb-bolig-sammen-ugift", "vaelg-ejendomsmaegler", "tvangsauktioner"] as const },
  { id: "finansiering", title: "2. Finansiering og lån", description: "Realkreditlån, banklån og hvad du har råd til at købe for.", slugs: ["realkreditlan", "realkreditlan-beregner", "sammenligning-af-laanetyper", "hvad-kan-jeg-koebe-bolig-for", "saadan-vurderer-banken-dit-boliglan"] as const },
  { id: "engangsomkostninger", title: "3. Ved købet: engangsomkostninger", description: "Tinglysning, pant, forsikring og andre omkostninger ved overtagelse.", slugs: ["tinglysning", "ejerskifteforsikring", "eksisterende-pantebrev"] as const },
  { id: "loebende", title: "4. Når du ejer boligen", description: "Vedligehold, ejerudgifter, el, energimærker, grundskyld, skat og forsikring.", slugs: ["vedligehold", "ejerudgifter", "elforbrug-husstand", "energimaerker-og-boligokonomi", "grundskyld-og-ejendomsskat", "indboforsikring"] as const },
] as const;

/** Artikler vi anbefaler nye besøgende at starte med. */
export const STARTER_SLUGS = [
  "boligkoeb-foerste-gang",
  "hvad-kan-jeg-koebe-bolig-for",
  "tinglysning",
  "ejerudgifter",
] as const;

export type ArticleSlug = (typeof articles)[number]["slug"];

export function getArticlesBySlugs(slugs: readonly string[]) {
  return articles.filter((a) => slugs.includes(a.slug));
}
