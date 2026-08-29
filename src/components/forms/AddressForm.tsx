import { useRef, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { LocationCombobox } from "@/components/forms/LocationCombobox";
import { InternationalPhoneField } from "@/components/forms/InternationalPhoneField";
import { isValidInternationalPhone } from "@/lib/international-phone";
import {
  listShippingAreas,
  listShippingCitiesByGovernorate,
  listShippingGovernorates,
  type CreateAddressInput,
} from "@/lib/api";
import { cn } from "@/lib/utils";

type AddressField =
  | "receiverName"
  | "phone"
  | "bostaGovernorateId"
  | "bostaCityId"
  | "bostaZoneId"
  | "street"
  | "building";

export function AddressForm({
  onSubmit,
  pending = false,
  initialName = "",
  initialPhone = "",
  submitLabel,
  onCancel,
  locale = "en",
}: {
  onSubmit: (address: CreateAddressInput) => Promise<void> | void;
  pending?: boolean;
  initialName?: string;
  initialPhone?: string;
  submitLabel?: string;
  onCancel?: () => void;
  locale?: "ar" | "en";
}) {
  const copy = ADDRESS_COPY[locale];
  const requiredFields: Array<{ name: AddressField; minimum: number; message: string }> = [
    { name: "receiverName", minimum: 2, message: copy.receiverRequired },
    { name: "bostaGovernorateId", minimum: 1, message: copy.governorateRequired },
    { name: "bostaCityId", minimum: 1, message: copy.cityRequired },
    { name: "bostaZoneId", minimum: 1, message: copy.areaRequired },
    { name: "street", minimum: 3, message: copy.streetRequired },
    { name: "building", minimum: 1, message: copy.buildingRequired },
  ];
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);
  const [errors, setErrors] = useState<Partial<Record<AddressField, string>>>({});
  const [selectedGovernorateId, setSelectedGovernorateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");

  const governorates = useQuery({
    queryKey: ["shipping", "locations", "governorates"],
    queryFn: listShippingGovernorates,
    staleTime: 24 * 60 * 60 * 1000,
  });
  const cities = useQuery({
    queryKey: ["shipping", "locations", "cities", selectedGovernorateId],
    queryFn: () => listShippingCitiesByGovernorate(selectedGovernorateId),
    enabled: Boolean(selectedGovernorateId),
    staleTime: 24 * 60 * 60 * 1000,
  });
  const areas = useQuery({
    queryKey: ["shipping", "locations", "areas", selectedCityId],
    queryFn: () => listShippingAreas(selectedCityId),
    enabled: Boolean(selectedCityId),
    staleTime: 24 * 60 * 60 * 1000,
  });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const nextErrors: Partial<Record<AddressField, string>> = {};

    for (const field of requiredFields) {
      if (value(field.name).length < field.minimum) nextErrors[field.name] = field.message;
    }

    const selectedGovernorate = governorates.data?.find(
      (item) => item.id === selectedGovernorateId,
    );
    const selectedCity = cities.data?.find((item) => item.id === selectedCityId);
    const selectedArea = areas.data?.find((item) => item.id === selectedAreaId);

    if (!selectedGovernorate) {
      nextErrors.bostaGovernorateId = copy.governorateRequired;
    }
    if (!selectedCity) nextErrors.bostaCityId = copy.cityRequired;
    if (!selectedArea) nextErrors.bostaZoneId = copy.areaRequired;

    const phone = value("phone");
    if (!isValidInternationalPhone(phone)) {
      nextErrors.phone = copy.phoneRequired;
    }

    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>(
            `#${firstInvalid === "phone" ? "phone-number" : firstInvalid}`,
          )
          ?.focus(),
      );
      return;
    }

    submitting.current = true;
    try {
      await onSubmit({
        label: "HOME",
        receiverName: value("receiverName"),
        phone,
        country: "EG",
        governorate: selectedGovernorate!.name,
        city: selectedCity!.name,
        area: selectedArea!.name,
        street: value("street"),
        building: value("building"),
        floor: value("floor") || null,
        apartment: value("apartment") || null,
        landmark: value("landmark") || null,
        deliveryInstructions: value("deliveryInstructions") || null,
        bostaGovernorateId: selectedGovernorate!.id,
        bostaCityId: selectedCity!.id,
        bostaZoneId: selectedArea!.id,
        isDefault: false,
      });
    } finally {
      submitting.current = false;
    }
  }

  const field = (
    name: Extract<AddressField, "receiverName" | "phone" | "street" | "building">,
    label: string,
    options: { autoComplete?: string; type?: string; className?: string } = {},
  ) => {
    const error = errors[name];
    return (
      <div className={cn("min-w-0", options.className)}>
        <label htmlFor={name} className="label-xs text-taupe">
          {label}
        </label>
        <input
          id={name}
          name={name}
          required
          type={options.type ?? "text"}
          autoComplete={options.autoComplete}
          inputMode={options.type === "tel" ? "tel" : undefined}
          defaultValue={
            name === "receiverName" ? initialName : name === "phone" ? initialPhone : ""
          }
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          onChange={() => {
            if (error) setErrors((current) => withoutError(current, name));
          }}
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-destructive)_35%,transparent)]"
        />
        {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
      </div>
    );
  };

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={submit}
      className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2"
    >
      {field("receiverName", copy.receiverName, { autoComplete: "name" })}
      <InternationalPhoneField
        label={copy.phone}
        locale={locale}
        defaultValue={initialPhone}
        {...(errors.phone ? { error: errors.phone } : {})}
        onValueChange={() => {
          if (errors.phone) setErrors((current) => withoutError(current, "phone"));
        }}
      />
      <LocationCombobox
        id="bostaGovernorateId"
        label={copy.governorate}
        value={selectedGovernorateId}
        placeholder={copy.selectGovernorate}
        searchPlaceholder={copy.searchGovernorate}
        emptyLabel={copy.noGovernorates}
        loadingLabel={copy.loadingGovernorates}
        loading={governorates.isLoading}
        error={errors.bostaGovernorateId}
        options={governorates.data ?? []}
        locale={locale}
        errorState={governorates.isError}
        errorMessage={copy.governoratesError}
        retry={() => void governorates.refetch()}
        onChange={(id) => {
          setSelectedGovernorateId(id);
          setSelectedCityId("");
          setSelectedAreaId("");
          setErrors((current) =>
            withoutErrors(current, ["bostaGovernorateId", "bostaCityId", "bostaZoneId"]),
          );
        }}
      />
      <LocationCombobox
        id="bostaCityId"
        label={copy.city}
        value={selectedCityId}
        placeholder={selectedGovernorateId ? copy.selectCity : copy.selectGovernorateFirst}
        searchPlaceholder={copy.searchCity}
        emptyLabel={copy.noCities}
        loadingLabel={copy.loadingCities}
        loading={cities.isLoading}
        disabled={!selectedGovernorateId || cities.isLoading}
        error={errors.bostaCityId}
        options={cities.data ?? []}
        locale={locale}
        errorState={cities.isError}
        errorMessage={copy.citiesError}
        retry={() => void cities.refetch()}
        onChange={(id) => {
          setSelectedCityId(id);
          setSelectedAreaId("");
          setErrors((current) => withoutErrors(current, ["bostaCityId", "bostaZoneId"]));
        }}
      />
      <LocationCombobox
        id="bostaZoneId"
        label={copy.area}
        value={selectedAreaId}
        placeholder={selectedCityId ? copy.selectArea : copy.selectCityFirst}
        searchPlaceholder={copy.searchArea}
        emptyLabel={copy.noAreas}
        loadingLabel={copy.loadingAreas}
        loading={areas.isLoading}
        disabled={!selectedCityId || areas.isLoading}
        error={errors.bostaZoneId}
        options={areas.data ?? []}
        locale={locale}
        errorState={areas.isError}
        errorMessage={copy.areasError}
        retry={() => void areas.refetch()}
        onChange={(id) => {
          setSelectedAreaId(id);
          if (errors.bostaZoneId) {
            setErrors((current) => withoutError(current, "bostaZoneId"));
          }
        }}
      />
      {field("street", copy.street, { autoComplete: "street-address" })}
      {field("building", copy.building)}
      <label className="label-xs min-w-0 text-taupe">
        {copy.floor} <span className="normal-case tracking-normal">{copy.optional}</span>
        <input
          name="floor"
          autoComplete="address-line2"
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
        />
      </label>
      <label className="label-xs min-w-0 text-taupe">
        {copy.apartment} <span className="normal-case tracking-normal">{copy.optional}</span>
        <input
          name="apartment"
          autoComplete="address-line3"
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
        />
      </label>
      <label className="label-xs min-w-0 text-taupe">
        {copy.landmark} <span className="normal-case tracking-normal">{copy.optional}</span>
        <input
          name="landmark"
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
        />
      </label>
      <label className="label-xs min-w-0 text-taupe sm:col-span-2">
        {copy.instructions} <span className="normal-case tracking-normal">{copy.optional}</span>
        <textarea
          name="deliveryInstructions"
          maxLength={1000}
          placeholder={copy.instructionsPlaceholder}
          className="mt-2 min-h-24 w-full min-w-0 max-w-full border border-input bg-warm-white p-4 text-sm normal-case tracking-normal"
        />
      </label>
      <div className="flex min-w-0 flex-wrap gap-3 sm:col-span-2">
        <Button
          type="submit"
          variant="solid"
          size="pill"
          loading={pending}
          className="h-auto min-h-12 w-full max-w-full whitespace-normal px-5 py-3 text-center leading-snug sm:w-auto"
        >
          {submitLabel ?? copy.submit}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="quiet"
            size="pill"
            onClick={onCancel}
            disabled={pending}
            className="w-full sm:w-auto"
          >
            {copy.cancel}
          </Button>
        )}
      </div>
    </form>
  );
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <span id={id} className="mt-2 block text-xs normal-case tracking-normal text-destructive">
      {children}
    </span>
  );
}

