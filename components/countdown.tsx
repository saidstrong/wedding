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

const initialCountdownState: CountdownState = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
  complete: false,
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
  const [countdown, setCountdown] = useState(initialCountdownState);

  useEffect(() => {
    setCountdown(getCountdownState(targetDate));

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
    <div className="rounded-[2rem] border border-white/65 bg-white/44 px-4 py-4 shadow-[0_18px_44px_rgba(61,47,26,0.06)] backdrop-blur sm:px-5 sm:py-5">
      <p className="text-center text-[0.68rem] uppercase tracking-[0.28em] text-gold sm:text-[0.72rem]">
        {countdown.complete ? completeLabel : note}
      </p>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-[1.2rem] border border-white/70 bg-white/70 px-2 py-3 text-center shadow-[0_10px_22px_rgba(61,47,26,0.04)]"
          >
            <div className="font-display text-[1.55rem] leading-none tracking-tight text-charcoal sm:text-[2rem]">
              {item.value}
            </div>
            <div className="mt-1.5 text-[0.58rem] uppercase tracking-[0.2em] text-taupe sm:text-[0.62rem]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
