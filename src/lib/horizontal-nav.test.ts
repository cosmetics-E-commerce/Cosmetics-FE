import { describe, expect, it, vi } from "vitest";
import { scrollElementHorizontallyIntoView } from "./horizontal-nav";

function horizontalElement(
  rect: Pick<DOMRect, "left" | "right" | "width">,
  overrides: Partial<HTMLElement> = {},
): HTMLElement {
  return {
    getBoundingClientRect: () => rect as DOMRect,
    ...overrides,
  } as HTMLElement;
}

describe("scrollElementHorizontallyIntoView", () => {
  it("does nothing when the active tab is already visible", () => {
    const scrollTo = vi.fn();
    const scroller = horizontalElement(
      { left: 0, right: 320, width: 320 },
      { scrollLeft: 48, scrollTo },
    );
    const tab = horizontalElement({ left: 90, right: 170, width: 80 });

    expect(scrollElementHorizontallyIntoView(scroller, tab)).toBe(false);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("reveals an LTR tab with a horizontal-only scroll instruction", () => {
    const scrollTo = vi.fn();
    const scroller = horizontalElement(
      { left: 20, right: 340, width: 320 },
      { scrollLeft: 60, scrollTo },
    );
    const tab = horizontalElement({ left: 350, right: 430, width: 80 });

    expect(scrollElementHorizontallyIntoView(scroller, tab, { behavior: "smooth" })).toBe(true);
    expect(scrollTo).toHaveBeenCalledWith({ left: 270, behavior: "smooth" });
    expect(scrollTo.mock.calls[0]?.[0]).not.toHaveProperty("top");
  });

  it("preserves negative RTL scroll coordinates while changing only X", () => {
    const scrollTo = vi.fn();
    const scroller = horizontalElement(
      { left: 20, right: 340, width: 320 },
      { scrollLeft: -40, scrollTo },
    );
    const tab = horizontalElement({ left: -90, right: -10, width: 80 });

    expect(scrollElementHorizontallyIntoView(scroller, tab, { behavior: "auto" })).toBe(true);
    expect(scrollTo).toHaveBeenCalledWith({ left: -270, behavior: "auto" });
    expect(scrollTo.mock.calls[0]?.[0]).not.toHaveProperty("top");
  });
});
