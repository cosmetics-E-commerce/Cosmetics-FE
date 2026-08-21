import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Globe2, Heart, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  addWishlistToCollection,
  apiErrorMessage,
  getWishlist,
  removeWishlistFromCollection,
  type WishlistResponse,
} from "@/lib/api";
import { useStore } from "@/lib/store";

export function WishlistPicker({
  productId,
  slug,
  wished,
  addLabel,
  removeLabel,
}: {
  productId: string;
  slug: string;
  wished: boolean;
  addLabel: string;
  removeLabel: string;
}) {
  const { user, locale, toggleWish } = useStore();
  const client = useQueryClient();
  const [open, setOpen] = useState(false);
  const ar = locale === "ar";
  const wishlist = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: Boolean(user),
  });
  const mutation = useMutation({
    mutationFn: (task: () => Promise<WishlistResponse>) => task(),
    onSuccess: (next) => client.setQueryData(["wishlist"], next),
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  return (
    <>
      <button
        type="button"
        onClick={() => (user ? setOpen(true) : void toggleWish(productId, slug))}
        className="product-reference-wish"
        aria-pressed={wished}
        aria-label={wished ? removeLabel : addLabel}
      >
        <Heart className={wished ? "pop" : ""} />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="wishlist-picker-dialog" closeLabel={ar ? "إغلاق" : "Close"}>
          <DialogHeader>
            <DialogTitle>{ar ? "احفظيه في قائمة" : "Save to collections"}</DialogTitle>
            <DialogDescription>
              {ar
                ? "يمكن حفظ المنتج في أكثر من قائمة."
                : "A product can live in more than one collection."}
            </DialogDescription>
          </DialogHeader>
          <div className="wishlist-picker-dialog__lists">
            {wishlist.data?.collections.map((collection) => {
              const saved = collection.items.some((item) => item.productId === productId);
              return (
                <button
                  type="button"
                  key={collection.id}
                  aria-pressed={saved}
                  disabled={mutation.isPending}
                  onClick={() =>
                    mutation.mutate(() =>
                      saved
                        ? removeWishlistFromCollection(collection.id, productId)
                        : addWishlistToCollection(collection.id, productId),
                    )
                  }
                >
                  <span>
                    {collection.isPrivate ? <LockKeyhole /> : <Globe2 />}
                    <strong>{collection.name}</strong>
                    <small>
                      {collection.totalItems}{" "}
                      {ar ? "منتج" : collection.totalItems === 1 ? "item" : "items"}
                    </small>
                  </span>
                  <span className="wishlist-picker-dialog__check">{saved ? <Check /> : null}</span>
                </button>
              );
            })}
          </div>
          <Link
            to="/account"
            search={{ section: "wishlist" }}
            className="wishlist-picker-dialog__manage"
            onClick={() => setOpen(false)}
          >
            {ar ? "إدارة القوائم" : "Manage collections"}
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
}
