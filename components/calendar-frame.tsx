type CalendarFrameProps = {
  targetDate: string;
};

function capitalizeLabel(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

function parseIsoDate(targetDate: string) {
  const [year, month, day] = targetDate.slice(0, 10).split("-").map(Number);

  return {
    year,
    month,
    day,
    date: new Date(Date.UTC(year, month - 1, day)),
  };
}

function buildCalendarCells(year: number, month: number) {
  const firstDay = new Date(Date.UTC(year, month - 1, 1));
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const leadingEmptyCells = (firstDay.getUTCDay() + 6) % 7;

  return [
    ...Array.from({ length: leadingEmptyCells }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
}

function getWeekdayLabels() {
  const formatter = new Intl.DateTimeFormat("kk-KZ", {
    weekday: "short",
    timeZone: "UTC",
  });

  return Array.from({ length: 7 }, (_, index) =>
    capitalizeLabel(
      formatter.format(new Date(Date.UTC(2024, 0, 1 + index))),
    ),
  );
}

export function CalendarFrame({ targetDate }: CalendarFrameProps) {
  const { year, month, day, date } = parseIsoDate(targetDate);
  const weekdayLabels = getWeekdayLabels();
  const calendarCells = buildCalendarCells(year, month);
  const monthLabel = capitalizeLabel(
    new Intl.DateTimeFormat("kk-KZ", {
      month: "long",
      timeZone: "UTC",
    }).format(date),
  );
  const weekdayLabel = capitalizeLabel(
    new Intl.DateTimeFormat("kk-KZ", {
      weekday: "long",
      timeZone: "UTC",
    }).format(date),
  );

  return (
    <div className="mx-auto w-full max-w-[17rem]">
      <div className="rounded-[2rem] border border-white/60 bg-white/54 px-4 py-4 text-center shadow-[0_20px_50px_rgba(61,47,26,0.08)] backdrop-blur sm:px-5">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-gold">
          {monthLabel} {year}
        </p>

        <div className="mt-3 flex items-end justify-center gap-3">
          <p className="font-display text-[4.3rem] leading-none tracking-tight text-charcoal">
            {day}
          </p>

          <div className="pb-2 text-left">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-gold">
              {weekdayLabel}
            </p>
            <p className="mt-1 text-sm text-taupe">Той күні</p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.45rem] border border-gold/10 bg-white/72 px-3 py-3">
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {weekdayLabels.map((label) => (
              <div
                key={label}
                className="text-[0.6rem] uppercase tracking-[0.16em] text-taupe"
              >
                {label}
              </div>
            ))}

            {calendarCells.map((cell, index) =>
              cell === null ? (
                <div key={`empty-${index}`} aria-hidden="true" className="h-9" />
              ) : (
                <div key={cell} className="flex h-9 items-center justify-center">
                  {cell === day ? (
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/35 bg-gold/12 font-display text-base text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                      <span>{cell}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="absolute -top-1 right-0 h-3.5 w-3.5 text-gold/80"
                      >
                        <path d="M12 20.5l-1.35-1.23C5.4 14.48 2 11.39 2 7.58 2 4.5 4.42 2 7.5 2c1.75 0 3.43.81 4.5 2.09C13.07 2.81 14.75 2 16.5 2 19.58 2 22 4.5 22 7.58c0 3.81-3.4 6.9-8.65 11.69L12 20.5z" />
                      </svg>
                    </div>
                  ) : (
                    <span className="text-sm text-charcoal/85">{cell}</span>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