const ADDRESS_COPY = {
  en: {
    receiverName: "Receiver name",
    phone: "Phone Number",
    governorate: "Governorate",
    city: "City / Markaz",
    area: "District / area",
    street: "Street",
    building: "Building",
    floor: "Floor",
    apartment: "Apartment",
    landmark: "Nearby landmark",
    instructions: "Delivery instructions",
    optional: "(optional)",
    cancel: "Cancel",
    submit: "Save and use this address",
    selectGovernorate: "Select governorate",
    selectCity: "Select city / markaz",
    selectArea: "Select district / area",
    selectGovernorateFirst: "Select governorate first",
    selectCityFirst: "Select city first",
    searchGovernorate: "Search governorates in Arabic or English",
    searchCity: "Search cities and markaz in Arabic or English",
    searchArea: "Search districts and areas in Arabic or English",
    noGovernorates: "No governorate found.",
    noCities: "No city or markaz found.",
    noAreas: "No district or area found.",
    loadingGovernorates: "Loading governorates...",
    loadingCities: "Loading cities...",
    loadingAreas: "Loading districts...",
    governoratesError: "Unable to load delivery governorates.",
    citiesError: "Unable to load delivery cities.",
    areasError: "Unable to load delivery districts.",
    receiverRequired: "Enter the receiver's full name.",
    governorateRequired: "Choose a supported delivery governorate.",
    cityRequired: "Choose a city or markaz from the delivery list.",
    areaRequired: "Choose a district or area from the delivery list.",
    streetRequired: "Enter a street name.",
    buildingRequired: "Enter a building number or name.",
    phoneRequired: "Enter a valid phone number using the selected country code.",
    instructionsPlaceholder: "For example: call on arrival or leave with reception",
  },
  ar: {
    receiverName: "اسم المستلم",
    phone: "رقم الهاتف",
    governorate: "المحافظة",
    city: "المدينة / المركز",
    area: "المنطقة / الحي",
    street: "الشارع",
    building: "المبنى",
    floor: "الدور",
    apartment: "الشقة",
    landmark: "علامة مميزة قريبة",
    instructions: "تعليمات التوصيل",
    optional: "(اختياري)",
    cancel: "إلغاء",
    submit: "حفظ واستخدام هذا العنوان",
    selectGovernorate: "اختر المحافظة",
    selectCity: "اختر المدينة / المركز",
    selectArea: "اختر المنطقة / الحي",
    selectGovernorateFirst: "اختر المحافظة أولاً",
    selectCityFirst: "اختر المدينة أولاً",
    searchGovernorate: "ابحث عن المحافظة بالعربية أو الإنجليزية",
    searchCity: "ابحث عن المدينة أو المركز بالعربية أو الإنجليزية",
    searchArea: "ابحث عن المنطقة أو الحي بالعربية أو الإنجليزية",
    noGovernorates: "لم يتم العثور على محافظة.",
    noCities: "لم يتم العثور على مدينة أو مركز.",
    noAreas: "لم يتم العثور على منطقة أو حي.",
    loadingGovernorates: "جارٍ تحميل المحافظات...",
    loadingCities: "جارٍ تحميل المدن...",
    loadingAreas: "جارٍ تحميل المناطق...",
    governoratesError: "تعذر تحميل محافظات التوصيل.",
    citiesError: "تعذر تحميل مدن التوصيل.",
    areasError: "تعذر تحميل مناطق التوصيل.",
    receiverRequired: "أدخل الاسم الكامل للمستلم.",
    governorateRequired: "اختر محافظة متاحة للتوصيل.",
    cityRequired: "اختر مدينة أو مركزاً من القائمة.",
    areaRequired: "اختر منطقة أو حياً من القائمة.",
    streetRequired: "أدخل اسم الشارع.",
    buildingRequired: "أدخل رقم أو اسم المبنى.",
    phoneRequired: "أدخل رقم هاتف صحيحاً باستخدام رمز الدولة المحدد.",
    instructionsPlaceholder: "مثال: الاتصال عند الوصول أو التسليم إلى الاستقبال",
  },
} as const;

function withoutError(current: Partial<Record<AddressField, string>>, field: AddressField) {
  const next = { ...current };
  delete next[field];
  return next;
}

function withoutErrors(current: Partial<Record<AddressField, string>>, fields: AddressField[]) {
  const next = { ...current };
  for (const field of fields) delete next[field];
  return next;
}
