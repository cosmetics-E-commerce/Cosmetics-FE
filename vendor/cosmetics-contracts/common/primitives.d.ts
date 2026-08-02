import { z } from 'zod';
export declare const uuidSchema: z.ZodString;
/**
 * Money is always integer piastres (1 EGP = 100 piastres).
 * Never a float — see PLAN.md §10.5.
 */
export declare const piastresSchema: z.ZodNumber;
/** Egyptian mobile: 01[0125] + 8 digits. Also the primary login identifier. */
export declare const egyptPhoneSchema: z.ZodString;
export declare const emailSchema: z.ZodString;
export declare const slugSchema: z.ZodString;
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