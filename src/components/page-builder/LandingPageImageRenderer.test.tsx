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
        contentType: "image/webp",
      },
      [mobileId]: {
        id: mobileId,
        url: "https://media.example.test/editorial-mobile.webp",
        width: 750,
        height: 1000,
        altText: null,
        contentType: "image/webp",
      },
    },
    links: { [sectionId]: "/shop" },
  };
}

describe("published Page Builder images", () => {
  it("renders constrained repeatable content blocks with resolved destinations", () => {
    const blockId = "90000000-0000-4000-8000-000000000050";
    const section = landingPageSectionSchema.parse({
      id: "90000000-0000-4000-8000-000000000051",
      analyticsKey: "content-blocks",
      label: "Content blocks",
      enabled: true,
      visibility: {
        devices: ["DESKTOP", "TABLET", "MOBILE"],
        locales: ["en", "ar"],
        startsAt: null,
        endsAt: null,
      },
      surface: "DEFAULT",
      spacing: "MEDIUM",
      width: "WIDE",
      type: "CONTENT_BLOCKS",
      heading: { en: "Why BioReza", ar: "لماذا بيوريزا" },
      description: { en: "", ar: "" },
      layout: "GRID",
      columns: 3,
      blocks: [
        {
          id: blockId,
          type: "TEXT",
          eyebrow: { en: "Editorial", ar: "تحريري" },
          title: { en: "Learn more", ar: "اعرفي المزيد" },
          body: { en: "Clear guidance", ar: "إرشاد واضح" },
          ctaLabel: { en: "Open", ar: "افتحي" },
          destination: { type: "CUSTOM_PATH", path: "/about" },
        },
      ],
    });
    const result = snapshot([section]);
    result.links[`${section.id}:block:${blockId}`] = "/about";
    render(<LandingPageRenderer snapshot={result} locale="ar" />);
    expect(screen.getByRole("heading", { name: "لماذا بيوريزا" })).toBeVisible();
    expect(screen.getByRole("link", { name: /اعرفي المزيد/ })).toHaveAttribute("href", "/about");
  });

  it("isolates a corrupt legacy section instead of crashing the whole public page", () => {
    const corrupt = {
      ...imageSection,
      id: "90000000-0000-4000-8000-000000000099",
      analyticsKey: "corrupt-section",
      spacing: null,
    } as unknown as typeof imageSection;
    const result = snapshot([corrupt, imageSection]);
    const { container } = render(<LandingPageRenderer snapshot={result} locale="en" />);
    expect(screen.getByAltText("Clean beauty ritual")).toBeVisible();
    expect(container.querySelector('[data-section-id="corrupt-section"]')).toBeNull();
  });

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

  it("renders a CMS Hero slide with responsive media, localized content, focal point, and CTA", () => {
    const slideId = "90000000-0000-4000-8000-000000000020";
    const hero = landingPageSectionSchema.parse({
      id: sectionId,
      analyticsKey: "cms-hero",
      label: "CMS hero",
      enabled: true,
      visibility: imageSection.visibility,
      surface: "DEFAULT",
      spacing: "NONE",
      width: "FULL",
      type: "HERO",
      desktopMediaId: null,
      mobileMediaId: null,
      imageAlt: { en: "", ar: "" },
      eyebrow: { en: "", ar: "" },
      heading: { en: "", ar: "" },
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
      slides: [
        {
          id: slideId,
          label: "Launch",
          mediaType: "IMAGE",
          desktopMediaId: desktopId,
          mobileMediaId: mobileId,
          imageAlt: { en: "Launch products", ar: "منتجات الإطلاق" },
          eyebrow: { en: "New", ar: "جديد" },
          heading: { en: "Skin\nFirst", ar: "البشرة\nأولاً" },
          secondaryHeading: { en: "", ar: "" },
          description: { en: "Editorial launch", ar: "إطلاق تحريري" },
          supportingText: { en: "", ar: "" },
          primaryCta: {
            label: { en: "Shop", ar: "تسوقي" },
            destination: { type: "SHOP" },
          },
          secondaryCta: { label: { en: "", ar: "" }, destination: null },
          layout: {
            objectPosition: "FOCAL_POINT",
            focalPoint: { x: 68, y: 35 },
          },
          mobile: { enabled: true, headlineScale: "SMALL" },
          video: {},
          schedule: {},
        },
      ],
      carousel: { autoplay: false },
    });
    const result = snapshot([hero]);
    result.links = { [`${sectionId}:slide:${slideId}:primary`]: "/shop" };
    const { container } = render(<LandingPageRenderer snapshot={result} locale="ar" />);

    expect(screen.getByRole("heading", { name: /البشرة\s+أولاً/ })).toBeVisible();
    expect(screen.getByText("تسوقي").closest("a")).toHaveAttribute("href", "/shop");
    expect(screen.getByAltText("منتجات الإطلاق")).toHaveAttribute("fetchpriority", "high");
    expect(container.querySelector("source")).toHaveAttribute(
      "srcset",
      "https://media.example.test/editorial-mobile.webp",
    );
    expect(container.querySelector(".landing-hero-builder")).toHaveStyle({
      "--landing-hero-position": "68% 35%",
    });
  });

  it("renders browser-safe Hero video settings and poster media", () => {
    const slideId = "90000000-0000-4000-8000-000000000021";
    const hero = landingPageSectionSchema.parse({
      id: sectionId,
      analyticsKey: "video-hero",
      label: "Video hero",
      enabled: true,
      visibility: imageSection.visibility,
      surface: "DEFAULT",
      spacing: "NONE",
      width: "FULL",
      type: "HERO",
      desktopMediaId: null,
      mobileMediaId: null,
      imageAlt: { en: "", ar: "" },
      eyebrow: { en: "", ar: "" },
      heading: { en: "", ar: "" },
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
      slides: [
        {
          id: slideId,
          label: "Video",
          mediaType: "VIDEO",
          desktopMediaId: desktopId,
          mobileMediaId: null,
          posterMediaId: mobileId,
          imageAlt: { en: "", ar: "" },
          eyebrow: { en: "", ar: "" },
          heading: { en: "Video campaign", ar: "حملة فيديو" },
          secondaryHeading: { en: "", ar: "" },
          description: { en: "", ar: "" },
          supportingText: { en: "", ar: "" },
          primaryCta: { label: { en: "", ar: "" }, destination: null },
          secondaryCta: { label: { en: "", ar: "" }, destination: null },
          layout: {},
          mobile: {},
          video: { autoplay: true, muted: false, loop: true, playsInline: true },
          schedule: {},
        },
      ],
    });
    const result = snapshot([hero]);
    result.media[desktopId] = {
      id: desktopId,
      url: "https://media.example.test/hero.mp4",
      width: 0,
      height: 0,
      altText: null,
      contentType: "video/mp4",
    };
    const { container } = render(<LandingPageRenderer snapshot={result} locale="en" />);
    const video = container.querySelector("video");
    expect(video).toHaveAttribute("poster", "https://media.example.test/editorial-mobile.webp");
    expect(video).toHaveAttribute("autoplay");
    expect(video?.muted).toBe(true);
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("playsinline");
    expect(video?.querySelector("source")).toHaveAttribute("type", "video/mp4");
  });
});
