import { landingPageSectionSchema } from "@cosmetics/contracts/page-builder/page-builder.schema";
import { describe, expect, it } from "vitest";

import { isLandingSectionVisible } from "@/lib/landing-page";

const createSpacer = (
  visibility: {
    devices: Array<"DESKTOP" | "TABLET" | "MOBILE">;
    locales: Array<"en" | "ar">;
    startsAt: string | null;
    endsAt: string | null;
  },
  enabled = true,
) =>
  landingPageSectionSchema.parse({
    id: crypto.randomUUID(),
    analyticsKey: `spacer-${crypto.randomUUID()}`,
    label: "Space",
    enabled,
    visibility,
    surface: "DEFAULT",
    spacing: "NONE",
    width: "FULL",
    type: "SPACER",
    size: "SMALL",
  });

describe("published landing page visibility", () => {
  const now = Date.parse("2026-08-28T10:00:00.000Z");

  it("uses start-inclusive and end-exclusive schedule semantics", () => {
    const section = createSpacer({
      devices: ["DESKTOP"],
      locales: ["en"],
      startsAt: new Date(now).toISOString(),
      endsAt: new Date(now + 1000).toISOString(),
    });
    expect(isLandingSectionVisible(section, "en", now)).toBe(true);
    expect(isLandingSectionVisible(section, "en", now + 1000)).toBe(false);
  });

  it("respects locale targeting without changing logical RTL hierarchy", () => {
    const section = createSpacer({
      devices: ["DESKTOP", "TABLET", "MOBILE"],
      locales: ["ar"],
      startsAt: null,
      endsAt: null,
    });
    expect(isLandingSectionVisible(section, "ar", now)).toBe(true);
    expect(isLandingSectionVisible(section, "en", now)).toBe(false);
  });

  it("never renders a disabled section", () => {
    const section = createSpacer(
      { devices: ["DESKTOP"], locales: ["en", "ar"], startsAt: null, endsAt: null },
      false,
    );
    expect(isLandingSectionVisible(section, "en", now)).toBe(false);
  });
});
