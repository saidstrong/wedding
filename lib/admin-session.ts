import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "wedding_admin_session";

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function getAdminPasscode() {
  const passcode = process.env.ADMIN_PASSCODE;

  if (!passcode) {
    throw new Error("Missing ADMIN_PASSCODE environment variable.");
  }

  return passcode.trim();
}

export function getAdminSessionValue() {
  return hashValue(`wedding-admin:${getAdminPasscode()}`);
}

export function validateAdminPasscode(input: string) {
  const normalizedInput = input.trim();

  if (!normalizedInput) {
    return false;
  }

  return safeEqual(hashValue(normalizedInput), hashValue(getAdminPasscode()));
}

export async function isAdminAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!session) {
    return false;
  }

  return safeEqual(session, getAdminSessionValue());
}
