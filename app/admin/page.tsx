import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminGate } from "@/components/admin/admin-gate";
import { isAdminAuthorized } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authorized = await isAdminAuthorized();

  if (!authorized) {
    return <AdminGate />;
  }

  return <AdminDashboard />;
}
