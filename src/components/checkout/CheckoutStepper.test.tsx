import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CheckoutStepper } from "./CheckoutStepper";

describe("CheckoutStepper", () => {
  it("keeps completed-order navigation inside the supplied checkout handler", () => {
    const onNavigate = vi.fn();

    render(
      <CheckoutStepper
        current="confirmation"
        completedThrough="confirmation"
        furthest="confirmation"
        allowConfirmationNavigation
        locale="en"
        onNavigate={onNavigate}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /delivery/i }));
    fireEvent.click(screen.getByRole("button", { name: /payment/i }));
    fireEvent.click(screen.getByRole("button", { name: /review/i }));

    expect(onNavigate.mock.calls.map(([step]) => step)).toEqual(["delivery", "payment", "review"]);
  });

  it("allows returning to confirmation after inspecting a completed step", () => {
    const onNavigate = vi.fn();

    render(
      <CheckoutStepper
        current="delivery"
        completedThrough="confirmation"
        furthest="confirmation"
        allowConfirmationNavigation
        locale="en"
        onNavigate={onNavigate}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /confirmation/i }));
    expect(onNavigate).toHaveBeenCalledWith("confirmation");
  });
});
