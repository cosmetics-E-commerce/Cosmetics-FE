"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageReferenceValueSchema = exports.IMAGE_REFERENCE_MAX_LENGTH = void 0;
exports.normalizeImageReference = normalizeImageReference;
exports.isAbsoluteHttpImageUrl = isAbsoluteHttpImageUrl;
exports.isSafeExternalImageUrl = isSafeExternalImageUrl;
exports.isSafeStorageImageKey = isSafeStorageImageKey;
exports.classifyImageReference = classifyImageReference;
exports.resolveImageReferenceUrl = resolveImageReferenceUrl;
const zod_1 = require("zod");
exports.IMAGE_REFERENCE_MAX_LENGTH = 2048;
function normalizeImageReference(value) {
    return value.trim();
}
function isAbsoluteHttpImageUrl(value) {
    try {
        const url = new URL(normalizeImageReference(value));
        return ((url.protocol === "https:" || url.protocol === "http:") &&
            Boolean(url.hostname) &&
            !url.username &&
            !url.password);
    }
    catch {
        return false;
    }
}
function isSafeExternalImageUrl(value) {
    if (!isAbsoluteHttpImageUrl(value))
        return false;
    const hostname = new URL(normalizeImageReference(value)).hostname
        .replace(/^\[|\]$/g, "")
        .toLowerCase();
    return !isPrivateHostname(hostname);
}
function isSafeStorageImageKey(value) {
    const key = normalizeImageReference(value);
    if (!key || key.length > exports.IMAGE_REFERENCE_MAX_LENGTH)
        return false;
    if (key.startsWith("/") || key.startsWith("\\"))
        return false;
    if (/^[a-z][a-z\d+.-]*:/i.test(key))
        return false;
    if (/[\\?#]/.test(key))
        return false;
    if ([...key].some((character) => {
        const code = character.charCodeAt(0);
        return code <= 31 || code === 127;
    })) {
        return false;
    }
    const segments = key.split("/");
    if (segments.some((segment) => !segment))
        return false;
    return segments.every((segment) => {
        let decoded = segment;
        try {
            decoded = decodeURIComponent(segment);
        }
        catch {
            return false;
        }
        return (decoded !== "." &&
            decoded !== ".." &&
            !decoded.includes("/") &&
            !decoded.includes("\\"));
    });
}
function classifyImageReference(value) {
    const normalized = normalizeImageReference(value);
    if (isAbsoluteHttpImageUrl(normalized))
        return "external_url";
    if (isSafeStorageImageKey(normalized))
        return "storage_key";
    return null;
}
function resolveImageReferenceUrl(value, publicBaseUrl) {
    if (!value)
        return null;
    const normalized = normalizeImageReference(value);
    if (!normalized)
        return null;
    if (isAbsoluteHttpImageUrl(normalized))
        return normalized;
    const storageKey = normalized.replace(/^\/+/, "");
    if (!isSafeStorageImageKey(storageKey))
        return null;
    const base = publicBaseUrl?.trim().replace(/\/+$/, "");
    return base ? `${base}/${storageKey}` : storageKey;
}
exports.imageReferenceValueSchema = zod_1.z
    .string()
    .trim()
    .min(1, "Add an image storage key or an absolute HTTP(S) URL.")
    .max(exports.IMAGE_REFERENCE_MAX_LENGTH)
    .superRefine((value, context) => {
    if (isAbsoluteHttpImageUrl(value)) {
        if (!isSafeExternalImageUrl(value)) {
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "External image URLs cannot target local or private network addresses.",
            });
        }
        return;
    }
    if (!isSafeStorageImageKey(value)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Use a storage key without traversal, query strings, backslashes, or a leading slash.",
        });
    }
});
function isPrivateHostname(hostname) {
    if (!hostname ||
        hostname === "localhost" ||
        hostname.endsWith(".localhost") ||
        hostname.endsWith(".local") ||
        hostname.endsWith(".internal") ||
        (!hostname.includes(".") && !hostname.includes(":"))) {
        return true;
    }
    if (hostname.includes(":")) {
        const compact = hostname.replace(/^0+/, "");
        return (compact === "::" ||
            compact === "::1" ||
            /^(fc|fd)/i.test(compact) ||
            /^fe[89ab]/i.test(compact) ||
            /^::ffff:(127\.|10\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(compact));
    }
    const parts = hostname.split(".");
    if (parts.length !== 4 || parts.some((part) => !/^\d{1,3}$/.test(part)))
        return false;
    const octets = parts.map(Number);
    if (octets.some((octet) => octet > 255))
        return true;
    const [first, second] = octets;
    return (first === 0 ||
        first === 10 ||
        first === 127 ||
        first >= 224 ||
        (first === 100 && second >= 64 && second <= 127) ||
        (first === 169 && second === 254) ||
        (first === 172 && second >= 16 && second <= 31) ||
        (first === 192 && second === 168));
}
//# sourceMappingURL=image-reference.schema.js.map