import type { Metadata } from "next";

import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminGate } from "@/components/admin/admin-gate";
import { adminInvitations } from "@/lib/admin-invitations";
import { isAdminAuthorizedFor } from "@/lib/admin-session";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: adminInvitations["beksultan-bulbul"].title,
};

export default async function AdminPage() {
  const config = adminInvitations["beksultan-bulbul"];
  const authorized = await isAdminAuthorizedFor(config.invitationSlug);

  if (!authorized) {
    return (
      <AdminGate title={config.title} destination={config.destination} />
    );
  }

  return (
    <AdminDashboard
      invitationSlug={config.invitationSlug}
      title={config.title}
      destination={config.destination}
    />
  );
}
