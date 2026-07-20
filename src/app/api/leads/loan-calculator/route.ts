import { NextResponse } from "next/server";
import { z } from "zod";
import { Pool } from "pg";
import { Resend } from "resend";
import {
  buildLeadEmailHtml,
  buildLeadEmailSubject,
  buildLeadEmailText,
  type LeadEmailData,
} from "@/lib/leadEmail";
import {
  bucketAnnualIncome,
  bucketExistingDebt,
} from "@/lib/leadBuckets";
import { isValidBirthDate } from "@/lib/birthDate";
import { LOAN_CALCULATOR_ID, LOAN_LEAD_CONSENT_VERSION } from "@/lib/loanCapacityConstants";

export const runtime = "nodejs";

/** Vercel + Neon integration bruger ofte DATABASE_POSTGRES_URL; ellers DATABASE_URL. */
function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL || process.env.DATABASE_POSTGRES_URL;
}

const bodySchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(320),
  birthDate: z.string().refine((s) => isValidBirthDate(s), {
    message: "Ugyldig fødselsdato.",
  }),
  consentTransactional: z.literal(true),
  consentMarketingPartners: z.boolean(),
  consentVersion: z.string().min(1).max(64),
  calculatorId: z.literal(LOAN_CALCULATOR_ID),
  inputMode: z.enum(["annual", "monthly"]),
  annualIncomeDkk: z.number().int().min(0).max(50_000_000),
  existingDebtDkk: z.number().int().min(0).max(50_000_000),
  maxLoanDkk: z.number().int().min(0).max(50_000_000),
  estimatedPurchaseDkk: z.number().int().min(0).max(100_000_000),
  website: z.string().max(200).optional(),
});

let pool: Pool | null = null;

/**
 * Sender beregningen til brugeren. Fejler lydløst (logges), så en
 * mailfejl ikke får hele indsendelsen til at fremstå mislykket.
 */
async function sendLeadEmail(to: string, data: LeadEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.LEAD_FROM_EMAIL?.trim() ||
    process.env.ARTICLE_FEEDBACK_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    console.warn(
      "[api/leads/loan-calculator] RESEND_API_KEY eller afsender mangler – beregning ikke sendt på e-mail."
    );
    return;
  }
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: buildLeadEmailSubject(),
      text: buildLeadEmailText(data),
      html: buildLeadEmailHtml(data),
    });
    if (error) console.error("[api/leads/loan-calculator] Resend:", error);
  } catch (e) {
    console.error("[api/leads/loan-calculator] Mail-fejl:", e);
  }
}

function getPool(): Pool | null {
  const url = getDatabaseUrl();
  if (!url) return null;
  if (!pool) {
    pool = new Pool({ connectionString: url, max: 3 });
  }
  return pool;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørgsel." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          "Tjek navn, e-mail, fødselsdato og afkrydsninger, og prøv igen.",
      },
      { status: 400 }
    );
  }

  const body = parsed.data;

  if (body.website?.trim()) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (body.consentVersion !== LOAN_LEAD_CONSENT_VERSION) {
    return NextResponse.json({ error: "Forældet samtykkeversion. Genindlæs siden." }, { status: 400 });
  }

  const incomeBucket = bucketAnnualIncome(body.annualIncomeDkk);
  const debtBucket = bucketExistingDebt(body.existingDebtDkk);
  const emailNormalized = body.email.toLowerCase();

  const db = getPool();
  const isDev = process.env.NODE_ENV === "development";

  if (!db) {
    if (isDev) {
      console.warn(
        "[api/leads/loan-calculator] DATABASE_URL / DATABASE_POSTGRES_URL mangler – lead gemmes ikke (kun udvikling)."
      );
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      {
        error:
          "Vi kan ikke gemme din henvendelse lige nu. Prøv igen senere, eller kontakt os.",
      },
      { status: 503 }
    );
  }

  try {
    await db.query(
      `INSERT INTO loan_calc_leads (
        email, email_normalized, first_name, last_name, birth_date, calculator_id,
        consent_transactional, consent_marketing_partners, consent_version,
        input_mode, annual_income_dkk, existing_debt_dkk,
        income_bucket, debt_bucket, max_loan_dkk, estimated_purchase_dkk
      ) VALUES ($1, $2, $3, $4, $5::date, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
        body.email,
        emailNormalized,
        body.firstName,
        body.lastName,
        body.birthDate,
        body.calculatorId,
        true,
        body.consentMarketingPartners,
        body.consentVersion,
        body.inputMode,
        body.annualIncomeDkk,
        body.existingDebtDkk,
        incomeBucket,
        debtBucket,
        body.maxLoanDkk,
        body.estimatedPurchaseDkk,
      ]
    );
  } catch (e) {
    const pg = e as { code?: string; detail?: string; message?: string };
    console.error(
      "[api/leads/loan-calculator] DB insert failed:",
      pg.code ?? "no-code",
      pg.message ?? e,
      pg.detail ? `detail: ${pg.detail}` : ""
    );
    return NextResponse.json(
      { error: "Kunne ikke gemme. Prøv igen om lidt." },
      { status: 500 }
    );
  }

  await sendLeadEmail(body.email, {
    firstName: body.firstName,
    annualIncomeDkk: body.annualIncomeDkk,
    existingDebtDkk: body.existingDebtDkk,
    maxLoanDkk: body.maxLoanDkk,
    estimatedPurchaseDkk: body.estimatedPurchaseDkk,
  });

  return NextResponse.json({ ok: true });
}
