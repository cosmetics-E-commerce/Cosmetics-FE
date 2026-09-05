import type {
  AuthSession,
  AuthUser,
  CartResponse,
  CheckoutPreviewResponse,
  BulkMoveSavedResponse,
  SavedForLaterItemResponse,
  CatalogFacetResponse,
  AddressResponse as ContractAddressResponse,
  CreateAddressInput as ContractCreateAddressInput,
  PublicBrandListItemResponse,
  PublicCategoryResponse,
  PublicProductResponse,
  NavigationPublicSnapshot,
  LandingPagePublicSnapshot,
  CustomerReviewLibraryResponse,
  ReviewEligibilityResponse,
  ReviewResponse,
  RegistrationOtpChallenge,
  RegistrationVerificationResult,
  ResendRegistrationOtpResult,
  UserProfileResponse,
  SharedWishlistResponse,
  WishlistCollectionResponse,
  WishlistResponse,
  PublicStoreSettingsResponse,
} from "../../vendor/cosmetics-contracts/index.js";
import { randomUuid } from "@/lib/uuid";
import {
  humanErrorMessage,
  normalizeStoreApiError,
  type PublicErrorPayload,
  type StoreApiError,
} from "@/lib/error-system";

export type {
  AuthSession,
  AuthUser,
  CartResponse,
  CheckoutPreviewResponse,
  BulkMoveSavedResponse,
  SavedForLaterItemResponse,
  CatalogFacetResponse,
  PublicBrandListItemResponse,
  PublicCategoryResponse,
  PublicProductResponse,
  NavigationPublicSnapshot,
  LandingPagePublicSnapshot,
  CustomerReviewLibraryResponse,
  ReviewEligibilityResponse,
  ReviewResponse,
  RegistrationOtpChallenge,
  RegistrationVerificationResult,
  ResendRegistrationOtpResult,
  UserProfileResponse,
  SharedWishlistResponse,
  WishlistCollectionResponse,
  WishlistResponse,
  PublicStoreSettingsResponse,
};

export async function getPublicStoreSettings(signal?: AbortSignal) {
  return rawRequest<PublicStoreSettingsResponse>("/store/settings", {
    auth: false,
    ...(signal ? { signal } : {}),
  });
}

export async function getPublishedNavigation(signal?: AbortSignal) {
  return rawRequest<NavigationPublicSnapshot>("/navigation", {
    auth: false,
    ...(signal ? { signal } : {}),
  });
}

export async function getPublishedHomepage(signal?: AbortSignal) {
  return rawRequest<LandingPagePublicSnapshot | null>("/pages/homepage", {
    auth: false,
    ...(signal ? { signal } : {}),
  });
}

export async function getPublishedLandingPage(slug: string, signal?: AbortSignal) {
  return rawRequest<LandingPagePublicSnapshot>(`/pages/${encodeURIComponent(slug)}`, {
    auth: false,
    ...(signal ? { signal } : {}),
  });
}

export function listConcerns(signal?: AbortSignal) {
  return rawRequest<PublicConcernSummary[]>("/concerns", {
    auth: false,
    ...(signal ? { signal } : {}),
  });
}

export function getConcern(slug: string, signal?: AbortSignal) {
  return rawRequest<PublicConcernDetail>(`/concerns/${encodeURIComponent(slug)}`, {
    auth: false,
    ...(signal ? { signal } : {}),
  });
}

export function getConcernProducts(
  slug: string,
  params: Record<string, string | number | boolean | undefined>,
  signal?: AbortSignal,
) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  return rawRequest<ConcernProductsPage>(
    `/concerns/${encodeURIComponent(slug)}/products${query.size ? `?${query}` : ""}`,
    { auth: false, ...(signal ? { signal } : {}) },
  );
}

export function listDynamicBundles(signal?: AbortSignal) {
  return rawRequest<PublicDynamicBundle[]>("/bundles", {
    auth: false,
    ...(signal ? { signal } : {}),
  });
}

export function getDynamicBundle(slug: string, signal?: AbortSignal) {
  return rawRequest<PublicDynamicBundle>(`/bundles/${encodeURIComponent(slug)}`, {
    auth: false,
    ...(signal ? { signal } : {}),
  });
}

export function getBundleSlotProducts(
  slug: string,
  slotKey: string,
  params: Record<string, string | number | boolean | undefined>,
  signal?: AbortSignal,
) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  return rawRequest<{
    data: PublicProductResponse[];
    meta: PaginationMeta;
    slot: PublicBundleSlot;
  }>(
    `/bundles/${encodeURIComponent(slug)}/slots/${encodeURIComponent(slotKey)}/products${query.size ? `?${query}` : ""}`,
    { auth: false, ...(signal ? { signal } : {}) },
  );
}

export function previewDynamicBundle(
  slug: string,
  version: number,
  selections: BundleSelection[],
  signal?: AbortSignal,
) {
  return rawRequest<BundlePreview>(`/bundles/${encodeURIComponent(slug)}/preview`, {
    method: "POST",
    auth: false,
    body: { expectedVersion: version, selections },
    ...(signal ? { signal } : {}),
  });
}

export function addDynamicBundleToCart(
  slug: string,
  version: number,
  selections: BundleSelection[],
) {
  return rawRequest<CommerceCartResponse>(`/bundles/${encodeURIComponent(slug)}/cart`, {
    method: "POST",
    body: {
      expectedVersion: version,
      selections,
      clientMutationId: randomUuid(),
    },
    headers: { "Idempotency-Key": randomUuid() },
  });
}

export async function getLandingPagePreview(token: string, signal?: AbortSignal) {
  return rawRequest<LandingPagePublicSnapshot>(`/pages/preview/${encodeURIComponent(token)}`, {
    auth: false,
    ...(signal ? { signal } : {}),
  });
}

export type AddressResponse = ContractAddressResponse & {
  bostaGovernorateId: string | null;
};

export type CreateAddressInput = ContractCreateAddressInput & {
  bostaGovernorateId?: string | null;
  bostaCityId?: string | null;
  bostaZoneId?: string | null;
};

export type AppliedPromotion = {
  id: string;
  name: string;
  title: string;
  type: string;
  couponCode: string | null;
  discountAmount: number;
  shippingDiscount: number;
  discountedUnits: number;
  message: string;
};
export type CommerceCartResponse = Omit<CartResponse, "items"> & {
  items: Array<CartResponse["items"][number] & { discount: number; discountedLineTotal: number }>;
  discountTotal: number;
  estimatedTotal: number;
  totalSavings: number;
  couponCode: string | null;
  appliedPromotions: AppliedPromotion[];
  promotionMessages: string[];
  giftOptions: Array<{
    variantId: string;
    quantity: number;
    customerChooses: boolean;
    promotionId: string;
  }>;
};
export type PromotionPrice = {
  variantId: string;
  originalPrice: number;
  price: number;
  discount: number;
  promotions: AppliedPromotion[];
};
export type StorefrontOffer = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  bannerImageKey?: string | null;
  badgeText: string | null;
  startsAt: string | null;
  endsAt: string | null;
  showCountdown: boolean;
  featured: boolean;
  productIds: string[];
  categoryIds: string[];
  brandIds: string[];
};

