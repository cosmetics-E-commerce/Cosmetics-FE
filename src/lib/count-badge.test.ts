import { describe, expect, it } from "vitest";

import { displayCountBadge } from "./count-badge";

describe("header count badges", () => {
  it.each([
    [0, "0"],
    [1, "1"],
    [99, "99"],
    [100, "99+"],
    [250, "99+"],
  ])("formats %i as %s", (count, expected) => {
    expect(displayCountBadge(count)).toBe(expected);
  });
});
