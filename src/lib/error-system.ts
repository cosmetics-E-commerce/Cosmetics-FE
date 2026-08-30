export type StoreLocale = "en" | "ar";
export type StoreFieldErrors = Record<string, string[]>;

export type PublicErrorPayload = {
  statusCode?: number;
  code?: string;
  message?: string;
  details?: unknown;
  fieldErrors?: unknown;
  retryable?: boolean;
  requestId?: string;
  path?: string;
  timestamp?: string;
  error?: PublicErrorPayload;
};

export type StoreApiError = {
  statusCode: number;
  code: string;
  title: string;
  message: string;
  action: string | null;
  details?: unknown;
  fieldErrors: StoreFieldErrors;
  retryable: boolean;
  requestId?: string;
};

type MessageFactory = (details: Record<string, unknown>, locale: StoreLocale) => string;
type Copy = {
  title: [string, string];
  message: [string, string] | MessageFactory;
  action?: [string, string];
};

const registry: Record<string, Copy> = {
  NETWORK_UNAVAILABLE: {
    title: ["No internet connection", "لا يوجد اتصال بالإنترنت"],
    message: [
      "BioReza could not reach the store. Nothing was submitted.",
      "تعذر الاتصال بمتجر BioReza. لم يتم إرسال أي شيء.",
    ],
    action: ["Check your connection and try again.", "تحققي من الاتصال ثم حاولي مرة أخرى."],
  },
  NETWORK_ERROR: {
    title: ["No internet connection", "لا يوجد اتصال بالإنترنت"],
    message: [
      "BioReza could not reach the store. Nothing was submitted.",
      "تعذر الاتصال بمتجر BioReza. لم يتم إرسال أي شيء.",
    ],
    action: ["Check your connection and try again.", "تحققي من الاتصال ثم حاولي مرة أخرى."],
  },
  SERVICE_UNAVAILABLE: {
    title: ["BioReza is temporarily unavailable", "BioReza غير متاح مؤقتاً"],
    message: [
      "The service did not respond, so your action was not completed.",
      "لم تستجب الخدمة، لذلك لم يكتمل الإجراء.",
    ],
    action: ["Wait a moment and try again.", "انتظري قليلاً ثم حاولي مرة أخرى."],
  },
  INTERNAL_ERROR: {
    title: ["We couldn’t complete that action", "تعذر إكمال الإجراء"],
    message: [
      "A temporary problem prevented the action. Nothing was charged or submitted twice.",
      "منعت مشكلة مؤقتة إكمال الإجراء. لم يتم الخصم أو الإرسال مرتين.",
    ],
    action: [
      "Try again. If it continues, contact BioReza support with the reference below.",
      "حاولي مرة أخرى. إذا استمرت المشكلة، تواصلي مع دعم BioReza وأرسلي الرقم المرجعي أدناه.",
    ],
  },
  VALIDATION_FAILED: {
    title: ["Check the highlighted information", "راجعي البيانات المحددة"],
    message: [
      "One or more fields need attention before you can continue.",
      "يحتاج حقل أو أكثر إلى المراجعة قبل المتابعة.",
    ],
    action: [
      "Correct the first highlighted field and try again.",
      "صححي أول حقل محدد ثم حاولي مرة أخرى.",
    ],
  },
  UNAUTHENTICATED: {
    title: ["Your session expired", "انتهت جلستك"],
    message: ["BioReza could not confirm your session.", "تعذر على BioReza التحقق من جلستك."],
    action: ["Sign in again to continue.", "سجّلي الدخول مرة أخرى للمتابعة."],
  },
  INVALID_CREDENTIALS: {
    title: ["Couldn’t sign in", "تعذر تسجيل الدخول"],
    message: ["The email or password is incorrect.", "البريد الإلكتروني أو كلمة المرور غير صحيحة."],
    action: [
      "Check both fields or reset your password.",
      "راجعي الحقلين أو أعيدي تعيين كلمة المرور.",
    ],
  },
  OTP_INVALID: {
    title: ["Incorrect verification code", "رمز التحقق غير صحيح"],
    message: [
      "That code does not match the latest code we sent.",
      "هذا الرمز لا يطابق أحدث رمز أرسلناه.",
    ],
    action: ["Check the code and try again.", "راجعي الرمز ثم حاولي مرة أخرى."],
  },
  INVALID_OTP: {
    title: ["Incorrect verification code", "رمز التحقق غير صحيح"],
    message: ["That code could not be verified.", "تعذر التحقق من هذا الرمز."],
    action: ["Check the code or request a new one.", "راجعي الرمز أو اطلبي رمزاً جديداً."],
  },
  OTP_EXPIRED: {
    title: ["This verification code expired", "انتهت صلاحية رمز التحقق"],
    message: [
      "Verification codes are available for a limited time.",
      "تظل رموز التحقق صالحة لفترة محدودة.",
    ],
    action: ["Request a new code to continue.", "اطلبي رمزاً جديداً للمتابعة."],
  },
  OTP_TOO_MANY_ATTEMPTS: rateLimitCopy(),
  OTP_RESEND_COOLDOWN: rateLimitCopy(),
  RATE_LIMITED: rateLimitCopy(),
  CART_VARIANT_NOT_SELLABLE: {
    title: ["This item is no longer available", "هذا المنتج لم يعد متاحاً"],
    message: [
      "The selected product or variant cannot currently be purchased.",
      "لا يمكن شراء المنتج أو المتغير المحدد حالياً.",
    ],
    action: [
      "Remove it from your bag or choose another option.",
      "أزيليه من الحقيبة أو اختاري خياراً آخر.",
    ],
  },
  CART_INSUFFICIENT_STOCK: stockCopy(),
  INSUFFICIENT_STOCK: stockCopy(),
  CHECKOUT_CART_EMPTY: {
    title: ["Your bag is empty", "حقيبتك فارغة"],
    message: [
      "Checkout needs at least one available item.",
      "يحتاج إتمام الطلب إلى منتج متاح واحد على الأقل.",
    ],
    action: ["Return to the shop and add a product.", "عودي إلى المتجر وأضيفي منتجاً."],
  },
  CHECKOUT_CART_HAS_ISSUES: {
    title: ["Your bag changed", "تغيّرت حقيبتك"],
    message: [
      "A price, quantity or availability changed before checkout completed.",
      "تغيّر السعر أو الكمية أو التوفر قبل إتمام الطلب.",
    ],
    action: ["Review the updated bag, then continue.", "راجعي الحقيبة المحدّثة ثم تابعي."],
  },
  CART_PRICE_CHANGED: {
    title: ["Price updated", "تم تحديث السعر"],
    message: (details, locale) => {
      const from = money(details["previousPrice"]);
      const to = money(details["currentPrice"]);
      return locale === "ar"
        ? `تغيّر سعر المنتج${from && to ? ` من ${from} إلى ${to}` : ""} وتمت إعادة حساب الإجمالي.`
        : `The item price changed${from && to ? ` from ${from} to ${to}` : ""}. Your total was recalculated.`;
    },
    action: ["Review the new total before continuing.", "راجعي الإجمالي الجديد قبل المتابعة."],
  },
  COUPON_NOT_APPLICABLE: couponEligibilityCopy(),
  PROMOTION_COUPON_INVALID: {
    title: ["This code can’t be applied", "لا يمكن تطبيق هذا الرمز"],
    message: [
      "The code does not exist, is disabled, or is no longer valid.",
      "الرمز غير موجود أو معطّل أو لم يعد صالحاً.",
    ],
    action: ["Check the code or continue without it.", "راجعي الرمز أو تابعي بدونه."],
  },
  COUPON_EXPIRED: {
    title: ["This code has expired", "انتهت صلاحية هذا الرمز"],
    message: ["The promotion ended before the code was applied.", "انتهى العرض قبل تطبيق الرمز."],
    action: [
      "Remove the code and continue, or choose another offer.",
      "أزيلي الرمز وتابعي أو اختاري عرضاً آخر.",
    ],
  },
  COUPON_ALREADY_USED: {
    title: ["You’ve already used this code", "لقد استخدمت هذا الرمز من قبل"],
    message: [
      "This promotion allows one use per customer.",
      "يسمح هذا العرض باستخدام واحد لكل عميل.",
    ],
    action: [
      "Continue without the code or choose another offer.",
      "تابعي دون الرمز أو اختاري عرضاً آخر.",
    ],
  },
  COUPON_TOTAL_LIMIT_REACHED: {
    title: ["This promo code is fully redeemed", "تم استخدام رمز الخصم بالكامل"],
    message: [
      "This promo code has reached its redemption limit.",
      "وصل رمز الخصم هذا إلى الحد الأقصى لمرات الاستخدام.",
    ],
    action: [
      "Continue without the code or choose another offer.",
      "تابعي دون الرمز أو اختاري عرضاً آخر.",
    ],
  },
  COUPON_CUSTOMER_LIMIT_REACHED: {
    title: ["This promo code has reached its customer limit", "وصل رمز الخصم إلى حد العملاء"],
    message: [
      "The maximum number of customers have already redeemed this promo code.",
      "استخدم الحد الأقصى من العملاء رمز الخصم هذا بالفعل.",
    ],
    action: [
      "Continue without the code or choose another offer.",
      "تابعي دون الرمز أو اختاري عرضاً آخر.",
    ],
  },
  COUPON_CUSTOMER_USAGE_LIMIT: {
    title: ["You’ve reached this promo code’s usage limit", "وصلتِ إلى حد استخدام رمز الخصم"],
    message: [
      "You’ve already used this promo code the maximum number of times.",
      "لقد استخدمتِ رمز الخصم هذا الحد الأقصى المسموح به من المرات.",
    ],
    action: [
      "Continue without the code or choose another offer.",
      "تابعي دون الرمز أو اختاري عرضاً آخر.",
    ],
  },
  PROMOTION_USAGE_CHANGED: {
    title: ["This offer changed during checkout", "تغيّر العرض أثناء إتمام الطلب"],
    message: [
      "The offer expired or reached its usage limit before the order was placed.",
      "انتهى العرض أو وصل إلى حد الاستخدام قبل إتمام الطلب.",
    ],
    action: [
      "Refresh your bag to see the authoritative total.",
      "حدّثي الحقيبة لعرض الإجمالي المعتمد.",
    ],
  },
  INVALID_CITY: addressCopy(),
  INVALID_SHIPPING_LOCATION: addressCopy(),
  SHIPPING_ADDRESS_REQUIRES_VERIFICATION: addressCopy(),
  SHIPPING_ADDRESS_NOT_FOUND: {
    title: ["This address is no longer available", "هذا العنوان لم يعد متاحاً"],
    message: [
      "The saved delivery address may have been removed or changed.",
      "ربما تم حذف عنوان التوصيل المحفوظ أو تعديله.",
    ],
    action: [
      "Choose another address or add a new one.",
      "اختاري عنواناً آخر أو أضيفي عنواناً جديداً.",
    ],
  },
  SHIPPING_ZONE_UNAVAILABLE: {
    title: ["Delivery isn’t available to this area", "التوصيل غير متاح لهذه المنطقة"],
    message: [
      "BioReza does not currently have a shipping service for this location.",
      "لا تتوفر لدى BioReza خدمة شحن لهذا الموقع حالياً.",
    ],
    action: [
      "Choose another address or contact support.",
      "اختاري عنواناً آخر أو تواصلي مع الدعم.",
    ],
  },
  SHIPPING_PROVIDER_UNAVAILABLE: shippingUnavailableCopy(),
  BOSTA_UNAVAILABLE: shippingUnavailableCopy(),
  BOSTA_TIMEOUT: shippingUnavailableCopy(),
  PAYMENT_METHOD_NOT_AVAILABLE: {
    title: ["This payment method is unavailable", "طريقة الدفع غير متاحة"],
    message: [
      "The selected payment method cannot be used for this order right now.",
      "لا يمكن استخدام طريقة الدفع المحددة لهذا الطلب الآن.",
    ],
    action: ["Choose another payment method and continue.", "اختاري طريقة دفع أخرى ثم تابعي."],
  },
  PAYMENT_PROOF_TOO_LARGE: {
    title: ["Payment proof couldn’t be uploaded", "تعذر رفع إثبات الدفع"],
    message: (details, locale) => {
      const actual = byteSize(details["actualBytes"]);
      const maximum = byteSize(details["maximumBytes"]);
      return locale === "ar"
        ? `حجم الصورة${actual ? ` ${actual}` : ""} ويتجاوز الحد المسموح${maximum ? ` ${maximum}` : ""}.`
        : `The image${actual ? ` is ${actual}` : ""} and exceeds the limit${maximum ? ` of ${maximum}` : ""}.`;
    },
    action: ["Choose a smaller image and try again.", "اختاري صورة أصغر ثم حاولي مرة أخرى."],
  },
  PAYMENT_PROOF_UNSUPPORTED_TYPE: uploadCopy(
    "The selected file is not a supported payment image.",
    "الملف المحدد ليس صورة دفع مدعومة.",
  ),
  PAYMENT_PROOF_INVALID_IMAGE: uploadCopy(
    "The selected file contents are not a valid image.",
    "محتوى الملف المحدد ليس صورة صالحة.",
  ),
  ROUTINE_ANSWERS_INVALID: {
    title: ["We need another answer", "نحتاج إلى إجابة أخرى"],
    message: [
      "One or more routine answers are missing or no longer available.",
      "إجابة أو أكثر من إجابات الروتين مفقودة أو لم تعد متاحة.",
    ],
    action: [
      "Return to the highlighted question and update your answer.",
      "عودي إلى السؤال المحدد وحدّثي الإجابة.",
    ],
  },
  NO_ELIGIBLE_PRODUCT: {
    title: ["We couldn’t build a confident routine", "تعذر إنشاء روتين موثوق"],
    message: [
      "No currently available products safely match every required routine step.",
      "لا توجد منتجات متاحة حالياً تطابق كل خطوات الروتين المطلوبة بأمان.",
    ],
    action: [
      "Change a preference or browse products manually.",
      "غيّري أحد التفضيلات أو تصفحي المنتجات يدوياً.",
    ],
  },
  REQUEST_IN_PROGRESS: {
    title: ["This action is already processing", "هذا الإجراء قيد التنفيذ بالفعل"],
    message: ["BioReza is still handling the first request.", "ما زالت BioReza تعالج الطلب الأول."],
    action: [
      "Wait for it to finish instead of submitting again.",
      "انتظري حتى يكتمل بدلاً من الإرسال مرة أخرى.",
    ],
  },
};