export type LocalizedText = { en: string; ar: string };
export type PublicConcernSummary = {
  id: string;
  slug: string;
  kind: "SKIN_TYPE" | "CONCERN";
  featured: boolean;
  name: LocalizedText;
  shortDescription: LocalizedText;
  heroMediaKey: string | null;
  iconMediaKey: string | null;
  productCount: number;
};
export type PublicConcernDetail = PublicConcernSummary & {
  revision: number;
  publishedAt: string;
  config: {
    name: LocalizedText;
    shortDescription: LocalizedText;
    longDescription: LocalizedText;
    heroMediaKey: string | null;
    mobileHeroMediaKey: string | null;
    content: Array<{
      id: string;
      type: string;
      heading: LocalizedText;
      body: LocalizedText;
      enabled: boolean;
      order: number;
    }>;
    faq: Array<{
      id: string;
      question: LocalizedText;
      answer: LocalizedText;
      enabled: boolean;
      order: number;
    }>;
    seo: {
      title: LocalizedText;
      description: LocalizedText;
      openGraphTitle: LocalizedText;
      openGraphDescription: LocalizedText;
      openGraphImageKey: string | null;
      indexable: boolean;
    };
  };
  products: ConcernProductsPage;
  ingredients: Array<{
    id: string;
    slug: string;
    name: string;
    shortDescription: LocalizedText;
    role: "FEATURED" | "RELEVANT" | "USE_WITH_CARE";
  }>;
  featuredCategories: PublicCategoryResponse[];
  curatedBrands: PublicBrandListItemResponse[];
  relatedConcerns: Array<Pick<PublicConcernSummary, "id" | "slug" | "name" | "shortDescription">>;
  coverage: {
    products: number;
    brands: number;
    categories: number;
    ingredients: number;
    routineRoles: string[];
  };
  routineHandoff: string | null;
  page: LandingPagePublicSnapshot | null;
};
export type ConcernProductsPage = {
  data: PublicProductResponse[];
  meta: PaginationMeta;
  facets: {
    brands: Array<{ id: string; slug: string; name: string; count: number }>;
    categories: Array<{
      id: string;
      slug: string;
      nameEn: string;
      nameAr: string;
      count: number;
    }>;
  };
};

export type PublicBundleSlot = {
  key: string;
  label: LocalizedText;
  description: LocalizedText;
  required: boolean;
  quantity: { minimum: number; maximum: number };
  order: number;
  allowSameProduct: boolean;
  coverage?: {
    eligibleProducts: number;
    eligibleVariants: number;
    outOfStock: number;
    health: "HEALTHY" | "WARNING" | "BROKEN";
  };
};
export type PublicDynamicBundle = {
  id: string;
  slug: string;
  version: number;
  name: LocalizedText;
  description: LocalizedText;
  instructions: LocalizedText;
  terms: LocalizedText;
  slots: PublicBundleSlot[];
  discountLabel: LocalizedText;
  heroMediaKey: string | null;
};
export type BundleSelection = {
  slotKey: string;
  productId: string;
  variantId: string;
  quantity: number;
};
export type BundlePreview = {
  valid: boolean;
  bundleId: string;
  version: number;
  state: "INCOMPLETE" | "VALID" | "INVALID" | "STALE";
  missingSlots: string[];
  errors: Array<{ code: string; slotKey: string | null; message: LocalizedText }>;
  lines: Array<{
    slotKey: string;
    productId: string;
    variantId: string;
    quantity: number;
    unitPrice: number;
    retailTotal: number;
    discount: number;
    finalTotal: number;
  }>;
  retailTotal: number;
  discountTotal: number;
  finalTotal: number;
  stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
};

export type ApiError = StoreApiError;

export type CheckoutResult = {
  order: {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    total?: number;
    grandTotal?: number;
    paymentDueAt?: string | null;
  };
  paymentInstructions?: {
    orderNumber: string;
    amountDue: number;
    method: string;
    vodafoneCashNumber?: string | null;
    instapayAddress?: string | null;
    paymentDueAt?: string | null;
    transferNote?: string;
  } | null;
};

export type Payment = {
  id: string;
  orderId: string;
  method: string;
  status: string;
  amount: number;
  currency?: string;
  referenceNumber?: string | null;
  expiresAt?: string | null;
  rejectionReason?: string | null;
  instructions?: PaymentInstruction | null;
};

export type PaymentInstruction = {
  method: "INSTAPAY" | "VODAFONE_CASH";
  accountName: string;
  accountNumber: string | null;
  bank: string | null;
  phoneNumber: string | null;
  receiverName: string | null;
  qrCodeUrl: string | null;
  notes: string | null;
  isActive: boolean;
};

export type ShippingCity = {
  id: string;
  name: string;
  nameAr?: string | null;
  code?: string | null;
  governorateId?: string | null;
};

export type ShippingGovernorate = {
  id: string;
  name: string;
  nameAr?: string | null;
  code?: string | null;
};

export type ShippingArea = {
  id: string;
  name: string;
  nameAr?: string | null;
};

export type ShippingRate = {
  provider: "MOCK" | "BOSTA";
  shippingCost: number;
  currency: string;
  estimatedDays: number;
  estimatedDeliveryDate: string;
  weight: number;
  dimensions: { length: number; width: number; height: number };
};

export type OrderSummary = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  grandTotal: number;
  currency: string;
  placedAt: string;
  discount: number;
  appliedPromotions: Array<{
    promotionId: string | null;
    name: string;
    couponCode: string | null;
    discountAmount: number;
    shippingDiscount: number;
  }>;
};

export type ReorderAvailability =
  "AVAILABLE" | "OUT_OF_STOCK" | "PREVIOUS_VARIANT_UNAVAILABLE" | "PRODUCT_NO_LONGER_AVAILABLE";

export type ReorderItem = {
  profileId: string;
  productId: string;
  variantId: string;
  slug: string | null;
  productNameEn: string;
  productNameAr: string;
  variantNameEn: string | null;
  variantNameAr: string | null;
  variantOptions: Array<{
    labelEn: string;
    labelAr: string;
    valueEn: string;
    valueAr: string;
  }>;
  imageUrl: string | null;
  currentPrice: number | null;
  currency: "EGP";
  availableQuantity: number;
  availability: ReorderAvailability;
  purchaseCount: number;
  totalQuantity: number;
  lastPurchaseAt: string | null;
  estimatedIntervalDays: number | null;
  confidence: "INSUFFICIENT" | "LOW" | "MEDIUM" | "HIGH";
  replenishmentWindow: { start: string | null; center: string | null; end: string | null };
  decision: {
    state: string;
    priority: number;
    reasons: Array<{ code: string; detail: string }>;
  };
  reminder: { state: "ACTIVE" | "SNOOZED" | "DISABLED"; snoozedUntil: string | null };
};

export type BuyAgainResponse = {
  items: ReorderItem[];
  preference: { smartEnabled: boolean; version: number };
  meta: PaginationMeta;
  freshness: { evaluatedAt: string | null; source: string };
};

