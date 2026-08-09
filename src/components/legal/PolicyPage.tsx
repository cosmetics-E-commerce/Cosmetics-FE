import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/motion/Primitives";

export type PolicySection = { heading: string; body: string[] };

export function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
  arabic,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
  arabic: { eyebrow: string; title: string; intro: string; sections: PolicySection[] };
}) {
  const { locale } = useStore();
  const content = locale === "ar" ? arabic : { eyebrow, title, intro, sections };
  return (
    <article className="mx-auto max-w-4xl px-5 py-16 md:px-10 lg:py-24">
      <Reveal stagger staggerMs={70} distance={20}>
        <p className="label-xs text-gold">{content.eyebrow}</p>
        <h1 className="display mt-5 text-[clamp(2.5rem,5vw,4rem)]">{content.title}</h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">{content.intro}</p>
        <p className="label-xs mt-6 text-taupe">
          {locale === "ar" ? "آخر تحديث: 9 أغسطس 2026" : "Last updated: 9 August 2026"}
        </p>
        <div className="rule-gold my-12" />
      </Reveal>
      <div className="space-y-12">
        {content.sections.map((section, index) => (
          <Reveal
            as="section"
            key={section.heading}
            delay={Math.min(index * 35, 140)}
            distance={20}
          >
            <h2 className="font-serif text-3xl">{section.heading}</h2>
            <div className="mt-5 space-y-4 text-[0.95rem] leading-7 text-muted-foreground">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground">
        {locale === "ar" ? "هل لديك سؤال؟ " : "Questions? "}
        <Link to="/contact" className="text-gold underline-offset-4 hover:underline">
          {locale === "ar" ? "تواصلي مع خدمة العملاء" : "Contact customer care"}
        </Link>
        .
      </Reveal>
    </article>
  );
}
