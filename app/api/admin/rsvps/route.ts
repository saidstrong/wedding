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
      .select(
        "id, full_name, attendance_status, guest_count, second_guest_name, note, invitation_slug, created_at",
      )
      .order("created_at", { ascending: false });

    let submissions: RsvpRow[] = [];

    if (error) {
      const legacyWithSecondGuest = await supabase
        .from("rsvps")
        .select(
          "id, full_name, attendance_status, guest_count, second_guest_name, note, created_at",
        )
        .order("created_at", { ascending: false });

      if (legacyWithSecondGuest.error) {
        const legacy = await supabase
          .from("rsvps")
          .select("id, full_name, attendance_status, guest_count, note, created_at")
          .order("created_at", { ascending: false });

        if (legacy.error) {
          return NextResponse.json(
            { error: "Failed to load RSVP submissions." },
            { status: 500 },
          );
        }

        submissions = (legacy.data ?? []).map((entry) => ({
          ...entry,
          second_guest_name: null,
          invitation_slug: "beksultan-bulbul",
        }));
      } else {
        submissions = (legacyWithSecondGuest.data ?? []).map((entry) => ({
          ...entry,
          invitation_slug: "beksultan-bulbul",
        }));
      }
    } else {
      submissions = data ?? [];
    }

    const attending = submissions.filter(
      (entry) => entry.attendance_status === "attending",
    ).length;
    const notAttending = submissions.filter(
      (entry) => entry.attendance_status === "not_attending",
    ).length;
    const byInvitation = submissions.reduce<
      Record<
        string,
        {
          totalSubmissions: number;
          attending: number;
          notAttending: number;
        }
      >
    >((summary, entry) => {
      const invitationSummary = summary[entry.invitation_slug] ?? {
        totalSubmissions: 0,
        attending: 0,
        notAttending: 0,
      };

      invitationSummary.totalSubmissions += 1;
      invitationSummary[entry.attendance_status === "attending"
        ? "attending"
        : "notAttending"] += 1;
      summary[entry.invitation_slug] = invitationSummary;

      return summary;
    }, {});

    return NextResponse.json(
      {
        summary: {
          totalSubmissions: submissions.length,
          attending,
          notAttending,
          byInvitation,
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
