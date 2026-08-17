import { createFileRoute } from "@tanstack/react-router";
import {
  CustomerCarePhone,
  InformationPage,
  InformationSection,
  PolicyList,
} from "@/components/content/InformationPage";
import { breadcrumbSchema, createSeoHead, jsonLd } from "@/lib/seo";

const sections = [
  { id: "accepted", label: "Accepted cases" },
  { id: "not-accepted", label: "Non-accepted cases" },
  { id: "conditions", label: "Return conditions" },
  { id: "refunds", label: "Refunds" },
  { id: "process", label: "Return process" },
  { id: "fees", label: "Return shipping fees" },
];

export const Route = createFileRoute("/returns")({
  head: () => ({
    ...createSeoHead({
      title: "Returns & Exchanges",
      description:
        "Understand BioReza return and exchange eligibility, the 14-day request period, refunds, and the step-by-step return process.",
      path: "/returns",
      locale: "en",
      alternates: false,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Returns & Exchanges", path: "/returns" },
        ]),
      ),
    ],
  }),
  component: ReturnsAndExchanges,
});

function ReturnsAndExchanges() {
  return (
    <InformationPage
      eyebrow="Customer care"
      title="Returns & exchanges"
      intro="At BioReza, customer satisfaction is our priority. Due to the nature of skincare, haircare, and cosmetic products, certain conditions apply to returns and exchanges."
      sections={sections}
    >
      <InformationSection id="accepted" title="Returns & exchanges are accepted when">
        <p>A customer may request a return or exchange if:</p>
        <PolicyList tone="positive">
          <li>The wrong product was received.</li>
          <li>The product arrived damaged or defective.</li>
          <li>The product was opened or used before delivery.</li>
          <li>The product is missing items or is incomplete.</li>
          <li>The received product is different from the order.</li>
        </PolicyList>
      </InformationSection>

      <InformationSection id="not-accepted" title="Returns & exchanges are not accepted when">
        <p>For hygiene and safety reasons, returns or exchanges cannot be accepted if:</p>
        <PolicyList tone="restricted">
          <li>The product has been opened or used after delivery.</li>
          <li>The product is returned without its original packaging.</li>
          <li>The product is damaged due to improper use or storage.</li>
          <li>The request is made after the allowed return period.</li>
          <li>
            The product was purchased during a final sale or clearance promotion, unless it is
            defective.
          </li>
          <li>The customer changes their mind after receiving the correct product.</li>
        </PolicyList>
      </InformationSection>

      <InformationSection id="conditions" title="Return conditions">
        <p>To be eligible for a return or exchange:</p>
        <p className="bio-policy-emphasis">Request within 14 days</p>
        <PolicyList>
          <li>The request must be submitted within 14 days of receiving the order.</li>
          <li>The product must be unused, unopened, and in its original condition.</li>
          <li>All original packaging, seals, accessories, and labels must be intact.</li>
          <li>A valid receipt or proof of purchase is required.</li>
        </PolicyList>
      </InformationSection>

      <InformationSection id="refunds" title="Refunds">
        <p>
          Once the returned product has been received and inspected, our team will notify the
          customer of the status of their refund or exchange request.
        </p>
        <p>
          If approved, the refund will be processed using the original payment method whenever
          applicable.
        </p>
      </InformationSection>

      <InformationSection id="process" title="Return process">
        <ol className="bio-return-steps">
          <li className="bio-return-step">
            <span className="bio-return-step__number" aria-hidden="true">
              01
            </span>
            <div>
              <h3>Contact us</h3>
              <p>To request a return or exchange, contact our Customer Care Team.</p>
              <CustomerCarePhone label="Start a return" />
              <p>The request should include:</p>
              <PolicyList>
                <li>Order Number</li>
                <li>Product Name</li>
                <li>Reason for the return or exchange</li>
                <li>Photos, if the product is damaged, defective, or incorrect</li>
              </PolicyList>
            </div>
          </li>
          <li className="bio-return-step">
            <span className="bio-return-step__number" aria-hidden="true">
              02
            </span>
            <div>
              <h3>Eligibility review</h3>
              <p>
                Our team will carefully review the request to ensure it meets the conditions
                outlined in the Returns &amp; Exchange Policy.
              </p>
              <p>If additional information is required, we will contact the customer promptly.</p>
            </div>
          </li>
          <li className="bio-return-step">
            <span className="bio-return-step__number" aria-hidden="true">
              03
            </span>
            <div>
              <h3>Return approval</h3>
              <p>If the request is approved:</p>
              <PolicyList>
                <li>The customer will receive detailed return instructions.</li>
                <li>The product must be returned in its original condition and packaging.</li>
                <li>
                  Once received, our Quality Control Team will inspect the item before completing
                  the refund or exchange.
                </li>
              </PolicyList>
            </div>
          </li>
        </ol>
      </InformationSection>

      <InformationSection id="fees" title="Return shipping fees">
        <p>Approved refunds are processed after the returned item has been inspected.</p>
        <p>Shipping fees are non-refundable unless the return is due to:</p>
        <PolicyList>
          <li>An incorrect item sent by BioReza.</li>
          <li>A damaged or defective product.</li>
          <li>An error during order fulfillment.</li>
        </PolicyList>
      </InformationSection>
    </InformationPage>
  );
}
