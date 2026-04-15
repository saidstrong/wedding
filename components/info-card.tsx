type InfoCardProps = {
  label?: string;
  title: string;
  description?: string;
  accent?: string;
  className?: string;
  titleClassName?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function InfoCard({
  label,
  title,
  description,
  accent = "✦",
  className,
  titleClassName,
}: InfoCardProps) {
  return (
    <article
      className={cx(
        "relative overflow-hidden rounded-[1.75rem] border border-gold/15 bg-white/70 p-5 shadow-[0_18px_40px_rgba(61,47,26,0.05)] backdrop-blur",
        className,
      )}
    >
      <div className="absolute right-4 top-3 font-display text-4xl text-gold/15">
        {accent}
      </div>
      {label ? (
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-gold">
          {label}
        </p>
      ) : null}
      <h3
        className={cx(
          "mt-3 font-display text-[1.9rem] leading-tight text-charcoal",
          titleClassName,
        )}
      >
        {title}
      </h3>
      {description ? (
        <p className="mt-3 text-sm leading-7 text-taupe">{description}</p>
      ) : null}
    </article>
  );
}
