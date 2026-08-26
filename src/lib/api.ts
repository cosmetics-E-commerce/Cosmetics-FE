import type {
  AuthSession,
  AuthUser,
  CartResponse,
  CatalogFacetResponse,
  AddressResponse as ContractAddressResponse,
  CreateAddressInput as ContractCreateAddressInput,
  PublicBrandListItemResponse,
  PublicCategoryResponse,
  PublicProductResponse,
  NavigationPublicSnapshot,
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
} from "../../vendor/cosmetics-contracts/index.js";
import { randomUuid } from "@/lib/uuid";

export type {
  AuthSession,
  AuthUser,
  CartResponse,
  CatalogFacetResponse,
  PublicBrandListItemResponse,
  PublicCategoryResponse,
  PublicProductResponse,
  NavigationPublicSnapshot,
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
};

export async function getPublishedNavigation(signal?: AbortSignal) {
  return rawRequest<NavigationPublicSnapshot>("/navigation", {
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
  badgeText: string | null;
  startsAt: string | null;
  endsAt: string | null;
  showCountdown: boolean;
  featured: boolean;
  productIds: string[];
  categoryIds: string[];
  brandIds: string[];
};

export type ApiError = {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
};

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
    throw {
      statusCode: 0,
      code: "NETWORK_ERROR",
      message: "The store could not reach the server. Check your connection and try again.",
    } satisfies ApiError;
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

  const payload = (await response.json().catch(() => null)) as Envelope<T> | ApiError | null;
  if (!response.ok) {
    const problem = payload as ApiError | null;
    throw {
      statusCode: response.status,
      code: problem?.code ?? "REQUEST_FAILED",
      message: problem?.message ?? "The request could not be completed.",
      details: problem?.details,
    } satisfies ApiError;
  }
  return payload as Envelope<T>;
}

export async function rawRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return (await rawEnvelope<T>(path, options)).data;
}

