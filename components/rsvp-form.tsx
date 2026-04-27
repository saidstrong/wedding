"use client";

import { FormEvent, useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { AttendanceStatus } from "@/lib/supabase/types";
import { weddingContent } from "@/lib/wedding-content";

type ResultState = {
  tone: "success" | "error";
  title: string;
  detail?: string;
};

export function RsvpForm() {
  const [attendance, setAttendance] = useState<AttendanceStatus>("attending");
  const [guestCount, setGuestCount] = useState<"1" | "2">("1");
  const [secondGuestName, setSecondGuestName] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<ResultState | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const isAttending = attendance === "attending";
    const fullName = String(formData.get("fullName") ?? "").trim();
    const nextSecondGuestName = String(formData.get("secondGuestName") ?? "").trim();
    const comment = String(formData.get("comment") ?? "").trim();
    const payload: {
      full_name: string;
      attendance_status: AttendanceStatus;
      guest_count: number | null;
      note: string | null;
      second_guest_name?: string;
    } = {
      full_name: fullName,
      attendance_status: attendance,
      guest_count: isAttending ? Number(guestCount) : null,
      note: comment || null,
    };

    if (isAttending && guestCount === "2") {
      payload.second_guest_name = nextSecondGuestName;
    }

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("rsvps").insert(payload);

      if (error) {
        throw error;
      }

      form.reset();
      setAttendance("attending");
      setGuestCount("1");
      setSecondGuestName("");
      setResult({
        tone: "success",
        title: weddingContent.rsvp.success,
        detail: isAttending
          ? weddingContent.rsvp.successAttendingDetail
          : weddingContent.rsvp.successNotAttendingDetail,
      });
    } catch {
      setResult({
        tone: "error",
        title: weddingContent.rsvp.failure,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/70 bg-white/60 px-5 py-6 shadow-[0_22px_56px_rgba(61,47,26,0.06)] backdrop-blur sm:px-7 sm:py-8"
    >
      <div className="grid gap-5">
        {result ? (
          <div
            className={`rounded-[1.7rem] border px-5 py-6 text-center ${
              result.tone === "success"
                ? "border-gold/22 bg-[linear-gradient(180deg,rgba(184,154,94,0.12),rgba(255,255,255,0.82))]"
                : "border-red-200 bg-red-50/90"
            }`}
            aria-live="polite"
          >
            <div
              className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border ${
                result.tone === "success"
                  ? "border-gold/24 bg-white/80 text-gold"
                  : "border-red-200 bg-white/85 text-red-500"
              }`}
            >
              <span className="font-display text-xl">
                {result.tone === "success" ? "OK" : "!"}
              </span>
            </div>
            <p className="mt-4 font-display text-[1.55rem] leading-tight text-charcoal sm:text-[1.8rem]">
              {result.title}
            </p>
            {result.detail ? (
              <p className="mt-2 text-sm leading-7 text-taupe sm:text-base">
                {result.detail}
              </p>
            ) : null}
          </div>
        ) : null}

        <fieldset className="grid gap-3">
          <legend className="sr-only">
            {weddingContent.rsvp.attendanceLegend}
          </legend>

          <div className="grid gap-3 sm:grid-cols-2">
            <label
              className={`cursor-pointer rounded-[1.5rem] border px-4 py-4 text-center transition ${
                attendance === "attending"
                  ? "border-gold/35 bg-[linear-gradient(180deg,rgba(184,154,94,0.16),rgba(255,255,255,0.84))] shadow-[0_14px_30px_rgba(61,47,26,0.05)]"
                  : "border-gold/15 bg-white/72 hover:border-gold/30"
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
              <span className="block font-display text-[1.7rem] leading-tight text-charcoal">
                {weddingContent.rsvp.attendingTitle}
              </span>
              <span className="mt-2 block text-sm leading-7 text-taupe">
                {weddingContent.rsvp.attendingDescription}
              </span>
            </label>

            <label
              className={`cursor-pointer rounded-[1.5rem] border px-4 py-4 text-center transition ${
                attendance === "not_attending"
                  ? "border-gold/35 bg-[linear-gradient(180deg,rgba(184,154,94,0.16),rgba(255,255,255,0.84))] shadow-[0_14px_30px_rgba(61,47,26,0.05)]"
                  : "border-gold/15 bg-white/72 hover:border-gold/30"
              }`}
            >
              <input
                type="radio"
                name="attendance"
                value="not_attending"
                checked={attendance === "not_attending"}
                onChange={() => {
                  setAttendance("not_attending");
                  setGuestCount("1");
                  setSecondGuestName("");
                }}
                className="sr-only"
              />
              <span className="block font-display text-[1.7rem] leading-tight text-charcoal">
                {weddingContent.rsvp.notAttendingTitle}
              </span>
              <span className="mt-2 block text-sm leading-7 text-taupe">
                {weddingContent.rsvp.notAttendingDescription}
              </span>
            </label>
          </div>
        </fieldset>

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          {weddingContent.rsvp.fullNameLabel}
          <input
            name="fullName"
            required
            minLength={2}
            maxLength={120}
            placeholder={weddingContent.rsvp.fullNamePlaceholder}
            className="min-h-14 rounded-[1.25rem] border border-gold/14 bg-white/82 px-4 text-base outline-none transition focus:border-gold/36 focus:ring-2 focus:ring-gold/16"
          />
        </label>

        {attendance === "attending" ? (
          <label className="grid gap-2 text-sm font-medium text-charcoal">
            {weddingContent.rsvp.guestCountLabel}
            <select
              name="guestCount"
              value={guestCount}
              onChange={(event) => {
                const nextGuestCount = event.target.value as "1" | "2";
                setGuestCount(nextGuestCount);

                if (nextGuestCount === "1") {
                  setSecondGuestName("");
                }
              }}
              className="min-h-14 rounded-[1.25rem] border border-gold/14 bg-white/82 px-4 text-base outline-none transition focus:border-gold/36 focus:ring-2 focus:ring-gold/16"
            >
              <option value="1">{weddingContent.rsvp.guestCountSingle}</option>
              <option value="2">{weddingContent.rsvp.guestCountDouble}</option>
            </select>
          </label>
        ) : null}

        {attendance === "attending" && guestCount === "2" ? (
          <label className="grid gap-2 text-sm font-medium text-charcoal">
            {weddingContent.rsvp.secondGuestLabel}
            <input
              name="secondGuestName"
              value={secondGuestName}
              onChange={(event) => setSecondGuestName(event.target.value)}
              required
              minLength={2}
              maxLength={120}
              placeholder={weddingContent.rsvp.secondGuestPlaceholder}
              className="min-h-14 rounded-[1.25rem] border border-gold/14 bg-white/82 px-4 text-base outline-none transition focus:border-gold/36 focus:ring-2 focus:ring-gold/16"
            />
          </label>
        ) : null}

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          {weddingContent.rsvp.commentLabel}
          <textarea
            name="comment"
            rows={4}
            maxLength={600}
            placeholder={weddingContent.rsvp.commentPlaceholder}
            className="min-h-[7.5rem] rounded-[1.25rem] border border-gold/14 bg-white/82 px-4 py-4 text-base outline-none transition focus:border-gold/36 focus:ring-2 focus:ring-gold/16"
          />
        </label>

        <button
          type="submit"
          disabled={pending}
          className="primary-button min-h-[3.35rem] w-full"
        >
          {pending
            ? weddingContent.rsvp.pendingLabel
            : weddingContent.rsvp.submitLabel}
        </button>
      </div>
    </form>
  );
}
