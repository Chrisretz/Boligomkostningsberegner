import type { ArticleSlug } from "@/lib/articles";

export type Begreb = {
  id: string;
  term: string;
  kortForklaring: string;
  laengereForklaring: string;
  relatedArticleSlugs?: readonly ArticleSlug[];
};

/**
 * Kerne-liste til “Boligbegreber”.
 * Husk: listen kan udvides løbende uden at ændre UI.
 */
export const BEGREBER = [
  {
    id: "afdragsfrihed",
    term: "Afdragsfrihed",
    kortForklaring:
      "En periode hvor du kun betaler renter (og typisk ikke afdrag) på dele af dit realkreditlån.",
    laengereForklaring:
      "Afdragsfrihed betyder, at du i en aftalt periode ikke reducerer hovedstolen på dit lån. Du betaler derfor primært renter hver måned. Når afdragsfriheden ophører, starter afdragene typisk igen, hvilket kan øge din månedlige ydelse. Det kan være en fordel, hvis du har brug for lavere betaling i en periode, men den samlede omkostning over tid kan blive højere, fordi hovedstolen ikke afvikles i samme tempo.",
  },
  {
    id: "andelsbolig",
    term: "Andelsbolig",
    kortForklaring:
      "En boligtype hvor du køber en andel i en boligforening, ikke en selvstændig ejendom.",
    laengereForklaring:
      "I en andelsbolig ordner boligforeningen økonomien gennem eksempelvis husleje/ydelser og budgetter. Andelens værdi beregnes typisk efter foreningens økonomi og vurderinger. Udgifter som vedligehold og fællesomkostninger kan derfor være strukturelt anderledes end ved ejerboliger. Hvis du bruger boligomkostningsberegneren, bør du sikre, at de relevante ejerudgifter matcher din boligform.",
  },
  {
    id: "banklaan",
    term: "Banklån",
    kortForklaring:
      "Den del af finansieringen som ikke dækkes af realkreditlån.",
    laengereForklaring:
      "Banklånet beregnes typisk som købspris minus udbetaling minus realkreditlån. Rente og løbetid kan afvige fra realkreditlånet, og derfor kan den månedlige samlede betaling variere. I beregneren kan du indtaste et banklåns scenarie, så du får en mere realistisk månedlig boligudgift.",
  },
  {
    id: "belaning",
    term: "Belåning",
    kortForklaring:
      "Hvor stor en del af boligens værdi du finansierer via lån (typisk realkredit og evt. banklån).",
    laengereForklaring:
      "Belåningsgraden beskriver forholdet mellem lån og boligens pris. Højere belåning betyder typisk højere lånebeløb og dermed større månedlige omkostninger og muligvis højere renter og krav. Når du justerer købspris, udbetaling eller lånestørrelser, ændrer du også belåningen – og dermed din risiko og økonomi.",
  },
  {
    id: "boligydelse",
    term: "Boligydelse",
    kortForklaring:
      "Den månedlige betaling til lånet (renter og afdrag) plus evt. boligrelaterede udgifter i et samlet billede.",
    laengereForklaring:
      "I praksis bruger mange begrebet “boligydelse” som den samlede månedlige udgift til bolig. I din boligøkonomi bør du også medregne ejerudgifter som ejendomsskat, forsikring, vedligehold og evt. fællesudgifter – så du får den reelle månedlige boligomkostning og ikke kun selve lånebetalingen.",
  },
  {
    id: "bruttoindkomst",
    term: "Bruttoindkomst",
    kortForklaring:
      "Din indkomst før skat og arbejdsmarkedsbidrag.",
    laengereForklaring:
      "Bankernes vurderinger tager ofte udgangspunkt i bruttoindkomst, fordi det giver et standardiseret mål på din økonomiske styrke før fradrag og skat. Vær opmærksom på, at din faktiske rådighed afhænger af skat og dine faste udgifter. Derfor giver det mening at se både indtægt, gældsfaktor og beregnet rådighedsbeløb sammen.",
  },
  {
    id: "ejerudgifter",
    term: "Ejerudgifter",
    kortForklaring:
      "De løbende omkostninger ved at eje bolig, fx skat, forsikring og vedligehold.",
    laengereForklaring:
      "Ejerudgifter er de faste og variable udgifter, du typisk har som boligejer. De kan omfatte grundskyld og ejendomsskat, indboforsikring, forsikringer, vand/varme samt vedligehold og eventuelle fællesudgifter. Hvis du vil vurdere, om boligøkonomien hænger sammen, bør du sammenligne din samlede boligudgift med din økonomiske rådighed.",
    relatedArticleSlugs: ["ejerudgifter"],
  },
  {
    id: "ejendomsskat",
    term: "Ejendomsskat",
    kortForklaring:
      "Skatter og afgifter knyttet til ejendommen, fx grundskyld og ejendomsværdiskat (afhængigt af ejendomstype).",
    laengereForklaring:
      "Ejendomsskat varierer afhængigt af ejendommens forhold og gældende satser. I en boligøkonomi indgår ejendomsskat som en løbende post, der påvirker den månedlige udgift. En boligomkostningsberegner kan give et vejledende niveau, så du kan planlægge budgettet mere realistisk.",
    relatedArticleSlugs: ["grundskyld-og-ejendomsskat"],
  },
  {
    id: "faellesudgifter",
    term: "Fællesudgifter",
    kortForklaring:
      "Udgifter til drift og vedligehold af fællesarealer og services, typisk i ejerlejligheder.",
    laengereForklaring:
      "Fællesudgifter er betalinger til foreningens/andels- eller ejerlejlighedsorganisationens drift. Det kan omfatte vedligehold, administration, forsikringer, renovation og andre løbende omkostninger. Niveauet kan ændre sig over tid, så det er en god idé at indarbejde et realistisk skøn i dit boligbudget.",
  },
  {
    id: "gaeldsfaktor",
    term: "Gældsfaktor",
    kortForklaring:
      "Et nøgletal for forholdet mellem din samlede gæld og din årlige bruttoindkomst.",
    laengereForklaring:
      "Gældsfaktoren er en grov indikator for, hvor stor gæld du har i forhold til din indkomst. Bankerne bruger den som et tidligt pejlemærke og fastsætter typisk interne grænser for, hvor høj gældsfaktoren må være i relation til din økonomi. Brug den som et estimat, men husk at den konkrete kreditvurdering også tager højde for rådighedsbeløb og kreditværdighed.",
    relatedArticleSlugs: ["hvad-kan-jeg-koebe-bolig-for"],
  },
  {
    id: "kreditvurdering",
    term: "Kreditvurdering",
    kortForklaring:
      "Bankens samlede vurdering af, om du kan betale lånet tilbage.",
    laengereForklaring:
      "Kreditvurderingen tager typisk udgangspunkt i din indkomst, din eksisterende gæld, dine faste udgifter, din betalingshistorik samt jobstabilitet. Den handler om, hvor robust din økonomi er – og ikke kun om et enkelt tal som fx gældsfaktor. Derfor kan to personer med samme indkomst få forskellige lånevilkår.",
    relatedArticleSlugs: ["saadan-vurderer-banken-dit-boliglan"],
  },
  {
    id: "koebspris",
    term: "Købspris",
    kortForklaring:
      "Den aftalte pris for boligen (ejendommen eller ejerlejligheden).",
    laengereForklaring:
      "Købsprisen er udgangspunktet for beregningen af flere omkostninger som udbetaling, belåningsniveau og dele af engangsomkostningerne. Når du ændrer købsprisen, ændrer du også de økonomiske konsekvenser – både ved overtagelse og løbende i din månedlige total.",
  },
  {
    id: "laaneordning",
    term: "Lånebeløb",
    kortForklaring:
      "Det beløb du optager som lån, fx realkreditlån og evt. banklån.",
    laengereForklaring:
      "Lånebeløbet bestemmer den del af boligens pris, som du finansierer via gæld. Jo højere lånebeløb (for samme rente og løbetid), desto større bliver renter og afdrag pr. måned. Når du justerer lånebeløb i beregneren, kan du derfor direkte se effekten på den månedlige udgift.",
  },
  {
    id: "loebetid",
    term: "Løbetid",
    kortForklaring:
      "Den aftalte periode lånet strækker sig over (fx i år).",
    laengereForklaring:
      "Løbetiden påvirker størrelsen af den månedlige ydelse. En længere løbetid kan give lavere månedlig betaling, men kan også påvirke de samlede omkostninger over tid afhængigt af låntype og renteudvikling. Brug løbetids-parameteren til at teste, hvad der passer til din økonomi og risikovillighed.",
  },
  {
    id: "pant",
    term: "Pant",
    kortForklaring:
      "En sikkerhed stillet overfor långiver, typisk via tinglyste pantebreve.",
    laengereForklaring:
      "Pant betyder, at långiver har sikkerhed i ejendommen, hvis lånet ikke kan betales tilbage. I boligkøb ses pant ofte som beløb angivet i tinglyste pantebreve. Omkostningerne knyttet til pant og tinglysning er en del af dine engangsomkostninger ved køb.",
    relatedArticleSlugs: ["tinglysning"],
  },
  {
    id: "pantebrev",
    term: "Pantebrev",
    kortForklaring:
      "Dokumentet som giver sikkerhed (pant) i ejendommen for et lån.",
    laengereForklaring:
      "Pantebreve tinglyses og udgør dermed grundlaget for långivers sikkerhed. I nogle situationer kan eksisterende pantebreve genbruges, hvilket kan påvirke omkostningerne i forbindelse med tinglysning. Det kan være relevant, hvis du overtager lån eller overgår til en løsning med genanvendelse af pantebreve.",
    relatedArticleSlugs: ["eksisterende-pantebrev"],
  },
  {
    id: "pantsatbelob",
    term: "Pantsat beløb",
    kortForklaring:
      "Det beløb, som ejendommen stilles sikkerhed for i pantebrevet.",
    laengereForklaring:
      "Det pantsatte beløb bruges i beregningen af dele af tinglysningsomkostningerne. Hvis du ændrer det pantsikrede beløb i dine scenarier, kan du se effekten på engangsomkostninger. Vær opmærksom på, at pantsat beløb og lånebeløb ikke altid er identiske, da de kan afhænge af aftaler og finansieringsstruktur.",
  },
  {
    id: "realkreditlan",
    term: "Realkreditlån",
    kortForklaring:
      "Lånetypen hvor finansiering sker via realkreditinstitut, typisk med annuitet som grundmodel i beregninger.",
    laengereForklaring:
      "Realkreditlån er en almindelig finansieringsform ved køb af bolig. Afdrag og renter beregnes ud fra vilkår som rente, løbetid og evt. afdragsfrihed. I boligomkostningsberegneren kan du teste forskellige rentescenarier og se effekten på den månedlige ydelse – inklusive rentestest (+1% og +2%).",
    relatedArticleSlugs: ["realkreditlan"],
  },
  {
    id: "rente",
    term: "Rente",
    kortForklaring:
      "Den procentdel långiver beregner for at låne penge.",
    laengereForklaring:
      "Renten påvirker direkte størrelsen af dine månedlige omkostninger. Selv små ændringer kan have stor effekt, især når du sammenligner over en længere periode. Derfor er rentestesten et vigtigt redskab: den viser, hvordan din ydelse kan ændre sig, hvis renten stiger.",
  },
  {
    id: "rentetest",
    term: "Rentestest",
    kortForklaring:
      "Et scenarie hvor man tester, hvordan ydelsen ændrer sig ved en højere rente.",
    laengereForklaring:
      "En rentestest viser typisk effekten af en rentestigning (fx +1% og +2%). Det hjælper dig med at vurdere, om din boligøkonomi er robust, og om du har buffer til uforudsete rentebevægelser. Brug testresultaterne sammen med et realistisk budget for ejerudgifter og vedligehold.",
  },
  {
    id: "skode",
    term: "Skøde",
    kortForklaring:
      "Dokumentet der overdrager ejendommen fra sælger til køber.",
    laengereForklaring:
      "Skødet er en central del af bolighandlen. I en boligomkostningsberegning indgår skøde- og tilknyttede tinglysningsafgifter som en engangsomkostning ved overtagelse. Præcise omkostninger afhænger af den konkrete handel og de aktuelle satser.",
    relatedArticleSlugs: ["tinglysning"],
  },
  {
    id: "tinglysning",
    term: "Tinglysning",
    kortForklaring:
      "Registrering i tinglysningen, der sikrer ejerskab og pant – og udløser tinglysningsafgifter.",
    laengereForklaring:
      "Tinglysning er en proces, hvor dokumenter som skøde og pantebreve registreres, så rettighederne står klart. Omkostningerne afhænger bl.a. af satser for faste og variable dele. I din samlede boligøkonomi er tinglysning en vigtig del af engangsomkostningerne ved boligkøb.",
    relatedArticleSlugs: ["tinglysning"],
  },
  {
    id: "udbetaling",
    term: "Udbetaling",
    kortForklaring:
      "Det beløb du selv lægger ved boligkøb (egenkapital).",
    laengereForklaring:
      "Udbetalingen påvirker både lånebehovet og din belåningsgrad. Typisk kræves der mindst 5% udbetaling af købsprisen. Jo større udbetaling, desto lavere bliver lånebeløbet og ofte den månedlige betaling. Udbetalingen er derfor en af de vigtigste parametre, du kan justere i beregningen.",
  },
  {
    id: "vedligehold",
    term: "Vedligehold",
    kortForklaring:
      "Den løbende vedligeholdelsesreserve du bør afsætte til at holde boligen i god stand.",
    laengereForklaring:
      "Vedligehold er de omkostninger, der opstår løbende over årene til reparationer, udskiftninger og forbedringer. Tommelfingerregler bruges ofte som vejledning (typisk højere for hus end for ejerlejlighed). At medtage vedligehold i budgettet giver mere realistisk månedlig boligudgift og bedre beslutningsgrundlag.",
    relatedArticleSlugs: ["vedligehold"],
  },
  {
    id: "indboforsikring",
    term: "Indboforsikring",
    kortForklaring:
      "Forsikring der typisk dækker indbo og ofte også dele af skader relateret til hjemmet.",
    laengereForklaring:
      "Indboforsikring er relevant for de fleste boligejere. Udgiften varierer afhængigt af dækning og boligtype. I en boligomkostningsberegning kan en forsikringspost hjælpe dig med at få et mere retvisende billede af den månedlige total, især hvis du samler alle dine ejerudgifter ét sted.",
    relatedArticleSlugs: ["indboforsikring"],
  },
  {
    id: "elforbrug",
    term: "Elforbrug",
    kortForklaring:
      "Forbruget af strøm til opvarmning, husholdning og drift af boligen.",
    laengereForklaring:
      "Elforbrug afhænger bl.a. af boligtype, antal personer og vaner. I boligomkostningsberegneren kan du vælge et el-estimat baseret på husstandens størrelse og boligtype, så strømomkostninger bliver en del af din samlede månedlige udgift.",
    relatedArticleSlugs: ["elforbrug-husstand"],
  },
  {
    id: "afdrag",
    term: "Afdrag",
    kortForklaring:
      "Den del af din ydelse, der reducerer lånets hovedstol over tid.",
    laengereForklaring:
      "Afdrag er det beløb, der går til at nedbringe gælden. I mange lånetyper er fordelingen mellem renter og afdrag ikke konstant gennem hele løbetiden: i starten er der ofte relativt flere renter og senere relativt flere afdrag. Det påvirker både din månedlige betaling og hvordan din gæld falder over tid.",
  },
  {
    id: "ejerlejlighed",
    term: "Ejerlejlighed",
    kortForklaring:
      "En boligtype hvor du ejer en specifik lejlighed i en ejendom med en ejerforening.",
    laengereForklaring:
      "En ejerlejlighed er en selvstændig juridisk enhed, hvor du som ejer typisk betaler fællesudgifter til ejerforeningen. Ejerforeningen står for drift, vedligehold og andre fællesposter. Derfor er fællesudgifter og ejerudgifter vigtige elementer i den reelle månedlige boligøkonomi.",
    relatedArticleSlugs: ["ejerlejlighed"],
  },
  {
    id: "ejerskifteforsikring",
    term: "Ejerskifteforsikring",
    kortForklaring:
      "Forsikring der kan dække fejl og mangler ved boligen efter handlen.",
    laengereForklaring:
      "Ejerskifteforsikring er relevant, fordi den kan give økonomisk tryghed i en periode efter overtagelsen, hvis der opstår forhold, der er omfattet af forsikringens vilkår. Hvad du får dækket, afhænger af forsikringen og boligtypen. Når du planlægger boligkøbet, kan ejerskifteforsikring derfor indgå som en mulig engangsomkostning.",
    relatedArticleSlugs: ["ejerskifteforsikring"],
  },
  {
    id: "eksisterende-pantebrev",
    term: "Eksisterende pantebrev",
    kortForklaring:
      "Pantebreve, der allerede ligger tinglyst på ejendommen og kan genanvendes i en ny finansiering.",
    laengereForklaring:
      "Hvis der allerede findes pantebreve på ejendommen, kan det i nogle situationer være muligt at genbruge dem i forbindelse med finansieringen. Genanvendelse kan påvirke de konkrete omkostninger til etablering og tinglysning. Det kan derfor være interessant at undersøge, når du sammenligner finansieringsscenarier.",
    relatedArticleSlugs: ["eksisterende-pantebrev"],
  },
  {
    id: "flytteomkostninger",
    term: "Flytteomkostninger",
    kortForklaring:
      "Udgifter ved selve flytningen, transport, opstart og praktiske nødvendigheder.",
    laengereForklaring:
      "Flytteomkostninger kan omfatte flyttefirma, transport, opmagasinering samt mindre udgifter som forsynings-/abonnementsændringer og rengøring. Selvom det ikke altid indgår i standardberegninger, påvirker det ofte dit kontantbehov ved køb. En buffer til flytteomkostninger gør det lettere at gennemføre handlen uden økonomisk stress.",
  },
  {
    id: "grundskyld",
    term: "Grundskyld",
    kortForklaring:
      "En del af ejendomsskatten, der typisk beregnes ud fra ejendommens grundværdi.",
    laengereForklaring:
      "Grundskyld er en kommunal skat, som boligejeren betaler løbende. Beløbet afhænger af grundens vurdering og de gældende satser. I en samlet boligøkonomi bør grundskyld indgå sammen med andre ejerudgifter, fordi den påvirker din månedlige total.",
    relatedArticleSlugs: ["grundskyld-og-ejendomsskat"],
  },
  {
    id: "rådighedsbeløb",
    term: "Rådighedsbeløb",
    kortForklaring:
      "Beløbet der er tilbage efter skat og faste udgifter – og som kan bruges til boligydelse.",
    laengereForklaring:
      "Rådighedsbeløbet bruges til at vurdere, om din samlede boligydelse kan rummes uden at du bliver økonomisk presset. I bankernes kreditvurdering handler det ikke kun om, hvor stort et lån du kan få, men om hvor robust din økonomi er. Derfor er det nyttigt at sammenligne rådighedsbeløb, gældsfaktor og den reelle månedlige boligudgift.",
    relatedArticleSlugs: ["hvad-kan-jeg-koebe-bolig-for"],
  },
  {
    id: "førstegangskøber",
    term: "Førstegangskøber",
    kortForklaring:
      "En køber der køber bolig for første gang og typisk har brug for ekstra overblik.",
    laengereForklaring:
      "Førstegangskøbere står ofte over for både nye omkostningstyper og nye beslutninger. En god forståelse af udbetaling, tinglysning, vedligehold og forsikringer kan gøre planlægningen markant lettere. Brug beregninger tidligt i processen, så du kan estimere kontantbehov og månedlig udgift før du træffer endelige valg.",
    relatedArticleSlugs: ["boligkoeb-foerste-gang"],
  },
  {
    id: "engangsomkostninger",
    term: "Engangsomkostninger",
    kortForklaring:
      "Omkostninger der typisk betales ved overtagelse af boligen.",
    laengereForklaring:
      "Engangsomkostninger kan omfatte tinglysningsafgifter (fx skøde og pant), evt. ejerskifteforsikring og andre etableringsposter. Disse beløb er ofte vigtige for, hvor meget kontant du skal have op af lommen. En realistisk beregning af engangsomkostninger kan derfor være ligeså afgørende som den månedlige ydelse.",
  },
  {
    id: "hus-og-ejer",
    term: "Boligtype",
    kortForklaring:
      "Om boligen er hus, ejerlejlighed eller anden type – og hvordan det påvirker antagelser i budgettet.",
    laengereForklaring:
      "Boligtype påvirker ofte konkrete budgetposter, fx vedligeholdsniveau og typiske ejerudgifter. I beregneren kan du vælge boligtype, så relevante tommelfingerregler og estimater følger med. Det hjælper dig med at sammenligne scenarier mere retvisende.",
  },
  {
    id: "boliglån",
    term: "Boliglån",
    kortForklaring:
      "Den samlede finansiering du optager til boligkøbet, ofte med realkredit og evt. banklån.",
    laengereForklaring:
      "Boliglån kan bestå af flere dele og vilkår. I din økonomi påvirker det både rente, afdrag og dermed den månedlige ydelse. Når du sammenligner scenarier, er det derfor vigtigt at se på den samlede boligudgift – ikke kun lånebeløbet – fordi ejerudgifter og vedligehold ofte er store poster i praksis.",
    relatedArticleSlugs: ["realkreditlan"],
  },
  {
    id: "budget",
    term: "Budget",
    kortForklaring:
      "En samlet plan for dine indtægter og faste udgifter – som banken bruger til at vurdere din rådighed.",
    laengereForklaring:
      "Et budget hjælper dig med at få overblik over, hvad der faktisk er tilbage hver måned, efter at regninger og faste udgifter er betalt. Når du laver en boligberegning, er det især relevant at se på indtægt, boligydelse, ejerudgifter og andre løbende poster. Jo mere realistisk dit budget er, desto bedre kan du vurdere, om boligøkonomien hænger sammen.",
    relatedArticleSlugs: ["hvad-kan-jeg-koebe-bolig-for"],
  },
  {
    id: "adkomst",
    term: "Adkomst",
    kortForklaring:
      "Den juridiske ret du får til at råde over boligen efter et boligkøb.",
    laengereForklaring:
      "Adkomst handler om den ret, der overgår fra sælger til køber i forbindelse med ejendomsoverdragelsen. I praksis bliver det tydeliggjort via de dokumenter, der tinglyses, og som ligger til grund for dit ejerskab. Hvis du støder på begrebet i forbindelse med handlen, hænger det tæt sammen med skøde og tinglysning.",
  },
  {
    id: "advokatforbehold",
    term: "Advokatforbehold",
    kortForklaring:
      "Et forbehold der gør, at du ikke er endeligt bundet før din advokat har gennemgået købsaftalen.",
    laengereForklaring:
      "Advokatforbeholdet er en mekanisme i købsaftalen, der giver dig tid til at få aftalen juridisk gennemgået. Uden en advokat gennemgang kan du risikere at overse vilkår og forpligtelser. Forbeholdet kan være særligt relevant, hvis der er usikkerheder omkring dokumenter eller særlige forhold ved boligen.",
  },
  {
    id: "aarsopgoerelse",
    term: "Årsopgørelse",
    kortForklaring:
      "Skattestyrelsens årlige oversigt over din økonomi, som banker ofte bruger som dokumentation.",
    laengereForklaring:
      "Årsopgørelsen giver et overblik over bl.a. indkomst, skat og evt. opgjorte forhold for det seneste år. Banken kan bruge den til at forstå din økonomi og vurdere din betalingsevne og stabilitet. Det er ofte et supplerende dokument sammen med fx lønsedler og oplysninger om eventuel gæld.",
  },
  {
    id: "bidragssats",
    term: "Bidragssats",
    kortForklaring:
      "Et gebyr du betaler til realkreditinstituttet som del af din månedlige ydelse.",
    laengereForklaring:
      "Bidragssatsen er en del af omkostningerne ved realkreditlån og afhænger typisk af bl.a. din gæld, boligtype og lånestruktur. Den påvirker størrelsen af det beløb, der indgår i din ydelse. Når du sammenligner lån eller ændrer belåningsgrad, kan bidragssatsen være med til at forklare forskelle i din månedlige betaling.",
    relatedArticleSlugs: ["realkreditlan"],
  },
  {
    id: "bbr-meddelelse",
    term: "BBR-meddelelse",
    kortForklaring:
      "Oplysninger fra Bygnings- og Boligregisteret om boligens data og størrelse.",
    laengereForklaring:
      "BBR-meddelelsen er en offentlig registrering af oplysninger om en ejendom, herunder arealer og byggeforhold. Den bruges ofte som et udgangspunkt, når du skal vurdere boligen, og når boligoplysninger skal stemme overens med det, der er oplyst i salgs-/tilstandsgrundlag. Det er en god idé at tjekke, at BBR matcher den konkrete bolig, du køber.",
  },
  {
    id: "ejendomsmægler",
    term: "Ejendomsmægler",
    kortForklaring:
      "Mægleren der formidler handlen mellem sælger og køber og står for salgsprocessen.",
    laengereForklaring:
      "Ejendomsmægleren koordinerer ofte visninger, dokumentindsamling og dialogen om handlens vilkår. Selvom mægleren kan bidrage med information, er det stadig vigtigt at gennemgå centrale dokumenter (fx tilstandsrapport, købsaftale og bilag) og sikre, at dine spørgsmål bliver besvaret. Din advokat og dine egne tjek er afgørende for at træffe et trygt valg.",
  },
  {
    id: "energimærke",
    term: "Energimærke",
    kortForklaring:
      "En vurdering af boligens energiforbrug på en skala fra A til G.",
    laengereForklaring:
      "Energimærket angiver, hvor energieffektiv boligen er, baseret på en faglig vurdering. Et lavt (dårligt) energimærke kan betyde højere varmeregninger og evt. behov for forbedringer. Når du planlægger dit boligbudget, kan energimærket være med til at forklare forskelle i løbende energiudgifter.",
  },
  {
    id: "ejendomsværdiskat",
    term: "Ejendomsværdiskat",
    kortForklaring:
      "En boligskat der beregnes ud fra ejendommens værdi (afhænger af regler og fradrag).",
    laengereForklaring:
      "Ejendomsværdiskatten er en del af de løbende skatter, som boligejere kan blive opkrævet af. Den afhænger af ejendomstype og gældende satser og kan variere over tid. For at få en retvisende månedlig total er det relevant at inkludere ejendomsværdiskat sammen med grundskyld og øvrige ejerudgifter.",
    relatedArticleSlugs: ["grundskyld-og-ejendomsskat"],
  },
  {
    id: "finansieringsbevis",
    term: "Finansieringsbevis",
    kortForklaring:
      "Bankens/finansieringsinstituttets dokumentation for, at du typisk kan få finansiering.",
    laengereForklaring:
      "Et finansieringsbevis (forhåndstilsagn) er ofte et vigtigt signal på boligjagten. Det viser, at banken har vurderet din økonomi og kan finansiere et boligkøb inden for en ramme. Det kan gøre din handel mere troværdig overfor sælger og mægler og kan hjælpe dig med at undgå at bruge tid på boliger, du ikke reelt kan få finansieret.",
    relatedArticleSlugs: ["saadan-vurderer-banken-dit-boliglan", "hvad-kan-jeg-koebe-bolig-for"],
  },
  {
    id: "formueforhold",
    term: "Formueforhold",
    kortForklaring:
      "Et billede af din økonomiske robusthed: aktiver minus passiver.",
    laengereForklaring:
      "Formueforhold bruges i kreditvurderingen til at forstå, om du har økonomisk buffer. Aktiver kan være opsparing, værdipapirer og pensionsmidler, mens passiver er gæld. En stærkere formue kan gøre din ansøgning mere robust, fordi den kan fungere som sikkerhed eller buffer, hvis din situation ændrer sig.",
    relatedArticleSlugs: ["saadan-vurderer-banken-dit-boliglan"],
  },
  {
    id: "fast-rente",
    term: "Fast rente",
    kortForklaring:
      "En rente der er låst i en aftalt periode, så ydelsen bliver mere forudsigelig.",
    laengereForklaring:
      "Fast rente betyder, at renten (og dermed en stor del af ydelsen) typisk ikke ændrer sig i den aftalte periode. Det giver ro i maven, fordi du kan planlægge dit budget mere sikkert. Ulempen kan være, at renten ikke tilpasser sig faldende markedsrenter lige så hurtigt som variable løsninger.",
    relatedArticleSlugs: ["realkreditlan"],
  },
  {
    id: "variabel-rente",
    term: "Variabel rente",
    kortForklaring:
      "En rente der kan ændre sig over tid, typisk efter markedsvilkår eller fastlagte intervaller.",
    laengereForklaring:
      "Variabel rente betyder, at renten kan tilpasse sig ændringer i markedet. I perioder kan det give en lavere ydelse, men du løber en risiko for, at din ydelse stiger. Når du vurderer variable løsninger, er det derfor ekstra vigtigt at lave en rentestest og sikre, at du også kan klare en højere rente i praksis.",
    relatedArticleSlugs: ["realkreditlan"],
  },
  {
    id: "handelsomkostninger",
    term: "Handelsomkostninger",
    kortForklaring:
      "Udgifter ud over selve købsprisen, som typisk opstår ved køb og handel.",
    laengereForklaring:
      "Handelsomkostninger kan omfatte tinglysningsafgifter, bank- og realkreditgebyrer, eventuelle advokatomkostninger samt andre etableringsposter. De betales ofte i forbindelse med overtagelsen og kan påvirke dit kontantbehov markant. Når du planlægger dit boligbudget, er det en fordel at medregne dem, så du ikke bliver overrasket.",
  },
  {
    id: "kobaftale",
    term: "Købsaftale",
    kortForklaring:
      "Det juridisk bindende dokument der fastlægger vilkår for bolighandlen.",
    laengereForklaring:
      "Købsaftalen beskriver pris, overtagelsesdato, vilkår og særlige forhold ved boligen. Den indeholder også elementer som forbehold (fx advokatforbehold) og bilag. Da det er et juridisk dokument, er det ofte en god idé at få det gennemgået, så du forstår konsekvenserne af de enkelte punkter og undgår misforståelser.",
  },
  {
    id: "kurs",
    term: "Kurs",
    kortForklaring:
      "Prisen på obligationerne bag realkreditlånet, som påvirker hvad du får udbetalt.",
    laengereForklaring:
      "Kursen beskriver markedsprisen på de obligationer, som finansierer dit realkreditlån. En kurs tæt på 100 betyder typisk, at du får relativt mere ud af lånets nominelle beløb, mens en lavere kurs kan betyde, at du skal låne lidt mere for at få samme udbetaling. Kursen kan derfor være relevant, når du sammenligner lån.",
    relatedArticleSlugs: ["realkreditlan"],
  },
  {
    id: "loensedler",
    term: "Lønsedler",
    kortForklaring:
      "Dokumentation for din indkomst, som banken typisk kan bede om.",
    laengereForklaring:
      "Lønsedler bruges ofte som bevis for din aktuelle indtjening og hjælper banken med at vurdere stabilitet og niveau. Banken kan typisk bede om et antal seneste lønsedler, sammen med oplysninger om fx ansættelse og eventuelle ændringer i indkomst.",
  },
  {
    id: "lånetilbud",
    term: "Lånetilbud",
    kortForklaring:
      "Det endelige tilbud på dit realkredit- og banklån efter handlen er aftalt.",
    laengereForklaring:
      "Et lånetilbud gives, når banken har færdigbehandlet din sag og du har indgået en aftale, fx en underskrevet købsaftale. Lånetilbuddet er bindende i den forstand, at det fastlægger vilkår for rente, afdrag, løbetid og evt. kurselementer. Det er et centralt dokument, når du skal sammenholde din forventede månedlige ydelse med virkeligheden.",
    relatedArticleSlugs: ["realkreditlan"],
  },
  {
    id: "refusionsopgoerelse",
    term: "Refusionsopgørelse",
    kortForklaring:
      "En opgørelse mellem køber og sælger over delte udgifter i perioden før/efter overtagelse.",
    laengereForklaring:
      "Refusionsopgørelsen sikrer, at udgifter som fx ejendomsskat eller visse driftsomkostninger fordeles efter, hvem der ejer boligen i hvilke perioder. Det laves typisk i forbindelse med overtagelsen og opgøres via advokat. At forstå refusionsopgørelsen kan gøre det lettere at estimere dit kontantbehov ved køb.",
  },
  {
    id: "salgsopstilling",
    term: "Salgsopstilling",
    kortForklaring:
      "Mæglerens præsentation af boligen, herunder centrale oplysninger og økonomiske detaljer.",
    laengereForklaring:
      "En salgsopstilling er ofte et centralt dokument i salgsprocessen, hvor boligens økonomiske og praktiske forhold præsenteres samlet. Den kan indeholde oplysninger, som både køber, bank og advokat kan bruge i den videre proces. Som køber er det vigtigt at læse den sammen med øvrige dokumenter, så du får et korrekt helhedsbillede.",
  },
  {
    id: "tilstandsrapport-el",
    term: "Tilstandsrapport og El-installationsrapport",
    kortForklaring:
      "Rapporter der beskriver boligens synlige tilstand og evt. elinstallationers forhold.",
    laengereForklaring:
      "Tilstandsrapporten og el-installationsrapporten giver et fagligt grundlag for at vurdere, om boligen har synlige skader, fejl og mangler. De er også vigtige, hvis du vil tegne en ejerskifteforsikring, fordi vilkår og dækning ofte afhænger af de forhold, der er beskrevet i rapporterne. Gennemgå dem grundigt, især før du træffer endelig beslutning.",
  },
  {
    id: "teknisk-insolvens",
    term: "Teknisk insolvens",
    kortForklaring:
      "En situation hvor gælden er større end formuen, men hvor du stadig kan betale dine løbende ydelser.",
    laengereForklaring:
      "Teknisk insolvens handler om, at din gæld overstiger din formue, selvom din aktuelle betalingsdygtighed kan være intakt. Nogle kreditgivere kan derfor vælge at være mere restriktive, fordi risikoen i scenarier med ændret økonomi kan være højere. Hvis du oplever at være i en økonomisk “gråzone”, kan det være ekstra vigtigt at have styr på både rådighed, indtægt og dokumentation.",
    relatedArticleSlugs: ["saadan-vurderer-banken-dit-boliglan"],
  },
  {
    id: "ydelse",
    term: "Ydelse (Brutto/Netto)",
    kortForklaring:
      "Din månedlige betaling på lånet, og hvad der er tilbage når rentefradrag og skat er taget i betragtning.",
    laengereForklaring:
      "Bruttoydelsen er beløbet før skat, mens nettoydelsen er beløbet efter skat, bl.a. med rentefradrag. Den reelle udgift for dig afhænger derfor af din skattemæssige situation. Når du vurderer, om du kan klare lånet, bør du fokusere på den samlede boligøkonomi og ikke kun den nominelle låneydelse.",
    relatedArticleSlugs: ["realkreditlan"],
  },
  {
    id: "aaoe",
    term: "ÅOP",
    kortForklaring:
      "Lånets årlige omkostninger i procent, så du kan sammenligne lånepriser på tværs.",
    laengereForklaring:
      "ÅOP samler de samlede omkostninger ved et lån og omregner dem til en årlig procent. Det gør det lettere at sammenligne forskellige lånetyper, fordi du får et samlet mål for pris og omkostninger. Når du kigger på lånetilbud, kan ÅOP være et nyttigt supplement til at forstå den forventede månedlige ydelse.",
    relatedArticleSlugs: ["realkreditlan"],
  },
] as const satisfies readonly Begreb[];

