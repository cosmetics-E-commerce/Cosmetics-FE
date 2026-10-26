"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestOrderLookupSchema = exports.guestCheckoutPlaceSchema = exports.guestCheckoutPreviewSchema = exports.guestCheckoutStartSchema = exports.guestContactSchema = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
const user_schema_1 = require("../users/user.schema");
const create_order_schema_1 = require("./create-order.schema");
exports.guestContactSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().trim().min(2).max(100),
    lastName: zod_1.z.string().trim().min(2).max(100),
    phone: primitives_1.egyptPhoneSchema,
    email: primitives_1.emailSchema,
})
    .strict();
/** Contact details plus the delivery address; opens a short checkout session. */
exports.guestCheckoutStartSchema = zod_1.z
    .object({
    contact: exports.guestContactSchema,
    address: user_schema_1.createAddressSchema,
})
    .strict();
exports.guestCheckoutPreviewSchema = create_order_schema_1.checkoutOrderSchema.pick({
    paymentMethod: true,
});
exports.guestCheckoutPlaceSchema = create_order_schema_1.checkoutOrderSchema.omit({
    shippingAddressId: true,
    couponCode: true,
});
exports.guestOrderLookupSchema = zod_1.z
    .object({
    orderNumber: zod_1.z.string().trim().toUpperCase().min(6).max(20),
    phone: primitives_1.egyptPhoneSchema,
})
    .strict();
//# sourceMappingURL=guest-checkout.schema.js.map