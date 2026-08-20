import { createServer } from "node:http";

const host = "127.0.0.1";
const port = Number.parseInt(process.env.E2E_MOCK_API_PORT || "4174", 10);

const category = {
  id: "20000000-0000-4000-8000-000000000001",
  parentId: null,
  slug: "skincare",
  nameEn: "Skincare",
  nameAr: "العناية بالبشرة",
  imageUrl: "/bioreza-logo.png",
  sortOrder: 1,
  productCount: 1,
};

const categories = [
  category,
  {
    ...category,
    id: "20000000-0000-4000-8000-000000000002",
    slug: "makeup",
    nameEn: "Makeup",
    nameAr: "المكياج",
    imageUrl: null,
    sortOrder: 2,
    productCount: 7,
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

const product = {
  id: "10000000-0000-4000-8000-000000000001",
  slug: "acm-depiwhite-eye-contour-gel-15ml",
  nameEn: "ACM Depiwhite Advanced Intensive Anti-Pigmentation Eye Contour Cream 40ML",
  nameAr: "كريم ACM ديبي وايت المكثف لمحيط العين 40 مل",
  shortDescriptionEn: "Targeted care for the delicate eye contour.",
  shortDescriptionAr: "عناية مخصصة لمنطقة محيط العين الحساسة.",
  descriptionEn: "A lightweight eye-contour treatment for an even-looking complexion.",
  descriptionAr: "عناية خفيفة لمحيط العين تساعد على توحيد مظهر البشرة.",
  ingredients: "Aqua, Glycerin",
  ingredientDetails: [],
  howToUse: "Apply   a small amount around the eye contour.\n  Massage gently until absorbed.",
  skinType: ["ALL_SKIN_TYPES"],
  basePrice: 41900,
  compareAtPrice: null,
  rating: 4.8,
  reviewCount: 12,
  imageUrl: "/bioreza-logo.png",
  category,
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
  ],
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
  if (path === `/products/${product.id}/reviews`) {
    return success(response, {
      items: [],
      summary: { average: 0, count: 0, distribution: {} },
      meta: { page: 1, totalPages: 0, total: 0 },
    });
  }
  if (path === "/products") {
    const search = url.searchParams.get("search");
    const stockBySearch = new Map([
      ["out-of-stock", 0],
      ["stock-one", 1],
      ["stock-ten", 10],
    ]);
    const requestedStock = search ? stockBySearch.get(search) : undefined;
    const catalogProduct =
      search === "variant-stock"
        ? {
            ...product,
            slug: "variant-stock-product",
            nameEn: "Variant stock product",
            variants: [
              { ...product.variants[0], nameEn: "Variant A", stock: 10 },
              {
                ...product.variants[0],
                id: "10000000-0000-4000-8000-000000000004",
                sku: "ACM-DEPIWHITE-SOLD-OUT",
                nameEn: "Variant B",
                stock: 0,
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
    return json(response, 200, {
      success: true,
      data: [catalogProduct],
      meta: { page: 1, limit: 24, total: 1, totalPages: 1, hasNext: false, hasPrev: false },
    });
  }
  if (path === "/categories") return success(response, categories);
  if (path === "/brands") return success(response, brands);
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
