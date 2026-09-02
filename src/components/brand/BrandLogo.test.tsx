import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandLogo } from "./BrandLogo";

function setNaturalSize(image: HTMLImageElement, width: number, height: number) {
  Object.defineProperties(image, {
    naturalWidth: { configurable: true, value: width },
    naturalHeight: { configurable: true, value: height },
  });
  fireEvent.load(image);
}

describe("BrandLogo", () => {
  it.each([
    ["wide", 900, 180],
    ["standard", 600, 360],
    ["square", 400, 400],
    ["tall", 220, 600],
  ] as const)(
    "classifies a %s identity asset without changing its aspect ratio",
    (shape, width, height) => {
      const { container } = render(<BrandLogo name="BioReza Test" logoUrl={`/${shape}.svg`} />);
      const image = screen.getByRole<HTMLImageElement>("img", { name: "BioReza Test" });
      setNaturalSize(image, width, height);

      expect(container.firstElementChild).toHaveAttribute("data-shape", shape);
      expect(image).toHaveClass("brand-logo-frame__image");
      expect(image).not.toHaveAttribute("style");
    },
  );

  it("applies only validated non-destructive framing presets", () => {
    const { container } = render(
      <BrandLogo
        name="Aligned Brand"
        logoUrl="/transparent-logo.png"
        display={{ scale: "LARGE", padding: "COMPACT", alignX: "END", alignY: "BOTTOM" }}
      />,
    );
    expect(container.firstElementChild).toHaveAttribute("data-scale", "LARGE");
    expect(container.firstElementChild).toHaveAttribute("data-padding", "COMPACT");
    expect(container.firstElementChild).toHaveAttribute("data-align-x", "END");
    expect(container.firstElementChild).toHaveAttribute("data-align-y", "BOTTOM");
  });

  it("falls back to safe framing when legacy API data contains a null display", () => {
    const { container } = render(
      <BrandLogo name="Legacy Brand" logoUrl="/legacy.svg" display={null} />,
    );
    expect(container.firstElementChild).toHaveAttribute("data-scale", "STANDARD");
    expect(container.firstElementChild).toHaveAttribute("data-padding", "STANDARD");
    expect(container.firstElementChild).toHaveAttribute("data-align-x", "CENTER");
    expect(container.firstElementChild).toHaveAttribute("data-align-y", "CENTER");
  });

  it("renders the canonical Brand name for missing and failed media", () => {
    const { rerender } = render(<BrandLogo name="Missing Brand" logoUrl={null} />);
    expect(screen.getByText("Missing Brand")).toBeInTheDocument();

    rerender(<BrandLogo name="Failed Brand" logoUrl="/missing.svg" />);
    fireEvent.error(screen.getByRole("img", { name: "Failed Brand" }));
    expect(screen.getByText("Failed Brand")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Failed Brand" })).not.toBeInTheDocument();
  });
});
