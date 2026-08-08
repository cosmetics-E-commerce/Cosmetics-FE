import { forwardRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type PolishedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

export const PolishedImage = forwardRef<HTMLImageElement, PolishedImageProps>(
  ({ className, wrapperClassName, alt, onLoad, onError, ...props }, ref) => {
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);

    return (
      <span
        className={cn("image-reveal-shell", wrapperClassName)}
        data-loaded={loaded}
        data-failed={failed}
      >
        <img
          ref={ref}
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
