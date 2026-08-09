import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import {
  MOTION_DURATION_NORMAL,
  MOTION_DURATION_SLOW,
  MOTION_VIEWPORT_MARGIN,
  MOTION_VIEWPORT_THRESHOLD,
  STAGGER_NORMAL,
  type ImageRevealDirection,
  type MotionRevealVariant,
} from "@/lib/motion";
import { useMotionPreferences } from "./motion-context";

type MotionStyle = CSSProperties & {
  "--motion-delay"?: string;
  "--motion-duration"?: string;
  "--motion-stagger"?: string;
  "--motion-distance"?: string;
  "--parallax-y"?: string;
};

function useMotionInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const { reducedMotion } = useMotionPreferences();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight * 0.94 && bounds.bottom > 0) {
      setVisible(true);
      return;
    }

    let frame = 0;
    let revealed = false;

    const stopWatching = () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestCheck);
      window.removeEventListener("resize", requestCheck);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const updateFromBounds = () => {
      frame = 0;
      const currentBounds = element.getBoundingClientRect();
      const isInView = currentBounds.top < window.innerHeight * 0.94 && currentBounds.bottom > 0;
      if (isInView) {
        revealed = true;
        setVisible(true);
        if (once) stopWatching();
      } else if (!once) {
        setVisible(false);
      }
    };

    function requestCheck() {
      if (!revealed && !frame) frame = window.requestAnimationFrame(updateFromBounds);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          revealed = true;
          setVisible(true);
          if (once) stopWatching();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: MOTION_VIEWPORT_THRESHOLD, rootMargin: MOTION_VIEWPORT_MARGIN },
    );
    observer.observe(element);
    // Lenis can update the visual scroll position between IntersectionObserver
    // delivery frames. The passive bounds check keeps reveals reliable while
    // retaining IntersectionObserver as the primary, low-cost path.
    window.addEventListener("scroll", requestCheck, { passive: true });
    window.addEventListener("resize", requestCheck, { passive: true });
    requestCheck();
    return stopWatching;
  }, [once, reducedMotion]);

  return { ref, visible };
}

type RevealProps = Omit<HTMLAttributes<HTMLElement>, "children" | "className"> & {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  variant?: MotionRevealVariant;
  stagger?: boolean;
  staggerMs?: number;
  className?: string;
  as?: ElementType;
};

export function Reveal({
  children,
  delay = 0,
  duration = MOTION_DURATION_NORMAL,
  distance = 34,
  variant = "up",
  stagger = false,
  staggerMs = STAGGER_NORMAL,
  className,
  as: Tag = "div",
  style: userStyle,
  ...props
}: RevealProps) {
  const { ref, visible } = useMotionInView<HTMLElement>();
  const style: MotionStyle = {
    "--motion-delay": `${Math.max(0, delay)}ms`,
    "--motion-duration": `${duration}ms`,
    "--motion-distance": `${distance}px`,
    "--motion-stagger": `${staggerMs}ms`,
  };
  return (
    <Tag
      ref={ref}
      className={cn("motion-reveal", stagger && "motion-stagger", className)}
      data-motion-state={visible ? "visible" : "hidden"}
      data-motion-variant={variant}
      style={{ ...userStyle, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function TextReveal({
  lines,
  delay = 0,
  staggerMs = 90,
  className,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  delay?: number;
  staggerMs?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, visible } = useMotionInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn("motion-text-reveal", className)}
      data-motion-state={visible ? "visible" : "hidden"}
      style={
        {
          "--motion-delay": `${delay}ms`,
          "--motion-stagger": `${staggerMs}ms`,
        } as MotionStyle
      }
    >
      {lines.map((line, index) => (
        <span className="motion-text-mask" key={index}>
          <span className="motion-text-line" style={{ "--motion-index": index } as CSSProperties}>
            {line}
          </span>
          {index < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

export function ImageReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: ImageRevealDirection;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useMotionInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("motion-image-reveal", className)}
      data-motion-direction={direction}
      data-motion-state={visible ? "visible" : "hidden"}
      style={{ "--motion-delay": `${delay}ms` } as MotionStyle}
    >
      <div className="motion-image-reveal__inner">{children}</div>
    </div>
  );
}

export function ParallaxMedia({
  children,
  strength = 28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, finePointer } = useMotionPreferences();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion || !finePointer) return;
    let frame = 0;
    const update = () => {
      const bounds = element.getBoundingClientRect();
      const travel = window.innerHeight + bounds.height;
      const progress = (window.innerHeight - bounds.top) / travel - 0.5;
      element.style.setProperty("--parallax-y", `${progress * strength * 2}px`);
      frame = 0;
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [finePointer, reducedMotion, strength]);

  return (
    <div ref={ref} className={cn("motion-parallax", className)}>
      <div className="motion-parallax__media">{children}</div>
    </div>
  );
}

export function Magnetic({
  children,
  strength = 5,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reducedMotion, finePointer } = useMotionPreferences();
  const move = (event: MouseEvent<HTMLSpanElement>) => {
    if (reducedMotion || !finePointer || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * strength * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * strength * 2;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  };
  return (
    <span
      ref={ref}
      className={cn("motion-magnetic", className)}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
    </span>
  );
}

export const AnimatedHeading = TextReveal;
