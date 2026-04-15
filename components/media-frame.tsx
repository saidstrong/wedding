import type { EditableMedia } from "@/lib/wedding-content";
import { resolveAssetSource } from "@/lib/media";

type MediaFrameProps = {
  media: EditableMedia;
  aspect?: "hero" | "portrait" | "landscape" | "wide";
  className?: string;
  monogram?: string;
  priority?: boolean;
  showLabel?: boolean;
};

const aspectClasses = {
  hero: "aspect-[4/5] sm:aspect-[16/11] lg:aspect-[5/6]",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/11]",
  wide: "aspect-[16/9]",
} as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function MediaFrame({
  media,
  aspect = "portrait",
  className,
  monogram,
  priority = false,
  showLabel = true,
}: MediaFrameProps) {
  const resolvedSource = resolveAssetSource(media.src);
  const hasImage = Boolean(resolvedSource);

  return (
    <div
      className={cx(
        "group relative overflow-hidden rounded-[2.25rem] border border-gold/18 bg-[linear-gradient(155deg,rgba(255,255,255,0.84),rgba(243,233,218,0.72))] shadow-invitation",
        aspectClasses[aspect],
        className,
      )}
    >
      <div className="absolute inset-[0.8rem] rounded-[1.65rem] border border-white/55" />

      {hasImage ? (
        <>
          <img
            src={resolvedSource ?? undefined}
            alt={media.alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,35,31,0.08),rgba(40,35,31,0.28))]" />
        </>
      ) : (
        <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.94),rgba(255,255,255,0.58)_32%,rgba(223,208,186,0.7)_100%)]">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full border border-gold/12" />
          <div className="absolute -right-12 bottom-8 h-48 w-48 rounded-full border border-gold/12" />
          <div className="absolute inset-x-7 top-7 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute inset-x-7 bottom-7 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <div className="font-display text-6xl leading-none tracking-[0.28em] text-gold/25 sm:text-7xl">
              {monogram ?? "AA"}
            </div>
            <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold/80">
              {media.label}
            </p>
            {media.hint ? (
              <p className="mt-4 max-w-xs text-sm leading-7 text-taupe">
                {media.hint}
              </p>
            ) : null}
          </div>
        </div>
      )}

      {showLabel ? (
        <div className="absolute left-5 top-5 rounded-full border border-white/55 bg-white/70 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-charcoal/75 backdrop-blur">
          {media.label}
        </div>
      ) : null}
    </div>
  );
}
