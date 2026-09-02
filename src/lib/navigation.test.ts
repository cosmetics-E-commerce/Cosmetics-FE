import { describe, expect, it } from "vitest";
import { DEFAULT_NAVIGATION_CONFIG, type NavigationVisibility } from "@cosmetics/contracts";

import {
  localizedNavigationText,
  navigationVisibilityAllows,
  publishedNavigationIsUsable,
} from "./navigation";

describe("published navigation", () => {
  it("uses the requested locale and a deliberate fallback", () => {
    expect(localizedNavigationText({ en: "Brands", ar: "العلامات" }, "ar")).toBe("العلامات");
    expect(localizedNavigationText({ en: "Brands", ar: "" }, "ar")).toBe("Brands");
  });

  it("applies locale, device and date visibility without executable rules", () => {
    const visibility: NavigationVisibility = {
      devices: ["MOBILE"],
      locales: ["ar"],
      startsAt: "2026-08-20T00:00:00.000Z",
      endsAt: "2026-08-30T00:00:00.000Z",
    };
    const now = Date.parse("2026-08-23T12:00:00.000Z");
    expect(navigationVisibilityAllows(visibility, "ar", "MOBILE", now)).toBe(true);
    expect(navigationVisibilityAllows(visibility, "en", "MOBILE", now)).toBe(false);
    expect(navigationVisibilityAllows(visibility, "ar", "DESKTOP", now)).toBe(false);
  });

  it("rejects the server safety snapshot so the existing header remains the fallback", () => {
    const fallback = {
      schemaVersion: 2 as const,
      revisionId: "fallback",
      revision: 0,
      publishedAt: new Date(0).toISOString(),
      config: DEFAULT_NAVIGATION_CONFIG,
      resolvedBlocks: {},
      resolvedLinks: {},
      media: {},
    };
    expect(publishedNavigationIsUsable(fallback)).toBe(false);
    expect(publishedNavigationIsUsable({ ...fallback, revisionId: crypto.randomUUID() })).toBe(
      true,
    );
  });
});
