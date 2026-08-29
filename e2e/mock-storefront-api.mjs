import { createServer } from "node:http";
import { DEFAULT_NAVIGATION_CONFIG } from "@cosmetics/contracts";

const host = "127.0.0.1";
const port = Number.parseInt(process.env.E2E_MOCK_API_PORT || "4174", 10);

const classicNavigationConfig = structuredClone(DEFAULT_NAVIGATION_CONFIG);
const categoriesNavigationItem = classicNavigationConfig.items.find(
  (item) => item.key === "categories",
);
const brandsNavigationItem = classicNavigationConfig.items.find((item) => item.key === "brands");
const brandDirectoryBlockId = brandsNavigationItem.megaMenu.rows[0].columns[0].blocks[0].id;
const navigationVisibility = categoriesNavigationItem.visibility;
const blockBase = (id) => ({
  id,
  enabled: true,
  visibility: navigationVisibility,
  mobileOrder: null,
});
const listBase = (id, heading) => ({
  ...blockBase(id),
  heading,
  showHeading: true,
  showViewAll: true,
  viewAllLabel: { en: "View all", ar: "عرض الكل" },
  viewAllDestination: { type: "SHOP" },
});
const classicBlockIds = {
  all: "c4000000-0000-4000-8000-000000000001",
  view: "c4000000-0000-4000-8000-000000000002",
  rail: "c4000000-0000-4000-8000-000000000003",
  face: "c4000000-0000-4000-8000-000000000004",
  body: "c4000000-0000-4000-8000-000000000005",
  concern: "c4000000-0000-4000-8000-000000000006",
  brands: "c4000000-0000-4000-8000-000000000007",
  promo: "c4000000-0000-4000-8000-000000000008",
};
const categoryList = (id, heading, mode, parentCategoryId, presentation = "PLAIN") => ({
  ...listBase(id, heading),
  type: "CATEGORY_LIST",
  mode,
  categoryIds: [],
  parentCategoryId,
  maximumItems: 8,
  order: "SORT_ORDER",
  presentation,
  showIcon: presentation === "RAIL",
  showProductCount: presentation === "RAIL",
  showChevron: presentation === "RAIL",
});
categoriesNavigationItem.megaMenu = {
  enabled: true,
  width: "FULL",
  style: "CLASSIC",
  mobilePresentation: "ACCORDION",
  rows: [
    {
      id: "c2000000-0000-4000-8000-000000000001",
      preset: "TWO_EQUAL",
      presentation: "UTILITY",
      columnSeparators: false,
      enabled: true,
      visibility: navigationVisibility,
      columns: [
        {
          id: "c3000000-0000-4000-8000-000000000001",
          span: 6,
          blocks: [
            {
              ...blockBase(classicBlockIds.all),
              type: "CTA",
              label: { en: "All Categories", ar: "كل الفئات" },
              destination: { type: "SHOP" },
              style: "TEXT",
              alignment: "START",
              icon: "GRID",
              iconPosition: "START",
            },
          ],
        },
        {
          id: "c3000000-0000-4000-8000-000000000002",
          span: 6,
          blocks: [
            {
              ...blockBase(classicBlockIds.view),
              type: "CTA",
              label: { en: "View all products", ar: "عرض كل المنتجات" },
              destination: { type: "SHOP" },
              style: "TEXT",
              alignment: "END",
              icon: "CHEVRON",
              iconPosition: "END",
            },
          ],
        },
      ],
    },
    {
      id: "c2000000-0000-4000-8000-000000000002",
      preset: "CLASSIC_SIX",
      presentation: "DEFAULT",
      columnSeparators: true,
      enabled: true,
      visibility: navigationVisibility,
      columns: [
        {
          id: "c3000000-0000-4000-8000-000000000003",
          span: 2,
          blocks: [
            {
              ...categoryList(
                classicBlockIds.rail,
                { en: "Main categories", ar: "الفئات الرئيسية" },
                "TOP_LEVEL",
                null,
                "RAIL",
              ),
              showHeading: false,
              showViewAll: false,
            },
          ],
        },
        {
          id: "c3000000-0000-4000-8000-000000000004",
          span: 2,
          blocks: [
            categoryList(
              classicBlockIds.face,
              { en: "Face Care", ar: "العناية بالوجه" },
              "CHILDREN",
              "b0000000-0000-4000-8000-000000000020",
            ),
          ],
        },
        {
          id: "c3000000-0000-4000-8000-000000000005",
          span: 2,
          blocks: [
            categoryList(
              classicBlockIds.body,
              { en: "Body Care", ar: "العناية بالجسم" },
              "CHILDREN",
              "b0000000-0000-4000-8000-000000000023",
            ),
          ],
        },
        {
          id: "c3000000-0000-4000-8000-000000000006",
          span: 2,
          blocks: [
            categoryList(
              classicBlockIds.concern,
              { en: "Skin Concerns", ar: "مشاكل البشرة" },
              "CHILDREN",
              "b0000000-0000-4000-8000-000000000025",
            ),
          ],
        },
        {
          id: "c3000000-0000-4000-8000-000000000007",
          span: 1,
          blocks: [
            {
              ...listBase(classicBlockIds.brands, { en: "Featured Brands", ar: "علامات مميزة" }),
              type: "BRAND_LIST",
              mode: "ALL_ACTIVE",
              brandIds: [],
              maximumItems: 6,
              order: "NAME_ASC",
              presentation: "TEXT",
              viewAllLabel: { en: "View all brands", ar: "عرض كل العلامات" },
              viewAllDestination: { type: "CUSTOM_PATH", path: "/brands" },
            },
          ],
        },
        {
          id: "c3000000-0000-4000-8000-000000000008",
          span: 3,
          blocks: [
            {
              ...blockBase(classicBlockIds.promo),
              type: "PROMO_CARD",
              eyebrow: { en: "Shop by category", ar: "تسوقي حسب الفئة" },
              title: { en: "Skincare That Cares", ar: "عناية بالبشرة تهتم بك" },
              description: {
                en: "Discover products that love your skin.",
                ar: "اكتشفي عناية يومية لبشرتك.",
              },
              ctaLabel: { en: "Shop now", ar: "تسوقي الآن" },
              destination: { type: "SHOP" },
              mediaAssetId: null,
              imageAlt: { en: "", ar: "" },
              showImage: true,
              showDescription: true,
              showCta: true,
              alignment: "START",
              style: "IMAGE_BOTTOM",
            },
          ],
        },
      ],
    },
  ],
};
const publishedNavigation = {
  schemaVersion: 1,
  revisionId: "a0000000-0000-4000-8000-000000000020",
  revision: 7,
  publishedAt: "2026-08-23T12:00:00.000Z",
  config: classicNavigationConfig,
  resolvedBlocks: {
    [brandDirectoryBlockId]: [
      ["d1000000-0000-4000-8000-000000000001", "cerave", "CeraVe"],
      ["d1000000-0000-4000-8000-000000000002", "anua", "Anua"],
      ["d1000000-0000-4000-8000-000000000003", "bioderma", "Bioderma"],
      ["d1000000-0000-4000-8000-000000000004", "atelier-nude", "Atelier Nude"],
      ["d1000000-0000-4000-8000-000000000005", "eucerin", "Eucerin"],
      ["d1000000-0000-4000-8000-000000000006", "cosrx", "COSRX"],
    ].map(([id, slug, name]) => ({
      kind: "BRAND",
      id,
      labelEn: name,
      labelAr: name,
      href: `/brands/${slug}`,
      secondaryLabel: null,
    })),
    [classicBlockIds.rail]: [
      {
        kind: "CATEGORY",
        id: "b0000000-0000-4000-8000-000000000020",
        labelEn: "Face Care",
        labelAr: "العناية بالوجه",
        href: "/categories/face-care",
        secondaryLabel: "root",
        productCount: 24,
      },
      {
        kind: "CATEGORY",
        id: "b0000000-0000-4000-8000-000000000023",
        labelEn: "Body Care",
        labelAr: "العناية بالجسم",
        href: "/categories/body-care",
        secondaryLabel: "root",
        productCount: 16,
      },
      {
        kind: "CATEGORY",
        id: "b0000000-0000-4000-8000-000000000025",
        labelEn: "Skin Concerns",
        labelAr: "مشاكل البشرة",
        href: "/categories/skin-concerns",
        secondaryLabel: "root",
        productCount: 18,
      },
    ],
    [classicBlockIds.face]: [
      {
        kind: "CATEGORY",
        id: "b0000000-0000-4000-8000-000000000021",
        labelEn: "Cleansers",
        labelAr: "منظفات الوجه",
        href: "/categories/cleansers",
        secondaryLabel: "b0000000-0000-4000-8000-000000000020",
        productCount: 8,
      },
    ],
    [classicBlockIds.body]: [
      {
        kind: "CATEGORY",
        id: "b0000000-0000-4000-8000-000000000024",
        labelEn: "Body Wash",
        labelAr: "غسول الجسم",
        href: "/categories/body-wash",
        secondaryLabel: "b0000000-0000-4000-8000-000000000023",
        productCount: 7,
      },
    ],
    [classicBlockIds.concern]: [
      {
        kind: "CATEGORY",
        id: "b0000000-0000-4000-8000-000000000026",
        labelEn: "Hydration",
        labelAr: "الترطيب",
        href: "/categories/hydration",
        secondaryLabel: "b0000000-0000-4000-8000-000000000025",
        productCount: 9,
      },
    ],
    [classicBlockIds.brands]: [
      {
        kind: "BRAND",
        id: "b0000000-0000-4000-8000-000000000022",
        labelEn: "Featured Brand",
        labelAr: "علامة مميزة",
        href: "/brands/featured-brand",
        secondaryLabel: null,
      },
    ],
  },
  resolvedLinks: Object.fromEntries(
    classicNavigationConfig.items.map((item) => [
      item.id,
      item.key === "home"
        ? "/"
        : item.key === "brands"
          ? "/brands"
          : item.key === "offers"
            ? "/offers"
            : item.key === "about"
              ? "/about"
              : item.key === "contact"
                ? "/contact"
                : "/shop",
    ]),
  ),
  media: {},
};
for (const blockId of Object.values(classicBlockIds))
  publishedNavigation.resolvedLinks[blockId] =
    blockId === classicBlockIds.brands ? "/brands" : "/shop";

