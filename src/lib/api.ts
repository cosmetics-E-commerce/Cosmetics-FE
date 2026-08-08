import type {
  AddressResponse,
  AuthSession,
  AuthUser,
  CartResponse,
  CreateAddressInput,
  PublicCategoryResponse,
  PublicProductResponse,
  UserProfileResponse,
  WishlistResponse,
} from "../../vendor/cosmetics-contracts/index.js";

export type {
  AddressResponse,
  AuthSession,
  AuthUser,
  CartResponse,
  PublicCategoryResponse,
  PublicProductResponse,
  UserProfileResponse,
  WishlistResponse,
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
  referenceNumber?: string | null;
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

const configuredApiBase = (
  import.meta.env["VITE_API_BASE_URL"] as string | undefined
)?.trim();
const browserApiHost =
  typeof window === "undefined" ? "localhost" : window.location.hostname;
const browserApiProtocol =
  typeof window === "undefined" ? "http:" : window.location.protocol;
const API_BASE = configuredApiBase
  ? configuredApiBase.replace(/\/+$/, "")
  : `${browserApiProtocol}//${browserApiHost}:3000/api/v1`;
const CSRF_KEY = "bioreza.csrf";
const CART_KEY = "bioreza.guest-cart";
let accessToken: string | null = null;
let refreshPromise: Promise<AuthSession> | null = null;

function browserValue(key: string) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
}

function setBrowserValue(key: string, value: string | null) {
  if (typeof window === "undefined") return;
  if (value) window.localStorage.setItem(key, value);
  else window.localStorage.removeItem(key);
}

export function rememberSession(session: AuthSession) {
  accessToken = session.tokens.accessToken;
  setBrowserValue(CSRF_KEY, session.csrfToken);
}

export function clearSession() {
  accessToken = null;
  setBrowserValue(CSRF_KEY, null);
}

export function hasRefreshSession() {
  return Boolean(browserValue(CSRF_KEY));
}

function guestCartId() {
  if (typeof window === "undefined") return "00000000-0000-4000-8000-000000000000";
  const saved = browserValue(CART_KEY);
  if (saved) return saved;
  const id = crypto.randomUUID();
  setBrowserValue(CART_KEY, id);
  return id;
}

export async function rawRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
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
  } catch {
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
    return rawRequest<T>(path, { ...options, retry: false });
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
  return (payload as Envelope<T>).data;
}

export function apiErrorMessage(error: unknown) {
  return (error as ApiError | undefined)?.message ?? "The request could not be completed.";
}

export function refreshSession() {
  if (!refreshPromise) {
    const csrf = browserValue(CSRF_KEY);
    refreshPromise = rawRequest<AuthSession>("/auth/refresh", {
      method: "POST",
      auth: false,
      retry: false,
      body: {},
      headers: csrf ? { "X-CSRF-Token": csrf } : {},
    })
      .then((session) => {
        rememberSession(session);
        return session;
      })
      .catch((error) => {
        clearSession();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
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

export async function register(body: Record<string, unknown>) {
  const result = await rawRequest<
    AuthSession | { email: string; ttlSeconds: number; verificationRequired: true }
  >("/auth/register", { method: "POST", auth: false, body });
  if ("tokens" in result) rememberSession(result);
  return result;
}

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

export const forgotPassword = (identifier: string, channel: "EMAIL" | "SMS") =>
  rawRequest<{ ttlSeconds: number }>("/auth/password/forgot", {
    method: "POST",
    auth: false,
    body: { identifier, channel },
  });
export const verifyResetOtp = (identifier: string, channel: "EMAIL" | "SMS", otp: string) =>
  rawRequest<{ token: string; expiresIn: number }>("/auth/password/verify-otp", {
    method: "POST",
    auth: false,
    body: { identifier, channel, otp },
  });
export const resetPassword = (
  identifier: string,
  token: string,
  newPassword: string,
  confirmPassword: string,
) =>
  rawRequest<{ reset: true }>("/auth/password/reset", {
    method: "POST",
    auth: false,
    body: { identifier, token, newPassword, confirmPassword },
  });

function normalizeList<T>(value: T[] | { items?: T[]; data?: T[] }) {
  return Array.isArray(value) ? value : (value.items ?? value.data ?? []);
}

export async function listProducts(params: Record<string, string | number | undefined> = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(
    ([key, value]) => value !== undefined && value !== "" && query.set(key, String(value)),
  );
  const result = await rawRequest<
    PublicProductResponse[] | { items?: PublicProductResponse[]; data?: PublicProductResponse[] }
  >(`/products${query.size ? `?${query}` : ""}`, { auth: false });
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

export const getCart = () => rawRequest<CommerceCartResponse>("/cart");
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

export const getWishlist = () => rawRequest<WishlistResponse>("/wishlist");
export const addWishlist = (productId: string) =>
  rawRequest<WishlistResponse>("/wishlist/items", { method: "POST", body: { productId } });
export const removeWishlist = (productId: string) =>
  rawRequest<WishlistResponse>(`/wishlist/items/${productId}`, { method: "DELETE" });

export const getProfile = () => rawRequest<UserProfileResponse>("/users/me");
export const updateProfile = (body: Record<string, unknown>) =>
  rawRequest<UserProfileResponse>("/users/me", { method: "PATCH", body });
export const listAddresses = () => rawRequest<AddressResponse[]>("/users/addresses");
export const createAddress = (body: CreateAddressInput) =>
  rawRequest<AddressResponse>("/users/addresses", { method: "POST", body });
export const deleteAddress = (id: string) =>
  rawRequest(`/users/addresses/${id}`, { method: "DELETE" });
export const setDefaultAddress = (id: string) =>
  rawRequest<AddressResponse>(`/users/addresses/${id}/default`, { method: "PATCH" });

export async function listOrders() {
  const result = await rawRequest<
    OrderSummaryApiResponse[] | {
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

export const listPaymentInstructions = () =>
  rawRequest<PaymentInstruction[]>("/payments/instructions");
export const checkout = (
  shippingAddressId: string,
  paymentMethod: string,
  notes?: string,
  giftVariantIds: string[] = [],
) =>
  rawRequest<CheckoutResult>("/orders/checkout", {
    method: "POST",
    headers: { "Idempotency-Key": crypto.randomUUID() },
    body: { shippingAddressId, paymentMethod, giftVariantIds, ...(notes ? { notes } : {}) },
  });
export const createPayment = (orderId: string, method: string) =>
  rawRequest<Payment>("/payments", {
    method: "POST",
    headers: { "Idempotency-Key": crypto.randomUUID() },
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
    headers: { "Idempotency-Key": crypto.randomUUID() },
    body,
  });
}
