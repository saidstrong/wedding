"use client";

import { useState } from "react";

type DetailsActionsProps = {
  address: string;
  mapUrl: string;
  mapLabel?: string;
  mapIconSrc?: string;
  copyLabel?: string;
  calendarUrl?: string;
  calendarLabel?: string;
};

export function DetailsActions({
  address,
  mapUrl,
  mapLabel = "2GIS",
  mapIconSrc,
  copyLabel = "Мекенжайды көшіру",
  calendarUrl,
  calendarLabel = "Күнтізбеге қосу",
}: DetailsActionsProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
      setFeedback("Мекенжай көшірілді.");
      window.setTimeout(() => setFeedback(null), 2200);
    } catch {
      setFeedback("Көшіру сәтсіз аяқталды.");
      window.setTimeout(() => setFeedback(null), 2200);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="ghost-button gap-2"
        >
          {mapIconSrc ? (
            <img src={mapIconSrc} alt="" className="h-5 w-5 rounded-[0.45rem]" />
          ) : null}
          <span>{mapLabel}</span>
        </a>

        <button type="button" onClick={handleCopy} className="ghost-button">
          {copyLabel}
        </button>

        {calendarUrl ? (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="ghost-button"
          >
            {calendarLabel}
          </a>
        ) : null}
      </div>

      <p className="mt-3 min-h-5 text-sm text-gold" aria-live="polite">
        {feedback}
      </p>
    </div>
  );
}
