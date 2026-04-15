type QuoteBandProps = {
  kicker: string;
  title: string;
  quote: string;
  attribution: string;
};

export function QuoteBand({
  kicker,
  title,
  quote,
  attribution,
}: QuoteBandProps) {
  return (
    <section className="py-8 sm:py-12">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-gold/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(245,236,224,0.9))] px-6 py-10 shadow-invitation sm:px-10">
          <div className="absolute left-8 top-6 font-display text-7xl text-gold/10">
            “
          </div>
          <div className="absolute bottom-3 right-8 font-display text-7xl text-gold/10">
            ”
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="section-kicker">{kicker}</p>
            <h2 className="font-display text-3xl text-charcoal sm:text-4xl">
              {title}
            </h2>
            <p className="mt-6 font-display text-2xl leading-relaxed text-charcoal sm:text-[2.25rem]">
              {quote}
            </p>
            <p className="mt-5 text-sm uppercase tracking-[0.32em] text-taupe">
              {attribution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
