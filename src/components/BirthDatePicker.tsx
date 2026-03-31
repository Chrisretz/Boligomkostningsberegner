"use client";

import { da } from "date-fns/locale";
import { useEffect, useId, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  isCalendarDateValid,
  isValidBirthDate,
  parseIsoDateParts,
} from "@/lib/birthDate";

import "react-day-picker/style.css";

function toIso(y: number, m: number, d: number): string {
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

function isoToLocalDate(iso: string): Date | undefined {
  const p = parseIsoDateParts(iso);
  if (!p || !isCalendarDateValid(p.y, p.m, p.d)) return undefined;
  return new Date(p.y, p.m - 1, p.d);
}

function birthRange(): { minBirth: Date; maxBirth: Date } {
  const today = new Date();
  const maxBirth = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const minBirth = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  );
  return { minBirth, maxBirth };
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
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
  const { minBirth, maxBirth } = birthRange();
  const parsed = parseIsoDateParts(value);
  const selected = value ? isoToLocalDate(value) : undefined;

  const [month, setMonth] = useState<Date>(() => {
    const p = parseIsoDateParts(value);
    if (p) return new Date(p.y, p.m - 1, 1);
    const t = new Date();
    return new Date(t.getFullYear() - 35, t.getMonth(), 1);
  });

  useEffect(() => {
    const p = parseIsoDateParts(value);
    if (!p) return;
    setMonth(new Date(p.y, p.m - 1, 1));
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const p = parseIsoDateParts(value);
    const t = new Date();
    setMonth(
      p
        ? new Date(p.y, p.m - 1, 1)
        : new Date(t.getFullYear() - 35, t.getMonth(), 1)
    );
  }, [open, value]);

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
        className="w-full pl-11 pr-4 py-2.5 bg-white border border-border rounded-md text-body text-left text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary flex items-center gap-2 min-h-[46px] touch-manipulation disabled:opacity-60 relative"
      >
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
          <CalendarIcon />
        </span>
        <span className={displayLabel ? "flex-1" : "flex-1 text-text-muted"}>
          {displayLabel ?? "Klik for at vælge dato"}
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Vælg fødselsdato"
          className="birth-date-picker-popover absolute z-50 mt-2 left-0 w-[min(100vw-2rem,340px)] max-w-[calc(100vw-2rem)] rounded-md border border-border bg-white shadow-lg p-3 sm:p-4"
        >
          <div
            className="birth-date-picker-rdp [&_.rdp-root]:[--rdp-accent-color:#1E3A5F] [&_.rdp-root]:[--rdp-accent-background-color:#E8EEF5]"
          >
            <DayPicker
              mode="single"
              locale={da}
              weekStartsOn={1}
              month={month}
              onMonthChange={setMonth}
              startMonth={new Date(minBirth.getFullYear(), minBirth.getMonth(), 1)}
              endMonth={new Date(maxBirth.getFullYear(), maxBirth.getMonth(), 1)}
              selected={selected}
              onSelect={(date) => {
                if (!date) return;
                const iso = toIso(
                  date.getFullYear(),
                  date.getMonth() + 1,
                  date.getDate()
                );
                if (!isValidBirthDate(iso)) return;
                onChange(iso);
                setOpen(false);
              }}
              disabled={[{ before: minBirth }, { after: maxBirth }]}
              captionLayout="dropdown-years"
              reverseYears
              navLayout="around"
              showOutsideDays
              fixedWeeks
            />
          </div>
        </div>
      )}
    </div>
  );
}
