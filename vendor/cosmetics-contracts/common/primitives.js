"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bilingualTextSchema = exports.instapayAddressSchema = exports.idempotencyKeySchema = exports.slugSchema = exports.emailSchema = exports.egyptPhoneSchema = exports.piastresSchema = exports.uuidSchema = void 0;
const zod_1 = require("zod");
exports.uuidSchema = zod_1.z.string().uuid();
/**
 * Money is always integer piastres (1 EGP = 100 piastres).
 * Never a float — see PLAN.md §10.5.
 */
exports.piastresSchema = zod_1.z
    .number()
    .int("Amount must be whole piastres — no fractional values")
    .nonnegative();
/** Egyptian mobile: 01[0125] + 8 digits. Also the primary login identifier. */
exports.egyptPhoneSchema = zod_1.z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian mobile number (e.g. 01012345678)");
exports.emailSchema = zod_1.z.string().trim().toLowerCase().email();
exports.slugSchema = zod_1.z
    .string()
    .trim()
    .min(1)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be a lowercase hyphenated slug");
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