/**
 * Fælles data for artikler og kategorier – bruges af /artikler-siden og Topbar-dropdown.
 */

export const articles = [
  { slug: "tinglysning", title: "Hvad er tinglysning?", description: "Lær hvordan tinglysning sikrer dit ejerskab og hvilke afgifter der betales ved køb af bolig." },
  { slug: "ejerskifteforsikring", title: "Hvad er en ejerskifteforsikring?", description: "Få overblik over hvad ejerskifteforsikring dækker, hvad den koster og om den er nødvendig for dig." },
  { slug: "realkreditlan", title: "Realkreditlån: Sådan fungerer det", description: "Få overblik over realkreditlån, annuitetslån, F1/F3/F5 og hvordan din månedlige ydelse beregnes." },
  { slug: "sammenligning-af-laanetyper", title: "Sammenligning af lånetyper: realkredit, banklån og afdragsfrihed", description: "Sammenlign realkredit og banklån, fast og variabel rente, afdragsfrihed og tinglysning – og test tallene i boligberegneren." },
  { slug: "vedligehold", title: "Vedligehold af bolig: Hvor meget skal jeg sætte af?", description: "Lær tommelfingerreglen for vedligehold (1 % lejlighed, 1,5 % hus) og hvad pengene dækker over tid." },
  { slug: "eksisterende-pantebrev", title: "Spar på tinglysning: Udnyt eksisterende pantebrev", description: "Lær hvordan du reducerer omkostningerne til tinglysning af pant ved at overtage eller genbruge allerede tinglyste pantebreve." },
  { slug: "hvad-kan-jeg-koebe-bolig-for", title: "Hvad kan jeg købe bolig for?", description: "Få overblik over rådighedsbeløb, gældsfaktor og den reelle månedlige boligudgift – så du finder ud af, hvor meget bolig du har råd til." },
  { slug: "saadan-vurderer-banken-dit-boliglan", title: "Sådan vurderer banken hvad du kan låne til bolig", description: "Lær hvordan banken vurderer dit lånerum: gældsfaktor, rådighedsbeløb og kreditværdighed – og hvad det betyder for dit boligkøb." },
  { slug: "ejerudgifter", title: "Hvad er ejerudgifter?", description: "Grundskyld, ejendomsskat, forsikring, vand, varme og fællesudgifter – lær hvad du betaler som boligejer." },
  { slug: "ejerlejlighed", title: "Hvad er en ejerlejlighed?", description: "Få overblik over ejerskab, fællesudgifter og hvordan ejerlejlighed adskiller sig fra hus og andelsbolig." },
  { slug: "boligkoeb-foerste-gang", title: "Boligkøb første gang: Sådan gør du", description: "Guide til førstegangskøbere: spar op, beregn omkostninger, forstå tinglysning og træf et trygt valg." },
  { slug: "grundskyld-og-ejendomsskat", title: "Hvad er grundskyld og ejendomsskat?", description: "Få overblik over grundskyld og ejendomsskat – hvad du betaler som boligejer og hvordan det indgår i dine ejerudgifter." },
  { slug: "indboforsikring", title: "Hvad er en indboforsikring?", description: "Lær hvad indboforsikring dækker, hvorfor boligejere bør have den og hvordan den indgår i dine ejerudgifter." },
  { slug: "elforbrug-husstand", title: "Hvad bruger en husstand i strøm?", description: "Gennemsnitligt elforbrug for lejlighed og hus – efter antal personer. Kildehenvisninger til Energistyrelsen, EWII og elberegner.dk." },
  { slug: "energimaerker-og-boligokonomi", title: "Energimærker og boligøkonomi: så påvirker A–G dit budget ved boligkøb", description: "Energimærke A–G: hvad det betyder for varme, el og månedlige omkostninger – og hvordan du bruger mærket i boligbudgettet." },
] as const;

export const articleCategories = [
  { id: "engangsomkostninger", title: "Engangsomkostninger ved boligkøb", description: "Tinglysning, pant, forsikring og andre omkostninger ved overtagelse.", slugs: ["tinglysning", "ejerskifteforsikring", "eksisterende-pantebrev"] as const },
  { id: "finansiering", title: "Finansiering og lån", description: "Realkreditlån, banklån og hvad du har råd til at købe for.", slugs: ["realkreditlan", "sammenligning-af-laanetyper", "hvad-kan-jeg-koebe-bolig-for", "saadan-vurderer-banken-dit-boliglan"] as const },
  { id: "loebende", title: "Løbende omkostninger", description: "Vedligehold, ejerudgifter, el, energimærker, grundskyld, skat og forsikring.", slugs: ["vedligehold", "ejerudgifter", "elforbrug-husstand", "energimaerker-og-boligokonomi", "grundskyld-og-ejendomsskat", "indboforsikring"] as const },
  { id: "overblik", title: "Overblik og vejledning", description: "Boligtyper, førstegangskøb og generel guide til boligkøb.", slugs: ["ejerlejlighed", "boligkoeb-foerste-gang"] as const },
] as const;

export type ArticleSlug = (typeof articles)[number]["slug"];

export function getArticlesBySlugs(slugs: readonly string[]) {
  return articles.filter((a) => slugs.includes(a.slug));
}