export function normalizeStoreApiError(
  payload: PublicErrorPayload | null | undefined,
  statusCode: number,
  locale: StoreLocale,
  fallbackCode = "REQUEST_FAILED",
  requestId?: string | null,
  retryAfter?: number | null,
): StoreApiError {
  const source =
    payload?.error && typeof payload.error === "object" ? payload.error : (payload ?? {});
  const code = source.code || payload?.code || fallbackCode;
  const status = statusCode || source.statusCode || payload?.statusCode || 0;
  const sourceDetails = source.details ?? payload?.details;
  const details =
    retryAfter && Number.isFinite(retryAfter)
      ? { ...asRecord(sourceDetails), retryAfter }
      : sourceDetails;
  const descriptor =
    registry[code] ??
    codeFamilyCopy(code, status, source.message || payload?.message) ??
    (code === fallbackCode ? registry[fallbackForStatus(status)] : undefined) ??
    fallbackCopy(locale, status, source.message || payload?.message);
  const index = locale === "ar" ? 1 : 0;
  const resolvedRequestId = source.requestId ?? payload?.requestId ?? requestId ?? undefined;
  return {
    statusCode: status,
    code,
    title: descriptor.title[index],
    message:
      typeof descriptor.message === "function"
        ? descriptor.message(asRecord(details), locale)
        : descriptor.message[index],
    action: descriptor.action?.[index] ?? null,
    details,
    fieldErrors: fieldErrors(source.fieldErrors ?? payload?.fieldErrors, locale),
    retryable: source.retryable ?? payload?.retryable ?? retryableStatus(status),
    ...(resolvedRequestId ? { requestId: resolvedRequestId } : {}),
  };
}

