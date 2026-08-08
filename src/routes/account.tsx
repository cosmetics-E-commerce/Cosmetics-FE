import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, MapPin, Package, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  apiErrorMessage,
  createAddress,
  deleteAddress,
  getProfile,
  listAddresses,
  listOrders,
  setDefaultAddress,
  updateProfile,
} from "@/lib/api";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My account — BIOREZA" }] }),
  component: Account,
});
const tabs = ["Overview", "Orders", "Wishlist", "Addresses", "Settings"] as const;
function Account() {
  const { user, authHydrated, signOut, wishlist } = useStore();
  const navigate = useNavigate();
  const client = useQueryClient();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
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
          <Link to="/sign-in">Sign in</Link>
        </Button>
      </div>
    );
  const name = profile.data
    ? `${profile.data.firstName} ${profile.data.lastName}`
    : `${user.firstName} ${user.lastName}`;
  async function addAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    addressMutation.mutate({
      label: "HOME",
      receiverName: String(data["receiverName"]),
      phone: String(data["phone"]),
      country: "Egypt",
      governorate: String(data["governorate"]),
      city: String(data["city"]),
      area: String(data["area"]),
      street: String(data["street"]),
      building: String(data["building"]),
      isDefault: !addresses.data?.length,
    });
  }
  return (
    <div className="mx-auto max-w-[1560px] px-5 py-14 md:px-10 lg:py-20">
      <p className="label-xs text-gold">Client account</p>
      <h1 className="display mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)]">Welcome, {name}.</h1>
      <div className="mt-12 grid gap-14 lg:grid-cols-[220px_1fr]">
        <nav>
          <ul className="flex gap-6 overflow-auto border-b border-border pb-3 lg:flex-col lg:border-b-0 lg:border-e lg:pe-6">
            {tabs.map((item) => (
              <li key={item}>
                <button
                  onClick={() => setTab(item)}
                  className={`label-xs min-h-11 whitespace-nowrap ${tab === item ? "text-gold" : "text-taupe"}`}
                >
                  {item}
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
        <section>
          {tab === "Overview" && (
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                ["Orders", orders.data?.length ?? 0],
                ["Wishlist", wishlist.length],
                ["Addresses", addresses.data?.length ?? 0],
              ].map(([label, value]) => (
                <div key={label} className="border border-border bg-ivory p-8">
                  <p className="label-xs text-taupe">{label}</p>
                  <p className="mt-4 font-serif text-4xl">{value}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "Orders" && (
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
                  {orders.data.map((order) => (
                    <li
                      key={order.id}
                      className="flex flex-wrap items-center justify-between gap-5 py-6"
                    >
                      <div>
                        <p className="font-serif text-2xl">{order.orderNumber}</p>
                        <p className="label-xs mt-2 text-taupe">
                          {new Intl.DateTimeFormat("en-EG", {
                            dateStyle: "medium",
                            timeZone: "Africa/Cairo",
                          }).format(new Date(order.placedAt))}
                        </p>
                      </div>
                      <span className="label-xs text-gold">
                        {order.status.replaceAll("_", " ")}
                      </span>
                      <span className="font-serif text-xl">
                        {formatPrice(order.grandTotal / 100)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty icon={<Package />} text="No orders yet." />
              )}
            </div>
          )}
          {tab === "Wishlist" && (
            <Empty
              text={
                wishlist.length
                  ? `${wishlist.length} saved product${wishlist.length === 1 ? "" : "s"}. Open the shop to revisit them.`
                  : "Your wishlist is empty."
              }
            />
          )}
          {tab === "Addresses" && (
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
                        onClick={() =>
                          void deleteAddress(address.id).then(() =>
                            client.invalidateQueries({ queryKey: ["account", "addresses"] }),
                          )
                        }
                        aria-label="Delete address"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <form
                onSubmit={addAddress}
                className="mt-10 grid gap-5 border-t border-border pt-8 sm:grid-cols-2"
              >
                <h2 className="font-serif text-2xl sm:col-span-2">Add a delivery address</h2>
                {["receiverName", "phone", "governorate", "city", "area", "street", "building"].map(
                  (field) => (
                    <label key={field} className="label-xs text-taupe">
                      {field.replace(/([A-Z])/g, " $1")}
                      <input
                        name={field}
                        required
                        className="mt-2 h-12 w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
                      />
                    </label>
                  ),
                )}
                <Button
                  type="submit"
                  variant="solid"
                  size="pill"
                  disabled={addressMutation.isPending}
                >
                  Save address
                </Button>
              </form>
            </div>
          )}
          {tab === "Settings" && (
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
              <Button type="submit" variant="solid" size="pill">
                Save changes
              </Button>
            </form>
          )}
        </section>
      </div>
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
