"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bilingualTextSchema = exports.instapayAddressSchema = exports.idempotencyKeySchema = exports.slugSchema = exports.emailSchema = exports.egyptPhoneSchema = exports.internationalPhoneSchema = exports.databasePiastresSchema = exports.DATABASE_INT_MAX = exports.piastresSchema = exports.uuidSchema = void 0;
exports.compactIdentifierSchema = compactIdentifierSchema;
const zod_1 = require("zod");
const libphonenumber_js_1 = require("libphonenumber-js");
exports.uuidSchema = zod_1.z.string().uuid();
/**
 * Money is always integer piastres (1 EGP = 100 piastres).
 * Never a float — see PLAN.md §10.5.
 */
exports.piastresSchema = zod_1.z
    .number()
    .int("Amount must be whole piastres — no fractional values")
    .nonnegative();
/** Maximum value of a PostgreSQL/Prisma `Int` column. */
exports.DATABASE_INT_MAX = 2_147_483_647;
/** Money accepted for fields persisted in PostgreSQL `Int` columns. */
exports.databasePiastresSchema = exports.piastresSchema.max(exports.DATABASE_INT_MAX, `Amount cannot exceed ${exports.DATABASE_INT_MAX} piastres`);
/**
 * Customer phone numbers are persisted in E.164. A local number without a
 * calling code is interpreted as Egyptian for backwards compatibility.
 */
exports.internationalPhoneSchema = zod_1.z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .transform((value, ctx) => {
    const phone = (0, libphonenumber_js_1.parsePhoneNumberFromString)(value, "EG");
    if (!phone?.isValid()) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Enter a valid phone number for the selected country.",
        });
        return zod_1.z.NEVER;
    }
    return phone.number;
});
/** @deprecated Prefer internationalPhoneSchema. Retained for contract compatibility. */
exports.egyptPhoneSchema = exports.internationalPhoneSchema;
exports.emailSchema = zod_1.z.string().trim().toLowerCase().email();
exports.slugSchema = zod_1.z
    .string()
    .trim()
    .min(1)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be a lowercase hyphenated slug");
/**
 * Identifiers that are copied between systems (SKUs, coupons) must not differ
 * only through Unicode normalization, whitespace, or invisible control/format
 * characters. Display text deliberately does not use this stricter policy.
 */
function compactIdentifierSchema(min, max) {
    return zod_1.z
        .string()
        .transform((value) => value.normalize("NFKC").trim())
        .pipe(zod_1.z
        .string()
        .min(min)
        .max(max)
        .refine((value) => !/[\s\p{Cc}\p{Cf}]/u.test(value), "Identifier cannot contain whitespace or invisible characters"));
}
/**
 * Idempotency-Key header value. Client-generated UUID, unique per logical
 * operation attempt, reused across network retries of that same attempt.
 * See PLAN.md §6.2.
 */
exports.idempotencyKeySchema = zod_1.z
    .string()
    .uuid("Idempotency-Key must be a valid UUID");
/** InstaPay address (IPA), e.g. "someone@instapay" or a mobile-linked handle. */
exports.instapayAddressSchema = zod_1.z.string().trim().min(3).max(120);
exports.bilingualTextSchema = zod_1.z.object({
    en: zod_1.z.string().trim().min(1),
    ar: zod_1.z.string().trim().min(1),
});
//# sourceMappingURL=primitives.js.map