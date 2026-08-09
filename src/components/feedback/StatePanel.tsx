import type { ReactNode } from "react";
import { AlertCircle, PackageOpen, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StateKind = "empty" | "error" | "search";

const icons = {
  empty: PackageOpen,
  error: AlertCircle,
  search: SearchX,
};

export function StatePanel({
  kind = "empty",
  title,
  description,
  action,
  actionLabel,
  secondaryAction,
  secondaryLabel,
  className,
  children,
}: {
  kind?: StateKind;
  title: string;
  description: string;
  action?: () => void;
  actionLabel?: string;
  secondaryAction?: () => void;
  secondaryLabel?: string;
  className?: string;
  children?: ReactNode;
}) {
  const Icon = icons[kind];

  return (
    <section
      className={cn("state-panel border border-border px-6 py-14 text-center sm:px-10", className)}
      role={kind === "error" ? "alert" : "status"}
      aria-live={kind === "error" ? "assertive" : "polite"}
    >
      <span
        className={cn(
          "mx-auto grid size-11 place-items-center border",
          kind === "error" ? "border-destructive/30 text-destructive" : "border-gold/40 text-gold",
        )}
        aria-hidden="true"
      >
        <Icon className="size-5" strokeWidth={1.4} />
      </span>
      <h2 className="mt-6 font-serif text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children}
      {(action || secondaryAction) && (
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {action && actionLabel && (
            <Button type="button" variant="solid" size="pill" onClick={action}>
              {actionLabel}
            </Button>
          )}
          {secondaryAction && secondaryLabel && (
            <Button type="button" variant="quiet" size="pill" onClick={secondaryAction}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
