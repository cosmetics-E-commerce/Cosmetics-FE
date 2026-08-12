import { useRef, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  listShippingAreas,
  listShippingCitiesByGovernorate,
  listShippingGovernorates,
  type AddressResponse,
  type CreateAddressInput,
  type ShippingArea,
  type ShippingCity,
  type ShippingGovernorate,
} from "@/lib/api";
import { normalizeEgyptPhone } from "@/lib/forms";
import { cn } from "@/lib/utils";

type AddressField =
  | "receiverName"
  | "phone"
  | "bostaGovernorateId"
  | "bostaCityId"
  | "bostaZoneId"
  | "street"
  | "building";

const requiredFields: Array<{ name: AddressField; minimum: number; message: string }> = [
  { name: "receiverName", minimum: 2, message: "Enter the receiver's full name." },
  {
    name: "bostaGovernorateId",
    minimum: 1,
    message: "Choose a supported delivery governorate.",
  },
  { name: "bostaCityId", minimum: 1, message: "Choose a city from the delivery list." },
  { name: "bostaZoneId", minimum: 1, message: "Choose an area from the delivery list." },
  { name: "street", minimum: 3, message: "Enter a street name." },
  { name: "building", minimum: 1, message: "Enter a building number or name." },
];

export function AddressForm({
  onSubmit,
  pending = false,
  initialName = "",
  initialPhone = "",
  initialAddress,
  submitLabel = "Save and use this address",
  onCancel,
}: {
  onSubmit: (address: CreateAddressInput) => Promise<void> | void;
  pending?: boolean;
  initialName?: string;
  initialPhone?: string;
  initialAddress?: AddressResponse | undefined;
  submitLabel?: string;
  onCancel?: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);
  const [errors, setErrors] = useState<Partial<Record<AddressField, string>>>({});
  const [selectedGovernorateId, setSelectedGovernorateId] = useState(
    initialAddress?.bostaGovernorateId ?? "",
  );
  const [selectedCityId, setSelectedCityId] = useState(initialAddress?.bostaCityId ?? "");
  const [selectedAreaId, setSelectedAreaId] = useState(initialAddress?.bostaZoneId ?? "");

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
      nextErrors.bostaGovernorateId = "Choose a supported delivery governorate.";
    }
    if (!selectedCity) nextErrors.bostaCityId = "Choose a city from the delivery list.";
    if (!selectedArea) nextErrors.bostaZoneId = "Choose an area from the delivery list.";

    const phone = normalizeEgyptPhone(value("phone"));
    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      nextErrors.phone = "Enter an 11-digit Egyptian mobile number, such as 01012345678.";
    }

    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLInputElement | HTMLSelectElement>(`[name="${firstInvalid}"]`)
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
        isDefault: initialAddress?.isDefault ?? false,
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
            initialAddress?.[name] ??
            (name === "receiverName" ? initialName : name === "phone" ? initialPhone : "")
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
      {field("receiverName", "Receiver name", { autoComplete: "name" })}
      {field("phone", "Egyptian mobile number", { autoComplete: "tel", type: "tel" })}
      <LocationSelect
        id="bostaGovernorateId"
        label="Governorate"
        value={selectedGovernorateId}
        placeholder="Select governorate"
        loadingLabel="Loading governorates..."
        loading={governorates.isLoading}
        error={errors.bostaGovernorateId}
        options={governorates.data ?? []}
        errorState={governorates.isError}
        errorMessage="Unable to load delivery governorates."
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
      <LocationSelect
        id="bostaCityId"
        label="City"
        value={selectedCityId}
        placeholder={selectedGovernorateId ? "Select city" : "Select governorate first"}
        loadingLabel="Loading cities..."
        loading={cities.isLoading}
        disabled={!selectedGovernorateId || cities.isLoading}
        error={errors.bostaCityId}
        options={cities.data ?? []}
        errorState={cities.isError}
        errorMessage="Unable to load delivery cities."
        retry={() => void cities.refetch()}
        onChange={(id) => {
          setSelectedCityId(id);
          setSelectedAreaId("");
          setErrors((current) => withoutErrors(current, ["bostaCityId", "bostaZoneId"]));
        }}
      />
      <LocationSelect
        id="bostaZoneId"
        label="District / area"
        value={selectedAreaId}
        placeholder={selectedCityId ? "Select district" : "Select city first"}
        loadingLabel="Loading districts..."
        loading={areas.isLoading}
        disabled={!selectedCityId || areas.isLoading}
        error={errors.bostaZoneId}
        options={areas.data ?? []}
        errorState={areas.isError}
        errorMessage="Unable to load delivery districts."
        retry={() => void areas.refetch()}
        onChange={(id) => {
          setSelectedAreaId(id);
          if (errors.bostaZoneId) {
            setErrors((current) => withoutError(current, "bostaZoneId"));
          }
        }}
      />
      {field("street", "Street", { autoComplete: "street-address" })}
      {field("building", "Building")}
      <label className="label-xs min-w-0 text-taupe">
        Floor <span className="normal-case tracking-normal">(optional)</span>
        <input
          name="floor"
          autoComplete="address-line2"
          defaultValue={initialAddress?.floor ?? ""}
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
        />
      </label>
      <label className="label-xs min-w-0 text-taupe">
        Apartment <span className="normal-case tracking-normal">(optional)</span>
        <input
          name="apartment"
          autoComplete="address-line3"
          defaultValue={initialAddress?.apartment ?? ""}
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
        />
      </label>
      <label className="label-xs min-w-0 text-taupe">
        Nearby landmark <span className="normal-case tracking-normal">(optional)</span>
        <input
          name="landmark"
          defaultValue={initialAddress?.landmark ?? ""}
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
        />
      </label>
      <label className="label-xs min-w-0 text-taupe sm:col-span-2">
        Delivery instructions <span className="normal-case tracking-normal">(optional)</span>
        <textarea
          name="deliveryInstructions"
          defaultValue={initialAddress?.deliveryInstructions ?? ""}
          maxLength={1000}
          placeholder="For example: call on arrival or leave with reception"
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
          {submitLabel}
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
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

function LocationSelect({
  id,
  label,
  value,
  placeholder,
  loadingLabel,
  loading,
  disabled = false,
  error,
  options,
  errorState,
  errorMessage,
  retry,
  onChange,
}: {
  id: Extract<AddressField, "bostaGovernorateId" | "bostaCityId" | "bostaZoneId">;
  label: string;
  value: string;
  placeholder: string;
  loadingLabel: string;
  loading: boolean;
  disabled?: boolean | undefined;
  error?: string | undefined;
  options: Array<ShippingGovernorate | ShippingCity | ShippingArea>;
  errorState: boolean;
  errorMessage: string;
  retry: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="label-xs text-taupe">
        {label}
      </label>
      <select
        id={id}
        name={id}
        required
        value={value}
        disabled={disabled || loading || errorState}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-destructive)_35%,transparent)]"
      >
        <option value="">{loading ? loadingLabel : placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
            {option.nameAr ? ` / ${option.nameAr}` : ""}
          </option>
        ))}
      </select>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
      {errorState && (
        <div className="mt-2 text-xs normal-case tracking-normal text-destructive">
          {errorMessage}
          <button
            type="button"
            onClick={retry}
            className="ms-2 text-gold underline underline-offset-4"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <span id={id} className="mt-2 block text-xs normal-case tracking-normal text-destructive">
      {children}
    </span>
  );
}

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
