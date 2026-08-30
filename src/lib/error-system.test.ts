import { describe, expect, it } from "vitest";

import { humanErrorMessage, normalizeStoreApiError } from "./error-system";

describe("storefront human error registry", () => {
  it("explains coupon minimums using authoritative structured values", () => {
    const error = normalizeStoreApiError(
      {
        code: "COUPON_NOT_APPLICABLE",
        details: { minimumSubtotal: 1000, eligibleSubtotal: 780 },
      },
      409,
      "en",
    );
    expect(humanErrorMessage(error, "en")).toContain("EGP 1,000");
    expect(humanErrorMessage(error, "en")).toContain("EGP 780");
  });

  it.each([
    ["COUPON_TOTAL_LIMIT_REACHED", "redemption limit", "الحد الأقصى"],
    ["COUPON_CUSTOMER_LIMIT_REACHED", "customer limit", "حد العملاء"],
    ["COUPON_CUSTOMER_USAGE_LIMIT", "maximum number of times", "الحد الأقصى"],
  ])("localizes the committed coupon limit reason %s", (code, english, arabic) => {
    expect(humanErrorMessage(normalizeStoreApiError({ code }, 409, "en"), "en")).toContain(english);
    expect(humanErrorMessage(normalizeStoreApiError({ code }, 409, "ar"), "ar")).toContain(arabic);
  });

  it("uses fully Arabic copy for checkout address relationships", () => {
    const error = normalizeStoreApiError(
      {
        code: "INVALID_CITY",
        message: "City does not belong to governorate",
      },
      422,
      "ar",
    );
    const message = humanErrorMessage(error, "ar");
    expect(message).toContain("موقع التوصيل");
    expect(message).not.toMatch(/INVALID_CITY|governorate|City/);
  });

  it("includes an actionable reference for an unknown server failure", () => {
    const error = normalizeStoreApiError(
      {
        code: "INTERNAL_ERROR",
        message: "PrismaClientKnownRequestError SELECT password",
        requestId: "trace-customer-42",
      },
      500,
      "en",
    );
    const message = humanErrorMessage(error, "en");
    expect(message).toContain("Reference: trace-customer-42");
    expect(message).not.toMatch(/Prisma|SELECT|password/);
  });

  it("distinguishes network loss from a server response", () => {
    const error = normalizeStoreApiError(null, 0, "en", "NETWORK_UNAVAILABLE");
    expect(error.retryable).toBe(true);
    expect(humanErrorMessage(error, "en")).toContain("No internet connection");
    expect(humanErrorMessage(error, "en")).toContain("Nothing was submitted");
  });

  it("localizes field feedback rather than returning raw English in Arabic", () => {
    const error = normalizeStoreApiError(
      {
        code: "VALIDATION_FAILED",
        fieldErrors: { "address.cityId": ["City must belong to governorate."] },
      },
      422,
      "ar",
    );
    expect(error.fieldErrors["address.cityId"]).toEqual(["راجعي هذه القيمة."]);
  });

  it("localizes unmapped known error families instead of exposing English or codes", () => {
    const error = normalizeStoreApiError(
      {
        code: "PAYMENT_METHOD_MISMATCH",
        message: "Payment method does not match the order.",
      },
      422,
      "ar",
    );
    const message = humanErrorMessage(error, "ar");
    expect(message).toContain("راجعي");
    expect(message).not.toMatch(/PAYMENT_METHOD_MISMATCH|Payment method/);
  });
});
