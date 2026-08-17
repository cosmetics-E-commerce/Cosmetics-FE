import { z } from "zod";
export declare const IMAGE_REFERENCE_MAX_LENGTH = 2048;
export type ImageReferenceSource = "storage_key" | "external_url";
export type ImageReference = {
    source: ImageReferenceSource;
    value: string;
};
export declare function normalizeImageReference(value: string): string;
export declare function isAbsoluteHttpImageUrl(value: string): boolean;
export declare function isSafeExternalImageUrl(value: string): boolean;
export declare function isSafeStorageImageKey(value: string): boolean;
export declare function classifyImageReference(value: string): ImageReferenceSource | null;
export declare function resolveImageReferenceUrl(value: string | null | undefined, publicBaseUrl?: string | null): string | null;
export declare const imageReferenceValueSchema: z.ZodEffects<z.ZodString, string, string>;
//# sourceMappingURL=image-reference.schema.d.ts.map