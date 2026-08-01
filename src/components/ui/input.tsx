import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const normalizedProps = Object.prototype.hasOwnProperty.call(props, 'value') && props.value === undefined
    ? { ...props, value: '' }
    : props;

  return (
    <input
      className={cn(
        'h-12 w-full rounded-md border border-sage/20 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-sage/60 focus:bg-white',
        className,
      )}
      {...normalizedProps}
    />
  );
}
