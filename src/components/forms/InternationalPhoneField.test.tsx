import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InternationalPhoneField } from "./InternationalPhoneField";
import { isValidInternationalPhone, normalizeInternationalPhone } from "@/lib/international-phone";

describe("InternationalPhoneField", () => {
  it.each([
    ["01012345678", "+201012345678"],
    ["+966501234567", "+966501234567"],
    ["+971501234567", "+971501234567"],
    ["+14155552671", "+14155552671"],
    ["+447911123456", "+447911123456"],
  ])("normalizes %s to E.164", (input, expected) => {
    expect(normalizeInternationalPhone(input)).toBe(expected);
    expect(isValidInternationalPhone(input)).toBe(true);
  });

  it("defaults the searchable country selector to Egypt and submits E.164", () => {
    const { container } = render(
      <InternationalPhoneField label="Phone Number" defaultValue="01012345678" />,
    );
    expect(screen.getByRole("button", { name: "Choose country calling code" })).toHaveTextContent(
      "+20",
    );
    expect(screen.getByLabelText("Phone Number")).toHaveValue("010 12345678");
    expect(container.querySelector('input[name="phone"]')).toHaveValue("+201012345678");
  });

  it("opens a keyboard-searchable full country list", () => {
    render(<InternationalPhoneField label="Phone Number" />);
    fireEvent.click(screen.getByRole("button", { name: "Choose country calling code" }));
    expect(screen.getByPlaceholderText("Search country or calling code…")).toBeVisible();
    expect(screen.getByText("Saudi Arabia")).toBeInTheDocument();
  });
});
