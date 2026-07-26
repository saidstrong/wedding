import { NextResponse } from "next/server";

import { isKnownInvitationSlug } from "@/lib/admin-invitations";
import { isAdminAuthorized } from "@/lib/admin-session";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { RsvpRow } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authorized = await isAdminAuthorized();

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const invitationSlug = new URL(request.url).searchParams.get(
    "invitation_slug",
  );

  if (!isKnownInvitationSlug(invitationSlug)) {
    return NextResponse.json(
      { error: "Missing or unsupported invitation slug." },
      { status: 400 },
    );
  }

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("rsvps")
      .select(
        "id, full_name, attendance_status, guest_count, second_guest_name, note, invitation_slug, created_at",
      )
      .eq("invitation_slug", invitationSlug)
      .order("created_at", { ascending: false });

    let submissions: RsvpRow[] = [];

    if (error) {
      const legacyWithoutSecondGuest = await supabase
        .from("rsvps")
        .select(
          "id, full_name, attendance_status, guest_count, note, invitation_slug, created_at",
        )
        .eq("invitation_slug", invitationSlug)
        .order("created_at", { ascending: false });

      if (legacyWithoutSecondGuest.error) {
        return NextResponse.json(
          { error: "Failed to load RSVP submissions." },
          { status: 500 },
        );
      }

      submissions = (legacyWithoutSecondGuest.data ?? []).map((entry) => ({
        ...entry,
        second_guest_name: null,
      }));
    } else {
      submissions = data ?? [];
    }

    const attending = submissions.filter(
      (entry) => entry.attendance_status === "attending",
    ).length;
    const notAttending = submissions.filter(
      (entry) => entry.attendance_status === "not_attending",
    ).length;
    const expectedGuests = submissions.reduce(
      (total, entry) =>
        total +
        (entry.attendance_status === "attending"
          ? (entry.guest_count ?? 0)
          : 0),
      0,
    );

    return NextResponse.json(
      {
        summary: {
          totalSubmissions: submissions.length,
          attending,
          notAttending,
          expectedGuests,
        },
        invitationSlug,
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
