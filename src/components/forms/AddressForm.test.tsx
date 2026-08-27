import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  listShippingAreas,
  listShippingCitiesByGovernorate,
  listShippingGovernorates,
} from "@/lib/api";
import { normalizeEgyptPhone } from "@/lib/forms";
import { AddressForm } from "./AddressForm";

vi.mock("@/lib/api", async (importActual) => {
  const actual = await importActual<typeof import("@/lib/api")>();
  return {
    ...actual,
    listShippingGovernorates: vi.fn(),
    listShippingCitiesByGovernorate: vi.fn(),
    listShippingAreas: vi.fn(),
  };
});

const governorates = [{ id: "CAI", name: "Cairo", nameAr: "القاهرة", code: "CAI" }];
const cities = [{ id: "bosta-cairo", name: "Nasr City", nameAr: "مدينة نصر" }];
const areas = [{ id: "bosta-nasr-district-1", name: "Abbas El Akkad", nameAr: "عباس العقاد" }];

function renderAddressForm(props: Partial<Parameters<typeof AddressForm>[0]> = {}) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <AddressForm onSubmit={vi.fn()} {...props} />
    </QueryClientProvider>,
  );
}

describe("normalizeEgyptPhone", () => {
  it.each([
    ["010 1234 5678", "01012345678"],
    ["+20 101 234 5678", "01012345678"],
    ["0020-101-234-5678", "01012345678"],
  ])("normalizes %s", (input, expected) => {
    expect(normalizeEgyptPhone(input)).toBe(expected);
  });
});

describe("AddressForm", () => {
  beforeEach(() => {
    vi.mocked(listShippingGovernorates).mockResolvedValue(governorates);
    vi.mocked(listShippingCitiesByGovernorate).mockResolvedValue(cities);
    vi.mocked(listShippingAreas).mockResolvedValue(areas);
  });

  it("submits the selected Bosta location ids with the address", async () => {
    const onSubmit = vi.fn();
    renderAddressForm({ onSubmit });

    fireEvent.change(screen.getByLabelText(/receiver name/i), {
      target: { value: "Sara Ahmed" },
    });
    fireEvent.change(screen.getByLabelText(/egyptian mobile number/i), {
      target: { value: "01012345678" },
    });

    const governorate = await screen.findByRole("combobox", { name: /governorate/i });
    await waitFor(() => expect(governorate).not.toBeDisabled());
    fireEvent.click(governorate);
    fireEvent.click(await screen.findByText("Cairo"));
    await waitFor(() => expect(governorate).toHaveTextContent("Cairo"));
    await waitFor(() => expect(listShippingCitiesByGovernorate).toHaveBeenCalledWith("CAI"));

    const city = await screen.findByRole("combobox", { name: /city \/ markaz/i });
    await waitFor(() => expect(city).not.toBeDisabled());
    fireEvent.click(city);
    fireEvent.click(await screen.findByText("Nasr City"));
    await waitFor(() => expect(city).toHaveTextContent("Nasr City"));
    await waitFor(() => expect(listShippingAreas).toHaveBeenCalledWith("bosta-cairo"));

    const area = await screen.findByRole("combobox", { name: /district \/ area/i });
    await waitFor(() => expect(area).not.toBeDisabled());
    fireEvent.click(area);
    fireEvent.click(await screen.findByText("Abbas El Akkad"));
    fireEvent.change(screen.getByLabelText(/^street/i), {
      target: { value: "Maher Badawy" },
    });
    fireEvent.change(screen.getByLabelText(/^building/i), {
      target: { value: "89" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /save and use/i }).closest("form")!);

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        governorate: "Cairo",
        city: "Nasr City",
        area: "Abbas El Akkad",
        bostaGovernorateId: "CAI",
        bostaCityId: "bosta-cairo",
        bostaZoneId: "bosta-nasr-district-1",
      }),
    );
  });

  it("searches bilingual areas and clears dependent selections", async () => {
    renderAddressForm({ locale: "ar" });

    const governorate = await screen.findByRole("combobox", { name: /المحافظة/i });
    await waitFor(() => expect(governorate).not.toBeDisabled());
    fireEvent.click(governorate);
    fireEvent.click(await screen.findByText("القاهرة"));

    const city = await screen.findByRole("combobox", { name: /المدينة/i });
    await waitFor(() => expect(city).not.toBeDisabled());
    fireEvent.click(city);
    fireEvent.click(await screen.findByText("مدينة نصر"));

    const area = await screen.findByRole("combobox", { name: /المنطقة/i });
    await waitFor(() => expect(area).not.toBeDisabled());
    fireEvent.click(area);
    fireEvent.change(screen.getByPlaceholderText(/ابحث عن المنطقة/i), {
      target: { value: "عباس" },
    });
    expect(await screen.findByText("عباس العقاد")).toBeVisible();
    fireEvent.click(screen.getByText("عباس العقاد"));

    fireEvent.click(governorate);
    fireEvent.click(await screen.findByText("القاهرة"));
    expect(city).toHaveTextContent("اختر المدينة");
    expect(area).toBeDisabled();
  });
});
