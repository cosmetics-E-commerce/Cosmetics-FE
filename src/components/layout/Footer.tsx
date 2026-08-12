import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
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
    src: "/payment-methods/vodafone-svgrepo-com.svg",
    className: "payment-method-logo--vodafone",
    width: 800,
    height: 800,
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

  return (
    <footer className="site-footer">
      <div className="site-footer__body">
        <div className="sf-shell">
          <Reveal stagger staggerMs={55} distance={18} className="site-footer__main">
            <div className="site-footer__brand-column">
              <Link to="/" className="site-footer__brand" aria-label="BIOREZA home">
                <img src="/favicon.png" alt="" aria-hidden="true" width={64} height={64} />
                <span>BIOREZA</span>
              </Link>
            </div>

            <nav className="site-footer__navigation" aria-label="Footer navigation">
              <ul className="site-footer__primary-links">
                <li>
                  <Link to="/shop">{t("nav.shop")}</Link>
                </li>
                <li>
                  <Link to="/journal">{t("nav.about")}</Link>
                </li>
                <li>
                  <Link to="/offers">{t("nav.offers")}</Link>
                </li>
                {careLinks.slice(0, 3).map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{t(link.label)}</Link>
                  </li>
                ))}
              </ul>
              {socialLinks.length > 0 ? (
                <ul className="site-footer__socials" aria-label="Social media">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                        <Icon strokeWidth={1.35} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </nav>

            <div className="site-footer__payments">
              <ul aria-label={locale === "ar" ? "طرق الدفع المقبولة" : "Accepted payment methods"}>
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
