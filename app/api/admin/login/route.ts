import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_MAX_AGE_SECONDS,
  ADMIN_SESSION_COOKIE,
  createAdminSessionValue,
  validateAdminPasscode,
} from "@/lib/admin-session";
import { getAdminInvitationByDestination } from "@/lib/admin-invitations";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let passcode = "";
  let destination = "";

  try {
    const body = (await request.json()) as {
      passcode?: string;
      destination?: string;
    };
    passcode = body.passcode ?? "";
    destination = body.destination ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const adminInvitation = getAdminInvitationByDestination(destination);

  if (!adminInvitation) {
    return NextResponse.json(
      { error: "Invalid admin destination." },
      { status: 400 },
    );
  }

  let sessionValue = "";

  try {
    if (
      !validateAdminPasscode(adminInvitation.invitationSlug, passcode)
    ) {
      return NextResponse.json(
        { error: "Invalid passcode." },
        { status: 401 },
      );
    }

    sessionValue = createAdminSessionValue(
      adminInvitation.invitationSlug,
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Admin passcode configuration is invalid.",
      },
      { status: 500 },
    );
  }

  const response = NextResponse.json({
    ok: true,
    destination: adminInvitation.destination,
  });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: sessionValue,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  return response;
}
