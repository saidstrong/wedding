import { MusicToggle } from "@/components/music-toggle";
import { resolveAssetSource } from "@/lib/media";
import { weddingContent } from "@/lib/wedding-content";

export function HeroSection() {
  const heroArtwork = resolveAssetSource(weddingContent.media.heroArtwork.src);
  const audioSource = resolveAssetSource(weddingContent.audioTrack.src);
  const playIcon = resolveAssetSource(weddingContent.audioTrack.playIconSrc);
  const pauseIcon = resolveAssetSource(weddingContent.audioTrack.pauseIconSrc);

  return (
    <section className="relative pb-10 pt-5 sm:pb-14 sm:pt-8">
      <div className="section-shell">
        <div className="mx-auto max-w-[29rem]">
          {heroArtwork ? (
            <img
              src={heroArtwork}
              alt={weddingContent.media.heroArtwork.alt}
              className="w-full rounded-[2.2rem] shadow-[0_28px_70px_rgba(61,47,26,0.14)]"
            />
          ) : (
            <div className="rounded-[2.2rem] border border-gold/15 bg-white/70 px-8 py-16 text-center shadow-invitation backdrop-blur">
              <p className="text-sm uppercase tracking-[0.36em] text-gold">
                {weddingContent.hero.dateLabel}
              </p>
              <h1 className="mt-6 font-display text-5xl leading-[0.9] text-charcoal sm:text-6xl">
                {weddingContent.hero.names}
              </h1>
              <p className="mt-6 text-base leading-8 text-taupe">
                {weddingContent.hero.subtitle}
              </p>
            </div>
          )}

          <div className="mt-5 flex justify-center">
            <MusicToggle
              src={audioSource}
              label={weddingContent.audioTrack.label}
              hint={weddingContent.audioTrack.hint}
              playIconSrc={playIcon}
              pauseIconSrc={pauseIcon}
            />
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.34em] text-gold sm:text-[0.92rem]">
            {weddingContent.hero.dateLabel}
          </p>
          <p className="mt-4 text-sm leading-7 text-taupe sm:text-base sm:leading-8">
            {weddingContent.hero.invitationLine}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#details" className="primary-button">
              {weddingContent.hero.detailCtaLabel}
            </a>
            <a href="#rsvp" className="ghost-button">
              {weddingContent.hero.rsvpCtaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
