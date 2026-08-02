import { z } from 'zod';
export declare const managedAdminRoleSchema: z.ZodEnum<["SUPER_ADMIN", "ADMIN"]>;
export declare const adminAccountSchema: z.ZodObject<{
    id: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodString;
    email: z.ZodNullable<z.ZodString>;
    role: z.ZodEnum<["SUPER_ADMIN", "ADMIN"]>;
    status: z.ZodEnum<["ACTIVE", "INACTIVE", "DELETED"]>;
    permissions: z.ZodArray<z.ZodString, "many">;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    deletedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    id: string;
    permissions: string[];
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
    role: "SUPER_ADMIN" | "ADMIN";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}, {
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    id: string;
    permissions: string[];
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
    role: "SUPER_ADMIN" | "ADMIN";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}>;
export type AdminAccountResponse = z.infer<typeof adminAccountSchema>;
export declare const adminAccountsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["SUPER_ADMIN", "ADMIN"]>>;
    status: z.ZodOptional<z.ZodEnum<["ACTIVE", "INACTIVE", "DELETED"]>>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "firstName"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "firstName" | "createdAt" | "updatedAt";
    sortOrder: "asc" | "desc";
    status?: "ACTIVE" | "INACTIVE" | "DELETED" | undefined;
    role?: "SUPER_ADMIN" | "ADMIN" | undefined;
    search?: string | undefined;
}, {
    status?: "ACTIVE" | "INACTIVE" | "DELETED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "firstName" | "createdAt" | "updatedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    role?: "SUPER_ADMIN" | "ADMIN" | undefined;
    search?: string | undefined;
}>;
export type AdminAccountsQuery = z.infer<typeof adminAccountsQuerySchema>;
export declare const updateManagedAdminSchema: z.ZodEffects<z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
}>, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
}>;
export type UpdateManagedAdminInput = z.infer<typeof updateManagedAdminSchema>;
//# sourceMappingURL=admin.schema.d.ts.map