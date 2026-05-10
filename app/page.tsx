import { BackgroundStage } from "@/components/background-stage";
import { CalendarFrame } from "@/components/calendar-frame";
import { Countdown } from "@/components/countdown";
import { DetailsActions } from "@/components/details-actions";
import { HeroSection } from "@/components/hero-section";
import { RsvpForm } from "@/components/rsvp-form";
import { weddingContent } from "@/lib/wedding-content";

const detailItems = [
  {
    label: "Күні",
    value: weddingContent.event.dateLabel,
  },
  {
    label: "Уақыты",
    value: weddingContent.event.timeLabel,
  },
  {
    label: "Өтетін орны",
    value: weddingContent.event.venue,
  },
  {
    label: "Мекенжайы",
    value: weddingContent.event.address,
  },
] as const;

export default function HomePage() {
  return (
    <BackgroundStage
      media={weddingContent.background.backgroundImage}
      overlayOpacity={weddingContent.background.backgroundOverlayOpacity}
    >
      <main className="relative pb-10">
        <HeroSection />

        <section id="invitation" className="section-transition py-10 sm:py-14">
          <div className="section-shell">
            <div className="mx-auto max-w-3xl text-center">
              <div className="space-y-2 text-base leading-8 text-charcoal sm:text-lg sm:leading-9">
                <p className="text-[1.05rem] leading-8 sm:text-[1.14rem] sm:leading-9">
                  {weddingContent.invitation.greetingLine}
                </p>
                <p className="text-[1.08rem] leading-8 sm:text-[1.18rem] sm:leading-9">
                  {weddingContent.invitation.familyLine}
                </p>
                <p className="font-script text-[2rem] leading-tight text-gold sm:text-[2.35rem]">
                  {weddingContent.invitation.coupleLine}
                </p>
                <p className="text-[1.05rem] leading-8 sm:text-[1.14rem] sm:leading-9">
                  {weddingContent.invitation.invitationLine}
                </p>
              </div>

              <p className="mt-7 text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-gold sm:text-[0.82rem]">
                {weddingContent.invitation.hostsLabel}
              </p>
              <p className="mt-3 font-display text-[2rem] text-charcoal sm:text-[2.35rem]">
                {weddingContent.invitation.hosts}
              </p>
            </div>
          </div>
        </section>

        <section id="details" className="section-transition py-14 sm:py-18">
          <div className="section-shell">
            <div className="mx-auto max-w-5xl space-y-4 sm:space-y-5">
              <div className="grid gap-6 lg:grid-cols-[1fr_17rem] lg:items-center">
                <div className="rounded-[2.2rem] border border-white/65 bg-white/52 px-5 py-6 shadow-[0_24px_60px_rgba(61,47,26,0.06)] backdrop-blur sm:px-7 sm:py-7">
                  <dl className="space-y-4">
                    {detailItems.map((item, index) => (
                      <div
                        key={item.label}
                        className={`grid gap-2 rounded-[1.45rem] bg-white/52 px-4 py-4 sm:grid-cols-[8.5rem_1fr] sm:items-center ${
                          index === detailItems.length - 1 ? "" : ""
                        }`}
                      >
                        <dt className="text-[0.72rem] uppercase tracking-[0.3em] text-gold">
                          {item.label}
                        </dt>
                        <dd className="font-display text-[1.7rem] leading-tight text-charcoal sm:text-[2rem]">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6">
                    <DetailsActions
                      address={weddingContent.event.address}
                      mapUrl={weddingContent.event.mapUrl}
                      mapLabel={weddingContent.event.mapLabel}
                      mapIconSrc={weddingContent.event.mapIconSrc}
                    />
                  </div>
                </div>

                <CalendarFrame targetDate={weddingContent.event.isoDate} />
              </div>

              <Countdown
                targetDate={weddingContent.event.isoDate}
                note={weddingContent.countdown.note}
                completeLabel={weddingContent.countdown.completeLabel}
              />
            </div>
          </div>
        </section>

        <section
          id="rsvp"
          className="section-transition pt-14 pb-10 sm:pt-18 sm:pb-14"
        >
          <div className="section-shell">
            <div className="mx-auto max-w-3xl">
              <p className="text-center font-display text-[1.75rem] leading-tight text-charcoal sm:text-[2rem]">
                {weddingContent.rsvp.intro}
              </p>

              <div className="mt-5">
                <RsvpForm />
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-1 pb-14 sm:pt-2 sm:pb-18">
          <div className="section-shell">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/65 bg-white/48 px-5 py-6 text-center shadow-[0_20px_52px_rgba(61,47,26,0.06)] backdrop-blur sm:px-7 sm:py-7">
              <p className="text-[1.05rem] leading-8 text-taupe sm:text-[1.12rem]">
                {weddingContent.footer.thanks}
              </p>

              <div className="mt-5 flex justify-center">
                <a
                  href={weddingContent.footer.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button"
                >
                  {weddingContent.footer.whatsappLabel}
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </BackgroundStage>
  );
}
