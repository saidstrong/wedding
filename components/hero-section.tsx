import { MusicToggle } from "@/components/music-toggle";
import type {
  EditableAudio,
  EditableMedia,
  InvitationConfig,
} from "@/lib/invitations/types";
import { resolveAssetSource } from "@/lib/media";

type HeroSectionProps = {
  hero: InvitationConfig["hero"];
  audioTrack: EditableAudio;
  heroArtwork: EditableMedia;
};

export function HeroSection({
  hero,
  audioTrack,
  heroArtwork,
}: HeroSectionProps) {
  const heroArtworkSource = resolveAssetSource(heroArtwork.src);
  const audioSource = resolveAssetSource(audioTrack.src);
  const playIcon = resolveAssetSource(audioTrack.playIconSrc);
  const pauseIcon = resolveAssetSource(audioTrack.pauseIconSrc);

  return (
    <section className="relative pb-10 pt-5 sm:pb-14 sm:pt-8">
      <div className="section-shell">
        <div className="mx-auto max-w-[29rem]">
          <div className="relative">
            {heroArtworkSource ? (
              <img
                src={heroArtworkSource}
                alt={heroArtwork.alt}
                className={`w-full rounded-[2.2rem] shadow-[0_28px_70px_rgba(61,47,26,0.14)]${
                  heroArtwork.objectFit === "contain" ? " object-contain" : ""
                }`}
              />
            ) : (
              <div className="rounded-[2.2rem] border border-gold/15 bg-white/70 px-8 py-16 text-center shadow-invitation backdrop-blur">
                <p className="text-sm uppercase tracking-[0.36em] text-gold">
                  {hero.dateLabel}
                </p>
                <h1 className="mt-6 font-display text-5xl leading-[0.9] text-charcoal sm:text-6xl">
                  {hero.names}
                </h1>
                <p className="mt-6 text-base leading-8 text-taupe">
                  {hero.subtitle}
                </p>
              </div>
            )}

            {audioSource ? (
              <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center sm:bottom-5">
                <MusicToggle
                  src={audioSource}
                  label={audioTrack.label}
                  hint={audioTrack.hint}
                  playIconSrc={playIcon}
                  pauseIconSrc={pauseIcon}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
