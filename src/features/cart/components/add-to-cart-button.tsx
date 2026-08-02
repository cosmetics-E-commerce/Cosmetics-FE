'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Loader2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { addCartItem, cartQueryKey } from '@/features/cart/api/cart.api';
import type { ApiErrorBody } from '@/lib/http/client';
import { cn } from '@/lib/utils/cn';

type AddToCartButtonProps = Omit<ButtonProps, 'children'> & {
  variantId?: string;
  label?: string;
  soldOutLabel?: string;
  compact?: boolean;
};

export function AddToCartButton({
  variantId,
  label = 'Add to cart',
  soldOutLabel = 'Sold out',
  compact = false,
  className,
  disabled,
  ...props
}: AddToCartButtonProps) {
  const queryClient = useQueryClient();
  const [added, setAdded] = useState(false);
  const mutation = useMutation({
    mutationFn: () => {
      if (!variantId) throw new Error('This product is not available.');
      return addCartItem({ variantId, quantity: 1 });
    },
    onSuccess: async () => {
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1400);
      await queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const unavailable = !variantId;
  const error = mutation.error as ApiErrorBody | Error | null;
  const errorMessage = error ? ('message' in error ? error.message : 'Could not add item.') : null;

  return (
    <div className={compact ? 'relative' : 'space-y-2'}>
      <Button
        type="button"
        size={compact ? 'sm' : props.size}
        className={cn(compact ? 'h-9 w-9 px-0' : undefined, className)}
        disabled={disabled || unavailable || mutation.isPending}
        aria-label={unavailable ? soldOutLabel : label}
        title={unavailable ? soldOutLabel : label}
        onClick={() => mutation.mutate()}
        {...props}
      >
        {mutation.isPending ? <Loader2 size={16} className="animate-spin" /> : added ? <Check size={16} /> : <ShoppingCart size={16} />}
        {compact ? null : <span>{unavailable ? soldOutLabel : added ? 'Added' : label}</span>}
      </Button>
      {!compact && errorMessage ? <p className="text-xs font-medium text-red-700">{errorMessage}</p> : null}
    </div>
  );
}
