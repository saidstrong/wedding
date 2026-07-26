export const adminInvitations = {
  "beksultan-bulbul": {
    invitationSlug: "beksultan-bulbul",
    title: "Бексұлтан мен Бұлбұл — жауаптар",
    destination: "/admin",
  },
  "shyngys-nazerke": {
    invitationSlug: "shyngys-nazerke",
    title: "Шыңғыс пен Назерке — жауаптар",
    destination: "/shyngys-nazerke/admin",
  },
} as const;

export type KnownInvitationSlug = keyof typeof adminInvitations;
export type AdminDestination =
  (typeof adminInvitations)[KnownInvitationSlug]["destination"];

export function isKnownInvitationSlug(
  value: string | null | undefined,
): value is KnownInvitationSlug {
  return value === "beksultan-bulbul" || value === "shyngys-nazerke";
}

export function isAdminDestination(
  value: string | null | undefined,
): value is AdminDestination {
  return value === "/admin" || value === "/shyngys-nazerke/admin";
}
