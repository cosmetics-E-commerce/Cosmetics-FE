import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSupportRequest,
  listProductReviews,
  normalizeProductReviews,
  register,
  resendRegistrationOtp,
  subscribeNewsletter,
  verifyRegistrationEmail,
} from "./api";

afterEach(() => vi.unstubAllGlobals());

describe("customer-care API", () => {
  it("posts explicit newsletter consent", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: { subscribed: true } }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    await expect(subscribeNewsletter("customer@example.com", "ar")).resolves.toEqual({
      subscribed: true,
    });
    expect(JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body))).toEqual({
      email: "customer@example.com",
      locale: "ar",
      consent: true,
    });
  });

  it("surfaces the API problem message", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ code: "INVALID", message: "Check the request" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    await expect(
      createSupportRequest({
        name: "Sara",
        email: "sara@example.com",
        subject: "Order",
        message: "Please help with my delivered order.",
        locale: "en",
      }),
    ).rejects.toMatchObject({ code: "INVALID", message: "Check the request" });
  });
});

describe("email verification API", () => {
  it("registers without creating an authenticated frontend session", async () => {
    const challenge = {
      email: "sara@example.com",
      maskedEmail: "sa***@example.com",
      ttlSeconds: 600,
      resendAvailableInSeconds: 60,
      verificationRequired: true,
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: challenge }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(register({ email: "sara@example.com" })).resolves.toEqual(challenge);
    expect(JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body))).toEqual({
      email: "sara@example.com",
    });
  });

  it("uses the dedicated verify and resend endpoints", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ success: true, data: { verified: true } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            success: true,
            data: { ttlSeconds: 600, resendAvailableInSeconds: 60 },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(verifyRegistrationEmail("sara@example.com", "123456")).resolves.toEqual({
      verified: true,
    });
    await expect(resendRegistrationOtp("sara@example.com")).resolves.toEqual({
      ttlSeconds: 600,
      resendAvailableInSeconds: 60,
    });
    expect(fetchMock.mock.calls[0]?.[0]).toContain("/auth/verify-email");
    expect(fetchMock.mock.calls[1]?.[0]).toContain("/auth/resend-verification-otp");
  });
});

describe("product reviews API", () => {
  it("normalizes the legacy paginated array that previously crashed product pages", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            success: true,
            data: [],
            meta: { page: 1, limit: 50, total: 0, totalPages: 0 },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );

    await expect(listProductReviews("product-id")).resolves.toEqual({
      items: [],
      summary: {
        average: 0,
        count: 0,
        distribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
      },
      meta: { page: 1, totalPages: 0, total: 0 },
    });
  });

  it("keeps the server-provided aggregate summary", () => {
    const summary = {
      average: 4.8,
      count: 12,
      distribution: { "1": 0, "2": 0, "3": 1, "4": 1, "5": 10 },
    };
    expect(
      normalizeProductReviews({
        items: [],
        summary,
        meta: { page: 1, totalPages: 1, total: 12 },
      }).summary,
    ).toEqual(summary);
  });
});
