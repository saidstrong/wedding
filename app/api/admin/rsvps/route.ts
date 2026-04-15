import { NextResponse } from "next/server";

import { isAdminAuthorized } from "@/lib/admin-session";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { RsvpRow } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const authorized = await isAdminAuthorized();

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("rsvps")
      .select("id, full_name, attendance_status, guest_count, note, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Failed to load RSVP submissions." },
        { status: 500 },
      );
    }

    const submissions: RsvpRow[] = data ?? [];
    const attending = submissions.filter(
      (entry) => entry.attendance_status === "attending",
    ).length;
    const notAttending = submissions.filter(
      (entry) => entry.attendance_status === "not_attending",
    ).length;

    return NextResponse.json(
      {
        summary: {
          totalSubmissions: submissions.length,
          attending,
          notAttending,
        },
        submissions,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to load RSVP submissions." },
      { status: 500 },
    );
  }
}
