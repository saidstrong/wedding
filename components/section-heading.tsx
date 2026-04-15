type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : undefined}>
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-sm leading-7 text-taupe sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
