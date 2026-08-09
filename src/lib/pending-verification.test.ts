import { beforeEach, describe, expect, it } from "vitest";

import {
  clearPendingVerification,
  pendingResendSeconds,
  readPendingVerification,
  savePendingVerification,
} from "./pending-verification";

describe("pending email verification state", () => {
  beforeEach(() => window.sessionStorage.clear());

  it("survives a page reload without storing passwords or OTP values", () => {
    savePendingVerification({
      email: "SARA@Example.com",
      maskedEmail: "sa***@example.com",
      resendAvailableInSeconds: 60,
    });

    expect(readPendingVerification()).toEqual(
      expect.objectContaining({
        email: "sara@example.com",
        maskedEmail: "sa***@example.com",
      }),
    );
    const persisted = window.sessionStorage.getItem("bioreza.pending-email-verification");
    expect(persisted).not.toContain("password");
    expect(persisted).not.toContain("otp");
  });

  it("tracks the server cooldown and can be cleared after verification", () => {
    const pending = savePendingVerification({
      email: "sara@example.com",
      maskedEmail: "sa***@example.com",
      resendAvailableInSeconds: 60,
    });

    expect(pendingResendSeconds(pending)).toBeGreaterThan(0);
    clearPendingVerification();
    expect(readPendingVerification()).toBeNull();
  });
});
