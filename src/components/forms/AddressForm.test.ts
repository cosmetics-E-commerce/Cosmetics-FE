import { describe, expect, it } from "vitest";

import { normalizeEgyptPhone } from "@/lib/forms";

describe("normalizeEgyptPhone", () => {
  it.each([
    ["010 1234 5678", "01012345678"],
    ["+20 101 234 5678", "01012345678"],
    ["0020-101-234-5678", "01012345678"],
  ])("normalizes %s", (input, expected) => {
    expect(normalizeEgyptPhone(input)).toBe(expected);
  });
});
