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
const multiCategoryBlockIds = {
  body: "c5000000-0000-4000-8000-000000000001",
  hair: "c5000000-0000-4000-8000-000000000002",
  korean: "c5000000-0000-4000-8000-000000000003",
};
const multiCategoryBlocks = [
  categoryList(
    multiCategoryBlockIds.body,
    { en: "Body Care", ar: "العناية بالجسم" },
    "CHILDREN",
    "b5000000-0000-4000-8000-000000000001",
  ),
  categoryList(
    multiCategoryBlockIds.hair,
    { en: "Hair Care", ar: "العناية بالشعر" },
    "CHILDREN",
    "b5000000-0000-4000-8000-000000000002",
  ),
  categoryList(
    multiCategoryBlockIds.korean,
    { en: "Korean", ar: "الكوري" },
    "CHILDREN",
    "b5000000-0000-4000-8000-000000000003",
  ),
].map((block, index) => ({
  ...block,
  maximumItems: 24,
  showViewAll: true,
  viewAllDestination: {
    type: "CATEGORY",
    id: `b5000000-0000-4000-8000-00000000000${index + 1}`,
  },
  mobileOrder: index,
}));
const multiCategoryItem = {
  ...categoriesNavigationItem,
  id: "c1000000-0000-4000-8000-000000000010",
  key: "departments",
  label: { en: "Departments", ar: "الأقسام" },
  megaMenu: {
    enabled: true,
    width: "FULL",
    style: "CLASSIC",
    mobilePresentation: "ACCORDION",
    rows: [
      {
        id: "c2000000-0000-4000-8000-000000000010",
        preset: "THREE_EQUAL",
        presentation: "DEFAULT",
        columnSeparators: true,
        enabled: true,
        visibility: navigationVisibility,
        columns: multiCategoryBlocks.map((block, index) => ({
          id: `c3000000-0000-4000-8000-00000000001${index}`,
          span: 4,
          blocks: [block],
        })),
      },
    ],
  },
};
classicNavigationConfig.items.splice(
  classicNavigationConfig.items.indexOf(categoriesNavigationItem) + 1,
  0,
  multiCategoryItem,
);
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
    [multiCategoryBlockIds.body]: Array.from({ length: 8 }, (_, index) => ({
      kind: "CATEGORY",
      id: `b6000000-0000-4000-8000-0000000000${String(index + 1).padStart(2, "0")}`,
      labelEn: `Body care ${index + 1}`,
      labelAr: `العناية بالجسم ${index + 1}`,
      href: `/categories/body-care-${index + 1}`,
      secondaryLabel: "b5000000-0000-4000-8000-000000000001",
      productCount: index + 2,
    })),
    [multiCategoryBlockIds.hair]: [
      {
        kind: "CATEGORY",
        id: "b7000000-0000-4000-8000-000000000001",
        labelEn: "Conditioner",
        labelAr: "بلسم الشعر",
        href: "/categories/conditioner",
        secondaryLabel: "b5000000-0000-4000-8000-000000000002",
        productCount: 4,
      },
    ],
    [multiCategoryBlockIds.korean]: [],
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
publishedNavigation.resolvedLinks[multiCategoryBlockIds.body] = "/categories/body-care";
publishedNavigation.resolvedLinks[multiCategoryBlockIds.hair] = "/categories/hair-care";
publishedNavigation.resolvedLinks[multiCategoryBlockIds.korean] = "/categories/korean";

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
  url: `http://${host}:${port}/api/v1/viewer-fixtures/${filename}.svg`,
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

