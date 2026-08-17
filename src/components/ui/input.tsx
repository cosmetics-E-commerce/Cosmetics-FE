import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        data-form-control="input"
        className={cn(
          "flex h-11 w-full rounded-[var(--radius-lg)] border border-input bg-[var(--color-input-background)] px-3 py-2 text-base text-foreground shadow-none transition-[border-color,box-shadow,background-color,color] duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] focus:border-ring focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/15 aria-invalid:border-destructive aria-invalid:focus:border-destructive aria-invalid:focus-visible:ring-destructive/15 disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)] disabled:text-[var(--color-text-muted)] disabled:opacity-70 disabled:hover:border-input read-only:bg-[var(--color-surface-muted)]/55 read-only:hover:border-input md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
