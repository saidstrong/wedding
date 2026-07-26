import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

import {
  isKnownInvitationSlug,
  type KnownInvitationSlug,
} from "@/lib/admin-invitations";

export const ADMIN_SESSION_COOKIE = "wedding_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

const SESSION_VERSION = 1;

type AdminSessionPayload = {
  version: typeof SESSION_VERSION;
  invitationSlug: KnownInvitationSlug;
  issuedAt: number;
  expiresAt: number;
};

export type AdminSession = {
  invitationSlug: KnownInvitationSlug;
  issuedAt: number;
  expiresAt: number;
};

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

function requirePasscode(name: string, value: string | undefined) {
  const passcode = value?.trim();

  if (!passcode) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return passcode;
}

function getAdminPasscodes() {
  const beksultanBulbul = requirePasscode(
    "ADMIN_PASSCODE_BEKSULTAN_BULBUL",
    process.env.ADMIN_PASSCODE_BEKSULTAN_BULBUL,
  );
  const shyngysNazerke = requirePasscode(
    "ADMIN_PASSCODE_SHYNGYS_NAZERKE",
    process.env.ADMIN_PASSCODE_SHYNGYS_NAZERKE,
  );

  if (
    safeEqual(hashValue(beksultanBulbul), hashValue(shyngysNazerke))
  ) {
    throw new Error("Route-specific admin passcodes must be different.");
  }

  return {
    "beksultan-bulbul": beksultanBulbul,
    "shyngys-nazerke": shyngysNazerke,
  } satisfies Record<KnownInvitationSlug, string>;
}

function getAdminPasscode(invitationSlug: KnownInvitationSlug) {
  return getAdminPasscodes()[invitationSlug];
}

function getSigningKey(invitationSlug: KnownInvitationSlug) {
  return createHash("sha256")
    .update(
      `wedding-admin-session-key:${invitationSlug}:${getAdminPasscode(
        invitationSlug,
      )}`,
    )
    .digest();
}

function signPayload(
  encodedPayload: string,
  invitationSlug: KnownInvitationSlug,
) {
  return createHmac("sha256", getSigningKey(invitationSlug))
    .update(encodedPayload)
    .digest("base64url");
}

function parseSessionPayload(encodedPayload: string) {
  try {
    const parsed = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as Partial<AdminSessionPayload>;

    if (
      parsed.version !== SESSION_VERSION ||
      !isKnownInvitationSlug(parsed.invitationSlug) ||
      typeof parsed.issuedAt !== "number" ||
      typeof parsed.expiresAt !== "number"
    ) {
      return null;
    }

    return parsed as AdminSessionPayload;
  } catch {
    return null;
  }
}

export function createAdminSessionValue(
  invitationSlug: KnownInvitationSlug,
) {
  const issuedAt = Date.now();
  const payload: AdminSessionPayload = {
    version: SESSION_VERSION,
    invitationSlug,
    issuedAt,
    expiresAt: issuedAt + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  const signature = signPayload(encodedPayload, invitationSlug);

  return `${encodedPayload}.${signature}`;
}

export function validateAdminPasscode(
  invitationSlug: KnownInvitationSlug,
  input: string,
) {
  const normalizedInput = input.trim();

  if (!normalizedInput) {
    return false;
  }

  return safeEqual(
    hashValue(normalizedInput),
    hashValue(getAdminPasscode(invitationSlug)),
  );
}

export function parseAdminSessionValue(value: string) {
  const [encodedPayload, signature, extra] = value.split(".");

  if (!encodedPayload || !signature || extra) {
    return null;
  }

  const payload = parseSessionPayload(encodedPayload);

  if (!payload) {
    return null;
  }

  const expectedSignature = signPayload(
    encodedPayload,
    payload.invitationSlug,
  );

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  const now = Date.now();

  if (
    payload.issuedAt > now ||
    payload.expiresAt <= now ||
    payload.expiresAt - payload.issuedAt >
      ADMIN_SESSION_MAX_AGE_SECONDS * 1000
  ) {
    return null;
  }

  return {
    invitationSlug: payload.invitationSlug,
    issuedAt: payload.issuedAt,
    expiresAt: payload.expiresAt,
  } satisfies AdminSession;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!value) {
    return null;
  }

  return parseAdminSessionValue(value);
}

export async function isAdminAuthorizedFor(
  invitationSlug: KnownInvitationSlug,
) {
  const session = await getAdminSession();

  return session?.invitationSlug === invitationSlug;
}