const pageBuilderImageIds = {
  page: "e1000000-0000-4000-8000-000000000001",
  revision: "e1000000-0000-4000-8000-000000000002",
  section: "e1000000-0000-4000-8000-000000000003",
  desktop: "e1000000-0000-4000-8000-000000000004",
  mobile: "e1000000-0000-4000-8000-000000000005",
};
const pageBuilderImageSnapshot = {
  pageId: pageBuilderImageIds.page,
  slug: "page-builder-image-test",
  type: "CAMPAIGN",
  revisionId: pageBuilderImageIds.revision,
  revision: 1,
  publishedAt: "2026-08-29T12:00:00.000Z",
  resolvedAt: "2026-08-29T12:00:00.000Z",
  preview: false,
  config: {
    schemaVersion: 1,
    title: { en: "Page Builder image", ar: "صورة منشئ الصفحات" },
    seo: {
      title: { en: "Page Builder image", ar: "صورة منشئ الصفحات" },
      description: { en: "Published image fixture", ar: "نموذج صورة منشورة" },
      canonicalPath: "/page-builder-image-test",
      openGraphMediaId: null,
      indexable: false,
    },
    sections: [
      {
        id: pageBuilderImageIds.section,
        analyticsKey: "published-image",
        label: "Published image",
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
        desktopMediaId: pageBuilderImageIds.desktop,
        mobileMediaId: pageBuilderImageIds.mobile,
        imageAlt: { en: "Published responsive image", ar: "صورة منشورة متجاوبة" },
        caption: { en: "Published from Page Builder", ar: "منشورة من منشئ الصفحات" },
        destination: { type: "SHOP" },
        openInNewTab: true,
        imageWidth: "CUSTOM",
        customWidthPercent: 72,
        alignment: "CENTER",
        aspectRatio: "4_3",
        customAspectRatio: { width: 4, height: 3 },
        objectFit: "COVER",
        objectPosition: "CENTER",
        borderRadius: 12,
        maxHeight: 720,
        backgroundColor: "#f4efe7",
      },
    ],
  },
  entities: {},
  products: {},
  media: {
    [pageBuilderImageIds.desktop]: {
      id: pageBuilderImageIds.desktop,
      url: `http://${host}:${port}/api/v1/page-builder-fixtures/desktop.svg`,
      width: 1600,
      height: 900,
      altText: null,
      contentType: "image/svg+xml",
    },
    [pageBuilderImageIds.mobile]: {
      id: pageBuilderImageIds.mobile,
      url: `http://${host}:${port}/api/v1/page-builder-fixtures/mobile.svg`,
      width: 750,
      height: 1000,
      altText: null,
      contentType: "image/svg+xml",
    },
  },
  links: { [pageBuilderImageIds.section]: "/shop" },
};

const brandLogoSectionId = "e2000000-0000-4000-8000-000000000003";
const brandLogoFixtures = [
  ["e2000000-0000-4000-8000-000000000011", "Wide Wordmark", "wide.svg", "STANDARD", "STANDARD"],
  ["e2000000-0000-4000-8000-000000000012", "Tall Mark", "tall.svg", "STANDARD", "STANDARD"],
  ["e2000000-0000-4000-8000-000000000013", "Square Mark", "square.svg", "STANDARD", "STANDARD"],
  [
    "e2000000-0000-4000-8000-000000000014",
    "Transparent Mark",
    "transparent.svg",
    "STANDARD",
    "STANDARD",
  ],
  ["e2000000-0000-4000-8000-000000000015", "Whitespace Mark", "whitespace.svg", "LARGE", "COMPACT"],
  ["e2000000-0000-4000-8000-000000000016", "Tiny Source", "tiny.svg", "STANDARD", "STANDARD"],
  ["e2000000-0000-4000-8000-000000000017", "Missing Logo", null, "STANDARD", "STANDARD"],
  ["e2000000-0000-4000-8000-000000000018", "Deleted Logo", "deleted.svg", "STANDARD", "STANDARD"],
];
const pageBuilderBrandLogoSnapshot = {
  ...pageBuilderImageSnapshot,
  pageId: "e2000000-0000-4000-8000-000000000001",
  revisionId: "e2000000-0000-4000-8000-000000000002",
  slug: "page-builder-brand-logo-test",
  config: {
    ...pageBuilderImageSnapshot.config,
    title: { en: "Brand logo normalization", ar: "توحيد شعارات العلامات" },
    seo: {
      ...pageBuilderImageSnapshot.config.seo,
      canonicalPath: "/page-builder-brand-logo-test",
    },
    sections: [
      {
        id: brandLogoSectionId,
        analyticsKey: "brand-logo-normalization",
        label: "Brand logo normalization",
        enabled: true,
        visibility: {
          devices: ["DESKTOP", "TABLET", "MOBILE"],
          locales: ["en", "ar"],
          startsAt: null,
          endsAt: null,
        },
        surface: "DEFAULT",
        spacing: "MEDIUM",
        width: "CONTAINED",
        type: "BRANDS",
        heading: { en: "Brand identities", ar: "هويات العلامات" },
        description: { en: "", ar: "" },
        mode: "MANUAL",
        brandIds: brandLogoFixtures.map(([id]) => id),
        limit: 12,
        layout: "LOGO_GRID",
      },
    ],
  },
  entities: {
    [brandLogoSectionId]: brandLogoFixtures.map(([id, name, fixture, scale, padding]) => ({
      kind: "BRAND",
      id,
      labelEn: name,
      labelAr: name,
      slug: name.toLowerCase().replaceAll(" ", "-"),
      href: `/brands/${name.toLowerCase().replaceAll(" ", "-")}`,
      imageUrl: fixture ? `http://${host}:${port}/api/v1/brand-logo-fixtures/${fixture}` : null,
      logoDisplay: { scale, padding, alignX: "CENTER", alignY: "CENTER" },
    })),
  },
  media: {},
  links: {},
};

