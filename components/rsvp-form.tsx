"use client";

import { FormEvent, useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { RsvpContent } from "@/lib/invitations/types";
import type { AttendanceStatus } from "@/lib/supabase/types";

type ResultState = {
  tone: "success" | "error";
  title: string;
  detail?: string;
};

type RsvpFormProps = {
  invitationSlug: string;
  content: RsvpContent;
};

export function RsvpForm({ invitationSlug, content }: RsvpFormProps) {
  const [attendance, setAttendance] = useState<AttendanceStatus>("attending");
  const [guestCount, setGuestCount] = useState<"1" | "2">("1");
  const [secondGuestName, setSecondGuestName] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<ResultState | null>(null);
  const attendingSelected = attendance === "attending";
  const notAttendingSelected = attendance === "not_attending";

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
      invitation_slug: string;
    } = {
      full_name: fullName,
      attendance_status: attendance,
      guest_count: isAttending ? Number(guestCount) : null,
      note: comment || null,
      invitation_slug: invitationSlug,
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
        title: content.success,
        detail: isAttending
          ? content.successAttendingDetail
          : content.successNotAttendingDetail,
      });
    } catch {
      setResult({
        tone: "error",
        title: content.failure,
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
            {content.attendanceLegend}
          </legend>

          <div className="grid gap-3 sm:grid-cols-2">
            <label
              className={`relative cursor-pointer rounded-[1.5rem] border px-4 py-4 text-center transition duration-300 ${
                attendingSelected
                  ? "border-gold/55 bg-[linear-gradient(180deg,rgba(184,154,94,0.32),rgba(255,248,236,0.96))] shadow-[0_18px_38px_rgba(61,47,26,0.09)] ring-1 ring-gold/18"
                  : "border-white/80 bg-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] hover:border-gold/24 hover:bg-white/82"
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
              <span
                className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border text-[0.7rem] font-semibold transition ${
                  attendingSelected
                    ? "border-gold/50 bg-gold text-charcoal shadow-[0_6px_14px_rgba(184,154,94,0.32)]"
                    : "border-gold/18 bg-white/90 text-transparent"
                }`}
                aria-hidden="true"
              >
                •
              </span>
              <span
                className={`block font-display text-[1.7rem] leading-tight ${
                  attendingSelected ? "text-charcoal" : "text-charcoal/82"
                }`}
              >
                {content.attendingTitle}
              </span>
              <span
                className={`mt-2 block text-sm leading-7 ${
                  attendingSelected ? "text-charcoal/78" : "text-taupe"
                }`}
              >
                {content.attendingDescription}
              </span>
            </label>

            <label
              className={`relative cursor-pointer rounded-[1.5rem] border px-4 py-4 text-center transition duration-300 ${
                notAttendingSelected
                  ? "border-gold/55 bg-[linear-gradient(180deg,rgba(184,154,94,0.32),rgba(255,248,236,0.96))] shadow-[0_18px_38px_rgba(61,47,26,0.09)] ring-1 ring-gold/18"
                  : "border-white/80 bg-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] hover:border-gold/24 hover:bg-white/82"
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
              <span
                className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border text-[0.7rem] font-semibold transition ${
                  notAttendingSelected
                    ? "border-gold/50 bg-gold text-charcoal shadow-[0_6px_14px_rgba(184,154,94,0.32)]"
                    : "border-gold/18 bg-white/90 text-transparent"
                }`}
                aria-hidden="true"
              >
                •
              </span>
              <span
                className={`block font-display text-[1.7rem] leading-tight ${
                  notAttendingSelected ? "text-charcoal" : "text-charcoal/82"
                }`}
              >
                {content.notAttendingTitle}
              </span>
              <span
                className={`mt-2 block text-sm leading-7 ${
                  notAttendingSelected ? "text-charcoal/78" : "text-taupe"
                }`}
              >
                {content.notAttendingDescription}
              </span>
            </label>
          </div>
        </fieldset>

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          {content.fullNameLabel}
          <input
            name="fullName"
            required
            minLength={2}
            maxLength={120}
            placeholder={content.fullNamePlaceholder}
            className="min-h-14 rounded-[1.25rem] border border-gold/14 bg-white/82 px-4 text-base outline-none transition focus:border-gold/36 focus:ring-2 focus:ring-gold/16"
          />
        </label>

        {attendance === "attending" ? (
          <label className="grid gap-2 text-sm font-medium text-charcoal">
            {content.guestCountLabel}
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
              <option value="1">{content.guestCountSingle}</option>
              <option value="2">{content.guestCountDouble}</option>
            </select>
          </label>
        ) : null}

        {attendance === "attending" && guestCount === "2" ? (
          <label className="grid gap-2 text-sm font-medium text-charcoal">
            {content.secondGuestLabel}
            <input
              name="secondGuestName"
              value={secondGuestName}
              onChange={(event) => setSecondGuestName(event.target.value)}
              required
              minLength={2}
              maxLength={120}
              placeholder={content.secondGuestPlaceholder}
              className="min-h-14 rounded-[1.25rem] border border-gold/14 bg-white/82 px-4 text-base outline-none transition focus:border-gold/36 focus:ring-2 focus:ring-gold/16"
            />
          </label>
        ) : null}

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          {content.commentLabel}
          <textarea
            name="comment"
            rows={4}
            maxLength={600}
            placeholder={content.commentPlaceholder}
            className="min-h-[7.5rem] rounded-[1.25rem] border border-gold/14 bg-white/82 px-4 py-4 text-base outline-none transition focus:border-gold/36 focus:ring-2 focus:ring-gold/16"
          />
        </label>

        <button
          type="submit"
          disabled={pending}
          className="primary-button min-h-[3.35rem] w-full"
        >
          {pending
            ? content.pendingLabel
            : content.submitLabel}
        </button>
      </div>
    </form>
  );
}
