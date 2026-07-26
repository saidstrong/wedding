export type EditableMedia = {
  src?: string;
  alt: string;
  label: string;
  hint?: string;
  objectFit?: "contain" | "cover";
};

export type EditableAudio = {
  src?: string;
  label: string;
  hint?: string;
  playIconSrc?: string;
  pauseIconSrc?: string;
};

export type OrnamentConfig = {
  src?: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay?: string;
  duration?: string;
  opacity?: number;
};

export type RsvpContent = {
  enabled: boolean;
  intro: string;
  formDuration: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  attendanceLegend: string;
  attendingLabel: string;
  attendingTitle: string;
  attendingDescription: string;
  notAttendingLabel: string;
  notAttendingTitle: string;
  notAttendingDescription: string;
  guestCountLabel: string;
  guestCountSingle: string;
  guestCountDouble: string;
  secondGuestLabel: string;
  secondGuestPlaceholder: string;
  plusOneLabel: string;
  plusOnePlaceholder: string;
  commentLabel: string;
  commentPlaceholder: string;
  privacyNote: string;
  submitLabel: string;
  pendingLabel: string;
  success: string;
  successAttendingDetail: string;
  successNotAttendingDetail: string;
  failure: string;
};

export type InvitationConfig = {
  slug: string;
  couple: {
    firstName: string;
    secondName: string;
    firstDisplayName: string;
    secondDisplayName: string;
  };
  metadata: {
    title: string;
    description: string;
  };
  background: {
    backgroundImage: EditableMedia;
    backgroundOverlayOpacity: number;
  };
  audioTrack: EditableAudio;
  hero: {
    names: string;
    subtitle: string;
    dateLabel?: string;
    invitationLine?: string;
    detailCtaLabel?: string;
    rsvpCtaLabel?: string;
  };
  invitation?: {
    greetingLine: string;
    familyLine: string;
    coupleLine: string;
    invitationLine: string;
    hostsLabel?: string;
    hosts?: string;
  };
  event?: {
    isoDate: string;
    dateLabel: string;
    timeLabel: string;
    venue: string;
    address: string;
    mapUrl: string;
    mapLabel?: string;
    mapIconSrc?: string;
    copyLabel?: string;
    addToCalendarLabel?: string;
  };
  calendar?: {
    caption: string;
  };
  countdown?: {
    note: string;
    completeLabel: string;
  };
  timeline?: ReadonlyArray<{
    time: string;
    title: string;
    description: string;
  }>;
  rsvp?: RsvpContent;
  footer: {
    contactName?: string;
    contactPhone?: string;
    whatsappUrl?: string;
    whatsappLabel?: string;
    thanks: string;
    mapLabel?: string;
  };
  media: {
    heroArtwork: EditableMedia;
    calendarImage?: EditableMedia;
  };
};
