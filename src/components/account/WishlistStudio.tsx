import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  Copy,
  FolderHeart,
  Globe2,
  LockKeyhole,
  Pencil,
  Plus,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PolishedImage } from "@/components/ui/polished-image";
import {
  addWishlistToCollection,
  apiErrorMessage,
  createWishlistCollection,
  deleteWishlistCollection,
  getWishlistShareToken,
  removeWishlistFromCollection,
  updateWishlistCollection,
  type WishlistResponse,
} from "@/lib/api";
import { mapProduct, type Locale } from "@/lib/catalog";
import { formatPrice } from "@/lib/products";

export function WishlistStudio({
  data,
  locale,
}: {
  data: WishlistResponse;
  locale: Locale;
}) {
  const client = useQueryClient();
  const ar = locale === "ar";
  const [selectedId, setSelectedId] = useState(data.collections[0]?.id ?? "");
  const [createOpen, setCreateOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyTargets, setCopyTargets] = useState<Record<string, string>>({});
  const selected = useMemo(
    () => data.collections.find((collection) => collection.id === selectedId) ?? data.collections[0],
    [data.collections, selectedId],
  );

  useEffect(() => {
    if (!selected && data.collections[0]) setSelectedId(data.collections[0].id);
  }, [data.collections, selected]);

  const commit = (next: WishlistResponse) => client.setQueryData(["wishlist"], next);
  const mutation = useMutation({
    mutationFn: (task: () => Promise<WishlistResponse>) => task(),
    onSuccess: commit,
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });

  if (!selected) return null;

  const share = async () => {
    if (selected.isPrivate) return;
    try {
      const { shareToken } = await getWishlistShareToken(selected.id);
      const url = `${window.location.origin}/wishlist/${shareToken}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      toast.success(ar ? "تم نسخ رابط القائمة" : "Public link copied");
    } catch (error) {
      toast.error(apiErrorMessage(error, locale));
    }
  };

  return (
    <div className="wishlist-studio">
      <header className="wishlist-studio__masthead">
        <div>
          <p>{ar ? "مجموعتك الشخصية" : "Your collection space"}</p>
          <h2>{ar ? "قوائم الرغبات" : "Wishlist collections"}</h2>
          <span>
            {ar
              ? "نظّمي المنتجات في قوائم خاصة أو شاركي قائمة عامة."
              : "Organize products by mood, routine, or next purchase. You decide what stays private."}
          </span>
        </div>
        <Button type="button" variant="solid" size="pill" onClick={() => setCreateOpen(true)}>
          <Plus aria-hidden="true" />
          {ar ? "قائمة جديدة" : "New collection"}
        </Button>
      </header>

      <div className="wishlist-studio__workspace">
        <aside className="wishlist-studio__rail" aria-label={ar ? "قوائم الرغبات" : "Wishlist collections"}>
          <div className="wishlist-studio__rail-label">
            <span>{ar ? "القوائم" : "Collections"}</span>
            <small>{data.collections.length}</small>
          </div>
          <nav>
            {data.collections.map((collection, index) => (
              <button
                type="button"
                key={collection.id}
                aria-current={collection.id === selected.id ? "page" : undefined}
                onClick={() => setSelectedId(collection.id)}
              >
                <span className="wishlist-studio__rail-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="wishlist-studio__rail-name">
                  <strong>{collection.name}</strong>
                  <small>
                    {collection.totalItems} {ar ? "منتج" : collection.totalItems === 1 ? "item" : "items"}
                  </small>
                </span>
                {collection.isPrivate ? <LockKeyhole aria-label="Private" /> : <Globe2 aria-label="Public" />}
              </button>
            ))}
          </nav>
        </aside>

        <section className="wishlist-board" aria-labelledby="wishlist-board-title">
          <header className="wishlist-board__header">
            <div>
              <span className="wishlist-board__privacy">
                {selected.isPrivate ? <LockKeyhole /> : <Globe2 />}
                {selected.isPrivate ? (ar ? "خاصة" : "Private") : ar ? "عامة" : "Public"}
              </span>
              <h3 id="wishlist-board-title">{selected.name}</h3>
              <p>
                {selected.isPrivate
                  ? ar ? "هذه القائمة لا تظهر لأي شخص آخر." : "Only you can open this collection."
                  : ar ? "أي شخص لديه الرابط يمكنه مشاهدة هذه القائمة." : "Anyone with the link can view this collection."}
              </p>
            </div>
            <div className="wishlist-board__actions">
              <button type="button" onClick={() => setRenameOpen(true)}>
                <Pencil aria-hidden="true" />
                {ar ? "تعديل الاسم" : "Rename"}
              </button>
              <button
                type="button"
                onClick={() =>
                  mutation.mutate(() =>
                    updateWishlistCollection(selected.id, { isPrivate: !selected.isPrivate }),
                  )
                }
              >
                {selected.isPrivate ? <Globe2 aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
                {selected.isPrivate ? (ar ? "اجعلها عامة" : "Make public") : ar ? "اجعلها خاصة" : "Make private"}
              </button>
              <button type="button" disabled={selected.isPrivate} onClick={() => void share()}>
                {copied ? <Check aria-hidden="true" /> : <Share2 aria-hidden="true" />}
                {copied ? (ar ? "تم النسخ" : "Copied") : ar ? "مشاركة" : "Share"}
              </button>
              {!selected.isDefault ? (
                <button type="button" className="is-danger" onClick={() => setDeleteOpen(true)}>
                  <Trash2 aria-hidden="true" />
                  {ar ? "حذف" : "Delete"}
                </button>
              ) : null}
            </div>
          </header>

          {selected.items.length ? (
            <ol className="wishlist-board__items">
              {selected.items.map((item, index) => {
                const product = mapProduct(item.product, locale);
                const otherCollections = data.collections.filter(
                  (collection) => collection.id !== selected.id &&
                    !collection.items.some((entry) => entry.productId === item.productId),
                );
                return (
                  <li key={item.id} className="wishlist-piece">
                    <span className="wishlist-piece__number">{String(index + 1).padStart(2, "0")}</span>
                    <Link to="/product/$slug" params={{ slug: product.slug }} className="wishlist-piece__image">
                      <PolishedImage src={product.image} alt={product.name} className="size-full object-cover" />
                    </Link>
                    <div className="wishlist-piece__body">
                      <p>{product.type}</p>
                      <Link to="/product/$slug" params={{ slug: product.slug }}>
                        <h4>{product.name}</h4>
                      </Link>
                      <strong>{formatPrice(product.price)}</strong>
                      <div className="wishlist-piece__organize">
                        {otherCollections.length ? (
                          <>
                            <select
                              value={copyTargets[item.id] ?? otherCollections[0]?.id ?? ""}
                              onChange={(event) =>
                                setCopyTargets((current) => ({ ...current, [item.id]: event.target.value }))
                              }
                              aria-label={ar ? "اختر قائمة" : "Choose another collection"}
                            >
                              {otherCollections.map((collection) => (
                                <option key={collection.id} value={collection.id}>{collection.name}</option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => {
                                const target = copyTargets[item.id] ?? otherCollections[0]?.id;
                                if (target) mutation.mutate(() => addWishlistToCollection(target, item.productId));
                              }}
                            >
                              <Copy aria-hidden="true" />
                              {ar ? "نسخ" : "Copy"}
                            </button>
                          </>
                        ) : (
                          <span>{ar ? "محفوظ في كل القوائم" : "Saved in every collection"}</span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="wishlist-piece__remove"
                      aria-label={ar ? "إزالة من القائمة" : "Remove from collection"}
                      onClick={() =>
                        mutation.mutate(() => removeWishlistFromCollection(selected.id, item.productId))
                      }
                    >
                      <X aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="wishlist-board__empty">
              <FolderHeart aria-hidden="true" />
              <span>{selected.isDefault ? "01" : String(data.collections.indexOf(selected) + 1).padStart(2, "0")}</span>
              <h4>{ar ? "هذه القائمة جاهزة لاختياراتك" : "This collection is ready for your picks"}</h4>
              <p>
                {ar
                  ? "احفظي منتجاً بالقلب، ثم انسخيه إلى القائمة المناسبة."
                  : "Save a product with the heart, then organize it into the collection that fits."}
              </p>
              <Button asChild variant="line" size="pill"><Link to="/shop">{ar ? "تصفح المنتجات" : "Browse products"}</Link></Button>
            </div>
          )}
        </section>
      </div>

      <CollectionDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title={ar ? "قائمة جديدة" : "Create a collection"}
        description={ar ? "اختاري اسماً وإعداد الخصوصية." : "Give it a clear name and choose who can see it."}
        initialName=""
        ar={ar}
        pending={mutation.isPending}
        onSubmit={(name, isPrivate) =>
          mutation.mutate(() => createWishlistCollection({ name, isPrivate }), {
            onSuccess: (next) => {
              setSelectedId(next.collections.find((collection) => collection.name === name)?.id ?? selected.id);
              setCreateOpen(false);
            },
          })
        }
      />
      <CollectionDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        title={ar ? "تعديل اسم القائمة" : "Rename collection"}
        description={ar ? "استخدمي اسماً يسهل تذكره." : "Use a name you will recognize at a glance."}
        initialName={selected.name}
        initialPrivate={selected.isPrivate}
        hidePrivacy
        ar={ar}
        pending={mutation.isPending}
        onSubmit={(name) =>
          mutation.mutate(() => updateWishlistCollection(selected.id, { name }), {
            onSuccess: () => setRenameOpen(false),
          })
        }
      />
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="wishlist-dialog">
          <DialogHeader>
            <DialogTitle>{ar ? "حذف هذه القائمة؟" : `Delete ${selected.name}?`}</DialogTitle>
            <DialogDescription>
              {ar ? "ستُزال القائمة فقط. لن يؤثر ذلك على طلباتك." : "The collection and its saved entries will be removed. Your orders are not affected."}
            </DialogDescription>
          </DialogHeader>
          <div className="wishlist-dialog__actions">
            <DialogClose asChild><Button variant="line" size="pill">{ar ? "إلغاء" : "Cancel"}</Button></DialogClose>
            <Button
              variant="solid"
              size="pill"
              loading={mutation.isPending}
              onClick={() =>
                mutation.mutate(() => deleteWishlistCollection(selected.id), {
                  onSuccess: (next) => {
                    setSelectedId(next.collections[0]?.id ?? "");
                    setDeleteOpen(false);
                  },
                })
              }
            >
              {ar ? "حذف القائمة" : "Delete collection"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CollectionDialog({
  open,
  onOpenChange,
  title,
  description,
  initialName,
  initialPrivate = true,
  hidePrivacy = false,
  ar,
  pending,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  initialName: string;
  initialPrivate?: boolean;
  hidePrivacy?: boolean;
  ar: boolean;
  pending: boolean;
  onSubmit: (name: string, isPrivate: boolean) => void;
}) {
  const [isPrivate, setIsPrivate] = useState(initialPrivate);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="wishlist-dialog">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = String(new FormData(event.currentTarget).get("name") ?? "").trim();
            if (name) onSubmit(name, isPrivate);
          }}
        >
          <label><span>{ar ? "الاسم" : "Name"}</span><Input name="name" required maxLength={80} defaultValue={initialName} autoFocus /></label>
          {!hidePrivacy ? (
            <fieldset>
              <legend>{ar ? "الخصوصية" : "Privacy"}</legend>
              <button type="button" aria-pressed={isPrivate} onClick={() => setIsPrivate(true)}><LockKeyhole />{ar ? "خاصة" : "Private"}</button>
              <button type="button" aria-pressed={!isPrivate} onClick={() => setIsPrivate(false)}><Globe2 />{ar ? "عامة" : "Public"}</button>
            </fieldset>
          ) : null}
          <div className="wishlist-dialog__actions">
            <DialogClose asChild><Button type="button" variant="line" size="pill">{ar ? "إلغاء" : "Cancel"}</Button></DialogClose>
            <Button type="submit" variant="solid" size="pill" loading={pending}>{ar ? "حفظ" : "Save"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
