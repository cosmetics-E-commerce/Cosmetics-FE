import { z } from "zod";
export declare const apiFieldErrorsSchema: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>;
export declare const apiErrorProblemSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    details: z.ZodOptional<z.ZodUnknown>;
    fieldErrors: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
    retryable: z.ZodBoolean;
    requestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    fieldErrors: Record<string, string[]>;
    retryable: boolean;
    requestId: string;
    details?: unknown;
}, {
    code: string;
    message: string;
    retryable: boolean;
    requestId: string;
    details?: unknown;
    fieldErrors?: Record<string, string[]> | undefined;
}>;
/**
 * Canonical public failure response. The duplicated top-level fields preserve
 * compatibility with older BioReza clients while they migrate to `error`.
 */
export declare const apiErrorResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodUnknown>;
        fieldErrors: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
        retryable: z.ZodBoolean;
        requestId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        fieldErrors: Record<string, string[]>;
        retryable: boolean;
        requestId: string;
        details?: unknown;
    }, {
        code: string;
        message: string;
        retryable: boolean;
        requestId: string;
        details?: unknown;
        fieldErrors?: Record<string, string[]> | undefined;
    }>;
    statusCode: z.ZodNumber;
    code: z.ZodString;
    message: z.ZodString;
    details: z.ZodOptional<z.ZodUnknown>;
    fieldErrors: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
    retryable: z.ZodBoolean;
    requestId: z.ZodString;
    path: z.ZodString;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    path: string;
    message: string;
    fieldErrors: Record<string, string[]>;
    retryable: boolean;
    requestId: string;
    success: false;
    error: {
        code: string;
        message: string;
        fieldErrors: Record<string, string[]>;
        retryable: boolean;
        requestId: string;
        details?: unknown;
    };
    statusCode: number;
    timestamp: string;
    details?: unknown;
}, {
    code: string;
    path: string;
    message: string;
    retryable: boolean;
    requestId: string;
    success: false;
    error: {
        code: string;
        message: string;
        retryable: boolean;
        requestId: string;
        details?: unknown;
        fieldErrors?: Record<string, string[]> | undefined;
    };
    statusCode: number;
    timestamp: string;
    details?: unknown;
    fieldErrors?: Record<string, string[]> | undefined;
}>;
export type ApiFieldErrors = z.infer<typeof apiFieldErrorsSchema>;
export type ApiErrorProblem = z.infer<typeof apiErrorProblemSchema>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
//# sourceMappingURL=error.d.ts.map