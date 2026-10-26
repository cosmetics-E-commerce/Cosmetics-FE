import { useEffect, useState } from "react";

/**
 * Turns true once the page has finished loading and the main thread is idle.
 * Work gated on it (hidden slides, menu data) never competes with first paint
 * or hydration.
 */
export function usePageIdle() {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;
    const markIdle = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setIdle(true), { timeout: 3_000 });
      } else {
        timeoutId = globalThis.setTimeout(() => setIdle(true), 1_000);
      }
    };
    if (document.readyState === "complete") markIdle();
    else window.addEventListener("load", markIdle, { once: true });
    return () => {
      window.removeEventListener("load", markIdle);
      if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return idle;
}