const category = {
  id: "20000000-0000-4000-8000-000000000001",
  parentId: null,
  slug: "skincare",
  nameEn: "Skincare",
  nameAr: "العناية بالبشرة",
  imageUrl: "/bioreza-logo.png",
  sortOrder: 1,
  // productCount remains the backward-compatible direct count. The hierarchy
  // fields prove that parent discovery uses the aggregate without changing the
  // existing API meaning.
  productCount: 1,
  directProductCount: 1,
  aggregateProductCount: 4,
};

const categories = [
  category,
  {
    ...category,
    id: "20000000-0000-4000-8000-000000000002",
    slug: "personal-care",
    nameEn: "Personal Care",
    nameAr: "العناية الشخصية",
    imageUrl: null,
    sortOrder: 2,
    productCount: 7,
    directProductCount: 7,
    aggregateProductCount: 7,
  },
  {
    ...category,
    id: "20000000-0000-4000-8000-000000000003",
    slug: "haircare",
    nameEn: "Haircare",
    nameAr: "العناية بالشعر",
    imageUrl: null,
    sortOrder: 3,
    productCount: 5,
    directProductCount: 5,
    aggregateProductCount: 5,
  },
  {
    ...category,
    id: "20000000-0000-4000-8000-000000000004",
    slug: "fragrance",
    nameEn: "Fragrance",
    nameAr: "العطور",
    imageUrl: null,
    sortOrder: 4,
    productCount: 4,
    directProductCount: 4,
    aggregateProductCount: 4,
  },
  {
    ...category,
    id: "20000000-0000-4000-8000-000000000005",
    slug: "body-moisturizer",
    nameEn: "Body Moisturizer and Intensive Daily Care",
    nameAr: "مرطبات الجسم والعناية اليومية المكثفة",
    imageUrl: "/missing-category-cover.jpg",
    sortOrder: 5,
    productCount: 9,
    directProductCount: 9,
    aggregateProductCount: 9,
  },
  {
    ...category,
    id: "20000000-0000-4000-8000-000000000006",
    slug: "sun-care",
    nameEn: "Sun Care",
    nameAr: "العناية من الشمس",
    imageUrl: "/bioreza-logo.png",
    sortOrder: 6,
    productCount: 6,
    directProductCount: 6,
    aggregateProductCount: 6,
  },
  {
    ...category,
    id: "20000000-0000-4000-8000-000000000007",
    slug: "cleansers",
    nameEn: "Cleansers",
    nameAr: "منظفات البشرة",
    imageUrl: "/bioreza-logo.png",
    sortOrder: 7,
    productCount: 3,
    directProductCount: 3,
    aggregateProductCount: 3,
    parentId: category.id,
  },
];

