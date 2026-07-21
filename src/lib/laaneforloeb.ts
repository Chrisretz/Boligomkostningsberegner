/**
 * Beregning af et lånetypes forløb pr. lånt million.
 *
 * Bruges i den interaktive lånetype-explorer. Rentedelen er den samme
 * annuitetsmatematik som i boligomkostningsberegneren, men her holdes
 * beløbene pr. million, så lånetyperne kan sammenlignes direkte uden at
 * brugeren skal indtaste noget.
 *
 * Forenklinger, som er nævnt i artiklen:
 * - Renten antages konstant i hele forløbet. For variable lån er det
 *   ikke realistisk, men det er netop pointen: sammenligningen viser,
 *   hvad man betaler i dag, ikke hvad man ender med at betale.
 * - Bidrag beregnes af restgælden og lægges oven i ydelsen.
 * - Kurstab, gebyrer og skattefradrag indgår ikke.
 */

export const LOAN_PER_MILLION = 1_000_000;

export interface ForloebInput {
  /** Årlig rente i procent */
  ratePct: number;
  /** Årlig bidragssats i procent af restgæld */
  bidragPct: number;
  termYears: number;
  /** Antal års afdragsfrihed i starten af lånet (0 = afdrag fra start) */
  interestOnlyYears: number;
  principalDKK?: number;
}

export interface ForloebPoint {
  /** År fra lånets start */
  year: number;
  /** Restgæld ved årets udgang */
  balanceDKK: number;
}

export interface ForloebResult {
  /** Ydelse første måned inkl. bidrag */
  firstPaymentDKK: number;
  /** Ydelse efter afdragsfriheden udløber (= første ydelse hvis ingen) */
  paymentAfterInterestOnlyDKK: number;
  /** Restgæld efter 10 år */
  balanceAfter10YearsDKK: number;
  /** Samlet betaling over hele løbetiden (renter + bidrag + afdrag) */
  totalPaidDKK: number;
  /** Samlede renter og bidrag, altså det lånet koster ud over hovedstolen */
  totalCostDKK: number;
  /** Restgæld år for år, til diagrammet */
  points: ForloebPoint[];
}

/** Månedlig annuitetsydelse (kun renter og afdrag, ikke bidrag). */
function annuity(principal: number, annualRatePct: number, months: number) {
  if (months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const pow = Math.pow(1 + r, months);
  return (principal * (r * pow)) / (pow - 1);
}

export function beregnForloeb(input: ForloebInput): ForloebResult {
  const {
    ratePct,
    bidragPct,
    termYears,
    interestOnlyYears,
    principalDKK = LOAN_PER_MILLION,
  } = input;

  const totalMonths = termYears * 12;
  const ioMonths = Math.min(interestOnlyYears * 12, totalMonths);
  const amortMonths = totalMonths - ioMonths;

  const monthlyRate = ratePct / 100 / 12;
  const monthlyBidragRate = bidragPct / 100 / 12;

  // Ydelsen efter afdragsfriheden: hovedstolen skal afvikles over færre måneder
  const amortPayment = annuity(principalDKK, ratePct, amortMonths);

  let balance = principalDKK;
  let totalPaid = 0;
  const points: ForloebPoint[] = [{ year: 0, balanceDKK: balance }];

  let firstPayment = 0;
  for (let m = 1; m <= totalMonths; m++) {
    const interest = balance * monthlyRate;
    const bidrag = balance * monthlyBidragRate;
    const inInterestOnly = m <= ioMonths;

    const principalPart = inInterestOnly
      ? 0
      : Math.min(amortPayment - interest, balance);
    const payment = interest + bidrag + principalPart;

    if (m === 1) firstPayment = payment;
    balance = Math.max(balance - principalPart, 0);
    totalPaid += payment;

    if (m % 12 === 0) {
      points.push({ year: m / 12, balanceDKK: Math.round(balance) });
    }
  }

  const paymentAfterIo =
    ioMonths > 0
      ? amortPayment + principalDKK * monthlyBidragRate
      : firstPayment;

  const after10 =
    points.find((p) => p.year === 10)?.balanceDKK ??
    points[points.length - 1].balanceDKK;

  return {
    firstPaymentDKK: Math.round(firstPayment),
    paymentAfterInterestOnlyDKK: Math.round(paymentAfterIo),
    balanceAfter10YearsDKK: after10,
    totalPaidDKK: Math.round(totalPaid),
    totalCostDKK: Math.round(totalPaid - principalDKK),
    points,
  };
}
