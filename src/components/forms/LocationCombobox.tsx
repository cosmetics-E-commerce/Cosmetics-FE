import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronDown, MapPin, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface LocationOption {
  id: string;
  name: string;
  nameAr?: string | null;
}

/**
 * Searchable picker for governorate / city / area. On wider screens it drops
 * down under the field so the rest of the form stays in view; on phones it is
 * a bottom sheet with room for the keyboard.
 */
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
  featured = [],
  openRequest = 0,
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
  /** English names pinned to the top while the search is empty, in this order. */
  featured?: string[];
  /** Incrementing this opens the picker as soon as it has options to show. */
  openRequest?: number;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"dropdown" | "sheet">("dropdown");
  const [search, setSearch] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  const handledOpenRequest = useRef(openRequest);
  const selected = useMemo(() => options.find((option) => option.id === value), [options, value]);
  const unavailable = disabled || loading || errorState;
  const ar = locale === "ar";

  const featuredOptions = useMemo(
    () =>
      featured
        .map((name) => options.find((option) => option.name.toLowerCase() === name.toLowerCase()))
        .filter((option): option is LocationOption => Boolean(option)),
    [featured, options],
  );

  const openPicker = () => {
    setMode(window.matchMedia("(min-width: 768px)").matches ? "dropdown" : "sheet");
    setSearch("");
    setOpen(true);
  };

  useEffect(() => {
    if (openRequest === handledOpenRequest.current || unavailable || !options.length) return;
    handledOpenRequest.current = openRequest;
    openPicker();
  }, [openRequest, unavailable, options.length]);

  const choose = (optionId: string) => {
    onChange(optionId);
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };

  const renderItem = (option: LocationOption, group: string) => {
    const primary = ar && option.nameAr ? option.nameAr : option.name;
    const secondary = option.nameAr ? (ar ? option.name : option.nameAr) : null;
    return (
      <CommandItem
        key={`${group}:${option.id}`}
        // Unique per group, searchable only by the names (and id, as before).
        value={`${option.name} ${option.nameAr ?? ""} ${option.id}${group === "featured" ? "#" : ""}`}
        onSelect={() => choose(option.id)}
        className="location-picker__item"
        data-chosen={value === option.id || undefined}
      >
        <span className="location-picker__name">{primary}</span>
        {secondary && (
          <span className="location-picker__alt" dir={ar ? "ltr" : "rtl"}>
            {secondary}
          </span>
        )}
        <Check aria-hidden="true" className="location-picker__check" />
      </CommandItem>
    );
  };

  const showFeatured = !search.trim() && featuredOptions.length > 0;
  const picker = (
    <Command filter={locationFilter} loop className="location-picker" dir={ar ? "rtl" : "ltr"}>
      <div className="location-picker__search">
        <Search aria-hidden="true" />
        <CommandPrimitive.Input
          autoFocus
          data-form-control="search-input"
          value={search}
          onValueChange={setSearch}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          dir={ar ? "rtl" : "ltr"}
        />
      </div>
      <CommandList className="location-picker__list">
        <CommandEmpty className="location-picker__empty">{emptyLabel}</CommandEmpty>
        {showFeatured && (
          <CommandGroup
            heading={ar ? "الأكثر طلبًا" : "Popular"}
            className="location-picker__group"
          >
            {featuredOptions.map((option) => renderItem(option, "featured"))}
          </CommandGroup>
        )}
        <CommandGroup
          heading={showFeatured ? (ar ? "الكل" : "All") : undefined}
          className="location-picker__group"
        >
          {options.map((option) => renderItem(option, "all"))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="label-xs text-taupe">
        {label}
      </label>
      <input type="hidden" name={id} value={value} />
      <Popover open={open && mode === "dropdown"} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <button
            ref={trigger}
            id={id}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            disabled={unavailable}
            onClick={() => (open ? setOpen(false) : openPicker())}
            data-open={open || undefined}
            className={cn(
              "location-picker__trigger mt-2 flex h-12 w-full min-w-0 items-center justify-between gap-3 border border-input bg-warm-white px-4 text-start text-sm normal-case tracking-normal transition-colors",
              !selected && "text-taupe",
              "disabled:cursor-not-allowed disabled:bg-secondary/45 disabled:text-taupe/70",
              error &&
                "border-destructive shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-destructive)_35%,transparent)]",
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              {selected && <MapPin aria-hidden="true" className="size-4 shrink-0 text-gold" />}
              <span className="min-w-0 truncate">
                {loading ? loadingLabel : selected ? locationLabel(selected, locale) : placeholder}
              </span>
            </span>
            <ChevronDown aria-hidden="true" className="location-picker__chevron size-4 shrink-0" />
          </button>
        </PopoverAnchor>
        <PopoverContent
          align="start"
          sideOffset={6}
          collisionPadding={16}
          className="location-picker-popover"
          aria-label={label}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            // The field itself toggles the list; don't let its press count as "outside".
            if (trigger.current?.contains(event.target as Node)) event.preventDefault();
          }}
        >
          {picker}
        </PopoverContent>
      </Popover>

      <Dialog open={open && mode === "sheet"} onOpenChange={setOpen}>
        <DialogContent
          closeLabel={ar ? "إغلاق" : "Close"}
          className="location-combobox-dialog gap-0 overflow-hidden p-0"
          dir={ar ? "rtl" : "ltr"}
        >
          <div className="location-picker__sheet-head">
            <span className="location-picker__grabber" aria-hidden="true" />
            <DialogTitle className="font-serif text-xl normal-case tracking-normal">
              {label}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {ar ? `ابحثي واختاري ${label}` : `Search and select ${label}`}
            </DialogDescription>
          </div>
          {picker}
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
    .replace(/[ً-ٰٟ]/g, "")
    .replace(/ـ/g, "")
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .toLowerCase();
}
