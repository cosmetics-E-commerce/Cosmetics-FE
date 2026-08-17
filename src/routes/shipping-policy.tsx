import { createFileRoute } from "@tanstack/react-router";
import {
  CustomerCarePhone,
  InformationPage,
  InformationSection,
  PolicyList,
} from "@/components/content/InformationPage";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, createSeoHead, jsonLd } from "@/lib/seo";

const sections = [
  { id: "confirmation", label: "Order confirmation" },
  { id: "delivery", label: "Delivery" },
  { id: "support", label: "Customer support" },
  { id: "business-days", label: "Business days" },
  { id: "shipping-time", label: "Shipping time" },
  { id: "cancellation", label: "Order cancellation" },
];

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    ...createSeoHead({
      title: "Shipping & Delivery",
      description:
        "BioReza order confirmation, delivery times across Egypt, business days, customer support, and cancellation information.",
      path: "/shipping-policy",
      locale: "en",
      alternates: false,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Shipping & Delivery", path: "/shipping-policy" },
        ]),
      ),
    ],
  }),
  component: ShippingAndDelivery,
});

function ShippingAndDelivery() {
  return (
    <InformationPage
      eyebrow="Customer care"
      title="Shipping & delivery"
      intro="At BioReza, we are committed to making your shopping experience smooth, reliable, and worry-free."
      sections={sections}
    >
      <InformationSection id="confirmation" title="Order confirmation">
        <p>
          Once your order is placed, our Customer Care Team will contact you within 24 hours to
          confirm your:
        </p>
        <PolicyList>
          <li>order details</li>
          <li>delivery information</li>
          <li>payment method, if applicable</li>
        </PolicyList>
      </InformationSection>

      <InformationSection id="delivery" title="Delivery">
        <p>
          After your order is confirmed, it will be carefully prepared and handed over to our
          shipping partner.
        </p>
        <p>
          We continuously monitor the delivery process and will keep you informed in case of any
          unexpected delays.
        </p>
        <p>
          If we are unable to reach you or complete the delivery, our team will contact you to help
          resolve the issue as quickly as possible.
        </p>
      </InformationSection>

      <InformationSection id="support" title="Need assistance?">
        <p>
          If you have any questions before or after receiving your order, our Customer Care Team is
          always happy to help.
        </p>
        <CustomerCarePhone label="Customer support" />
      </InformationSection>

      <InformationSection id="business-days" title="Business days">
        <p>Our official working days are:</p>
        <p className="bio-policy-emphasis">{siteConfig.customerCare.businessDays}</p>
        <p>
          Fridays and official public holidays are considered non-business days for both BioReza and
          our shipping partners.
        </p>
      </InformationSection>

      <InformationSection
        id="shipping-time"
        title="Shipping time"
        lead="At BioReza, we work hard to ensure your order reaches you as quickly and safely as possible."
      >
        <p>
          After your order has been confirmed, it will be carefully prepared and shipped according
          to your location.
        </p>
        <div className="bio-delivery-windows" aria-label="Delivery estimates">
          <div className="bio-delivery-window">
            <span>Cairo &amp; Giza</span>
            <strong>1–3 business days</strong>
          </div>
          <div className="bio-delivery-window">
            <span>All other governorates</span>
            <strong>3–5 business days</strong>
          </div>
        </div>
        <p>
          Once your order is dispatched, the shipping company will contact you with your delivery
          details.
        </p>
        <p>
          For Cash on Delivery orders, you may also receive a confirmation message including the
          payable amount and courier information.
        </p>
      </InformationSection>

      <InformationSection id="cancellation" title="Order cancellation">
        <p>If you wish to cancel your order, you may do so within:</p>
        <p className="bio-policy-emphasis">24 hours of placing it</p>
        <p>provided that the order has not yet been shipped.</p>
        <p>To request a cancellation or get assistance, contact our Customer Care Team.</p>
        <CustomerCarePhone label="Request cancellation" />
      </InformationSection>
    </InformationPage>
  );
}