export type ReorderOpportunitiesResponse = {
  items: ReorderItem[];
  suppressedReason: string | null;
  configVersion: number;
  snoozeOptionsDays?: number[];
};

export type OrderReorderPreview = {
  orderId: string;
  orderNumber: string;
  placedAt: string;
  items: Array<{
    variantId: string;
    productId: string | null;
    productNameEn: string;
    productNameAr: string;
    variantNameEn: string | null;
    variantNameAr: string | null;
    quantity: number;
    currentPrice: number | null;
    availability: ReorderAvailability;
    selectable: boolean;
  }>;
};

export type OrderTracking = {
  orderId: string;
  orderNumber: string;
  orderStatus: string;
  shipment: {
    provider: "MOCK" | "BOSTA";
    trackingNumber: string;
    trackingUrl: string;
    status: string;
    estimatedDelivery: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  estimatedDeliveryDate: string | null;
  shippingAddress: {
    receiverName: string | null;
    governorate: string | null;
    city: string | null;
    area: string | null;
  };
  history: Array<{ action: string; description: string; createdAt: string }>;
};

export type ProductReview = ReviewResponse;
export type ProductReviews = {
  items: ProductReview[];
  summary: { average: number; count: number; distribution: Record<string, number> };
  meta: { page: number; totalPages: number; total: number };
};
export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};
export type PaginatedResult<T> = {
  items: T[];
  meta: PaginationMeta;
};

type OrderSummaryApiResponse = Omit<OrderSummary, "grandTotal" | "placedAt"> & {
  grandTotal?: number;
  placedAt?: string;
  total?: number;
  createdAt?: string;
};

type Envelope<T> = { success: boolean; data: T; meta?: unknown };
type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean;
  retry?: boolean;
};

const configuredApiBase = (import.meta.env["VITE_API_BASE_URL"] as string | undefined)?.trim();
const API_BASE = resolveApiBase(
  configuredApiBase,
  typeof window === "undefined" ? undefined : window.location,
);
const CSRF_KEY = "bioreza.csrf";
const CART_KEY = "bioreza.guest-cart";
const REFRESH_LOCK_KEY = "bioreza.auth-refresh-lock";
const REFRESH_LOCK_NAME = "bioreza-auth-refresh";
const REFRESH_LEASE_MS = 30_000;
let accessToken: string | null = null;
let refreshPromise: Promise<AuthSession> | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

export function resolveApiBase(
  configured: string | undefined,
  location?: Pick<Location, "hostname" | "protocol">,
) {
  const host = location?.hostname || "localhost";
  const protocol = location?.protocol || "http:";
  if (!configured) return `${protocol}//${host}:3000/api/v1`;

  const normalized = configured.replace(/\/+$/, "");
  if (!location) return normalized;

  try {
    const url = new URL(normalized);
    if (isLoopbackHost(url.hostname) && url.hostname !== host) {
      // A localhost/127.0.0.1 mismatch is cross-site even though both reach this
      // machine. SameSite refresh cookies then disappear on reload. Keep the
      // configured port/path, but use the hostname that served the storefront.
      url.hostname = host;
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    return normalized;
  }
}

function isLoopbackHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

function browserValue(key: string) {
  if (typeof window === "undefined") return null;
  const storage = window.localStorage;
  if (!storage || typeof storage.getItem !== "function") return null;
  return storage.getItem(key);
}

function setBrowserValue(key: string, value: string | null) {
  if (typeof window === "undefined") return;
  const storage = window.localStorage;
  if (
    !storage ||
    typeof storage.setItem !== "function" ||
    typeof storage.removeItem !== "function"
  ) {
    return;
  }
  if (value) storage.setItem(key, value);
  else storage.removeItem(key);
}

export function rememberSession(session: AuthSession) {
  accessToken = session.tokens.accessToken;
  setBrowserValue(CSRF_KEY, session.csrfToken);
  scheduleSessionRefresh(session.tokens.expiresIn);
}

export function clearSession() {
  accessToken = null;
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = null;
  setBrowserValue(CSRF_KEY, null);
}

export function hasRefreshSession() {
  return Boolean(browserValue(CSRF_KEY));
}

function guestCartId() {
  if (typeof window === "undefined") return "00000000-0000-4000-8000-000000000000";
  const saved = browserValue(CART_KEY);
  if (saved) return saved;
  const id = randomUuid();
  setBrowserValue(CART_KEY, id);
  return id;
}

async function rawEnvelope<T>(path: string, options: RequestOptions = {}): Promise<Envelope<T>> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  headers.set("Accept-Language", browserValue("bioreza.locale") ?? "en");
  headers.set("X-Cart-Id", guestCartId());
  if (accessToken && options.auth !== false) headers.set("Authorization", `Bearer ${accessToken}`);
  const isForm = options.body instanceof FormData;
  if (options.body !== undefined && !isForm) headers.set("Content-Type", "application/json");

  const requestBody: BodyInit | null | undefined =
    options.body === undefined
      ? undefined
      : isForm
        ? (options.body as FormData)
        : JSON.stringify(options.body);
  const { body: _body, auth: _auth, retry: _retry, ...requestOptions } = options;
  const requestInit: RequestInit = {
    ...requestOptions,
    headers,
    credentials: "include",
  };
  if (requestBody !== undefined) requestInit.body = requestBody;
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, requestInit);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw error;
    throw normalizeStoreApiError(null, 0, browserLocale(), "NETWORK_UNAVAILABLE");
  }

  if (
    response.status === 401 &&
    options.auth !== false &&
    options.retry !== false &&
    hasRefreshSession()
  ) {
    await refreshSession();
    return rawEnvelope<T>(path, { ...options, retry: false });
  }

  const payload = (await response.json().catch(() => null)) as
    Envelope<T> | PublicErrorPayload | null;
  if (!response.ok) {
    const retryAfter = Number(response.headers.get("Retry-After"));
    throw normalizeStoreApiError(
      payload as PublicErrorPayload | null,
      response.status,
      browserLocale(),
      "REQUEST_FAILED",
      response.headers.get("X-Trace-Id"),
      Number.isFinite(retryAfter) ? retryAfter : null,
    );
  }
  return payload as Envelope<T>;
}

export async function rawRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return (await rawEnvelope<T>(path, options)).data;
}

export function apiErrorMessage(error: unknown, locale: "en" | "ar" = "en") {
  return humanErrorMessage(error, locale);
}

export function apiErrorCode(error: unknown) {
  return (error as ApiError | undefined)?.code ?? "REQUEST_FAILED";
}

export function apiRetryAfter(error: unknown) {
  const details = (error as ApiError | undefined)?.details;
  if (!details || typeof details !== "object") return 0;
  const retryAfter = (details as Record<string, unknown>)["retryAfter"];
  return typeof retryAfter === "number" && Number.isFinite(retryAfter)
    ? Math.max(0, Math.ceil(retryAfter))
    : 0;
}

function browserLocale(): "en" | "ar" {
  return browserValue("bioreza.locale") === "ar" ? "ar" : "en";
}

