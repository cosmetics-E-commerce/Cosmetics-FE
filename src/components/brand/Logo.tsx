import { Link } from "@tanstack/react-router";

export function Logo({
  size = "md",
  tagline = true,
}: {
  size?: "sm" | "md" | "lg";
  tagline?: boolean;
}) {
  const mark = size === "lg" ? "h-14" : size === "sm" ? "h-8" : "h-9 sm:h-11";
  const word = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-lg sm:text-xl";

  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="BIOREZA home">
      <img
        src="/favicon.png"
        alt=""
        aria-hidden="true"
        className={`${mark} w-auto transition-transform duration-700 group-hover:-translate-y-0.5`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`${word} font-serif tracking-[0.22em] text-foreground sm:tracking-[0.3em]`}
          style={{ fontWeight: 400 }}
        >
          BIOREZA
        </span>
        {tagline && <span className="label-xs mt-1.5 text-[0.5rem] text-gold">Cosmetics</span>}
      </span>
    </Link>
  );
}
