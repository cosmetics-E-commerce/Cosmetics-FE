import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-24 w-full rounded-[var(--radius-lg)] border border-input bg-[var(--color-input-background)] px-3 py-2 text-base text-foreground shadow-none transition-[border-color,box-shadow,background-color,color] duration-150 placeholder:text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)] disabled:text-[var(--color-text-muted)] disabled:opacity-70 disabled:hover:border-input md:text-sm",
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
