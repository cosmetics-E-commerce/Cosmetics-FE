import { fireEvent, render, screen, within } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  DEFAULT_NAVIGATION_CONFIG,
  navigationBlockSchema,
  type NavigationPublicSnapshot,
  type NavigationResolvedEntity,
} from "@cosmetics/contracts";

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return {
    ...actual,
    Link: ({
      to,
      children,
      preload: _preload,
      ...props
    }: AnchorHTMLAttributes<HTMLAnchorElement> & {
      to: string;
      preload?: string;
      children: ReactNode;
    }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

import { PublishedMegaMenu, PublishedMobileMenuItem } from "./PublishedMegaMenu";

const categoriesItem = DEFAULT_NAVIGATION_CONFIG.items.find((item) => item.key === "categories")!;
const blockId = categoriesItem.megaMenu!.rows[0]!.columns[0]!.blocks[0]!.id;
const brandsItem = DEFAULT_NAVIGATION_CONFIG.items.find((item) => item.key === "brands")!;
const brandBlockId = brandsItem.megaMenu!.rows[0]!.columns[0]!.blocks[0]!.id;
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
        labelEn: "Skin care",
        labelAr: "العناية بالبشرة",
        href: "/categories/skincare",
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
      {
        kind: "CATEGORY",
        id: "b0000000-0000-4000-8000-000000000003",
        labelEn: "Liquid Lipstick",
        labelAr: "أحمر شفاه سائل",
        href: "/categories/liquid-lipstick",
        secondaryLabel: "b0000000-0000-4000-8000-000000000002",
        productCount: 2,
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

function multiCategoryFixture() {
  const departments = [
    {
      id: "f0000000-0000-4000-8000-000000000001",
      en: "Body Care",
      ar: "العناية بالجسم",
      slug: "body-care",
      children: 15,
    },
    {
      id: "f0000000-0000-4000-8000-000000000002",
      en: "Hair Care",
      ar: "العناية بالشعر",
      slug: "hair-care",
      children: 1,
    },
    {
      id: "f0000000-0000-4000-8000-000000000003",
      en: "Korean",
      ar: "الكوري",
      slug: "korean",
      children: 0,
    },
  ];
  const item = structuredClone(categoriesItem);
  item.id = "f1000000-0000-4000-8000-000000000001";
  item.key = "departments";
  item.label = { en: "Departments", ar: "الأقسام" };
  const blocks = departments.map((department, index) =>
    navigationBlockSchema.parse({
      id: `f4000000-0000-4000-8000-00000000000${index + 1}`,
      type: "CATEGORY_LIST",
      enabled: true,
      visibility: item.visibility,
      mobileOrder: index,
      heading: { en: department.en, ar: department.ar },
      showHeading: true,
      showViewAll: true,
      viewAllLabel: { en: "View all", ar: "عرض الكل" },
      viewAllDestination: { type: "CATEGORY", id: department.id },
      mode: "CHILDREN",
      categoryIds: [],
      parentCategoryId: department.id,
      maximumItems: 24,
      order: "SORT_ORDER",
      presentation: "PLAIN",
      showIcon: false,
      showProductCount: false,
      showChevron: false,
    }),
  );
  item.megaMenu = {
    enabled: true,
    width: "FULL",
    style: "CLASSIC",
    mobilePresentation: "ACCORDION",
    rows: [
      {
        id: "f2000000-0000-4000-8000-000000000001",
        preset: "THREE_EQUAL",
        presentation: "DEFAULT",
        columnSeparators: true,
        enabled: true,
        visibility: item.visibility,
        columns: blocks.map((block, index) => ({
          id: `f3000000-0000-4000-8000-00000000000${index + 1}`,
          span: 4,
          blocks: [block],
        })),
      },
    ],
  };
  const resolvedBlocks = Object.fromEntries(
    blocks.map((block, departmentIndex) => [
      block.id,
      Array.from({ length: departments[departmentIndex]!.children }, (_, childIndex) => ({
        kind: "CATEGORY" as const,
        id: `f5000000-0000-4${String(departmentIndex).padStart(3, "0")}-8000-${String(childIndex + 1).padStart(12, "0")}`,
        labelEn: `${departments[departmentIndex]!.en} ${childIndex + 1}`,
        labelAr: `${departments[departmentIndex]!.ar} ${childIndex + 1}`,
        href: `/categories/${departments[departmentIndex]!.slug}-${childIndex + 1}`,
        secondaryLabel: departments[departmentIndex]!.id,
      })),
    ]),
  );
  const resolvedLinks = Object.fromEntries([
    [item.id, "/shop"],
    ...blocks.map((block, index) => [block.id, `/categories/${departments[index]!.slug}`]),
  ]);
  const multiSnapshot: NavigationPublicSnapshot = {
    ...snapshot,
    config: { ...snapshot.config, items: [item] },
    resolvedBlocks,
    resolvedLinks,
  };
  return { blocks, departments, item, snapshot: multiSnapshot };
}

describe("published mega menu renderer", () => {
  it("renders the default Brands block as a sorted searchable alphabetical directory", () => {
    const brandSnapshot: NavigationPublicSnapshot = {
      ...snapshot,
      resolvedBlocks: {
        [brandBlockId]: [
          {
            kind: "BRAND",
            id: "cerave",
            labelEn: "CeraVe",
            labelAr: "CeraVe",
            href: "/brands/cerave",
          },
          { kind: "BRAND", id: "anua", labelEn: "Anua", labelAr: "Anua", href: "/brands/anua" },
          {
            kind: "BRAND",
            id: "bioderma",
            labelEn: "Bioderma",
            labelAr: "Bioderma",
            href: "/brands/bioderma",
          },
          {
            kind: "BRAND",
            id: "atelier",
            labelEn: "Atelier Nude",
            labelAr: "Atelier Nude",
            href: "/brands/atelier-nude",
          },
          {
            kind: "BRAND",
            id: "eucerin",
            labelEn: "Eucerin",
            labelAr: "Eucerin",
            href: "/brands/eucerin",
          },
          { kind: "BRAND", id: "cosrx", labelEn: "COSRX", labelAr: "COSRX", href: "/brands/cosrx" },
        ],
      },
    };
    const { container } = render(
      <PublishedMegaMenu
        item={brandsItem}
        snapshot={brandSnapshot}
        locale="en"
        onNavigate={vi.fn()}
      />,
    );

    const groups = [
      ...container.querySelectorAll<HTMLElement>(".published-brand-directory__group"),
    ];
    expect(groups.map((group) => group.querySelector("h3")?.textContent)).toEqual([
      "A",
      "B",
      "C",
      "E",
    ]);
    expect(
      within(groups[0]!)
        .getAllByRole("link")
        .map((link) => link.textContent),
    ).toEqual(["Anua", "Atelier Nude"]);
    expect(screen.getByRole("link", { name: "CeraVe" })).toHaveAttribute("href", "/brands/cerave");
    expect(screen.getByRole("link", { name: /View all brands/i })).toHaveAttribute(
      "href",
      "/brands",
    );

    fireEvent.change(screen.getByPlaceholderText("Search brands…"), {
      target: { value: "cera" },
    });
    expect(screen.getByRole("link", { name: "CeraVe" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "COSRX" })).not.toBeInTheDocument();
    expect(container.querySelectorAll(".published-brand-directory__group")).toHaveLength(1);
  });

  it("keeps the alphabetical Brands directory usable in Arabic mobile navigation", () => {
    const localizedSnapshot: NavigationPublicSnapshot = {
      ...snapshot,
      resolvedBlocks: {
        [brandBlockId]: [
          {
            kind: "BRAND",
            id: "beesline",
            labelEn: "Beesline",
            labelAr: "بيزلين",
            href: "/brands/beesline",
          },
        ],
      },
    };
    const { container } = render(
      <PublishedMobileMenuItem
        item={brandsItem}
        snapshot={localizedSnapshot}
        locale="ar"
        onNavigate={vi.fn()}
      />,
    );

    expect(container.querySelector(".published-brand-directory")).toHaveAttribute("dir", "rtl");
    expect(screen.getByRole("heading", { name: "ب" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "بيزلين" })).toHaveAttribute(
      "href",
      "/brands/beesline",
    );
  });

  it("renders resolved dynamic entities as semantic links", () => {
    render(
      <PublishedMegaMenu
        item={categoriesItem}
        snapshot={snapshot}
        locale="en"
        onNavigate={vi.fn()}
      />,
    );
    expect(screen.getByRole("link", { name: /Skin care/ })).toHaveAttribute(
      "href",
      "/categories/skincare",
    );
    expect(screen.getByRole("link", { name: "Lipstick" })).toHaveAttribute(
      "href",
      "/categories/lipstick",
    );
    expect(screen.getByRole("link", { name: "Liquid Lipstick" })).toHaveClass(
      "published-category-explorer__grandchild",
    );
  });

  it("distributes category groups into independent vertical columns", () => {
    const parentNames = [
      "Body Care",
      "Fragrance",
      "Hair Care",
      "Korean",
      "Offers & Bundles",
      "Skin Care",
      "Sun Care",
    ];
    const parentEntities: NavigationResolvedEntity[] = parentNames.map((name, index) => ({
      kind: "CATEGORY",
      id: `category-${index}`,
      labelEn: name,
      labelAr: name,
      href: `/categories/${index}`,
      secondaryLabel: "root",
      productCount: index + 1,
    }));
    const columnSnapshot: NavigationPublicSnapshot = {
      ...snapshot,
      resolvedBlocks: { [blockId]: parentEntities },
    };

    const { container } = render(
      <PublishedMegaMenu
        item={categoriesItem}
        snapshot={columnSnapshot}
        locale="en"
        onNavigate={vi.fn()}
      />,
    );

    const columns = [...container.querySelectorAll(".published-category-explorer__column")];
    expect(columns).toHaveLength(3);
    expect(
      columns.map((column) =>
        [...column.querySelectorAll(".published-category-explorer__parent")].map(
          (link) => link.childNodes[0]?.textContent,
        ),
      ),
    ).toEqual([
      ["Body Care", "Korean", "Sun Care"],
      ["Fragrance", "Offers & Bundles"],
      ["Hair Care", "Skin Care"],
    ]);
  });

  it("renders featured brands as accessible logo-only links using resolved brand data", () => {
    const onNavigate = vi.fn();
    const logoUrl = "https://cdn.example.com/acm-logo.webp";
    const featuredSnapshot: NavigationPublicSnapshot = {
      ...snapshot,
      resolvedBlocks: {
        [blockId]: [
          ...snapshot.resolvedBlocks[blockId]!,
          {
            kind: "BRAND",
            id: "acm",
            labelEn: "ACM",
            labelAr: "ACM",
            href: "/brands/acm",
            imageUrl: logoUrl,
          },
        ],
      },
    };

    render(
      <PublishedMegaMenu
        item={categoriesItem}
        snapshot={featuredSnapshot}
        locale="en"
        onNavigate={onNavigate}
      />,
    );

    const row = screen.getByRole("link", { name: "ACM" });
    const logo = screen.getByAltText("ACM logo");
    expect(row).toHaveClass("published-category-explorer__brand");
    expect(row).toHaveAttribute("href", "/brands/acm");
    expect(logo).toHaveAttribute("src", logoUrl);
    expect(row.children).toHaveLength(1);
    expect(row.firstElementChild).toBe(logo);
    expect(row).toHaveTextContent("");

    Object.defineProperties(logo, {
      naturalWidth: { configurable: true, value: 240 },
      naturalHeight: { configurable: true, value: 120 },
    });
    fireEvent.load(logo);
    expect(logo.parentElement).toHaveAttribute("data-logo-shape", "wide");

    fireEvent.click(row);
    expect(onNavigate).toHaveBeenCalledOnce();
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
    expect(screen.getByRole("link", { name: /العناية بالبشرة/ })).toHaveAttribute(
      "href",
      "/categories/skincare",
    );
  });

  it("recognizes configuration-driven parent columns and keeps uneven content independent", () => {
    const fixture = multiCategoryFixture();
    const { container } = render(
      <PublishedMegaMenu
        item={fixture.item}
        snapshot={fixture.snapshot}
        locale="en"
        onNavigate={vi.fn()}
      />,
    );

    const menu = container.querySelector(".published-mega");
    expect(menu).toHaveAttribute("data-category-columns", "3");
    expect(container.querySelector('[data-layout="category-columns"]')).toBeInTheDocument();
    expect(container.querySelectorAll(".published-mega__column")).toHaveLength(3);
    expect(screen.getAllByRole("link", { name: "View all" })).toHaveLength(3);
    expect(screen.getAllByRole("link", { name: /^Body Care \d+$/ })).toHaveLength(15);
    expect(screen.getAllByRole("link", { name: /^Hair Care \d+$/ })).toHaveLength(1);
    expect(screen.queryByRole("link", { name: /^Korean \d+$/ })).not.toBeInTheDocument();
  });

  it("renders configured parent columns as localized mobile disclosures", () => {
    const fixture = multiCategoryFixture();
    const { container } = render(
      <PublishedMobileMenuItem
        item={fixture.item}
        snapshot={fixture.snapshot}
        locale="ar"
        onNavigate={vi.fn()}
      />,
    );

    const disclosures = container.querySelectorAll(".published-mobile-category-group");
    expect(disclosures).toHaveLength(3);
    expect(screen.getByText("العناية بالجسم")).toBeInTheDocument();
    expect(screen.getByText("العناية بالشعر")).toBeInTheDocument();
    expect(screen.getByText("الكوري")).toBeInTheDocument();
    fireEvent.click(screen.getByText("العناية بالجسم").closest("summary")!);
    expect(disclosures[0]).toHaveAttribute("open");
    expect(screen.getByRole("link", { name: "العناية بالجسم 1" })).toHaveAttribute(
      "href",
      "/categories/body-care-1",
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
    expect(screen.queryByRole("link", { name: /Skin care/ })).not.toBeInTheDocument();
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
      resolvedBlocks: {
        [rail.id]: [...snapshot.resolvedBlocks[blockId]!, snapshot.resolvedBlocks[blockId]![1]!],
      },
    };
    const { container, rerender } = render(
      <PublishedMegaMenu item={item} snapshot={classicSnapshot} locale="en" onNavigate={vi.fn()} />,
    );
    expect(container.querySelector('[data-menu-style="classic"]')).toBeInTheDocument();
    expect(container.querySelector('[data-separators="true"]')).toBeInTheDocument();
    expect(container.querySelector(".published-mega__entity-list.is-rail")).toBeInTheDocument();
    expect(container.querySelectorAll(".published-mega__entity-chevron")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /Skin care/ })).toHaveClass("is-depth-0");
    expect(screen.getByRole("link", { name: /^Lipstick/ })).toHaveClass("is-depth-1");
    expect(screen.getByRole("link", { name: /Liquid Lipstick/ })).toHaveClass("is-depth-2");
    expect(screen.getAllByRole("link", { name: /^Lipstick/ })).toHaveLength(1);

    rerender(
      <PublishedMobileMenuItem
        item={item}
        snapshot={classicSnapshot}
        locale="ar"
        onNavigate={vi.fn()}
      />,
    );
    expect(container.querySelector(".published-mobile-menu")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /العناية بالبشرة/ })).toHaveClass("is-depth-0");
    expect(screen.getByRole("link", { name: /^أحمر شفاه سائل/ })).toHaveClass("is-depth-2");
  });
});
