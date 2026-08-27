import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axe from "axe-core";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AddressForm } from "@/components/forms/AddressForm";
import {
  listShippingAreas,
  listShippingCitiesByGovernorate,
  listShippingGovernorates,
} from "@/lib/api";

vi.mock("@/lib/api", async (importActual) => {
  const actual = await importActual<typeof import("@/lib/api")>();
  return {
    ...actual,
    listShippingGovernorates: vi.fn(),
    listShippingCitiesByGovernorate: vi.fn(),
    listShippingAreas: vi.fn(),
  };
});

function renderAddressForm() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <AddressForm onSubmit={vi.fn()} />
    </QueryClientProvider>,
  );
}

describe("AddressForm accessibility", () => {
  beforeEach(() => {
    vi.mocked(listShippingGovernorates).mockResolvedValue([
      { id: "CAI", name: "Cairo", nameAr: "القاهرة", code: "CAI" },
    ]);
    vi.mocked(listShippingCitiesByGovernorate).mockResolvedValue([
      { id: "bosta-cairo", name: "Nasr City", nameAr: "مدينة نصر" },
    ]);
    vi.mocked(listShippingAreas).mockResolvedValue([
      { id: "EG012604", name: "Al-Nadi Al-Ahli", nameAr: "النادي الأهلي" },
    ]);
  });

  it("labels every field and has no automatic accessibility violations", async () => {
    const { container } = renderAddressForm();
    expect(screen.getByLabelText("Receiver name")).toBeInTheDocument();
    expect(screen.getByLabelText("Egyptian mobile number")).toBeInTheDocument();
    expect((await axe.run(container)).violations).toEqual([]);
  });

  it("focuses the first invalid field and keeps the entered values", async () => {
    renderAddressForm();
    const phone = screen.getByLabelText("Egyptian mobile number");
    fireEvent.change(phone, { target: { value: "0123" } });
    fireEvent.submit(phone.closest("form")!);

    await waitFor(() => expect(screen.getByLabelText("Receiver name")).toHaveFocus());
    expect(phone).toHaveValue("0123");
    expect(screen.getByText(/11-digit Egyptian mobile number/)).toBeInTheDocument();
  });
});
