import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  DEFAULT_NAVIGATION_CONFIG,
  navigationBlockSchema,
  type NavigationPublicSnapshot,
} from "@cosmetics/contracts";

import { PublishedMegaMenu, PublishedMobileMenuItem } from "./PublishedMegaMenu";

const categoriesItem = DEFAULT_NAVIGATION_CONFIG.items.find((item) => item.key === "categories")!;
const blockId = categoriesItem.megaMenu!.rows[0]!.columns[0]!.blocks[0]!.id;
const snapshot: NavigationPublicSnapshot = {
  schemaVersion: 1,
  revisionId: "a0000000-0000-4000-8000-000000000001",
  revision: 4,
  publishedAt: "2026-08-23T12:00:00.000Z",
  config: DEFAULT_NAVIGATION_CONFIG,
  resolvedBlocks: {
    [blockId]: [
      {
        kind: "CATEGORY",
        id: "b0000000-0000-4000-8000-000000000001",
        labelEn: "Makeup",
        labelAr: "المكياج",
        href: "/categories/makeup",
        secondaryLabel: "root",
        productCount: 12,
      },
      {
        kind: "CATEGORY",
        id: "b0000000-0000-4000-8000-000000000002",
        labelEn: "Lipstick",
        labelAr: "أحمر الشفاه",
        href: "/categories/lipstick",
        secondaryLabel: "b0000000-0000-4000-8000-000000000001",
        productCount: 4,
      },
    ],
  },
  resolvedLinks: {
    [categoriesItem.id]: "/shop",
    [blockId]: "/shop",
    [`${blockId}:promo`]: "/offers",
  },
  media: {},
};

describe("published mega menu renderer", () => {
  it("renders resolved dynamic entities as semantic links", () => {
    render(
      <PublishedMegaMenu
        item={categoriesItem}
        snapshot={snapshot}
        locale="en"
        onNavigate={vi.fn()}
      />,
    );
    expect(screen.getByRole("link", { name: /Makeup/ })).toHaveAttribute(
      "href",
      "/categories/makeup",
    );
    expect(screen.getByRole("link", { name: "Lipstick" })).toHaveAttribute(
      "href",
      "/categories/lipstick",
    );
  });

  it("renders Arabic author content and a stacked mobile structure", () => {
    render(
      <PublishedMobileMenuItem
        item={categoriesItem}
        snapshot={snapshot}
        locale="ar"
        onNavigate={vi.fn()}
      />,
    );
    expect(screen.getByText("كل الفئات")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /المكياج/ })).toHaveAttribute(
      "href",
      "/categories/makeup",
    );
  });

  it("safely omits unavailable entities without crashing the header", () => {
    const missingSnapshot = {
      ...snapshot,
      resolvedBlocks: {},
      resolvedLinks: { [categoriesItem.id]: "/shop" },
    };
    const { container } = render(
      <PublishedMegaMenu
        item={categoriesItem}
        snapshot={missingSnapshot}
        locale="en"
        onNavigate={vi.fn()}
      />,
    );
    expect(container.querySelector(".published-mega")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Makeup/ })).not.toBeInTheDocument();
  });

  it("renders Classic shell, separators, and Category Rail through generic blocks", () => {
    const rail = navigationBlockSchema.parse({
      id: "c4000000-0000-4000-8000-000000000003",
      type: "CATEGORY_LIST",
      enabled: true,
      visibility: categoriesItem.visibility,
      mobileOrder: 1,
      heading: { en: "Main categories", ar: "الفئات الرئيسية" },
      showHeading: false,
      showViewAll: false,
      viewAllLabel: { en: "View all", ar: "عرض الكل" },
      viewAllDestination: { type: "SHOP" },
      mode: "TOP_LEVEL",
      categoryIds: [],
      parentCategoryId: null,
      maximumItems: 8,
      order: "SORT_ORDER",
      presentation: "RAIL",
      showIcon: true,
      showProductCount: true,
      showChevron: true,
    });
    const item = structuredClone(categoriesItem);
    item.megaMenu = {
      enabled: true,
      width: "FULL",
      style: "CLASSIC",
      mobilePresentation: "ACCORDION",
      rows: [
        {
          id: "c2000000-0000-4000-8000-000000000002",
          preset: "TWO_EQUAL",
          presentation: "DEFAULT",
          columnSeparators: true,
          enabled: true,
          visibility: item.visibility,
          columns: [
            {
              id: "c3000000-0000-4000-8000-000000000003",
              span: 12,
              blocks: [rail],
            },
          ],
        },
      ],
    };
    const classicSnapshot = {
      ...snapshot,
      config: { ...snapshot.config, items: [item] },
      resolvedBlocks: { [rail.id]: snapshot.resolvedBlocks[blockId]! },
    };
    const { container } = render(
      <PublishedMegaMenu item={item} snapshot={classicSnapshot} locale="en" onNavigate={vi.fn()} />,
    );
    expect(container.querySelector('[data-menu-style="classic"]')).toBeInTheDocument();
    expect(container.querySelector('[data-separators="true"]')).toBeInTheDocument();
    expect(container.querySelector(".published-mega__entity-list.is-rail")).toBeInTheDocument();
    expect(container.querySelectorAll(".published-mega__entity-chevron")).toHaveLength(2);
  });
});
