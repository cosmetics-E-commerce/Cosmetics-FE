"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientImportRowSchema =
  exports.ingredientExternalQuerySchema =
  exports.barcodeSchema =
  exports.parseIngredientListSchema =
  exports.ingredientResponseSchema =
  exports.ingredientSummarySchema =
  exports.productIngredientInputSchema =
  exports.ingredientQuerySchema =
  exports.updateIngredientSchema =
  exports.createIngredientSchema =
  exports.ingredientInputSchema =
  exports.ingredientSourceSchema =
    void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
const cleanListSchema = zod_1.z
  .array(zod_1.z.string().trim().min(1).max(300))
  .max(100)
  .transform((items) => [
    ...new Map(items.map((item) => [item.toLocaleLowerCase("en-US"), item])).values(),
  ]);
exports.ingredientSourceSchema = zod_1.z.enum([
  "CURATED",
  "COSING",
  "PUBCHEM",
  "OPEN_BEAUTY_FACTS",
  "ADMIN",
  "IMPORT",
]);
exports.ingredientInputSchema = zod_1.z
  .object({
    inciName: zod_1.z.string().trim().min(1).max(240),
    commonName: zod_1.z.string().trim().max(240).nullable().optional(),
    slug: primitives_1.slugSchema.optional(),
    descriptionEn: zod_1.z.string().trim().max(10000).nullable().optional(),
    descriptionAr: zod_1.z.string().trim().max(10000).nullable().optional(),
    shortDescriptionEn: zod_1.z.string().trim().max(800).nullable().optional(),
    shortDescriptionAr: zod_1.z.string().trim().max(800).nullable().optional(),
    casNumber: zod_1.z.string().trim().max(64).nullable().optional(),
    ecNumber: zod_1.z.string().trim().max(64).nullable().optional(),
    pubchemCid: zod_1.z.number().int().positive().nullable().optional(),
    functions: cleanListSchema.optional(),
    benefits: cleanListSchema.optional(),
    concerns: cleanListSchema.optional(),
    goodFor: cleanListSchema.optional(),
    avoidIf: cleanListSchema.optional(),
    skinTypes: cleanListSchema.optional(),
    skinConcerns: cleanListSchema.optional(),
    aliases: cleanListSchema.optional(),
    regulatoryNotes: zod_1.z.string().trim().max(5000).nullable().optional(),
    restrictions: zod_1.z.string().trim().max(5000).nullable().optional(),
    safetyNotes: zod_1.z.string().trim().max(5000).nullable().optional(),
    source: exports.ingredientSourceSchema.optional(),
    sourceUrl: zod_1.z.string().url().max(2048).nullable().optional(),
    externalId: zod_1.z.string().trim().max(160).nullable().optional(),
    isActive: zod_1.z.boolean().optional(),
    isFeatured: zod_1.z.boolean().optional(),
  })
  .strict();
exports.createIngredientSchema = exports.ingredientInputSchema;
exports.updateIngredientSchema = exports.ingredientInputSchema.partial();
exports.ingredientQuerySchema = pagination_1.paginationQuerySchema.extend({
  search: zod_1.z.string().trim().min(1).max(120).optional(),
  status: zod_1.z.enum(["active", "inactive", "all"]).default("active"),
  source: exports.ingredientSourceSchema.optional(),
  featured: zod_1.z.coerce.boolean().optional(),
  sortBy: zod_1.z.enum(["inciName", "commonName", "createdAt", "updatedAt"]).default("inciName"),
});
exports.productIngredientInputSchema = zod_1.z.object({
  ingredientId: primitives_1.uuidSchema,
  position: zod_1.z.number().int().min(0).optional(),
  concentration: zod_1.z.string().trim().max(64).nullable().optional(),
  concentrationUnit: zod_1.z.string().trim().max(32).nullable().optional(),
  notes: zod_1.z.string().trim().max(500).nullable().optional(),
});
exports.ingredientSummarySchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  inciName: zod_1.z.string(),
  commonName: zod_1.z.string().nullable(),
  slug: zod_1.z.string(),
  position: zod_1.z.number().int(),
  concentration: zod_1.z.string().nullable(),
  concentrationUnit: zod_1.z.string().nullable(),
  notes: zod_1.z.string().nullable(),
  shortDescriptionEn: zod_1.z.string().nullable(),
  shortDescriptionAr: zod_1.z.string().nullable(),
  functions: zod_1.z.array(zod_1.z.string()),
  benefits: zod_1.z.array(zod_1.z.string()),
  concerns: zod_1.z.array(zod_1.z.string()),
  goodFor: zod_1.z.array(zod_1.z.string()),
  avoidIf: zod_1.z.array(zod_1.z.string()),
  skinTypes: zod_1.z.array(zod_1.z.string()),
  skinConcerns: zod_1.z.array(zod_1.z.string()),
  regulatoryNotes: zod_1.z.string().nullable(),
  restrictions: zod_1.z.string().nullable(),
  safetyNotes: zod_1.z.string().nullable(),
});
exports.ingredientResponseSchema = exports.ingredientSummarySchema
  .omit({
    position: true,
    concentration: true,
    concentrationUnit: true,
    notes: true,
  })
  .extend({
    descriptionEn: zod_1.z.string().nullable(),
    descriptionAr: zod_1.z.string().nullable(),
    casNumber: zod_1.z.string().nullable(),
    ecNumber: zod_1.z.string().nullable(),
    pubchemCid: zod_1.z.number().int().nullable(),
    aliases: zod_1.z.array(zod_1.z.string()),
    source: zod_1.z.string(),
    sourceUrl: zod_1.z.string().nullable(),
    externalId: zod_1.z.string().nullable(),
    isActive: zod_1.z.boolean(),
    isFeatured: zod_1.z.boolean(),
    productCount: zod_1.z.number().int().nonnegative(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
  });
exports.parseIngredientListSchema = zod_1.z
  .object({ raw: zod_1.z.string().trim().min(1).max(30000) })
  .strict();
exports.barcodeSchema = zod_1.z
  .string()
  .trim()
  .regex(/^\d{8,14}$/, "Barcode must contain 8 to 14 digits");
exports.ingredientExternalQuerySchema = zod_1.z
  .object({ query: zod_1.z.string().trim().min(2).max(240) })
  .strict();
exports.ingredientImportRowSchema = exports.ingredientInputSchema.extend({
  aliases: cleanListSchema.optional(),
});
//# sourceMappingURL=ingredient.schema.js.map
