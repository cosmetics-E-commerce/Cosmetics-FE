"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSessionSchema = exports.authTokensSchema = exports.authUserSchema = exports.verifyEmailSchema = exports.sendEmailVerificationSchema = exports.completePasswordChangeSchema = exports.verifyPasswordChangeOtpSchema = exports.requestPasswordChangeSchema = exports.resetPasswordSchema = exports.verifyPasswordResetOtpSchema = exports.forgotPasswordSchema = exports.verifyOtpSchema = exports.sendOtpSchema = exports.otpPurposeEnum = exports.logoutSchema = exports.refreshSchema = exports.loginSchema = exports.createAdminUserSchema = exports.registrationOtpChallengeSchema = exports.registerSchema = exports.createUserSchema = exports.otpDeliveryChannelEnum = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
const enums_1 = require("../enums");
const permission_schema_1 = require("../permissions/permission.schema");
const passwordSchema = zod_1.z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128)
    .regex(/[a-z]/, 'Must contain a lowercase letter')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number');
exports.otpDeliveryChannelEnum = zod_1.z.enum(['SMS', 'EMAIL']);
const createUserBaseSchema = zod_1.z.object({
    firstName: zod_1.z.string().trim().min(2).max(100),
    lastName: zod_1.z.string().trim().min(2).max(100),
    phone: primitives_1.egyptPhoneSchema,
    email: primitives_1.emailSchema.optional(),
    password: passwordSchema,
    gender: enums_1.GenderEnum.optional(),
    otpChannel: exports.otpDeliveryChannelEnum.default('SMS'),
});
exports.createUserSchema = createUserBaseSchema.superRefine((input, ctx) => {
    if (input.otpChannel === 'EMAIL' && !input.email) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ['email'],
            message: 'Email is required when otpChannel is EMAIL.',
        });
    }
});
exports.registerSchema = createUserBaseSchema
    .extend({
    email: primitives_1.emailSchema,
    gender: enums_1.GenderEnum,
    rePassword: zod_1.z.string().min(1, 'Repeat password is required'),
    otpChannel: exports.otpDeliveryChannelEnum.default('EMAIL'),
})
    .strict()
    .superRefine((input, ctx) => {
    if (input.password !== input.rePassword) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ['rePassword'],
            message: 'Repeated password must match password.',
        });
    }
});
exports.registrationOtpChallengeSchema = zod_1.z.object({
    email: primitives_1.emailSchema,
    ttlSeconds: zod_1.z.number().int().positive(),
    verificationRequired: zod_1.z.literal(true),
});
exports.createAdminUserSchema = createUserBaseSchema.extend({
    email: primitives_1.emailSchema,
    otpChannel: exports.otpDeliveryChannelEnum.default('EMAIL'),
    /**
     * Omit to apply the Admin baseline permissions. Send [] to create a locked
     * admin account with no permissions yet.
     */
    permissions: zod_1.z.array(permission_schema_1.permissionKeySchema).max(64).optional(),
}).strict();
/** Phone is the primary identifier in this market; email is optional. */
exports.loginSchema = zod_1.z.object({
    identifier: zod_1.z.string().trim().min(3),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.refreshSchema = zod_1.z.object({}).strict();
exports.logoutSchema = zod_1.z.object({}).strict();
exports.otpPurposeEnum = zod_1.z.enum([
    'PHONE_VERIFICATION',
    'EMAIL_VERIFICATION',
    'LOGIN',
    'PASSWORD_RESET',
    'PASSWORD_CHANGE',
]);
const otpRequestBaseSchema = zod_1.z.object({
    identifier: zod_1.z.string().trim().min(3).max(120),
    channel: exports.otpDeliveryChannelEnum.default('SMS'),
    purpose: exports.otpPurposeEnum.default('PHONE_VERIFICATION'),
});
exports.sendOtpSchema = otpRequestBaseSchema.superRefine(validateOtpChannelIdentifier);
exports.verifyOtpSchema = otpRequestBaseSchema
    .extend({
    otp: zod_1.z.string().regex(/^[0-9]{6}$/, 'OTP must be a 6-digit code'),
})
    .superRefine(validateOtpChannelIdentifier);
function validateOtpChannelIdentifier(input, ctx) {
    if (input.channel === 'SMS' && !primitives_1.egyptPhoneSchema.safeParse(input.identifier).success) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ['identifier'],
            message: 'SMS OTP requires a valid Egyptian mobile number.',
        });
    }
    if (input.channel === 'EMAIL' && !primitives_1.emailSchema.safeParse(input.identifier).success) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ['identifier'],
            message: 'Email OTP requires a valid email address.',
        });
    }
}
const passwordDeliverySchema = zod_1.z.object({
    identifier: zod_1.z.string().trim().min(3).max(120),
    channel: exports.otpDeliveryChannelEnum,
});
exports.forgotPasswordSchema = passwordDeliverySchema
    .superRefine(validateOtpChannelIdentifier);
exports.verifyPasswordResetOtpSchema = passwordDeliverySchema.extend({
    otp: zod_1.z.string().regex(/^[0-9]{6}$/, 'OTP must be a 6-digit code'),
}).superRefine(validateOtpChannelIdentifier);
const confirmedPasswordSchema = zod_1.z.object({
    newPassword: passwordSchema,
    confirmPassword: zod_1.z.string(),
}).refine((input) => input.newPassword === input.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
});
exports.resetPasswordSchema = zod_1.z.object({
    identifier: zod_1.z.string().trim().min(3).max(120),
    token: zod_1.z.string().min(32),
}).and(confirmedPasswordSchema);
exports.requestPasswordChangeSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(1, 'Current password is required'),
    channel: exports.otpDeliveryChannelEnum,
});
exports.verifyPasswordChangeOtpSchema = zod_1.z.object({
    channel: exports.otpDeliveryChannelEnum,
    otp: zod_1.z.string().regex(/^[0-9]{6}$/, 'OTP must be a 6-digit code'),
});
exports.completePasswordChangeSchema = zod_1.z.object({
    token: zod_1.z.string().min(32),
}).and(confirmedPasswordSchema);
exports.sendEmailVerificationSchema = zod_1.z.object({
    email: primitives_1.emailSchema,
});
exports.verifyEmailSchema = zod_1.z.object({
    email: primitives_1.emailSchema,
    token: zod_1.z.string().min(32),
});
exports.authUserSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string().nullable(),
    role: enums_1.RoleEnum,
    /** Resolved permission keys, e.g. ["product:create"]. Empty for CLIENT and
     *  for SUPER_ADMIN (who bypasses checks via a wildcard ability). */
    permissions: zod_1.z.array(zod_1.z.string()),
});
exports.authTokensSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    expiresIn: zod_1.z.number().int(),
});
exports.authSessionSchema = zod_1.z.object({
    user: exports.authUserSchema,
    tokens: exports.authTokensSchema,
    /** Echoed by the browser as X-CSRF-Token on refresh/logout requests. */
    csrfToken: zod_1.z.string().min(32),
});
//# sourceMappingURL=auth.schema.js.map