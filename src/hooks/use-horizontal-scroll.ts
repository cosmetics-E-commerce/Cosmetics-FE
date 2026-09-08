import { useCallback, useEffect, useState } from "react";
import { scrollElementHorizontallyIntoView } from "@/lib/horizontal-nav";

type ScrollEdges = { previous: boolean; next: boolean };

/** Adds mouse dragging to native scrolling; touch and trackpads stay native. */
export function useHorizontalScroll<T extends HTMLElement>({
  rtl = false,
  enabled = true,
}: { rtl?: boolean; enabled?: boolean } = {}) {
  const [element, ref] = useState<T | null>(null);
  const [edges, setEdges] = useState<ScrollEdges>({ previous: false, next: false });

  const scroll = useCallback(
    (direction: -1 | 1) => {
      if (!element) return;
      element.scrollBy({
        left: direction * (rtl ? -1 : 1) * element.clientWidth * 0.8,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    },
    [element, rtl],
  );

  useEffect(() => {
    if (!element || !enabled) return;
    let frame = 0;
    let overflow = false;
    let suppressClick = false;
    let gesture: { id: number; x: number; y: number; left: number; dragging: boolean } | null =
      null;

    const measure = () => {
      frame = 0;
      const maximum = Math.max(0, element.scrollWidth - element.clientWidth);
      const position = Math.max(0, Math.min(maximum, (rtl ? -1 : 1) * element.scrollLeft));
      overflow = maximum > 2;
      element.toggleAttribute("data-scrollable", overflow);
      const previous = position > 2;
      const next = maximum - position > 2;
      setEdges((current) =>
        current.previous === previous && current.next === next ? current : { previous, next },
      );
    };
    const scheduleMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    const finish = () => {
      const pointer = gesture;
      gesture = null;
      element.removeAttribute("data-dragging");
      if (pointer && element.hasPointerCapture(pointer.id)) {
        element.releasePointerCapture(pointer.id);
      }
      scheduleMeasure();
    };
    const pointerDown = (event: PointerEvent) => {
      suppressClick = false;
      if (
        !overflow ||
        event.pointerType !== "mouse" ||
        !event.isPrimary ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        !(event.target instanceof Element) ||
        event.target.closest(
          'input, textarea, select, button:not([role="tab"]), [role="button"], [contenteditable]:not([contenteditable="false"]), [data-scroll-no-drag]',
        )
      )
        return;
      gesture = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        left: element.scrollLeft,
        dragging: false,
      };
    };
    const pointerMove = (event: PointerEvent) => {
      if (!gesture || gesture.id !== event.pointerId) return;
      if (event.buttons !== 1) {
        finish();
        return;
      }
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      if (!gesture.dragging) {
        if (Math.abs(dy) > 6 && Math.abs(dy) > Math.abs(dx)) {
          finish();
          return;
        }
        if (Math.abs(dx) < 6) return;
        gesture.dragging = true;
        suppressClick = true;
        element.setAttribute("data-dragging", "true");
        element.setPointerCapture(event.pointerId);
        window.getSelection()?.removeAllRanges();
      }
      event.preventDefault();
      element.scrollLeft = gesture.left - dx;
    };
    const pointerEnd = (event: PointerEvent) => {
      if (gesture?.id === event.pointerId) finish();
    };
    const preventDraggedClick = (event: MouseEvent) => {
      // Keyboard activation (detail 0) and the next real click still work.
      if (!suppressClick || event.detail === 0) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    };
    const preventNativeDrag = (event: DragEvent) => {
      if (gesture) event.preventDefault();
    };
    const revealFocus = (event: FocusEvent) => {
      if (!gesture && event.target instanceof HTMLElement && event.target !== element) {
        scrollElementHorizontallyIntoView(element, event.target, {
          behavior: "instant",
          edgePadding: 4,
        });
      }
    };
    const keyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const backwards = event.key === (rtl ? "ArrowRight" : "ArrowLeft");
      const forwards = event.key === (rtl ? "ArrowLeft" : "ArrowRight");
      if (!backwards && !forwards && event.key !== "Home" && event.key !== "End") return;
      if (target.getAttribute("role") === "tab") {
        const tabs = [...element.querySelectorAll<HTMLElement>('[role="tab"]:not(:disabled)')];
        const index = tabs.indexOf(target);
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : Math.max(0, Math.min(tabs.length - 1, index + (backwards ? -1 : 1)));
        tabs[next]?.focus({ preventScroll: true });
      } else if (target === element) {
        if (event.key === "Home" || event.key === "End") {
          element.scrollTo({
            left: event.key === "Home" ? 0 : (rtl ? -1 : 1) * element.scrollWidth,
            behavior: "instant",
          });
        } else scroll(backwards ? -1 : 1);
      } else return;
      event.preventDefault();
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    const observeSizes = () => {
      resizeObserver.disconnect();
      resizeObserver.observe(element);
      for (const child of element.children) resizeObserver.observe(child);
      scheduleMeasure();
    };
    const mutationObserver = new MutationObserver(observeSizes);
    mutationObserver.observe(element, { childList: true, subtree: true, characterData: true });
    observeSizes();
    element.addEventListener("scroll", scheduleMeasure, { passive: true });
    element.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointermove", pointerMove, { passive: false });
    window.addEventListener("pointerup", pointerEnd);
    window.addEventListener("pointercancel", pointerEnd);
    window.addEventListener("blur", finish);
    element.addEventListener("lostpointercapture", pointerEnd);
    element.addEventListener("click", preventDraggedClick, true);
    element.addEventListener("dragstart", preventNativeDrag);
    element.addEventListener("focusin", revealFocus);
    element.addEventListener("keydown", keyDown);
    return () => {
      finish();
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      element.removeAttribute("data-scrollable");
      element.removeEventListener("scroll", scheduleMeasure);
      element.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerEnd);
      window.removeEventListener("pointercancel", pointerEnd);
      window.removeEventListener("blur", finish);
      element.removeEventListener("lostpointercapture", pointerEnd);
      element.removeEventListener("click", preventDraggedClick, true);
      element.removeEventListener("dragstart", preventNativeDrag);
      element.removeEventListener("focusin", revealFocus);
      element.removeEventListener("keydown", keyDown);
    };
  }, [element, enabled, rtl, scroll]);

  return { ref, element, scroll, ...edges, overflowing: edges.previous || edges.next };
}
