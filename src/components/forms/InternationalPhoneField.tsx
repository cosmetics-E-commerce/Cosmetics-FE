import { Check, ChevronDown, Phone } from "lucide-react";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
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
import { normalizeInternationalPhone } from "@/lib/international-phone";

type Props = {
  id?: string;
  name?: string;
  label: string;
  hint?: string;
  error?: string;
  locale?: "ar" | "en";
  defaultValue?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
};

export function InternationalPhoneField({
  id = "phone",
  name = "phone",
  label,
  hint,
  error,
  locale = "en",
  defaultValue = "",
  required = true,
  onValueChange,
}: Props) {
  const initial = useMemo(() => phoneFieldInitialValue(defaultValue), [defaultValue]);
  const [country, setCountry] = useState<CountryCode>(initial.country);
  const [number, setNumber] = useState(initial.number);
  const [open, setOpen] = useState(false);
  const ar = locale === "ar";
  const countries = useMemo(() => countryOptions(locale), [locale]);
  const selected = countries.find((option) => option.code === country)!;
  const normalized = normalizeInternationalPhone(number, country);
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="sf-phone-field min-w-0">
      <label htmlFor={`${id}-number`} className="label-xs text-taupe">
        {label}
      </label>
      <input type="hidden" name={name} value={normalized} />
      <div
        className={cn(
          "mt-2 flex h-12 min-w-0 border border-input bg-warm-white",
          error &&
            "border-destructive shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-destructive)_35%,transparent)]",
        )}
      >
        <button
          type="button"
          className="flex min-w-[6.75rem] shrink-0 cursor-pointer items-center justify-between gap-2 border-e border-input px-3 text-sm"
          aria-label={ar ? "اختيار رمز الدولة" : "Choose country calling code"}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span dir="ltr">+{selected.callingCode}</span>
          <ChevronDown className="size-4 opacity-60" aria-hidden="true" />
        </button>
        <input
          id={`${id}-number`}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required={required}
          value={number}
          placeholder={selected.example}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
          onChange={(event) => {
            setNumber(event.target.value);
            onValueChange?.(normalizeInternationalPhone(event.target.value, country));
          }}
        />
      </div>
      {hint && !error ? (
        <small id={`${id}-hint`} className="mt-2 block text-xs leading-5 text-taupe">
          {hint}
        </small>
      ) : null}
      {error ? (
        <small id={`${id}-error`} role="alert" className="mt-2 block text-xs text-destructive">
          {error}
        </small>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          dir={ar ? "rtl" : "ltr"}
          closeLabel={ar ? "إغلاق" : "Close"}
          className="location-combobox-dialog gap-0 overflow-hidden p-0"
        >
          <div className="border-b px-5 py-5 pe-16">
            <DialogTitle className="flex items-center gap-2 font-serif text-xl normal-case tracking-normal">
              <Phone className="size-5 text-gold" aria-hidden="true" />
              {ar ? "رمز الدولة" : "Country calling code"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {ar
                ? "ابحثي عن دولة ثم اختاري رمز الاتصال"
                : "Search for a country and choose its calling code"}
            </DialogDescription>
          </div>
          <Command className="rounded-none">
            <CommandInput
              autoFocus
              placeholder={ar ? "ابحثي باسم الدولة أو الرمز…" : "Search country or calling code…"}
              className="h-12 normal-case tracking-normal"
            />
            <CommandList className="max-h-[min(58dvh,28rem)] px-2 py-2">
              <CommandEmpty>{ar ? "لا توجد دولة مطابقة." : "No matching country."}</CommandEmpty>
              <CommandGroup>
                {countries.map((option) => (
                  <CommandItem
                    key={option.code}
                    value={`${option.name} ${option.code} +${option.callingCode}`}
                    className="min-h-12 cursor-pointer justify-between rounded-lg px-3 normal-case tracking-normal"
                    onSelect={() => {
                      setCountry(option.code);
                      setNumber("");
                      onValueChange?.("");
                      setOpen(false);
                    }}
                  >
                    <span className="min-w-0 truncate">{option.name}</span>
                    <span className="ms-auto shrink-0" dir="ltr">
                      +{option.callingCode}
                    </span>
                    <Check
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0 text-gold",
                        country !== option.code && "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function phoneFieldInitialValue(value: string): { country: CountryCode; number: string } {
  const parsed = parsePhoneNumberFromString(value, "EG");
  if (parsed?.country) return { country: parsed.country, number: parsed.formatNational() };
  return { country: "EG", number: value };
}

function countryOptions(locale: "ar" | "en") {
  const names = new Intl.DisplayNames([locale], { type: "region" });
  return getCountries()
    .map((code) => ({
      code,
      name: names.of(code) ?? code,
      callingCode: getCountryCallingCode(code),
      example: locale === "ar" ? "رقم الهاتف" : "Phone number",
    }))
    .sort((left, right) => left.name.localeCompare(right.name, locale));
}