export function humanErrorMessage(error: unknown, locale: StoreLocale): string {
  if (isStoreApiError(error)) {
    return [
      error.title,
      error.message,
      error.action,
      error.requestId ? `${locale === "ar" ? "المرجع" : "Reference"}: ${error.requestId}` : null,
    ]
      .filter(Boolean)
      .join(" ");
  }
  const payload =
    typeof error === "object" && error !== null ? (error as PublicErrorPayload) : null;
  const normalized = normalizeStoreApiError(
    payload,
    payload?.statusCode ?? 0,
    locale,
    payload?.code ?? "NETWORK_UNAVAILABLE",
  );
  return [
    normalized.title,
    normalized.message,
    normalized.action,
    normalized.requestId
      ? `${locale === "ar" ? "المرجع" : "Reference"}: ${normalized.requestId}`
      : null,
  ]
    .filter(Boolean)
    .join(" ");
}

export function isStoreApiError(value: unknown): value is StoreApiError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "title" in value &&
    "message" in value
  );
}

function rateLimitCopy(): Copy {
  return {
    title: ["Too many attempts", "محاولات كثيرة جداً"],
    message: (details, locale) => {
      const seconds = number(details["retryAfter"]);
      return locale === "ar"
        ? seconds === null
          ? "تم إيقاف المحاولات مؤقتاً لحماية حسابك."
          : `انتظري ${seconds} ثانية قبل المحاولة مرة أخرى.`
        : seconds === null
          ? "Attempts are temporarily paused to protect your account."
          : `Wait ${seconds} seconds before trying again.`;
    },
    action: ["Wait, then try once more.", "انتظري ثم حاولي مرة واحدة أخرى."],
  };
}

