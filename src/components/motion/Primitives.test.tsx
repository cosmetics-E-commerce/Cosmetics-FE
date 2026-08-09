import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ImageReveal, Reveal, TextReveal } from "./Primitives";

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

  it("uses IntersectionObserver without installing per-component scroll work", async () => {
    let callback: IntersectionObserverCallback | undefined;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(next: IntersectionObserverCallback) {
          callback = next;
        }
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      },
    );
    const scrollListener = vi.spyOn(window, "addEventListener");

    render(<Reveal>Campaign image</Reveal>);
    const reveal = screen.getByText("Campaign image");
    expect(reveal).toHaveAttribute("data-motion-state", "hidden");
    expect(scrollListener).not.toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      expect.anything(),
    );

    callback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    await waitFor(() => expect(reveal).toHaveAttribute("data-motion-state", "visible"));
  });

  it("reveals deferred images when their observer enters the viewport", async () => {
    let callback: IntersectionObserverCallback | undefined;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(next: IntersectionObserverCallback) {
          callback = next;
        }
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      },
    );

    render(
      <ImageReveal>
        <img src="/category.jpg" alt="Haircare" />
      </ImageReveal>,
    );
    const image = screen.getByRole("img", { name: "Haircare" });
    const reveal = image.closest(".motion-image-reveal");
    expect(reveal).toHaveAttribute("data-motion-state", "hidden");

    callback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    await waitFor(() => expect(reveal).toHaveAttribute("data-motion-state", "visible"));
  });
});
