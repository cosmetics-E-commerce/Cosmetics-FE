import { z } from "zod";
export declare const auditActorSchema: z.ZodNullable<z.ZodObject<{
    id: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodNullable<z.ZodString>;
    phone: z.ZodString;
    role: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
    role: string;
}, {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
    role: string;
}>>;
export type AuditActor = z.infer<typeof auditActorSchema>;
export declare const auditLogSchema: z.ZodObject<{
    id: z.ZodString;
    actorId: z.ZodNullable<z.ZodString>;
    actor: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodNullable<z.ZodString>;
        phone: z.ZodString;
        role: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        role: string;
    }, {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        role: string;
    }>>;
    action: z.ZodString;
    resourceType: z.ZodString;
    resourceId: z.ZodNullable<z.ZodString>;
    before: z.ZodNullable<z.ZodUnknown>;
    after: z.ZodNullable<z.ZodUnknown>;
    ip: z.ZodNullable<z.ZodString>;
    userAgent: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    action: string;
    createdAt: string;
    ip: string | null;
    actorId: string | null;
    actor: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        role: string;
    } | null;
    resourceType: string;
    resourceId: string | null;
    userAgent: string | null;
    before?: unknown;
    after?: unknown;
}, {
    id: string;
    action: string;
    createdAt: string;
    ip: string | null;
    actorId: string | null;
    actor: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        role: string;
    } | null;
    resourceType: string;
    resourceId: string | null;
    userAgent: string | null;
    before?: unknown;
    after?: unknown;
}>;
export type AuditLogResponse = z.infer<typeof auditLogSchema>;
export declare const auditLogQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    action: z.ZodOptional<z.ZodString>;
    resourceType: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    resourceId: z.ZodOptional<z.ZodString>;
    dateFrom: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    dateTo: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    action?: string | undefined;
    search?: string | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
    actorId?: string | undefined;
    resourceType?: string | undefined;
    resourceId?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    action?: string | undefined;
    search?: string | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
    actorId?: string | undefined;
    resourceType?: string | undefined;
    resourceId?: string | undefined;
}>;
export type AuditLogQuery = z.infer<typeof auditLogQuerySchema>;
export declare const auditLogListSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        actorId: z.ZodNullable<z.ZodString>;
        actor: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            firstName: z.ZodString;
            lastName: z.ZodString;
            email: z.ZodNullable<z.ZodString>;
            phone: z.ZodString;
            role: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
            role: string;
        }, {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
            role: string;
        }>>;
        action: z.ZodString;
        resourceType: z.ZodString;
        resourceId: z.ZodNullable<z.ZodString>;
        before: z.ZodNullable<z.ZodUnknown>;
        after: z.ZodNullable<z.ZodUnknown>;
        ip: z.ZodNullable<z.ZodString>;
        userAgent: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        action: string;
        createdAt: string;
        ip: string | null;
        actorId: string | null;
        actor: {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
            role: string;
        } | null;
        resourceType: string;
        resourceId: string | null;
        userAgent: string | null;
        before?: unknown;
        after?: unknown;
    }, {
        id: string;
        action: string;
        createdAt: string;
        ip: string | null;
        actorId: string | null;
        actor: {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
            role: string;
        } | null;
        resourceType: string;
        resourceId: string | null;
        userAgent: string | null;
        before?: unknown;
        after?: unknown;
    }>, "many">;
    meta: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        action: string;
        createdAt: string;
        ip: string | null;
        actorId: string | null;
        actor: {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
            role: string;
        } | null;
        resourceType: string;
        resourceId: string | null;
        userAgent: string | null;
        before?: unknown;
        after?: unknown;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    data: {
        id: string;
        action: string;
        createdAt: string;
        ip: string | null;
        actorId: string | null;
        actor: {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
            role: string;
        } | null;
        resourceType: string;
        resourceId: string | null;
        userAgent: string | null;
        before?: unknown;
        after?: unknown;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export type AuditLogListResponse = z.infer<typeof auditLogListSchema>;
//# sourceMappingURL=audit.schema.d.ts.map