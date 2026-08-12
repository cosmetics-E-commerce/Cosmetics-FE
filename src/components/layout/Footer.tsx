import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, RotateCcw, ShieldCheck, Truck, Youtube } from "lucide-react";
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

const careLinks = [
  { label: "footer.contact" as const, to: "/contact" as const },
  { label: "footer.shipping" as const, to: "/shipping-policy" as const },
  { label: "footer.returns" as const, to: "/returns" as const },
  { label: "footer.privacy" as const, to: "/privacy" as const },
  { label: "footer.terms" as const, to: "/terms" as const },
  { label: "footer.cookies" as const, to: "/cookies" as const },
];

const legalLinks = careLinks.slice(3);

const shopLinks = [
  { label: "nav.shop" as const, to: "/shop" as const },
  { label: "nav.categories" as const, to: "/shop" as const },
  { label: "nav.new" as const, to: "/shop" as const },
  { label: "nav.offers" as const, to: "/offers" as const },
];

const servicePillars = [
  {
    icon: ShieldCheck,
    en: "100% original",
    ar: "منتجات أصلية",
  },
  {
    icon: Truck,
    en: "Fast delivery",
    ar: "توصيل سريع",
  },
  {
    icon: RotateCcw,
    en: "Easy returns",
    ar: "استرجاع سهل",
  },
];

const paymentMethods = [
  {
    label: "InstaPay",
    src: "/payment-methods/instapay-clean.png",
    className: "payment-method-logo--instapay",
    width: 512,
    height: 512,
  },
  {
    label: "Vodafone Cash",
    src: "/payment-methods/vodafone-icon.svg",
    className: "payment-method-logo--vodafone",
    width: 504,
    height: 380,
  },
  {
    label: "Cash on delivery",
    src: "/payment-methods/cash-sharp-svgrepo-com.svg",
    className: "payment-method-logo--cash",
    width: 800,
    height: 800,
  },
] as const;

export function Footer() {
  const { locale, t } = useI18n();
  const ar = locale === "ar";

  return (
    <footer className="site-footer">
      <div className="site-footer__body">
        <div className="sf-shell">
          <Reveal stagger staggerMs={55} distance={18} className="site-footer__main">
            <div className="site-footer__brand-column">
              <Link to="/" className="site-footer__brand" aria-label="BIOREZA home">
                <img src="/bioreza-logo.png" alt="" aria-hidden="true" width={64} height={64} />
                <span>
                  BIOREZA
                  <small>COSMETICS</small>
                </span>
              </Link>
              <p className="site-footer__tagline">
                {ar
                  ? "منتجات عناية وجمال مختارة بعناية، بتجربة شراء هادئة وآمنة."
                  : "Curated beauty essentials with secure checkout and careful delivery across Egypt."}
              </p>
              <ul
                className="site-footer__badges"
                aria-label={ar ? "مميزات المتجر" : "Store benefits"}
              >
                {servicePillars.map(({ icon: Icon, en, ar: arabic }) => (
                  <li key={en}>
                    <Icon strokeWidth={1.55} aria-hidden="true" />
                    <span>{ar ? arabic : en}</span>
                  </li>
                ))}
              </ul>
            </div>

            <nav className="site-footer__navigation" aria-label="Footer navigation">
              <div className="site-footer__link-group">
                <h2>{ar ? "تسوقي" : "Explore"}</h2>
                <ul className="site-footer__primary-links">
                  {shopLinks.map((link) => (
                    <li key={`${link.label}-${link.to}`}>
                      <Link to={link.to}>{t(link.label)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="site-footer__link-group">
                <h2>{t("footer.care")}</h2>
                <ul className="site-footer__primary-links">
                  {careLinks.slice(0, 3).map((link) => (
                    <li key={link.to}>
                      <Link to={link.to}>{t(link.label)}</Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/journal">{t("nav.about")}</Link>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="site-footer__connect">
              <div className="site-footer__connect-card">
                <p className="site-footer__eyebrow">{ar ? "دفع آمن" : "Secure payments"}</p>
                <div className="site-footer__payments">
                  <ul
                    aria-label={locale === "ar" ? "طرق الدفع المقبولة" : "Accepted payment methods"}
                  >
                    {paymentMethods.map((method) => (
                      <li key={method.label}>
                        <img
                          src={method.src}
                          alt={method.label}
                          width={method.width}
                          height={method.height}
                          decoding="async"
                          className={method.className}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                {socialLinks.length > 0 ? (
                  <ul className="site-footer__socials" aria-label="Social media">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                      <li key={label}>
                        <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                          <Icon strokeWidth={1.45} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="site-footer__bottom">
          <div className="sf-shell site-footer__bottom-layout">
            <p>
              © {new Date().getFullYear()} BIOREZA Cosmetics. {t("footer.rights")}
            </p>
            <ul>
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{t(link.label)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