const heroSlideId = "91000000-0000-4000-8000-000000000004";
const pageBuilderHeroSnapshot = {
  ...pageBuilderImageSnapshot,
  slug: "page-builder-hero-test",
  config: {
    ...pageBuilderImageSnapshot.config,
    title: { en: "Hero test", ar: "اختبار الواجهة" },
    sections: [
      {
        id: pageBuilderImageIds.section,
        analyticsKey: "hero-builder-test",
        label: "Hero Builder test",
        enabled: true,
        visibility: {
          devices: ["DESKTOP", "TABLET", "MOBILE"],
          locales: ["en", "ar"],
          startsAt: null,
          endsAt: null,
        },
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
            id: heroSlideId,
            label: "Responsive launch",
            enabled: true,
            mediaType: "IMAGE",
            desktopMediaId: pageBuilderImageIds.desktop,
            mobileMediaId: pageBuilderImageIds.mobile,
            posterMediaId: null,
            imageAlt: { en: "Campaign collection", ar: "مجموعة الحملة" },
            decorative: false,
            eyebrow: { en: "Curated beauty", ar: "جمال مختار" },
            heading: { en: "Skin\nFirst", ar: "البشرة\nأولاً" },
            secondaryHeading: { en: "New collection", ar: "مجموعة جديدة" },
            description: {
              en: "A responsive Hero managed by Admin.",
              ar: "واجهة متجاوبة يديرها المشرف.",
            },
            supportingText: { en: "", ar: "" },
            primaryCta: {
              label: { en: "Shop", ar: "تسوقي" },
              destination: { type: "SHOP" },
              variant: "PRIMARY",
              newTab: false,
            },
            secondaryCta: {
              label: { en: "", ar: "" },
              destination: null,
              variant: "TEXT",
              newTab: false,
            },
            layout: {
              mediaBehavior: "BACKGROUND",
              objectFit: "COVER",
              objectPosition: "FOCAL_POINT",
              focalPoint: { x: 68, y: 35 },
              zoom: 100,
              sideImagePosition: "RIGHT",
              sideImageWidth: 50,
              horizontalAlignment: "START",
              verticalAlignment: "CENTER",
              textAlignment: "START",
              contentWidth: "MEDIUM",
              height: "STANDARD",
              overlay: "MEDIUM",
              overlayStyle: "TO_END",
              overlayColor: "#0f0c09",
              textTheme: "LIGHT",
            },
            mobile: {
              enabled: true,
              objectFit: "COVER",
              objectPosition: "FOCAL_POINT",
              focalPoint: { x: 38, y: 50 },
              zoom: 105,
              horizontalAlignment: "CENTER",
              verticalAlignment: "BOTTOM",
              textAlignment: "CENTER",
              height: "FULL",
              overlay: "STRONG",
              overlayStyle: "TO_TOP",
              textTheme: "LIGHT",
              contentOrder: "MEDIA_FIRST",
              ctaLayout: "STACK",
              headlineScale: "SMALL",
              showDescription: true,
              showSecondaryCta: false,
            },
            video: {
              autoplay: true,
              muted: true,
              loop: true,
              controls: false,
              playsInline: true,
              preload: "METADATA",
            },
            schedule: { startsAt: null, endsAt: null },
          },
        ],
        carousel: {
          autoplay: false,
          durationSeconds: 6,
          pauseOnHover: true,
          showArrows: true,
          showIndicators: true,
          animation: "FADE",
        },
      },
    ],
  },
  links: { [`${pageBuilderImageIds.section}:slide:${heroSlideId}:primary`]: "/shop" },
};

