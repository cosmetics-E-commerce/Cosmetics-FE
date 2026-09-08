import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import {
  landingPageSectionSchema,
  type LandingPagePublicSnapshot,
  type LandingPageResolvedEntity,
} from "@cosmetics/contracts/page-builder/page-builder.schema";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LandingPageRenderer } from "./LandingPageRenderer";

const state = vi.hoisted(() => ({ locale: "en", loadCategories: vi.fn() }));
vi.mock("@/lib/store", () => ({ useStore: () => ({ locale: state.locale }) }));
vi.mock("@/lib/catalog", () => ({
  categoriesQuery: () => ({ queryKey: ["categories"], queryFn: state.loadCategories }),
  useMerchandisingCatalog: () => ({ data: [] }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    params,
    className,
    "aria-label": label,
  }: {
    children: ReactNode;
    to: string;
    params?: { slug: string };
    className?: string;
    "aria-label"?: string;
  }) => (
    <a href={to.replace("$slug", params?.slug ?? "")} className={className} aria-label={label}>
      {children}
    </a>
  ),
}));
vi.mock("@/components/motion/Primitives", () => ({
  Reveal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

const categories: LandingPageResolvedEntity[] = [
  {
    id: "93000000-0000-4000-8000-000000000001",
    kind: "CATEGORY",
    slug: "skin-care",
    labelEn: "Skin Care",
    labelAr: "العناية بالبشرة",
    href: "/categories/skin-care",
  },
  {
    id: "93000000-0000-4000-8000-000000000002",
    kind: "CATEGORY",
    slug: "body-care",
    labelEn: "Body Care",
    labelAr: "العناية بالجسم",
    href: "/categories/body-care",
  },
];

function mount(ids: string[] | null | undefined, entities = categories) {
  const section = landingPageSectionSchema.parse({
    id: "93000000-0000-4000-8000-000000000003",
    analyticsKey: "featured-arrivals",
    label: "Featured arrivals",
    type: "BIOREZA_HOME_MODULE",
    module: "FEATURED",
    featuredCategoryIds: ids,
    visibility: {
      devices: ["DESKTOP", "TABLET", "MOBILE"],
      locales: ["en", "ar"],
      startsAt: null,
      endsAt: null,
    },
  });
  const snapshot: LandingPagePublicSnapshot = {
    pageId: "homepage",
    slug: "home",
    type: "HOMEPAGE",
    revisionId: "revision",
    revision: 1,
    publishedAt: "2026-09-08T00:00:00Z",
    resolvedAt: "2026-09-08T00:00:00Z",
    preview: false,
    config: {
      schemaVersion: 1,
      title: { en: "Homepage", ar: "الرئيسية" },
      seo: {
        title: { en: "BIOREZA", ar: "بيوريزا" },
        description: { en: "", ar: "" },
        canonicalPath: null,
        openGraphMediaId: null,
        indexable: true,
      },
      sections: [section],
    },
    entities: { [section.id]: entities },
    products: {},
    media: {},
    links: {},
  };
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <LandingPageRenderer snapshot={snapshot} locale={state.locale as "en" | "ar"} />
    </QueryClientProvider>,
  );
  return screen.getByRole("navigation", {
    name: state.locale === "ar" ? "فئات المنتجات الجديدة" : "New arrival categories",
  });
}

describe("published featured arrival category tabs", () => {
  beforeEach(() => {
    state.locale = "en";
    state.loadCategories.mockReset().mockResolvedValue(
      Array.from({ length: 5 }, (_, index) => ({
        id: String(index),
        slug: `automatic-${index}`,
        nameEn: `Automatic ${index}`,
        nameAr: `تلقائي ${index}`,
      })),
    );
  });

  it.each(["en", "ar"])(
    "renders only selected categories in saved order with canonical links (%s)",
    (locale) => {
      state.locale = locale;
      const nav = mount([categories[1]!.id, categories[0]!.id]);
      expect(
        within(nav)
          .getAllByRole("link")
          .map((link) => link.textContent),
      ).toEqual(
        locale === "en"
          ? ["All", "Body Care", "Skin Care"]
          : ["الكل", "العناية بالجسم", "العناية بالبشرة"],
      );
      expect(within(nav).getAllByRole("link")[1]).toHaveAttribute("href", "/categories/body-care");
      expect(state.loadCategories).not.toHaveBeenCalled();
    },
  );

  it("shows only All for an empty custom list or unavailable selected categories", () => {
    const nav = mount([categories[0]!.id], []);
    expect(within(nav).getAllByRole("link")).toHaveLength(1);
    expect(state.loadCategories).not.toHaveBeenCalled();
  });

  it("respects an explicitly empty list even when categories exist", () => {
    const nav = mount([]);
    expect(
      within(nav)
        .getAllByRole("link")
        .map((link) => link.textContent),
    ).toEqual(["All"]);
    expect(state.loadCategories).not.toHaveBeenCalled();
  });

  it.each([undefined, null])(
    "keeps the original first-four behavior for automatic configuration (%s)",
    async (ids) => {
      const nav = mount(ids);
      await waitFor(() => expect(within(nav).getAllByRole("link")).toHaveLength(5));
      expect(
        within(nav)
          .getAllByRole("link")
          .map((link) => link.textContent),
      ).toEqual(["All", "Automatic 0", "Automatic 1", "Automatic 2", "Automatic 3"]);
    },
  );
});