const brands = [
  {
    id: "30000000-0000-4000-8000-000000000001",
    name: "La Roche-Posay",
    slug: "la-roche-posay",
    logoUrl: "/bioreza-logo.png",
    productCount: 1,
  },
  {
    id: "30000000-0000-4000-8000-000000000002",
    name: "Bobai",
    slug: "bobai",
    logoUrl: "/bioreza-logo.png",
    productCount: 1,
  },
  {
    id: "30000000-0000-4000-8000-000000000003",
    name: "Vichy",
    slug: "vichy",
    logoUrl: "/bioreza-logo.png",
    productCount: 1,
  },
];

const longProductDescription = Array.from(
  { length: 18 },
  (_, index) =>
    `Clinical detail ${index + 1}. This intentionally long authored paragraph explains texture, application, compatibility, and expected use without relying on artificial spacer elements.`,
).join("\n\n");

const longProductDescriptionAr = Array.from(
  { length: 18 },
  (_, index) =>
    `تفاصيل المنتج ${index + 1}. فقرة عربية طويلة لاختبار ثبات موضع أقسام تفاصيل المنتج عند الفتح والإغلاق.`,
).join("\n\n");

const product = {
  id: "10000000-0000-4000-8000-000000000001",
  slug: "acm-depiwhite-eye-contour-gel-15ml",
  nameEn: "ACM Depiwhite Advanced Intensive Anti-Pigmentation Eye Contour Cream 40ML",
  nameAr: "كريم ACM ديبي وايت المكثف لمحيط العين 40 مل",
  shortDescriptionEn: "Targeted care for the delicate eye contour.",
  shortDescriptionAr: "عناية مخصصة لمنطقة محيط العين الحساسة.",
  descriptionEn: longProductDescription,
  descriptionAr: longProductDescriptionAr,
  ingredients: "Aqua, Glycerin",
  ingredientDetails: [],
  howToUse: "Apply   a small amount around the eye contour.\n  Massage gently until absorbed.",
  howToUseEn: "Apply   a small amount around the eye contour.\n  Massage gently until absorbed.",
  howToUseAr: "ضعي كمية صغيرة حول محيط العين.\n  دلّكي بلطف حتى الامتصاص.",
  skinType: ["ALL"],
  basePrice: 41900,
  compareAtPrice: null,
  rating: 4.8,
  reviewCount: 12,
  imageUrl: "/bioreza-logo.png",
  category,
  categories: [category, categories.at(-1)],
  brand: brands[0],
  options: [],
  variants: [
    {
      id: "10000000-0000-4000-8000-000000000002",
      sku: "ACM-DEPIWHITE-40",
      nameEn: "40 ml",
      nameAr: "40 مل",
      price: 41900,
      compareAtPrice: null,
      shadeHex: null,
      optionValues: [],
      images: [],
      stock: 8,
    },
  ],
  images: [
    {
      id: "10000000-0000-4000-8000-000000000003",
      url: "/bioreza-logo.png",
      altText: "ACM Depiwhite eye contour cream",
      sortOrder: 0,
    },
    {
      id: "10000000-0000-4000-8000-000000000005",
      url: "/bioreza-logo.png?alternate=1",
      altText: "ACM Depiwhite eye contour cream packaging",
      sortOrder: 1,
    },
  ],
};