function stockCopy(): Copy {
  return {
    title: ["That quantity is no longer available", "هذه الكمية لم تعد متاحة"],
    message: (details, locale) => {
      const available = number(details["available"]);
      return locale === "ar"
        ? available === null
          ? "تغيّر المخزون أثناء التسوق وتم تحديث حقيبتك."
          : `المتاح الآن ${available} فقط. تم تحديث حقيبتك.`
        : available === null
          ? "Stock changed while you were shopping. Your bag was refreshed."
          : `Only ${available} are available now. Your bag was refreshed.`;
    },
    action: ["Review the latest quantity before continuing.", "راجعي أحدث كمية قبل المتابعة."],
  };
}

function couponEligibilityCopy(): Copy {
  return {
    title: ["This code doesn’t apply to your bag", "هذا الرمز لا ينطبق على حقيبتك"],
    message: (details, locale) => {
      const minimum = money(details["minimumSubtotal"]);
      const eligible = money(details["eligibleSubtotal"]);
      if (minimum && eligible)
        return locale === "ar"
          ? `يتطلب الرمز حداً أدنى ${minimum}. إجمالي المنتجات المؤهلة هو ${eligible}.`
          : `The code requires at least ${minimum}. Your eligible subtotal is ${eligible}.`;
      return locale === "ar"
        ? "المنتجات الحالية لا تستوفي شروط هذا الرمز."
        : "The current items do not meet this code’s requirements.";
    },
    action: [
      "Review the offer requirements or continue without the code.",
      "راجعي شروط العرض أو تابعي دون الرمز.",
    ],
  };
}