export function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = withBrowserRefreshLock(() => {
      const csrf = browserValue(CSRF_KEY);
      return rawRequest<AuthSession>("/auth/refresh", {
        method: "POST",
        auth: false,
        retry: false,
        body: {},
        headers: csrf ? { "X-CSRF-Token": csrf } : {},
      });
    })
      .then((session) => {
        rememberSession(session);
        return session;
      })
      .catch((error) => {
        if (isTerminalRefreshFailure(error)) clearSession();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

function scheduleSessionRefresh(expiresIn: number) {
  if (typeof window === "undefined" || !Number.isFinite(expiresIn) || expiresIn <= 0) return;
  if (refreshTimer) clearTimeout(refreshTimer);
  const delay = Math.max(30_000, (expiresIn - 60) * 1_000);
  refreshTimer = setTimeout(() => {
    refreshTimer = null;
    void refreshSession().catch((error) => {
      if (!isTerminalRefreshFailure(error) && hasRefreshSession()) {
        refreshTimer = setTimeout(() => {
          refreshTimer = null;
          void refreshSession().catch(() => undefined);
        }, 30_000);
      }
    });
  }, delay);
}

function isTerminalRefreshFailure(error: unknown) {
  const problem = error as ApiError | undefined;
  return (
    problem?.statusCode === 401 ||
    problem?.code === "INVALID_REFRESH_TOKEN" ||
    problem?.code === "INVALID_CSRF_TOKEN"
  );
}

async function withBrowserRefreshLock<T>(task: () => Promise<T>): Promise<T> {
  if (typeof navigator === "undefined") return task();
  if (navigator.locks?.request) {
    return navigator.locks.request(REFRESH_LOCK_NAME, task);
  }
  return withStorageRefreshLease(task);
}

async function withStorageRefreshLease<T>(task: () => Promise<T>): Promise<T> {
  if (typeof window === "undefined" || !window.localStorage) return task();
  const owner = randomUuid();

  for (;;) {
    const now = Date.now();
    const current = readRefreshLease();
    if (!current || current.expiresAt <= now) {
      setBrowserValue(
        REFRESH_LOCK_KEY,
        JSON.stringify({ owner, expiresAt: now + REFRESH_LEASE_MS }),
      );
      // Let simultaneous contenders settle before accepting ownership.
      await wait(40);
      if (readRefreshLease()?.owner === owner) {
        try {
          return await task();
        } finally {
          if (readRefreshLease()?.owner === owner) setBrowserValue(REFRESH_LOCK_KEY, null);
        }
      }
    }
    await wait(80 + Math.floor(Math.random() * 70));
  }
}

function readRefreshLease(): { owner: string; expiresAt: number } | null {
  const raw = browserValue(REFRESH_LOCK_KEY);
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as { owner?: unknown; expiresAt?: unknown };
    return typeof value.owner === "string" && typeof value.expiresAt === "number"
      ? { owner: value.owner, expiresAt: value.expiresAt }
      : null;
  } catch {
    return null;
  }
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

export async function login(identifier: string, password: string) {
  const session = await rawRequest<AuthSession>("/auth/login", {
    method: "POST",
    auth: false,
    body: { identifier, password },
  });
  rememberSession(session);
  return session;
}

export const register = (body: Record<string, unknown>) =>
  rawRequest<RegistrationOtpChallenge>("/auth/register", {
    method: "POST",
    auth: false,
    body,
  });

export const verifyRegistrationEmail = (email: string, otp: string) =>
  rawRequest<RegistrationVerificationResult>("/auth/verify-email", {
    method: "POST",
    auth: false,
    body: { email, otp },
  });

export const resendRegistrationOtp = (email: string) =>
  rawRequest<ResendRegistrationOtpResult>("/auth/resend-verification-otp", {
    method: "POST",
    auth: false,
    body: { email },
  });

export async function logoutRequest() {
  const csrf = browserValue(CSRF_KEY);
  await rawRequest("/auth/logout", {
    method: "POST",
    retry: false,
    body: {},
    headers: csrf ? { "X-CSRF-Token": csrf } : {},
  });
  clearSession();
}

export const forgotPassword = (email: string) =>
  rawRequest<{ ttlSeconds: number; resendAvailableInSeconds: number }>("/auth/password/forgot", {
    method: "POST",
    auth: false,
    body: { email },
  });
export const verifyResetOtp = (email: string, otp: string) =>
  rawRequest<{ token: string; expiresIn: number }>("/auth/password/verify-otp", {
    method: "POST",
    auth: false,
    body: { email, otp },
  });
export const resetPassword = (
  email: string,
  token: string,
  newPassword: string,
  confirmPassword: string,
) =>
  rawRequest<{ reset: true }>("/auth/password/reset", {
    method: "POST",
    auth: false,
    body: { email, token, newPassword, confirmPassword },
  });

function normalizeList<T>(value: T[] | { items?: T[]; data?: T[] }) {
  return Array.isArray(value) ? value : (value.items ?? value.data ?? []);
}

function normalizePaginationMeta(
  meta: unknown,
  itemCount: number,
  params: Record<string, string | number | undefined> = {},
): PaginationMeta {
  const source = meta && typeof meta === "object" ? (meta as Partial<PaginationMeta>) : {};
  const page = Number(source.page ?? params["page"] ?? 1);
  const limit = Number(source.limit ?? params["limit"] ?? itemCount);
  const total = Number(source.total ?? itemCount);
  const totalPages = Number(source.totalPages ?? Math.ceil(total / Math.max(limit, 1)));
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : itemCount;
  const safeTotal = Number.isFinite(total) && total >= 0 ? total : itemCount;
  const safeTotalPages =
    Number.isFinite(totalPages) && totalPages >= 0
      ? totalPages
      : Math.ceil(safeTotal / Math.max(safeLimit, 1));

  return {
    page: safePage,
    limit: safeLimit,
    total: safeTotal,
    totalPages: safeTotalPages,
    hasNext: source.hasNext ?? safePage < safeTotalPages,
    hasPrev: source.hasPrev ?? safePage > 1,
  };
}

function normalizePaginatedList<T>(
  value: T[] | { items?: T[]; data?: T[]; meta?: unknown },
  envelopeMeta: unknown,
  params: Record<string, string | number | undefined> = {},
): PaginatedResult<T> {
  const items = normalizeList(value);
  const nestedMeta = !Array.isArray(value) ? value.meta : undefined;
  return {
    items,
    meta: normalizePaginationMeta(envelopeMeta ?? nestedMeta, items.length, params),
  };
}

export async function listProducts(
  params: Record<string, string | number | undefined> = {},
  signal?: AbortSignal,
) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(
    ([key, value]) => value !== undefined && value !== "" && query.set(key, String(value)),
  );
  const result = await rawRequest<
    PublicProductResponse[] | { items?: PublicProductResponse[]; data?: PublicProductResponse[] }
  >(`/products${query.size ? `?${query}` : ""}`, {
    auth: false,
    ...(signal ? { signal } : {}),
  });
  return normalizeList(result);
}

export async function listProductsByIds(ids: string[], signal?: AbortSignal) {
  if (!ids.length) return [];
  const result = await rawRequest<
    PublicProductResponse[] | { items?: PublicProductResponse[]; data?: PublicProductResponse[] }
  >(`/products/by-ids?ids=${encodeURIComponent(ids.slice(0, 24).join(","))}`, {
    auth: false,
    ...(signal ? { signal } : {}),
  });
  return normalizeList(result);
}

export async function listProductsPage(
  params: Record<string, string | number | undefined> = {},
  signal?: AbortSignal,
) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(
    ([key, value]) => value !== undefined && value !== "" && query.set(key, String(value)),
  );
  const result = await rawEnvelope<
    | PublicProductResponse[]
    | { items?: PublicProductResponse[]; data?: PublicProductResponse[]; meta?: unknown }
  >(`/products${query.size ? `?${query}` : ""}`, {
    auth: false,
    ...(signal ? { signal } : {}),
  });
  return normalizePaginatedList(result.data, result.meta, params);
}

