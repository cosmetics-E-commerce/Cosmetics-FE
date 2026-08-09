import { useEffect, useMemo, useState, type ReactNode } from "react";
import { MotionContext, type MotionContextValue } from "./motion-context";

export function MotionProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<MotionContextValue>({
    reducedMotion: false,
    finePointer: false,
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () =>
      setPreferences({ reducedMotion: reduced.matches, finePointer: fine.matches });
    update();
    reduced.addEventListener("change", update);
    fine.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      fine.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset["motionReady"] = "true";
    return () => {
      delete document.documentElement.dataset["motionReady"];
    };
  }, []);

  useEffect(() => {
    if (preferences.reducedMotion || !preferences.finePointer) return;

    let active = true;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    const tick = (time: number) => {
      frame = 0;
      lenis?.raf(time);
      start();
    };
    const start = () => {
      if (!frame && !document.hidden) frame = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };
    const onVisibilityChange = () => (document.hidden ? stop() : start());
    void import("lenis").then(({ default: Lenis }) => {
      if (!active) return;
      lenis = new Lenis({
        duration: 1.08,
        easing: (value) => 1 - Math.pow(1 - value, 4),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.88,
        touchMultiplier: 1,
        anchors: true,
      });
      start();
      document.addEventListener("visibilitychange", onVisibilityChange);
      document.documentElement.dataset["smoothScroll"] = "true";
    });

    return () => {
      active = false;
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      lenis?.destroy();
      delete document.documentElement.dataset["smoothScroll"];
    };
  }, [preferences.finePointer, preferences.reducedMotion]);

  const value = useMemo(() => preferences, [preferences]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
