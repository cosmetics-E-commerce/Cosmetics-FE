import { describe, expect, it } from "vitest";

import { apiErrorMessage } from "@/lib/api";

describe("customer-facing API errors", () => {
  it("translates technical cart failures into a recovery step", () => {
    expect(
      apiErrorMessage({
        statusCode: 409,
        code: "CART_INSUFFICIENT_STOCK",
        message: "reservation invariant conflict",
      }),
    ).toContain("not enough stock");
  });

  it("does not expose server internals for 5xx failures", () => {
    expect(
      apiErrorMessage({
        statusCode: 500,
        code: "INTERNAL_ERROR",
        message: "PrismaClientKnownRequestError at orders.service.ts:382",
      }),
    ).not.toContain("Prisma");
  });

  it("returns Arabic recovery copy when Arabic is active", () => {
    expect(
      apiErrorMessage({ statusCode: 0, code: "NETWORK_ERROR", message: "fetch failed" }, "ar"),
    ).toContain("الاتصال");
  });
});
