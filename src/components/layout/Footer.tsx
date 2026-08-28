import { Link } from "@tanstack/react-router";
import type { SVGProps } from "react";
import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Primitives";
import { Logo } from "@/components/brand/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FacebookLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" focusable="false" {...props}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971h-1.513c-1.49 0-1.956.931-1.956 1.887v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function WhatsAppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" focusable="false" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 7.021 2.91 9.83 9.83 0 0 1 2.897 7.027c-.003 5.45-4.437 9.884-9.923 9.884m8.413-18.297A11.82 11.82 0 0 0 12.055 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.689 1.448h.005c6.558 0 11.894-5.335 11.897-11.893a11.82 11.82 0 0 0-3.489-8.413Z" />
    </svg>
  );
}

function TikTokLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" focusable="false" {...props}>
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.88 2.82 2.895 2.895 0 0 1-2.894-2.894 2.895 2.895 0 0 1 2.894-2.894c.298 0 .584.049.854.134V9.315a6.38 6.38 0 0 0-.854-.062A6.347 6.347 0 0 0 3.15 15.6a6.347 6.347 0 0 0 6.344 6.347 6.347 6.347 0 0 0 6.345-6.347V8.654a8.19 8.19 0 0 0 4.806 1.533V6.743a4.85 4.85 0 0 1-1.056-.057Z" />
    </svg>
  );
}

function InstagramLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" focusable="false" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/19GapwLmi6/?mibextid=wwXIfr",
    icon: FacebookLogo,
    platform: "facebook",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/201037376443",
    icon: WhatsAppLogo,
    platform: "whatsapp",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@bioreza.eg?_r=1&_t=ZS-98dCgdiLRBp",
    icon: TikTokLogo,
    platform: "tiktok",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bioreza.eg?utm_source=qr",
    icon: InstagramLogo,
    platform: "instagram",
  },
] as const;

const careLinks = [
  { label: "footer.faq" as const, to: "/faq" as const },
  { label: "footer.shipping" as const, to: "/shipping-policy" as const },
  { label: "footer.returns" as const, to: "/returns" as const },
  { label: "footer.privacy" as const, to: "/privacy-policy" as const },
  { label: "footer.contact" as const, to: "/contact" as const },
];

const legalLinks = [
  { label: "footer.terms" as const, to: "/terms" as const },
  { label: "footer.cookies" as const, to: "/cookies" as const },
];

const shopLinks = [
  { label: "nav.shop" as const, to: "/shop" as const },
  { label: "nav.categories" as const, to: "/shop" as const },
  { label: "nav.new" as const, to: "/shop" as const },
  { label: "nav.offers" as const, to: "/offers" as const },
  { label: "nav.about" as const, to: "/about" as const },
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
    src: "/payment-methods/instapay-logo.png",
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
              <div className="site-footer__brand">
                <Logo size="lg" variant="soft-gold" />
              </div>
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
              <Accordion type="multiple" className="site-footer__accordion">
                <FooterLinkGroup
                  value="explore"
                  title={ar ? "تسوقي" : "Explore"}
                  links={shopLinks.map((link) => ({ ...link, text: t(link.label) }))}
                />
                <FooterLinkGroup
                  value="care"
                  title={t("footer.care")}
                  links={careLinks.map((link) => ({ ...link, text: t(link.label) }))}
                />
              </Accordion>
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
                          loading="lazy"
                          decoding="async"
                          className={method.className}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <ul
                  className="site-footer__socials"
                  aria-label={ar ? "روابط التواصل الاجتماعي" : "Social media"}
                >
                  {socialLinks.map(({ icon: Icon, href, label, platform }) => (
                    <li key={label}>
                      <a
                        className={`site-footer__social-link site-footer__social-link--${platform}`}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        title={label}
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="site-footer__bottom">
          <div className="sf-shell site-footer__bottom-layout">
            <p className="site-footer__copyright">
              <span>
                © {new Date().getFullYear()} BIOREZA Cosmetics. {t("footer.rights")}
              </span>
              <span className="site-footer__credit">
                {t("footer.createdBy")}{" "}
                <a href="https://hammerload.com/" target="_blank" rel="noopener noreferrer">
                  Hammerload
                </a>
              </span>
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

function FooterLinkGroup({
  value,
  title,
  links,
}: {
  value: string;
  title: string;
  links: Array<{
    to: (typeof shopLinks)[number]["to"] | (typeof careLinks)[number]["to"];
    text: string;
  }>;
}) {
  return (
    <AccordionItem value={value} className="site-footer__link-group">
      <h2 className="site-footer__desktop-heading">{title}</h2>
      <AccordionTrigger
        className="site-footer__accordion-trigger"
        indicator={<span className="site-footer__accordion-mark" aria-hidden="true" />}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent forceMount contentClassName="site-footer__accordion-panel">
        <ul className="site-footer__primary-links">
          {links.map((link) => (
            <li key={`${link.text}-${link.to}`}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
