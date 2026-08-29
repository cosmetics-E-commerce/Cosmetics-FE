import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Bell, Check, Copy, Gift, Heart, Megaphone, Sparkles, Truck, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";

import { apiErrorMessage } from "@/lib/api";
import { submitCampaignForm, type PopupPublishedCampaign } from "@/lib/campaign-api";
import { cn } from "@/lib/utils";
import { copyCampaignText } from "./campaign-runtime";
import "./campaign.css";

type Props = {
  campaign: PopupPublishedCampaign;
  locale: "en" | "ar";
  presentation: PopupPublishedCampaign["presentation"]["desktop"];
  visitorId: string;
  sessionId: string;
  device: "desktop" | "tablet" | "mobile";
  page: string;
  serverTimeOffsetMs?: number;
  onDismiss: (reason?: "customer" | "action" | "completion" | "expired") => void;
  onPrimary: () => Promise<boolean> | boolean;
  onSecondary: () => Promise<boolean> | boolean;
  onCopyCoupon: () => void;
  onConvert: () => void;
};

const blockingModes = new Set([
  "CENTER_MODAL",
  "BOTTOM_SHEET",
  "FULLSCREEN",
  "SIDE_PANEL_RIGHT",
  "SIDE_PANEL_LEFT",
]);

export function CampaignRenderer(props: Props) {
  const onDismiss = props.onDismiss;
  const returnFocus = useRef<HTMLElement | null>(
    typeof document !== "undefined" && document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null,
  );
  const dismiss = useCallback(
    (reason: "customer" | "action" | "completion" | "expired" = "customer") => {
      onDismiss(reason);
      window.setTimeout(() => {
        if (returnFocus.current?.isConnected) returnFocus.current.focus();
      }, 0);
    },
    [onDismiss],
  );
  const effectiveProps = { ...props, onDismiss: dismiss };
  const blocking = blockingModes.has(props.presentation);
  if (!blocking) return <NonBlockingCampaign {...effectiveProps} />;
  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && dismiss()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="campaign-overlay"
          style={
            { "--campaign-overlay": props.campaign.appearance.overlayOpacity } as CSSProperties
          }
        />
        <DialogPrimitive.Content
          className={campaignClass(effectiveProps)}
          data-presentation={props.presentation}
          data-animation={props.campaign.appearance.animation}
          dir={props.campaign.direction}
          onEscapeKeyDown={(event) => {
            if (!props.campaign.presentation.closeOnEscape) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (!props.campaign.presentation.closeOnOverlay) event.preventDefault();
          }}
          aria-describedby={undefined}
          style={campaignStyle(props.campaign)}
        >
          <CampaignCardContent {...effectiveProps} titlePrimitive />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function NonBlockingCampaign(props: Props) {
  return (
    <section
      role="region"
      aria-label={props.campaign.content.headline}
      className={campaignClass(props)}
      data-presentation={props.presentation}
      data-animation={props.campaign.appearance.animation}
      dir={props.campaign.direction}
      style={campaignStyle(props.campaign)}
    >
      <CampaignCardContent {...props} titlePrimitive={false} />
    </section>
  );
}

function CampaignCardContent({
  campaign,
  locale,
  visitorId,
  sessionId,
  device,
  page,
  serverTimeOffsetMs = 0,
  onDismiss,
  onPrimary,
  onSecondary,
  onCopyCoupon,
  onConvert,
  titlePrimitive,
}: Props & { titlePrimitive: boolean }) {
  const content = campaign.content;
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [actionPending, setActionPending] = useState<"primary" | "secondary" | null>(null);
  const [primaryFeedback, setPrimaryFeedback] = useState("");
  const [secondaryFeedback, setSecondaryFeedback] = useState("");
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const feedbackTimer = useRef<number | null>(null);
  const copyTimer = useRef<number | null>(null);
  const countdownCompleted = useRef(false);
  const headingId = useId();
  const formId = useId();

  useEffect(() => {
    if (!campaign.countdown.enabled) return;
    const target =
      campaign.countdown.mode === "FIXED_TIMESTAMP" ? campaign.countdown.targetAt : campaign.endsAt;
    if (!target) return;
    const update = () => {
      const next = Math.max(
        0,
        Math.floor((new Date(target).getTime() - (Date.now() + serverTimeOffsetMs)) / 1_000),
      );
      setRemaining(next);
      if (next === 0 && campaign.countdown.mode === "CAMPAIGN_END" && !countdownCompleted.current) {
        countdownCompleted.current = true;
        onDismiss("expired");
      }
    };
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, [
    campaign.countdown.enabled,
    campaign.countdown.mode,
    campaign.countdown.targetAt,
    campaign.endsAt,
    onDismiss,
    serverTimeOffsetMs,
  ]);

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
      if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current);
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
    },
    [],
  );

  const countdown = useMemo(() => formatCountdown(remaining, locale), [locale, remaining]);

  const runAction = async (kind: "primary" | "secondary") => {
    const config = kind === "primary" ? campaign.primaryAction : campaign.secondaryAction;
    const execute = kind === "primary" ? onPrimary : onSecondary;
    setActionPending(kind);
    setError("");
    try {
      const succeeded = await execute();
      if (!succeeded && ["COPY_COUPON", "APPLY_COUPON"].includes(config.type)) {
        setError(
          locale === "ar"
            ? "تعذر تنفيذ إجراء القسيمة. حاولي مرة أخرى."
            : "The coupon action could not be completed. Please try again.",
        );
        return;
      }
      const feedback = actionFeedback(config.type, locale);
      if (feedback) {
        if (kind === "primary") setPrimaryFeedback(feedback);
        else setSecondaryFeedback(feedback);
        if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current);
        feedbackTimer.current = window.setTimeout(() => {
          setPrimaryFeedback("");
          setSecondaryFeedback("");
          feedbackTimer.current = null;
        }, 1_800);
      }
    } catch {
      setError(
        locale === "ar"
          ? "تعذر تنفيذ الإجراء. حاولي مرة أخرى."
          : "The action could not be completed. Please try again.",
      );
    } finally {
      setActionPending(null);
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("company")) return;
    setPending(true);
    setError("");
    try {
      await submitCampaignForm(campaign.id, {
        variantId: campaign.variantId,
        sessionId,
        visitorId,
        locale,
        device,
        page,
        name: campaign.form.collectName ? String(form.get("name") ?? "") : null,
        email: String(form.get("email") ?? ""),
        phone: campaign.form.collectPhone ? String(form.get("phone") ?? "") : null,
        consent: form.get("consent") === "on",
        company: String(form.get("company") ?? ""),
      });
      setSuccess(true);
      onConvert();
      if (campaign.form.successAutoCloseSeconds > 0) {
        closeTimer.current = window.setTimeout(
          () => onDismiss("completion"),
          campaign.form.successAutoCloseSeconds * 1_000,
        );
      }
    } catch (cause) {
      setError(apiErrorMessage(cause, locale));
    } finally {
      setPending(false);
    }
  };

  const headline = success
    ? (content.successHeadline ?? (locale === "ar" ? "تم بنجاح" : "You’re all set"))
    : content.headline;
  const body = success ? (content.successBody ?? content.body) : content.body;

  return (
    <div className="campaign-card__frame">
      {campaign.presentation.dismissible ? (
        titlePrimitive ? (
          <DialogPrimitive.Close
            className="campaign-card__close"
            aria-label={locale === "ar" ? "إغلاق" : "Close"}
          >
            <X aria-hidden="true" />
          </DialogPrimitive.Close>
        ) : (
          <button
            className="campaign-card__close"
            type="button"
            onClick={() => onDismiss("customer")}
            aria-label={locale === "ar" ? "إغلاق" : "Close"}
          >
            <X aria-hidden="true" />
          </button>
        )
      ) : null}

      {campaign.image && campaign.appearance.layout !== "TEXT_ONLY" ? (
        <div className="campaign-card__media">
          <img
            src={campaign.image.url}
            width={campaign.image.width}
            height={campaign.image.height}
            alt={content.imageAlt || campaign.image.alt}
            loading="eager"
            onError={(event) => {
              event.currentTarget.parentElement?.setAttribute("hidden", "");
            }}
          />
        </div>
      ) : null}

      <div className="campaign-card__content">
        {success ? <Check className="campaign-card__success-icon" aria-hidden="true" /> : null}
        {!success && campaign.appearance.icon !== "NONE" ? (
          <CampaignIcon icon={campaign.appearance.icon} />
        ) : null}
        {!success && content.badge ? (
          <span className="campaign-card__badge">{content.badge}</span>
        ) : null}
        {!success && content.eyebrow ? (
          <p className="campaign-card__eyebrow">{content.eyebrow}</p>
        ) : null}
        {titlePrimitive ? (
          <DialogPrimitive.Title className="campaign-card__headline">
            {headline}
          </DialogPrimitive.Title>
        ) : (
          <h2 id={headingId} className="campaign-card__headline">
            {headline}
          </h2>
        )}
        {!success && content.subtitle ? (
          <p className="campaign-card__subtitle">{content.subtitle}</p>
        ) : null}
        {body ? <p className="campaign-card__body">{body}</p> : null}

        {!success && countdown && remaining !== 0 ? (
          <div className="campaign-card__countdown" role="timer" aria-live="off">
            {countdown.map((part) => (
              <span key={part.label}>
                <strong>{part.value}</strong>
                <small>{part.label}</small>
              </span>
            ))}
          </div>
        ) : null}

        {!success && campaign.coupon ? (
          <button
            className="campaign-card__coupon"
            type="button"
            onClick={async () => {
              const didCopy = await copyCampaignText(campaign.coupon?.code ?? "");
              if (didCopy) {
                setCopied(true);
                onCopyCoupon();
                if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
                copyTimer.current = window.setTimeout(() => {
                  setCopied(false);
                  copyTimer.current = null;
                }, 1_800);
              } else {
                setError(
                  locale === "ar"
                    ? "تعذر نسخ الكود. حدديه وانسخيه يدويًا."
                    : "The code couldn’t be copied. Select and copy it manually.",
                );
              }
            }}
          >
            <span>{campaign.coupon.code}</span>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? (locale === "ar" ? "تم نسخ الكود" : "Coupon copied") : ""}
            </span>
          </button>
        ) : null}

        {!success && campaign.form.type !== "NONE" ? (
          <form id={formId} className="campaign-card__form" onSubmit={submit}>
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="campaign-card__honeypot"
            />
            {campaign.form.collectName ? (
              <label>
                <span>{content.nameLabel ?? (locale === "ar" ? "الاسم" : "Name")}</span>
                <input name="name" required minLength={2} autoComplete="name" dir="auto" />
              </label>
            ) : null}
            <label>
              <span>
                {content.emailLabel ?? (locale === "ar" ? "البريد الإلكتروني" : "Email address")}
              </span>
              <input
                name="email"
                required
                type="email"
                autoComplete="email"
                inputMode="email"
                dir="ltr"
              />
            </label>
            {campaign.form.collectPhone ? (
              <label>
                <span>{content.phoneLabel ?? (locale === "ar" ? "رقم الهاتف" : "Phone")}</span>
                <input
                  name="phone"
                  required
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  dir="ltr"
                  pattern={"\\+?[0-9][0-9 .\\(\\)\\-]{6,22}"}
                />
              </label>
            ) : null}
            {campaign.form.consentRequired ? (
              <label className="campaign-card__consent">
                <input name="consent" type="checkbox" required />
                <span>
                  {content.consentLabel ??
                    (locale === "ar"
                      ? "أوافق على استلام رسائل المتجر."
                      : "I agree to receive store updates.")}
                </span>
              </label>
            ) : null}
            {error ? (
              <p className="campaign-card__error" role="alert">
                {error}
              </p>
            ) : null}
          </form>
        ) : null}

        {!success ? (
          <div className="campaign-card__actions">
            {campaign.primaryAction.type !== "NONE" ? (
              <button
                className="campaign-card__primary"
                form={campaign.form.type !== "NONE" ? formId : undefined}
                type={campaign.form.type !== "NONE" ? "submit" : "button"}
                disabled={pending || actionPending !== null}
                onClick={
                  campaign.form.type === "NONE" ? () => void runAction("primary") : undefined
                }
              >
                {primaryFeedback ||
                  (pending || actionPending === "primary"
                    ? locale === "ar"
                      ? "جارٍ الإرسال…"
                      : "Sending…"
                    : (content.submitLabel ??
                      content.primaryCtaLabel ??
                      (locale === "ar" ? "متابعة" : "Continue")))}
              </button>
            ) : null}
            {campaign.secondaryAction.type !== "NONE" && content.secondaryCtaLabel ? (
              <button
                className="campaign-card__secondary"
                type="button"
                disabled={actionPending !== null}
                onClick={() => void runAction("secondary")}
              >
                {secondaryFeedback || content.secondaryCtaLabel}
              </button>
            ) : null}
          </div>
        ) : null}
        {primaryFeedback || secondaryFeedback ? (
          <span className="sr-only" role="status" aria-live="polite">
            {primaryFeedback || secondaryFeedback}
          </span>
        ) : null}
        {content.disclaimer && !success ? (
          <p className="campaign-card__disclaimer">{content.disclaimer}</p>
        ) : null}
      </div>
    </div>
  );
}

