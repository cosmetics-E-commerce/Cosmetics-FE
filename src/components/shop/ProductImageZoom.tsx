import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent,
} from "react";
import { useMotionPreferences } from "@/components/motion/motion-context";
import { PolishedImage } from "@/components/ui/polished-image";

type ProductImageZoomProps = {
  src: string;
  alt: string;
  resetKey?: string;
};

type PointerPosition = {
  clientX: number;
  clientY: number;
};

const CENTER_ORIGIN = "50%";

export function ProductImageZoom({ src, alt, resetKey }: ProductImageZoomProps) {
  const { finePointer } = useMotionPreferences();
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const latestPointerRef = useRef<PointerPosition | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  const cancelPointerFrame = useCallback(() => {
    if (pointerFrameRef.current === null) return;
    window.cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = null;
  }, []);

  const setOrigin = useCallback((position: PointerPosition, bounds: DOMRect) => {
    const frame = frameRef.current;
    if (!frame || bounds.width <= 0 || bounds.height <= 0) return;
    const x = clamp((position.clientX - bounds.left) / bounds.width, 0, 1) * 100;
    const y = clamp((position.clientY - bounds.top) / bounds.height, 0, 1) * 100;
    frame.style.setProperty("--product-zoom-x", `${x.toFixed(3)}%`);
    frame.style.setProperty("--product-zoom-y", `${y.toFixed(3)}%`);
  }, []);

  const resetZoom = useCallback(
    (resetOrigin = false) => {
      cancelPointerFrame();
      boundsRef.current = null;
      latestPointerRef.current = null;
      const frame = frameRef.current;
      if (!frame) return;
      frame.dataset["zoomActive"] = "false";
      if (resetOrigin) {
        frame.style.setProperty("--product-zoom-x", CENTER_ORIGIN);
        frame.style.setProperty("--product-zoom-y", CENTER_ORIGIN);
      }
    },
    [cancelPointerFrame],
  );

  useEffect(() => {
    resetZoom(true);
    const image = imageRef.current;
    setReady(Boolean(image?.complete && image.naturalWidth > 0 && image.naturalHeight > 0));
  }, [resetKey, resetZoom, src]);

  useEffect(() => {
    if (!finePointer) resetZoom(true);
  }, [finePointer, resetZoom]);

  useEffect(() => () => cancelPointerFrame(), [cancelPointerFrame]);

  const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!finePointer || !ready || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    boundsRef.current = bounds;
    setOrigin(event, bounds);
    event.currentTarget.dataset["zoomActive"] = "true";
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!finePointer || !ready || event.pointerType === "touch") return;

    if (event.currentTarget.dataset["zoomActive"] !== "true") {
      const bounds = event.currentTarget.getBoundingClientRect();
      boundsRef.current = bounds;
      setOrigin(event, bounds);
      event.currentTarget.dataset["zoomActive"] = "true";
      return;
    }

    latestPointerRef.current = { clientX: event.clientX, clientY: event.clientY };
    if (pointerFrameRef.current !== null) return;

    pointerFrameRef.current = window.requestAnimationFrame(() => {
      const position = latestPointerRef.current;
      const bounds = boundsRef.current;
      if (position && bounds) setOrigin(position, bounds);
      pointerFrameRef.current = null;
    });
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLImageElement>) => {
    if (event.propertyName !== "transform") return;
    const frame = frameRef.current;
    if (!frame || frame.dataset["zoomActive"] === "true") return;
    frame.style.setProperty("--product-zoom-x", CENTER_ORIGIN);
    frame.style.setProperty("--product-zoom-y", CENTER_ORIGIN);
  };

  return (
    <div
      ref={frameRef}
      className="product-gallery-active product-reference-main-image product-detail-zoom"
      data-zoom-active="false"
      data-zoom-ready={ready ? "true" : "false"}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => resetZoom()}
      onPointerCancel={() => resetZoom()}
    >
      <PolishedImage
        key={src}
        ref={imageRef}
        src={src}
        alt={alt}
        width={1200}
        height={1500}
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 1200px) 49vw, 100vw"
        wrapperClassName="product-reference-image-shell product-detail-zoom__shell"
        className="size-full object-contain product-detail-zoom__image"
        onLoad={(event) =>
          setReady(event.currentTarget.naturalWidth > 0 && event.currentTarget.naturalHeight > 0)
        }
        onError={() => {
          setReady(false);
          resetZoom(true);
        }}
        onTransitionEnd={handleTransitionEnd}
      />
    </div>
  );
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}
