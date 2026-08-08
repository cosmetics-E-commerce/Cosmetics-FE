import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { getActiveBanners, type Device, type StoreBanner } from "@/lib/banner-api";
import { useStore } from "@/lib/store";
import { AnnouncementBanner } from "./AnnouncementBanner";

export function GlobalBannerSlot({ position }: { position: StoreBanner["position"] }) {
  const location = useLocation();
  const { locale, user, subtotal, count, couponCode } = useStore();
  const device = useDevice();
  const [active, setActive] = useState(0);
  const page = `${location.pathname}${location.searchStr || ""}`;
  const context = useMemo(
    () => ({
      locale,
      page,
      device,
      authenticated: Boolean(user),
      returning: Boolean(user),
      cartSubtotal: Math.round(subtotal * 100),
      cartCount: count,
      customerName: user?.firstName,
      couponCode: couponCode || undefined,
    }),
    [count, couponCode, device, locale, page, subtotal, user],
  );
  const query = useQuery({
    queryKey: ["active-banners", context],
    queryFn: () => getActiveBanners(context),
    enabled: typeof window !== "undefined",
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 1,
  });
  const banners = (query.data?.banners ?? []).filter((banner) => banner.position === position);
  const strategy = query.data?.strategy ?? "HIGHEST_PRIORITY";
  const ids = banners.map(({ id }) => id).join("|");
  useEffect(() => setActive(0), [ids]);
  useEffect(() => {
    if (!["ROTATE", "SEQUENCE"].includes(strategy) || banners.length < 2) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % banners.length),
      Number(banners[active]?.behavior.intervalMs || 8000),
    );
    return () => window.clearTimeout(timer);
  }, [active, banners, strategy]);
  if (query.isError || banners.length === 0) return null;
  const visible = (strategy === "STACK" ? banners : [banners[active] ?? banners[0]]).filter(
    Boolean,
  ) as StoreBanner[];
  return (
    <div className={`global-banner-slot global-banner-slot--${position.toLowerCase()}`}>
      {visible.map((banner) => (
        <AnnouncementBanner
          key={banner.id}
          banner={banner}
          locale={locale}
          device={device}
          page={page}
        />
      ))}
    </div>
  );
}

function useDevice(): Device {
  const [device, setDevice] = useState<Device>("desktop");
  useEffect(() => {
    const update = () =>
      setDevice(
        window.innerWidth < 640 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
      );
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return device;
}
