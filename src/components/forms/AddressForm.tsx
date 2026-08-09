import { useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import type { CreateAddressInput } from "@/lib/api";
import { normalizeEgyptPhone } from "@/lib/forms";
import { cn } from "@/lib/utils";

type AddressField =
  "receiverName" | "phone" | "governorate" | "city" | "area" | "street" | "building";

const requiredFields: Array<{ name: AddressField; minimum: number; message: string }> = [
  { name: "receiverName", minimum: 2, message: "Enter the receiver’s full name." },
  { name: "governorate", minimum: 2, message: "Enter a governorate." },
  { name: "city", minimum: 2, message: "Enter a city or district." },
  { name: "area", minimum: 2, message: "Enter an area." },
  { name: "street", minimum: 3, message: "Enter a street name." },
  { name: "building", minimum: 1, message: "Enter a building number or name." },
];

export function AddressForm({
  onSubmit,
  pending = false,
  initialName = "",
  initialPhone = "",
  submitLabel = "Save and use this address",
  onCancel,
}: {
  onSubmit: (address: CreateAddressInput) => Promise<void> | void;
  pending?: boolean;
  initialName?: string;
  initialPhone?: string;
  submitLabel?: string;
  onCancel?: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);
  const [errors, setErrors] = useState<Partial<Record<AddressField, string>>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const nextErrors: Partial<Record<AddressField, string>> = {};

    for (const field of requiredFields) {
      if (value(field.name).length < field.minimum) nextErrors[field.name] = field.message;
    }

    const phone = normalizeEgyptPhone(value("phone"));
    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      nextErrors.phone = "Enter an 11-digit Egyptian mobile number, such as 01012345678.";
    }

    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus(),
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
        governorate: value("governorate"),
        city: value("city"),
        area: value("area"),
        street: value("street"),
        building: value("building"),
        floor: value("floor") || null,
        apartment: value("apartment") || null,
        landmark: value("landmark") || null,
        deliveryInstructions: value("deliveryInstructions") || null,
        isDefault: false,
      });
    } finally {
      submitting.current = false;
    }
  }

  const field = (
    name: AddressField,
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
            if (error) setErrors((current) => ({ ...current, [name]: undefined }));
          }}
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-destructive)_35%,transparent)]"
        />
        {error && (
          <span
            id={`${name}-error`}
            className="mt-2 block text-xs normal-case tracking-normal text-destructive"
          >
            {error}
          </span>
        )}
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
      {field("governorate", "Governorate", { autoComplete: "address-level1" })}
      {field("city", "City or district", { autoComplete: "address-level2" })}
      {field("area", "Area", { autoComplete: "address-level3" })}
      {field("street", "Street", { autoComplete: "street-address" })}
      {field("building", "Building")}
      <label className="label-xs min-w-0 text-taupe">
        Floor <span className="normal-case tracking-normal">(optional)</span>
        <input
          name="floor"
          autoComplete="address-line2"
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
        />
      </label>
      <label className="label-xs min-w-0 text-taupe">
        Apartment <span className="normal-case tracking-normal">(optional)</span>
        <input
          name="apartment"
          autoComplete="address-line3"
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
        />
      </label>
      <label className="label-xs min-w-0 text-taupe">
        Nearby landmark <span className="normal-case tracking-normal">(optional)</span>
        <input
          name="landmark"
          className="mt-2 h-12 w-full min-w-0 max-w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal"
        />
      </label>
      <label className="label-xs min-w-0 text-taupe sm:col-span-2">
        Delivery instructions <span className="normal-case tracking-normal">(optional)</span>
        <textarea
          name="deliveryInstructions"
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