const signatureModuleNames = [
  "BRAND_MARQUEE",
  "BENEFITS",
  "CATEGORY_SHOWCASE",
  "FEATURED",
  "COLLECTION_FEATURE",
  "CONCERNS",
  "BEST_SELLERS",
  "BRAND_STORY",
  "BEAUTY_DIFFERENCE",
];
const pageBuilderSignatureHomeSnapshot = {
  ...pageBuilderImageSnapshot,
  slug: "page-builder-signature-home-test",
  config: {
    ...pageBuilderImageSnapshot.config,
    title: { en: "BioReza Homepage", ar: "الصفحة الرئيسية لبيوريزا" },
    sections: signatureModuleNames.map((module, index) => ({
      id: `92000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
      analyticsKey: `home-${module.toLowerCase().replaceAll("_", "-")}`,
      label: module,
      enabled: true,
      visibility: {
        devices: ["DESKTOP", "TABLET", "MOBILE"],
        locales: ["en", "ar"],
        startsAt: null,
        endsAt: null,
      },
      surface: "DEFAULT",
      spacing: "NONE",
      width: "FULL",
      type: "BIOREZA_HOME_MODULE",
      module,
    })),
  },
  entities: {},
  products: {},
  media: {},
  links: {},
};

const server = createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);
  const path = url.pathname.replace(/^\/api\/v1/, "");
  const origin = request.headers.origin;
  if (origin === "http://127.0.0.1:4173" || origin === "http://127.0.0.1:4180") {
    response.setHeader("access-control-allow-origin", origin);
    response.setHeader("access-control-allow-credentials", "true");
    response.setHeader("vary", "Origin");
  }
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-methods": "GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS",
      "access-control-allow-headers":
        request.headers["access-control-request-headers"] || "content-type",
      "access-control-max-age": "600",
    });
    response.end();
    return;
  }

  if (url.pathname === "/health") return json(response, 200, { ok: true });
  if (path === "/pages/page-builder-image-test") {
    return success(response, pageBuilderImageSnapshot);
  }
  if (path === "/pages/page-builder-brand-logo-test") {
    return success(response, pageBuilderBrandLogoSnapshot);
  }
  if (path === "/pages/page-builder-hero-test") {
    return success(response, pageBuilderHeroSnapshot);
  }
  if (path === "/pages/page-builder-signature-home-test") {
    return success(response, pageBuilderSignatureHomeSnapshot);
  }
  if (path.startsWith("/page-builder-fixtures/")) {
    const mobile = path.endsWith("/mobile.svg");
    const width = mobile ? 750 : 1600;
    const height = mobile ? 1000 : 900;
    const color = mobile ? "#a7c7b4" : "#d8ad6b";
    response.writeHead(200, { "content-type": "image/svg+xml", "cache-control": "no-store" });
    response.end(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="48">${mobile ? "mobile" : "desktop"}</text></svg>`,
    );
    return;
  }
  if (path.startsWith("/brand-logo-fixtures/")) {
    const filename = path.split("/").at(-1);
    if (filename === "deleted.svg") return json(response, 404, { error: "Fixture removed" });
    const dimensions = {
      "wide.svg": [900, 180],
      "tall.svg": [220, 600],
      "square.svg": [400, 400],
      "transparent.svg": [520, 260],
      "whitespace.svg": [1000, 500],
      "tiny.svg": [40, 20],
    }[filename];
    if (!dimensions) return json(response, 404, { error: "Fixture not found" });
    const [width, height] = dimensions;
    const inset = filename === "whitespace.svg" ? 0.38 : 0.08;
    const x = Math.round(width * inset);
    const y = Math.round(height * inset);
    response.writeHead(200, {
      "content-type": "image/svg+xml",
      "cache-control": "no-store",
    });
    response.end(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect x="${x}" y="${y}" width="${width - x * 2}" height="${height - y * 2}" rx="12" fill="#27231e"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#f7f1e8" font-family="sans-serif" font-size="${Math.max(10, Math.round(height * 0.16))}">${filename.replace(".svg", "")}</text></svg>`,
    );
    return;
  }
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
