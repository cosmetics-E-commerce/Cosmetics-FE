import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Reveal, TextReveal } from "./Primitives";

describe("motion primitives", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("preserves semantic elements and accessibility attributes", async () => {
    render(
      <Reveal as="section" aria-label="Editorial story">
        Visible story
      </Reveal>,
    );
    const section = screen.getByRole("region", { name: "Editorial story" });
    expect(section).toHaveTextContent("Visible story");
    await waitFor(() => expect(section).toHaveAttribute("data-motion-state", "visible"));
  });

  it("renders editorial heading lines as readable text", async () => {
    render(<TextReveal as="h1" lines={["Healthy skin", "is beautiful skin."]} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Healthy skin is beautiful skin.");
    await waitFor(() => expect(heading).toHaveAttribute("data-motion-state", "visible"));
  });

  it("reveals from the scroll bounds fallback when IntersectionObserver does not deliver", async () => {
    let top = 2_000;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      },
    );
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      () =>
        ({
          top,
          bottom: top + 100,
          left: 0,
          right: 100,
          width: 100,
          height: 100,
          x: 0,
          y: top,
          toJSON: () => ({}),
        }) as DOMRect,
    );

    render(<Reveal>Campaign image</Reveal>);
    const reveal = screen.getByText("Campaign image");
    expect(reveal).toHaveAttribute("data-motion-state", "hidden");

    top = 100;
    window.dispatchEvent(new Event("scroll"));
    await waitFor(() => expect(reveal).toHaveAttribute("data-motion-state", "visible"));
  });
});
