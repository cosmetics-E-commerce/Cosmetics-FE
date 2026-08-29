import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";

export function normalizeInternationalPhone(value: string, defaultCountry: CountryCode = "EG") {
  const compact = value.trim();
  if (!compact) return "";
  const phone = parsePhoneNumberFromString(compact, defaultCountry);
  return phone?.isValid() ? phone.number : compact;
}

export function isValidInternationalPhone(value: string) {
  return Boolean(parsePhoneNumberFromString(value, "EG")?.isValid());
}
