import type { InvitationConfig } from "@/lib/invitations/types";

export const shyngysNazerkeInvitation = {
  slug: "shyngys-nazerke",
  route: "/shyngys-nazerke",
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
  // These practical values are temporary, explicit, and route-owned so they
  // can be replaced without changing the Beksultan/Bulbul invitation.
  background: {
    backgroundImage: {
      src: "/assets/background.png",
      alt: "Той атмосферасына арналған фондық сурет",
      label: "Background",
    },
    backgroundOverlayOpacity: 0.82,
  },
  audioTrack: {
    src: "/assets/audio.mp3",
    label: "Әуен",
    hint: "Әуен файлы қолмен қосылады.",
    playIconSrc: "/assets/music_play.png",
    pauseIconSrc: "/assets/music_pause.png",
  },
  hero: {
    names: "Шыңғыс & Назерке",
    subtitle: "Үйлену тойы",
    dateLabel: "23.08.2026",
    invitationLine: "",
    detailCtaLabel: "Мәліметтер",
    rsvpCtaLabel: "Жауап қалдыру",
  },
  invitation: {
    greetingLine:
      "Құрметті ағайын-туыс, бауырлар, құда-жекжат, нағашы-жиен, бөлелер, құрбы-құрдас, дос-жарандар, ұжымдастар, көршілер!",
    familyLine: "сіздерді балаларымыз",
    coupleLine: "Шыңғыс & Назеркенің",
    invitationLine:
      "үйлену тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!",
    hostsLabel: "Той иелері",
    hosts: "Әліби & Салтанат",
  },
  event: {
    isoDate: "2026-08-23T17:00:00+05:00",
    dateLabel: "Жексенбі, 23.08.2026",
    timeLabel: "17:00",
    venue: "«Khama Park» салтанат сарайы",
    address: "Жоғарғы Қаскелең тас жолы 25, Алматы",
    mapUrl: "https://go.2gis.com/sRyu2",
    mapLabel: "2GIS",
    mapIconSrc: "/assets/2gis.png",
    copyLabel: "Мекенжайды көшіру",
    addToCalendarLabel: "Күнтізбеге қосу",
  },
  calendar: {
    caption: "23.08.2026",
  },
  countdown: {
    note: "Тойға дейін",
    completeLabel: "Қуанышты күн келіп жетті.",
  },
  timeline: [
    {
      time: "17:30",
      title: "Қонақтарды қарсы алу",
      description: "Қонақтарды күтіп алу, амандасу және жайғастыру.",
    },
    {
      time: "18:00",
      title: "Фуршет және фотосурет",
      description: "Жылы жүздесу, естелік кадрлар және алғашқы тілектер.",
    },
    {
      time: "19:00",
      title: "Негізгі салтанаттың басталуы",
      description: "Жүргізуші сөзі, құттықтаулар және салтанатты ашылу.",
    },
    {
      time: "20:30",
      title: "Беташар және ерекше сәттер",
      description: "Дәстүрлі бөлім мен отбасыға арналған жүрекке жақын сәттер.",
    },
    {
      time: "21:00",
      title: "Алғашқы би",
      description: "Музыка, би және мерекелік кештің жалғасы.",
    },
  ],
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
    contactName: "Саид",
    contactPhone: "+7 707 521 49 11",
    whatsappUrl:
      "https://wa.me/77075214911?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7!%20%D0%A2%D0%BE%D0%B9%20%D1%88%D0%B0%D2%9B%D1%8B%D1%80%D1%83%D1%8B%20%D0%B1%D0%BE%D0%B9%D1%8B%D0%BD%D1%88%D0%B0%20%D1%81%D2%B1%D1%80%D0%B0%D2%93%D1%8B%D0%BC%20%D0%B1%D0%B0%D1%80.",
    whatsappLabel: "BAS Group командасымен жасалды.",
    thanks: "Қуанышымызға ортақ болуға шақырамыз!",
    mapLabel: "2GIS",
  },
  media: {
    heroArtwork: {
      src: "/invitations/shyngys-nazerke/main.png",
      alt: "Шыңғыс пен Назеркенің үйлену тойына шақыру суреті",
      label: "Shyngys and Nazerke invitation",
      objectFit: "contain",
    },
    calendarImage: {
      src: "/assets/calendar.png",
      alt: "Той күні белгіленген күнтізбе суреті",
      label: "Calendar",
    },
  },
} as const satisfies InvitationConfig;
