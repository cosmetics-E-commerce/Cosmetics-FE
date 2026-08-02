import { z } from 'zod';
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
            nameEn: string;
            nameAr: string;
            slug: string;
            parentId: string | null;
            imageUrl: string | null;
        }, {
            sortOrder: number;
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            parentId: string | null;
            imageUrl: string | null;
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
        }, "strip", z.ZodTypeAny, {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            price: number;
        }, {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            price: number;
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
            altText: string | null;
            isPrimary: boolean;
            url: string;
        }, {
            sortOrder: number;
            id: string;
            altText: string | null;
            isPrimary: boolean;
            url: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        compareAtPrice: number | null;
        variants: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            price: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
            altText: string | null;
            isPrimary: boolean;
            url: string;
        }[];
        imageUrl: string | null;
        category: {
            sortOrder: number;
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            parentId: string | null;
            imageUrl: string | null;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
            logoUrl: string | null;
        } | null;
    }, {
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        compareAtPrice: number | null;
        variants: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            price: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
            altText: string | null;
            isPrimary: boolean;
            url: string;
        }[];
        imageUrl: string | null;
        category: {
            sortOrder: number;
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            parentId: string | null;
            imageUrl: string | null;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
            logoUrl: string | null;
        } | null;
    }>;
    addedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    productId: string;
    userId: string;
    product: {
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        compareAtPrice: number | null;
        variants: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            price: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
            altText: string | null;
            isPrimary: boolean;
            url: string;
        }[];
        imageUrl: string | null;
        category: {
            sortOrder: number;
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            parentId: string | null;
            imageUrl: string | null;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
            logoUrl: string | null;
        } | null;
    };
    addedAt: string;
}, {
    id: string;
    productId: string;
    userId: string;
    product: {
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        descriptionEn: string | null;
        descriptionAr: string | null;
        ingredients: string | null;
        howToUse: string | null;
        skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
        basePrice: number;
        compareAtPrice: number | null;
        variants: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            shadeHex: string | null;
            price: number;
        }[];
        images: {
            sortOrder: number;
            id: string;
            altText: string | null;
            isPrimary: boolean;
            url: string;
        }[];
        imageUrl: string | null;
        category: {
            sortOrder: number;
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            parentId: string | null;
            imageUrl: string | null;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
            logoUrl: string | null;
        } | null;
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
                nameEn: string;
                nameAr: string;
                slug: string;
                parentId: string | null;
                imageUrl: string | null;
            }, {
                sortOrder: number;
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                parentId: string | null;
                imageUrl: string | null;
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
            }, "strip", z.ZodTypeAny, {
                id: string;
                sku: string;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                price: number;
            }, {
                id: string;
                sku: string;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                price: number;
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
                altText: string | null;
                isPrimary: boolean;
                url: string;
            }, {
                sortOrder: number;
                id: string;
                altText: string | null;
                isPrimary: boolean;
                url: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                price: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                altText: string | null;
                isPrimary: boolean;
                url: string;
            }[];
            imageUrl: string | null;
            category: {
                sortOrder: number;
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                parentId: string | null;
                imageUrl: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
        }, {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                price: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                altText: string | null;
                isPrimary: boolean;
                url: string;
            }[];
            imageUrl: string | null;
            category: {
                sortOrder: number;
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                parentId: string | null;
                imageUrl: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
        }>;
        addedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        productId: string;
        userId: string;
        product: {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                price: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                altText: string | null;
                isPrimary: boolean;
                url: string;
            }[];
            imageUrl: string | null;
            category: {
                sortOrder: number;
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                parentId: string | null;
                imageUrl: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
        };
        addedAt: string;
    }, {
        id: string;
        productId: string;
        userId: string;
        product: {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                price: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                altText: string | null;
                isPrimary: boolean;
                url: string;
            }[];
            imageUrl: string | null;
            category: {
                sortOrder: number;
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                parentId: string | null;
                imageUrl: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
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
            nameEn: string;
            nameAr: string;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                price: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                altText: string | null;
                isPrimary: boolean;
                url: string;
            }[];
            imageUrl: string | null;
            category: {
                sortOrder: number;
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                parentId: string | null;
                imageUrl: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
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
            nameEn: string;
            nameAr: string;
            slug: string;
            descriptionEn: string | null;
            descriptionAr: string | null;
            ingredients: string | null;
            howToUse: string | null;
            skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
            basePrice: number;
            compareAtPrice: number | null;
            variants: {
                id: string;
                sku: string;
                nameEn: string;
                nameAr: string;
                shadeHex: string | null;
                price: number;
            }[];
            images: {
                sortOrder: number;
                id: string;
                altText: string | null;
                isPrimary: boolean;
                url: string;
            }[];
            imageUrl: string | null;
            category: {
                sortOrder: number;
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                parentId: string | null;
                imageUrl: string | null;
            };
            brand: {
                id: string;
                name: string;
                slug: string;
                logoUrl: string | null;
            } | null;
        };
        addedAt: string;
    }[];
    totalItems: number;
}>;
export type WishlistResponse = z.infer<typeof wishlistSchema>;
//# sourceMappingURL=wishlist.schema.d.ts.map