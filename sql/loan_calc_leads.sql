-- Kør mod din PostgreSQL-database (fx Neon, Supabase, RDS).
-- Tilpas evt. skemanavn.

CREATE TABLE IF NOT EXISTS loan_calc_leads (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL,
  birth_date DATE NOT NULL,
  calculator_id TEXT NOT NULL,
  consent_transactional BOOLEAN NOT NULL,
  consent_marketing_partners BOOLEAN NOT NULL,
  consent_version TEXT NOT NULL,
  input_mode TEXT NOT NULL,
  annual_income_dkk INTEGER NOT NULL,
  existing_debt_dkk INTEGER NOT NULL,
  income_bucket TEXT NOT NULL,
  debt_bucket TEXT NOT NULL,
  max_loan_dkk INTEGER NOT NULL,
  estimated_purchase_dkk INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_loan_calc_leads_created_at ON loan_calc_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_loan_calc_leads_email_normalized ON loan_calc_leads (email_normalized);
