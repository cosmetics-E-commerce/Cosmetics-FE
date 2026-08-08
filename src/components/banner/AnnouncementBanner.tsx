import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  Gift,
  Heart,
  Info,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Truck,
  TriangleAlert,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  trackBannerEvent,
  type BannerMessage,
  type Device,
  type EventType,
  type StoreBanner,
} from "@/lib/banner-api";

const icons = {
  truck: Truck,
  gift: Gift,
  star: Star,
  heart: Heart,
  bag: ShoppingBag,
  sparkle: Sparkles,
  tag: Tag,
  clock: Clock3,
  info: Info,
  warning: TriangleAlert,
};
type Track = (type: EventType, messageId?: string | null) => void;

export function AnnouncementBanner({
  banner,
  locale,
  device,
  page,
}: {
  banner: StoreBanner;
  locale: "en" | "ar";
  device: Device;
  page: string;
}) {
  const [dismissed, setDismissed] = useState(() => isDismissed(banner));
  const [active, setActive] = useState(0);
  const [pointer, setPointer] = useState<number | null>(null);
  const messages = banner.messages || [];
  const mode = banner.effectiveMode || banner.mode;
  const sessionHash = useMemo(getSessionHash, []);
  const track = useCallback<Track>(
    (type, messageId) => {
      void trackBannerEvent(banner.id, {
        type,
        messageId,
        locale,
        device,
        page,
        sessionHash,
      }).catch(() => undefined);
    },
    [banner.id, device, locale, page, sessionHash],
  );
  useEffect(() => {
    if (!dismissed) track("IMPRESSION");
  }, [dismissed, track]);
  useEffect(() => {
    if (
      !["ROTATING", "CAROUSEL"].includes(mode) ||
      banner.behavior.autoplay === false ||
      messages.length < 2
    )
      return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % messages.length),
      Number(banner.behavior.intervalMs || banner.animation.messageDurationMs || 5000),
    );
    return () => window.clearInterval(timer);
  }, [
    banner.animation.messageDurationMs,
    banner.behavior.autoplay,
    banner.behavior.intervalMs,
    messages.length,
    mode,
  ]);
  if (dismissed || !messages.length) return null;
  const change = (direction: number) =>
    setActive((index) => (index + direction + messages.length) % messages.length);
  const swipe = (event: PointerEvent) => {
    if (pointer !== null && Math.abs(event.clientX - pointer) > 40)
      change(event.clientX < pointer ? 1 : -1);
    setPointer(null);
  };
  return (
    <section
      className={`announcement-banner announcement-banner--${mode.toLowerCase()} announcement-enter--${String(
        banner.animation.entrance || "FADE",
      ).toLowerCase()} ${banner.animation.pauseOnHover ? "announcement-pause-hover" : ""}`}
      style={bannerStyle(banner, device)}
      role="region"
      aria-label="Store announcement"
      dir={locale === "ar" ? "rtl" : "ltr"}
      onPointerDown={(event) => setPointer(event.clientX)}
      onPointerUp={swipe}
    >
      {mode === "TICKER" ? (
        <Ticker banner={banner} messages={messages} track={track} />
      ) : mode === "COUNTDOWN" ? (
        <Countdown banner={banner} message={messages[0]!} locale={locale} track={track} />
      ) : mode === "FREE_SHIPPING_PROGRESS" ? (
        <ShippingProgress banner={banner} locale={locale} />
      ) : (
        <Message banner={banner} message={messages[active]!} track={track} transition />
      )}
      {mode === "CAROUSEL" && banner.behavior.arrows && messages.length > 1 && (
        <>
          <button
            className="announcement-arrow previous"
            aria-label="Previous announcement"
            onClick={() => change(-1)}
          >
            <ChevronLeft />
          </button>
          <button
            className="announcement-arrow next"
            aria-label="Next announcement"
            onClick={() => change(1)}
          >
            <ChevronRight />
          </button>
        </>
      )}
      {mode === "CAROUSEL" && banner.behavior.pagination && (
        <div className="announcement-pagination">
          {messages.map((_, index) => (
            <button
              key={index}
              className={index === active ? "active" : ""}
              aria-label={`Announcement ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}
      {banner.behavior.dismissible && (
        <button
          className="announcement-close"
          aria-label={locale === "ar" ? "إغلاق الإعلان" : "Dismiss announcement"}
          onClick={() => {
            rememberDismissal(banner);
            setDismissed(true);
            track("DISMISS");
          }}
        >
          <X />
        </button>
      )}
    </section>
  );
}

function Ticker({
  banner,
  messages,
  track,
}: {
  banner: StoreBanner;
  messages: BannerMessage[];
  track: Track;
}) {
  const width = Math.max(
    600,
    messages.reduce(
      (sum, message) =>
        sum + message.text.length * 8 + Number(banner.animation.separatorSpacing || 32) * 2,
      0,
    ),
  );
  const style = {
    "--ticker-duration": `${width / Number(banner.animation.tickerSpeed || 35)}s`,
    "--ticker-direction": banner.animation.tickerDirection === "LTR" ? "reverse" : "normal",
  } as CSSProperties;
  return (
    <div className="announcement-ticker" style={style}>
      <div className="announcement-ticker-track">
        {[false, true].map((duplicate) => (
          <div
            className="announcement-ticker-group"
            aria-hidden={duplicate || undefined}
            key={String(duplicate)}
          >
            {messages.map((message, index) => (
              <span
                className="announcement-ticker-item"
                key={`${duplicate}-${message.id || index}`}
              >
                <Message banner={banner} message={message} track={track} />
                <i
                  style={{
                    color: banner.animation.separatorColor,
                    fontSize: banner.animation.separatorSize,
                    marginInline: banner.animation.separatorSpacing,
                  }}
                >
                  {banner.animation.separator || "✦"}
                </i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Message({
  banner,
  message,
  track,
  transition = false,
}: {
  banner: StoreBanner;
  message: BannerMessage;
  track: Track;
  transition?: boolean;
}) {
  const Icon = message.icon ? icons[message.icon as keyof typeof icons] : null;
  const content = (
    <>
      <span
        className="announcement-message"
        style={{
          color: message.style?.textColor || undefined,
          fontWeight: message.style?.emphasis ? 600 : undefined,
        }}
      >
        {message.emoji && <span aria-hidden>{message.emoji}</span>}
        {Icon && <Icon aria-hidden />}
        <span>{message.text}</span>
        {message.secondaryText && <small>{message.secondaryText}</small>}
      </span>
      {message.couponCode && (
        <button
          className="announcement-coupon"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(message.couponCode!);
              toast.success("Code copied", { description: message.couponCode });
              track("COUPON_COPY", message.id);
            } catch {
              toast.error("Could not copy the code");
            }
          }}
        >
          <code>{message.couponCode}</code>
          <Copy />
        </button>
      )}
      {message.ctaText && message.url && (
        <a
          className={`announcement-cta ${String(message.ctaStyle || "TEXT").toLowerCase()}`}
          href={message.url}
          target={message.openInNewTab ? "_blank" : undefined}
          rel={message.openInNewTab ? "noreferrer" : undefined}
          onClick={() => track("CTA_CLICK", message.id)}
        >
          {message.ctaText}
        </a>
      )}
    </>
  );
  return (
    <div
      className={
        transition
          ? `announcement-content announcement-transition-${String(
              banner.animation.transition || "FADE",
            ).toLowerCase()}`
          : "announcement-content"
      }
      key={message.id || message.text}
    >
      {message.url && !message.ctaText ? (
        <a
          href={message.url}
          target={message.openInNewTab ? "_blank" : undefined}
          rel={message.openInNewTab ? "noreferrer" : undefined}
          onClick={() => track("CLICK", message.id)}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

function Countdown({
  banner,
  message,
  locale,
  track,
}: {
  banner: StoreBanner;
  message: BannerMessage;
  locale: "en" | "ar";
  track: Track;
}) {
  const [now, setNow] = useState(Date.now());
  const redirected = useRef(false);
  const target = new Date(message.countdownAt || banner.endsAt || Date.now()).getTime();
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const seconds = Math.max(0, Math.floor((target - now) / 1000));
  useEffect(() => {
    if (
      !seconds &&
      banner.behavior.countdownEnd === "REDIRECT" &&
      banner.behavior.redirectUrl &&
      !redirected.current
    ) {
      redirected.current = true;
      window.location.assign(banner.behavior.redirectUrl);
    }
  }, [banner.behavior.countdownEnd, banner.behavior.redirectUrl, seconds]);
  if (!seconds && banner.behavior.countdownEnd === "HIDE") return null;
  if (!seconds && banner.behavior.countdownEnd === "MESSAGE")
    return (
      <div className="announcement-content">
        {locale === "ar"
          ? banner.behavior.expirationMessageAr
          : banner.behavior.expirationMessageEn}
      </div>
    );
  const parts = [
    Math.floor(seconds / 86400),
    Math.floor((seconds % 86400) / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ];
  return (
    <div className="announcement-countdown">
      <Message banner={banner} message={message} track={track} />
      <time dateTime={new Date(target).toISOString()}>
        {parts.map((part) => String(part).padStart(2, "0")).join(" : ")}
      </time>
    </div>
  );
}

function ShippingProgress({ banner, locale }: { banner: StoreBanner; locale: "en" | "ar" }) {
  const data = banner.freeShipping;
  if (!data) return <span>{banner.messages[0]?.text}</span>;
  const amount = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(data.remaining / 100);
  const template = data.unlocked
    ? locale === "ar"
      ? banner.behavior.successMessageAr
      : banner.behavior.successMessageEn
    : locale === "ar"
      ? banner.behavior.remainingMessageAr
      : banner.behavior.remainingMessageEn;
  return (
    <div className="announcement-shipping">
      <span>{String(template || "").replace("{{cart.remainingForFreeShipping}}", amount)}</span>
      {banner.behavior.showProgress && (
        <span
          className="announcement-progress"
          role="progressbar"
          aria-valuenow={data.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <i style={{ transform: `scaleX(${data.progress / 100})` }} />
        </span>
      )}
    </div>
  );
}

function bannerStyle(banner: StoreBanner, device: Device): CSSProperties {
  const design = banner.design;
  const height =
    design[
      device === "mobile" ? "heightMobile" : device === "tablet" ? "heightTablet" : "heightDesktop"
    ] || 32;
  const size =
    design[
      device === "mobile"
        ? "fontSizeMobile"
        : device === "tablet"
          ? "fontSizeTablet"
          : "fontSizeDesktop"
    ] || 10;
  const background =
    design.backgroundType === "GRADIENT" && design.gradient
      ? design.gradient
      : design.backgroundType === "IMAGE" && design.backgroundImage
        ? `url(${design.backgroundImage}) center/cover`
        : design.backgroundColor || "#191714";
  return {
    "--announcement-duration": `${banner.animation.durationMs || 300}ms`,
    "--cta-bg": design.ctaBackground,
    "--cta-color": design.ctaColor,
    minHeight: height,
    padding: `${design.verticalPadding || 0}px ${design.horizontalPadding || 20}px`,
    background,
    color: design.textColor || "#fff",
    fontFamily: design.fontFamily === "SERIF" ? "var(--font-serif)" : "var(--font-sans)",
    fontSize: size,
    fontWeight: design.fontWeight || 400,
    letterSpacing: `${design.letterSpacing || 0}px`,
    lineHeight: design.lineHeight || 1.4,
    textAlign: String(design.textAlign || "CENTER").toLowerCase() as CSSProperties["textAlign"],
    textTransform: String(
      design.textTransform || "UPPERCASE",
    ).toLowerCase() as CSSProperties["textTransform"],
    zIndex: design.zIndex || 40,
  } as CSSProperties;
}

function dismissalKey(banner: StoreBanner) {
  return `bioreza.banner-dismissed.${banner.id}`;
}
function isDismissed(banner: StoreBanner) {
  if (typeof window === "undefined" || !banner.behavior.dismissible) return false;
  const storage = banner.behavior.dismissalMode === "SESSION" ? sessionStorage : localStorage;
  const value = storage.getItem(dismissalKey(banner));
  if (!value) return false;
  if (value === "session" || value === "permanent") return true;
  if (Number(value) > Date.now()) return true;
  storage.removeItem(dismissalKey(banner));
  return false;
}
function rememberDismissal(banner: StoreBanner) {
  const mode = banner.behavior.dismissalMode;
  if (mode === "REFRESH") return;
  const storage = mode === "SESSION" ? sessionStorage : localStorage;
  if (mode === "SESSION") storage.setItem(dismissalKey(banner), "session");
  else if (mode === "PERMANENT") storage.setItem(dismissalKey(banner), "permanent");
  else
    storage.setItem(
      dismissalKey(banner),
      String(
        Date.now() +
          Number(banner.behavior.dismissalDuration || 1) * (mode === "HOURS" ? 3600000 : 86400000),
      ),
    );
}
function getSessionHash() {
  if (typeof window === "undefined") return "0".repeat(64);
  const key = "bioreza.banner-session";
  const value = sessionStorage.getItem(key);
  if (value) return value;
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const next = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  sessionStorage.setItem(key, next);
  return next;
}
