import { Link } from "@tanstack/react-router";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { images } from "@/lib/products";
import { ImageReveal, ParallaxMedia, Reveal } from "@/components/motion/Primitives";

export function AuthShell({
  label,
  title,
  intro,
  children,
  footer,
}: {
  label: string;
  title: string;
  intro: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="sf-auth-shell grid min-h-[80vh] lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-20 md:px-16">
        <Reveal stagger staggerMs={45} distance={22} className="w-full max-w-sm">
          <p className="label-xs text-gold">{label}</p>
          <h1 className="display mt-5 text-[clamp(2.1rem,3.6vw,3rem)]">{title}</h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{intro}</p>
          <div className="mt-10">{children}</div>
          <div className="mt-8 text-sm text-muted-foreground">{footer}</div>
          <Link to="/" className="nav-link label-xs mt-10 inline-block text-taupe">
            Return to BIOREZA
          </Link>
        </Reveal>
      </div>
      <div className="relative hidden lg:block">
        <ImageReveal direction="right" className="absolute inset-0">
          <ParallaxMedia className="size-full" strength={24}>
            <img
              src={images.storyLarge}
              alt=""
              aria-hidden="true"
              className="size-full object-cover"
            />
          </ParallaxMedia>
        </ImageReveal>
      </div>
    </div>
  );
}

export function AuthField({
  id,
  label,
  type = "text",
  autoComplete,
  hint,
  error,
  required = true,
  ...inputProps
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "type" | "autoComplete">) {
  const [visible, setVisible] = useState(false);
  const password = type === "password";
  return (
    <div>
      <label htmlFor={id} className="label-xs text-taupe">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          name={id}
          type={password && visible ? "text" : type}
          required={required}
          autoComplete={autoComplete}
          inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className="h-12 w-full border border-input bg-warm-white px-4 pe-12 text-base outline-none transition-[border-color,box-shadow] duration-150 hover:border-taupe focus:border-gold focus:shadow-[0_0_0_1px_var(--color-gold-soft)] aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-55 md:text-sm"
          {...inputProps}
        />
        {password && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute inset-y-0 end-0 grid w-12 place-items-center text-taupe transition-colors hover:text-gold"
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
