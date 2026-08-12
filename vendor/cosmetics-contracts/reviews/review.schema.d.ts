import { z } from "zod";
export declare const reviewStatusSchema: z.ZodEnum<["PENDING", "APPROVED", "REJECTED"]>;
export declare const createReviewSchema: z.ZodObject<{
    rating: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    rating: number;
    title?: string | undefined;
    body?: string | undefined;
}, {
    rating: number;
    title?: string | undefined;
    body?: string | undefined;
}>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export declare const updateReviewSchema: z.ZodEffects<z.ZodObject<{
    rating: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    body: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    rating?: number | undefined;
    title?: string | undefined;
    body?: string | undefined;
}, {
    rating?: number | undefined;
    title?: string | undefined;
    body?: string | undefined;
}>, {
    rating?: number | undefined;
    title?: string | undefined;
    body?: string | undefined;
}, {
    rating?: number | undefined;
    title?: string | undefined;
    body?: string | undefined;
}>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export declare const reviewQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    status: z.ZodOptional<z.ZodEnum<["PENDING", "APPROVED", "REJECTED"]>>;
    productId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    status?: "PENDING" | "APPROVED" | "REJECTED" | undefined;
    sortBy?: string | undefined;
    productId?: string | undefined;
}, {
    status?: "PENDING" | "APPROVED" | "REJECTED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    productId?: string | undefined;
}>;
export type ReviewQuery = z.infer<typeof reviewQuerySchema>;
export declare const moderateReviewSchema: z.ZodObject<{
    status: z.ZodEnum<["APPROVED", "REJECTED"]>;
}, "strip", z.ZodTypeAny, {
    status: "APPROVED" | "REJECTED";
}, {
    status: "APPROVED" | "REJECTED";
}>;
export type ModerateReviewInput = z.infer<typeof moderateReviewSchema>;
export declare const reviewResponseSchema: z.ZodObject<{
    id: z.ZodString;
    productId: z.ZodString;
    orderId: z.ZodNullable<z.ZodString>;
    rating: z.ZodNumber;
    title: z.ZodNullable<z.ZodString>;
    body: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<["PENDING", "APPROVED", "REJECTED"]>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    moderatedAt: z.ZodNullable<z.ZodString>;
    author: z.ZodObject<{
        firstName: z.ZodString;
        lastInitial: z.ZodString;
        verifiedPurchase: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastInitial: string;
        verifiedPurchase: boolean;
    }, {
        firstName: string;
        lastInitial: string;
        verifiedPurchase: boolean;
    }>;
    product: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        slug: string;
        nameEn: string;
        nameAr: string;
    }, {
        id: string;
        slug: string;
        nameEn: string;
        nameAr: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "PENDING" | "APPROVED" | "REJECTED";
    id: string;
    createdAt: string;
    updatedAt: string;
    orderId: string | null;
    productId: string;
    rating: number;
    title: string | null;
    body: string | null;
    moderatedAt: string | null;
    author: {
        firstName: string;
        lastInitial: string;
        verifiedPurchase: boolean;
    };
    product?: {
        id: string;
        slug: string;
        nameEn: string;
        nameAr: string;
    } | undefined;
}, {
    status: "PENDING" | "APPROVED" | "REJECTED";
    id: string;
    createdAt: string;
    updatedAt: string;
    orderId: string | null;
    productId: string;
    rating: number;
    title: string | null;
    body: string | null;
    moderatedAt: string | null;
    author: {
        firstName: string;
        lastInitial: string;
        verifiedPurchase: boolean;
    };
    product?: {
        id: string;
        slug: string;
        nameEn: string;
        nameAr: string;
    } | undefined;
}>;
export type ReviewResponse = z.infer<typeof reviewResponseSchema>;
export declare const reviewSummarySchema: z.ZodObject<{
    average: z.ZodNumber;
    count: z.ZodNumber;
    distribution: z.ZodRecord<z.ZodString, z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    average: number;
    count: number;
    distribution: Record<string, number>;
}, {
    average: number;
    count: number;
    distribution: Record<string, number>;
}>;
export type ReviewSummaryResponse = z.infer<typeof reviewSummarySchema>;
export declare const reviewEligibilitySchema: z.ZodObject<{
    canReview: z.ZodBoolean;
    reason: z.ZodEnum<["ELIGIBLE", "NOT_DELIVERED", "ALREADY_REVIEWED"]>;
    purchase: z.ZodNullable<z.ZodObject<{
        orderId: z.ZodString;
        orderNumber: z.ZodString;
        placedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        orderNumber: string;
        placedAt: string;
        orderId: string;
    }, {
        orderNumber: string;
        placedAt: string;
        orderId: string;
    }>>;
    existingReview: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodString;
        orderId: z.ZodNullable<z.ZodString>;
        rating: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        body: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<["PENDING", "APPROVED", "REJECTED"]>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        moderatedAt: z.ZodNullable<z.ZodString>;
        author: z.ZodObject<{
            firstName: z.ZodString;
            lastInitial: z.ZodString;
            verifiedPurchase: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        }, {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        }>;
        product: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        }, {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        status: "PENDING" | "APPROVED" | "REJECTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        orderId: string | null;
        productId: string;
        rating: number;
        title: string | null;
        body: string | null;
        moderatedAt: string | null;
        author: {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        };
        product?: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        } | undefined;
    }, {
        status: "PENDING" | "APPROVED" | "REJECTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        orderId: string | null;
        productId: string;
        rating: number;
        title: string | null;
        body: string | null;
        moderatedAt: string | null;
        author: {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        };
        product?: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    reason: "ELIGIBLE" | "NOT_DELIVERED" | "ALREADY_REVIEWED";
    canReview: boolean;
    purchase: {
        orderNumber: string;
        placedAt: string;
        orderId: string;
    } | null;
    existingReview: {
        status: "PENDING" | "APPROVED" | "REJECTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        orderId: string | null;
        productId: string;
        rating: number;
        title: string | null;
        body: string | null;
        moderatedAt: string | null;
        author: {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        };
        product?: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        } | undefined;
    } | null;
}, {
    reason: "ELIGIBLE" | "NOT_DELIVERED" | "ALREADY_REVIEWED";
    canReview: boolean;
    purchase: {
        orderNumber: string;
        placedAt: string;
        orderId: string;
    } | null;
    existingReview: {
        status: "PENDING" | "APPROVED" | "REJECTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        orderId: string | null;
        productId: string;
        rating: number;
        title: string | null;
        body: string | null;
        moderatedAt: string | null;
        author: {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        };
        product?: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        } | undefined;
    } | null;
}>;
export type ReviewEligibilityResponse = z.infer<typeof reviewEligibilitySchema>;
export declare const customerReviewLibrarySchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodString;
        orderId: z.ZodNullable<z.ZodString>;
        rating: z.ZodNumber;
        title: z.ZodNullable<z.ZodString>;
        body: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<["PENDING", "APPROVED", "REJECTED"]>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        moderatedAt: z.ZodNullable<z.ZodString>;
        author: z.ZodObject<{
            firstName: z.ZodString;
            lastInitial: z.ZodString;
            verifiedPurchase: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        }, {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        }>;
        product: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        }, {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        status: "PENDING" | "APPROVED" | "REJECTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        orderId: string | null;
        productId: string;
        rating: number;
        title: string | null;
        body: string | null;
        moderatedAt: string | null;
        author: {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        };
        product?: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        } | undefined;
    }, {
        status: "PENDING" | "APPROVED" | "REJECTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        orderId: string | null;
        productId: string;
        rating: number;
        title: string | null;
        body: string | null;
        moderatedAt: string | null;
        author: {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        };
        product?: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        } | undefined;
    }>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    items: {
        status: "PENDING" | "APPROVED" | "REJECTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        orderId: string | null;
        productId: string;
        rating: number;
        title: string | null;
        body: string | null;
        moderatedAt: string | null;
        author: {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        };
        product?: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        } | undefined;
    }[];
}, {
    total: number;
    items: {
        status: "PENDING" | "APPROVED" | "REJECTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        orderId: string | null;
        productId: string;
        rating: number;
        title: string | null;
        body: string | null;
        moderatedAt: string | null;
        author: {
            firstName: string;
            lastInitial: string;
            verifiedPurchase: boolean;
        };
        product?: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        } | undefined;
    }[];
}>;
export type CustomerReviewLibraryResponse = z.infer<typeof customerReviewLibrarySchema>;
//# sourceMappingURL=review.schema.d.ts.map