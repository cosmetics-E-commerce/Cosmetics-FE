import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type PolishedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

export const PolishedImage = forwardRef<HTMLImageElement, PolishedImageProps>(
  ({ className, wrapperClassName, alt, onLoad, onError, src, ...props }, ref) => {
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const assignRef = useCallback(
      (node: HTMLImageElement | null) => {
        imageRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useEffect(() => {
      const image = imageRef.current;
      if (!image?.complete) return;
      setLoaded(true);
      setFailed(image.naturalWidth === 0);
    }, [src]);

    return (
      <span
        className={cn("image-reveal-shell", wrapperClassName)}
        data-loaded={loaded}
        data-failed={failed}
      >
        <img
          ref={assignRef}
          src={src}
          alt={alt}
          className={cn("image-reveal-media", className)}
          onLoad={(event) => {
            setLoaded(true);
            onLoad?.(event);
          }}
          onError={(event) => {
            setLoaded(true);
            setFailed(true);
            onError?.(event);
          }}
          {...props}
        />
      </span>
    );
  },
);
PolishedImage.displayName = "PolishedImage";
