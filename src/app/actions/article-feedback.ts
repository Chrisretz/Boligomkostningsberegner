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

/** Same wording as the form on article pages (`ArticleFeedbackForm`). */
const ARTICLE_FEEDBACK_HEADLINE = "Har du et spørgsmål eller en kommentar?";

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
    .min(1, "Skriv en besked")
    .max(5000, "Beskeden er for lang"),
  articlePath: z
    .string()
    .max(200)
    .regex(articlePathRegex, "Ugyldig artikelreference"),
});

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateByIp = new Map<string, number[]>();

/** Escapes user-controlled strings for HTML body and attributes. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMessageHtml(message: string): string {
  const escaped = escapeHtml(message);
  return escaped.replace(/\r\n|\r|\n/g, "<br />");
}

function buildArticleFeedbackHtml(params: {
  name: string;
  email: string;
  articleUrl: string;
  message: string;
}): string {
  const { name, email, articleUrl, message } = params;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const mailtoHref = escapeHtml(`mailto:${encodeURIComponent(email)}`);
  const safeUrl = escapeHtml(articleUrl);
  const safeMessage = formatMessageHtml(message);
  const safeHeadline = escapeHtml(ARTICLE_FEEDBACK_HEADLINE);

  return `<!DOCTYPE html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeHeadline}</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F7FA;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F4F7FA;padding:24px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
        <tr>
          <td style="background-color:#1E3A5F;color:#FFFFFF;padding:20px 24px;font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;font-size:18px;font-weight:600;line-height:1.3;">
            Boligklarhed
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;font-size:16px;line-height:1.6;color:#1F2933;">
            <p style="margin:0 0 20px;font-size:15px;font-weight:600;line-height:1.35;color:#1F2933;">
              ${safeHeadline}
            </p>
            <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#6B7280;">Navn</p>
            <p style="margin:0 0 18px;">${safeName}</p>
            <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#6B7280;">E-mail</p>
            <p style="margin:0 0 18px;">
              <a href="${mailtoHref}" style="color:#1E3A5F;text-decoration:underline;">${safeEmail}</a>
            </p>
            <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#6B7280;">Artikel</p>
            <p style="margin:0 0 10px;">
              <a href="${safeUrl}" style="display:inline-block;background-color:#1E3A5F;color:#FFFFFF;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:14px;font-weight:600;">Åbn artikel</a>
            </p>
            <p style="margin:0 0 22px;font-size:13px;word-break:break-all;">
              <a href="${safeUrl}" style="color:#1E40AF;text-decoration:underline;">${safeUrl}</a>
            </p>
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#6B7280;">Besked</p>
            <div style="margin:0;padding:16px 18px;background-color:#F4F7FA;border-left:4px solid #1E3A5F;border-radius:0 8px 8px 0;color:#1F2933;font-size:15px;line-height:1.55;">
              ${safeMessage}
            </div>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;font-size:12px;line-height:1.5;color:#9CA3AF;max-width:560px;">
        Svar ved at bruge &quot;Svar&quot; i din mailklient – afsenderens adresse er sat som svar til.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`;
}

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
  const plainText = [
    ARTICLE_FEEDBACK_HEADLINE,
    "",
    `Navn: ${parsed.data.name}`,
    `E-mail: ${parsed.data.email}`,
    `Artikel: ${fullUrl}`,
    "",
    "Besked:",
    parsed.data.message,
  ].join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: parsed.data.email,
    subject: `[Boligklarhed] ${ARTICLE_FEEDBACK_HEADLINE} – ${parsed.data.name}`,
    text: plainText,
    html: buildArticleFeedbackHtml({
      name: parsed.data.name,
      email: parsed.data.email,
      articleUrl: fullUrl,
      message: parsed.data.message,
    }),
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
