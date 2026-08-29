import { z } from "zod";
export declare const uuidSchema: z.ZodString;
/**
 * Money is always integer piastres (1 EGP = 100 piastres).
 * Never a float — see PLAN.md §10.5.
 */
export declare const piastresSchema: z.ZodNumber;
/** Maximum value of a PostgreSQL/Prisma `Int` column. */
export declare const DATABASE_INT_MAX = 2147483647;
/** Money accepted for fields persisted in PostgreSQL `Int` columns. */
export declare const databasePiastresSchema: z.ZodNumber;
/**
 * Customer phone numbers are persisted in E.164. A local number without a
 * calling code is interpreted as Egyptian for backwards compatibility.
 */
export declare const internationalPhoneSchema: z.ZodEffects<z.ZodString, string, string>;
/** @deprecated Prefer internationalPhoneSchema. Retained for contract compatibility. */
export declare const egyptPhoneSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const emailSchema: z.ZodString;
export declare const slugSchema: z.ZodString;
/**
 * Identifiers that are copied between systems (SKUs, coupons) must not differ
 * only through Unicode normalization, whitespace, or invisible control/format
 * characters. Display text deliberately does not use this stricter policy.
 */
export declare function compactIdentifierSchema(min: number, max: number): z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodString, string, string>>;
/**
 * Idempotency-Key header value. Client-generated UUID, unique per logical
 * operation attempt, reused across network retries of that same attempt.
 * See PLAN.md §6.2.
 */
export declare const idempotencyKeySchema: z.ZodString;
/** InstaPay address (IPA), e.g. "someone@instapay" or a mobile-linked handle. */
export declare const instapayAddressSchema: z.ZodString;
export declare const bilingualTextSchema: z.ZodObject<{
    en: z.ZodString;
    ar: z.ZodString;
}, "strip", z.ZodTypeAny, {
    en: string;
    ar: string;
}, {
    en: string;
    ar: string;
}>;
//# sourceMappingURL=primitives.d.ts.map