import type { EditableMedia } from "@/lib/wedding-content";
import { resolveAssetSource } from "@/lib/media";

type CalendarFrameProps = {
  media: EditableMedia;
  caption: string;
};

export function CalendarFrame({ media, caption }: CalendarFrameProps) {
  const resolvedSource = resolveAssetSource(media.src);

  return (
    <div className="mx-auto w-full max-w-[17rem] text-center">
      <div className="rounded-[2rem] border border-white/60 bg-white/52 p-3 shadow-[0_20px_50px_rgba(61,47,26,0.08)] backdrop-blur">
        {resolvedSource ? (
          <img
            src={resolvedSource}
            alt={media.alt}
            className="w-full rounded-[1.45rem] bg-black"
            loading="lazy"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(33,33,33,0.94),rgba(63,63,63,0.92))] px-8 text-sm leading-7 text-white/82">
            Calendar image
          </div>
        )}
      </div>

      <p className="mt-4 text-sm uppercase tracking-[0.26em] text-taupe">
        {caption}
      </p>
    </div>
  );
}
