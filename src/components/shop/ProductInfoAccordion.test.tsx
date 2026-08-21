import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductInfoAccordion, type ProductInfoSection } from "./ProductInfoAccordion";

const sections: ProductInfoSection[] = [
  {
    id: "description",
    label: "Description",
    content: "First paragraph.\n\nSecond paragraph.",
    benefits: ["Hydrates without a sticky finish"],
  },
  {
    id: "custom",
    label: "How to use",
    content: "Apply   after cleansing.\n  Pat dry.",
  },
  {
    id: "delivery",
    label: "Delivery policy",
    content: "Delivery is calculated for your address.",
  },
  {
    id: "returns",
    label: "Shipping & Return",
    content: "Returns are available for unopened products.",
  },
];

describe("ProductInfoAccordion", () => {
  it("opens Description by default and toggles sections independently", () => {
    render(<ProductInfoAccordion sections={sections} label="Product details" />);

    const description = screen.getByRole("button", { name: "Description" });
    const howToUse = screen.getByRole("button", { name: "How to use" });

    expect(description).toHaveAttribute("type", "button");
    expect(howToUse).toHaveAttribute("type", "button");
    expect(description).toHaveAttribute("aria-expanded", "true");
    expect(howToUse).toHaveAttribute("aria-expanded", "false");
    expect(description).toHaveAttribute("aria-controls");
    expect(howToUse).toHaveAttribute("aria-controls");
    expect(description).toHaveAttribute("data-state", "open");
    expect(howToUse).toHaveAttribute("data-state", "closed");
    const howToUsePanel = document.getElementById(howToUse.getAttribute("aria-controls")!);
    expect(howToUsePanel).toHaveAttribute("aria-labelledby", howToUse.id);
    expect(document.querySelector('[role="tablist"]')).not.toBeInTheDocument();
    const descriptionCopy = document.querySelector(".product-reference-description-copy");
    expect(descriptionCopy).toHaveTextContent("First paragraph. Second paragraph.");

    fireEvent.click(howToUse);
    expect(description).toHaveAttribute("aria-expanded", "true");
    expect(howToUse).toHaveAttribute("aria-expanded", "true");
    expect(description).toHaveAttribute("data-state", "open");
    expect(howToUse).toHaveAttribute("data-state", "open");
    expect(document.querySelector(".product-how-to-use-copy")?.textContent).toBe(
      "Apply   after cleansing.\n  Pat dry.",
    );

    fireEvent.click(howToUse);
    expect(description).toHaveAttribute("aria-expanded", "true");
    expect(howToUse).toHaveAttribute("aria-expanded", "false");
    expect(howToUse).toHaveAttribute("data-state", "closed");
  });

  it("omits optional sections without authored content", () => {
    render(
      <ProductInfoAccordion
        sections={sections.map((section) =>
          section.id === "custom" ? { ...section, content: "" } : section,
        )}
        label="Product details"
      />,
    );

    expect(screen.queryByRole("button", { name: "How to use" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delivery policy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Shipping & Return" })).toBeInTheDocument();
  });
});