export async function getProductFacets(
  params: Record<string, string | number | undefined> = {},
  signal?: AbortSignal,
) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(
    ([key, value]) => value !== undefined && value !== "" && query.set(key, String(value)),
  );
  return rawRequest<CatalogFacetResponse>(`/products/facets${query.size ? `?${query}` : ""}`, {
    auth: false,
    ...(signal ? { signal } : {}),
  });
}

export async function listMerchandisingProducts(
  params: {
    section: string;
    limit?: number;
    categorySlug?: string;
    excludeProductId?: string;
  },
  signal?: AbortSignal,
) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(
    ([key, value]) => value !== undefined && value !== "" && query.set(key, String(value)),
  );
  const result = await rawRequest<
    PublicProductResponse[] | { items?: PublicProductResponse[]; data?: PublicProductResponse[] }
  >(`/products/merchandising?${query}`, {
    auth: false,
    ...(signal ? { signal } : {}),
  });
  return normalizeList(result);
}

export async function getProduct(slug: string) {
  return rawRequest<PublicProductResponse>(`/products/${encodeURIComponent(slug)}`, {
    auth: false,
  });
}

export async function listCategories() {
  const result = await rawRequest<
    PublicCategoryResponse[] | { items?: PublicCategoryResponse[]; data?: PublicCategoryResponse[] }
  >("/categories?limit=100", { auth: false });
  return normalizeList(result);
}

export async function listCategoriesPage(params: Record<string, string | number | undefined> = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(
    ([key, value]) => value !== undefined && value !== "" && query.set(key, String(value)),
  );
  const result = await rawEnvelope<
    | PublicCategoryResponse[]
    | { items?: PublicCategoryResponse[]; data?: PublicCategoryResponse[]; meta?: unknown }
  >(`/categories${query.size ? `?${query}` : ""}`, { auth: false });
  return normalizePaginatedList(result.data, result.meta, params);
}

export async function listBrands() {
  const result = await rawRequest<
    | PublicBrandListItemResponse[]
    | { items?: PublicBrandListItemResponse[]; data?: PublicBrandListItemResponse[] }
  >("/brands?limit=100&sortBy=name&sortOrder=asc", { auth: false });
  return normalizeList(result);
}

export async function listBrandsPage(
  params: Record<string, string | number | undefined> = {},
  signal?: AbortSignal,
) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(
    ([key, value]) => value !== undefined && value !== "" && query.set(key, String(value)),
  );
  const result = await rawEnvelope<
    | PublicBrandListItemResponse[]
    | {
        items?: PublicBrandListItemResponse[];
        data?: PublicBrandListItemResponse[];
        meta?: unknown;
      }
  >(`/brands${query.size ? `?${query}` : ""}`, {
    auth: false,
    ...(signal ? { signal } : {}),
  });
  return normalizePaginatedList(result.data, result.meta, params);
}

export async function listAllBrands(signal?: AbortSignal) {
  const brands = new Map<string, PublicBrandListItemResponse>();
  let page = 1;
  let totalPages = 1;

  do {
    const result = await listBrandsPage(
      { page, limit: 100, sortBy: "name", sortOrder: "asc" },
      signal,
    );
    result.items.forEach((brand) => brands.set(brand.id, brand));
    totalPages = Math.max(result.meta.totalPages, 1);
    page += 1;
  } while (page <= totalPages);

  return Array.from(brands.values());
}

export const subscribeNewsletter = (email: string, locale: "en" | "ar") =>
  rawRequest<{ subscribed: true }>("/store/newsletter/subscriptions", {
    method: "POST",
    auth: false,
    body: { email, locale, consent: true },
  });

export const createSupportRequest = (
  body: {
    name: string;
    email: string;
    orderNumber?: string;
    subject: string;
    message: string;
    locale: "en" | "ar";
  },
  attachment?: File,
) => {
  const form = new FormData();
  form.set("name", body.name);
  form.set("email", body.email);
  if (body.orderNumber) form.set("orderNumber", body.orderNumber);
  form.set("subject", body.subject);
  form.set("message", body.message);
  form.set("locale", body.locale);
  if (attachment) form.set("attachment", attachment);
  return rawRequest<{ id: string; status: string; createdAt: string }>("/store/support/requests", {
    method: "POST",
    auth: false,
    body: form,
  });
};

function summarizeReviews(items: ProductReview[]) {
  const distribution: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
  let totalRating = 0;
  for (const review of items) {
    totalRating += review.rating;
    const key = String(review.rating);
    distribution[key] = (distribution[key] ?? 0) + 1;
  }
  return {
    average: items.length ? totalRating / items.length : 0,
    count: items.length,
    distribution,
  };
}

export function normalizeProductReviews(
  payload:
    | ProductReview[]
    | {
        data?: ProductReview[];
        items?: ProductReview[];
        summary?: ProductReviews["summary"];
        meta?: ProductReviews["meta"];
      },
): ProductReviews {
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload.items)
      ? payload.items
      : Array.isArray(payload.data)
        ? payload.data
        : [];
  const summary =
    !Array.isArray(payload) && payload.summary ? payload.summary : summarizeReviews(items);
  const meta =
    !Array.isArray(payload) && payload.meta
      ? payload.meta
      : { page: 1, totalPages: items.length ? 1 : 0, total: items.length };
  return { items, summary, meta };
}

export async function listProductReviews(productId: string) {
  const payload = await rawRequest<
    | ProductReview[]
    | {
        data?: ProductReview[];
        items?: ProductReview[];
        summary?: ProductReviews["summary"];
        meta?: ProductReviews["meta"];
      }
  >(`/products/${productId}/reviews?limit=50`, { auth: false });
  return normalizeProductReviews(payload);
}

export const createProductReview = (
  productId: string,
  body: { rating: number; title?: string; body?: string },
) => rawRequest<ProductReview>(`/products/${productId}/reviews`, { method: "POST", body });

export const getReviewEligibility = (productId: string) =>
  rawRequest<ReviewEligibilityResponse>(`/reviews/eligibility/${productId}`);
