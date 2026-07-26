import { WeddingInvitationPage } from "@/components/wedding-invitation-page";
import { beksultanBulbulInvitation } from "@/lib/invitations/beksultan-bulbul";

export default function HomePage() {
  return <WeddingInvitationPage content={beksultanBulbulInvitation} />;
}
