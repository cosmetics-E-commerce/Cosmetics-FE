import { useEffect, useRef } from "react";

const horizontalIntentThreshold = 6;
const horizontalIntentRatio = 1.12;
const resumeDelay = 1_600;
const maximumReleaseVelocity = 0.85;
const momentumTimeConstant = 180;
const autoVelocityBlendTime = 320;

type PointerSession = {
  id: number;
  startX: number;
  startY: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  intent: "pending" | "horizontal";
};

type DraggableMarqueeOptions = {
  enabled: boolean;
  direction: -1 | 1;
};

export function useDraggableMarquee({ enabled, direction }: DraggableMarqueeOptions) {
  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!enabled || !root || !viewport || !track || !group) return;

    let groupWidth = 0;
    let duration = 1;
    let position = 0;
    let velocity = 0;
    let pointer: PointerSession | null = null;
    let resumeAt = 0;
    let animationFrame = 0;
    let releaseClickTimer = 0;
    let suppressClick = false;
    let hovering = false;
    let focusWithin = false;
    let inViewport = true;
    let lastFrame = performance.now();
    let initialized = false;
    const reducedMotion =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    const normalizePosition = (value: number) => {
      if (groupWidth <= 0) return value;
      const wrapped = ((value % groupWidth) + groupWidth) % groupWidth;
      return wrapped < 0.001 ? 0 : wrapped - groupWidth;
    };

    const paint = () => {
      if (groupWidth <= 0) return;
      position = normalizePosition(position);
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const renderedPosition = dpr > 1 ? Math.round(position * dpr) / dpr : position;
      track.style.transform = `translate3d(${renderedPosition}px, 0, 0)`;
    };

    const currentTranslate = () => {
      const transform = getComputedStyle(track).transform;
      if (!transform || transform === "none") return 0;
      try {
        return new DOMMatrixReadOnly(transform).m41;
      } catch {
        const values = transform.match(/-?\d*\.?\d+/g)?.map(Number);
        return values?.length === 6 ? (values[4] ?? 0) : (values?.[12] ?? 0);
      }
    };

    const measure = () => {
      const nextWidth = group.getBoundingClientRect().width;
      if (nextWidth <= 0) return;
      if (!initialized) position = currentTranslate();
      groupWidth = nextWidth;
      duration =
        Math.max(
          Number.parseFloat(getComputedStyle(root).getPropertyValue("--brand-marquee-duration")),
          1,
        ) * 1_000;
      if (!initialized && direction === 1 && Math.abs(position) < 0.5) position = -groupWidth;
      initialized = true;
      paint();
    };

    // Capture the server-rendered CSS animation position before handing motion
    // to the pointer-aware engine, preventing a hydration jump.
    measure();
    root.dataset["enhanced"] = "true";
    track.dataset["enhanced"] = "true";
    paint();

    const tick = (now: number) => {
      const elapsed = Math.min(Math.max(now - lastFrame, 0), 40);
      lastFrame = now;
      const dragging = pointer?.intent === "horizontal";
      const motionAllowed = !reducedMotion?.matches && inViewport && !document.hidden;

      if (!dragging && !hovering && !focusWithin && motionAllowed && groupWidth > 0) {
        if (now < resumeAt) {
          if (Math.abs(velocity) > 0.004) {
            position += velocity * elapsed;
            velocity *= Math.exp(-elapsed / momentumTimeConstant);
            paint();
          } else {
            velocity = 0;
          }
        } else {
          const autoVelocity = (direction * groupWidth) / duration;
          const blend = 1 - Math.exp(-elapsed / autoVelocityBlendTime);
          velocity += (autoVelocity - velocity) * blend;
          position += velocity * elapsed;
          paint();
        }
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const finishPointer = (event: PointerEvent, cancelled = false) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const dragged = pointer.intent === "horizontal";
      if (viewport.hasPointerCapture?.(event.pointerId)) {
        viewport.releasePointerCapture?.(event.pointerId);
      }
      viewport.removeAttribute("data-dragging");

      if (dragged) {
        velocity = cancelled
          ? 0
          : Math.max(-maximumReleaseVelocity, Math.min(maximumReleaseVelocity, pointer.velocity));
        resumeAt = performance.now() + resumeDelay;
        suppressClick = true;
        window.clearTimeout(releaseClickTimer);
        releaseClickTimer = window.setTimeout(() => {
          suppressClick = false;
        }, 0);
      } else {
        velocity = 0;
        resumeAt = performance.now();
      }
      pointer = null;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const now = performance.now();
      pointer = {
        id: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastTime: now,
        velocity: 0,
        intent: "pending",
      };
      velocity = 0;
      resumeAt = Number.POSITIVE_INFINITY;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const totalX = event.clientX - pointer.startX;
      const totalY = event.clientY - pointer.startY;

      if (pointer.intent === "pending") {
        if (Math.hypot(totalX, totalY) < horizontalIntentThreshold) return;
        if (Math.abs(totalY) > Math.abs(totalX) * horizontalIntentRatio) {
          pointer = null;
          velocity = 0;
          resumeAt = performance.now() + 250;
          return;
        }
        if (Math.abs(totalX) <= Math.abs(totalY) * horizontalIntentRatio) return;
        pointer.intent = "horizontal";
        viewport.dataset["dragging"] = "true";
        try {
          viewport.setPointerCapture?.(event.pointerId);
        } catch {
          // Pointer capture is an enhancement; movement remains usable without it.
        }
      }

      event.preventDefault();
      const now = performance.now();
      const delta = event.clientX - pointer.lastX;
      const elapsed = Math.max(now - pointer.lastTime, 1);
      const instantaneousVelocity = delta / elapsed;
      pointer.velocity = pointer.velocity * 0.68 + instantaneousVelocity * 0.32;
      pointer.lastX = event.clientX;
      pointer.lastTime = now;
      position += delta;
      paint();
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      suppressClick = false;
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = true;
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = false;
    };
    const onFocusIn = () => {
      focusWithin = true;
    };
    const onFocusOut = (event: FocusEvent) => {
      focusWithin = root.contains(event.relatedTarget as Node | null);
    };
    const onMotionPreferenceChange = () => {
      velocity = 0;
      resumeAt = reducedMotion?.matches ? Number.POSITIVE_INFINITY : performance.now();
    };
    const onPointerCancel = (event: PointerEvent) => finishPointer(event, true);

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove, { passive: false });
    viewport.addEventListener("pointerup", finishPointer);
    viewport.addEventListener("pointercancel", onPointerCancel);
    viewport.addEventListener("click", onClickCapture, true);
    viewport.addEventListener("pointerenter", onPointerEnter);
    viewport.addEventListener("pointerleave", onPointerLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    reducedMotion?.addEventListener("change", onMotionPreferenceChange);

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    resizeObserver?.observe(group);
    const intersectionObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            inViewport = Boolean(entry?.isIntersecting);
            lastFrame = performance.now();
          });
    intersectionObserver?.observe(root);
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(releaseClickTimer);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", finishPointer);
      viewport.removeEventListener("pointercancel", onPointerCancel);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("pointerenter", onPointerEnter);
      viewport.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      reducedMotion?.removeEventListener("change", onMotionPreferenceChange);
      delete root.dataset["enhanced"];
      delete track.dataset["enhanced"];
      viewport.removeAttribute("data-dragging");
      track.style.removeProperty("transform");
    };
  }, [direction, enabled]);

  return { rootRef, viewportRef, trackRef, groupRef };
}
