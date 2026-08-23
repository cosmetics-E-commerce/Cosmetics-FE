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
import { useStore } from "@/lib/store";

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
  head: ({ match }) => {
    const ar = match.search.lang === "ar";
    return {
      ...createSeoHead({
        title: ar ? "الأسئلة الشائعة" : "Frequently Asked Questions",
        description: ar
          ? "إجابات عن طرق الدفع وتأكيد الطلب وتجهيزه وتوصيله من بيوريزا."
          : "Find answers about BioReza payment methods, order confirmation, preparation, and delivery.",
        path: "/faq",
        locale: ar ? "ar" : "en",
      }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: ar ? "الرئيسية" : "Home", path: "/" },
            { name: ar ? "الأسئلة الشائعة" : "Frequently Asked Questions", path: "/faq" },
          ]),
        ),
        jsonLd(faqPageSchema(ar ? faqItemsAr : faqItems)),
      ],
    };
  },
  component: FrequentlyAskedQuestions,
});

function FrequentlyAskedQuestions() {
  const [interactive, setInteractive] = useState(false);
  const { locale } = useStore();
  const ar = locale === "ar";

  useEffect(() => setInteractive(true), []);

  return (
    <InformationPage
      eyebrow={ar ? "خدمة العملاء" : "Customer care"}
      title={ar ? "الأسئلة الشائعة" : "Frequently asked questions"}
      intro={
        ar
          ? "إجابات واضحة عن أكثر الأسئلة شيوعاً قبل الطلب من بيوريزا وبعده."
          : "Clear answers to the questions customers ask most often before and after ordering from BioReza."
      }
    >
      <Accordion type="single" collapsible className="bio-faq-list">
        <AccordionItem value="payment-methods">
          <AccordionTrigger disabled={!interactive}>
            {ar ? "ما طرق الدفع المتاحة؟" : "What are the available payment methods?"}
          </AccordionTrigger>
          <AccordionContent>
            <div className="bio-faq-answer">
              <p>
                {ar
                  ? "نوفر طرق دفع آمنة ومريحة لتكون تجربة التسوق بسيطة وسلسة."
                  : "We offer secure and convenient payment options to make your shopping experience simple and hassle-free."}
              </p>
              <p>
                {ar
                  ? "يمكنك إتمام الطلب بإحدى الطرق التالية:"
                  : "You can complete your order using one of the following methods:"}
              </p>
              <PolicyList>
                <li>InstaPay</li>
                <li>Vodafone Cash</li>
                <li>{ar ? "الدفع عند الاستلام" : "Cash on Delivery (COD)"}</li>
              </PolicyList>
              <p>
                {ar
                  ? "اختاري الطريقة الأنسب لكِ واستمتعي بتجربة تسوق سلسة مع بيوريزا."
                  : "Choose the payment method that suits you best and enjoy a seamless shopping experience with BioReza."}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="after-order">
          <AccordionTrigger disabled={!interactive}>
            {ar ? "ماذا يحدث بعد إتمام الطلب؟" : "What happens after I place my order?"}
          </AccordionTrigger>
          <AccordionContent>
            <div className="bio-faq-answer">
              <p>
                {ar
                  ? "بعد إتمام الطلب، سيتواصل فريقنا معكِ خلال 24 ساعة لتأكيد تفاصيل الطلب وبيانات التوصيل."
                  : "After your order is placed, our team will contact you within 24 hours to confirm your order details and delivery information."}
              </p>
              <p>
                {ar
                  ? "بعد التأكيد، يُعبأ طلبك بعناية ويخضع لفحص الجودة ثم يُجهز للشحن ليصل إليكِ بأفضل حالة."
                  : "Once confirmed, your order will be carefully packed, quality checked, and prepared for shipment to ensure it arrives in perfect condition."}
              </p>
              <p>
                {ar
                  ? "شكراً لاختيارك بيوريزا، حيث تبدأ الثقة."
                  : "Thank you for choosing BioReza. Where Confidence Begins."}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </InformationPage>
  );
}

const faqItemsAr = [
  {
    id: "payment-methods",
    question: "ما طرق الدفع المتاحة؟",
    answer: "نوفر الدفع عبر إنستاباي وفودافون كاش والدفع عند الاستلام.",
  },
  {
    id: "after-order",
    question: "ماذا يحدث بعد إتمام الطلب؟",
    answer: "يتواصل فريقنا خلال 24 ساعة لتأكيد التفاصيل، ثم يُفحص الطلب ويُجهز للشحن بعناية.",
  },
] as const;
