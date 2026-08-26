import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Check, ChevronDown } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { customerCareTelHref, siteConfig } from "@/lib/site-config";
import { useStore } from "@/lib/store";
import "./information-pages.css";

export type InformationPageSection = {
  id: string;
  label: string;
};

export function InformationPage({
  eyebrow,
  title,
  intro,
  sections,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections?: InformationPageSection[];
  children: ReactNode;
  className?: string;
}) {
  const { locale } = useStore();
  const ar = locale === "ar";
  return (
    <article
      className={`bio-information-page ${className}`.trim()}
      lang={locale}
      dir={ar ? "rtl" : "ltr"}
    >
      <div className="bio-information-page__shell">
        <Breadcrumb className="storefront-breadcrumb bio-information-page__breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">{ar ? "الرئيسية" : "Home"}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="bio-information-page__header">
          <p className="bio-information-page__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="bio-information-page__intro">{intro}</p>
        </header>

        <div
          className={`bio-information-page__layout${sections?.length ? " bio-information-page__layout--with-nav" : ""}`}
        >
          {sections?.length ? (
            <InformationContents title={title} sections={sections} locale={locale} />
          ) : null}
          <div className="bio-information-page__body">{children}</div>
        </div>
      </div>
    </article>
  );
}

function InformationContents({
  title,
  sections,
  locale,
}: {
  title: string;
  sections: InformationPageSection[];
  locale: "en" | "ar";
}) {
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pendingSelectionRef = useRef<string | null>(null);
  const pendingHashNavigationRef = useRef<string | null>(null);
  const observerPausedUntilRef = useRef(0);
  const labelId = useId();
  const triggerId = useId();
  const navigate = useNavigate();
  const routeHash = useLocation({ select: (location) => location.hash });
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const activeSection = sections.find((section) => section.id === activeId) ?? sections[0];

  const scrollToSection = useCallback(
    (id: string, { updateHistory = true, smooth = true } = {}) => {
      const target = document.getElementById(id);
      if (!target) return;

      setActiveId(id);
      const encodedHash = `#${encodeURIComponent(id)}`;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const revealTarget = () => {
        const headerHeight =
          document.querySelector<HTMLElement>(".store-header")?.getBoundingClientRect().height ?? 0;
        const localOffset = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        const top =
          window.scrollY + target.getBoundingClientRect().top - headerHeight - localOffset;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: smooth && !reducedMotion ? "smooth" : "auto",
        });
      };

      if (updateHistory && window.location.hash !== encodedHash) {
        pendingHashNavigationRef.current = id;
        void navigate({
          hash: id,
          resetScroll: false,
          hashScrollIntoView: false,
        }).then(() => window.requestAnimationFrame(revealTarget));
      } else if (updateHistory) {
        window.requestAnimationFrame(revealTarget);
      } else {
        revealTarget();
      }
    },
    [navigate],
  );

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || typeof IntersectionObserver === "undefined") return;
    const article = nav.closest<HTMLElement>(".bio-information-page");
    const header = document.querySelector<HTMLElement>(".store-header");
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));
    let observer: IntersectionObserver | undefined;
    let frame = 0;

    const refreshObserver = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const mobile = window.matchMedia("(max-width: 700px)").matches;
        const headerHeight = Math.ceil(header?.getBoundingClientRect().height ?? 0);
        const selectorHeight = mobile ? Math.ceil(nav.getBoundingClientRect().height) : 0;
        article?.style.setProperty("--legal-selector-height", `${selectorHeight}px`);
        const observerGap =
          Number.parseFloat(
            getComputedStyle(article ?? nav).getPropertyValue("--legal-section-anchor-gap"),
          ) || Number.parseFloat(getComputedStyle(document.documentElement).fontSize) * 3;
        const documentScrollPadding =
          Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
          headerHeight;
        const documentGap = Math.max(documentScrollPadding - headerHeight, 0);
        const observedTop = Math.min(
          headerHeight + selectorHeight + Math.ceil(observerGap + documentGap) + 1,
          Math.max(window.innerHeight - 2, 1),
        );
        const observedBottom = Math.max(window.innerHeight - observedTop - 1, 0);

        observer?.disconnect();
        observer = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort(
                (left, right) =>
                  Math.abs(left.boundingClientRect.top - observedTop) -
                  Math.abs(right.boundingClientRect.top - observedTop),
              );
            const current = visible[0]?.target.id;
            if (current && performance.now() >= observerPausedUntilRef.current) {
              setActiveId(current);
            }
          },
          {
            // A one-pixel observation line sits immediately below the fixed
            // header and sticky selector. A section becomes current when its
            // region crosses that line, avoiding per-frame scroll handlers.
            rootMargin: `-${Math.round(observedTop)}px 0px -${Math.round(observedBottom)}px 0px`,
            threshold: 0,
          },
        );
        targets.forEach((target) => observer?.observe(target));
      });
    };

    refreshObserver();
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(refreshObserver);
    if (header) resizeObserver?.observe(header);
    resizeObserver?.observe(nav);
    window.addEventListener("resize", refreshObserver, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", refreshObserver);
      article?.style.removeProperty("--legal-selector-height");
    };
  }, [sections]);

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    let timer = 0;
    const id = decodeURIComponent(routeHash.replace(/^#/, ""));
    if (!sections.some((section) => section.id === id)) return;
    if (pendingHashNavigationRef.current === id) {
      pendingHashNavigationRef.current = null;
      return;
    }

    // Back/forward navigation can restore the previous scroll offset for a
    // hash entry after popstate. Keep the URL-selected section authoritative
    // while the component realigns that anchor below its sticky controls.
    observerPausedUntilRef.current = performance.now() + 750;
    setActiveId(id);
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        timer = window.setTimeout(
          () => scrollToSection(id, { updateHistory: false, smooth: false }),
          0,
        );
      });
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(timer);
    };
  }, [routeHash, scrollToSection, sections]);

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    let timer = 0;
    const syncBrowserHistoryHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!sections.some((section) => section.id === id)) return;
      pendingHashNavigationRef.current = null;
      observerPausedUntilRef.current = performance.now() + 750;
      setActiveId(id);
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          timer = window.setTimeout(
            () => scrollToSection(id, { updateHistory: false, smooth: false }),
            0,
          );
        });
      });
    };

    window.addEventListener("popstate", syncBrowserHistoryHash);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(timer);
      window.removeEventListener("popstate", syncBrowserHistoryHash);
    };
  }, [scrollToSection, sections]);

  const selectFromLink = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <nav
      ref={navRef}
      className="bio-information-page__contents"
      aria-label={locale === "ar" ? `أقسام ${title}` : `${title} sections`}
    >
      <p id={labelId}>{locale === "ar" ? "في هذه الصفحة" : "On this page"}</p>
      <ol>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={activeId === section.id ? "location" : undefined}
              onClick={(event) => selectFromLink(event, section.id)}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ol>

      <div className="bio-information-page__mobile-selector">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            ref={triggerRef}
            id={triggerId}
            className="bio-information-page__selector-trigger"
            aria-labelledby={`${labelId} ${triggerId}`}
          >
            <span>{activeSection?.label}</span>
            <ChevronDown aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={6}
            className="bio-information-page__selector-menu"
            aria-label={locale === "ar" ? `أقسام ${title}` : `${title} sections`}
            onCloseAutoFocus={(event) => {
              const selectedId = pendingSelectionRef.current;
              if (!selectedId) return;
              pendingSelectionRef.current = null;
              event.preventDefault();
              triggerRef.current?.focus({ preventScroll: true });
              window.requestAnimationFrame(() => scrollToSection(selectedId));
            }}
          >
            {sections.map((section) => (
              <DropdownMenuItem
                key={section.id}
                className="bio-information-page__selector-option"
                aria-current={activeId === section.id ? "location" : undefined}
                onSelect={() => {
                  pendingSelectionRef.current = section.id;
                }}
              >
                <span>{section.label}</span>
                {activeId === section.id ? <Check aria-hidden="true" /> : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <span className="sr-only" aria-live="polite">
        {locale === "ar" ? "القسم الحالي:" : "Current section:"} {activeSection?.label}
      </span>
    </nav>
  );
}

export function InformationSection({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="bio-information-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      {lead ? <p className="bio-information-section__lead">{lead}</p> : null}
      <div className="bio-information-section__content">{children}</div>
    </section>
  );
}

export function PolicyList({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "positive" | "restricted";
}) {
  return <ul className={`bio-policy-list bio-policy-list--${tone}`}>{children}</ul>;
}

export function CustomerCarePhone({ label = "Call customer care" }: { label?: string }) {
  return (
    <a
      className="bio-customer-care-phone"
      href={customerCareTelHref()}
      aria-label={`${label}: ${siteConfig.customerCare.phoneDisplay}`}
    >
      <span>{label}</span>
      <strong>{siteConfig.customerCare.phoneDisplay}</strong>
    </a>
  );
}
