import { z } from "zod";
/**
 * New permission keys use `resource:action`. The database also contains
 * established scoped keys such as `orders.payment.review`; accepting those
 * keeps existing grants valid while the catalogue is migrated incrementally.
 * Permission keys are DATA, not code — adding a capability is a seed row, not
 * a new `if` branch. PLAN.md §2.2.
 */
export declare const permissionKeySchema: z.ZodString;
export declare const permissionSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    resource: z.ZodString;
    action: z.ZodString;
    description: z.ZodString;
    isDangerous: z.ZodBoolean;
    superOnly: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;
    resource: string;
    action: string;
    description: string;
    isDangerous: boolean;
    superOnly: boolean;
}, {
    id: string;
    key: string;
    resource: string;
    action: string;
    description: string;
    isDangerous: boolean;
    superOnly: boolean;
}>;
export type Permission = z.infer<typeof permissionSchema>;
/**
 * Grant/revoke payload. The server rejects any key flagged `superOnly`
 * regardless of what the client sends — an Admin must never be able to
 * self-elevate. PLAN.md §2.3.
 */
export declare const updateAdminPermissionsSchema: z.ZodEffects<z.ZodObject<{
    grant: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    revoke: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strict", z.ZodTypeAny, {
    grant: string[];
    revoke: string[];
}, {
    grant?: string[] | undefined;
    revoke?: string[] | undefined;
}>, {
    grant: string[];
    revoke: string[];
}, {
    grant?: string[] | undefined;
    revoke?: string[] | undefined;
}>;
export type UpdateAdminPermissionsInput = z.infer<typeof updateAdminPermissionsSchema>;
export declare const adminPermissionsSchema: z.ZodObject<{
    adminId: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    adminId: string;
    permissions: string[];
}, {
    adminId: string;
    permissions: string[];
}>;
export type AdminPermissionsResponse = z.infer<typeof adminPermissionsSchema>;
export declare const createAdminSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodString;
    email: z.ZodString;
    /** Omit to apply the Admin baseline grant set. */
    permissions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    permissions?: string[] | undefined;
}, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    permissions?: string[] | undefined;
}>;
export type CreateAdminInput = z.infer<typeof createAdminSchema>;
//# sourceMappingURL=permission.schema.d.ts.map