function campaignClass({ campaign }: Props) {
  return cn(
    "campaign-card",
    `campaign-card--${campaign.appearance.theme.toLowerCase()}`,
    `campaign-card--${campaign.appearance.layout.toLowerCase().replaceAll("_", "-")}`,
    `campaign-card--${campaign.appearance.spacing.toLowerCase()}`,
    `campaign-card--width-${campaign.appearance.width.toLowerCase()}`,
    `campaign-card--image-${campaign.appearance.imagePosition.toLowerCase()}`,
    `campaign-card--radius-${campaign.appearance.borderRadius.toLowerCase()}`,
    `campaign-card--button-${campaign.appearance.buttonStyle.toLowerCase()}`,
    `campaign-card--surface-${campaign.appearance.surface.toLowerCase()}`,
    campaign.appearance.alignment === "CENTER" && "campaign-card--centered",
  );
}

function campaignStyle(campaign: PopupPublishedCampaign): CSSProperties {
  return {
    "--campaign-configured-width": `${campaign.appearance.maxWidth}px`,
    "--campaign-accent": campaign.appearance.accentColor ?? undefined,
  } as CSSProperties;
}

function formatCountdown(value: number | null, locale: "en" | "ar") {
  if (value === null) return null;
  const days = Math.floor(value / 86_400);
  const hours = Math.floor((value % 86_400) / 3_600);
  const minutes = Math.floor((value % 3_600) / 60);
  const seconds = value % 60;
  const labels =
    locale === "ar" ? ["يوم", "ساعة", "دقيقة", "ثانية"] : ["Days", "Hours", "Min", "Sec"];
  return [days, hours, minutes, seconds].map((part, index) => ({
    value: String(part).padStart(2, "0"),
    label: labels[index] ?? "",
  }));
}

function actionFeedback(
  type: PopupPublishedCampaign["primaryAction"]["type"],
  locale: "en" | "ar",
) {
  if (type === "COPY_COUPON") return locale === "ar" ? "تم النسخ" : "Copied";
  if (type === "APPLY_COUPON") return locale === "ar" ? "تم التطبيق" : "Applied";
  return "";
}

function CampaignIcon({ icon }: { icon: PopupPublishedCampaign["appearance"]["icon"] }) {
  const Icon = {
    SPARKLE: Sparkles,
    GIFT: Gift,
    MEGAPHONE: Megaphone,
    TRUCK: Truck,
    HEART: Heart,
    BELL: Bell,
    NONE: Sparkles,
  }[icon];
  return (
    <span className="campaign-card__icon" aria-hidden="true">
      <Icon />
    </span>
  );
}