function addressCopy(): Copy {
  return {
    title: ["This delivery location doesn’t match", "بيانات موقع التوصيل غير متطابقة"],
    message: [
      "The city or area does not belong to the selected governorate.",
      "المدينة أو المنطقة لا تتبع المحافظة المحددة.",
    ],
    action: [
      "Choose governorate, city and area again from the delivery lists.",
      "اختاري المحافظة والمدينة والمنطقة مرة أخرى من قوائم التوصيل.",
    ],
  };
}

function shippingUnavailableCopy(): Copy {
  return {
    title: ["Shipping rates are temporarily unavailable", "أسعار الشحن غير متاحة مؤقتاً"],
    message: [
      "The delivery service did not return a rate for this address.",
      "لم تُرجع خدمة التوصيل سعراً لهذا العنوان.",
    ],
    action: [
      "Try again shortly or choose another address.",
      "حاولي بعد قليل أو اختاري عنواناً آخر.",
    ],
  };
}

function uploadCopy(en: string, ar: string): Copy {
  return {
    title: ["Payment proof couldn’t be uploaded", "تعذر رفع إثبات الدفع"],
    message: [en, ar],
    action: ["Choose another image and try again.", "اختاري صورة أخرى ثم حاولي مرة أخرى."],
  };
}

function fallbackCopy(locale: StoreLocale, status: number, serverMessage?: string): Copy {
  if (locale === "en" && serverMessage && status > 0 && status < 500) {
    return {
      title: ["The action couldn’t be completed", "تعذر إكمال الإجراء"],
      message: [serverMessage, "تعذر إكمال الإجراء. راجعي البيانات ثم حاولي مرة أخرى."],
      action: ["Review the information and try again.", "راجعي البيانات ثم حاولي مرة أخرى."],
    };
  }
  return registry["INTERNAL_ERROR"]!;
}

