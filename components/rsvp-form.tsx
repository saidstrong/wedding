"use client";

import { FormEvent, useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { AttendanceStatus } from "@/lib/supabase/types";
import { weddingContent } from "@/lib/wedding-content";

export function RsvpForm() {
  const [attendance, setAttendance] = useState<AttendanceStatus>("attending");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullName = String(formData.get("fullName") ?? "").trim();
    const plusOne = String(formData.get("plusOne") ?? "").trim();
    const comment = String(formData.get("comment") ?? "").trim();

    const noteParts = [
      plusOne ? `Жұбайы / spouse: ${plusOne}` : null,
      comment ? `Пікір / comment: ${comment}` : null,
    ].filter(Boolean);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("rsvps").insert({
        full_name: fullName,
        attendance_status: attendance,
        guest_count: attendance === "attending" ? (plusOne ? 2 : 1) : null,
        note: noteParts.length > 0 ? noteParts.join("\n") : null,
      });

      if (error) {
        throw error;
      }

      form.reset();
      setAttendance("attending");
      setResult({
        tone: "success",
        message: weddingContent.rsvp.success,
      });
    } catch {
      setResult({
        tone: "error",
        message: weddingContent.rsvp.failure,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2.2rem] border border-white/65 bg-white/56 px-5 py-6 shadow-[0_24px_60px_rgba(61,47,26,0.06)] backdrop-blur sm:px-7 sm:py-8"
    >
      <div className="grid gap-6">
        <div className="flex justify-end">
          <div className="rounded-full border border-gold/12 bg-white/72 px-4 py-2 text-sm text-taupe">
            {weddingContent.rsvp.formDuration}
          </div>
        </div>

        {result ? (
          <div
            className={`rounded-[1.35rem] border px-4 py-3 text-sm leading-7 ${
              result.tone === "success"
                ? "border-gold/25 bg-gold/10 text-charcoal"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
            aria-live="polite"
          >
            {result.message}
          </div>
        ) : null}

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          {weddingContent.rsvp.fullNameLabel}
          <input
            name="fullName"
            required
            minLength={2}
            maxLength={120}
            placeholder={weddingContent.rsvp.fullNamePlaceholder}
            className="min-h-14 rounded-[1.3rem] border border-gold/15 bg-white/80 px-4 text-base outline-none transition focus:border-gold/40 focus:ring-2 focus:ring-gold/18"
          />
        </label>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium text-charcoal">
            {weddingContent.rsvp.attendanceLegend}
          </legend>

          <div className="grid gap-3 sm:grid-cols-2">
            <label
              className={`cursor-pointer rounded-[1.45rem] border p-4 transition hover:border-gold/35 ${
                attendance === "attending"
                  ? "border-gold/40 bg-[linear-gradient(180deg,rgba(184,154,94,0.12),rgba(255,255,255,0.7))]"
                  : "border-gold/15 bg-white/68"
              }`}
            >
              <input
                type="radio"
                name="attendance"
                value="attending"
                checked={attendance === "attending"}
                onChange={() => setAttendance("attending")}
                className="sr-only"
              />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold">
                {weddingContent.rsvp.attendingLabel}
              </span>
              <span className="mt-3 block font-display text-[1.9rem] text-charcoal">
                {weddingContent.rsvp.attendingTitle}
              </span>
              <span className="mt-2 block text-sm leading-7 text-taupe">
                {weddingContent.rsvp.attendingDescription}
              </span>
            </label>

            <label
              className={`cursor-pointer rounded-[1.45rem] border p-4 transition hover:border-gold/35 ${
                attendance === "not_attending"
                  ? "border-gold/40 bg-[linear-gradient(180deg,rgba(184,154,94,0.12),rgba(255,255,255,0.7))]"
                  : "border-gold/15 bg-white/68"
              }`}
            >
              <input
                type="radio"
                name="attendance"
                value="not_attending"
                checked={attendance === "not_attending"}
                onChange={() => setAttendance("not_attending")}
                className="sr-only"
              />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold">
                {weddingContent.rsvp.notAttendingLabel}
              </span>
              <span className="mt-3 block font-display text-[1.9rem] text-charcoal">
                {weddingContent.rsvp.notAttendingTitle}
              </span>
              <span className="mt-2 block text-sm leading-7 text-taupe">
                {weddingContent.rsvp.notAttendingDescription}
              </span>
            </label>
          </div>
        </fieldset>

        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-charcoal">
            {weddingContent.rsvp.plusOneLabel}
            <input
              name="plusOne"
              maxLength={120}
              placeholder={weddingContent.rsvp.plusOnePlaceholder}
              className="min-h-14 rounded-[1.3rem] border border-gold/15 bg-white/80 px-4 text-base outline-none transition focus:border-gold/40 focus:ring-2 focus:ring-gold/18"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-charcoal">
            {weddingContent.rsvp.commentLabel}
            <textarea
              name="comment"
              rows={4}
              maxLength={600}
              placeholder={weddingContent.rsvp.commentPlaceholder}
              className="min-h-[8.5rem] rounded-[1.3rem] border border-gold/15 bg-white/80 px-4 py-4 text-base outline-none transition focus:border-gold/40 focus:ring-2 focus:ring-gold/18"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4 border-t border-gold/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-sm leading-7 text-taupe">
            {weddingContent.rsvp.privacyNote}
          </p>

          <button
            type="submit"
            disabled={pending}
            className="primary-button min-w-[13rem]"
          >
            {pending
              ? weddingContent.rsvp.pendingLabel
              : weddingContent.rsvp.submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
