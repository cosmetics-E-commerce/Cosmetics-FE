import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type ProductInfoSection = {
  id: "description" | "custom" | "delivery" | "returns";
  label: string;
  content: string;
  benefits?: string[];
};

export function ProductInfoAccordion({
  sections,
  label,
}: {
  sections: ProductInfoSection[];
  label: string;
}) {
  const availableSections = sections.filter(
    (section) => section.content.trim() || section.benefits?.length,
  );

  if (!availableSections.length) return null;

  const defaultSection =
    availableSections.find((section) => section.id === "description")?.id ??
    availableSections[0]!.id;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultSection}
      className="product-info-accordion"
      aria-label={label}
    >
      {availableSections.map((section) => (
        <AccordionItem key={section.id} value={section.id} className="product-info-accordion__item">
          <AccordionTrigger
            className="product-info-accordion__trigger"
            indicator={<span className="product-info-accordion__indicator" aria-hidden="true" />}
          >
            <span>{section.label}</span>
          </AccordionTrigger>
          <AccordionContent
            forceMount
            contentClassName="product-info-accordion__content"
            className="product-info-accordion__body"
          >
            <div className="product-info-accordion__copy">
              {section.content ? (
                <p
                  className={
                    section.id === "description" ? "product-reference-description-copy" : undefined
                  }
                >
                  {section.content}
                </p>
              ) : null}
              {section.benefits?.length ? (
                <ul>
                  {section.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
