"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminSchema =
  exports.adminPermissionsSchema =
  exports.updateAdminPermissionsSchema =
  exports.permissionSchema =
  exports.permissionKeySchema =
    void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
/**
 * New permission keys use `resource:action`. The database also contains
 * established scoped keys such as `orders.payment.review`; accepting those
 * keeps existing grants valid while the catalogue is migrated incrementally.
 * Permission keys are DATA, not code — adding a capability is a seed row, not
 * a new `if` branch. PLAN.md §2.2.
 */
exports.permissionKeySchema = zod_1.z
  .string()
  .regex(
    /^(?:[a-z_]+:[a-z_]+|[a-z_]+(?:\.[a-z_]+)+)$/,
    'Permission key must use "resource:action" or a dot-delimited legacy scope',
  );
exports.permissionSchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  key: exports.permissionKeySchema,
  resource: zod_1.z.string(),
  action: zod_1.z.string(),
  description: zod_1.z.string(),
  isDangerous: zod_1.z.boolean(),
  superOnly: zod_1.z.boolean(),
});
/**
 * Grant/revoke payload. The server rejects any key flagged `superOnly`
 * regardless of what the client sends — an Admin must never be able to
 * self-elevate. PLAN.md §2.3.
 */
exports.updateAdminPermissionsSchema = zod_1.z
  .object({
    grant: zod_1.z.array(exports.permissionKeySchema).max(64).default([]),
    revoke: zod_1.z.array(exports.permissionKeySchema).max(64).default([]),
  })
  .strict()
  .superRefine((input, ctx) => {
    if (input.grant.length === 0 && input.revoke.length === 0) {
      ctx.addIssue({
        code: zod_1.z.ZodIssueCode.custom,
        message: "At least one permission must be granted or revoked.",
      });
    }
    const overlap = input.grant.filter((key) => input.revoke.includes(key));
    if (overlap.length > 0) {
      ctx.addIssue({
        code: zod_1.z.ZodIssueCode.custom,
        path: ["grant"],
        message: `A permission cannot be granted and revoked together: ${overlap.join(", ")}`,
      });
    }
  });
exports.adminPermissionsSchema = zod_1.z.object({
  adminId: primitives_1.uuidSchema,
  permissions: zod_1.z.array(exports.permissionKeySchema),
});
exports.createAdminSchema = zod_1.z.object({
  firstName: zod_1.z.string().trim().min(2).max(100),
  lastName: zod_1.z.string().trim().min(2).max(100),
  phone: zod_1.z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/),
  email: zod_1.z.string().trim().toLowerCase().email(),
  /** Omit to apply the Admin baseline grant set. */
  permissions: zod_1.z.array(exports.permissionKeySchema).optional(),
});
//# sourceMappingURL=permission.schema.js.map
