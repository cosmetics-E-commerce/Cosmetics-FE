import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InformationPage, PolicyList } from "@/components/content/InformationPage";
import { breadcrumbSchema, createSeoHead, faqPageSchema, jsonLd } from "@/lib/seo";

const faqItems = [
  {
    id: "payment-methods",
    question: "What are the available payment methods?",
    answer:
      "We offer secure and convenient payment options to make your shopping experience simple and hassle-free. You can complete your order using InstaPay, Vodafone Cash, or Cash on Delivery (COD). Choose the payment method that suits you best and enjoy a seamless shopping experience with BioReza.",
  },
  {
    id: "after-order",
    question: "What happens after I place my order?",
    answer:
      "After your order is placed, our team will contact you within 24 hours to confirm your order details and delivery information. Once confirmed, your order will be carefully packed, quality checked, and prepared for shipment to ensure it arrives in perfect condition. Thank you for choosing BioReza. Where Confidence Begins.",
  },
] as const;

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...createSeoHead({
      title: "Frequently Asked Questions",
      description:
        "Find answers about BioReza payment methods, order confirmation, preparation, and delivery.",
      path: "/faq",
      locale: "en",
      alternates: false,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Frequently Asked Questions", path: "/faq" },
        ]),
      ),
      jsonLd(faqPageSchema(faqItems)),
    ],
  }),
  component: FrequentlyAskedQuestions,
});

function FrequentlyAskedQuestions() {
  const [interactive, setInteractive] = useState(false);

  useEffect(() => setInteractive(true), []);

  return (
    <InformationPage
      eyebrow="Customer care"
      title="Frequently asked questions"
      intro="Clear answers to the questions customers ask most often before and after ordering from BioReza."
    >
      <Accordion type="single" collapsible className="bio-faq-list">
        <AccordionItem value="payment-methods">
          <AccordionTrigger disabled={!interactive}>
            What are the available payment methods?
          </AccordionTrigger>
          <AccordionContent>
            <div className="bio-faq-answer">
              <p>
                We offer secure and convenient payment options to make your shopping experience
                simple and hassle-free.
              </p>
              <p>You can complete your order using one of the following methods:</p>
              <PolicyList>
                <li>InstaPay</li>
                <li>Vodafone Cash</li>
                <li>Cash on Delivery (COD)</li>
              </PolicyList>
              <p>
                Choose the payment method that suits you best and enjoy a seamless shopping
                experience with BioReza.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="after-order">
          <AccordionTrigger disabled={!interactive}>
            What happens after I place my order?
          </AccordionTrigger>
          <AccordionContent>
            <div className="bio-faq-answer">
              <p>
                After your order is placed, our team will contact you within 24 hours to confirm
                your order details and delivery information.
              </p>
              <p>
                Once confirmed, your order will be carefully packed, quality checked, and prepared
                for shipment to ensure it arrives in perfect condition.
              </p>
              <p>Thank you for choosing BioReza. Where Confidence Begins.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </InformationPage>
  );
}
