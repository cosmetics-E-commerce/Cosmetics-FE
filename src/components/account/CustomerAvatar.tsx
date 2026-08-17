import { useState } from "react";
import { cn } from "@/lib/utils";
import { resolveAvatar, type AvatarIdentity } from "@/lib/avatar";

export type CustomerAvatarProps = AvatarIdentity & {
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  decorative?: boolean;
  previewUrl?: string | null;
  className?: string;
};

type ImageStatus = "loading" | "loaded" | "failed";

export function CustomerAvatar({
  size = "md",
  loading = false,
  decorative = false,
  previewUrl,
  className,
  ...identity
}: CustomerAvatarProps) {
  const resolved = resolveAvatar(identity);
  const imageUrl = previewUrl || resolved.imageUrl;
  const label = resolved.displayName
    ? `${resolved.displayName} profile picture`
    : "Customer profile picture";

  return (
    <span
      className={cn("customer-avatar", `customer-avatar--${size}`, className)}
      data-script={/\p{Script=Arabic}/u.test(resolved.initials) ? "arabic" : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
    >
      {loading ? (
        <span className="customer-avatar__skeleton" aria-hidden="true" />
      ) : imageUrl ? (
        <AvatarImage key={imageUrl} src={imageUrl} initials={resolved.initials} />
      ) : (
        <span className="customer-avatar__initials" aria-hidden="true">
          {resolved.initials}
        </span>
      )}
    </span>
  );
}

function AvatarImage({ src, initials }: { src: string; initials: string }) {
  const [status, setStatus] = useState<ImageStatus>("loading");

  return (
    <>
      {status !== "failed" ? (
        <img
          src={src}
          alt=""
          className="customer-avatar__image"
          data-loaded={status === "loaded" || undefined}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
        />
      ) : null}
      {status === "loading" ? (
        <span className="customer-avatar__skeleton" aria-hidden="true" />
      ) : null}
      {status === "failed" ? (
        <span className="customer-avatar__initials" aria-hidden="true">
          {initials}
        </span>
      ) : null}
    </>
  );
}