export function apiErrorMessage(error: unknown, locale: "en" | "ar" = "en") {
  const problem = error as ApiError | undefined;
  const arabic = locale === "ar";
  const messages: Record<string, [string, string]> = {
    NETWORK_ERROR: [
      "We could not reach the store. Check your connection and try again.",
      "تعذر الاتصال بالمتجر. تحققي من اتصال الإنترنت وحاولي مرة أخرى.",
    ],
    UNAUTHENTICATED: [
      "Your session has expired. Sign in again to continue.",
      "انتهت جلستك. سجّلي الدخول مرة أخرى للمتابعة.",
    ],
    CART_VARIANT_NOT_SELLABLE: [
      "This product is currently unavailable.",
      "هذا المنتج غير متاح حالياً.",
    ],
    CART_INSUFFICIENT_STOCK: [
      "There is not enough stock for that quantity. Your bag has been refreshed.",
      "الكمية المطلوبة غير متاحة. تم تحديث حقيبتك بأحدث كمية.",
    ],
    CHECKOUT_CART_EMPTY: ["Your bag is empty.", "حقيبتك فارغة."],
    CHECKOUT_CART_HAS_ISSUES: [
      "Some items changed while you were shopping. Review your bag before continuing.",
      "تغيّرت بعض المنتجات أثناء التسوق. راجعي حقيبتك قبل المتابعة.",
    ],
    SHIPPING_ADDRESS_NOT_FOUND: [
      "That delivery address is no longer available. Choose or add another address.",
      "عنوان التوصيل هذا لم يعد متاحاً. اختاري عنواناً آخر أو أضيفي عنواناً جديداً.",
    ],
    SHIPPING_ZONE_UNAVAILABLE: [
      "Delivery is not available to this area yet. Choose another address or contact support.",
      "التوصيل غير متاح لهذه المنطقة حالياً. اختاري عنواناً آخر أو تواصلي مع الدعم.",
    ],
    INVALID_SHIPPING_ZONE: [
      "Delivery is not available for this governorate. Choose a supported delivery governorate.",
      "التوصيل غير متاح لهذه المحافظة. اختاري محافظة مدعومة للتوصيل.",
    ],
    INVALID_SHIPPING_LOCATION: [
      "Choose governorate, city and area from the delivery lists.",
      "اختاري المحافظة والمدينة والمنطقة من قوائم التوصيل.",
    ],
    INVALID_CITY: [
      "Choose a delivery city that belongs to the selected governorate.",
      "اختاري مدينة توصيل تابعة للمحافظة المحددة.",
    ],
    SHIPPING_ADDRESS_MISSING_CARRIER_CITY: [
      "Choose the delivery city from the supported cities list, then try again.",
      "اختاري مدينة التوصيل من قائمة المدن المتاحة ثم حاولي مرة أخرى.",
    ],
    SHIPPING_ADDRESS_MISSING_CARRIER_ZONE: [
      "Choose the delivery area from the supported areas list, then try again.",
      "اختاري منطقة التوصيل من قائمة المناطق المتاحة ثم حاولي مرة أخرى.",
    ],
    SHIPPING_ADDRESS_REQUIRES_VERIFICATION: [
      "This address needs to be updated before checkout.",
      "هذا العنوان يحتاج إلى تحديث قبل إتمام الطلب.",
    ],
    SHIPPING_ADDRESS_NOT_OWNED: [
      "Choose one of your saved delivery addresses.",
      "اختاري أحد عناوين التوصيل المحفوظة لديك.",
    ],
    BOSTA_CITY_UNKNOWN: [
      "Delivery is currently unavailable for this city.",
      "التوصيل غير متاح لهذه المدينة حالياً.",
    ],
    BOSTA_PICKUP_CITY_UNKNOWN: [
      "The store pickup city is not configured correctly. Please contact support.",
      "مدينة استلام المتجر غير مضبوطة بشكل صحيح. تواصلي مع الدعم.",
    ],
    BOSTA_TIMEOUT: [
      "Shipping rates took too long to respond. Please try again.",
      "استغرق حساب الشحن وقتاً أطول من المتوقع. حاولي مرة أخرى.",
    ],
    BOSTA_UNAUTHORIZED: [
      "Shipping is temporarily unavailable. Please contact support.",
      "الشحن غير متاح مؤقتاً. تواصلي مع الدعم.",
    ],
    BOSTA_UNAVAILABLE: [
      "Shipping is temporarily unavailable. Please try again shortly.",
      "الشحن غير متاح مؤقتاً. حاولي مرة أخرى بعد قليل.",
    ],
    BOSTA_API_KEY_MISSING: [
      "Shipping is not configured yet. Please contact support.",
      "إعدادات الشحن لم تكتمل بعد. تواصلي مع الدعم.",
    ],
    SHIPPING_CART_EMPTY: [
      "Add at least one item to your bag before requesting delivery.",
      "أضيفي منتجاً واحداً على الأقل قبل حساب التوصيل.",
    ],
    SHIPPING_PROVIDER_UNAVAILABLE: [
      "Shipping rates are temporarily unavailable. Please try again shortly.",
      "أسعار الشحن غير متاحة مؤقتاً. حاولي مرة أخرى بعد قليل.",
    ],
    SHIPPING_PROVIDER_INVALID_RESPONSE: [
      "Shipping rates are temporarily unavailable for this address.",
      "أسعار الشحن غير متاحة مؤقتاً لهذا العنوان.",
    ],
    PAYMENT_METHOD_NOT_AVAILABLE: [
      "That payment method is temporarily unavailable. Choose another method.",
      "طريقة الدفع هذه غير متاحة مؤقتاً. اختاري طريقة أخرى.",
    ],
    COUPON_NOT_APPLICABLE: [
      "This code does not apply to the items in your bag.",
      "هذا الرمز لا ينطبق على المنتجات في حقيبتك.",
    ],
    PROMOTION_COUPON_INVALID: [
      "This promo code is invalid or has expired.",
      "رمز الخصم غير صالح أو انتهت صلاحيته.",
    ],
    PROMOTION_GIFT_SELECTION_REQUIRED: [
      "Choose your complimentary gift before placing the order.",
      "اختاري هديتك المجانية قبل تأكيد الطلب.",
    ],
    REQUEST_IN_PROGRESS: [
      "This request is already being processed. Please wait a moment.",
      "طلبك قيد التنفيذ بالفعل. انتظري لحظة من فضلك.",
    ],
  };
  const mapped = problem?.code ? messages[problem.code] : undefined;
  if (mapped) return mapped[arabic ? 1 : 0];
  if ((problem?.statusCode ?? 0) >= 500) {
    return arabic
      ? "حدث عطل مؤقت في المتجر. لم نفقد بياناتك—حاولي مرة أخرى."
      : "The store hit a temporary problem. Your work is still here—try again.";
  }
  return (
    problem?.message ??
    (arabic
      ? "تعذر إكمال الطلب. حاولي مرة أخرى."
      : "The request could not be completed. Try again.")
  );
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
  try {
    await rawRequest("/auth/logout", {
      method: "POST",
      retry: false,
      body: {},
      headers: csrf ? { "X-CSRF-Token": csrf } : {},
    });
  } finally {
    clearSession();
  }
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
export const clearCartRequest = () =>
  rawRequest<CommerceCartResponse>("/cart", { method: "DELETE" });
export const applyCartCoupon = (code: string) =>
  rawRequest<CommerceCartResponse>("/cart/coupon", { method: "POST", body: { code } });
export const removeCartCoupon = () =>
  rawRequest<CommerceCartResponse>("/cart/coupon", { method: "DELETE" });
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
  }));
}

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
