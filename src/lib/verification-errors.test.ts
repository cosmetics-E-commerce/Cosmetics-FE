import { describe, expect, it } from "vitest";

import { verificationErrorMessage } from "./verification-errors";

describe("verification error mapping", () => {
  it.each([
    ["OTP_INVALID", "incorrect"],
    ["OTP_EXPIRED", "expired"],
    ["OTP_TOO_MANY_ATTEMPTS", "Too many"],
    ["VERIFICATION_SESSION_EXPIRED", "registration has expired"],
  ])("maps %s to actionable copy", (code, copy) => {
    expect(verificationErrorMessage(code)).toContain(copy);
  });
});
