"use strict";
// Single source of truth for validation across API and web.
// Backend: createZodDto(Schema) -> DTO class consumed by ZodValidationPipe.
// Frontend: zodResolver(Schema) -> React Hook Form validation.
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
__exportStar(require("./common/primitives"), exports);
__exportStar(require("./common/pagination"), exports);
__exportStar(require("./enums"), exports);
__exportStar(require("./auth/auth.schema"), exports);
__exportStar(require("./admin/admin.schema"), exports);
__exportStar(require("./users/user.schema"), exports);
__exportStar(require("./orders/create-order.schema"), exports);
__exportStar(require("./payments/payment-proof.schema"), exports);
__exportStar(require("./catalog/product.schema"), exports);
__exportStar(require("./cart/cart.schema"), exports);
__exportStar(require("./wishlist/wishlist.schema"), exports);
__exportStar(require("./inventory/inventory.schema"), exports);
__exportStar(require("./shipping/shipping.schema"), exports);
__exportStar(require("./permissions/permission.schema"), exports);
__exportStar(require("./audit/audit.schema"), exports);
__exportStar(require("./promotions/promotion.schema"), exports);
__exportStar(require("./ingredients/ingredient.schema"), exports);
__exportStar(require("./banners/banner.schema"), exports);
__exportStar(require("./analytics/analytics.schema"), exports);
__exportStar(require("./reviews/review.schema"), exports);
__exportStar(require("./store/store.schema"), exports);
__exportStar(require("./media/media.schema"), exports);
//# sourceMappingURL=index.js.map