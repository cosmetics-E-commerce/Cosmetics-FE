import { Check, ChevronDown, MapPin } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface LocationOption {
  id: string;
  name: string;
  nameAr?: string | null;
}

export function LocationCombobox({
  id,
  label,
  value,
  placeholder,
  searchPlaceholder,
  emptyLabel,
  loadingLabel,
  loading,
  disabled = false,
  error,
  options,
  locale,
  errorState = false,
  errorMessage,
  retry,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  searchPlaceholder: string;
  emptyLabel: string;
  loadingLabel: string;
  loading: boolean;
  disabled?: boolean;
  error?: string | undefined;
  options: LocationOption[];
  locale: "ar" | "en";
  errorState?: boolean;
  errorMessage?: string | undefined;
  retry?: (() => void) | undefined;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => options.find((option) => option.id === value), [options, value]);
  const unavailable = disabled || loading || errorState;
  const ar = locale === "ar";

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="label-xs text-taupe">
        {label}
      </label>
      <input type="hidden" name={id} value={value} />
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        disabled={unavailable}
        onClick={() => setOpen(true)}
        className={cn(
          "mt-2 flex h-12 w-full min-w-0 items-center justify-between gap-3 border border-input bg-warm-white px-4 text-start text-sm normal-case tracking-normal transition-colors",
          !selected && "text-taupe",
          "disabled:cursor-not-allowed disabled:bg-secondary/45 disabled:text-taupe/70",
          error &&
            "border-destructive shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-destructive)_35%,transparent)]",
        )}
      >
        <span className="min-w-0 truncate">
          {loading ? loadingLabel : selected ? locationLabel(selected, locale) : placeholder}
        </span>
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 opacity-60" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          closeLabel={ar ? "إغلاق" : "Close"}
          className="location-combobox-dialog gap-0 overflow-hidden p-0"
          dir={ar ? "rtl" : "ltr"}
        >
          <div className="border-b px-5 py-5 pe-16">
            <DialogTitle className="flex items-center gap-2 font-serif text-xl normal-case tracking-normal">
              <MapPin aria-hidden="true" className="size-5 text-gold" />
              {label}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {ar ? `ابحثي واختاري ${label}` : `Search and select ${label}`}
            </DialogDescription>
          </div>
          <Command filter={locationFilter} className="rounded-none">
            <CommandInput
              autoFocus
              placeholder={searchPlaceholder}
              className="h-12 normal-case tracking-normal"
              dir={ar ? "rtl" : "ltr"}
            />
            <CommandList className="max-h-[min(58dvh,28rem)] px-2 py-2">
              <CommandEmpty>{emptyLabel}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={`${option.name} ${option.nameAr ?? ""} ${option.id}`}
                    onSelect={() => {
                      onChange(option.id);
                      setOpen(false);
                    }}
                    className="min-h-12 cursor-pointer justify-between rounded-lg px-3 normal-case tracking-normal"
                  >
                    <span className="min-w-0 leading-5">
                      <span className="block truncate font-medium">
                        {ar && option.nameAr ? option.nameAr : option.name}
                      </span>
                      {option.nameAr && (
                        <span
                          className="block truncate text-xs text-taupe"
                          dir={ar ? "ltr" : "rtl"}
                        >
                          {ar ? option.name : option.nameAr}
                        </span>
                      )}
                    </span>
                    <Check
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0 text-gold",
                        value !== option.id && "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
      {error && (
        <span
          id={`${id}-error`}
          className="mt-2 block text-xs normal-case tracking-normal text-destructive"
        >
          {error}
        </span>
      )}
      {errorState && errorMessage && (
        <div className="mt-2 text-xs normal-case tracking-normal text-destructive">
          {errorMessage}
          {retry && (
            <button
              type="button"
              onClick={retry}
              className="ms-2 text-gold underline underline-offset-4"
            >
              {ar ? "إعادة المحاولة" : "Try again"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function locationLabel(option: LocationOption, locale: "ar" | "en"): string {
  if (!option.nameAr) return option.name;
  return locale === "ar"
    ? `${option.nameAr} / ${option.name}`
    : `${option.name} / ${option.nameAr}`;
}

function locationFilter(value: string, search: string): number {
  if (!search.trim()) return 1;
  return normalizeSearch(value).includes(normalizeSearch(search)) ? 1 : 0;
}

function normalizeSearch(value: string): string {
  return value
    .trim()
    .normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/\u0640/g, "")
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .toLowerCase();
}
