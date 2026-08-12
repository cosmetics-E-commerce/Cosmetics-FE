import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  size = "md",
  tagline = true,
}: {
  size?: "sm" | "md" | "lg";
  tagline?: boolean;
}) {
  return (
    <Link to="/" className={cn("brand-logo", `brand-logo--${size}`)} aria-label="BIOREZA home">
      <img
        src="/bioreza-logo.png"
        alt=""
        width={64}
        height={64}
        aria-hidden="true"
        className="brand-logo__mark"
      />
      <span className="brand-logo__type">
        <span className="brand-logo__wordmark">BIOREZA</span>
        {tagline && <span className="brand-logo__descriptor">Cosmetics</span>}
      </span>
    </Link>
  );
}
