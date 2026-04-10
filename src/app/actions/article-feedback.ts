"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { SITE_URL } from "@/lib/site";

export type ArticleFeedbackState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string[]>>;
};

const articlePathRegex = /^\/artikler\/[a-z0-9-]+$/i;

const feedbackSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Angiv dit navn")
    .max(120, "Navnet er for langt"),
  email: z
    .string()
    .trim()
    .email("Ugyldig e-mailadresse")
    .max(254, "E-mailen er for lang"),
  message: z
    .string()
    .trim()
    .min(20, "Skriv mindst 20 tegn")
    .max(5000, "Beskeden er for lang"),
  articlePath: z
    .string()
    .max(200)
    .regex(articlePathRegex, "Ugyldig artikelreference"),
});

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateByIp = new Map<string, number[]>();

async function getClientIp(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip")?.trim() || "unknown";
}

function allowRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const prev = (rateByIp.get(ip) || []).filter((t) => t > windowStart);
  if (prev.length >= RATE_MAX) return false;
  prev.push(now);
  rateByIp.set(ip, prev);
  return true;
}

export async function submitArticleFeedback(
  _prev: ArticleFeedbackState,
  formData: FormData,
): Promise<ArticleFeedbackState> {
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot.length > 0) {
    return { ok: true };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    articlePath: formData.get("articlePath"),
  };

  const parsed = feedbackSchema.safeParse({
    name: typeof raw.name === "string" ? raw.name : "",
    email: typeof raw.email === "string" ? raw.email : "",
    message: typeof raw.message === "string" ? raw.message : "",
    articlePath: typeof raw.articlePath === "string" ? raw.articlePath : "",
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      ok: false,
      error: "Tjek felterne nedenfor.",
      fieldErrors: flat.fieldErrors,
    };
  }

  const ip = await getClientIp();
  if (!allowRateLimit(ip)) {
    return {
      ok: false,
      error: "For mange forsøg fra denne forbindelse. Prøv igen om lidt.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY mangler");
    return {
      ok: false,
      error:
        "E-mail kunne ikke sendes (konfiguration). Skriv til os på info@boligklarhed.dk.",
    };
  }

  const to =
    process.env.ARTICLE_FEEDBACK_TO_EMAIL?.trim() || "info@boligklarhed.dk";
  const from =
    process.env.ARTICLE_FEEDBACK_FROM_EMAIL?.trim() ||
    "Boligklarhed <onboarding@resend.dev>";

  const path = parsed.data.articlePath;
  const fullUrl = `${SITE_URL}${path}`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: parsed.data.email,
    subject: `[Boligklarhed] Spørgsmål fra artikel – ${parsed.data.name}`,
    text: [
      `Navn: ${parsed.data.name}`,
      `E-mail: ${parsed.data.email}`,
      `Artikel: ${fullUrl}`,
      "",
      "Besked:",
      parsed.data.message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend:", error);
    return {
      ok: false,
      error: "E-mail kunne ikke sendes. Prøv igen senere.",
    };
  }

  return { ok: true };
}