export async function listMyReviews(): Promise<CustomerReviewLibraryResponse> {
  try {
    return await rawRequest<CustomerReviewLibraryResponse>("/reviews/mine");
  } catch (error) {
    const problem = error as ApiError | undefined;
    if (problem?.statusCode === 404 || problem?.code === "NOT_FOUND") {
      return { items: [], total: 0 };
    }
    throw error;
  }
}

function normalizeWishlistResponse(payload: WishlistResponse): WishlistResponse {
  const items = Array.isArray(payload.items) ? payload.items.filter((item) => item.product) : [];
  const collections = Array.isArray(payload.collections)
    ? payload.collections.map((collection) => {
        const collectionItems = Array.isArray(collection.items)
          ? collection.items.filter((item) => item.product)
          : [];
        return {
          ...collection,
          items: collectionItems,
          totalItems: collection.totalItems ?? collectionItems.length,
        };
      })
    : [];
  const uniqueItems = items.length
    ? items
    : collections
        .flatMap((collection) => collection.items)
        .filter(
          (item, index, all) =>
            all.findIndex((candidate) => candidate.productId === item.productId) === index,
        );

  if (collections.length) {
    return {
      ...payload,
      collections,
      items: uniqueItems,
      totalItems: payload.totalItems ?? uniqueItems.length,
      updatedAt: payload.updatedAt ?? null,
    };
  }

  const firstItem = uniqueItems[0];
  if (!firstItem) {
    return {
      collections: [],
      items: [],
      totalItems: payload.totalItems ?? 0,
      updatedAt: payload.updatedAt ?? null,
    };
  }

  const timestamp = firstItem.addedAt;
  return {
    collections: [
      {
        id: firstItem.collectionId,
        name: "Saved products",
        isPrivate: true,
        isDefault: true,
        shareToken: null,
        items: uniqueItems,
        totalItems: uniqueItems.length,
        createdAt: timestamp,
        updatedAt: payload.updatedAt ?? timestamp,
      },
    ],
    items: uniqueItems,
    totalItems: payload.totalItems ?? uniqueItems.length,
    updatedAt: payload.updatedAt ?? timestamp,
  };
}

export const updateMyReview = (
  reviewId: string,
  body: { rating?: number; title?: string; body?: string },
) => rawRequest<ProductReview>(`/reviews/mine/${reviewId}`, { method: "PATCH", body });

export const getCart = () => rawRequest<CommerceCartResponse>("/cart");
export const mergeGuestCart = () =>
  rawRequest<CommerceCartResponse>("/cart/merge", { method: "POST", body: {} });
export const addCartItem = (variantId: string, quantity: number) =>
  rawRequest<CommerceCartResponse>("/cart/items", {
    method: "POST",
    body: { variantId, quantity },
  });
export const updateCartItem = (variantId: string, quantity: number) =>
  rawRequest<CommerceCartResponse>(`/cart/items/${variantId}`, {
    method: "PATCH",
    body: { quantity },
  });
export const removeCartItem = (variantId: string) =>
  rawRequest<CommerceCartResponse>(`/cart/items/${variantId}`, { method: "DELETE" });
export const breakCartBundle = (instanceId: string) =>
  rawRequest<CommerceCartResponse>(`/cart/bundles/${instanceId}/break`, {
    method: "POST",
    body: {},
    headers: { "Idempotency-Key": randomUuid() },
  });
export const removeCartBundle = (instanceId: string) =>
  rawRequest<CommerceCartResponse>(`/cart/bundles/${instanceId}`, {
    method: "DELETE",
    headers: { "Idempotency-Key": randomUuid() },
  });
export const saveCartItemForLater = (variantId: string) =>
  rawRequest<CommerceCartResponse>(`/cart/items/${variantId}/save-for-later`, {
    method: "POST",
    body: {},
    headers: { "Idempotency-Key": randomUuid() },
  });
export const moveSavedItemToCart = (itemId: string) =>
  rawRequest<CommerceCartResponse>(`/cart/saved-for-later/${itemId}/move-to-cart`, {
    method: "POST",
    body: {},
    headers: { "Idempotency-Key": randomUuid() },
  });
export const removeSavedForLaterItem = (itemId: string) =>
  rawRequest<CommerceCartResponse>(`/cart/saved-for-later/${itemId}`, {
    method: "DELETE",
    headers: { "Idempotency-Key": randomUuid() },
  });
export const moveAvailableSavedItemsToCart = (itemIds?: string[]) =>
  rawRequest<BulkMoveSavedResponse>("/cart/saved-for-later/move-to-cart", {
    method: "POST",
    body: itemIds ? { itemIds } : {},
    headers: { "Idempotency-Key": randomUuid() },
  });
export const clearCartRequest = () =>
  rawRequest<CommerceCartResponse>("/cart", { method: "DELETE" });
export const applyCartCoupon = (code: string) =>
  rawRequest<CommerceCartResponse>("/cart/coupon", { method: "POST", body: { code } });
export const removeCartCoupon = () =>
  rawRequest<CommerceCartResponse>("/cart/coupon", { method: "DELETE" });

