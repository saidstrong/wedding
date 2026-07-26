import type { Metadata } from "next";

import { WeddingInvitationPage } from "@/components/wedding-invitation-page";
import { shyngysNazerkeInvitation } from "@/lib/invitations/shyngys-nazerke";

export const metadata: Metadata = {
  title: shyngysNazerkeInvitation.metadata.title,
  description: shyngysNazerkeInvitation.metadata.description,
};

export default function ShyngysNazerkePage() {
  return <WeddingInvitationPage content={shyngysNazerkeInvitation} />;
}
