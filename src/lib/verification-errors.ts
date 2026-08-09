const messages: Record<string, string> = {
  OTP_INVALID: "The verification code is incorrect.",
  INVALID_OTP: "The verification code is incorrect.",
  OTP_EXPIRED: "This verification code has expired. Request a new one.",
  OTP_TOO_MANY_ATTEMPTS: "Too many incorrect attempts. Request a new code.",
  OTP_RESEND_COOLDOWN: "Please wait before requesting another code.",
  VERIFICATION_SESSION_EXPIRED:
    "This registration has expired. Create your account again to continue.",
  EMAIL_ALREADY_VERIFIED: "This email is already verified. You can sign in.",
  EMAIL_DELIVERY_FAILED: "We could not send the verification email. Try again shortly.",
  EMAIL_PROVIDER_UNAVAILABLE: "Email delivery is temporarily unavailable. Try again shortly.",
  EMAIL_PROVIDER_NOT_CONFIGURED: "Email delivery is temporarily unavailable.",
  REDIS_REQUIRED: "Verification is temporarily unavailable. Try again shortly.",
  REDIS_UNAVAILABLE: "Verification is temporarily unavailable. Try again shortly.",
  RATE_LIMITED: "Too many requests. Please wait and try again.",
};

export function verificationErrorMessage(code: string): string {
  return messages[code] ?? "We could not complete verification. Please try again.";
}
