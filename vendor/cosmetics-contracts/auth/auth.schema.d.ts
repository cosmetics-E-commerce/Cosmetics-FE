import { z } from 'zod';
export declare const otpDeliveryChannelEnum: z.ZodEnum<["SMS", "EMAIL"]>;
export type OtpDeliveryChannel = z.infer<typeof otpDeliveryChannelEnum>;
export declare const createUserSchema: z.ZodEffects<z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    gender: z.ZodOptional<z.ZodEnum<["MALE", "FEMALE", "OTHER"]>>;
    otpChannel: z.ZodDefault<z.ZodEnum<["SMS", "EMAIL"]>>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    otpChannel: "SMS" | "EMAIL";
    email?: string | undefined;
    gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
}, {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    email?: string | undefined;
    gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
    otpChannel?: "SMS" | "EMAIL" | undefined;
}>, {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    otpChannel: "SMS" | "EMAIL";
    email?: string | undefined;
    gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
}, {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    email?: string | undefined;
    gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
    otpChannel?: "SMS" | "EMAIL" | undefined;
}>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export declare const registerSchema: z.ZodEffects<z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodString;
    password: z.ZodString;
} & {
    email: z.ZodString;
    gender: z.ZodEnum<["MALE", "FEMALE", "OTHER"]>;
    rePassword: z.ZodString;
    otpChannel: z.ZodDefault<z.ZodEnum<["SMS", "EMAIL"]>>;
}, "strict", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    otpChannel: "SMS" | "EMAIL";
    rePassword: string;
}, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    rePassword: string;
    otpChannel?: "SMS" | "EMAIL" | undefined;
}>, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    otpChannel: "SMS" | "EMAIL";
    rePassword: string;
}, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    rePassword: string;
    otpChannel?: "SMS" | "EMAIL" | undefined;
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
export declare const registrationOtpChallengeSchema: z.ZodObject<{
    email: z.ZodString;
    ttlSeconds: z.ZodNumber;
    verificationRequired: z.ZodLiteral<true>;
}, "strip", z.ZodTypeAny, {
    email: string;
    ttlSeconds: number;
    verificationRequired: true;
}, {
    email: string;
    ttlSeconds: number;
    verificationRequired: true;
}>;
export type RegistrationOtpChallenge = z.infer<typeof registrationOtpChallengeSchema>;
export declare const createAdminUserSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodString;
    password: z.ZodString;
    gender: z.ZodOptional<z.ZodEnum<["MALE", "FEMALE", "OTHER"]>>;
} & {
    email: z.ZodString;
    otpChannel: z.ZodDefault<z.ZodEnum<["SMS", "EMAIL"]>>;
}, "strict", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    otpChannel: "SMS" | "EMAIL";
    gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
}, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
    otpChannel?: "SMS" | "EMAIL" | undefined;
}>;
export type CreateAdminUserInput = z.infer<typeof createAdminUserSchema>;
/** Phone is the primary identifier in this market; email is optional. */
export declare const loginSchema: z.ZodObject<{
    identifier: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    identifier: string;
}, {
    password: string;
    identifier: string;
}>;
export type LoginInput = z.infer<typeof loginSchema>;
export declare const refreshSchema: z.ZodObject<{}, "strict", z.ZodTypeAny, {}, {}>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export declare const logoutSchema: z.ZodObject<{}, "strict", z.ZodTypeAny, {}, {}>;
export type LogoutInput = z.infer<typeof logoutSchema>;
export declare const otpPurposeEnum: z.ZodEnum<["PHONE_VERIFICATION", "EMAIL_VERIFICATION", "LOGIN", "PASSWORD_RESET", "PASSWORD_CHANGE"]>;
export type OtpPurpose = z.infer<typeof otpPurposeEnum>;
export declare const sendOtpSchema: z.ZodEffects<z.ZodObject<{
    identifier: z.ZodString;
    channel: z.ZodDefault<z.ZodEnum<["SMS", "EMAIL"]>>;
    purpose: z.ZodDefault<z.ZodEnum<["PHONE_VERIFICATION", "EMAIL_VERIFICATION", "LOGIN", "PASSWORD_RESET", "PASSWORD_CHANGE"]>>;
}, "strip", z.ZodTypeAny, {
    identifier: string;
    channel: "SMS" | "EMAIL";
    purpose: "PHONE_VERIFICATION" | "EMAIL_VERIFICATION" | "LOGIN" | "PASSWORD_RESET" | "PASSWORD_CHANGE";
}, {
    identifier: string;
    channel?: "SMS" | "EMAIL" | undefined;
    purpose?: "PHONE_VERIFICATION" | "EMAIL_VERIFICATION" | "LOGIN" | "PASSWORD_RESET" | "PASSWORD_CHANGE" | undefined;
}>, {
    identifier: string;
    channel: "SMS" | "EMAIL";
    purpose: "PHONE_VERIFICATION" | "EMAIL_VERIFICATION" | "LOGIN" | "PASSWORD_RESET" | "PASSWORD_CHANGE";
}, {
    identifier: string;
    channel?: "SMS" | "EMAIL" | undefined;
    purpose?: "PHONE_VERIFICATION" | "EMAIL_VERIFICATION" | "LOGIN" | "PASSWORD_RESET" | "PASSWORD_CHANGE" | undefined;
}>;
export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export declare const verifyOtpSchema: z.ZodEffects<z.ZodObject<{
    identifier: z.ZodString;
    channel: z.ZodDefault<z.ZodEnum<["SMS", "EMAIL"]>>;
    purpose: z.ZodDefault<z.ZodEnum<["PHONE_VERIFICATION", "EMAIL_VERIFICATION", "LOGIN", "PASSWORD_RESET", "PASSWORD_CHANGE"]>>;
} & {
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    identifier: string;
    channel: "SMS" | "EMAIL";
    purpose: "PHONE_VERIFICATION" | "EMAIL_VERIFICATION" | "LOGIN" | "PASSWORD_RESET" | "PASSWORD_CHANGE";
    otp: string;
}, {
    identifier: string;
    otp: string;
    channel?: "SMS" | "EMAIL" | undefined;
    purpose?: "PHONE_VERIFICATION" | "EMAIL_VERIFICATION" | "LOGIN" | "PASSWORD_RESET" | "PASSWORD_CHANGE" | undefined;
}>, {
    identifier: string;
    channel: "SMS" | "EMAIL";
    purpose: "PHONE_VERIFICATION" | "EMAIL_VERIFICATION" | "LOGIN" | "PASSWORD_RESET" | "PASSWORD_CHANGE";
    otp: string;
}, {
    identifier: string;
    otp: string;
    channel?: "SMS" | "EMAIL" | undefined;
    purpose?: "PHONE_VERIFICATION" | "EMAIL_VERIFICATION" | "LOGIN" | "PASSWORD_RESET" | "PASSWORD_CHANGE" | undefined;
}>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export declare const forgotPasswordSchema: z.ZodEffects<z.ZodObject<{
    identifier: z.ZodString;
    channel: z.ZodEnum<["SMS", "EMAIL"]>;
}, "strip", z.ZodTypeAny, {
    identifier: string;
    channel: "SMS" | "EMAIL";
}, {
    identifier: string;
    channel: "SMS" | "EMAIL";
}>, {
    identifier: string;
    channel: "SMS" | "EMAIL";
}, {
    identifier: string;
    channel: "SMS" | "EMAIL";
}>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export declare const verifyPasswordResetOtpSchema: z.ZodEffects<z.ZodObject<{
    identifier: z.ZodString;
    channel: z.ZodEnum<["SMS", "EMAIL"]>;
} & {
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    identifier: string;
    channel: "SMS" | "EMAIL";
    otp: string;
}, {
    identifier: string;
    channel: "SMS" | "EMAIL";
    otp: string;
}>, {
    identifier: string;
    channel: "SMS" | "EMAIL";
    otp: string;
}, {
    identifier: string;
    channel: "SMS" | "EMAIL";
    otp: string;
}>;
export type VerifyPasswordResetOtpInput = z.infer<typeof verifyPasswordResetOtpSchema>;
export declare const resetPasswordSchema: z.ZodIntersection<z.ZodObject<{
    identifier: z.ZodString;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    identifier: string;
    token: string;
}, {
    identifier: string;
    token: string;
}>, z.ZodEffects<z.ZodObject<{
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newPassword: string;
    confirmPassword: string;
}, {
    newPassword: string;
    confirmPassword: string;
}>, {
    newPassword: string;
    confirmPassword: string;
}, {
    newPassword: string;
    confirmPassword: string;
}>>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export declare const requestPasswordChangeSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    channel: z.ZodEnum<["SMS", "EMAIL"]>;
}, "strip", z.ZodTypeAny, {
    channel: "SMS" | "EMAIL";
    currentPassword: string;
}, {
    channel: "SMS" | "EMAIL";
    currentPassword: string;
}>;
export type RequestPasswordChangeInput = z.infer<typeof requestPasswordChangeSchema>;
export declare const verifyPasswordChangeOtpSchema: z.ZodObject<{
    channel: z.ZodEnum<["SMS", "EMAIL"]>;
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    channel: "SMS" | "EMAIL";
    otp: string;
}, {
    channel: "SMS" | "EMAIL";
    otp: string;
}>;
export type VerifyPasswordChangeOtpInput = z.infer<typeof verifyPasswordChangeOtpSchema>;
export declare const completePasswordChangeSchema: z.ZodIntersection<z.ZodObject<{
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
}, {
    token: string;
}>, z.ZodEffects<z.ZodObject<{
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newPassword: string;
    confirmPassword: string;
}, {
    newPassword: string;
    confirmPassword: string;
}>, {
    newPassword: string;
    confirmPassword: string;
}, {
    newPassword: string;
    confirmPassword: string;
}>>;
export type CompletePasswordChangeInput = z.infer<typeof completePasswordChangeSchema>;
export declare const sendEmailVerificationSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type SendEmailVerificationInput = z.infer<typeof sendEmailVerificationSchema>;
export declare const verifyEmailSchema: z.ZodObject<{
    email: z.ZodString;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    token: string;
}, {
    email: string;
    token: string;
}>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export declare const authUserSchema: z.ZodObject<{
    id: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodString;
    email: z.ZodNullable<z.ZodString>;
    role: z.ZodEnum<["SUPER_ADMIN", "ADMIN", "CLIENT"]>;
    /** Resolved permission keys, e.g. ["product:create"]. Empty for CLIENT and
     *  for SUPER_ADMIN (who bypasses checks via a wildcard ability). */
    permissions: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
    id: string;
    role: "SUPER_ADMIN" | "ADMIN" | "CLIENT";
    permissions: string[];
}, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
    id: string;
    role: "SUPER_ADMIN" | "ADMIN" | "CLIENT";
    permissions: string[];
}>;
export type AuthUser = z.infer<typeof authUserSchema>;
export declare const authTokensSchema: z.ZodObject<{
    accessToken: z.ZodString;
    expiresIn: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    accessToken: string;
    expiresIn: number;
}, {
    accessToken: string;
    expiresIn: number;
}>;
export type AuthTokens = z.infer<typeof authTokensSchema>;
export declare const authSessionSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodString;
        email: z.ZodNullable<z.ZodString>;
        role: z.ZodEnum<["SUPER_ADMIN", "ADMIN", "CLIENT"]>;
        /** Resolved permission keys, e.g. ["product:create"]. Empty for CLIENT and
         *  for SUPER_ADMIN (who bypasses checks via a wildcard ability). */
        permissions: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        id: string;
        role: "SUPER_ADMIN" | "ADMIN" | "CLIENT";
        permissions: string[];
    }, {
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        id: string;
        role: "SUPER_ADMIN" | "ADMIN" | "CLIENT";
        permissions: string[];
    }>;
    tokens: z.ZodObject<{
        accessToken: z.ZodString;
        expiresIn: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        accessToken: string;
        expiresIn: number;
    }, {
        accessToken: string;
        expiresIn: number;
    }>;
    /** Echoed by the browser as X-CSRF-Token on refresh/logout requests. */
    csrfToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        id: string;
        role: "SUPER_ADMIN" | "ADMIN" | "CLIENT";
        permissions: string[];
    };
    tokens: {
        accessToken: string;
        expiresIn: number;
    };
    csrfToken: string;
}, {
    user: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        id: string;
        role: "SUPER_ADMIN" | "ADMIN" | "CLIENT";
        permissions: string[];
    };
    tokens: {
        accessToken: string;
        expiresIn: number;
    };
    csrfToken: string;
}>;
export type AuthSession = z.infer<typeof authSessionSchema>;
//# sourceMappingURL=auth.schema.d.ts.map