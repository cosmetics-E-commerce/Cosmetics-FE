import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-lg)] text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-180 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 motion-safe:active:scale-[0.985] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-none hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-none hover:bg-[var(--color-error-hover)]",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-surface)] text-foreground shadow-none hover:border-[var(--color-border-strong)] hover:bg-[var(--color-secondary-hover)] hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-none hover:bg-[var(--color-secondary-hover)]",
        ghost: "text-foreground hover:bg-[var(--color-secondary)] hover:text-foreground",
        link: "text-[var(--color-link)] underline-offset-4 hover:translate-y-0 hover:text-[var(--color-link-hover)] hover:underline",
        solid: "premium-button label-sm",
        line: "label-sm border border-gold/60 bg-transparent text-foreground hover:border-gold hover:bg-[var(--color-accent-soft)] hover:text-foreground",
        quiet:
          "label-sm border border-border bg-transparent text-foreground hover:border-[var(--color-border-strong)] hover:bg-[var(--color-secondary)]",
        underline:
          "label-sm h-auto rounded-none border-b border-gold/50 px-0 pb-1 text-foreground hover:translate-y-0 hover:border-gold hover:text-[var(--color-link-hover)]",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-10 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8",
        pill: "h-12 px-9",
        wide: "h-14 w-full px-8",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, children, disabled, ...props },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Slot>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        {...props}
      >
        <span
          className={cn("inline-flex items-center justify-center gap-2", loading && "invisible")}
        >
          {children}
        </span>
        {loading && <LoaderCircle className="absolute animate-spin" aria-hidden="true" />}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
