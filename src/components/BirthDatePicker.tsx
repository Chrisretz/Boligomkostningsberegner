"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  daysInMonth,
  isCalendarDateValid,
  isValidBirthDate,
  parseIsoDateParts,
} from "@/lib/birthDate";

const MONTHS_DA = [
  "januar",
  "februar",
  "marts",
  "april",
  "maj",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "december",
] as const;

function defaultYmd(): { y: number; m: number; d: number } {
  const now = new Date();
  const y = now.getFullYear() - 35;
  return { y, m: 6, d: 15 };
}

function clampDay(y: number, m: number, d: number): number {
  const max = daysInMonth(y, m);
  return Math.min(Math.max(1, d), max);
}

function toIso(y: number, m: number, d: number): string {
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

export type BirthDatePickerProps = {
  id: string;
  value: string;
  onChange: (iso: string) => void;
  disabled?: boolean;
};

export function BirthDatePicker({
  id,
  value,
  onChange,
  disabled,
}: BirthDatePickerProps) {
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [panelError, setPanelError] = useState<string | null>(null);
  const def = defaultYmd();
  const [y, setY] = useState(def.y);
  const [m, setM] = useState(def.m);
  const [d, setD] = useState(() => clampDay(def.y, def.m, def.d));
  const parsed = parseIsoDateParts(value);

  useEffect(() => {
    const p = parseIsoDateParts(value);
    if (!p) return;
    setY(p.y);
    setM(p.m);
    setD(clampDay(p.y, p.m, p.d));
  }, [value]);

  useEffect(() => {
    if (!open) return;
    setPanelError(null);
    const p = parseIsoDateParts(value);
    if (p) {
      setY(p.y);
      setM(p.m);
      setD(clampDay(p.y, p.m, p.d));
    } else {
      const b = defaultYmd();
      setY(b.y);
      setM(b.m);
      setD(clampDay(b.y, b.m, b.d));
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const maxYear = new Date().getFullYear() - 18;
  const minYear = new Date().getFullYear() - 100;
  const years: number[] = [];
  for (let yr = maxYear; yr >= minYear; yr--) years.push(yr);

  const maxD = daysInMonth(y, m);
  const days = Array.from({ length: maxD }, (_, i) => i + 1);

  const displayLabel =
    parsed && isCalendarDateValid(parsed.y, parsed.m, parsed.d)
      ? new Date(parsed.y, parsed.m - 1, parsed.d).toLocaleDateString(
          "da-DK",
          { day: "numeric", month: "long", year: "numeric" }
        )
      : null;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={panelId}
        onClick={() => !disabled && setOpen((o) => !o)}
        className="w-full px-4 py-2.5 bg-white border border-border rounded-md text-body text-left text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary flex items-center justify-between gap-2 min-h-[46px] touch-manipulation disabled:opacity-60"
      >
        <span className={displayLabel ? "" : "text-text-muted"}>
          {displayLabel ?? "Vælg dato i kalenderen"}
        </span>
        <span className="text-text-muted shrink-0 text-small" aria-hidden>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Vælg fødselsdato"
          className="absolute z-50 mt-2 left-0 right-0 rounded-md border border-border bg-white shadow-lg p-4 space-y-3"
        >
          <p className="text-small font-medium text-text-primary">
            Vælg år, måned og dag
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor={`${id}-y`}
                className="block text-small text-text-secondary mb-1"
              >
                År
              </label>
              <select
                id={`${id}-y`}
                className="w-full px-3 py-2.5 border border-border rounded-md text-body bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary touch-manipulation"
                value={y}
                onChange={(e) => {
                  const nextY = Number(e.target.value);
                  setY(nextY);
                  setD((prev) => clampDay(nextY, m, prev));
                }}
              >
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor={`${id}-m`}
                className="block text-small text-text-secondary mb-1"
              >
                Måned
              </label>
              <select
                id={`${id}-m`}
                className="w-full px-3 py-2.5 border border-border rounded-md text-body bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary touch-manipulation"
                value={m}
                onChange={(e) => {
                  const nextM = Number(e.target.value);
                  setM(nextM);
                  setD((prev) => clampDay(y, nextM, prev));
                }}
              >
                {MONTHS_DA.map((name, i) => (
                  <option key={name} value={i + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor={`${id}-d`}
                className="block text-small text-text-secondary mb-1"
              >
                Dag
              </label>
              <select
                id={`${id}-d`}
                className="w-full px-3 py-2.5 border border-border rounded-md text-body bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary touch-manipulation"
                value={Math.min(d, maxD)}
                onChange={(e) => setD(Number(e.target.value))}
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {panelError && (
            <p className="text-small text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {panelError}
            </p>
          )}
          <button
            type="button"
            className="w-full sm:w-auto min-h-[44px] px-4 py-2 text-small font-medium rounded-md bg-brand-primary text-white hover:opacity-90 touch-manipulation"
            onClick={() => {
              const day = clampDay(y, m, d);
              const iso = toIso(y, m, day);
              if (!isCalendarDateValid(y, m, day) || !isValidBirthDate(iso)) {
                setPanelError(
                  "Vælg en gyldig dato. Du skal være mellem 18 og 100 år."
                );
                return;
              }
              setPanelError(null);
              onChange(iso);
              setOpen(false);
            }}
          >
            Færdig
          </button>
        </div>
      )}
    </div>
  );
}
