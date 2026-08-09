import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { AddressForm } from "@/components/forms/AddressForm";

describe("AddressForm accessibility", () => {
  it("labels every field and has no automatic accessibility violations", async () => {
    const { container } = render(<AddressForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Receiver name")).toBeInTheDocument();
    expect(screen.getByLabelText("Egyptian mobile number")).toBeInTheDocument();
    expect((await axe.run(container)).violations).toEqual([]);
  });

  it("focuses the first invalid field and keeps the entered values", async () => {
    render(<AddressForm onSubmit={vi.fn()} />);
    const phone = screen.getByLabelText("Egyptian mobile number");
    fireEvent.change(phone, { target: { value: "0123" } });
    fireEvent.submit(phone.closest("form")!);

    await waitFor(() => expect(screen.getByLabelText("Receiver name")).toHaveFocus());
    expect(phone).toHaveValue("0123");
    expect(screen.getByText(/11-digit Egyptian mobile number/)).toBeInTheDocument();
  });
});
