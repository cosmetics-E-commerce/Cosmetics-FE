import { Link } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function Logo({
  size = "md",
  variant = "auto",
}: {
  size?: "sm" | "md" | "lg";
  variant?: "auto" | "dark" | "light" | "soft-gold";
}) {
  const isPriority = variant === "auto";
  const returnToHero = (event: MouseEvent<HTMLAnchorElement>) => {
    const hero = document.getElementById("home-hero");
    if (!hero) return;
    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    hero.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <Link
      to="/"
      hash="home-hero"
      onClick={returnToHero}
      className={cn("brand-logo", `brand-logo--${size}`)}
      data-variant={variant}
      aria-label="BIOREZA — Back to homepage"
    >
      <span className="brand-logo__art" aria-hidden="true">
        {(variant === "auto" || variant === "dark") && (
          <img
            src="/brand/bioreza-lockup-dark.png"
            alt=""
            width={976}
            height={241}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "auto"}
            decoding="async"
            className="brand-logo__asset brand-logo__asset--dark"
          />
        )}
        {(variant === "auto" || variant === "light") && (
          <img
            src="/brand/bioreza-lockup-light.png"
            alt=""
            width={976}
            height={241}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "auto"}
            decoding="async"
            className="brand-logo__asset brand-logo__asset--light"
          />
        )}
        {variant === "soft-gold" && (
          <img
            src="/brand/bioreza-lockup-soft-gold.png"
            alt=""
            width={976}
            height={241}
            loading="lazy"
            fetchPriority="auto"
            decoding="async"
            className="brand-logo__asset brand-logo__asset--soft-gold"
          />
        )}
      </span>
    </Link>
  );
}
