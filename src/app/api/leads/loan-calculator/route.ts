import { NextResponse } from "next/server";
import { z } from "zod";
import { Pool } from "pg";
import {
  bucketAnnualIncome,
  bucketExistingDebt,
} from "@/lib/leadBuckets";
import { LOAN_CALCULATOR_ID, LOAN_LEAD_CONSENT_VERSION } from "@/lib/loanCapacityConstants";

export const runtime = "nodejs";

/** Vercel + Neon integration bruger ofte DATABASE_POSTGRES_URL; ellers DATABASE_URL. */
function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL || process.env.DATABASE_POSTGRES_URL;
}

const bodySchema = z.object({
  email: z.string().trim().email().max(320),
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
      { error: "Tjek e-mail og afkrydsninger, og prøv igen." },
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
        email, email_normalized, calculator_id,
        consent_transactional, consent_marketing_partners, consent_version,
        input_mode, annual_income_dkk, existing_debt_dkk,
        income_bucket, debt_bucket, max_loan_dkk, estimated_purchase_dkk
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        body.email,
        emailNormalized,
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
    console.error("[api/leads/loan-calculator] DB insert failed:", e);
    return NextResponse.json(
      { error: "Kunne ikke gemme. Prøv igen om lidt." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