const viewerFitImages = [
  ["fit-portrait", "portrait", "Large portrait fixture", 4000, 5000],
  ["fit-landscape", "landscape", "Large landscape fixture", 5000, 3000],
  ["fit-small", "small", "Small image fixture", 160, 100],
  ["fit-square", "square", "High-resolution square fixture", 6000, 6000],
].map(([id, filename, altText, width, height], sortOrder) => ({
  id,
  url: `/api/v1/viewer-fixtures/${filename}.svg`,
  altText,
  width,
  height,
  sortOrder,
}));

const viewerFitProduct = {
  ...product,
  slug: "viewer-fit-product",
  imageUrl: viewerFitImages[0].url,
  images: viewerFitImages.map(({ width: _width, height: _height, ...image }) => image),
};

const emptyCart = {
  cartId: "40000000-0000-4000-8000-000000000001",
  owner: "GUEST",
  items: [],
  subtotal: 0,
  discountTotal: 0,
  estimatedTotal: 0,
  totalSavings: 0,
  couponCode: null,
  appliedPromotions: [],
  promotionMessages: [],
  giftOptions: [],
  totalQuantity: 0,
  hasIssues: false,
  updatedAt: "2026-08-18T00:00:00.000Z",
};

const server = createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);
  const path = url.pathname.replace(/^\/api\/v1/, "");

  if (url.pathname === "/health") return json(response, 200, { ok: true });
  if (path === `/products/${product.slug}`) return success(response, product);
  if (path === `/products/${viewerFitProduct.slug}`) return success(response, viewerFitProduct);
  if (path.startsWith("/viewer-fixtures/")) {
    const filename = path
      .split("/")
      .at(-1)
      ?.replace(/\.svg$/, "");
    const fixture = viewerFitImages.find((image) => image.url.endsWith(`/${filename}.svg`));
    if (!fixture) return json(response, 404, { error: "Fixture not found" });
    response.writeHead(200, { "content-type": "image/svg+xml", "cache-control": "no-store" });
    response.end(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${fixture.width}" height="${fixture.height}" viewBox="0 0 ${fixture.width} ${fixture.height}"><rect width="100%" height="100%" fill="#d8ad6b"/><rect x="2" y="2" width="${fixture.width - 4}" height="${fixture.height - 4}" fill="none" stroke="#111" stroke-width="4"/></svg>`,
    );
    return;
  }
  if (path === `/products/${product.id}/reviews`) {
    return success(response, {
      items: [],
      summary: { average: 0, count: 0, distribution: {} },
      meta: { page: 1, totalPages: 0, total: 0 },
    });
  }
  if (path === "/products/facets") {
    return success(response, {
      brands: brands.map(({ id, name, slug, productCount }) => ({
        id,
        name,
        slug,
        logoUrl: null,
        count: productCount,
      })),
      tags: [
        {
          id: "50000000-0000-4000-8000-000000000001",
          name: "Sensitive Skin",
          slug: "sensitive-skin",
          count: 1,
        },
      ],
      categories: categories.map(
        ({ id, parentId, slug, nameEn, nameAr, productCount, aggregateProductCount }) => ({
          id,
          parentId,
          slug,
          nameEn,
          nameAr,
          count: aggregateProductCount ?? productCount,
        }),
      ),
      price: { min: 41900, max: 41900 },
    });
  }
  if (path === "/products/merchandising") return success(response, [product]);
  if (path === "/products") {
    const search = url.searchParams.get("search");
    const stockBySearch = new Map([
      ["out-of-stock", 0],
      ["stock-one", 1],
      ["stock-ten", 10],
    ]);
    const requestedStock = search ? stockBySearch.get(search) : undefined;
    const catalogProduct =
      search === "variant-stock" || search === "variant-selection"
        ? {
            ...product,
            slug: `${search}-product`,
            nameEn: `${search} product`,
            variants: [
              { ...product.variants[0], nameEn: "Variant A", stock: 10 },
              {
                ...product.variants[0],
                id: "10000000-0000-4000-8000-000000000004",
                sku: `ACM-DEPIWHITE-${search === "variant-stock" ? "SOLD-OUT" : "OPTION-B"}`,
                nameEn: "Variant B",
                stock: search === "variant-stock" ? 0 : 4,
              },
            ],
          }
        : requestedStock !== undefined
          ? {
              ...product,
              slug: `${search}-product`,
              nameEn: `${search} product`,
              variants: product.variants.map((variant) => ({ ...variant, stock: requestedStock })),
            }
          : product;
    const page = Number(url.searchParams.get("page") || "1");
    const isListingControlFixture =
      !search &&
      (url.searchParams.has("sortBy") ||
        url.searchParams.has("inStock") ||
        url.searchParams.has("tags"));
    const total = isListingControlFixture ? 30 : search ? 1 : 25;
    return json(response, 200, {
      success: true,
      data: [catalogProduct],
      meta: {
        page,
        limit: 24,
        total,
        totalPages: Math.ceil(total / 24),
        hasNext: page * 24 < total,
        hasPrev: page > 1,
      },
    });
  }
  if (path === "/categories") return success(response, categories);
  if (path === "/brands") return success(response, brands);
  if (path === "/navigation") return success(response, publishedNavigation);
  if (path === "/store/settings") {
    return success(response, {
      status: "OPEN",
      statusMessageEn: null,
      statusMessageAr: null,
      paymentWindowHours: 24,
      codEnabled: true,
      codFee: 0,
      freeShippingThreshold: null,
      brandMarqueeSpeed: "FAST",
    });
  }
  if (path === "/promotions/prices") return success(response, []);
  if (path === "/cart") return success(response, emptyCart);
  if (path === "/campaigns/eligible") {
    return success(response, { campaigns: [], serverTime: "2026-08-18T00:00:00.000Z" });
  }
  if (path === "/campaigns/events") {
    return success(response, { accepted: 0, duplicates: 0, rejected: 0 });
  }
  if (path === "/banners/active" || path === "/promotions/offers") {
    return success(response, []);
  }

  return json(response, 404, {
    code: "NOT_MOCKED",
    message: `${request.method || "GET"} ${path}`,
  });
});

server.listen(port, host);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}

function success(response, data) {
  return json(response, 200, { success: true, data });
}

function json(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body));
}
