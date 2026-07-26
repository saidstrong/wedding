import type { InvitationConfig } from "@/lib/invitations/types";

export const shyngysNazerkeInvitation = {
  slug: "shyngys-nazerke",
  couple: {
    firstName: "Shyngys",
    secondName: "Nazerke",
    firstDisplayName: "Шыңғыс",
    secondDisplayName: "Назерке",
  },
  metadata: {
    title: "Шыңғыс пен Назерке | Үйлену тойына шақыру",
    description:
      "Шыңғыс пен Назеркенің үйлену тойына арналған ресми шақыру сайты.",
  },
  background: {
    // The existing neutral background preserves the shared invitation design.
    // TODO(client): Replace this route-owned value if custom artwork is supplied.
    backgroundImage: {
      src: "/assets/background.png",
      alt: "Той атмосферасына арналған фондық сурет",
      label: "Background",
    },
    backgroundOverlayOpacity: 0.82,
  },
  audioTrack: {
    // TODO(client): Add the Shyngys/Nazerke music path when it is supplied.
    // The music control remains hidden until a route-specific source exists.
    label: "Әуен",
  },
  hero: {
    names: "Шыңғыс & Назерке",
    subtitle: "Үйлену тойы",
    detailCtaLabel: "Мәліметтер",
    rsvpCtaLabel: "Жауап қалдыру",
  },
  // TODO(client): Add invitation copy and hosts before enabling that section.
  // TODO(client): Add date, time, venue, address, and map data before enabling
  // the details, calendar, and countdown section.
  rsvp: {
    enabled: true,
    intro: "Келетініңізді белгілеңіз",
    formDuration: "1 минуттан аз",
    fullNameLabel: "Толық аты-жөні",
    fullNamePlaceholder: "Атыңызды жазыңыз",
    attendanceLegend: "Келу жауабы",
    attendingLabel: "Келемін",
    attendingTitle: "Келемін",
    attendingDescription: "Қуанышты күніңізде бірге боламын.",
    notAttendingLabel: "Келе алмаймын",
    notAttendingTitle: "Келе алмаймын",
    notAttendingDescription: "Ізгі тілегімді жолдаймын.",
    guestCountLabel: "Қонақ саны",
    guestCountSingle: "1 адам",
    guestCountDouble: "2 адам",
    secondGuestLabel: "Екінші қонақтың аты-жөні",
    secondGuestPlaceholder: "Екінші қонақтың толық аты-жөнін жазыңыз",
    plusOneLabel: "Жұбайыңыздың немесе серігіңіздің аты",
    plusOnePlaceholder: "Жұбайыңызбен келсеңіз, есімін жазыңыз",
    commentLabel: "Ізгі тілек қалдырсаңыз!",
    commentPlaceholder: "Жылы тілек",
    privacyNote:
      "Жауап бірден сақталады. Қажет болса, жаңартылған нұсқаны қайта жібере аласыз.",
    submitLabel: "Жауап жіберу",
    pendingLabel: "Жіберілуде...",
    success: "Рақмет! Жауабыңыз қабылданды.",
    successAttendingDetail: "Қуанышымызға ортақ болатыныңызға ризамыз.",
    successNotAttendingDetail: "Ізгі тілегіңіз үшін рақмет.",
    failure:
      "Жауап жіберілмеді. Байланыс немесе Supabase баптауларын тексеріп, қайта көріңіз.",
  },
  footer: {
    // TODO(client): Add a route-specific WhatsApp/contact link when supplied.
    thanks: "Қуанышымызға ортақ болуға шақырамыз!",
  },
  media: {
    heroArtwork: {
      src: "/invitations/shyngys-nazerke/main.png",
      alt: "Шыңғыс пен Назеркенің үйлену тойына шақыру суреті",
      label: "Shyngys and Nazerke invitation",
      objectFit: "contain",
    },
  },
} as const satisfies InvitationConfig;
