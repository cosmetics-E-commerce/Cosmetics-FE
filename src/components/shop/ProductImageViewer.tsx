import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PolishedImage } from "@/components/ui/polished-image";

export type ProductViewerImage = {
  id: string;
  url: string;
  altText: string;
};

type ProductImageViewerProps = {
  images: ProductViewerImage[];
  index: number;
  onIndexChange: (index: number) => void;
  locale: "ar" | "en";
};

type FittedImageSize = {
  imageId: string;
  width: number;
  height: number;
  baseScale: number;
  availableWidth: number;
  availableHeight: number;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export function ProductImageViewer({
  images,
  index,
  onIndexChange,
  locale,
}: ProductImageViewerProps) {
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [fittedSize, setFittedSize] = useState<FittedImageSize | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<
    { pointerId: number; startX: number; startY: number; x: number; y: number } | undefined
  >(undefined);
  const suppressBackdropClickRef = useRef(false);
  const panRef = useRef({ x: 0, y: 0 });
  const image = images[index] ?? images[0];
  const hasNavigation = images.length > 1;
  const copy = viewerCopy[locale];
  const activeFittedSize = fittedSize?.imageId === image?.id ? fittedSize : null;

  useEffect(() => setHydrated(true), []);

  const applyPan = useCallback((x: number, y: number) => {
    panRef.current = { x, y };
    stageRef.current?.style.setProperty("--viewer-pan-x", `${x}px`);
    stageRef.current?.style.setProperty("--viewer-pan-y", `${y}px`);
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(MIN_ZOOM);
    applyPan(0, 0);
    dragRef.current = undefined;
  }, [applyPan]);

  const dismissFromBackdrop = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      if (suppressBackdropClickRef.current) {
        suppressBackdropClickRef.current = false;
        event.stopPropagation();
        return;
      }
      if (event.target !== event.currentTarget) return;
      setOpen(false);
      resetZoom();
    },
    [resetZoom],
  );

  const recalculateFit = useCallback(() => {
    if (!image?.id) return null;
    const next = getFittedImageSize(stageRef.current, imageRef.current, image.id);
    if (!next) return null;
    setFittedSize((current) =>
      current &&
      current.imageId === next.imageId &&
      current.width === next.width &&
      current.height === next.height &&
      current.baseScale === next.baseScale &&
      current.availableWidth === next.availableWidth &&
      current.availableHeight === next.availableHeight
        ? current
        : next,
    );
    return next;
  }, [image?.id]);

  const move = useCallback(
    (direction: -1 | 1) => {
      if (!hasNavigation) return;
      const next = (index + direction + images.length) % images.length;
      onIndexChange(next);
      resetZoom();
    },
    [hasNavigation, images.length, index, onIndexChange, resetZoom],
  );

  useEffect(() => {
    resetZoom();
  }, [image?.id, resetZoom]);

  useEffect(() => {
    if (!open) return;
    const fitAndConstrain = () => {
      const nextFittedSize = recalculateFit();
      if (!nextFittedSize) return;
      const bounds = getPanBounds(nextFittedSize, zoom);
      applyPan(
        clamp(panRef.current.x, -bounds.x, bounds.x),
        clamp(panRef.current.y, -bounds.y, bounds.y),
      );
    };
    fitAndConstrain();
    window.addEventListener("resize", fitAndConstrain, { passive: true });
    return () => window.removeEventListener("resize", fitAndConstrain);
  }, [applyPan, open, recalculateFit, zoom]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(locale === "ar" ? 1 : -1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        move(locale === "ar" ? -1 : 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [locale, move, open]);

  if (!image) return null;

  const setClampedZoom = (value: number) => {
    const next = clamp(value, MIN_ZOOM, MAX_ZOOM);
    setZoom(next);
    if (next === MIN_ZOOM) {
      applyPan(0, 0);
      return;
    }
    const bounds = getPanBounds(activeFittedSize, next);
    applyPan(
      clamp(panRef.current.x, -bounds.x, bounds.x),
      clamp(panRef.current.y, -bounds.y, bounds.y),
    );
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = getPanBounds(activeFittedSize, zoom);
    if (bounds.x === 0 && bounds.y === 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    suppressBackdropClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: panRef.current.x,
      y: panRef.current.y,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !stage) return;
    if (Math.abs(event.clientX - drag.startX) + Math.abs(event.clientY - drag.startY) > 4) {
      suppressBackdropClickRef.current = true;
    }
    const bounds = getPanBounds(activeFittedSize, zoom);
    applyPan(
      clamp(drag.x + event.clientX - drag.startX, -bounds.x, bounds.x),
      clamp(drag.y + event.clientY - drag.startY, -bounds.y, bounds.y),
    );
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = undefined;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!activeFittedSize) return;
    if (!event.ctrlKey && Math.abs(event.deltaY) < 2) return;
    event.preventDefault();
    setClampedZoom(zoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
  };

  const PreviousIcon = locale === "ar" ? ChevronRight : ChevronLeft;
  const NextIcon = locale === "ar" ? ChevronLeft : ChevronRight;
  const panBounds = getPanBounds(activeFittedSize, zoom);
  const canPan = panBounds.x > 0 || panBounds.y > 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) resetZoom();
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          disabled={!hydrated}
          className="product-gallery-active product-reference-main-image product-viewer-trigger"
          aria-label={copy.open(image.altText)}
        >
          <PolishedImage
            key={image.url}
            src={image.url}
            alt={image.altText}
            width={1200}
            height={1500}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1200px) 560px, 100vw"
            wrapperClassName="product-reference-image-shell"
            className="size-full object-contain product-viewer-trigger__image"
          />
          <span className="product-viewer-trigger__hint" aria-hidden="true">
            {copy.inspect}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        viewport
        showCloseButton={false}
        overlayClassName="product-viewer__overlay"
        className="product-viewer"
        onClick={dismissFromBackdrop}
      >
        <DialogTitle className="sr-only">{copy.title}</DialogTitle>
        <DialogClose className="product-viewer__close" aria-label={copy.close}>
          <X aria-hidden="true" />
        </DialogClose>

        <div className="product-viewer__canvas" onClick={dismissFromBackdrop}>
          <div
            ref={stageRef}
            className="product-viewer__stage"
            data-fit-ready={activeFittedSize ? "true" : "false"}
            data-pannable={canPan ? "true" : undefined}
            style={
              {
                "--viewer-fit-width": activeFittedSize ? `${activeFittedSize.width}px` : "0px",
                "--viewer-fit-height": activeFittedSize ? `${activeFittedSize.height}px` : "0px",
              } as CSSProperties
            }
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={(event) => {
              stopDragging(event);
              suppressBackdropClickRef.current = false;
            }}
            onLostPointerCapture={() => {
              dragRef.current = undefined;
            }}
            onDoubleClick={() => {
              if (activeFittedSize) setClampedZoom(zoom > MIN_ZOOM ? MIN_ZOOM : 2.5);
            }}
            onWheel={handleWheel}
            onClick={dismissFromBackdrop}
          >
            <div className="product-viewer__media">
              <img
                ref={imageRef}
                key={image.id}
                src={image.url}
                alt={image.altText}
                draggable={false}
                decoding="async"
                className="product-viewer__image"
                style={{ transform: `scale(${zoom})` }}
                onLoad={() => {
                  const nextFittedSize = recalculateFit();
                  if (!nextFittedSize) return;
                  const bounds = getPanBounds(nextFittedSize, zoom);
                  applyPan(
                    clamp(panRef.current.x, -bounds.x, bounds.x),
                    clamp(panRef.current.y, -bounds.y, bounds.y),
                  );
                }}
              />
            </div>
          </div>

          {hasNavigation ? (
            <>
              <button
                type="button"
                className="product-viewer__nav product-viewer__nav--previous"
                onClick={() => move(-1)}
                aria-label={copy.previous}
              >
                <PreviousIcon aria-hidden="true" />
              </button>
              <button
                type="button"
                className="product-viewer__nav product-viewer__nav--next"
                onClick={() => move(1)}
                aria-label={copy.next}
              >
                <NextIcon aria-hidden="true" />
              </button>
            </>
          ) : null}
        </div>

        <div className="product-viewer__chrome" onClick={dismissFromBackdrop}>
          {hasNavigation ? (
            <div className="product-viewer__footer">
              <span aria-live="polite">
                {index + 1} / {images.length}
              </span>
              <div className="product-viewer__thumbs" aria-label={copy.images}>
                {images.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onIndexChange(itemIndex);
                      resetZoom();
                    }}
                    aria-label={copy.image(itemIndex + 1)}
                    aria-current={itemIndex === index ? "true" : undefined}
                  >
                    <img src={item.url} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="product-viewer__controls" aria-label={copy.zoomControls}>
            <button
              type="button"
              onClick={() => setClampedZoom(zoom - ZOOM_STEP)}
              disabled={!activeFittedSize || zoom <= MIN_ZOOM}
              aria-label={copy.zoomOut}
            >
              <Minus aria-hidden="true" />
            </button>
            <output aria-live="polite">{Math.round(zoom * 100)}%</output>
            <button
              type="button"
              onClick={() => setClampedZoom(zoom + ZOOM_STEP)}
              disabled={!activeFittedSize || zoom >= MAX_ZOOM}
              aria-label={copy.zoomIn}
            >
              <Plus aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={resetZoom}
              disabled={!activeFittedSize || zoom <= MIN_ZOOM}
              aria-label={copy.reset}
            >
              <RotateCcw aria-hidden="true" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const viewerCopy = {
  en: {
    title: "Product image viewer",
    inspect: "View image",
    open: (name: string) => `Open ${name} in image viewer`,
    close: "Close image viewer",
    previous: "Previous product image",
    next: "Next product image",
    zoomControls: "Image zoom controls",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    reset: "Reset zoom",
    images: "Product images",
    image: (index: number) => `View product image ${index}`,
  },
  ar: {
    title: "عارض صور المنتج",
    inspect: "عرض الصورة",
    open: (name: string) => `فتح صورة ${name} في عارض الصور`,
    close: "إغلاق عارض الصور",
    previous: "صورة المنتج السابقة",
    next: "صورة المنتج التالية",
    zoomControls: "أدوات تكبير الصورة",
    zoomIn: "تكبير الصورة",
    zoomOut: "تصغير الصورة",
    reset: "إعادة ضبط التكبير",
    images: "صور المنتج",
    image: (index: number) => `عرض صورة المنتج ${index}`,
  },
} as const;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function getFittedImageSize(
  stage: HTMLDivElement | null,
  image: HTMLImageElement | null,
  imageId: string,
): FittedImageSize | null {
  if (
    !stage ||
    !image ||
    !stage.clientWidth ||
    !stage.clientHeight ||
    !image.naturalWidth ||
    !image.naturalHeight
  ) {
    return null;
  }
  const baseScale = Math.min(
    stage.clientWidth / image.naturalWidth,
    stage.clientHeight / image.naturalHeight,
    1,
  );
  if (!Number.isFinite(baseScale) || baseScale <= 0) return null;
  return {
    imageId,
    width: image.naturalWidth * baseScale,
    height: image.naturalHeight * baseScale,
    baseScale,
    availableWidth: stage.clientWidth,
    availableHeight: stage.clientHeight,
  };
}

function getPanBounds(fittedSize: FittedImageSize | null, zoom: number) {
  if (!fittedSize || zoom <= MIN_ZOOM) {
    return { x: 0, y: 0 };
  }
  return {
    x: Math.max(0, (fittedSize.width * zoom - fittedSize.availableWidth) / 2),
    y: Math.max(0, (fittedSize.height * zoom - fittedSize.availableHeight) / 2),
  };
}
