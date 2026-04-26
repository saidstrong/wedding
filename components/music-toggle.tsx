"use client";

import { useEffect, useRef, useState } from "react";

type MusicToggleProps = {
  src: string | null;
  label: string;
  hint?: string;
  playIconSrc: string | null;
  pauseIconSrc: string | null;
};

export function MusicToggle({
  src,
  label,
  hint,
  playIconSrc,
  pauseIconSrc,
}: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const isAvailable = Boolean(src);
  const currentIcon = isPlaying ? pauseIconSrc : playIconSrc;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    function handleEnded() {
      setIsPlaying(false);
    }

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  async function handleToggle() {
    if (!audioRef.current || !isAvailable) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setFeedback(null);
    } catch {
      setFeedback("Әуен тек басқаннан кейін қосылады.");
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleToggle}
        disabled={!isAvailable}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Әуенді тоқтату" : "Әуенді қосу"}
        title={label}
        className={`rounded-full transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 ${
          isAvailable ? "hover:scale-[1.02]" : "cursor-not-allowed opacity-70"
        }`}
      >
        {currentIcon ? (
          <img
            src={currentIcon}
            alt=""
            className="h-[4.8rem] w-[4.8rem] sm:h-[5.4rem] sm:w-[5.4rem]"
          />
        ) : (
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold/20 bg-white/75 text-gold shadow-invitation">
            {isPlaying ? "||" : "~"}
          </span>
        )}
      </button>

      {feedback ? (
        <p className="max-w-[12rem] text-center text-xs leading-5 text-taupe">
          {feedback}
        </p>
      ) : null}

      {!isAvailable && hint ? (
        <p className="max-w-[12rem] text-center text-xs leading-5 text-taupe">
          {hint}
        </p>
      ) : null}

      {isAvailable ? <audio ref={audioRef} src={src ?? undefined} preload="none" /> : null}
    </div>
  );
}
