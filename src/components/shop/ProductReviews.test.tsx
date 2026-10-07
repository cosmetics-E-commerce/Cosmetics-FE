import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductReviews } from "./ProductReviews";

const state = vi.hoisted(() => ({ user: { id: "customer-1" }, eligibility: vi.fn() }));
vi.mock("@/lib/store", () => ({ useStore: () => ({ user: state.user, locale: "en" }) }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));
vi.mock("@/lib/api", () => ({
  apiErrorMessage: () => "Failed",
  createProductReview: vi.fn(),
  getReviewEligibility: state.eligibility,
  listProductReviews: async () => ({
    items: [],
    summary: { count: 0, average: 0, distribution: {} },
  }),
}));

function setup() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const view = render(
    <QueryClientProvider client={client}>
      <ProductReviews productId="product" />
    </QueryClientProvider>,
  );
  return { client, ...view };
}

describe("Review purchase verification", () => {
  beforeEach(() => {
    state.user = { id: "customer-1" };
    state.eligibility.mockReset();
  });

  it("shows a retryable verification error instead of claiming there is no purchase", async () => {
    state.eligibility
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValue({ canReview: true, reason: "ELIGIBLE" });
    setup();
    expect(await screen.findByText("Couldn’t verify your purchase")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    await waitFor(() =>
      expect(screen.queryByText("Couldn’t verify your purchase")).not.toBeInTheDocument(),
    );
    expect(state.eligibility).toHaveBeenCalledTimes(2);
  });

  it("does not reuse another customer's purchase eligibility", async () => {
    state.eligibility
      .mockResolvedValueOnce({ canReview: false, reason: "NOT_DELIVERED" })
      .mockResolvedValue({ canReview: true, reason: "ELIGIBLE" });
    const { client, rerender } = setup();
    await waitFor(() =>
      expect(
        client.getQueryData(["reviews", "eligibility", "product", "customer-1"]),
      ).toBeDefined(),
    );
    state.user = { id: "customer-2" };
    rerender(
      <QueryClientProvider client={client}>
        <ProductReviews productId="product" />
      </QueryClientProvider>,
    );
    await waitFor(() =>
      expect(
        client.getQueryData(["reviews", "eligibility", "product", "customer-2"]),
      ).toMatchObject({ reason: "ELIGIBLE" }),
    );
    expect(state.eligibility).toHaveBeenCalledTimes(2);
  });
});
