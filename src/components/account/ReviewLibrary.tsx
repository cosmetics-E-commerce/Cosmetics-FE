import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Clock3, MessageSquareText, Pencil, Star, XCircle } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  apiErrorMessage,
  updateMyReview,
  type CustomerReviewLibraryResponse,
  type ReviewResponse,
} from "@/lib/api";
import type { Locale } from "@/lib/catalog";

export function ReviewLibrary({
  data,
  locale,
}: {
  data: CustomerReviewLibraryResponse;
  locale: Locale;
}) {
  const ar = locale === "ar";
  const client = useQueryClient();
  const [editing, setEditing] = useState<ReviewResponse | null>(null);
  const [rating, setRating] = useState(0);
  const update = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: { rating: number; title?: string; body: string };
    }) => updateMyReview(id, body),
    onSuccess: () => {
      toast.success(ar ? "تم إرسال التعديل للمراجعة" : "Updated review sent for moderation");
      setEditing(null);
      void client.invalidateQueries({ queryKey: ["account", "reviews"] });
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  return (
    <div className="review-library">
      <header className="review-library__masthead">
        <div>
          <p>{ar ? "سجل تجاربك" : "Your product record"}</p>
          <h2>{ar ? "مراجعاتي" : "My reviews"}</h2>
          <span>
            {ar
              ? "راجعي ما كتبته وتابعي حالة النشر."
              : "See what you submitted, its publication state, and edit when needed."}
          </span>
        </div>
        <strong>{String(data.total).padStart(2, "0")}</strong>
      </header>
      {data.items.length ? (
        <ol className="review-library__list">
          {data.items.map((review, index) => {
            const status = reviewStatus(review.status, ar);
            const StatusIcon = status.icon;
            return (
              <li key={review.id} className="review-record">
                <span className="review-record__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="review-record__product">
                  <small>{ar ? "المنتج" : "Product"}</small>
                  {review.product ? (
                    <Link to="/product/$slug" params={{ slug: review.product.slug }}>
                      {ar ? review.product.nameAr : review.product.nameEn}
                    </Link>
                  ) : (
                    <span>{ar ? "منتج" : "Product"}</span>
                  )}
                </div>
                <div className="review-record__content">
                  <span className="review-record__stars" aria-label={`${review.rating} out of 5`}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        className={value <= review.rating ? "is-filled" : undefined}
                      />
                    ))}
                  </span>
                  {review.title ? <h3>{review.title}</h3> : null}
                  {review.body ? <p>{review.body}</p> : null}
                  <time dateTime={review.updatedAt}>
                    {new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG", {
                      dateStyle: "medium",
                    }).format(new Date(review.updatedAt))}
                  </time>
                </div>
                <div className="review-record__state" data-status={review.status.toLowerCase()}>
                  <span>
                    <StatusIcon aria-hidden="true" />
                    {status.label}
                  </span>
                  <p>{status.copy}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(review);
                      setRating(review.rating);
                    }}
                  >
                    <Pencil aria-hidden="true" />
                    {ar ? "تعديل" : "Edit"}
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="review-library__empty">
          <MessageSquareText aria-hidden="true" />
          <h3>{ar ? "لا توجد مراجعات بعد" : "Your review record is empty"}</h3>
          <p>
            {ar
              ? "بعد استلام طلب، راجعي المنتج من صفحته."
              : "After a delivery, open the product page to write a verified review."}
          </p>
          <Button asChild variant="line" size="pill">
            <Link to="/shop">{ar ? "تصفح المنتجات" : "Browse products"}</Link>
          </Button>
        </div>
      )}
      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="review-edit-dialog" closeLabel={ar ? "إغلاق" : "Close"}>
          <DialogHeader>
            <DialogTitle>{ar ? "تعديل المراجعة" : "Edit your review"}</DialogTitle>
            <DialogDescription>
              {ar
                ? "سيعود التعديل إلى فريق التحقق قبل النشر."
                : "An edited review returns to moderation before it is published."}
            </DialogDescription>
          </DialogHeader>
          {editing ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const values = new FormData(event.currentTarget);
                const title = String(values.get("title") ?? "").trim();
                update.mutate({
                  id: editing.id,
                  body: {
                    rating,
                    ...(title ? { title } : {}),
                    body: String(values.get("body") ?? "").trim(),
                  },
                });
              }}
            >
              <fieldset>
                <legend>{ar ? "التقييم" : "Rating"}</legend>
                <div>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      type="button"
                      key={value}
                      aria-pressed={rating === value}
                      onClick={() => setRating(value)}
                    >
                      <Star className={value <= rating ? "is-filled" : undefined} />
                    </button>
                  ))}
                </div>
              </fieldset>
              <label>
                <span>{ar ? "العنوان" : "Title"}</span>
                <Input name="title" defaultValue={editing.title ?? ""} maxLength={200} />
              </label>
              <label>
                <span>{ar ? "التعليق" : "Comment"}</span>
                <Textarea
                  name="body"
                  defaultValue={editing.body ?? ""}
                  required
                  minLength={10}
                  maxLength={5000}
                />
              </label>
              <div className="review-edit-dialog__actions">
                <DialogClose asChild>
                  <Button type="button" variant="line" size="pill">
                    {ar ? "إلغاء" : "Cancel"}
                  </Button>
                </DialogClose>
                <Button type="submit" variant="solid" size="pill" loading={update.isPending}>
                  {ar ? "حفظ وإرسال" : "Save and resubmit"}
                </Button>
              </div>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function reviewStatus(status: ReviewResponse["status"], ar: boolean) {
  if (status === "APPROVED")
    return {
      icon: CheckCircle2,
      label: ar ? "منشورة" : "Published",
      copy: ar ? "تظهر مراجعتك على صفحة المنتج." : "Visible on the product page.",
    };
  if (status === "REJECTED")
    return {
      icon: XCircle,
      label: ar ? "تحتاج تعديلاً" : "Needs changes",
      copy: ar ? "عدليها ثم أرسليها مرة أخرى." : "Edit and resubmit it for approval.",
    };
  return {
    icon: Clock3,
    label: ar ? "قيد التحقق" : "In moderation",
    copy: ar ? "سيراجعها الفريق قبل النشر." : "The team will review it before publication.",
  };
}
