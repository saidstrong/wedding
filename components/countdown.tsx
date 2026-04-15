"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string;
  note: string;
  completeLabel: string;
};

type CountdownState = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  complete: boolean;
};

function toDisplay(value: number) {
  return String(value).padStart(2, "0");
}

function getCountdownState(targetDate: string): CountdownState {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const distance = target - now;

  if (distance <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      complete: true,
    };
  }

  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: toDisplay(days),
    hours: toDisplay(hours),
    minutes: toDisplay(minutes),
    seconds: toDisplay(seconds),
    complete: false,
  };
}

export function Countdown({
  targetDate,
  note,
  completeLabel,
}: CountdownProps) {
  const [countdown, setCountdown] = useState(() => getCountdownState(targetDate));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownState(targetDate));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [targetDate]);

  const items = [
    { label: "Күн", value: countdown.days },
    { label: "Сағат", value: countdown.hours },
    { label: "Минут", value: countdown.minutes },
    { label: "Секунд", value: countdown.seconds },
  ];

  return (
    <div>
      <p className="text-center text-sm uppercase tracking-[0.28em] text-gold">
        {countdown.complete ? completeLabel : note}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-[1.7rem] border border-white/65 bg-white/48 px-4 py-5 text-center shadow-[0_14px_30px_rgba(61,47,26,0.05)] backdrop-blur"
          >
            <div className="font-display text-5xl leading-none text-charcoal sm:text-[3.4rem]">
              {item.value}
            </div>
            <div className="mt-3 text-[0.72rem] uppercase tracking-[0.3em] text-taupe">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
