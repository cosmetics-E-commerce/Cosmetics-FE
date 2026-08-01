import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

export function LuxuryCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-sage/15 bg-surface shadow-[0_18px_50px_rgba(94,83,64,.08)]',
        className,
      )}
      {...props}
    />
  );
}
