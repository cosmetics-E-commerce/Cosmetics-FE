import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { IngredientInfo } from "@/lib/products";
import { IngredientExplorer } from "./IngredientExplorer";

const testState = vi.hoisted(() => ({ mobile: false }));

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => testState.mobile,
}));

const ingredients: IngredientInfo[] = [
  ingredient("titanium", "Titanium Dioxide"),
  ingredient("zinc", "Zinc Oxide"),
];

describe("IngredientExplorer", () => {
  beforeEach(() => {
    testState.mobile = false;
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("opens one keyboard-accessible desktop card and dismisses it with Escape", async () => {
    render(<IngredientExplorer ingredients={ingredients} locale="en" />);
    const titanium = screen.getByRole("button", {
      name: "Information about Titanium Dioxide",
    });
    const zinc = screen.getByRole("button", { name: "Information about Zinc Oxide" });

    titanium.focus();
    await screen.findByRole("dialog", { name: "Information about Titanium Dioxide" });
    zinc.focus();

    const zincDialog = await screen.findByRole("dialog", {
      name: "Information about Zinc Oxide",
    });
    expect(screen.queryByRole("dialog", { name: "Information about Titanium Dioxide" })).toBeNull();
    expect(zinc).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(zincDialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(zinc).toHaveFocus();
  });

  it("uses a dismissible sheet instead of hover behavior on touch layouts", async () => {
    testState.mobile = true;
    render(<IngredientExplorer ingredients={ingredients} locale="en" />);
    const zinc = screen.getByRole("button", { name: "Information about Zinc Oxide" });

    fireEvent.click(zinc);
    const sheet = await screen.findByRole("dialog");
    expect(sheet).toHaveTextContent("Zinc Oxide");
    expect(zinc).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(sheet, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("localizes its customer-facing controls while preserving a deliberate content fallback", async () => {
    testState.mobile = true;
    render(<IngredientExplorer ingredients={[ingredients[0]!]} locale="ar" />);

    fireEvent.click(screen.getByRole("button", { name: "معلومات عن Titanium Dioxide" }));
    const sheet = await screen.findByRole("dialog");
    expect(sheet).toHaveTextContent("الفوائد");
    expect(sheet).toHaveTextContent("Titanium Dioxide description");
  });
});

function ingredient(id: string, inciName: string): IngredientInfo {
  return {
    id,
    inciName,
    commonName: null,
    slug: id,
    position: 0,
    concentration: null,
    concentrationUnit: null,
    notes: null,
    shortDescriptionEn: `${inciName} description`,
    shortDescriptionAr: null,
    functions: ["Skin protectant"],
    benefits: ["Supports the skin"],
    concerns: [],
    goodFor: [],
    avoidIf: [],
    skinTypes: [],
    skinConcerns: [],
    regulatoryNotes: null,
    restrictions: null,
    safetyNotes: null,
  };
}
