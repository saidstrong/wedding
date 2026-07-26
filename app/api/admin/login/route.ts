import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionValue,
  validateAdminPasscode,
} from "@/lib/admin-session";
import { isAdminDestination } from "@/lib/admin-invitations";

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

  if (!isAdminDestination(destination)) {
    return NextResponse.json(
      { error: "Invalid admin destination." },
      { status: 400 },
    );
  }

  if (!validateAdminPasscode(passcode)) {
    return NextResponse.json(
      { error: "Invalid passcode." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true, destination });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: getAdminSessionValue(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
    path: "/",
  });

  return response;
}
