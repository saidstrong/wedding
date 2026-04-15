type TimelineItem = {
  time: string;
  title: string;
  description: string;
};

type TimelineSectionProps = {
  items: readonly TimelineItem[];
};

export function TimelineSection({ items }: TimelineSectionProps) {
  return (
    <section id="timeline" className="section-transition py-14 sm:py-18">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl rounded-[2.2rem] border border-white/60 bg-white/42 px-5 py-6 shadow-[0_24px_60px_rgba(61,47,26,0.06)] backdrop-blur sm:px-7 sm:py-8">
          <div className="space-y-5">
            {items.map((item, index) => (
              <article
                key={`${item.time}-${item.title}`}
                className={`grid gap-3 rounded-[1.6rem] border border-gold/10 bg-white/52 px-4 py-4 sm:grid-cols-[6.5rem_1fr] sm:items-start sm:px-5 ${
                  index === items.length - 1 ? "" : ""
                }`}
              >
                <p className="font-display text-3xl leading-none text-charcoal sm:text-[2.4rem]">
                  {item.time}
                </p>
                <div>
                  <h3 className="font-display text-[1.65rem] leading-tight text-charcoal sm:text-[1.85rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-taupe sm:text-base">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
