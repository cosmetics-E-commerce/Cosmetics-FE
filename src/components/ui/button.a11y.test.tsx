import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button accessibility", () => {
  it("has no automatic accessibility violations", async () => {
    const { container } = render(<Button type="button">Continue to payment</Button>);
    expect((await axe.run(container)).violations).toEqual([]);
  });
});
