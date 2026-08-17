import { classifyImageReference, resolveImageReferenceUrl } from "@cosmetics/contracts";

export type AvatarIdentity = {
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  name?: string | null | undefined;
  profileImage?: string | null | undefined;
};

export type ResolvedAvatar = {
  displayName: string;
  imageUrl: string | null;
  initials: string;
};

const GENERATED_AVATAR_HOSTS = new Set([
  "api.dicebear.com",
  "gravatar.com",
  "www.gravatar.com",
  "secure.gravatar.com",
  "randomuser.me",
  "www.randomuser.me",
  "pravatar.cc",
  "www.pravatar.cc",
  "ui-avatars.com",
  "www.ui-avatars.com",
]);

const LEGACY_PLACEHOLDER_FILE =
  /^(?:default[-_]?avatar|avatar[-_]?default|placeholder[-_]?avatar|avatar[-_]?placeholder|profile[-_]?placeholder|user[-_]?placeholder)(?:[._-]|$)/iu;

export function resolveAvatar(
  identity: AvatarIdentity,
  publicMediaBaseUrl = mediaBaseUrl(),
): ResolvedAvatar {
  const displayName = customerDisplayName(identity);
  return {
    displayName,
    imageUrl: resolveAvatarImage(identity.profileImage, publicMediaBaseUrl),
    initials: getNameInitials(displayName),
  };
}

export function customerDisplayName(identity: AvatarIdentity): string {
  const explicit = normalizeName(identity.name);
  if (explicit) return explicit;
  return normalizeName([identity.firstName, identity.lastName].filter(Boolean).join(" "));
}

export function getNameInitials(name: string | null | undefined): string {
  const parts = normalizeName(name).split(/\s+/u).filter(Boolean);
  if (!parts.length) return "?";
  const selected = parts.length === 1 ? [parts[0]] : [parts[0], parts.at(-1)];
  return selected
    .flatMap((part) => (part ? [Array.from(part)[0]] : []))
    .filter((part): part is string => Boolean(part))
    .join("")
    .toLocaleUpperCase();
}

export function resolveAvatarImage(
  reference: string | null | undefined,
  publicMediaBaseUrl = mediaBaseUrl(),
): string | null {
  const value = reference?.trim();
  if (!value || isLegacyAvatarPlaceholder(value)) return null;
  const source = classifyImageReference(value);
  if (!source || (source === "storage_key" && !publicMediaBaseUrl)) return null;
  return resolveImageReferenceUrl(value, publicMediaBaseUrl);
}

export function isLegacyAvatarPlaceholder(value: string): boolean {
  const normalized = value.trim();
  if (!normalized) return true;
  try {
    const url = new URL(normalized, "https://local.invalid");
    if (GENERATED_AVATAR_HOSTS.has(url.hostname.toLowerCase())) return true;
    const filename = decodeURIComponent(url.pathname.split("/").filter(Boolean).at(-1) ?? "");
    return LEGACY_PLACEHOLDER_FILE.test(filename);
  } catch {
    const filename = normalized.split(/[?#]/u)[0]?.split(/[\\/]/u).filter(Boolean).at(-1) ?? "";
    return LEGACY_PLACEHOLDER_FILE.test(filename);
  }
}

function normalizeName(value: string | null | undefined): string {
  return value?.trim().replace(/\s+/gu, " ") ?? "";
}

function mediaBaseUrl(): string | null {
  const value = import.meta.env["VITE_MEDIA_BASE_URL"] as string | undefined;
  return value?.trim() || null;
}
