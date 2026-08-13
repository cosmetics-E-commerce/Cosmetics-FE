import { useState, type CSSProperties, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clipboard,
  CreditCard,
  ExternalLink,
  Heart,
  Home,
  LoaderCircle,
  LogOut,
  MapPin,
  Package,
  PackageCheck,
  RefreshCw,
  Trash2,
  Truck,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddressForm } from "@/components/forms/AddressForm";
import { ReviewLibrary } from "@/components/account/ReviewLibrary";
import { WishlistStudio } from "@/components/account/WishlistStudio";
import {
  apiErrorMessage,
  createAddress,
  createPayment,
  deleteAddress,
  getOrderTracking,
  getProfile,
  getWishlist,
  listMyReviews,
  listAddresses,
  listOrders,
  refreshOrderTracking,
  requestPhoneChangeOtp,
  setDefaultAddress,
  updateProfile,
  uploadPaymentProof,
  type AddressResponse,
  type OrderSummary,
  type OrderTracking,
} from "@/lib/api";
import { formatPrice } from "@/lib/products";
import { mapProduct } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/motion/Primitives";
import { getOrderStatusCopy } from "@/lib/i18n";
export const Route = createFileRoute("/account")({
  validateSearch: (raw: Record<string, unknown>) => ({
    section:
      raw["section"] === "orders" ||
      raw["section"] === "wishlist" ||
      raw["section"] === "reviews" ||
      raw["section"] === "addresses" ||
      raw["section"] === "settings"
        ? raw["section"]
        : undefined,
  }),
  head: () => ({ meta: [{ title: "My account - BIOREZA" }] }),
  component: Account,
});
const tabs = [
  { label: { en: "Overview", ar: "نظرة عامة" }, value: "overview" },
  { label: { en: "Orders", ar: "الطلبات" }, value: "orders" },
  { label: { en: "Wishlist", ar: "المفضلة" }, value: "wishlist" },
  { label: { en: "Reviews", ar: "مراجعاتي" }, value: "reviews" },
  { label: { en: "Addresses", ar: "العناوين" }, value: "addresses" },
  { label: { en: "Settings", ar: "الإعدادات" }, value: "settings" },
] as const;
function Account() {
  const { user, authHydrated, signOut, wishlist, locale } = useStore();
  const navigate = useNavigate();
  const client = useQueryClient();
  const search = Route.useSearch();
  const tab = search.section ?? "overview";
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [expandedPaymentOrderId, setExpandedPaymentOrderId] = useState<string | null>(null);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<AddressResponse | null>(null);
  const [deletingAddress, setDeletingAddress] = useState(false);
  const [phoneOtpStage, setPhoneOtpStage] = useState<{
    phone: string;
    maskedEmail: string;
    ttlSeconds: number;
  } | null>(null);
  const [phoneOtp, setPhoneOtp] = useState("");
  const profile = useQuery({
    queryKey: ["account", "profile"],
    queryFn: getProfile,
    enabled: Boolean(user),
  });
  const addresses = useQuery({
    queryKey: ["account", "addresses"],
    queryFn: listAddresses,
    enabled: Boolean(user),
  });
  const orders = useQuery({
    queryKey: ["account", "orders"],
    queryFn: listOrders,
    enabled: Boolean(user),
  });
  const wishlistProducts = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: Boolean(user),
  });
  const myReviews = useQuery({
    queryKey: ["account", "reviews"],
    queryFn: listMyReviews,
    enabled: Boolean(user) && tab === "reviews",
  });
  const addressMutation = useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      toast("Address saved");
      void client.invalidateQueries({ queryKey: ["account", "addresses"] });
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast(locale === "ar" ? "تم تحديث الحساب" : "Profile updated");
      setPhoneOtpStage(null);
      setPhoneOtp("");
      void client.invalidateQueries({ queryKey: ["account", "profile"] });
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  const phoneOtpMutation = useMutation({
    mutationFn: requestPhoneChangeOtp,
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  if (!authHydrated)
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <LoaderCircle className="animate-spin text-gold" />
      </div>
    );
  if (!user)
    return (
      <main className="sf-account-page account-page account-page--guest">
        <section className="account-guest-card">
          <span className="account-profile-avatar account-profile-avatar--hero">
            <AccountGirlAvatar name="BIOREZA" />
          </span>
          <p className="account-eyebrow">Your BIOREZA account</p>
          <h1>Your private account</h1>
          <p>Sign in to view orders, addresses and saved products.</p>
          <Button asChild variant="solid" size="pill">
            <Link to="/sign-in" search={{ returnTo: undefined }}>
              Sign in
            </Link>
          </Button>
        </section>
      </main>
    );
  const name = profile.data
    ? `${profile.data.firstName} ${profile.data.lastName}`
    : `${user.firstName} ${user.lastName}`;
  const firstName = profile.data?.firstName || user.firstName;
  const currentPhone = profile.data?.phone ?? user.phone;
  const recentOrders = [...(orders.data ?? [])]
    .sort((left, right) => Date.parse(right.placedAt) - Date.parse(left.placedAt))
    .slice(0, 3);
  const defaultAddress =
    addresses.data?.find((address) => address.isDefault) ?? addresses.data?.[0] ?? null;
  const wishlistPreview = (wishlistProducts.data?.items ?? [])
    .slice(0, 3)
    .map((item) => mapProduct(item.product, locale));
  const wishlistCount = wishlistProducts.data?.totalItems ?? wishlist.length;
  const signOutCopy =
    locale === "ar"
      ? {
          trigger: "تسجيل الخروج",
          eyebrow: "أمان الحساب",
          title: "هل تريد تسجيل الخروج؟",
          description: "هل أنت متأكد من تسجيل الخروج؟ يمكنك تسجيل الدخول مرة أخرى في أي وقت.",
          cancel: "البقاء مسجلاً",
          confirm: "نعم، تسجيل الخروج",
          pending: "جارٍ تسجيل الخروج…",
        }
      : {
          trigger: "Sign out",
          eyebrow: "Account security",
          title: "Sign out of BIOREZA?",
          description: "Are you sure you want to sign out? You can sign back in at any time.",
          cancel: "Stay signed in",
          confirm: "Yes, sign out",
          pending: "Signing out…",
        };

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    try {
      await signOut();
      setSignOutOpen(false);
      await navigate({ to: "/" });
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleDeleteAddress = async () => {
    if (!addressToDelete || deletingAddress) return;
    setDeletingAddress(true);
    try {
      await deleteAddress(addressToDelete.id);
      await client.invalidateQueries({ queryKey: ["account", "addresses"] });
      setAddressToDelete(null);
      toast(locale === "ar" ? "تم حذف العنوان" : "Address deleted");
    } catch (error) {
      toast.error(apiErrorMessage(error, locale));
    } finally {
      setDeletingAddress(false);
    }
  };

  return (
    <main className="sf-account-page account-page">
      <Reveal stagger distance={20} className="account-hero">
        <div className="account-hero__copy">
          <h1>{locale === "ar" ? `مرحباً، ${firstName}` : `Hello, ${firstName}.`}</h1>
          <p className="account-hero__intro">
            {locale === "ar"
              ? "طلباتك والمنتجات المحفوظة وتفاصيل التوصيل في مكان واحد."
              : "Your orders, saved products, and delivery details in one place."}
          </p>
        </div>
        <dl
          className="account-hero__registry"
          aria-label={locale === "ar" ? "ملخص الحساب" : "Account registry"}
        >
          <div className="account-hero__person">
            <dt>
              <span className="account-profile-avatar account-profile-avatar--hero">
                <AccountGirlAvatar name={name} />
              </span>
              <span>{locale === "ar" ? "تفاصيل الحساب" : "Account details"}</span>
            </dt>
            <dd>{name}</dd>
            <small>{profile.data?.email ?? user.email ?? user.phone}</small>
          </div>
          <div>
            <dt>{locale === "ar" ? "الطلبات" : "Orders"}</dt>
            <dd>
              <data value={orders.data?.length ?? 0}>{orders.data?.length ?? 0}</data>
            </dd>
          </div>
          <div>
            <dt>{locale === "ar" ? "المحفوظ" : "Saved"}</dt>
            <dd>
              <data value={wishlistCount}>{wishlistCount}</data>
            </dd>
          </div>
          <div>
            <dt>{locale === "ar" ? "العناوين" : "Addresses"}</dt>
            <dd>
              <data value={addresses.data?.length ?? 0}>{addresses.data?.length ?? 0}</data>
            </dd>
          </div>
        </dl>
      </Reveal>

      <Reveal className="account-shell">
        <nav
          className="account-nav"
          aria-label={locale === "ar" ? "أقسام الحساب" : "Account sections"}
        >
          <ul>
            {tabs.map((item) => (
              <li key={item.value}>
                <button
                  type="button"
                  onClick={() =>
                    void navigate({
                      to: "/account",
                      search: {
                        section: item.value === "overview" ? undefined : item.value,
                      },
                    })
                  }
                  aria-current={tab === item.value ? "page" : undefined}
                  className="account-nav__button"
                >
                  {item.label[locale]}
                </button>
              </li>
            ))}
            <li className="account-nav__signout">
              <button
                type="button"
                onClick={() => setSignOutOpen(true)}
                className="account-nav__button account-nav__button--signout"
              >
                <LogOut aria-hidden="true" strokeWidth={1.7} />
                <span>{signOutCopy.trigger}</span>
              </button>
            </li>
          </ul>
        </nav>
        <section key={tab} className="account-panel">
          {tab === "overview" && (
            <Overview
              locale={locale}
              orders={recentOrders}
              ordersLoading={orders.isLoading}
              ordersError={orders.isError}
              wishlistCount={wishlistCount}
              defaultAddress={defaultAddress}
              wishlistPreview={wishlistPreview}
              wishlistLoading={wishlistProducts.isLoading}
              onRetryOrders={() => void orders.refetch()}
              onNavigate={(section) => void navigate({ to: "/account", search: { section } })}
            />
          )}
          {tab === "orders" && (
            <div className="account-detail account-orders">
              <AccountSectionHeading
                title={locale === "ar" ? "طلباتك" : "Your orders"}
                meta={`${orders.data?.length ?? 0} ${locale === "ar" ? "طلب" : orders.data?.length === 1 ? "order" : "orders"}`}
              />
              {orders.isLoading ? (
                <div
                  className="account-detail-skeleton account-detail-skeleton--orders"
                  aria-label={locale === "ar" ? "جارٍ تحميل الطلبات" : "Loading orders"}
                >
                  <span />
                  <span />
                  <span />
                </div>
              ) : orders.isError ? (
                <div className="account-detail-state">
                  <Package aria-hidden="true" />
                  <h3>{locale === "ar" ? "تعذر تحميل الطلبات" : "Orders couldn't be loaded"}</h3>
                  <p>
                    {locale === "ar"
                      ? "تحققي من اتصالك ثم حاولي مرة أخرى."
                      : "Check your connection, then try again."}
                  </p>
                  <Button variant="line" size="pill" onClick={() => void orders.refetch()}>
                    {locale === "ar" ? "حاولي مرة أخرى" : "Try again"}
                  </Button>
                </div>
              ) : orders.data?.length ? (
                <ol className="account-orders__list">
                  {orders.data.map((order) => {
                    const status = getOrderStatusCopy(order.status, locale);
                    const paymentNeeded = canCompletePayment(order);
                    return (
                      <li key={order.id} className="account-orders__item">
                        <div className="account-orders__index" aria-hidden="true">
                          {String(orders.data.indexOf(order) + 1).padStart(2, "0")}
                        </div>
                        <div className="account-orders__identity">
                          <small>{locale === "ar" ? "رقم الطلب" : "Order number"}</small>
                          <h3>{order.orderNumber}</h3>
                          <p>
                            {new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-EG", {
                              dateStyle: "medium",
                              timeZone: "Africa/Cairo",
                            }).format(new Date(order.placedAt))}
                          </p>
                        </div>
                        <div className="account-orders__status">
                          <span>{status.label}</span>
                          <p>{status.description}</p>
                        </div>
                        <div className="account-orders__actions">
                          <strong>{formatPrice(order.grandTotal / 100)}</strong>
                          {paymentNeeded ? (
                            <button
                              type="button"
                              className="account-orders__pay-button"
                              aria-expanded={expandedPaymentOrderId === order.id}
                              onClick={() => {
                                setExpandedOrderId(null);
                                setExpandedPaymentOrderId((current) =>
                                  current === order.id ? null : order.id,
                                );
                              }}
                            >
                              <CreditCard aria-hidden="true" />
                              {expandedPaymentOrderId === order.id
                                ? locale === "ar"
                                  ? "إخفاء الدفع"
                                  : "Hide payment"
                                : locale === "ar"
                                  ? "إكمال الدفع"
                                  : "Complete payment"}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="account-orders__track-button"
                              aria-expanded={expandedOrderId === order.id}
                              onClick={() => {
                                setExpandedPaymentOrderId(null);
                                setExpandedOrderId((current) =>
                                  current === order.id ? null : order.id,
                                );
                              }}
                            >
                              <Truck aria-hidden="true" />
                              {expandedOrderId === order.id
                                ? locale === "ar"
                                  ? "إخفاء التتبع"
                                  : "Hide tracking"
                                : locale === "ar"
                                  ? "تتبع الطلب"
                                  : "Track order"}
                            </button>
                          )}
                        </div>
                        {expandedPaymentOrderId === order.id && (
                          <PaymentContinuation order={order} locale={locale} />
                        )}
                        {expandedOrderId === order.id && (
                          <OrderTrackingPanel orderId={order.id} locale={locale} />
                        )}
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <Empty
                  icon={<Package />}
                  text={locale === "ar" ? "لا توجد طلبات حتى الآن" : "No orders yet"}
                  copy={
                    locale === "ar"
                      ? "عندما تطلبين شيئاً، ستجدين تفاصيله وحالة توصيله هنا."
                      : "When you place an order, its details and delivery status will appear here."
                  }
                  action={locale === "ar" ? "اكتشفي المنتجات" : "Explore products"}
                />
              )}
            </div>
          )}
          {tab === "wishlist" && (
            <div className="account-detail account-wishlist">
              {wishlistProducts.isLoading ? (
                <div className="account-detail-skeleton account-detail-skeleton--products">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              ) : wishlistProducts.isError ? (
                <div className="account-detail-state">
                  <Heart aria-hidden="true" />
                  <h3>{locale === "ar" ? "تعذر تحميل المفضلة" : "Wishlist couldn't be loaded"}</h3>
                  <p role="alert">
                    {locale === "ar"
                      ? "اختياراتك ما زالت محفوظة. حاولي تحميلها مرة أخرى."
                      : "Your saved selection is safe. Try loading it again."}
                  </p>
                  <Button
                    type="button"
                    variant="line"
                    size="pill"
                    onClick={() => void wishlistProducts.refetch()}
                  >
                    {locale === "ar" ? "حاولي مرة أخرى" : "Try again"}
                  </Button>
                </div>
              ) : wishlistProducts.data ? (
                <WishlistStudio data={wishlistProducts.data} locale={locale} />
              ) : (
                <Empty
                  icon={<Heart />}
                  text={locale === "ar" ? "قائمة المفضلة فارغة" : "Your wishlist is empty"}
                  copy={
                    locale === "ar"
                      ? "اضغطي على رمز القلب بجانب أي منتج للاحتفاظ به هنا."
                      : "Use the heart on any product to keep it close for later."
                  }
                  action={locale === "ar" ? "اكتشفي المجموعة" : "Discover the collection"}
                />
              )}
            </div>
          )}
          {tab === "reviews" && (
            <div className="account-detail account-reviews">
              {myReviews.isLoading ? (
                <div className="account-detail-skeleton account-detail-skeleton--orders">
                  <span />
                  <span />
                  <span />
                </div>
              ) : myReviews.isError ? (
                <div className="account-detail-state">
                  <RefreshCw aria-hidden="true" />
                  <h3>
                    {locale === "ar" ? "تعذر تحميل المراجعات" : "Reviews could not be loaded"}
                  </h3>
                  <p>
                    {locale === "ar" ? "حاولي مرة أخرى." : "Try loading your review history again."}
                  </p>
                  <Button variant="line" size="pill" onClick={() => void myReviews.refetch()}>
                    {locale === "ar" ? "إعادة المحاولة" : "Try again"}
                  </Button>
                </div>
              ) : myReviews.data ? (
                <ReviewLibrary data={myReviews.data} locale={locale} />
              ) : null}
            </div>
          )}
          {tab === "addresses" && (
            <div className="account-detail account-addresses">
              <AccountSectionHeading
                title={locale === "ar" ? "عناوينك" : "Your addresses"}
                meta={`${addresses.data?.length ?? 0} ${locale === "ar" ? "عنوان" : addresses.data?.length === 1 ? "address" : "addresses"}`}
              />
              <div className="account-addresses__grid">
                {addresses.data?.map((address) => {
                  const ready = isAddressDeliveryReady(address);
                  return (
                    <article
                      key={address.id}
                      className="account-address-card"
                      data-default={address.isDefault || undefined}
                    >
                      <header>
                        <span className="account-address-card__icon">
                          <MapPin aria-hidden="true" />
                        </span>
                        <span className="account-address-card__label">
                          {address.isDefault
                            ? locale === "ar"
                              ? "العنوان الأساسي"
                              : "Default address"
                            : address.label}
                        </span>
                      </header>
                      <h3>{address.receiverName}</h3>
                      <p>
                        {address.building} {address.street}, {address.area}, {address.city},{" "}
                        {address.governorate}
                      </p>
                      <small>{address.phone}</small>
                      {!ready && (
                        <div className="account-address-card__warning">
                          {locale === "ar"
                            ? "يحتاج هذا العنوان إلى تحديث قبل إتمام الطلب."
                            : "Update this address before using it at checkout."}
                        </div>
                      )}
                      <footer>
                        {!address.isDefault && (
                          <button
                            type="button"
                            onClick={() =>
                              void setDefaultAddress(address.id).then(() =>
                                client.invalidateQueries({ queryKey: ["account", "addresses"] }),
                              )
                            }
                          >
                            {locale === "ar" ? "تعيين كأساسي" : "Make default"}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setAddressToDelete(address)}
                          aria-label={
                            locale === "ar"
                              ? `حذف عنوان ${address.receiverName}`
                              : `Delete ${address.receiverName}'s address`
                          }
                          className="account-address-card__delete"
                        >
                          <Trash2 aria-hidden="true" />
                        </button>
                      </footer>
                    </article>
                  );
                })}
              </div>
              <div className="account-address-form">
                <div className="account-address-form__intro">
                  <span>+</span>
                  <p>{locale === "ar" ? "عنوان جديد" : "New destination"}</p>
                  <h2>{locale === "ar" ? "أضيفي عنوان توصيل" : "Add a delivery address"}</h2>
                  <small>
                    {locale === "ar"
                      ? "أضيفي تفاصيل واضحة تساعد المندوب على الوصول إليك بسهولة."
                      : "Add clear details so the courier can reach you without an extra call."}
                  </small>
                </div>
                <div className="account-address-form__fields">
                  <AddressForm
                    initialName={name}
                    initialPhone={profile.data?.phone ?? user.phone ?? ""}
                    pending={addressMutation.isPending}
                    submitLabel={locale === "ar" ? "حفظ العنوان" : "Save address"}
                    onSubmit={(input) =>
                      addressMutation
                        .mutateAsync({
                          ...input,
                          isDefault: !addresses.data?.length,
                        })
                        .then(() => undefined)
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {tab === "settings" && (
            <div className="account-detail account-settings">
              <AccountSectionHeading
                title={locale === "ar" ? "إعدادات الحساب" : "Account settings"}
                meta={locale === "ar" ? "حساب خاص" : "Private account"}
              />
              <div className="account-settings__layout">
                <aside className="account-settings__identity">
                  <span aria-hidden="true">
                    {name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part.charAt(0))
                      .join("")
                      .toUpperCase()}
                  </span>
                  <h3>{name}</h3>
                  <p>{profile.data?.email ?? user.email}</p>
                  <small>
                    {locale === "ar"
                      ? "يُستخدم رقم هاتفك لتحديثات الطلب والتوصيل."
                      : "Your phone is used for order and delivery updates."}
                  </small>
                </aside>
                <form
                  className="account-settings__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget);
                    const nextPhone = String(data.get("phone") ?? "").trim();
                    const phoneChanged = nextPhone !== currentPhone;
                    const payload = {
                      firstName: data.get("firstName"),
                      lastName: data.get("lastName"),
                      phone: nextPhone,
                    };

                    if (!phoneChanged) {
                      setPhoneOtpStage(null);
                      setPhoneOtp("");
                      profileMutation.mutate(payload);
                      return;
                    }

                    if (!phoneOtpStage || phoneOtpStage.phone !== nextPhone) {
                      void phoneOtpMutation.mutateAsync().then((challenge) => {
                        setPhoneOtp("");
                        setPhoneOtpStage({
                          phone: nextPhone,
                          maskedEmail: challenge.maskedEmail,
                          ttlSeconds: challenge.ttlSeconds,
                        });
                        toast(
                          locale === "ar"
                            ? `أرسلنا كود التحقق إلى ${challenge.maskedEmail}`
                            : `Verification code sent to ${challenge.maskedEmail}`,
                        );
                      });
                      return;
                    }

                    if (!/^[0-9]{6}$/.test(phoneOtp)) {
                      toast.error(
                        locale === "ar"
                          ? "أدخل كود التحقق المكون من 6 أرقام."
                          : "Enter the 6-digit verification code.",
                      );
                      return;
                    }

                    profileMutation.mutate({
                      ...payload,
                      phoneChangeOtp: phoneOtp,
                    });
                  }}
                >
                  <div className="account-settings__fields">
                    {[
                      [
                        "firstName",
                        locale === "ar" ? "الاسم الأول" : "First name",
                        profile.data?.firstName ?? user.firstName,
                      ],
                      [
                        "lastName",
                        locale === "ar" ? "اسم العائلة" : "Last name",
                        profile.data?.lastName ?? user.lastName,
                      ],
                      ["phone", locale === "ar" ? "رقم الهاتف" : "Phone number", currentPhone],
                    ].map(([id, label, value]) => (
                      <label key={id}>
                        <span>{label}</span>
                        <input
                          name={id}
                          type={id === "phone" ? "tel" : "text"}
                          inputMode={id === "phone" ? "tel" : undefined}
                          autoComplete={
                            id === "phone"
                              ? "tel"
                              : id === "firstName"
                                ? "given-name"
                                : "family-name"
                          }
                          defaultValue={value}
                          required
                        />
                      </label>
                    ))}
                  </div>
                  <div
                    className={`account-phone-verification${
                      phoneOtpStage ? " account-phone-verification--active" : ""
                    }`}
                  >
                    <div>
                      <p>
                        {phoneOtpStage
                          ? locale === "ar"
                            ? "تحقق من بريدك الإلكتروني"
                            : "Email verification required"
                          : locale === "ar"
                            ? "تغيير رقم الهاتف محمي"
                            : "Phone changes are protected"}
                      </p>
                      <small>
                        {phoneOtpStage
                          ? locale === "ar"
                            ? `أدخل الكود المرسل إلى ${phoneOtpStage.maskedEmail} لتحديث رقم الهاتف.`
                            : `Enter the code sent to ${phoneOtpStage.maskedEmail} to update your phone.`
                          : locale === "ar"
                            ? "إذا غيّرت رقم الهاتف سنرسل كود تحقق إلى بريدك الإلكتروني أولاً."
                            : "If you change your phone, we will email a verification code before saving it."}
                      </small>
                    </div>
                    {phoneOtpStage && (
                      <label>
                        <span>{locale === "ar" ? "كود التحقق" : "Verification code"}</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          pattern="[0-9]{6}"
                          maxLength={6}
                          value={phoneOtp}
                          onChange={(event) =>
                            setPhoneOtp(event.currentTarget.value.replace(/\D/g, "").slice(0, 6))
                          }
                          placeholder="000000"
                        />
                      </label>
                    )}
                    {phoneOtpStage && (
                      <button
                        type="button"
                        className="account-phone-verification__resend"
                        disabled={phoneOtpMutation.isPending}
                        onClick={() => {
                          void phoneOtpMutation.mutateAsync().then((challenge) => {
                            setPhoneOtp("");
                            setPhoneOtpStage((current) =>
                              current
                                ? {
                                    ...current,
                                    maskedEmail: challenge.maskedEmail,
                                    ttlSeconds: challenge.ttlSeconds,
                                  }
                                : null,
                            );
                            toast(
                              locale === "ar"
                                ? "تم إرسال كود جديد"
                                : "A new verification code was sent",
                            );
                          });
                        }}
                      >
                        {locale === "ar" ? "إرسال كود جديد" : "Resend code"}
                      </button>
                    )}
                  </div>
                  <div className="account-settings__footer">
                    <p>
                      {locale === "ar"
                        ? "احفظي التغييرات لتحديث بيانات حسابك."
                        : "Save to update these details across your account."}
                    </p>
                    <Button
                      type="submit"
                      variant="solid"
                      size="pill"
                      loading={profileMutation.isPending || phoneOtpMutation.isPending}
                    >
                      {phoneOtpStage
                        ? locale === "ar"
                          ? "تحقق واحفظ"
                          : "Verify and save"
                        : locale === "ar"
                          ? "حفظ التغييرات"
                          : "Save changes"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </Reveal>
      <Dialog
        open={signOutOpen}
        onOpenChange={(open) => {
          if (!isSigningOut) setSignOutOpen(open);
        }}
      >
        <DialogContent
          dir={locale === "ar" ? "rtl" : "ltr"}
          showCloseButton={!isSigningOut}
          className="w-[calc(100%-2rem)] max-w-md gap-0 overflow-hidden rounded-none border-border bg-warm-white p-0 shadow-soft"
        >
          <div className="border-b border-border px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9">
            <p className="label-xs text-gold">{signOutCopy.eyebrow}</p>
            <DialogHeader className="mt-4 space-y-0 text-start">
              <DialogTitle className="font-serif text-[clamp(1.75rem,5vw,2.25rem)] font-semibold leading-tight tracking-normal text-foreground">
                {signOutCopy.title}
              </DialogTitle>
              <DialogDescription className="mt-3 max-w-sm text-sm leading-6 text-taupe">
                {signOutCopy.description}
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="grid gap-3 px-6 py-5 sm:grid-cols-2 sm:px-8 sm:py-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="quiet"
                size="pill"
                className="w-full"
                disabled={isSigningOut}
              >
                {signOutCopy.cancel}
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="solid"
              size="pill"
              className="w-full"
              loading={isSigningOut}
              onClick={() => void handleSignOut()}
            >
              {isSigningOut ? signOutCopy.pending : signOutCopy.confirm}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={Boolean(addressToDelete)}
        onOpenChange={(open) => {
          if (!open && !deletingAddress) setAddressToDelete(null);
        }}
      >
        <DialogContent
          dir={locale === "ar" ? "rtl" : "ltr"}
          showCloseButton={!deletingAddress}
          className="account-confirm-dialog"
        >
          <p className="account-eyebrow">{locale === "ar" ? "دفتر العناوين" : "Address book"}</p>
          <DialogHeader className="account-confirm-dialog__header">
            <DialogTitle className="account-confirm-dialog__title">
              {locale === "ar" ? "حذف هذا العنوان؟" : "Remove this address?"}
            </DialogTitle>
            <DialogDescription className="account-confirm-dialog__description">
              {locale === "ar"
                ? `سيتم حذف عنوان ${addressToDelete?.receiverName ?? ""} نهائياً من حسابك.`
                : `${addressToDelete?.receiverName ?? "This address"} will be permanently removed from your account.`}
            </DialogDescription>
          </DialogHeader>
          <div className="account-confirm-dialog__actions">
            <DialogClose asChild>
              <Button type="button" variant="quiet" size="pill" disabled={deletingAddress}>
                {locale === "ar" ? "إلغاء" : "Keep address"}
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="solid"
              size="pill"
              loading={deletingAddress}
              onClick={() => void handleDeleteAddress()}
            >
              {locale === "ar" ? "حذف العنوان" : "Remove address"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function Overview({
  locale,
  orders,
  ordersLoading,
  ordersError,
  wishlistCount,
  defaultAddress,
  wishlistPreview,
  wishlistLoading,
  onRetryOrders,
  onNavigate,
}: {
  locale: "ar" | "en";
  orders: Awaited<ReturnType<typeof listOrders>>;
  ordersLoading: boolean;
  ordersError: boolean;
  wishlistCount: number;
  defaultAddress: AddressResponse | null;
  wishlistPreview: ReturnType<typeof mapProduct>[];
  wishlistLoading: boolean;
  onRetryOrders: () => void;
  onNavigate: (section: "orders" | "wishlist" | "addresses") => void;
}) {
  const ar = locale === "ar";

  return (
    <div className="account-overview">
      <div className="account-overview__grid">
        <section className="account-recent" aria-labelledby="recent-orders-title">
          <AccountSectionHeading
            title={ar ? "طلباتك الأخيرة" : "Recent orders"}
            action={ar ? "عرض كل الطلبات" : "View all orders"}
            onAction={() => onNavigate("orders")}
          />

          {ordersLoading ? (
            <div
              className="account-order-skeleton"
              aria-label={ar ? "جارٍ تحميل الطلبات" : "Loading orders"}
            >
              <span />
              <span />
              <span />
            </div>
          ) : ordersError ? (
            <div className="account-inline-state">
              <p>{ar ? "تعذر تحميل الطلبات." : "We couldn't load your orders."}</p>
              <button type="button" onClick={onRetryOrders}>
                {ar ? "حاولي مرة أخرى" : "Try again"}
              </button>
            </div>
          ) : orders.length ? (
            <ol className="account-order-list">
              {orders.map((order) => {
                const status = getOrderStatusCopy(order.status, locale);
                return (
                  <li key={order.id}>
                    <button type="button" onClick={() => onNavigate("orders")}>
                      <span className="account-order-list__number">
                        <small>{ar ? "طلب" : "Order"}</small>
                        <strong>{order.orderNumber}</strong>
                      </span>
                      <span className="account-order-list__date">
                        {new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          timeZone: "Africa/Cairo",
                        }).format(new Date(order.placedAt))}
                      </span>
                      <span className="account-order-list__status" data-status={order.status}>
                        {status.label}
                      </span>
                      <strong className="account-order-list__total">
                        {formatPrice(order.grandTotal / 100)}
                      </strong>
                      <ArrowRight aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="account-empty-preview">
              <Package aria-hidden="true" />
              <div>
                <strong>{ar ? "ابدئي أول طلب لك" : "Your first order starts here"}</strong>
                <p>
                  {ar
                    ? "اكتشفي منتجات مختارة لروتينك."
                    : "Discover products selected for your routine."}
                </p>
              </div>
              <Button asChild variant="line" size="pill">
                <Link to="/shop">{ar ? "تسوقي الآن" : "Browse products"}</Link>
              </Button>
            </div>
          )}
        </section>

        <div className="account-overview__aside">
          {orders[0] && (
            <section className="account-tracking-preview" aria-labelledby="account-tracking-title">
              <AccountSectionHeading
                title={ar ? "تتبع آخر طلب" : "Latest tracking"}
                action={ar ? "كل الطلبات" : "All orders"}
                onAction={() => onNavigate("orders")}
                compact
              />
              <OrderTrackingPanel orderId={orders[0].id} locale={locale} compact />
            </section>
          )}

          <section className="account-address-preview" aria-labelledby="account-address-title">
            <AccountSectionHeading
              title={ar ? "العنوان الأساسي" : "Default address"}
              action={ar ? "إدارة العناوين" : "Manage"}
              onAction={() => onNavigate("addresses")}
              compact
            />
            {defaultAddress ? (
              <div className="account-address-preview__body">
                <span className="account-address-preview__pin">
                  <MapPin aria-hidden="true" />
                </span>
                <div>
                  <strong>{defaultAddress.receiverName}</strong>
                  <p>
                    {[
                      defaultAddress.building,
                      defaultAddress.street,
                      defaultAddress.area,
                      defaultAddress.city,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <small>{defaultAddress.phone}</small>
                </div>
              </div>
            ) : (
              <button
                className="account-address-preview__empty"
                type="button"
                onClick={() => onNavigate("addresses")}
              >
                <MapPin aria-hidden="true" />
                <span>
                  <strong>{ar ? "أضيفي عنوان التوصيل" : "Add a delivery address"}</strong>
                  <small>{ar ? "لتسريع إتمام الطلب" : "Make checkout faster next time"}</small>
                </span>
              </button>
            )}
          </section>

          <section className="account-saved-preview" aria-labelledby="account-saved-title">
            <AccountSectionHeading
              title={ar ? "محفوظ لوقت لاحق" : "Saved for later"}
              action={`${wishlistCount} ${ar ? "محفوظ" : "saved"}`}
              onAction={() => onNavigate("wishlist")}
              compact
            />
            {wishlistLoading ? (
              <div className="account-saved-preview__skeleton">
                <span />
                <span />
                <span />
              </div>
            ) : wishlistPreview.length ? (
              <div className="account-saved-preview__items">
                {wishlistPreview.map((product) => (
                  <Link
                    key={product.slug}
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    aria-label={product.name}
                  >
                    <img src={product.image} alt="" loading="lazy" />
                    <span>
                      <strong>{product.name}</strong>
                      <small>{formatPrice(product.price)}</small>
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <button
                className="account-saved-preview__empty"
                type="button"
                onClick={() => onNavigate("wishlist")}
              >
                <Heart aria-hidden="true" />
                <span>
                  {ar
                    ? "احفظي المنتجات التي تريدين الرجوع إليها."
                    : "Save products you want to come back to."}
                </span>
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function AccountSectionHeading({
  eyebrow,
  title,
  action,
  onAction,
  actionTo,
  meta,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  onAction?: () => void;
  actionTo?: "/shop";
  meta?: string;
  compact?: boolean;
}) {
  return (
    <header className="account-section-heading" data-compact={compact || undefined}>
      <div>
        {eyebrow && <p>{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      <div className="account-section-heading__aside">
        {meta && <span>{meta}</span>}
        {action && actionTo ? (
          <Link to={actionTo}>
            {action}
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : action && onAction ? (
          <button type="button" onClick={onAction}>
            {action}
            <ArrowRight aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </header>
  );
}

function canCompletePayment(order: OrderSummary) {
  return (
    ["PENDING_PAYMENT", "AWAITING_PAYMENT", "PAYMENT_FAILED"].includes(order.status) &&
    ["INSTAPAY", "VODAFONE_CASH"].includes(order.paymentMethod)
  );
}

function PaymentContinuation({ order, locale }: { order: OrderSummary; locale: "ar" | "en" }) {
  const ar = locale === "ar";
  const queryClient = useQueryClient();
  const [sender, setSender] = useState("");
  const [reference, setReference] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [copied, setCopied] = useState(false);
  const payment = useQuery({
    queryKey: ["account", "orders", order.id, "payment"],
    queryFn: () => createPayment(order.id, order.paymentMethod),
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
  const proof = useMutation({
    mutationFn: () => {
      if (!payment.data || !file) throw new Error("Payment proof is incomplete.");
      return uploadPaymentProof(
        payment.data.id,
        file,
        sender.trim(),
        reference.trim(),
        payment.data.amount,
      );
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(["account", "orders", order.id, "payment"], updated);
      void queryClient.invalidateQueries({ queryKey: ["account", "orders"] });
    },
  });

  if (payment.isLoading) {
    return (
      <div className="account-payment account-payment--loading" role="status">
        <LoaderCircle aria-hidden="true" />
        <span>{ar ? "جارٍ تجهيز بيانات الدفع…" : "Preparing secure payment details…"}</span>
      </div>
    );
  }

  if (payment.isError || !payment.data) {
    return (
      <div className="account-payment account-payment--error" role="alert">
        <div>
          <strong>{ar ? "تعذر فتح الدفع" : "Payment could not be opened"}</strong>
          <p>{apiErrorMessage(payment.error, locale)}</p>
        </div>
        <Button type="button" variant="line" size="pill" onClick={() => void payment.refetch()}>
          {ar ? "حاولي مرة أخرى" : "Try again"}
        </Button>
      </div>
    );
  }

  const data = payment.data;
  const submitted = proof.isSuccess || ["UNDER_REVIEW", "APPROVED"].includes(data.status);
  const instruction = data.instructions;
  const destination =
    instruction?.accountNumber ?? instruction?.phoneNumber ?? instruction?.notes ?? "";
  const destinationLabel =
    data.method === "INSTAPAY"
      ? ar
        ? "عنوان إنستاباي"
        : "InstaPay address"
      : ar
        ? "رقم فودافون كاش"
        : "Vodafone Cash number";

  if (submitted) {
    return (
      <section className="account-payment account-payment--submitted" aria-live="polite">
        <span className="account-payment__success-icon">
          <CheckCircle2 aria-hidden="true" />
        </span>
        <div>
          <p className="account-payment__eyebrow">
            {ar ? "تم استلام إثبات الدفع" : "Payment proof received"}
          </p>
          <h4>{ar ? "الدفع قيد المراجعة" : "Your payment is under review"}</h4>
          <p>
            {ar
              ? "سنتحقق من التحويل ونحدّث حالة الطلب تلقائياً. لا تعيدي إرسال الدفع."
              : "We’ll verify the transfer and update this order automatically. Do not pay again."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="account-payment" aria-labelledby={`payment-title-${order.id}`}>
      <header className="account-payment__header">
        <div>
          <p className="account-payment__eyebrow">{ar ? "إكمال الطلب" : "Complete your order"}</p>
          <h4 id={`payment-title-${order.id}`}>
            {ar ? "حوّلي المبلغ ثم أرسلي الإثبات" : "Transfer, then submit your proof"}
          </h4>
        </div>
        <strong>{formatPrice(data.amount / 100)}</strong>
      </header>

      <div className="account-payment__steps">
        <div>
          <span>01</span>
          <div>
            <small>{ar ? "التحويل عبر" : "Transfer via"}</small>
            <strong>{data.method === "INSTAPAY" ? "InstaPay" : "Vodafone Cash"}</strong>
          </div>
        </div>
        <div>
          <span>02</span>
          <div>
            <small>{destinationLabel}</small>
            {destination ? (
              <button
                type="button"
                className="account-payment__copy"
                onClick={() => {
                  void navigator.clipboard
                    .writeText(destination)
                    .then(() => {
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 1600);
                    })
                    .catch(() => toast.error(ar ? "تعذر النسخ" : "Could not copy the details"));
                }}
              >
                <strong>{destination}</strong>
                <Clipboard aria-hidden="true" />
                <span aria-live="polite">{copied ? (ar ? "تم النسخ" : "Copied") : ""}</span>
              </button>
            ) : (
              <p className="account-payment__missing">
                {ar
                  ? "بيانات التحويل غير متاحة. تواصلي معنا."
                  : "Transfer details are unavailable. Contact us."}
              </p>
            )}
          </div>
        </div>
        <div>
          <span>03</span>
          <div>
            <small>{ar ? "مرجع الدفع" : "Payment reference"}</small>
            <strong>{data.referenceNumber ?? order.orderNumber}</strong>
          </div>
        </div>
      </div>

      {data.expiresAt && (
        <p className="account-payment__deadline">
          {ar ? "أكملي التحويل قبل " : "Complete the transfer before "}
          <strong>
            {new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "Africa/Cairo",
            }).format(new Date(data.expiresAt))}
          </strong>
        </p>
      )}

      {destination ? (
        <form
          className="account-payment__form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!proof.isPending) proof.mutate();
          }}
        >
          <label>
            <span>{ar ? "هاتف أو حساب المُرسل" : "Sender phone or handle"}</span>
            <input
              required
              type="text"
              autoComplete="tel"
              value={sender}
              onChange={(event) => setSender(event.target.value)}
            />
          </label>
          <label>
            <span>{ar ? "رقم عملية التحويل" : "Transfer transaction number"}</span>
            <input
              required
              type="text"
              autoComplete="off"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
            />
          </label>
          <label className="account-payment__file">
            <span>{ar ? "صورة إثبات التحويل" : "Transfer screenshot"}</span>
            <input
              required
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => {
                const selected = event.target.files?.[0] ?? null;
                if (selected && selected.size > 5 * 1024 * 1024) {
                  setFile(null);
                  setFileError(
                    ar ? "اختاري صورة أصغر من 5 ميجابايت." : "Choose an image smaller than 5 MB.",
                  );
                  event.target.value = "";
                  return;
                }
                setFile(selected);
                setFileError("");
              }}
            />
            <small>
              {ar ? "JPG أو PNG أو WebP، بحد أقصى 5 ميجابايت." : "JPG, PNG or WebP, up to 5 MB."}
            </small>
          </label>
          {(fileError || proof.error) && (
            <p className="account-payment__form-error" role="alert">
              {fileError || apiErrorMessage(proof.error, locale)}
            </p>
          )}
          <Button
            type="submit"
            variant="solid"
            size="wide"
            loading={proof.isPending}
            disabled={!file || !sender.trim() || !reference.trim()}
          >
            <Upload aria-hidden="true" />
            {ar ? "إرسال إثبات الدفع" : "Submit payment proof"}
          </Button>
        </form>
      ) : (
        <Button asChild variant="line" size="pill">
          <Link to="/contact">{ar ? "تواصلي مع خدمة العملاء" : "Contact customer care"}</Link>
        </Button>
      )}
    </section>
  );
}

function AccountGirlAvatar({ name }: { name: string }) {
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "BR";

  return (
    <svg viewBox="0 0 112 112" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="account-avatar-skin" x1="28" x2="86" y1="16" y2="96">
          <stop stopColor="#f8ddc7" />
          <stop offset="1" stopColor="#c88f65" />
        </linearGradient>
        <linearGradient id="account-avatar-hair" x1="20" x2="90" y1="10" y2="96">
          <stop stopColor="#6d4229" />
          <stop offset="1" stopColor="#241511" />
        </linearGradient>
      </defs>
      <circle cx="56" cy="56" r="54" fill="#fff" />
      <path
        d="M24 53c0-22 13-38 33-38 21 0 34 16 34 38 0 14-4 25-12 33l9 17H24l10-17c-7-8-10-19-10-33Z"
        fill="url(#account-avatar-hair)"
      />
      <path
        d="M35 50c8 2 20-2 29-12 6 8 13 12 22 12-2 21-14 36-26 36-13 0-23-15-25-36Z"
        fill="url(#account-avatar-skin)"
      />
      <path d="M38 88c7 8 33 8 42 0l10 15H27l11-15Z" fill="#f7efe5" />
      <circle cx="46" cy="57" r="2.5" fill="#2c1d17" />
      <circle cx="69" cy="57" r="2.5" fill="#2c1d17" />
      <path d="M50 72c4 4 11 4 15 0" fill="none" stroke="#7d4b36" strokeWidth="3" />
      <text
        x="56"
        y="106"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fontWeight="800"
        fill="#8a5a2c"
      >
        {initials.slice(0, 2)}
      </text>
    </svg>
  );
}

function OrderTrackingPanel({
  orderId,
  locale,
  compact = false,
}: {
  orderId: string;
  locale: "ar" | "en";
  compact?: boolean;
}) {
  const queryClient = useQueryClient();
  const tracking = useQuery({
    queryKey: ["account", "orders", orderId, "tracking"],
    queryFn: () => getOrderTracking(orderId),
  });
  const refresh = useMutation({
    mutationFn: () => refreshOrderTracking(orderId),
    onSuccess: (data) => {
      queryClient.setQueryData(["account", "orders", orderId, "tracking"], data);
    },
  });

  if (tracking.isLoading) {
    return (
      <div
        className="account-tracking account-tracking--loading"
        data-compact={compact || undefined}
      >
        {locale === "ar" ? "جارٍ تحميل التتبع…" : "Loading tracking…"}
      </div>
    );
  }

  if (tracking.isError) {
    return (
      <div className="account-tracking account-tracking--error" data-compact={compact || undefined}>
        {apiErrorMessage(tracking.error, locale)}
      </div>
    );
  }

  const data = refresh.data ?? tracking.data;
  if (!data) return null;
  const steps = trackingSteps(data, locale);
  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.state === "active"),
  );
  const carrier = data.shipment?.provider ?? "BOSTA";

  return (
    <div className="account-tracking" data-compact={compact || undefined}>
      <div className="account-tracking__header">
        <div>
          <p>{locale === "ar" ? "تتبع الشحنة" : "Order tracking"}</p>
          <strong>
            {data.shipment ? data.shipment.status.replace(/_/g, " ") : "Preparing after payment"}
          </strong>
          <small>{trackingAddress(data)}</small>
        </div>
        <Button
          type="button"
          variant="quiet"
          size="pill"
          loading={refresh.isPending}
          onClick={() => refresh.mutate()}
        >
          <RefreshCw className="size-4" />
          {locale === "ar" ? "تحديث" : "Refresh"}
        </Button>
      </div>

      <div className="account-tracking__carrier">
        <span>{carrier}</span>
        <strong>
          {data.shipment?.trackingNumber ??
            (locale === "ar" ? "لم يتم الحجز بعد" : "Not booked yet")}
        </strong>
      </div>

      <ol
        className="account-tracking__timeline"
        style={
          {
            "--tracking-progress": `${(activeIndex / Math.max(steps.length - 1, 1)) * 100}%`,
          } as CSSProperties
        }
      >
        {steps.map((step) => (
          <li key={step.id} data-state={step.state}>
            <span className="account-tracking__step-icon">{step.icon}</span>
            <strong>{step.label}</strong>
            <small>{step.detail}</small>
          </li>
        ))}
      </ol>

      {data.shipment ? (
        <div className="account-tracking__details">
          <div>
            <small>{locale === "ar" ? "شركة الشحن" : "Carrier"}</small>
            <strong>{data.shipment.provider}</strong>
          </div>
          <div>
            <small>{locale === "ar" ? "رقم التتبع" : "Tracking number"}</small>
            <strong>{data.shipment.trackingNumber}</strong>
          </div>
          <a href={data.shipment.trackingUrl} target="_blank" rel="noreferrer">
            {locale === "ar" ? "فتح موقع شركة الشحن" : "Open carrier tracking"}
            <ExternalLink aria-hidden="true" />
          </a>
        </div>
      ) : (
        <p className="account-tracking__empty">
          {locale === "ar"
            ? "سيظهر التتبع بعد اعتماد الدفع وحجز الشحنة."
            : "Tracking appears after payment approval and shipment booking."}
        </p>
      )}
      {data.history.length > 0 && (
        <ol className="account-tracking__history">
          {data.history.slice(0, 4).map((entry) => (
            <li key={`${entry.action}-${entry.createdAt}`}>
              <p>{entry.description}</p>
              <small>
                {new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-EG", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Africa/Cairo",
                }).format(new Date(entry.createdAt))}
              </small>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function trackingSteps(data: OrderTracking, locale: "ar" | "en") {
  const ar = locale === "ar";
  const status = `${data.shipment?.status ?? data.orderStatus ?? ""}`.toUpperCase();
  const isDelivered = status.includes("DELIVER");
  const isOut = status.includes("OUT") || status.includes("DELIVERY");
  const isBooked = Boolean(data.shipment);
  const isTransit =
    isBooked &&
    !isDelivered &&
    (status.includes("TRANSIT") ||
      status.includes("PICK") ||
      status.includes("SENT") ||
      status.includes("BOOK") ||
      status.includes("CREATED"));
  const active = isDelivered ? 4 : isOut ? 3 : isTransit ? 2 : isBooked ? 1 : 0;
  const placedDate =
    data.history[0]?.createdAt || data.shipment?.createdAt || data.estimatedDeliveryDate || null;

  return [
    {
      id: "placed",
      label: ar ? "تم الطلب" : "Order placed",
      detail: placedDate ? formatTrackingDate(placedDate, locale) : "-",
      icon: <Package aria-hidden="true" />,
    },
    {
      id: "booked",
      label: ar ? "حجز Bosta" : "Bosta booked",
      detail: isBooked ? (data.shipment?.provider ?? "BOSTA") : "-",
      icon: <PackageCheck aria-hidden="true" />,
    },
    {
      id: "transit",
      label: ar ? "في الطريق" : "In transit",
      detail: isTransit || isOut || isDelivered ? (data.shipment?.status ?? "-") : "-",
      icon: <Truck aria-hidden="true" />,
    },
    {
      id: "out",
      label: ar ? "خارج للتوصيل" : "Out for delivery",
      detail:
        isOut || isDelivered
          ? data.shipment?.estimatedDelivery
            ? formatTrackingDate(data.shipment.estimatedDelivery, locale)
            : (data.shipment?.status ?? "-")
          : "-",
      icon: <CalendarDays aria-hidden="true" />,
    },
    {
      id: "delivered",
      label: ar ? "تم التسليم" : "Delivered",
      detail: isDelivered
        ? data.shipment?.updatedAt
          ? formatTrackingDate(data.shipment.updatedAt, locale)
          : (data.shipment?.status ?? "-")
        : "-",
      icon: <Home aria-hidden="true" />,
    },
  ].map((step, index) => ({
    ...step,
    state: index < active ? "complete" : index === active ? "active" : "idle",
  }));
}

function formatTrackingDate(value: string, locale: "ar" | "en") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Cairo",
  }).format(new Date(value));
}

function trackingAddress(data: OrderTracking) {
  return [data.shippingAddress.area, data.shippingAddress.city, data.shippingAddress.governorate]
    .filter(Boolean)
    .join(", ");
}

function isAddressDeliveryReady(address: AddressResponse) {
  return Boolean(address.bostaGovernorateId && address.bostaCityId && address.bostaZoneId);
}

function Empty({
  icon,
  text,
  copy,
  action = "Browse products",
}: {
  icon?: ReactNode;
  text: string;
  copy?: string;
  action?: string;
}) {
  return (
    <div className="account-detail-state account-detail-state--empty">
      {icon && <span>{icon}</span>}
      <h3>{text}</h3>
      {copy && <p>{copy}</p>}
      <Button asChild variant="line" size="pill">
        <Link to="/shop">{action}</Link>
      </Button>
    </div>
  );
}
