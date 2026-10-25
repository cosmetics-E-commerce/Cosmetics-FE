import { useEffect, useState } from "react";
import { usePageIdle } from "@/hooks/use-page-idle";

/**
 * Decides which carousel slides may mount their media. The active slide always
 * does; the next one waits until the page has finished loading and the main
 * thread is idle, so hidden slides never compete with first paint. Slides that
 * have been shown stay mounted, keeping their fade-out transition intact.
 *
 * `hasAdvanced` turns true once a second slide has been shown, so entrance
 * animations can play on slide changes without hiding the first slide's
 * content (the page's largest paint) behind a fade on load.
 */
export function useDeferredSlides(activeIndex: number, slideCount: number) {
  const pageIdle = usePageIdle();
  const [shown, setShown] = useState<ReadonlySet<number>>(() => new Set([activeIndex]));

  useEffect(() => {
    setShown((current) => (current.has(activeIndex) ? current : new Set(current).add(activeIndex)));
  }, [activeIndex]);

  return {
    hasAdvanced: shown.size > 1,
    shouldMountSlide: (index: number) =>
      index === activeIndex ||
      shown.has(index) ||
      (pageIdle && slideCount > 1 && index === (activeIndex + 1) % slideCount),
  };
}
