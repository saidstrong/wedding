import { BackgroundStage } from "@/components/background-stage";
import { CalendarFrame } from "@/components/calendar-frame";
import { Countdown } from "@/components/countdown";
import { DetailsActions } from "@/components/details-actions";
import { HeroSection } from "@/components/hero-section";
import { RsvpForm } from "@/components/rsvp-form";
import { TimelineSection } from "@/components/timeline-section";
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

function formatCalendarDate(date: Date) {
  return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
}

function buildGoogleCalendarUrl() {
  const start = new Date(weddingContent.event.isoDate);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${weddingContent.hero.names} - ${weddingContent.hero.subtitle}`,
    dates: `${formatCalendarDate(start)}/${formatCalendarDate(end)}`,
    details: `${weddingContent.event.venue}. ${weddingContent.event.address}`,
    location: weddingContent.event.address,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function HomePage() {
  const calendarUrl = buildGoogleCalendarUrl();

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
              <p className="text-base leading-8 text-charcoal sm:text-lg sm:leading-9">
                {weddingContent.invitation.message}
              </p>
              <p className="mt-6 font-display text-[2rem] text-charcoal sm:text-[2.35rem]">
                {weddingContent.invitation.hosts}
              </p>
              <p className="mt-3 text-sm leading-7 text-taupe sm:text-base">
                {weddingContent.invitation.note}
              </p>
            </div>
          </div>
        </section>

        <section id="details" className="section-transition py-14 sm:py-18">
          <div className="section-shell">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_17rem] lg:items-center">
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
                    copyLabel={weddingContent.event.copyLabel}
                    calendarUrl={calendarUrl}
                    calendarLabel={weddingContent.event.addToCalendarLabel}
                  />
                </div>
              </div>

              <CalendarFrame
                media={weddingContent.media.calendarImage}
                caption={weddingContent.calendar.caption}
              />
            </div>
          </div>
        </section>

        <section id="countdown" className="section-transition py-14 sm:py-18">
          <div className="section-shell">
            <div className="mx-auto max-w-4xl">
              <Countdown
                targetDate={weddingContent.event.isoDate}
                note={weddingContent.countdown.note}
                completeLabel={weddingContent.countdown.completeLabel}
              />
            </div>
          </div>
        </section>

        <TimelineSection items={weddingContent.timeline} />

        <section id="rsvp" className="section-transition py-14 sm:py-18">
          <div className="section-shell">
            <div className="mx-auto max-w-3xl">
              <p className="text-center text-sm leading-7 text-taupe sm:text-base">
                {weddingContent.rsvp.intro}
              </p>

              <div className="mt-6">
                <RsvpForm />
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-6 pb-14 sm:pb-18">
          <div className="section-shell">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/65 bg-white/48 px-5 py-6 text-center shadow-[0_20px_52px_rgba(61,47,26,0.06)] backdrop-blur sm:px-7 sm:py-7">
              <p className="text-sm leading-7 text-taupe sm:text-base">
                {weddingContent.footer.thanks}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={`tel:${weddingContent.footer.contactPhone.replace(/\s+/g, "")}`}
                  className="ghost-button"
                >
                  {weddingContent.footer.contactPhone}
                </a>
                <a
                  href={weddingContent.footer.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button"
                >
                  {weddingContent.footer.whatsappLabel}
                </a>
                <a
                  href={weddingContent.event.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-button"
                >
                  {weddingContent.footer.mapLabel}
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </BackgroundStage>
  );
}
