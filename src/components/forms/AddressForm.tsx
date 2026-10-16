import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
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
  | "email"
  | "bostaGovernorateId"
  | "bostaCityId"
  | "bostaZoneId"
  | "street"
  | "building";

export type AddressDraft = {
  address: CreateAddressInput;
  contact?: { firstName: string; lastName: string; email: string };
};

export function AddressForm({
  onSubmit,
  pending = false,
  initialName = "",
  initialPhone = "",
  submitLabel,
  onCancel,
  locale = "en",
  collectGuestContact = false,
  formId,
  hideActions = false,
  foldOptional = false,
  onDraftChange,
}: {
  /** `contact` is set only with `collectGuestContact`. */
  onSubmit: (
    address: CreateAddressInput,
    contact?: { firstName: string; lastName: string; email: string },
  ) => Promise<void> | void;
  pending?: boolean;
  initialName?: string;
  initialPhone?: string;
  submitLabel?: string;
  onCancel?: () => void;
  locale?: "ar" | "en";
  /** Guest checkout: the receiver doubles as the customer, plus an email for the receipt. */
  collectGuestContact?: boolean;
  /** Lets an outside button submit (and validate) this form via `form="…"`/requestSubmit. */
  formId?: string;
  /** Hide the form's own submit/cancel buttons (the page provides the action). */
  hideActions?: boolean;
  /** Tuck floor, apartment, landmark and instructions behind a disclosure. */
  foldOptional?: boolean;
  /**
   * Called on every edit with the complete address (and guest contact), or `null`
   * while required fields are missing. Never shows validation messages itself.
   */
  onDraftChange?: (draft: AddressDraft | null) => void;
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
  // Choosing a governorate opens the city list, and a city opens the area list,
  // so the three pickers read as one continuous choice.
  const [cityOpenRequest, setCityOpenRequest] = useState(0);
  const [areaOpenRequest, setAreaOpenRequest] = useState(0);
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

  const readForm = useCallback(
    (form: HTMLFormElement) => {
      const data = new FormData(form);
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
      const [firstName = "", ...lastNames] = value("receiverName").split(/\s+/);
      const lastName = lastNames.join(" ");
      const email = value("email").toLowerCase();
      if (collectGuestContact) {
        if (!nextErrors.receiverName && (firstName.length < 2 || lastName.length < 2)) {
          nextErrors.receiverName = copy.fullNameRequired;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = copy.emailRequired;
      }

      if (
        Object.keys(nextErrors).length ||
        !selectedGovernorate ||
        !selectedCity ||
        !selectedArea
      ) {
        return { errors: nextErrors, draft: null };
      }
      const draft: AddressDraft = {
        address: {
          label: "HOME",
          receiverName: value("receiverName"),
          phone,
          country: "EG",
          governorate: selectedGovernorate.name,
          city: selectedCity.name,
          area: selectedArea.name,
          street: value("street"),
          building: value("building"),
          floor: value("floor") || null,
          apartment: value("apartment") || null,
          landmark: value("landmark") || null,
          deliveryInstructions: value("deliveryInstructions") || null,
          bostaGovernorateId: selectedGovernorate.id,
          bostaCityId: selectedCity.id,
          bostaZoneId: selectedArea.id,
          isDefault: false,
        },
        ...(collectGuestContact ? { contact: { firstName, lastName, email } } : {}),
      };
      return { errors: nextErrors, draft };
    },
    // `requiredFields` and `copy` derive from props that never change per mounted form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      areas.data,
      cities.data,
      collectGuestContact,
      governorates.data,
      selectedAreaId,
      selectedCityId,
      selectedGovernorateId,
      locale,
    ],
  );

  const draftListener = useRef(onDraftChange);
  draftListener.current = onDraftChange;
  const emitDraft = useCallback(() => {
    const form = formRef.current;
    if (!form || !draftListener.current) return;
    draftListener.current(readForm(form).draft);
  }, [readForm]);
  // Location pickers are state, not inputs: report after every pick (and once mounted).
  useEffect(() => {
    if (onDraftChange) emitDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emitDraft]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const { errors: nextErrors, draft } = readForm(event.currentTarget);

    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid || !draft) {
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>(
            `#${firstInvalid === "phone" ? "phone-number" : firstInvalid === "email" ? "guest-email" : firstInvalid}`,
          )
          ?.focus(),
      );
      return;
    }

    submitting.current = true;
    try {
      await onSubmit(draft.address, draft.contact);
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
      id={formId}
      noValidate
      onSubmit={submit}
      // Inputs settle (incl. the phone field's hidden value) before the draft is read.
      onInput={onDraftChange ? () => requestAnimationFrame(emitDraft) : undefined}
      onChange={onDraftChange ? () => requestAnimationFrame(emitDraft) : undefined}
      className="address-form grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2"
      data-variant={foldOptional ? "checkout" : undefined}
    >
      {field("receiverName", collectGuestContact ? copy.fullName : copy.receiverName, {
        autoComplete: "name",
      })}
      <InternationalPhoneField
        label={copy.phone}
        locale={locale}
        defaultValue={initialPhone}
        {...(errors.phone ? { error: errors.phone } : {})}
        onValueChange={() => {
          if (errors.phone) setErrors((current) => withoutError(current, "phone"));
        }}
      />
      {collectGuestContact && (
        <div className="min-w-0 sm:col-span-2">
          <label htmlFor="guest-email" className="label-xs text-taupe">
            {copy.email}
          </label>
          <input
            id="guest-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "guest-email-error" : "guest-email-help"}
            onChange={() => {
              if (errors.email) setErrors((current) => withoutError(current, "email"));
            }}
            className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal aria-invalid:border-destructive"
          />
          {errors.email ? (
            <FieldError id="guest-email-error">{errors.email}</FieldError>
          ) : (
            <span
              id="guest-email-help"
              className="mt-2 block text-xs normal-case tracking-normal text-taupe"
            >
              {copy.emailHelp}
            </span>
          )}
        </div>
      )}
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
        featured={["Cairo", "Giza", "Alexandria"]}
        onChange={(id) => {
          if (id !== selectedGovernorateId) setCityOpenRequest((count) => count + 1);
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
        openRequest={cityOpenRequest}
        onChange={(id) => {
          if (id !== selectedCityId) setAreaOpenRequest((count) => count + 1);
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
        openRequest={areaOpenRequest}
        onChange={(id) => {
          setSelectedAreaId(id);
          if (errors.bostaZoneId) {
            setErrors((current) => withoutError(current, "bostaZoneId"));
          }
        }}
      />
      {field("street", copy.street, { autoComplete: "street-address" })}
      {field("building", copy.building)}
      <OptionalFields fold={foldOptional} summary={copy.moreDetails}>
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
      </OptionalFields>
      <div className="flex min-w-0 flex-wrap gap-3 sm:col-span-2" hidden={hideActions}>
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

function OptionalFields({
  fold,
  summary,
  children,
}: {
  fold: boolean;
  summary: string;
  children: ReactNode;
}) {
  if (!fold) return <>{children}</>;
  return (
    <details className="address-form__more min-w-0 sm:col-span-2">
      <summary>{summary}</summary>
      <div className="grid min-w-0 grid-cols-1 gap-5 pt-4 sm:grid-cols-2">{children}</div>
    </details>
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
    fullName: "Full name",
    fullNameRequired: "Enter your first and last name.",
    email: "Email",
    emailRequired: "Enter a valid email address.",
    emailHelp: "We send your receipt and a private link to track your order here.",
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
    moreDetails: "Add floor, apartment or delivery notes (optional)",
  },
  ar: {
    fullName: "الاسم بالكامل",
    fullNameRequired: "اكتبي الاسم الأول واسم العائلة.",
    email: "البريد الإلكتروني",
    emailRequired: "اكتبي بريدًا إلكترونيًا صحيحًا.",
    emailHelp: "سنرسل الفاتورة ورابطًا خاصًا لتتبع طلبك إلى هذا البريد.",
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
    moreDetails: "إضافة الدور أو الشقة أو ملاحظات التوصيل (اختياري)",
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
