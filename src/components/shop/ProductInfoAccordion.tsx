import { useId } from "react";

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
  const accordionId = useId();
  const availableSections = sections.filter(
    (section) => section.content.trim() || section.benefits?.length,
  );

  if (!availableSections.length) return null;

  return (
    <Accordion
      type="multiple"
      defaultValue={[]}
      className="product-info-accordion"
      aria-label={label}
    >
      {availableSections.map((section) => {
        const triggerId = `${accordionId}-${section.id}-trigger`;
        const panelId = `${accordionId}-${section.id}-panel`;

        return (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="product-info-accordion__item"
          >
            <AccordionTrigger
              id={triggerId}
              aria-controls={panelId}
              className="product-info-accordion__trigger"
              indicator={<span className="product-info-accordion__indicator" aria-hidden="true" />}
            >
              <span>{section.label}</span>
            </AccordionTrigger>
            <AccordionContent
              id={panelId}
              aria-labelledby={triggerId}
              forceMount
              contentClassName="product-info-accordion__content"
              className="product-info-accordion__body"
            >
              <div className="product-info-accordion__copy">
                {section.content ? (
                  <p
                    dir="auto"
                    className={
                      section.id === "description"
                        ? "product-reference-description-copy"
                        : section.id === "custom"
                          ? "product-how-to-use-copy"
                          : undefined
                    }
                  >
                    {section.content}
                  </p>
                ) : null}
                {section.benefits?.length ? (
                  <ul>
                    {section.benefits.map((benefit) => (
                      <li key={benefit} dir="auto">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
