import type { RegistrationOtpChallenge } from "@/lib/api";

const STORAGE_KEY = "bioreza.pending-email-verification";

export type PendingEmailVerification = {
  email: string;
  maskedEmail: string;
  resendAvailableAt: number;
};

export function savePendingVerification(
  challenge: Pick<RegistrationOtpChallenge, "email" | "maskedEmail" | "resendAvailableInSeconds">,
): PendingEmailVerification {
  const pending = {
    email: challenge.email.trim().toLowerCase(),
    maskedEmail: challenge.maskedEmail,
    resendAvailableAt: Date.now() + challenge.resendAvailableInSeconds * 1_000,
  } satisfies PendingEmailVerification;
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
  }
  return pending;
}

export function savePendingEmailAfterDeliveryFailure(email: string): PendingEmailVerification {
  const normalized = email.trim().toLowerCase();
  return savePendingVerification({
    email: normalized,
    maskedEmail: maskEmail(normalized),
    resendAvailableInSeconds: 0,
  });
}

export function readPendingVerification(): PendingEmailVerification | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PendingEmailVerification>;
    if (
      typeof parsed.email !== "string" ||
      typeof parsed.maskedEmail !== "string" ||
      typeof parsed.resendAvailableAt !== "number"
    ) {
      clearPendingVerification();
      return null;
    }
    return parsed as PendingEmailVerification;
  } catch {
    clearPendingVerification();
    return null;
  }
}

export function clearPendingVerification(): void {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(STORAGE_KEY);
  }
}

export function pendingResendSeconds(pending: PendingEmailVerification): number {
  return Math.max(0, Math.ceil((pending.resendAvailableAt - Date.now()) / 1_000));
}

export function maskEmail(email: string): string {
  const [local = "", domain = ""] = email.split("@");
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"*".repeat(Math.max(3, local.length - visible.length))}@${domain}`;
}
