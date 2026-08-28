import { Star } from "lucide-react";

export function Stars({ value, size = 12 }: { value: number; size?: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          width={size}
          height={size}
          strokeWidth={1}
          className={i <= Math.round(value) ? "fill-gold text-gold" : "text-greige"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
