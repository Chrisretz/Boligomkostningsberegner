/** Korte, konkrete forklaringer til hver lånetype i explorer'en. */

import type { LoanType } from "@/lib/bidrag";

export interface LaanetypeInfo {
  headline: string;
  body: string;
  /** Det ærlige forbehold ved netop denne type */
  risiko: string;
}

export const LAANETYPE_INFO: Record<LoanType, LaanetypeInfo> = {
  fast: {
    headline: "Renten er den samme i alle 30 år",
    body: "Du kender din ydelse fra første dag til sidste. Renten er højere end på de variable lån, fordi du betaler for sikkerheden, men den kan aldrig stige. Falder renten senere, kan du lægge om til et billigere lån; stiger den, kan du lægge om og skære et stykke af din gæld.",
    risiko: "Du betaler mest i starten og kan komme til at fortryde, hvis renten falder markant, medmindre du husker at lægge om.",
  },
  renteMaxF5F10: {
    headline: "Ny rente hvert femte år",
    body: "Renten ligger fast i fem år ad gangen og tilpasses derefter markedet. Du får en lavere startrente end ved fast rente og har alligevel ro i en længere periode. RenteMax fungerer på samme måde, men har et loft over, hvor højt renten kan gå.",
    risiko: "Ved hver rentetilpasning kan ydelsen ændre sig markant. Du bør kunne bære en stigning uden at ændre livsstil.",
  },
  fKort: {
    headline: "Renten følger markedet tættest",
    body: "Renten fastsættes typisk hver sjette måned ud fra en kort referencerente plus et fast rentetillæg. Det giver som regel den laveste rente af alle typer, fordi du bærer hele renterisikoen selv.",
    risiko: "Ydelsen kan ændre sig to gange om året. Historisk har korte renter svinget flere procentpoint på få år.",
  },
  f3f4: {
    headline: "Ny rente hvert tredje år",
    body: "Et kompromis mellem den lave rente på de korteste lån og forudsigeligheden ved fast rente. Du kender din ydelse tre år frem, hvilket for mange svarer nogenlunde til, hvor langt de kan overskue deres økonomi.",
    risiko: "Tre år går hurtigt. Vurdér, om du kan bære ydelsen, hvis renten er to procentpoint højere ved næste tilpasning.",
  },
  f1f2: {
    headline: "Ny rente hvert år",
    body: "Den klassiske variable lånetype med årlig rentetilpasning. Lav startrente, men størst udsving. Udbydes ikke længere af alle institutter, hvor F-kort mange steder har overtaget rollen.",
    risiko: "Ydelsen kan ændre sig hvert eneste år. Egner sig bedst, hvis du har en solid økonomisk buffer.",
  },
};
