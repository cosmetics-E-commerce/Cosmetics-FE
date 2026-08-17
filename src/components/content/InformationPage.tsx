import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { customerCareTelHref, siteConfig } from "@/lib/site-config";
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
  return (
    <article className={`bio-information-page ${className}`.trim()} lang="en" dir="ltr">
      <div className="bio-information-page__shell">
        <Breadcrumb className="bio-information-page__breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
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
            <nav className="bio-information-page__contents" aria-label={`${title} sections`}>
              <p>On this page</p>
              <ol>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <div className="bio-information-page__body">{children}</div>
        </div>
      </div>
    </article>
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
