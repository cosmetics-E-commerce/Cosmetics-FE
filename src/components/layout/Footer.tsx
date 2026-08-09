import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiErrorMessage, subscribeNewsletter } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Primitives";

const socialLinks = [
  {
    label: "Instagram",
    href: import.meta.env["VITE_INSTAGRAM_URL"] as string | undefined,
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: import.meta.env["VITE_FACEBOOK_URL"] as string | undefined,
    icon: Facebook,
  },
  {
    label: "YouTube",
    href: import.meta.env["VITE_YOUTUBE_URL"] as string | undefined,
    icon: Youtube,
  },
].filter((item): item is { label: string; href: string; icon: typeof Instagram } =>
  Boolean(item.href),
);

const shopLinks = [
  { label: "Skincare", category: "skincare" },
  { label: "Makeup", category: "makeup" },
  { label: "Haircare", category: "haircare" },
  { label: "Fragrance", category: "fragrance" },
];

const careLinks = [
  { label: "footer.contact" as const, to: "/contact" as const },
  { label: "footer.shipping" as const, to: "/shipping-policy" as const },
  { label: "footer.returns" as const, to: "/returns" as const },
  { label: "footer.privacy" as const, to: "/privacy" as const },
  { label: "footer.terms" as const, to: "/terms" as const },
  { label: "footer.cookies" as const, to: "/cookies" as const },
];

const paymentMethods = [
  {
    label: "InstaPay",
    src: "/payment-methods/instapay.png",
    className: "payment-method-logo--instapay",
    width: 512,
    height: 512,
  },
  {
    label: "Vodafone Cash",
    src: "/payment-methods/vodafone-cash.png",
    className: "payment-method-logo--vodafone",
    width: 500,
    height: 500,
  },
  {
    label: "Trading Icon - Page - Cash On Delivery Icon @clipartmax.com",
    src: "https://www.clipartmax.com/png/small/219-2198967_trading-icon-page-cash-on-delivery-icon.png",
    className: "payment-method-logo--cash",
    width: 300,
    height: 300,
  },
] as const;

/*const columns = [
  {
    title: "Shop",
    links: ["Skincare", "Makeup", "Haircare", "Fragrance", "New Arrivals", "Gift Sets"],
  },
  {
    title: "Customer Care",
    links: [
      "Contact Us",
      "Shipping & Delivery",
      "Returns & Exchanges",
      "Order Tracking",
      "FAQ",
      "Beauty Advisor",
    ],
  },
  {
    title: "About BIOREZA",
    links: ["Our Story", "Science & Ingredients", "Sustainability", "Journal", "Stores", "Careers"],
  },
];*/

export function Footer() {
  const { locale, t } = useI18n();
  const [subscribing, setSubscribing] = useState(false);
  return (
    <footer className="border-t border-border bg-ivory">
      <div className="mx-auto max-w-[1560px] px-5 py-20 md:px-10">
        <Reveal
          stagger
          staggerMs={45}
          distance={24}
          className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"
        >
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="" aria-hidden="true" className="h-12 w-auto" />
              <span className="font-serif text-xl tracking-[0.3em]">BIOREZA</span>
            </div>
            <p className="label-xs mt-4 text-gold">Science. Beauty. Confidence.</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Advanced skincare and curated beauty, developed with dermatological rigour and
              finished with quiet European elegance.
            </p>
            <div className="mt-8">
              <h3 className="label-xs text-taupe">{t("newsletter.label")}</h3>
              <form
                className="mt-4 flex items-center gap-3 border-b border-gold/40 pb-2"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (subscribing) return;
                  const form = event.currentTarget;
                  const email = new FormData(form).get("email");
                  if (typeof email !== "string") return;
                  setSubscribing(true);
                  try {
                    await subscribeNewsletter(email, locale);
                    form.reset();
                    toast.success(t("newsletter.success"));
                  } catch (error) {
                    toast.error(apiErrorMessage(error, locale));
                  } finally {
                    setSubscribing(false);
                  }
                }}
              >
                <label htmlFor="footer-email" className="sr-only">
                  {t("newsletter.email")}
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder={t("newsletter.email")}
                  className="min-h-11 w-full bg-transparent text-base outline-none placeholder:text-taupe/70 md:text-sm"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  aria-busy={subscribing || undefined}
                  className="label-xs inline-flex min-h-11 shrink-0 items-center gap-2 text-gold transition-colors duration-150 hover:text-foreground disabled:cursor-wait disabled:opacity-70"
                >
                  <span className="inline-grid size-4 place-items-center" aria-hidden="true">
                    {subscribing ? <LoaderCircle className="size-4 animate-spin" /> : null}
                  </span>
                  {t("newsletter.subscribe")}
                </button>
              </form>
            </div>
            <div className="mt-8 flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center border border-border text-taupe transition-colors duration-180 hover:border-gold hover:text-gold"
                >
                  <Icon strokeWidth={1} className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="label-xs text-taupe">{t("nav.shop")}</h3>
            <ul className="mt-6 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.category}>
                  <Link
                    to="/shop"
                    search={{ category: link.category }}
                    className="inline-flex min-h-11 items-center text-sm text-foreground/80 transition-colors duration-180 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label-xs text-taupe">{t("footer.care")}</h3>
            <ul className="mt-6 space-y-3">
              {careLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex min-h-11 items-center text-sm text-foreground/80 transition-colors duration-180 hover:text-gold"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label-xs text-taupe">BIOREZA</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  to="/journal"
                  className="inline-flex min-h-11 items-center text-sm text-foreground/80 hover:text-gold"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  className="inline-flex min-h-11 items-center text-sm text-foreground/80 hover:text-gold"
                >
                  {t("nav.offers")}
                </Link>
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="rule-gold my-12" />

        <Reveal
          stagger
          distance={18}
          className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
            <p>Client care — Egypt</p>
            <p>hello@bioreza.com</p>
            <p>Mon–Sat, 9:00–19:00 Cairo</p>
          </div>
          <ul
            aria-label={locale === "ar" ? "طرق الدفع المقبولة" : "Accepted payment methods"}
            className="flex flex-wrap items-center gap-3"
          >
            {paymentMethods.map((method) => (
              <li key={method.label} className="payment-method-logo">
                <img
                  src={method.src}
                  alt={method.label}
                  width={method.width}
                  height={method.height}
                  loading="lazy"
                  decoding="async"
                  className={method.className}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1560px] flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} BIOREZA Cosmetics. {t("footer.rights")}
          </p>
          <ul className="flex flex-wrap gap-6">
            {careLinks.slice(1).map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-gold">
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
