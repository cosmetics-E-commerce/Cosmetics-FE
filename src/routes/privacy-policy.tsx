import { createFileRoute } from "@tanstack/react-router";
import {
  CustomerCarePhone,
  InformationPage,
  InformationSection,
  PolicyList,
} from "@/components/content/InformationPage";
import { breadcrumbSchema, createSeoHead, jsonLd } from "@/lib/seo";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "information", label: "Information we collect" },
  { id: "use", label: "How we use information" },
  { id: "privacy", label: "Your privacy matters" },
  { id: "security", label: "Data security" },
  { id: "rights", label: "Your rights" },
  { id: "updates", label: "Policy updates" },
];

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    ...createSeoHead({
      title: "Privacy Policy",
      description:
        "Learn how BioReza collects, uses, protects, and respects your personal information when you browse or place an order.",
      path: "/privacy-policy",
      locale: "en",
      alternates: false,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]),
      ),
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <InformationPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="At BioReza, your privacy is important to us. We are committed to protecting your personal information and providing a secure, transparent, and trusted shopping experience."
      sections={sections}
    >
      <InformationSection id="introduction" title="Introduction">
        <p>
          At BioReza, your privacy is important to us. We are committed to protecting your personal
          information and providing a secure, transparent, and trusted shopping experience.
        </p>
      </InformationSection>

      <InformationSection id="information" title="Information we collect">
        <p>
          When you visit our website or place an order, we may collect the following information:
        </p>
        <PolicyList>
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Shipping Address</li>
          <li>Payment Information, only when required to complete your purchase</li>
        </PolicyList>
      </InformationSection>

      <InformationSection id="use" title="How we use your information">
        <p>Your information is collected solely to:</p>
        <PolicyList>
          <li>Process and fulfill your orders.</li>
          <li>Arrange shipping and delivery.</li>
          <li>Provide customer support.</li>
          <li>Contact you regarding your order or account.</li>
          <li>Improve your shopping experience.</li>
          <li>Send promotional offers and updates, only if you choose to receive them.</li>
        </PolicyList>
      </InformationSection>

      <InformationSection id="privacy" title="Your privacy matters">
        <p>We respect your privacy.</p>
        <p>
          BioReza never sells, rents, or shares your personal information with third parties for
          marketing purposes.
        </p>
        <p>
          Your information is only shared with trusted service providers when necessary to complete
          your order, such as shipping companies or payment service providers.
        </p>
      </InformationSection>

      <InformationSection id="security" title="Data security">
        <p>
          We implement appropriate security measures to protect your personal information from
          unauthorized access, misuse, or disclosure.
        </p>
        <p>Your data is handled with the highest level of confidentiality and care.</p>
      </InformationSection>

      <InformationSection id="rights" title="Your rights">
        <p>You may request to:</p>
        <PolicyList>
          <li>Access your personal information.</li>
          <li>Update or correct your information.</li>
          <li>Request the deletion of your personal data, where applicable.</li>
        </PolicyList>
        <p>For any privacy-related inquiries, please contact our Customer Care Team.</p>
        <CustomerCarePhone label="Customer care" />
      </InformationSection>

      <InformationSection id="updates" title="Updates to this policy">
        <p>BioReza reserves the right to update this Privacy Policy when necessary.</p>
        <p>
          Any changes will be published on this page and become effective immediately upon posting.
        </p>
        <p>
          By using the BioReza website or placing an order, you acknowledge that you have read and
          agree to this Privacy Policy.
        </p>
      </InformationSection>
    </InformationPage>
  );
}
