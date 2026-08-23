import { useEffect, useId, useMemo, useState } from "react";
import { AlertTriangle, Check, Info, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { IngredientInfo } from "@/lib/products";

function IngredientDetails({
  ingredient,
  locale,
}: {
  ingredient: IngredientInfo;
  locale: "ar" | "en";
}) {
  const rtl = locale === "ar";
  const copy = ingredientCopy[locale];
  const description =
    (rtl ? ingredient.shortDescriptionAr : ingredient.shortDescriptionEn) ||
    (rtl ? ingredient.shortDescriptionEn : ingredient.shortDescriptionAr);
  return (
    <div className="space-y-4 text-start">
      <header className="border-b border-border/60 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {copy.inci}
        </p>
        <h3 className="mt-1 text-xl font-semibold text-foreground">{ingredient.inciName}</h3>
        {ingredient.commonName && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {copy.alsoKnownAs} {ingredient.commonName}
          </p>
        )}
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-foreground/75" dir="auto">
            {description}
          </p>
        )}
      </header>
      {ingredient.benefits.length > 0 && (
        <section>
          <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
            <Sparkles className="size-3.5" /> {copy.benefits}
          </h4>
          <ul className="space-y-1.5">
            {ingredient.benefits.map((item) => (
              <li key={item} className="flex gap-2 text-xs leading-relaxed text-foreground/75">
                <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--color-success)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
      {ingredient.concerns.length > 0 && (
        <section className="border-s-2 border-[var(--color-warning-border)] bg-[var(--color-warning-soft)] p-3">
          <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-warning)]">
            <AlertTriangle className="size-3.5" /> {copy.concerns}
          </h4>
          <ul className="space-y-1.5">
            {ingredient.concerns.map((item) => (
              <li key={item} className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
      {ingredient.goodFor.length > 0 && (
        <section>
          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
            {copy.goodFor}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {ingredient.goodFor.map((item) => (
              <span
                key={item}
                className="border border-border bg-secondary/45 px-2 py-1 text-[11px] text-foreground/75"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      )}
      {ingredient.functions.length > 0 && (
        <section>
          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
            {copy.functions}
          </h4>
          <p className="text-xs leading-relaxed text-foreground/65">
            {ingredient.functions.join(" · ")}
          </p>
        </section>
      )}
      {ingredient.avoidIf.length > 0 && (
        <section>
          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
            {copy.avoidIf}
          </h4>
          <p className="text-xs leading-relaxed text-foreground/65">
            {ingredient.avoidIf.join(" · ")}
          </p>
        </section>
      )}
      {(ingredient.regulatoryNotes || ingredient.restrictions || ingredient.safetyNotes) && (
        <section>
          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
            {copy.safety}
          </h4>
          <div className="space-y-1.5 text-xs leading-relaxed text-foreground/65">
            {ingredient.safetyNotes && <p>{ingredient.safetyNotes}</p>}
            {ingredient.regulatoryNotes && <p>{ingredient.regulatoryNotes}</p>}
            {ingredient.restrictions && <p>{ingredient.restrictions}</p>}
          </div>
        </section>
      )}
      <p className="border-t border-border/60 pt-3 text-[10px] leading-relaxed text-muted-foreground">
        {copy.disclaimer}
      </p>
    </div>
  );
}

function IngredientChip({
  ingredient,
  touchMode,
  open,
  onOpenChange,
  onTouchOpen,
  locale,
}: {
  ingredient: IngredientInfo;
  touchMode: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTouchOpen: () => void;
  locale: "ar" | "en";
}) {
  const copy = ingredientCopy[locale];
  const contentId = useId();
  const trigger = (
    <button
      type="button"
      className="group inline-flex min-h-11 items-center gap-1 border-b border-dotted border-foreground/30 text-sm text-foreground/75 outline-none transition-colors duration-150 hover:border-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={touchMode ? onTouchOpen : undefined}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open && !touchMode ? contentId : undefined}
      aria-label={copy.informationAbout(ingredient.inciName)}
    >
      {ingredient.inciName}
      <Info className="size-3 opacity-55 transition-opacity group-hover:opacity-100" />
    </button>
  );

  if (touchMode) return trigger;

  return (
    <HoverCard open={open} onOpenChange={onOpenChange} openDelay={60} closeDelay={80}>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent
        id={contentId}
        role="dialog"
        aria-label={copy.informationAbout(ingredient.inciName)}
        className="ingredient-popover-card w-[min(360px,calc(100vw-24px))] rounded-none border-border bg-background p-0 shadow-xl duration-150 data-[state=closed]:duration-100"
        side="bottom"
        sideOffset={8}
        align="start"
        avoidCollisions
        collisionPadding={12}
        sticky="always"
        hideWhenDetached
      >
        <div className="ingredient-popover-card__scroll">
          <IngredientDetails ingredient={ingredient} locale={locale} />
        </div>
        <HoverCardArrow className="fill-background stroke-border" width={12} height={6} />
      </HoverCardContent>
    </HoverCard>
  );
}

function useTouchMode() {
  const mobile = useIsMobile();
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setCoarsePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return mobile || coarsePointer;
}

export function IngredientExplorer({
  ingredients,
  fallback,
  locale,
}: {
  ingredients: IngredientInfo[];
  fallback?: string;
  locale: "ar" | "en";
}) {
  const copy = ingredientCopy[locale];
  const touchMode = useTouchMode();
  const [active, setActive] = useState<IngredientInfo | null>(null);
  const [openIngredientId, setOpenIngredientId] = useState<string | null>(null);
  const displayIngredients = useMemo(() => {
    const rawNames = (fallback ?? "")
      .split(/[,;\n]/)
      .map((name) => name.trim())
      .filter(Boolean);
    if (!rawNames.length)
      return ingredients.map((ingredient) => ({ name: ingredient.inciName, ingredient }));
    const byName = new Map<string, IngredientInfo>();
    for (const ingredient of ingredients) {
      byName.set(ingredient.inciName.trim().toLocaleLowerCase("en-US"), ingredient);
      if (ingredient.commonName)
        byName.set(ingredient.commonName.trim().toLocaleLowerCase("en-US"), ingredient);
    }
    const used = new Set<string>();
    const ordered = rawNames.map((name) => {
      const ingredient = byName.get(name.toLocaleLowerCase("en-US"));
      if (ingredient) used.add(ingredient.id);
      return { name, ingredient };
    });
    for (const ingredient of ingredients) {
      if (!used.has(ingredient.id)) ordered.push({ name: ingredient.inciName, ingredient });
    }
    return ordered;
  }, [fallback, ingredients]);
  if (!displayIngredients.length)
    return <p className="text-sm text-muted-foreground">{copy.unavailable}</p>;
  return (
    <>
      <div
        className="flex flex-wrap items-center gap-x-2.5 gap-y-2"
        aria-label={copy.productIngredients}
      >
        {displayIngredients.map(({ name, ingredient }, index) => (
          <span
            key={ingredient?.id ?? `${name}-${index}`}
            className="inline-flex items-center gap-2"
          >
            {ingredient ? (
              <IngredientChip
                ingredient={ingredient}
                touchMode={touchMode}
                open={touchMode ? active?.id === ingredient.id : openIngredientId === ingredient.id}
                onOpenChange={(open) =>
                  setOpenIngredientId((current) =>
                    open ? ingredient.id : current === ingredient.id ? null : current,
                  )
                }
                onTouchOpen={() => setActive(ingredient)}
                locale={locale}
              />
            ) : (
              <span className="ingredient-unmapped" title={copy.noProfile}>
                {name}
              </span>
            )}
            {index < displayIngredients.length - 1 && (
              <span className="text-border" aria-hidden="true">
                ·
              </span>
            )}
          </span>
        ))}
      </div>
      <Sheet open={Boolean(active)} onOpenChange={(isOpen) => !isOpen && setActive(null)}>
        <SheetContent
          side="bottom"
          className="max-h-[86dvh] overflow-y-auto rounded-t-2xl px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-3"
        >
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
          <SheetHeader className="sr-only">
            <SheetTitle>{active?.inciName ?? copy.information}</SheetTitle>
          </SheetHeader>
          {active && <IngredientDetails ingredient={active} locale={locale} />}
        </SheetContent>
      </Sheet>
    </>
  );
}

const ingredientCopy = {
  en: {
    inci: "INCI ingredient",
    alsoKnownAs: "Also known as",
    benefits: "Benefits",
    concerns: "Potential concerns",
    goodFor: "Good for",
    functions: "Functions",
    avoidIf: "Consider avoiding if",
    safety: "Safety & regulatory",
    disclaimer:
      "Ingredient information is provided for general informational purposes and does not replace professional medical advice.",
    informationAbout: (name: string) => `Information about ${name}`,
    unavailable: "Ingredient details are not available for this product yet.",
    productIngredients: "Product ingredients",
    noProfile: "No curated ingredient profile is available yet",
    information: "Ingredient information",
  },
  ar: {
    inci: "مكوّن حسب التسمية الدولية",
    alsoKnownAs: "يُعرف أيضاً باسم",
    benefits: "الفوائد",
    concerns: "محاذير محتملة",
    goodFor: "مناسب لـ",
    functions: "الوظائف",
    avoidIf: "يُفضّل تجنبه عند",
    safety: "السلامة والتنظيم",
    disclaimer: "معلومات المكونات مقدمة لأغراض توعوية عامة ولا تغني عن الاستشارة الطبية المتخصصة.",
    informationAbout: (name: string) => `معلومات عن ${name}`,
    unavailable: "تفاصيل المكونات غير متاحة لهذا المنتج حالياً.",
    productIngredients: "مكونات المنتج",
    noProfile: "لا يتوفر ملف موثق لهذا المكوّن بعد",
    information: "معلومات المكوّن",
  },
} as const;
