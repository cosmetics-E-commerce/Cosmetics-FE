import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        data-form-control="textarea"
        className={cn(
          "flex min-h-24 w-full resize-y rounded-[var(--radius-lg)] border border-input bg-[var(--color-input-background)] px-3 py-2 text-base leading-relaxed text-foreground shadow-none transition-[border-color,box-shadow,background-color,color] duration-150 placeholder:text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] focus:border-ring focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/15 aria-invalid:border-destructive aria-invalid:focus:border-destructive aria-invalid:focus-visible:ring-destructive/15 disabled:cursor-not-allowed disabled:resize-none disabled:bg-[var(--color-surface-muted)] disabled:text-[var(--color-text-muted)] disabled:opacity-70 disabled:hover:border-input read-only:bg-[var(--color-surface-muted)]/55 read-only:hover:border-input md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
