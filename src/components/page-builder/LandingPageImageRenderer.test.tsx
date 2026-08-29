import { render, screen, fireEvent } from "@testing-library/react";
import {
  landingPageSectionSchema,
  type LandingPagePublicSnapshot,
} from "@cosmetics/contracts/page-builder/page-builder.schema";
import { describe, expect, it } from "vitest";

import { LandingPageRenderer } from "./LandingPageRenderer";

const sectionId = "90000000-0000-4000-8000-000000000001";
const desktopId = "90000000-0000-4000-8000-000000000002";
const mobileId = "90000000-0000-4000-8000-000000000003";

const imageSection = landingPageSectionSchema.parse({
  id: sectionId,
  analyticsKey: "editorial-image",
  label: "Editorial image",
  enabled: true,
  visibility: {
    devices: ["DESKTOP", "TABLET", "MOBILE"],
    locales: ["en", "ar"],
    startsAt: null,
    endsAt: null,
  },
  surface: "DEFAULT",
  spacing: "MEDIUM",
  width: "FULL",
  type: "IMAGE",
  desktopMediaId: desktopId,
  mobileMediaId: mobileId,
  imageAlt: { en: "Clean beauty ritual", ar: "طقوس الجمال النظيف" },
  caption: { en: "A considered daily ritual", ar: "طقوس يومية مدروسة" },
  destination: { type: "SHOP" },
  openInNewTab: true,
  imageWidth: "CUSTOM",
  customWidthPercent: 72,
  alignment: "END",
  aspectRatio: "16_9",
  customAspectRatio: { width: 16, height: 9 },
  objectFit: "COVER",
  objectPosition: "TOP",
  borderRadius: 14,
  maxHeight: 840,
  backgroundColor: "#f4efe7",
});

function snapshot(sections = [imageSection]): LandingPagePublicSnapshot {
  return {
    pageId: "90000000-0000-4000-8000-000000000010",
    slug: "campaign",
    type: "CAMPAIGN",
    revisionId: "90000000-0000-4000-8000-000000000011",
    revision: 1,
    publishedAt: "2026-08-29T10:00:00.000Z",
    resolvedAt: "2026-08-29T10:00:00.000Z",
    preview: false,
    config: {
      schemaVersion: 1,
      title: { en: "Campaign", ar: "حملة" },
      seo: {
        title: { en: "Campaign", ar: "حملة" },
        description: { en: "", ar: "" },
        canonicalPath: null,
        openGraphMediaId: null,
        indexable: true,
      },
      sections,
    },
    entities: {},
    products: {},
    media: {
      [desktopId]: {
        id: desktopId,
        url: "https://media.example.test/editorial-desktop.webp",
        width: 1600,
        height: 900,
        altText: null,
      },
      [mobileId]: {
        id: mobileId,
        url: "https://media.example.test/editorial-mobile.webp",
        width: 750,
        height: 1000,
        altText: null,
      },
    },
    links: { [sectionId]: "/shop" },
  };
}

describe("published Page Builder images", () => {
  it("renders localized responsive media, caption, layout, and link behavior", () => {
    const { container } = render(<LandingPageRenderer snapshot={snapshot()} locale="ar" />);

    const image = screen.getByAltText("طقوس الجمال النظيف");
    expect(image).toHaveAttribute("src", "https://media.example.test/editorial-desktop.webp");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(container.querySelector("source")).toHaveAttribute(
      "srcset",
      "https://media.example.test/editorial-mobile.webp",
    );
    expect(screen.getByText("طقوس يومية مدروسة")).toBeVisible();
    expect(image.closest("a")).toHaveAttribute("href", "/shop");
    expect(image.closest("a")).toHaveAttribute("target", "_blank");
    expect(container.querySelector(".landing-image")).toHaveAttribute("data-align", "END");
  });

  it("replaces a failed image with a neutral accessible placeholder", () => {
    render(<LandingPageRenderer snapshot={snapshot()} locale="en" />);
    fireEvent.error(screen.getByAltText("Clean beauty ritual"));
    expect(screen.getByRole("img", { name: "Clean beauty ritual unavailable" })).toHaveClass(
      "landing-image-placeholder",
    );
  });

  it("keeps legacy Hero records renderable without the new optional behavior fields", () => {
    const hero = landingPageSectionSchema.parse({
      id: sectionId,
      analyticsKey: "legacy-hero",
      label: "Legacy hero",
      enabled: true,
      visibility: imageSection.visibility,
      surface: "DEFAULT",
      spacing: "NONE",
      width: "FULL",
      type: "HERO",
      desktopMediaId: desktopId,
      mobileMediaId: null,
      imageAlt: { en: "Legacy hero", ar: "واجهة قديمة" },
      eyebrow: { en: "", ar: "" },
      heading: { en: "Legacy", ar: "قديمة" },
      description: { en: "", ar: "" },
      primaryCtaLabel: { en: "", ar: "" },
      primaryDestination: null,
      secondaryCtaLabel: { en: "", ar: "" },
      secondaryDestination: null,
      layout: "FULL",
      alignment: "START",
      contentPosition: "CENTER",
      overlay: "MEDIUM",
      headingLevel: "H1",
    });
    const result = snapshot([hero]);
    result.links = {};
    const { container } = render(<LandingPageRenderer snapshot={result} locale="en" />);
    expect(container.querySelector(".landing-hero")).toHaveAttribute(
      "data-media-behavior",
      "BACKGROUND",
    );
    expect(screen.getByAltText("Legacy hero")).toHaveAttribute("fetchpriority", "high");
  });
});
