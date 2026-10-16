"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageReferenceValueSchema = void 0;
const zod_1 = require("zod");
const image_reference_1 = require("./image-reference");
__exportStar(require("./image-reference"), exports);
exports.imageReferenceValueSchema = zod_1.z
    .string()
    .trim()
    .min(1, "Add an image storage key or an absolute HTTP(S) URL.")
    .max(image_reference_1.IMAGE_REFERENCE_MAX_LENGTH)
    .superRefine((value, context) => {
    if ((0, image_reference_1.isAbsoluteHttpImageUrl)(value)) {
        if (!(0, image_reference_1.isSafeExternalImageUrl)(value)) {
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "External image URLs cannot target local or private network addresses.",
            });
        }
        return;
    }
    if (!(0, image_reference_1.isSafeStorageImageKey)(value)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Use a storage key without traversal, query strings, backslashes, or a leading slash.",
        });
    }
});
//# sourceMappingURL=image-reference.schema.js.map