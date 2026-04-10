"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  submitArticleFeedback,
  type ArticleFeedbackState,
} from "@/app/actions/article-feedback";

const initialState: ArticleFeedbackState = { ok: false };

type ArticleFeedbackFormProps = {
  articlePath: string;
};

function fieldError(
  fieldErrors: ArticleFeedbackState["fieldErrors"],
  key: "name" | "email" | "message",
): string | undefined {
  const arr = fieldErrors?.[key];
  return arr?.[0];
}

function ArticleFeedbackFormInner({
  articlePath,
  onSendAnother,
}: ArticleFeedbackFormProps & { onSendAnother: () => void }) {
  const [state, formAction, isPending] = useActionState(
    submitArticleFeedback,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  const inputClass =
    "w-full px-4 py-2.5 bg-white border border-border rounded-md text-body text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary";

  if (state.ok) {
    return (
      <div className="rounded-lg border border-border bg-white p-6 shadow-soft">
        <h2 className="text-h3 text-text-primary mb-2">
          Tak for din henvendelse
        </h2>
        <p className="text-body text-text-secondary mb-4">
          Vi har modtaget din besked og vender tilbage på e-mail, når vi kan.
        </p>
        <button
          type="button"
          className="text-body font-medium text-brand-primary underline hover:no-underline"
          onClick={onSendAnother}
        >
          Send en ny besked
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-white p-6 shadow-soft">
      <h2 className="text-h3 text-text-primary mb-2">
        Har du et spørgsmål til artiklen?
      </h2>
      <p className="text-body text-text-secondary mb-6">
        Skriv til os herunder – vi læser alle henvendelser. Du kan også komme
        med forslag eller kommentarer til Boligklarhed.
      </p>

      <form
        ref={formRef}
        action={formAction}
        className="relative space-y-4"
      >
        <input type="hidden" name="articlePath" value={articlePath} />

        <div
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="article-feedback-website">Website</label>
          <input
            type="text"
            id="article-feedback-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor="article-feedback-name"
            className="mb-1.5 block text-small font-medium text-text-primary"
          >
            Navn
          </label>
          <input
            id="article-feedback-name"
            name="name"
            type="text"
            required
            maxLength={120}
            className={inputClass}
            autoComplete="name"
            aria-invalid={Boolean(fieldError(state.fieldErrors, "name"))}
            aria-describedby={
              fieldError(state.fieldErrors, "name")
                ? "article-feedback-name-err"
                : undefined
            }
          />
          {fieldError(state.fieldErrors, "name") ? (
            <p
              id="article-feedback-name-err"
              className="mt-1 text-small text-status-danger"
            >
              {fieldError(state.fieldErrors, "name")}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="article-feedback-email"
            className="mb-1.5 block text-small font-medium text-text-primary"
          >
            E-mail
          </label>
          <input
            id="article-feedback-email"
            name="email"
            type="email"
            required
            maxLength={254}
            className={inputClass}
            autoComplete="email"
            aria-invalid={Boolean(fieldError(state.fieldErrors, "email"))}
            aria-describedby={
              fieldError(state.fieldErrors, "email")
                ? "article-feedback-email-err"
                : undefined
            }
          />
          {fieldError(state.fieldErrors, "email") ? (
            <p
              id="article-feedback-email-err"
              className="mt-1 text-small text-status-danger"
            >
              {fieldError(state.fieldErrors, "email")}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="article-feedback-message"
            className="mb-1.5 block text-small font-medium text-text-primary"
          >
            Besked
          </label>
          <textarea
            id="article-feedback-message"
            name="message"
            required
            rows={5}
            maxLength={5000}
            className={`${inputClass} min-h-[120px] resize-y`}
            aria-invalid={Boolean(fieldError(state.fieldErrors, "message"))}
            aria-describedby={
              fieldError(state.fieldErrors, "message")
                ? "article-feedback-message-err"
                : undefined
            }
          />
          {fieldError(state.fieldErrors, "message") ? (
            <p
              id="article-feedback-message-err"
              className="mt-1 text-small text-status-danger"
            >
              {fieldError(state.fieldErrors, "message")}
            </p>
          ) : null}
        </div>

        {state.error ? (
          <p
            className="text-small text-status-danger bg-red-50 border border-red-200 rounded-md px-3 py-2"
            role="alert"
          >
            {state.error}
          </p>
        ) : null}

        <p className="text-help text-text-muted">
          Ved at sende accepterer du, at vi behandler dine oplysninger for at
          besvare dig. Læs mere i vores{" "}
          <Link
            href="/privacy"
            className="text-brand-primary underline hover:no-underline"
          >
            privatlivspolitik
          </Link>
          .
        </p>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-[48px] items-center justify-center px-6 py-3 text-body font-semibold text-white bg-brand-primary rounded-md hover:bg-brand-primaryHover transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Sender …" : "Send besked"}
        </button>
      </form>
    </div>
  );
}

export function ArticleFeedbackForm({ articlePath }: ArticleFeedbackFormProps) {
  const [instanceKey, setInstanceKey] = useState(0);
  return (
    <ArticleFeedbackFormInner
      key={instanceKey}
      articlePath={articlePath}
      onSendAnother={() => setInstanceKey((k) => k + 1)}
    />
  );
}