export type RoutinePublicQuestion = {
  id: string;
  key: string;
  type:
    | "SINGLE_CHOICE"
    | "MULTIPLE_CHOICE"
    | "RANKED_CHOICE"
    | "YES_NO"
    | "SCALE"
    | "OPTIONAL_TEXT"
    | "NUMERIC_RANGE"
    | "PRODUCT_SELECTION"
    | "INGREDIENT_PREFERENCE";
  label: { en: string; ar: string };
  description: { en: string; ar: string };
  helpText: { en: string; ar: string };
  required: boolean;
  enabled: boolean;
  order: number;
  visibility: {
    mode: "ALL" | "ANY";
    conditions: Array<{
      id: string;
      questionKey: string;
      operator: string;
      value: string | number | boolean | string[];
    }>;
  } | null;
  answers: Array<{
    id: string;
    key: string;
    label: { en: string; ar: string };
    description: { en: string; ar: string };
    order: number;
    enabled: boolean;
  }>;
  minSelections: number;
  maxSelections: number;
  scale: { min: number; max: number; step: number } | null;
};
export type RoutinePublicConfig = {
  versionId: string;
  version: number;
  publishedAt: string;
  sessionId?: string;
  anchor?: RoutineAnchor | null;
  suggestedAnswers?: Record<string, string | number | boolean | string[]>;
  profileAvailable?: boolean;
  config: {
    schemaVersion: number;
    title: { en: string; ar: string };
    introduction: { en: string; ar: string };
    estimatedMinutes: number;
    startLabel: { en: string; ar: string };
    resultTitle: { en: string; ar: string };
    disclaimer: { en: string; ar: string };
    noResult: { en: string; ar: string };
    contextualCompletion?: {
      enabled: boolean;
      title: { en: string; ar: string };
      introduction: { en: string; ar: string };
      unavailableMessage: { en: string; ar: string };
    };
    questions: RoutinePublicQuestion[];
    concerns: Array<{ id: string; key: string; label: { en: string; ar: string } }>;
    roles: Array<{ id: string; key: string; label: { en: string; ar: string } }>;
  };
};
export type RoutineAnchor = {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  variantName: string;
  imageUrl: string | null;
  price: number;
  stock: number;
  domain: string;
  roles: string[];
  primaryRole: string | null;
  periods: Array<"AM" | "PM">;
  alreadyOwned: boolean;
};
export type RoutineAnchorEligibility = {
  eligible: boolean;
  reasonCode: string | null;
  message: string | null;
  anchor: RoutineAnchor | null;
  version: number;
};
export type RoutineRecommendationProduct = {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  variantName: string;
  imageUrl: string | null;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  brandName: string | null;
  explanation: string;
};
export type RoutineRecommendationStep = {
  id: string;
  roleKey: string;
  roleLabel: string;
  period: "AM" | "PM";
  order: number;
  required: boolean;
  isAnchor: boolean;
  alreadyOwned: boolean;
  product: RoutineRecommendationProduct;
  alternatives: RoutineRecommendationProduct[];
  warnings: string[];
};
export type RoutineOwnedStep = {
  id: string;
  roleKey: string;
  roleLabel: string;
  period: "AM" | "PM";
  order: number;
};
export type RoutineResult = {
  sessionId: string;
  version: number;
  mode: "FULL" | "CONTEXTUAL";
  anchor:
    | (RoutineRecommendationProduct & {
        roleKey: string;
        periods: Array<"AM" | "PM">;
        alreadyOwned: boolean;
        available: boolean;
      })
    | null;
  anchorAlternatives: RoutineRecommendationProduct[];
  templateKey: string | null;
  templateIdentity: {
    id: string;
    key: string;
    version: number;
    familyKey: string | null;
    name: string;
    description: string;
    variant: { kind: string; parameters: Record<string, string | number | boolean> };
    inheritanceChain: string[];
    presentation: {
      style: string;
      estimatedMinutes: number | null;
      thumbnailKey: string | null;
      themeKey: string | null;
      intro: { en: string; ar: string };
      outro: { en: string; ar: string };
      customerVisible: boolean;
    };
  } | null;
  answers: Record<string, string | number | boolean | string[]>;
  profileSummary: string[];
  ownedSteps: RoutineOwnedStep[];
  morningSteps: RoutineRecommendationStep[];
  eveningSteps: RoutineRecommendationStep[];
  warnings: string[];
  noResult: boolean;
  noResultMessage: string | null;
  total: number;
  budgetMax: number | null;
  budgetExceeded: boolean;
  recommendationsChanged: boolean;
  changedStepIds: string[];
};
export const getRoutineBuilder = (mode: "FULL" | "CONTEXTUAL" = "FULL") =>
  rawRequest<RoutinePublicConfig>(`/routine-builder?mode=${mode}`);
export const getRoutineAnchorEligibility = (
  productId: string,
  variantId: string | undefined,
  locale: "en" | "ar",
) => {
  const query = new URLSearchParams({ locale });
  if (variantId) query.set("variantId", variantId);
  return rawRequest<RoutineAnchorEligibility>(`/routine-builder/anchors/${productId}?${query}`);
};
export const startRoutineSession = (
  locale: "en" | "ar",
  mode: "FULL" | "CONTEXTUAL" = "FULL",
  anchor: { productId: string; variantId?: string; alreadyOwned: boolean } | null = null,
  contextConcernId: string | null = null,
) =>
  rawRequest<RoutinePublicConfig>("/routine-builder/sessions", {
    method: "POST",
    body: { locale, mode, anchor, contextConcernId },
  });
export const evaluateRoutine = (input: {
  sessionId?: string;
  answers: Record<string, string | number | boolean | string[]>;
  locale: "en" | "ar";
  mode?: "FULL" | "CONTEXTUAL";
  anchor?: { productId: string; variantId?: string; alreadyOwned: boolean } | null;
  selectedVariants?: Record<string, string>;
}) =>
  rawRequest<RoutineResult>("/routine-builder/evaluate", {
    method: "POST",
    body: {
      ...input,
      mode: input.mode ?? "FULL",
      anchor: input.anchor ?? null,
      selectedVariants: input.selectedVariants ?? {},
      includeDiagnostics: false,
    },
  });
export const recordRoutineEvent = (
  sessionId: string,
  input: {
    type:
      | "QUESTION_ANSWERED"
      | "BUILDER_ABANDONED"
      | "ROUTINE_GENERATED"
      | "PRODUCT_SWAPPED"
      | "ROUTINE_ADD_TO_CART"
      | "ROUTINE_PRODUCT_ADD_TO_CART"
      | "COMPLETE_ROUTINE_CTA_CLICKED"
      | "CONTEXTUAL_FLOW_STARTED"
      | "CONTEXTUAL_FLOW_COMPLETED"
      | "ROUTINE_ALTERNATIVE_OPENED"
      | "ROUTINE_ALTERNATIVE_SELECTED";
    questionKey?: string;
    productId?: string;
  },
) =>
  rawRequest(`/routine-builder/sessions/${sessionId}/events`, {
    method: "POST",
    body: input,
  });
export const addRoutineSelectionToCart = (
  sessionId: string,
  selections: Array<{ stepId: string; variantId: string }>,
) =>
  rawRequest<{ cart: CommerceCartResponse; routine: RoutineResult; addedVariantIds: string[] }>(
    `/routine-builder/sessions/${sessionId}/cart`,
    { method: "POST", body: { selections } },
  );
export const getPromotionPrices = (
  lines: Array<{
    variantId: string;
    productId: string;
    categoryId: string;
    categoryIds: string[];
    brandId: string | null;
    name: string;
    unitPrice: number;
    quantity: number;
  }>,
) =>
  rawRequest<PromotionPrice[]>("/promotions/prices", {
    method: "POST",
    auth: false,
    body: { lines },
  });
export const listHeroOffers = () =>
  rawRequest<StorefrontOffer[]>("/promotions/hero-offers", { auth: false });

export const listOffers = () =>
  rawRequest<StorefrontOffer[]>("/promotions/offers", { auth: false });

export async function getWishlist(): Promise<WishlistResponse> {
  return normalizeWishlistResponse(await rawRequest<WishlistResponse>("/wishlist"));
}
export const addWishlist = (productId: string) =>
  rawRequest<WishlistResponse>("/wishlist/items", { method: "POST", body: { productId } }).then(
    normalizeWishlistResponse,
  );
export const removeWishlist = (productId: string) =>
  rawRequest<WishlistResponse>(`/wishlist/items/${productId}`, { method: "DELETE" }).then(
    normalizeWishlistResponse,
  );
export const createWishlistCollection = (body: { name: string; isPrivate: boolean }) =>
  rawRequest<WishlistResponse>("/wishlist/collections", { method: "POST", body }).then(
    normalizeWishlistResponse,
  );
export const updateWishlistCollection = (
  collectionId: string,
  body: { name?: string; isPrivate?: boolean },
) =>
  rawRequest<WishlistResponse>(`/wishlist/collections/${collectionId}`, {
    method: "PATCH",
    body,
  }).then(normalizeWishlistResponse);
