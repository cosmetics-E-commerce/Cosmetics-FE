import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearSession,
  createSupportRequest,
  listProductsPage,
  listProductReviews,
  normalizeProductReviews,
  refreshSession,
  register,
  resolveApiBase,
  resendRegistrationOtp,
  subscribeNewsletter,
  verifyRegistrationEmail,
} from "./api";

beforeEach(() => window.localStorage.clear());
afterEach(() => {
  clearSession();
  vi.unstubAllGlobals();
});

describe("client session transport", () => {
  it("keeps the API and storefront on the same site during local development", () => {
    expect(
      resolveApiBase("http://127.0.0.1:3000/api/v1", {
        hostname: "localhost",
        protocol: "http:",
      }),
    ).toBe("http://localhost:3000/api/v1");
    expect(
      resolveApiBase("http://127.0.0.1:3000/api/v1", {
        hostname: "192.168.1.20",
        protocol: "http:",
      }),
    ).toBe("http://192.168.1.20:3000/api/v1");
    expect(
      resolveApiBase("https://api.bioreza.com/api/v1", {
        hostname: "bioreza.com",
        protocol: "https:",
      }),
    ).toBe("https://api.bioreza.com/api/v1");
  });

  it("does not destroy a valid refresh marker during a temporary outage", async () => {
    window.localStorage.setItem("bioreza.csrf", "still-valid");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));

    await expect(refreshSession()).rejects.toMatchObject({ code: "NETWORK_ERROR" });
    expect(window.localStorage.getItem("bioreza.csrf")).toBe("still-valid");
  });

  it("clears a terminally invalid refresh session", async () => {
    window.localStorage.setItem("bioreza.csrf", "expired");
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(
            JSON.stringify({ code: "INVALID_REFRESH_TOKEN", message: "Refresh expired" }),
            { status: 401, headers: { "Content-Type": "application/json" } },
          ),
        ),
    );

    await expect(refreshSession()).rejects.toMatchObject({ code: "INVALID_REFRESH_TOKEN" });
    expect(window.localStorage.getItem("bioreza.csrf")).toBeNull();
  });
});

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

describe("catalog pagination API", () => {
  it("keeps product pagination metadata from the server", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: [
            {
              id: "product-id",
              slug: "stress-product-0001",
              nameEn: "Stress Product",
            },
          ],
          meta: {
            page: 2,
            limit: 24,
            total: 1000,
            totalPages: 42,
            hasNext: true,
            hasPrev: true,
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(listProductsPage({ page: 2, limit: 24 })).resolves.toMatchObject({
      items: [{ id: "product-id", slug: "stress-product-0001" }],
      meta: {
        page: 2,
        limit: 24,
        total: 1000,
        totalPages: 42,
        hasNext: true,
        hasPrev: true,
      },
    });
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("/products?page=2&limit=24");
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
