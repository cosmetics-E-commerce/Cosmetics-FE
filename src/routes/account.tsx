import { type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, MapPin, Package, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AddressForm } from "@/components/forms/AddressForm";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  apiErrorMessage,
  createAddress,
  deleteAddress,
  getProfile,
  getWishlist,
  listAddresses,
  listOrders,
  setDefaultAddress,
  updateProfile,
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
      raw["section"] === "addresses" ||
      raw["section"] === "settings"
        ? raw["section"]
        : undefined,
  }),
  head: () => ({ meta: [{ title: "My account — BIOREZA" }] }),
  component: Account,
});
const tabs = [
  { label: "Overview", value: "overview" },
  { label: "Orders", value: "orders" },
  { label: "Wishlist", value: "wishlist" },
  { label: "Addresses", value: "addresses" },
  { label: "Settings", value: "settings" },
] as const;
function Account() {
  const { user, authHydrated, signOut, wishlist, locale } = useStore();
  const navigate = useNavigate();
  const client = useQueryClient();
  const search = Route.useSearch();
  const tab = search.section ?? "overview";
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
  const addressMutation = useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      toast("Address saved");
      void client.invalidateQueries({ queryKey: ["account", "addresses"] });
    },
    onError: (error) => toast.error(apiErrorMessage(error)),
  });
  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast("Profile updated");
      void client.invalidateQueries({ queryKey: ["account", "profile"] });
    },
    onError: (error) => toast.error(apiErrorMessage(error)),
  });
  if (!authHydrated)
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <LoaderCircle className="animate-spin text-gold" />
      </div>
    );
  if (!user)
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <h1 className="font-serif text-4xl">Your private account</h1>
        <p className="mt-5 text-muted-foreground">
          Sign in to view orders, addresses and saved products.
        </p>
        <Button asChild variant="solid" size="pill" className="mt-8">
          <Link to="/sign-in" search={{ returnTo: undefined }}>
            Sign in
          </Link>
        </Button>
      </div>
    );
  const name = profile.data
    ? `${profile.data.firstName} ${profile.data.lastName}`
    : `${user.firstName} ${user.lastName}`;
  return (
    <div className="mx-auto max-w-[1560px] px-5 py-14 md:px-10 lg:py-20">
      <Reveal stagger distance={20}>
        <p className="label-xs text-gold">Client account</p>
        <h1 className="display mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)]">Welcome, {name}.</h1>
      </Reveal>
      <Reveal stagger className="mt-12 grid gap-14 lg:grid-cols-[220px_1fr]">
        <nav className="account-nav h-fit">
          <ul className="flex gap-6 overflow-auto border-b border-border pb-3 lg:flex-col lg:border-b-0 lg:border-e lg:pe-6">
            {tabs.map((item) => (
              <li key={item.value}>
                <button
                  onClick={() =>
                    void navigate({
                      to: "/account",
                      search: {
                        section: item.value === "overview" ? undefined : item.value,
                      },
                    })
                  }
                  aria-current={tab === item.value ? "page" : undefined}
                  className={`label-xs min-h-11 whitespace-nowrap ${tab === item.value ? "text-gold" : "text-taupe"}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => void signOut().then(() => navigate({ to: "/" }))}
                className="label-xs min-h-11 text-taupe"
              >
                Sign out
              </button>
            </li>
          </ul>
        </nav>
        <section key={tab} className="account-panel">
          {tab === "overview" && (
            <Reveal stagger className="grid gap-6 sm:grid-cols-3">
              {[
                { label: "Orders", value: orders.data?.length ?? 0, section: "orders" as const },
                { label: "Wishlist", value: wishlist.length, section: "wishlist" as const },
                {
                  label: "Addresses",
                  value: addresses.data?.length ?? 0,
                  section: "addresses" as const,
                },
              ].map(({ label, value, section }) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => void navigate({ to: "/account", search: { section } })}
                  className="account-overview-card border border-border bg-ivory p-8 text-start"
                >
                  <p className="label-xs text-taupe">{label}</p>
                  <p className="mt-4 font-serif text-4xl">{value}</p>
                  <span className="label-xs mt-5 inline-block text-gold">
                    View {String(label).toLowerCase()}
                  </span>
                </button>
              ))}
            </Reveal>
          )}
          {tab === "orders" && (
            <div>
              {orders.isLoading ? (
                <p>Loading orders...</p>
              ) : orders.isError ? (
                <div className="border border-border px-8 py-14 text-center">
                  <p className="font-serif text-2xl">Orders could not be loaded.</p>
                  <Button
                    variant="line"
                    size="pill"
                    className="mt-7"
                    onClick={() => void orders.refetch()}
                  >
                    Try again
                  </Button>
                </div>
              ) : orders.data?.length ? (
                <ul className="divide-y divide-border border-y border-border">
                  {orders.data.map((order) => {
                    const status = getOrderStatusCopy(order.status, locale);
                    return (
                      <li
                        key={order.id}
                        className="grid gap-5 py-6 sm:grid-cols-[1fr_1.2fr_auto] sm:items-center"
                      >
                        <div>
                          <p className="font-serif text-2xl">{order.orderNumber}</p>
                          <p className="label-xs mt-2 text-taupe">
                            {new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-EG", {
                              dateStyle: "medium",
                              timeZone: "Africa/Cairo",
                            }).format(new Date(order.placedAt))}
                          </p>
                        </div>
                        <div>
                          <span className="label-xs text-gold">{status.label}</span>
                          <p className="mt-1 text-xs text-muted-foreground">{status.description}</p>
                        </div>
                        <span className="font-serif text-xl">
                          {formatPrice(order.grandTotal / 100)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <Empty icon={<Package />} text="No orders yet." />
              )}
            </div>
          )}
          {tab === "wishlist" && (
            <div>
              <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
                <div>
                  <p className="label-xs text-gold">Saved selection</p>
                  <h2 className="mt-3 font-serif text-3xl">Your wishlist</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {wishlistProducts.data?.totalItems ?? wishlist.length} saved
                </p>
              </div>
              {wishlistProducts.isLoading ? (
                <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
                  {[0, 1, 2].map((item) => (
                    <div key={item} className="animate-pulse">
                      <div className="aspect-[4/5] bg-stone" />
                      <div className="mt-4 h-4 w-3/4 bg-stone" />
                    </div>
                  ))}
                </div>
              ) : wishlistProducts.isError ? (
                <div className="mt-8 border border-border px-8 py-14 text-center">
                  <p role="alert" className="font-serif text-2xl">
                    Your wishlist could not be loaded.
                  </p>
                  <Button
                    type="button"
                    variant="line"
                    size="pill"
                    className="mt-7"
                    onClick={() => void wishlistProducts.refetch()}
                  >
                    Try again
                  </Button>
                </div>
              ) : wishlistProducts.data?.items.length ? (
                <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 xl:grid-cols-4">
                  {wishlistProducts.data.items.map((item) => (
                    <ProductCard key={item.id} product={mapProduct(item.product, locale)} compact />
                  ))}
                </div>
              ) : (
                <Empty text="Your wishlist is empty." />
              )}
            </div>
          )}
          {tab === "addresses" && (
            <div>
              <div className="grid gap-5 sm:grid-cols-2">
                {addresses.data?.map((address) => (
                  <article key={address.id} className="border border-border p-6">
                    <div className="flex justify-between">
                      <MapPin className="text-gold" />
                      <span className="label-xs text-taupe">
                        {address.isDefault ? "Default" : address.label}
                      </span>
                    </div>
                    <p className="mt-5 font-serif text-xl">{address.receiverName}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {address.building} {address.street}, {address.area}, {address.city},{" "}
                      {address.governorate}
                    </p>
                    <div className="mt-5 flex gap-4">
                      {!address.isDefault && (
                        <button
                          onClick={() =>
                            void setDefaultAddress(address.id).then(() =>
                              client.invalidateQueries({ queryKey: ["account", "addresses"] }),
                            )
                          }
                          className="label-xs text-gold"
                        >
                          Make default
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (!window.confirm("Delete this address? This cannot be undone."))
                            return;
                          void deleteAddress(address.id)
                            .then(() =>
                              client.invalidateQueries({ queryKey: ["account", "addresses"] }),
                            )
                            .catch((error) => toast.error(apiErrorMessage(error)));
                        }}
                        aria-label="Delete address"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-10 border-t border-border pt-8">
                <h2 className="font-serif text-2xl sm:col-span-2">Add a delivery address</h2>
                <p className="mb-7 mt-2 text-sm text-muted-foreground">
                  Add enough detail for the courier to find you without calling twice.
                </p>
                <AddressForm
                  initialName={name}
                  initialPhone={profile.data?.phone ?? user.phone ?? ""}
                  pending={addressMutation.isPending}
                  submitLabel="Save address"
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
          )}
          {tab === "settings" && (
            <form
              className="max-w-lg space-y-6"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                profileMutation.mutate({
                  firstName: data.get("firstName"),
                  lastName: data.get("lastName"),
                  phone: data.get("phone"),
                });
              }}
            >
              {[
                ["firstName", "First name", profile.data?.firstName],
                ["lastName", "Last name", profile.data?.lastName],
                ["phone", "Phone", profile.data?.phone],
              ].map(([id, label, value]) => (
                <label key={id} className="label-xs block text-taupe">
                  {label}
                  <input
                    name={id}
                    defaultValue={value}
                    required
                    className="mt-2 h-12 w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
                  />
                </label>
              ))}
              <Button type="submit" variant="solid" size="pill" loading={profileMutation.isPending}>
                Save changes
              </Button>
            </form>
          )}
        </section>
      </Reveal>
    </div>
  );
}
function Empty({ icon, text }: { icon?: ReactNode; text: string }) {
  return (
    <div className="border border-border px-8 py-20 text-center">
      {icon && <span className="mx-auto grid size-10 place-items-center text-gold">{icon}</span>}
      <p className="mt-4 font-serif text-2xl">{text}</p>
      <Button asChild variant="line" size="pill" className="mt-7">
        <Link to="/shop">Browse products</Link>
      </Button>
    </div>
  );
}