export const deleteWishlistCollection = (collectionId: string) =>
  rawRequest<WishlistResponse>(`/wishlist/collections/${collectionId}`, { method: "DELETE" }).then(
    normalizeWishlistResponse,
  );
export const addWishlistToCollection = (collectionId: string, productId: string) =>
  rawRequest<WishlistResponse>(`/wishlist/collections/${collectionId}/items`, {
    method: "POST",
    body: { productId },
  }).then(normalizeWishlistResponse);
export const removeWishlistFromCollection = (collectionId: string, productId: string) =>
  rawRequest<WishlistResponse>(`/wishlist/collections/${collectionId}/items/${productId}`, {
    method: "DELETE",
  }).then(normalizeWishlistResponse);
export const getWishlistShareToken = (collectionId: string) =>
  rawRequest<{ shareToken: string }>(`/wishlist/collections/${collectionId}/share`);
export const getSharedWishlist = (shareToken: string) =>
  rawRequest<SharedWishlistResponse>(`/shared-wishlists/${shareToken}`, { auth: false });

export const getProfile = () => rawRequest<UserProfileResponse>("/users/me");
export const requestPhoneChangeOtp = () =>
  rawRequest<{ maskedEmail: string; ttlSeconds: number }>("/users/me/phone-change/otp", {
    method: "POST",
    body: {},
  });
export const updateProfile = (body: Record<string, unknown>) =>
  rawRequest<UserProfileResponse>("/users/me", { method: "PATCH", body });
export function uploadProfileImage(file: File) {
  const body = new FormData();
  body.set("file", file);
  return rawRequest<UserProfileResponse>("/users/me/profile-image", {
    method: "POST",
    body,
  });
}
export const listAddresses = () => rawRequest<AddressResponse[]>("/users/addresses");
export const createAddress = (body: CreateAddressInput) =>
  rawRequest<AddressResponse>("/users/addresses", { method: "POST", body });
export const deleteAddress = (id: string) =>
  rawRequest(`/users/addresses/${id}`, { method: "DELETE" });
export const setDefaultAddress = (id: string) =>
  rawRequest<AddressResponse>(`/users/addresses/${id}/default`, { method: "PATCH" });

export async function listOrders() {
  const result = await rawRequest<
    | OrderSummaryApiResponse[]
    | {
        items?: OrderSummaryApiResponse[];
        data?: OrderSummaryApiResponse[];
      }
  >("/orders");
  return normalizeList(result).map((order): OrderSummary => ({
    ...order,
    grandTotal: order.grandTotal ?? order.total ?? 0,
    placedAt: order.placedAt ?? order.createdAt ?? new Date(0).toISOString(),
    discount: order.discount ?? 0,
    appliedPromotions: order.appliedPromotions ?? [],
  }));
}

export const getBuyAgain = (page = 1, limit = 24) =>
  rawRequest<BuyAgainResponse>(`/me/reorder/buy-again?page=${page}&limit=${limit}`);
export const getReorderOpportunities = () =>
  rawRequest<ReorderOpportunitiesResponse>("/me/reorder/opportunities");
export const getOrderReorderPreview = (orderId: string) =>
  rawRequest<OrderReorderPreview>(`/me/reorder/orders/${orderId}`);
export const addReorderItems = (
  items: Array<{ variantId: string; quantity: number }>,
  sessionId = randomUuid(),
) =>
  rawRequest<{ cart: CommerceCartResponse; sessionId: string }>("/me/reorder/cart", {
    method: "POST",
    headers: { "Idempotency-Key": `reorder-${sessionId}` },
    body: { items, sessionId },
  });
export const snoozeReorderItem = (variantId: string, days: number) =>
  rawRequest(`/me/reorder/items/${variantId}/snooze`, { method: "POST", body: { days } });
export const disableReorderItem = (variantId: string) =>
  rawRequest(`/me/reorder/items/${variantId}/disable`, { method: "POST", body: {} });
export const restoreReorderItem = (variantId: string) =>
  rawRequest(`/me/reorder/items/${variantId}/restore`, { method: "POST", body: {} });
export const updateReorderPreference = (smartEnabled: boolean, expectedVersion?: number) =>
  rawRequest<{ smartEnabled: boolean; version: number }>("/me/reorder/preferences", {
    method: "PATCH",
    body: { smartEnabled, expectedVersion },
  });
export const recordReorderEvent = (body: {
  eventKey: string;
  eventType: string;
  productId?: string | null;
  variantId?: string | null;
  orderId?: string | null;
  sessionId?: string | null;
}) => rawRequest("/me/reorder/events", { method: "POST", body });

export const listShippingCities = () => rawRequest<ShippingCity[]>("/shipping/cities");
export const listShippingGovernorates = () =>
  rawRequest<ShippingGovernorate[]>("/shipping/locations/governorates");
export const listShippingCitiesByGovernorate = (governorateId: string) =>
  rawRequest<ShippingCity[]>(
    `/shipping/locations/cities?governorate=${encodeURIComponent(governorateId)}`,
  );
export const listShippingAreas = (cityId: string) =>
  rawRequest<ShippingArea[]>(`/shipping/locations/areas?city=${encodeURIComponent(cityId)}`);
export const getShippingRate = (addressId: string) =>
  rawRequest<ShippingRate>(`/shipping/rates?addressId=${encodeURIComponent(addressId)}`);
export const getCheckoutPreview = (shippingAddressId: string, paymentMethod: string) =>
  rawRequest<CheckoutPreviewResponse>("/orders/checkout/preview", {
    method: "POST",
    body: { shippingAddressId, paymentMethod },
  });
export const getOrderTracking = (orderId: string) =>
  rawRequest<OrderTracking>(`/orders/${orderId}/tracking`);
export const refreshOrderTracking = (orderId: string) =>
  rawRequest<OrderTracking>(`/orders/${orderId}/tracking/refresh`, { method: "POST" });

export const listPaymentInstructions = () =>
  rawRequest<PaymentInstruction[]>("/payments/instructions");
export const checkout = (
  shippingAddressId: string,
  paymentMethod: string,
  notes?: string,
  giftVariantIds: string[] = [],
  idempotencyKey: string = randomUuid(),
) =>
  rawRequest<CheckoutResult>("/orders/checkout", {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey },
    body: { shippingAddressId, paymentMethod, giftVariantIds, ...(notes ? { notes } : {}) },
  });
export const createPayment = (
  orderId: string,
  method: string,
  idempotencyKey: string = randomUuid(),
) =>
  rawRequest<Payment>("/payments", {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey },
    body: { orderId, method },
  });
export function uploadPaymentProof(
  paymentId: string,
  file: File,
  senderRef: string,
  txnReference: string,
  amountClaimed: number,
) {
  const body = new FormData();
  body.set("file", file);
  body.set("senderRef", senderRef);
  body.set("txnReference", txnReference);
  body.set("amountClaimed", String(amountClaimed));
  return rawRequest<Payment>(`/payments/${paymentId}/proof/file`, {
    method: "POST",
    headers: { "Idempotency-Key": randomUuid() },
    body,
  });
}