function codeFamilyCopy(code: string, status: number, serverMessage?: string): Copy | undefined {
  if (!serverMessage || status <= 0 || status >= 500) return undefined;
  const withServerReason = (base: Copy): Copy => ({
    ...base,
    message: [
      serverMessage,
      typeof base.message === "function"
        ? "تعذر إكمال الإجراء وفقاً لقواعد المتجر."
        : base.message[1],
    ],
  });

  if (
    code.includes("UNAUTHENTICATED") ||
    code.includes("ACCESS_TOKEN") ||
    code.includes("REFRESH_TOKEN") ||
    code.includes("SESSION_EXPIRED")
  ) {
    return withServerReason(registry["UNAUTHENTICATED"]!);
  }
  if (
    code.includes("RATE_LIMIT") ||
    code.includes("TOO_MANY_ATTEMPTS") ||
    code.includes("COOLDOWN")
  ) {
    return withServerReason(registry["RATE_LIMITED"]!);
  }
  if (
    code.includes("STOCK") ||
    code.includes("NOT_SELLABLE") ||
    code.includes("VARIANT_NOT_FOUND")
  ) {
    return withServerReason(stockCopy());
  }
  if (code.includes("SHIPPING") || code.includes("BOSTA") || code.includes("DELIVERY")) {
    return withServerReason(shippingUnavailableCopy());
  }
  if (
    code.includes("TIMEOUT") ||
    code.includes("NETWORK") ||
    code.includes("SERVICE_UNAVAILABLE") ||
    code.includes("PROVIDER_NOT_CONFIGURED")
  ) {
    return withServerReason(registry["SERVICE_UNAVAILABLE"]!);
  }
  if (
    code.endsWith("_NOT_FOUND") ||
    code.includes("NOT_AVAILABLE") ||
    code.includes("NOT_PUBLISHED") ||
    code.includes("ARCHIVED")
  ) {
    return withServerReason({
      title: ["This item is no longer available", "هذا العنصر لم يعد متاحاً"],
      message: ["", "ربما تم حذفه أو تغيّرت حالته منذ فتح الصفحة."],
      action: ["Refresh the page or choose another option.", "حدّثي الصفحة أو اختاري خياراً آخر."],
    });
  }
  if (
    code.includes("INVALID") ||
    code.includes("REQUIRED") ||
    code.includes("MISSING") ||
    code.includes("EMPTY") ||
    code.includes("MISMATCH")
  ) {
    return withServerReason(registry["VALIDATION_FAILED"]!);
  }
  if (code.includes("EXPIRED")) {
    return withServerReason({
      title: ["This request has expired", "انتهت صلاحية هذا الطلب"],
      message: ["", "انتهت المهلة المسموح بها لإكمال هذا الإجراء."],
      action: ["Start the action again to continue.", "ابدئي الإجراء مرة أخرى للمتابعة."],
    });
  }
  if (
    code.includes("ALREADY") ||
    code.includes("DUPLICATE") ||
    code.includes("IN_PROGRESS") ||
    code.includes("REUSED")
  ) {
    return withServerReason(registry["REQUEST_IN_PROGRESS"]!);
  }
  return undefined;
}

function fallbackForStatus(status: number): string {
  if (status === 401) return "UNAUTHENTICATED";
  if (status === 429) return "RATE_LIMITED";
  if ([502, 503, 504].includes(status)) return "SERVICE_UNAVAILABLE";
  if (status >= 500) return "INTERNAL_ERROR";
  if (status === 400 || status === 422) return "VALIDATION_FAILED";
  return "INTERNAL_ERROR";
}

function fieldErrors(value: unknown, locale: StoreLocale): StoreFieldErrors {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: StoreFieldErrors = {};
  for (const [field, raw] of Object.entries(value)) {
    const values = (Array.isArray(raw) ? raw : [raw]).filter(
      (item): item is string => typeof item === "string",
    );
    if (!values.length) continue;
    result[field] = locale === "ar" ? values.map(() => "راجعي هذه القيمة.") : values;
  }
  return result;
}

function retryableStatus(status: number): boolean {
  return [0, 408, 425, 429, 500, 502, 503, 504].includes(status);
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function number(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function money(value: unknown): string | null {
  const amount = number(value);
  if (amount === null) return null;
  return `EGP ${new Intl.NumberFormat("en-EG", { maximumFractionDigits: 2 }).format(amount)}`;
}

function byteSize(value: unknown): string | null {
  const amount = number(value);
  if (amount === null) return null;
  if (amount >= 1024 * 1024) return `${(amount / (1024 * 1024)).toFixed(1)} MB`;
  if (amount >= 1024) return `${(amount / 1024).toFixed(1)} KB`;
  return `${amount} bytes`;
}
