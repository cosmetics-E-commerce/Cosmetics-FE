import { z } from "zod";
export declare const createWishlistCollectionSchema: z.ZodObject<{
    name: z.ZodString;
    isPrivate: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    name: string;
    isPrivate: boolean;
}, {
    name: string;
    isPrivate?: boolean | undefined;
}>;
export type CreateWishlistCollectionInput = z.infer<typeof createWishlistCollectionSchema>;
export declare const updateWishlistCollectionSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    isPrivate: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    isPrivate?: boolean | undefined;
}, {
    name?: string | undefined;
    isPrivate?: boolean | undefined;
}>, {
    name?: string | undefined;
    isPrivate?: boolean | undefined;
}, {
    name?: string | undefined;
    isPrivate?: boolean | undefined;
}>;
export type UpdateWishlistCollectionInput = z.infer<typeof updateWishlistCollectionSchema>;
export declare const addWishlistItemSchema: z.ZodObject<{
    productId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    productId: string;
}, {
    productId: string;
}>;
export type AddWishlistItemInput = z.infer<typeof addWishlistItemSchema>;
export declare const wishlistItemSchema: z.ZodObject<{
    id: z.ZodString;
    collectionId: z.ZodString;
    productId: z.ZodString;
    product: z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        shortDescriptionEn: z.ZodNullable<z.ZodString>;
        shortDescriptionAr: z.ZodNullable<z.ZodString>;
        descriptionEn: z.ZodNullable<z.ZodString>;
        descriptionAr: z.ZodNullable<z.ZodString>;
        ingredients: z.ZodNullable<z.ZodString>;
        howToUse: z.ZodNullable<z.ZodString>;
        skinType: z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">;
        basePrice: z.ZodNumber;
        compareAtPrice: z.ZodNullable<z.ZodNumber>;
        rating: z.ZodNumber;
        reviewCount: z.ZodNumber;
        imageUrl: z.ZodNullable<z.ZodString>;
        category: z.ZodObject<Omit<{
            id: z.ZodString;
            parentId: z.ZodNullable<z.ZodString>;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            imageUrl: z.ZodNullable<z.ZodString>;
            sortOrder: z.ZodNumber;
            productCount: z.ZodNumber;
        }, "productCount">, "strip", z.ZodTypeAny, {
            sortOrder: number;
            id: string;
            imageUrl: string | null;
            slug: string;
            nameEn: string;
            nameAr: string;
            parentId: string | null;
        }, {
            sortOrder: number;
            id: string;
            imageUrl: string | null;
            slug: string;
            nameEn: string;
            nameAr: string;
            parentId: string | null;
        }>;
        brand: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            name: z.ZodString;
            logoUrl: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            slug: string;
            logoUrl: string | null;
        }, {
            id: string;
            name: string;
            slug: string;
            logoUrl: string | null;
        }>>;
        options: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            position: z.ZodNumber;
            values: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                valueEn: z.ZodString;
                valueAr: z.ZodString;
                position: z.ZodNumber;
                metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }, {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            values: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            id: string;
            position: number;
            nameEn: string;
            nameAr: string;
        }, {
            values: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            id: string;
            position: number;
            nameEn: string;
            nameAr: string;
        }>, "many">;
        variants: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            sku: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            price: z.ZodNumber;
            compareAtPrice: z.ZodNullable<z.ZodNumber>;
            shadeHex: z.ZodNullable<z.ZodString>;
            optionValues: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                valueEn: z.ZodString;
                valueAr: z.ZodString;
                position: z.ZodNumber;
                metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }, {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }>, "many">;
            images: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                variantId: z.ZodNullable<z.ZodString>;
                url: z.ZodString;
                altText: z.ZodNullable<z.ZodString>;
                sortOrder: z.ZodNumber;
                isPrimary: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }, {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }>, "many">;
        } & {
            stock: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            shadeHex: string | null;
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            optionValues: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            stock: number;
        }, {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            shadeHex: string | null;
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            optionValues: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            stock: number;
        }>, "many">;
        images: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            variantId: z.ZodNullable<z.ZodString>;
            url: z.ZodString;
            altText: z.ZodNullable<z.ZodString>;
            sortOrder: z.ZodNumber;
            isPrimary: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }, {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }>, "many">;
        ingredientDetails: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            inciName: z.ZodString;
            commonName: z.ZodNullable<z.ZodString>;
            slug: z.ZodString;
            position: z.ZodNumber;
            concentration: z.ZodNullable<z.ZodString>;
            concentrationUnit: z.ZodNullable<z.ZodString>;
            notes: z.ZodNullable<z.ZodString>;
            shortDescriptionEn: z.ZodNullable<z.ZodString>;
            shortDescriptionAr: z.ZodNullable<z.ZodString>;
            functions: z.ZodArray<z.ZodString, "many">;
            benefits: z.ZodArray<z.ZodString, "many">;
            concerns: z.ZodArray<z.ZodString, "many">;
            goodFor: z.ZodArray<z.ZodString, "many">;
            avoidIf: z.ZodArray<z.ZodString, "many">;
            skinTypes: z.ZodArray<z.ZodString, "many">;
            skinConcerns: z.ZodArray<z.ZodString, "many">;
            regulatoryNotes: z.ZodNullable<z.ZodString>;
            restrictions: z.ZodNullable<z.ZodString>;
            safetyNotes: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            notes: string | null;
            inciName: string;
            commonName: string | null;
            slug: string;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            functions: string[];
            benefits: string[];
            concerns: string[];
            goodFor: string[];
            avoidIf: string[];
            skinTypes: string[];
            skinConcerns: string[];
            regulatoryNotes: string | null;
            restrictions: string | null;
            safetyNotes: string | null;
            position: number;
            concentration: string | null;
            concentrationUnit: string | null;
        }, {
            id: string;
            notes: string | null;
            inciName: string;
            commonName: string | null;
            slug: string;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            functions: string[];
            benefits: string[];
            concerns: string[];
            goodFor: string[];
            avoidIf: string[];
            skinTypes: string[];
            skinConcerns: string[];
            regulatoryNotes: string | null;
            restrictions: string | null;
            safetyNotes: string | null;
            position: number;
            concentration: string | null;
            concentrationUnit: string | null;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        options: {
            values: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            id: string;
            position: number;
            nameEn: string;
            nameAr: string;
        }[];
        id: string;
        imageUrl: string | null;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        nameEn: string;
        nameAr: string;
        compareAtPrice: number | null;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        variants: {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            shadeHex: string | null;
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            optionValues: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            stock: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        rating: number;
        reviewCount: number;
        category: {
            sortOrder: number;
            id: string;
            imageUrl: string | null;
            slug: string;
            nameEn: string;
            nameAr: string;
            parentId: string | null;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
            logoUrl: string | null;
        } | null;
        ingredientDetails: {
            id: string;
            notes: string | null;
            inciName: string;
            commonName: string | null;
            slug: string;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            functions: string[];
            benefits: string[];
            concerns: string[];
            goodFor: string[];
            avoidIf: string[];
            skinTypes: string[];
            skinConcerns: string[];
            regulatoryNotes: string | null;
            restrictions: string | null;
            safetyNotes: string | null;
            position: number;
            concentration: string | null;
            concentrationUnit: string | null;
        }[];
    }, {
        options: {
            values: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            id: string;
            position: number;
            nameEn: string;
            nameAr: string;
        }[];
        id: string;
        imageUrl: string | null;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        nameEn: string;
        nameAr: string;
        compareAtPrice: number | null;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        variants: {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            shadeHex: string | null;
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            optionValues: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            stock: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        rating: number;
        reviewCount: number;
        category: {
            sortOrder: number;
            id: string;
            imageUrl: string | null;
            slug: string;
            nameEn: string;
            nameAr: string;
            parentId: string | null;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
            logoUrl: string | null;
        } | null;
        ingredientDetails: {
            id: string;
            notes: string | null;
            inciName: string;
            commonName: string | null;
            slug: string;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            functions: string[];
            benefits: string[];
            concerns: string[];
            goodFor: string[];
            avoidIf: string[];
            skinTypes: string[];
            skinConcerns: string[];
            regulatoryNotes: string | null;
            restrictions: string | null;
            safetyNotes: string | null;
            position: number;
            concentration: string | null;
            concentrationUnit: string | null;
        }[];
    }>;
    addedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    productId: string;
    collectionId: string;
    product: {
        options: {
            values: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            id: string;
            position: number;
            nameEn: string;
            nameAr: string;
        }[];
        id: string;
        imageUrl: string | null;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        nameEn: string;
        nameAr: string;
        compareAtPrice: number | null;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        variants: {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            shadeHex: string | null;
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            optionValues: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            stock: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        rating: number;
        reviewCount: number;
        category: {
            sortOrder: number;
            id: string;
            imageUrl: string | null;
            slug: string;
            nameEn: string;
            nameAr: string;
            parentId: string | null;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
            logoUrl: string | null;
        } | null;
        ingredientDetails: {
            id: string;
            notes: string | null;
            inciName: string;
            commonName: string | null;
            slug: string;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            functions: string[];
            benefits: string[];
            concerns: string[];
            goodFor: string[];
            avoidIf: string[];
            skinTypes: string[];
            skinConcerns: string[];
            regulatoryNotes: string | null;
            restrictions: string | null;
            safetyNotes: string | null;
            position: number;
            concentration: string | null;
            concentrationUnit: string | null;
        }[];
    };
    addedAt: string;
}, {
    id: string;
    productId: string;
    collectionId: string;
    product: {
        options: {
            values: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            id: string;
            position: number;
            nameEn: string;
            nameAr: string;
        }[];
        id: string;
        imageUrl: string | null;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        nameEn: string;
        nameAr: string;
        compareAtPrice: number | null;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        variants: {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            shadeHex: string | null;
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            optionValues: {
                id: string;
                valueEn: string;
                valueAr: string;
                position: number;
                metadata: Record<string, unknown> | null;
            }[];
            stock: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        rating: number;
        reviewCount: number;
        category: {
            sortOrder: number;
            id: string;
            imageUrl: string | null;
            slug: string;
            nameEn: string;
            nameAr: string;
            parentId: string | null;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
            logoUrl: string | null;
        } | null;
        ingredientDetails: {
            id: string;
            notes: string | null;
            inciName: string;
            commonName: string | null;
            slug: string;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            functions: string[];
            benefits: string[];
            concerns: string[];
            goodFor: string[];
            avoidIf: string[];
            skinTypes: string[];
            skinConcerns: string[];
            regulatoryNotes: string | null;
            restrictions: string | null;
            safetyNotes: string | null;
            position: number;
            concentration: string | null;
            concentrationUnit: string | null;
        }[];
    };
    addedAt: string;
}>;
export type WishlistItemResponse = z.infer<typeof wishlistItemSchema>;
export declare const wishlistCollectionSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    isPrivate: z.ZodBoolean;
    isDefault: z.ZodBoolean;
    shareToken: z.ZodNullable<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        collectionId: z.ZodString;
        productId: z.ZodString;
        product: z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            shortDescriptionEn: z.ZodNullable<z.ZodString>;
            shortDescriptionAr: z.ZodNullable<z.ZodString>;
            descriptionEn: z.ZodNullable<z.ZodString>;
            descriptionAr: z.ZodNullable<z.ZodString>;
            ingredients: z.ZodNullable<z.ZodString>;
            howToUse: z.ZodNullable<z.ZodString>;
            skinType: z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">;
            basePrice: z.ZodNumber;
            compareAtPrice: z.ZodNullable<z.ZodNumber>;
            rating: z.ZodNumber;
            reviewCount: z.ZodNumber;
            imageUrl: z.ZodNullable<z.ZodString>;
            category: z.ZodObject<Omit<{
                id: z.ZodString;
                parentId: z.ZodNullable<z.ZodString>;
                slug: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                imageUrl: z.ZodNullable<z.ZodString>;
                sortOrder: z.ZodNumber;
                productCount: z.ZodNumber;
            }, "productCount">, "strip", z.ZodTypeAny, {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            }, {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            }>;
            brand: z.ZodNullable<z.ZodObject<{
                id: z.ZodString;
                slug: z.ZodString;
                name: z.ZodString;
                logoUrl: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            }, {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            }>>;
            options: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                position: z.ZodNumber;
                values: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    valueEn: z.ZodString;
                    valueAr: z.ZodString;
                    position: z.ZodNumber;
                    metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }, {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }, {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }>, "many">;
            variants: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                sku: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                price: z.ZodNumber;
                compareAtPrice: z.ZodNullable<z.ZodNumber>;
                shadeHex: z.ZodNullable<z.ZodString>;
                optionValues: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    valueEn: z.ZodString;
                    valueAr: z.ZodString;
                    position: z.ZodNumber;
                    metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }, {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }>, "many">;
                images: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    variantId: z.ZodNullable<z.ZodString>;
                    url: z.ZodString;
                    altText: z.ZodNullable<z.ZodString>;
                    sortOrder: z.ZodNumber;
                    isPrimary: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }, {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }>, "many">;
            } & {
                stock: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }, {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }>, "many">;
            images: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                variantId: z.ZodNullable<z.ZodString>;
                url: z.ZodString;
                altText: z.ZodNullable<z.ZodString>;
                sortOrder: z.ZodNumber;
                isPrimary: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }, {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }>, "many">;
            ingredientDetails: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                inciName: z.ZodString;
                commonName: z.ZodNullable<z.ZodString>;
                slug: z.ZodString;
                position: z.ZodNumber;
                concentration: z.ZodNullable<z.ZodString>;
                concentrationUnit: z.ZodNullable<z.ZodString>;
                notes: z.ZodNullable<z.ZodString>;
                shortDescriptionEn: z.ZodNullable<z.ZodString>;
                shortDescriptionAr: z.ZodNullable<z.ZodString>;
                functions: z.ZodArray<z.ZodString, "many">;
                benefits: z.ZodArray<z.ZodString, "many">;
                concerns: z.ZodArray<z.ZodString, "many">;
                goodFor: z.ZodArray<z.ZodString, "many">;
                avoidIf: z.ZodArray<z.ZodString, "many">;
                skinTypes: z.ZodArray<z.ZodString, "many">;
                skinConcerns: z.ZodArray<z.ZodString, "many">;
                regulatoryNotes: z.ZodNullable<z.ZodString>;
                restrictions: z.ZodNullable<z.ZodString>;
                safetyNotes: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }, {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        }, {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        }>;
        addedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        productId: string;
        collectionId: string;
        product: {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        };
        addedAt: string;
    }, {
        id: string;
        productId: string;
        collectionId: string;
        product: {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        };
        addedAt: string;
    }>, "many">;
    totalItems: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDefault: boolean;
    name: string;
    items: {
        id: string;
        productId: string;
        collectionId: string;
        product: {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        };
        addedAt: string;
    }[];
    isPrivate: boolean;
    shareToken: string | null;
    totalItems: number;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDefault: boolean;
    name: string;
    items: {
        id: string;
        productId: string;
        collectionId: string;
        product: {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        };
        addedAt: string;
    }[];
    isPrivate: boolean;
    shareToken: string | null;
    totalItems: number;
}>;
export type WishlistCollectionResponse = z.infer<typeof wishlistCollectionSchema>;
export declare const wishlistSchema: z.ZodObject<{
    collections: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        isPrivate: z.ZodBoolean;
        isDefault: z.ZodBoolean;
        shareToken: z.ZodNullable<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            collectionId: z.ZodString;
            productId: z.ZodString;
            product: z.ZodObject<{
                id: z.ZodString;
                slug: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                shortDescriptionEn: z.ZodNullable<z.ZodString>;
                shortDescriptionAr: z.ZodNullable<z.ZodString>;
                descriptionEn: z.ZodNullable<z.ZodString>;
                descriptionAr: z.ZodNullable<z.ZodString>;
                ingredients: z.ZodNullable<z.ZodString>;
                howToUse: z.ZodNullable<z.ZodString>;
                skinType: z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">;
                basePrice: z.ZodNumber;
                compareAtPrice: z.ZodNullable<z.ZodNumber>;
                rating: z.ZodNumber;
                reviewCount: z.ZodNumber;
                imageUrl: z.ZodNullable<z.ZodString>;
                category: z.ZodObject<Omit<{
                    id: z.ZodString;
                    parentId: z.ZodNullable<z.ZodString>;
                    slug: z.ZodString;
                    nameEn: z.ZodString;
                    nameAr: z.ZodString;
                    imageUrl: z.ZodNullable<z.ZodString>;
                    sortOrder: z.ZodNumber;
                    productCount: z.ZodNumber;
                }, "productCount">, "strip", z.ZodTypeAny, {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                }, {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                }>;
                brand: z.ZodNullable<z.ZodObject<{
                    id: z.ZodString;
                    slug: z.ZodString;
                    name: z.ZodString;
                    logoUrl: z.ZodNullable<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                }, {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                }>>;
                options: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    nameEn: z.ZodString;
                    nameAr: z.ZodString;
                    position: z.ZodNumber;
                    values: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        valueEn: z.ZodString;
                        valueAr: z.ZodString;
                        position: z.ZodNumber;
                        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }, {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }, {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }>, "many">;
                variants: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    sku: z.ZodString;
                    nameEn: z.ZodString;
                    nameAr: z.ZodString;
                    price: z.ZodNumber;
                    compareAtPrice: z.ZodNullable<z.ZodNumber>;
                    shadeHex: z.ZodNullable<z.ZodString>;
                    optionValues: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        valueEn: z.ZodString;
                        valueAr: z.ZodString;
                        position: z.ZodNumber;
                        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }, {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }>, "many">;
                    images: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        variantId: z.ZodNullable<z.ZodString>;
                        url: z.ZodString;
                        altText: z.ZodNullable<z.ZodString>;
                        sortOrder: z.ZodNumber;
                        isPrimary: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }, {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }>, "many">;
                } & {
                    stock: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }, {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }>, "many">;
                images: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    variantId: z.ZodNullable<z.ZodString>;
                    url: z.ZodString;
                    altText: z.ZodNullable<z.ZodString>;
                    sortOrder: z.ZodNumber;
                    isPrimary: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }, {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }>, "many">;
                ingredientDetails: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    inciName: z.ZodString;
                    commonName: z.ZodNullable<z.ZodString>;
                    slug: z.ZodString;
                    position: z.ZodNumber;
                    concentration: z.ZodNullable<z.ZodString>;
                    concentrationUnit: z.ZodNullable<z.ZodString>;
                    notes: z.ZodNullable<z.ZodString>;
                    shortDescriptionEn: z.ZodNullable<z.ZodString>;
                    shortDescriptionAr: z.ZodNullable<z.ZodString>;
                    functions: z.ZodArray<z.ZodString, "many">;
                    benefits: z.ZodArray<z.ZodString, "many">;
                    concerns: z.ZodArray<z.ZodString, "many">;
                    goodFor: z.ZodArray<z.ZodString, "many">;
                    avoidIf: z.ZodArray<z.ZodString, "many">;
                    skinTypes: z.ZodArray<z.ZodString, "many">;
                    skinConcerns: z.ZodArray<z.ZodString, "many">;
                    regulatoryNotes: z.ZodNullable<z.ZodString>;
                    restrictions: z.ZodNullable<z.ZodString>;
                    safetyNotes: z.ZodNullable<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }, {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            }, {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            }>;
            addedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }, {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }>, "many">;
        totalItems: z.ZodNumber;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault: boolean;
        name: string;
        items: {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }[];
        isPrivate: boolean;
        shareToken: string | null;
        totalItems: number;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault: boolean;
        name: string;
        items: {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }[];
        isPrivate: boolean;
        shareToken: string | null;
        totalItems: number;
    }>, "many">;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        collectionId: z.ZodString;
        productId: z.ZodString;
        product: z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            shortDescriptionEn: z.ZodNullable<z.ZodString>;
            shortDescriptionAr: z.ZodNullable<z.ZodString>;
            descriptionEn: z.ZodNullable<z.ZodString>;
            descriptionAr: z.ZodNullable<z.ZodString>;
            ingredients: z.ZodNullable<z.ZodString>;
            howToUse: z.ZodNullable<z.ZodString>;
            skinType: z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">;
            basePrice: z.ZodNumber;
            compareAtPrice: z.ZodNullable<z.ZodNumber>;
            rating: z.ZodNumber;
            reviewCount: z.ZodNumber;
            imageUrl: z.ZodNullable<z.ZodString>;
            category: z.ZodObject<Omit<{
                id: z.ZodString;
                parentId: z.ZodNullable<z.ZodString>;
                slug: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                imageUrl: z.ZodNullable<z.ZodString>;
                sortOrder: z.ZodNumber;
                productCount: z.ZodNumber;
            }, "productCount">, "strip", z.ZodTypeAny, {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            }, {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            }>;
            brand: z.ZodNullable<z.ZodObject<{
                id: z.ZodString;
                slug: z.ZodString;
                name: z.ZodString;
                logoUrl: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            }, {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            }>>;
            options: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                position: z.ZodNumber;
                values: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    valueEn: z.ZodString;
                    valueAr: z.ZodString;
                    position: z.ZodNumber;
                    metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }, {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }, {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }>, "many">;
            variants: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                sku: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                price: z.ZodNumber;
                compareAtPrice: z.ZodNullable<z.ZodNumber>;
                shadeHex: z.ZodNullable<z.ZodString>;
                optionValues: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    valueEn: z.ZodString;
                    valueAr: z.ZodString;
                    position: z.ZodNumber;
                    metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }, {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }>, "many">;
                images: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    variantId: z.ZodNullable<z.ZodString>;
                    url: z.ZodString;
                    altText: z.ZodNullable<z.ZodString>;
                    sortOrder: z.ZodNumber;
                    isPrimary: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }, {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }>, "many">;
            } & {
                stock: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }, {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }>, "many">;
            images: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                variantId: z.ZodNullable<z.ZodString>;
                url: z.ZodString;
                altText: z.ZodNullable<z.ZodString>;
                sortOrder: z.ZodNumber;
                isPrimary: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }, {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }>, "many">;
            ingredientDetails: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                inciName: z.ZodString;
                commonName: z.ZodNullable<z.ZodString>;
                slug: z.ZodString;
                position: z.ZodNumber;
                concentration: z.ZodNullable<z.ZodString>;
                concentrationUnit: z.ZodNullable<z.ZodString>;
                notes: z.ZodNullable<z.ZodString>;
                shortDescriptionEn: z.ZodNullable<z.ZodString>;
                shortDescriptionAr: z.ZodNullable<z.ZodString>;
                functions: z.ZodArray<z.ZodString, "many">;
                benefits: z.ZodArray<z.ZodString, "many">;
                concerns: z.ZodArray<z.ZodString, "many">;
                goodFor: z.ZodArray<z.ZodString, "many">;
                avoidIf: z.ZodArray<z.ZodString, "many">;
                skinTypes: z.ZodArray<z.ZodString, "many">;
                skinConcerns: z.ZodArray<z.ZodString, "many">;
                regulatoryNotes: z.ZodNullable<z.ZodString>;
                restrictions: z.ZodNullable<z.ZodString>;
                safetyNotes: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }, {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        }, {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        }>;
        addedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        productId: string;
        collectionId: string;
        product: {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        };
        addedAt: string;
    }, {
        id: string;
        productId: string;
        collectionId: string;
        product: {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        };
        addedAt: string;
    }>, "many">;
    totalItems: z.ZodNumber;
    updatedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    updatedAt: string | null;
    items: {
        id: string;
        productId: string;
        collectionId: string;
        product: {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        };
        addedAt: string;
    }[];
    totalItems: number;
    collections: {
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault: boolean;
        name: string;
        items: {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }[];
        isPrivate: boolean;
        shareToken: string | null;
        totalItems: number;
    }[];
}, {
    updatedAt: string | null;
    items: {
        id: string;
        productId: string;
        collectionId: string;
        product: {
            options: {
                values: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                id: string;
                position: number;
                nameEn: string;
                nameAr: string;
            }[];
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            shortDescriptionEn: string | null;
            shortDescriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            compareAtPrice: number | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                shadeHex: string | null;
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                optionValues: {
                    id: string;
                    valueEn: string;
                    valueAr: string;
                    position: number;
                    metadata: Record<string, unknown> | null;
                }[];
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                variantId: string | null;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            rating: number;
            reviewCount: number;
            category: {
                sortOrder: number;
                id: string;
                imageUrl: string | null;
                slug: string;
                nameEn: string;
                nameAr: string;
                parentId: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
            ingredientDetails: {
                id: string;
                notes: string | null;
                inciName: string;
                commonName: string | null;
                slug: string;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                functions: string[];
                benefits: string[];
                concerns: string[];
                goodFor: string[];
                avoidIf: string[];
                skinTypes: string[];
                skinConcerns: string[];
                regulatoryNotes: string | null;
                restrictions: string | null;
                safetyNotes: string | null;
                position: number;
                concentration: string | null;
                concentrationUnit: string | null;
            }[];
        };
        addedAt: string;
    }[];
    totalItems: number;
    collections: {
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault: boolean;
        name: string;
        items: {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }[];
        isPrivate: boolean;
        shareToken: string | null;
        totalItems: number;
    }[];
}>;
export type WishlistResponse = z.infer<typeof wishlistSchema>;
export declare const sharedWishlistSchema: z.ZodObject<{
    owner: z.ZodObject<{
        firstName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
    }, {
        firstName: string;
    }>;
    collection: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        isDefault: z.ZodBoolean;
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            collectionId: z.ZodString;
            productId: z.ZodString;
            product: z.ZodObject<{
                id: z.ZodString;
                slug: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                shortDescriptionEn: z.ZodNullable<z.ZodString>;
                shortDescriptionAr: z.ZodNullable<z.ZodString>;
                descriptionEn: z.ZodNullable<z.ZodString>;
                descriptionAr: z.ZodNullable<z.ZodString>;
                ingredients: z.ZodNullable<z.ZodString>;
                howToUse: z.ZodNullable<z.ZodString>;
                skinType: z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">;
                basePrice: z.ZodNumber;
                compareAtPrice: z.ZodNullable<z.ZodNumber>;
                rating: z.ZodNumber;
                reviewCount: z.ZodNumber;
                imageUrl: z.ZodNullable<z.ZodString>;
                category: z.ZodObject<Omit<{
                    id: z.ZodString;
                    parentId: z.ZodNullable<z.ZodString>;
                    slug: z.ZodString;
                    nameEn: z.ZodString;
                    nameAr: z.ZodString;
                    imageUrl: z.ZodNullable<z.ZodString>;
                    sortOrder: z.ZodNumber;
                    productCount: z.ZodNumber;
                }, "productCount">, "strip", z.ZodTypeAny, {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                }, {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                }>;
                brand: z.ZodNullable<z.ZodObject<{
                    id: z.ZodString;
                    slug: z.ZodString;
                    name: z.ZodString;
                    logoUrl: z.ZodNullable<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                }, {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                }>>;
                options: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    nameEn: z.ZodString;
                    nameAr: z.ZodString;
                    position: z.ZodNumber;
                    values: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        valueEn: z.ZodString;
                        valueAr: z.ZodString;
                        position: z.ZodNumber;
                        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }, {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }, {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }>, "many">;
                variants: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    sku: z.ZodString;
                    nameEn: z.ZodString;
                    nameAr: z.ZodString;
                    price: z.ZodNumber;
                    compareAtPrice: z.ZodNullable<z.ZodNumber>;
                    shadeHex: z.ZodNullable<z.ZodString>;
                    optionValues: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        valueEn: z.ZodString;
                        valueAr: z.ZodString;
                        position: z.ZodNumber;
                        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                    }, "strip", z.ZodTypeAny, {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }, {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }>, "many">;
                    images: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        variantId: z.ZodNullable<z.ZodString>;
                        url: z.ZodString;
                        altText: z.ZodNullable<z.ZodString>;
                        sortOrder: z.ZodNumber;
                        isPrimary: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }, {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }>, "many">;
                } & {
                    stock: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }, {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }>, "many">;
                images: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    variantId: z.ZodNullable<z.ZodString>;
                    url: z.ZodString;
                    altText: z.ZodNullable<z.ZodString>;
                    sortOrder: z.ZodNumber;
                    isPrimary: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }, {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }>, "many">;
                ingredientDetails: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    inciName: z.ZodString;
                    commonName: z.ZodNullable<z.ZodString>;
                    slug: z.ZodString;
                    position: z.ZodNumber;
                    concentration: z.ZodNullable<z.ZodString>;
                    concentrationUnit: z.ZodNullable<z.ZodString>;
                    notes: z.ZodNullable<z.ZodString>;
                    shortDescriptionEn: z.ZodNullable<z.ZodString>;
                    shortDescriptionAr: z.ZodNullable<z.ZodString>;
                    functions: z.ZodArray<z.ZodString, "many">;
                    benefits: z.ZodArray<z.ZodString, "many">;
                    concerns: z.ZodArray<z.ZodString, "many">;
                    goodFor: z.ZodArray<z.ZodString, "many">;
                    avoidIf: z.ZodArray<z.ZodString, "many">;
                    skinTypes: z.ZodArray<z.ZodString, "many">;
                    skinConcerns: z.ZodArray<z.ZodString, "many">;
                    regulatoryNotes: z.ZodNullable<z.ZodString>;
                    restrictions: z.ZodNullable<z.ZodString>;
                    safetyNotes: z.ZodNullable<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }, {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            }, {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            }>;
            addedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }, {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }>, "many">;
        totalItems: z.ZodNumber;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    } & {
        isPrivate: z.ZodLiteral<false>;
        shareToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault: boolean;
        name: string;
        items: {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }[];
        isPrivate: false;
        shareToken: string;
        totalItems: number;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault: boolean;
        name: string;
        items: {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }[];
        isPrivate: false;
        shareToken: string;
        totalItems: number;
    }>;
}, "strip", z.ZodTypeAny, {
    owner: {
        firstName: string;
    };
    collection: {
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault: boolean;
        name: string;
        items: {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }[];
        isPrivate: false;
        shareToken: string;
        totalItems: number;
    };
}, {
    owner: {
        firstName: string;
    };
    collection: {
        id: string;
        createdAt: string;
        updatedAt: string;
        isDefault: boolean;
        name: string;
        items: {
            id: string;
            productId: string;
            collectionId: string;
            product: {
                options: {
                    values: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    id: string;
                    position: number;
                    nameEn: string;
                    nameAr: string;
                }[];
                id: string;
                imageUrl: string | null;
                slug: string;
                descriptionEn: string | null;
                descriptionAr: string | null;
                shortDescriptionEn: string | null;
                shortDescriptionAr: string | null;
                nameEn: string;
                nameAr: string;
                compareAtPrice: number | null;
                ingredients: string | null;
                howToUse: string | null;
                skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
                basePrice: number;
                variants: {
                    id: string;
                    sku: string;
                    price: number;
                    nameEn: string;
                    nameAr: string;
                    compareAtPrice: number | null;
                    shadeHex: string | null;
                    images: {
                        sortOrder: number;
                        id: string;
                        variantId: string | null;
                        url: string;
                        altText: string | null;
                        isPrimary: boolean;
                    }[];
                    optionValues: {
                        id: string;
                        valueEn: string;
                        valueAr: string;
                        position: number;
                        metadata: Record<string, unknown> | null;
                    }[];
                    stock: number;
                }[];
                images: {
                    sortOrder: number;
                    id: string;
                    variantId: string | null;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
                rating: number;
                reviewCount: number;
                category: {
                    sortOrder: number;
                    id: string;
                    imageUrl: string | null;
                    slug: string;
                    nameEn: string;
                    nameAr: string;
                    parentId: string | null;
                };
                brand: {
                    id: string;
                    name: string;
                    slug: string;
                    logoUrl: string | null;
                } | null;
                ingredientDetails: {
                    id: string;
                    notes: string | null;
                    inciName: string;
                    commonName: string | null;
                    slug: string;
                    shortDescriptionEn: string | null;
                    shortDescriptionAr: string | null;
                    functions: string[];
                    benefits: string[];
                    concerns: string[];
                    goodFor: string[];
                    avoidIf: string[];
                    skinTypes: string[];
                    skinConcerns: string[];
                    regulatoryNotes: string | null;
                    restrictions: string | null;
                    safetyNotes: string | null;
                    position: number;
                    concentration: string | null;
                    concentrationUnit: string | null;
                }[];
            };
            addedAt: string;
        }[];
        isPrivate: false;
        shareToken: string;
        totalItems: number;
    };
}>;
export type SharedWishlistResponse = z.infer<typeof sharedWishlistSchema>;
//# sourceMappingURL=wishlist.schema.d.ts.map