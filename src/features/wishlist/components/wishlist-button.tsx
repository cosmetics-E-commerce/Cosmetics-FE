'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button, type ButtonProps } from '@/components/ui/button';
import {
  addWishlistItem,
  getWishlist,
  removeWishlistItem,
  wishlistQueryKey,
} from '@/features/wishlist/api/wishlist.api';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils/cn';

type WishlistButtonProps = Omit<ButtonProps, 'children'> & {
  productId: string;
  compact?: boolean;
};

export function WishlistButton({ productId, compact = false, className, ...props }: WishlistButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);

  const wishlistQuery = useQuery({
    queryKey: wishlistQueryKey,
    queryFn: getWishlist,
    enabled: Boolean(user),
    staleTime: 30_000,
  });

  const saved = Boolean(wishlistQuery.data?.items.some((item) => item.productId === productId));
  const mutation = useMutation({
    mutationFn: () => saved ? removeWishlistItem(productId) : addWishlistItem({ productId }),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: wishlistQueryKey }),
  });

  const handleClick = () => {
    if (!hydrated) return;
    if (!user) {
      router.push('/auth/login');
      return;
    }
    mutation.mutate();
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      title={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn(
        compact ? 'h-9 w-9 rounded-full px-0' : undefined,
        saved ? 'border-sage bg-sage-soft text-sage-dark' : undefined,
        className,
      )}
      disabled={!hydrated || mutation.isPending || props.disabled}
      onClick={handleClick}
      {...props}
    >
      {mutation.isPending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Heart size={16} className={saved ? 'fill-sage text-sage' : undefined} />
      )}
      {compact ? null : <span>{saved ? 'Saved' : 'Wishlist'}</span>}
    </Button>
  );
}
