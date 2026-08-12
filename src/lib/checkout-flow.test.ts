import { describe, expect, it } from "vitest";
import {
  canVisitCheckoutStep,
  checkoutStepIndex,
  isStepComplete,
  parseCheckoutStep,
} from "./checkout-flow";

describe("checkout flow", () => {
  it("accepts only real route steps", () => {
    expect(parseCheckoutStep("delivery")).toBe("delivery");
    expect(parseCheckoutStep("payment")).toBe("payment");
    expect(parseCheckoutStep("review")).toBe("review");
    expect(parseCheckoutStep("confirmation")).toBeUndefined();
    expect(parseCheckoutStep("anything-else")).toBeUndefined();
  });

  it("guards forward navigation without blocking back navigation", () => {
    expect(canVisitCheckoutStep("delivery", { hasDelivery: false, hasPayment: false })).toBe(true);
    expect(canVisitCheckoutStep("payment", { hasDelivery: false, hasPayment: true })).toBe(false);
    expect(canVisitCheckoutStep("payment", { hasDelivery: true, hasPayment: false })).toBe(true);
    expect(canVisitCheckoutStep("review", { hasDelivery: true, hasPayment: false })).toBe(false);
    expect(canVisitCheckoutStep("review", { hasDelivery: true, hasPayment: true })).toBe(true);
  });

  it("tracks completed progress without marking the active step complete", () => {
    expect(checkoutStepIndex("review")).toBe(2);
    expect(isStepComplete("delivery", "review")).toBe(true);
    expect(isStepComplete("review", "review")).toBe(false);
  });
});
