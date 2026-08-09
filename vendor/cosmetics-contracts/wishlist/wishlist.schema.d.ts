import { z } from "zod";
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
    userId: z.ZodString;
    productId: z.ZodString;
    product: z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
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
        variants: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            sku: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            price: z.ZodNumber;
            shadeHex: z.ZodNullable<z.ZodString>;
        } & {
            stock: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            stock: number;
        }, {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            stock: number;
        }>, "many">;
        images: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            url: z.ZodString;
            altText: z.ZodNullable<z.ZodString>;
            sortOrder: z.ZodNumber;
            isPrimary: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            sortOrder: number;
            id: string;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }, {
            sortOrder: number;
            id: string;
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
        id: string;
        imageUrl: string | null;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        nameEn: string;
        nameAr: string;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        compareAtPrice: number | null;
        variants: {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            stock: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
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
        id: string;
        imageUrl: string | null;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        nameEn: string;
        nameAr: string;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        compareAtPrice: number | null;
        variants: {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            stock: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
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
    userId: string;
    product: {
        id: string;
        imageUrl: string | null;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        nameEn: string;
        nameAr: string;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        compareAtPrice: number | null;
        variants: {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            stock: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
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
    userId: string;
    product: {
        id: string;
        imageUrl: string | null;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        nameEn: string;
        nameAr: string;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        compareAtPrice: number | null;
        variants: {
            id: string;
            sku: string;
            price: number;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            stock: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
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
export declare const wishlistSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        productId: z.ZodString;
        product: z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
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
            variants: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                sku: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                price: z.ZodNumber;
                shadeHex: z.ZodNullable<z.ZodString>;
            } & {
                stock: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                stock: number;
            }, {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                stock: number;
            }>, "many">;
            images: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                url: z.ZodString;
                altText: z.ZodNullable<z.ZodString>;
                sortOrder: z.ZodNumber;
                isPrimary: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                sortOrder: number;
                id: string;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }, {
                sortOrder: number;
                id: string;
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
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
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
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
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
        userId: string;
        product: {
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
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
        userId: string;
        product: {
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
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
        userId: string;
        product: {
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
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
}, {
    updatedAt: string | null;
    items: {
        id: string;
        productId: string;
        userId: string;
        product: {
            id: string;
            imageUrl: string | null;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            nameEn: string;
            nameAr: string;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                price: number;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                stock: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
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
}>;
export type WishlistResponse = z.infer<typeof wishlistSchema>;
//# sourceMappingURL=wishlist.schema.d.ts.map