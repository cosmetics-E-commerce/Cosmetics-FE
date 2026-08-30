import type { BrandLogoDisplay } from "@cosmetics/contracts";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";

import "./brand-logo.css";

const defaultDisplay: BrandLogoDisplay = {
  scale: "STANDARD",
  padding: "STANDARD",
  alignX: "CENTER",
  alignY: "CENTER",
};

type BrandLogoProps = {
  name: string;
  logoUrl?: string | null | undefined;
  display?: BrandLogoDisplay | undefined;
  className?: string | undefined;
  decorative?: boolean | undefined;
  priority?: boolean | undefined;
  surface?: "neutral" | "transparent" | undefined;
  sizes?: string | undefined;
};

type LogoShape = "wide" | "standard" | "square" | "tall";

export function BrandLogo({
  name,
  logoUrl,
  display = defaultDisplay,
  className = "",
  decorative = false,
  priority = false,
  surface = "neutral",
  sizes,
}: BrandLogoProps) {
  const normalizedUrl = logoUrl?.trim() || null;
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [shapeState, setShapeState] = useState<{ url: string | null; shape: LogoShape }>({
    url: null,
    shape: "standard",
  });
  const shape = shapeState.url === normalizedUrl ? shapeState.shape : "standard";
  const failed = normalizedUrl !== null && failedUrl === normalizedUrl;

  useEffect(() => {
    const image = imageRef.current;
    if (!normalizedUrl || !image?.complete) return;
    if (image.naturalWidth === 0) {
      setFailedUrl(normalizedUrl);
      return;
    }
    setShapeState({
      url: normalizedUrl,
      shape: logoShape(image.naturalWidth, image.naturalHeight),
    });
  }, [normalizedUrl]);

  const classify = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    setShapeState({
      url: normalizedUrl,
      shape: logoShape(image.naturalWidth, image.naturalHeight),
    });
  };

  return (
    <span
      className={`brand-logo-frame${className ? ` ${className}` : ""}`}
      data-align-x={display.alignX}
      data-align-y={display.alignY}
      data-padding={display.padding}
      data-scale={display.scale}
      data-shape={shape}
      data-surface={surface}
      data-logo-state={normalizedUrl && !failed ? "ready" : "fallback"}
    >
      <span className="brand-logo-frame__canvas">
        {normalizedUrl && !failed ? (
          <img
            ref={imageRef}
            className="brand-logo-frame__image"
            src={normalizedUrl}
            alt={decorative ? "" : name}
            width={320}
            height={160}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            decoding="async"
            draggable={false}
            onLoad={classify}
            onError={() => setFailedUrl(normalizedUrl)}
          />
        ) : (
          <span className="brand-logo-frame__fallback" aria-hidden={decorative || undefined}>
            {name}
          </span>
        )}
      </span>
    </span>
  );
}

function logoShape(width: number, height: number): LogoShape {
  const ratio = height > 0 ? width / height : 1;
  return ratio >= 2.4 ? "wide" : ratio <= 0.72 ? "tall" : ratio <= 1.2 ? "square" : "standard";
}
