/** FAQ til realkreditlån-beregneren – synlig tekst + FAQPage JSON-LD. */
export const BOLIGLAAN_BEREGNER_FAQ = [
  {
    question: "Hvad koster et realkreditlån på 1 mio. kr.?",
    answer:
      "Det afhænger af lånetype, rente, løbetid og om lånet er afdragsfrit. Ved fast rente omkring 4 % og bidrag på cirka 0,74 % ligger ydelsen typisk på 5.000-5.500 kr. om måneden for et 30-årigt lån med afdrag. Indtast dit eget lånebeløb i beregneren for et konkret tal med aktuelle kurser.",
  },
  {
    question: "Hvad er ÅOP på et realkreditlån?",
    answer:
      "ÅOP (årlige omkostninger i procent) samler rente, bidrag, kurstab og etableringsgebyrer i ét tal, så du kan sammenligne lån på tværs. ÅOP er derfor altid højere end den nominelle rente. Beregneren viser ÅOP for det valgte lån. Bemærk, at ÅOP for variable lån antager, at den aktuelle rente fortsætter hele løbetiden.",
  },
  {
    question: "Hvad er bidrag, og hvorfor betaler jeg det?",
    answer:
      "Bidrag er realkreditinstituttets løbende gebyr oven i renten. Det beregnes som en procent pr. år af restgælden og stiger med belåningsgraden: den del af lånet, der ligger over 60 % af boligens værdi, koster mest. Bidraget indgår i din månedlige ydelse, men påvirkes ikke af renteændringer.",
  },
  {
    question: "Hvilken lånetype er billigst – fast rente, F3 eller F-kort?",
    answer:
      "Målt på startydelse er de korteste variable lån som F-kort billigst, fordi du bærer hele renterisikoen. Fast rente er dyrest i starten, men kan aldrig stige. Hvilken der er billigst over hele løbetiden afhænger af renteudviklingen, som ingen kender på forhånd. Vælg ud fra, hvor meget en rentestigning må påvirke din økonomi.",
  },
  {
    question: "Hvad er kurstab, og hvornår rammer det mig?",
    answer:
      "Kurstab opstår, når obligationen bag et fastforrentet lån har en kurs under 100. Så får du udbetalt mindre end lånets pålydende, selvom du skylder det fulde beløb. Det er ikke en kontant regning, men betyder, at lånet skal være tilsvarende større for at dække dit behov. Variable lån ligger typisk nær kurs 100 og har derfor lille eller intet kurstab.",
  },
  {
    question: "Bør jeg vælge afdragsfrihed?",
    answer:
      "Afdragsfrihed sænker ydelsen i en periode, men gælden står stille, og ydelsen stiger, når friheden udløber, fordi det samme beløb skal afdrages over færre år. Samlet set bliver lånet dyrere. Det giver mest mening ved midlertidigt pres på økonomien, sjældent som permanent løsning.",
  },
  {
    question: "Hvad koster det at etablere et realkreditlån?",
    answer:
      "De typiske engangsomkostninger er tinglysning af pant (1.825 kr. plus 1,25 % af lånet), et lånesagsgebyr på op til 4.000 kr. og en afregningsprovision på 0,15 % af kursværdien. Dit pengeinstitut kan opkræve yderligere gebyrer for at formidle lånet. Beregneren viser de samlede etableringsomkostninger for dit lån.",
  },
  {
    question: "Er beregningen et lånetilbud?",
    answer:
      "Nej. Tallene er vejledende og bygger på aktuelle obligationskurser og Totalkredits prisblad. Den endelige rente afhænger af kursen på handelsdagen, og bank og realkredit vurderer desuden dit rådighedsbeløb og din konkrete situation. Brug beregningen som overblik før dialog med en rådgiver.",
  },
] as const;
