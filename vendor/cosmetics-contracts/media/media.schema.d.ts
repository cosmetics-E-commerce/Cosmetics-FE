import { z } from "zod";
export declare const mediaQuerySchema: z.ZodObject<
  {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
  } & {
    folder: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    sortBy?: string | undefined;
    search?: string | undefined;
    folder?: string | undefined;
  },
  {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    folder?: string | undefined;
  }
>;
export type MediaQuery = z.infer<typeof mediaQuerySchema>;
export declare const mediaUploadMetadataSchema: z.ZodObject<
  {
    altText: z.ZodOptional<z.ZodString>;
    folder: z.ZodDefault<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    folder: string;
    altText?: string | undefined;
  },
  {
    altText?: string | undefined;
    folder?: string | undefined;
  }
>;
export type MediaUploadMetadata = z.infer<typeof mediaUploadMetadataSchema>;
//# sourceMappingURL=media.schema.d.ts.map
