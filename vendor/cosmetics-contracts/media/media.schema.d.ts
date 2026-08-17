import { z } from "zod";
export declare const mediaQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    folder: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    sortBy?: string | undefined;
    search?: string | undefined;
    folder?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    folder?: string | undefined;
}>;
export type MediaQuery = z.infer<typeof mediaQuerySchema>;
export declare const mediaUploadMetadataSchema: z.ZodObject<{
    altText: z.ZodOptional<z.ZodString>;
    folder: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    folder: string;
    altText?: string | undefined;
}, {
    altText?: string | undefined;
    folder?: string | undefined;
}>;
export type MediaUploadMetadata = z.infer<typeof mediaUploadMetadataSchema>;
export declare const resolveImageReferenceQuerySchema: z.ZodObject<{
    reference: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    reference: string;
}, {
    reference: string;
}>;
export type ResolveImageReferenceQuery = z.infer<typeof resolveImageReferenceQuerySchema>;
export declare const resolvedImageReferenceSchema: z.ZodObject<{
    reference: z.ZodEffects<z.ZodString, string, string>;
    source: z.ZodEnum<["storage_key", "external_url"]>;
    url: z.ZodString;
    ownedByApplication: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    url: string;
    source: "storage_key" | "external_url";
    reference: string;
    ownedByApplication: boolean;
}, {
    url: string;
    source: "storage_key" | "external_url";
    reference: string;
    ownedByApplication: boolean;
}>;
export type ResolvedImageReference = z.infer<typeof resolvedImageReferenceSchema>;
//# sourceMappingURL=media.schema.d.ts.map