import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, LockKeyhole, MessageSquareText, PackageCheck, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StatePanel } from "@/components/feedback/StatePanel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  apiErrorMessage,
  createProductReview,
  getReviewEligibility,
  listProductReviews,
  type ProductReviews as ProductReviewsData,
} from "@/lib/api";
import { useStore } from "@/lib/store";

export function ProductReviews({
  productId,
  initialData,
}: {
  productId: string;
  initialData?: ProductReviewsData;
}) {
  const { user, locale } = useStore();
  const client = useQueryClient();
  const ar = locale === "ar";
  const [rating, setRating] = useState(0);
  const reviews = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => listProductReviews(productId),
    initialData,
    staleTime: 60_000,
  });
  const eligibility = useQuery({
    queryKey: ["reviews", "eligibility", productId],
    queryFn: () => getReviewEligibility(productId),
    enabled: Boolean(user),
  });
  const create = useMutation({
    mutationFn: (body: { rating: number; title?: string; body?: string }) =>
      createProductReview(productId, body),
    onSuccess: () => {
      toast.success(ar ? "تم إرسال مراجعتك" : "Your review is awaiting approval");
      setRating(0);
      void client.invalidateQueries({ queryKey: ["reviews", productId] });
      void client.invalidateQueries({ queryKey: ["reviews", "eligibility", productId] });
      void client.invalidateQueries({ queryKey: ["account", "reviews"] });
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  const summary = reviews.data?.summary;

  return (
    <section className="review-studio" aria-labelledby="review-studio-title">
      <header className="review-studio__header">
        <div>
          <p className="review-studio__eyebrow">{ar ? "تجارب حقيقية" : "From delivered orders"}</p>
          <h2 id="review-studio-title">{ar ? "مراجعات العملاء" : "Customer reviews"}</h2>
        </div>
        <div className="review-studio__score" aria-label={`${summary?.average ?? 0} out of 5`}>
          <strong>{summary?.count ? summary.average.toFixed(1) : "0.0"}</strong>
          <div>
            <RatingStars value={summary?.average ?? 0} />
            <span>
              {summary?.count ?? 0} {ar ? "مراجعة معتمدة" : "approved reviews"}
            </span>
          </div>
        </div>
      </header>

      <div className="review-studio__grid">
        <div className="review-studio__compose">
          <ReviewEligibilityState
            user={Boolean(user)}
            loading={eligibility.isLoading}
            eligibility={eligibility.data}
            rating={rating}
            setRating={setRating}
            pending={create.isPending}
            ar={ar}
            onSubmit={(form) => create.mutate(form)}
          />
        </div>

        <div className="review-studio__feed">
          {reviews.isLoading ? (
            <div
              className="review-studio__loading"
              aria-label={ar ? "جار التحميل" : "Loading reviews"}
            >
              <span />
              <span />
            </div>
          ) : reviews.isError ? (
            <StatePanel
              kind="error"
              title={ar ? "تعذر تحميل المراجعات" : "Reviews couldn’t be loaded"}
              description={
                ar
                  ? "لم تستجب خدمة المراجعات. ما زال بإمكانك تصفح المنتج والشراء."
                  : "The review service did not respond. You can still browse and buy this product."
              }
              action={() => void reviews.refetch()}
              actionLabel={ar ? "إعادة المحاولة" : "Try again"}
            />
          ) : reviews.data?.items.length ? (
            reviews.data.items.map((review) => (
              <article key={review.id} className="review-entry">
                <header>
                  <RatingStars value={review.rating} />
                  <time dateTime={review.createdAt}>
                    {new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(review.createdAt))}
                  </time>
                </header>
                {review.title ? <h3>{review.title}</h3> : null}
                {review.body ? <p>{review.body}</p> : null}
                <footer>
                  <span>
                    {review.author.firstName} {review.author.lastInitial}.
                  </span>
                  {review.author.verifiedPurchase ? (
                    <span className="review-entry__verified">
                      <CheckCircle2 aria-hidden="true" />
                      {ar ? "شراء موثق" : "Verified purchase"}
                    </span>
                  ) : null}
                </footer>
              </article>
            ))
          ) : (
            <div className="review-studio__empty">
              <MessageSquareText aria-hidden="true" />
              <h3>{ar ? "كن أول من يراجع" : "No approved reviews yet"}</h3>
              <p>
                {ar
                  ? "بعد استلام طلبك، يمكنك مشاركة تجربتك هنا."
                  : "Customers can write here after their order is delivered."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ReviewEligibilityState({
  user,
  loading,
  eligibility,
  rating,
  setRating,
  pending,
  ar,
  onSubmit,
}: {
  user: boolean;
  loading: boolean;
  eligibility: Awaited<ReturnType<typeof getReviewEligibility>> | undefined;
  rating: number;
  setRating: (value: number) => void;
  pending: boolean;
  ar: boolean;
  onSubmit: (body: { rating: number; title?: string; body?: string }) => void;
}) {
  if (!user) {
    return (
      <ReviewGate icon={<LockKeyhole />} title={ar ? "سجّل الدخول للمراجعة" : "Sign in to review"}>
        <p>
          {ar
            ? "المراجعات متاحة للعملاء بعد استلام المنتج."
            : "Reviews unlock after your order containing this product is delivered."}
        </p>
        <Button asChild variant="solid" size="pill">
          <Link to="/sign-in" search={{ returnTo: undefined }}>
            {ar ? "تسجيل الدخول" : "Sign in"}
          </Link>
        </Button>
      </ReviewGate>
    );
  }
  if (loading) {
    return (
      <div className="review-studio__eligibility-loading">
        <span />
        <span />
        <span />
      </div>
    );
  }
  if (eligibility?.reason === "ALREADY_REVIEWED") {
    const status = eligibility.existingReview?.status ?? "PENDING";
    return (
      <ReviewGate
        icon={<CheckCircle2 />}
        title={ar ? "لقد راجعت هذا المنتج" : "You already reviewed this product"}
      >
        <p>
          {status === "APPROVED"
            ? ar
              ? "مراجعتك منشورة الآن."
              : "Your review is live."
            : status === "REJECTED"
              ? ar
                ? "يمكنك تعديل مراجعتك وإرسالها مرة أخرى."
                : "You can edit and resubmit your review."
              : ar
                ? "مراجعتك قيد التحقق."
                : "Your review is awaiting moderation."}
        </p>
        <Button asChild variant="line" size="pill">
          <Link to="/account" search={{ section: "reviews" }}>
            {ar ? "عرض مراجعاتي" : "Open my reviews"}
          </Link>
        </Button>
      </ReviewGate>
    );
  }
  if (eligibility?.reason !== "ELIGIBLE") {
    return (
      <ReviewGate icon={<PackageCheck />} title={ar ? "بعد التوصيل" : "Available after delivery"}>
        <p>
          {ar
            ? "اطلب هذا المنتج واستلمه أولاً. هذا يحافظ على المراجعات حقيقية ومفيدة."
            : "Order and receive this product first. That keeps every review grounded in a real purchase."}
        </p>
        <span className="review-gate__rule">
          {ar ? "مطلوب طلب تم توصيله" : "Delivered order required"}
        </span>
      </ReviewGate>
    );
  }
  return (
    <form
      className="review-composer"
      onSubmit={(event) => {
        event.preventDefault();
        const values = new FormData(event.currentTarget);
        const title = String(values.get("title") ?? "").trim();
        const body = String(values.get("body") ?? "").trim();
        if (!rating) {
          toast.error(ar ? "اختر تقييماً" : "Choose a star rating");
          return;
        }
        onSubmit({ rating, ...(title ? { title } : {}), body });
      }}
    >
      <div className="review-composer__purchase">
        <PackageCheck aria-hidden="true" />
        <span>
          {ar ? "عملية شراء موثقة" : "Verified purchase"}
          <small>{eligibility.purchase?.orderNumber}</small>
        </span>
      </div>
      <fieldset className="review-composer__rating">
        <legend>{ar ? "تقييمك" : "Your rating"}</legend>
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => setRating(value)}
              aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
              aria-pressed={rating === value}
            >
              <Star className={value <= rating ? "is-filled" : undefined} />
            </button>
          ))}
        </div>
      </fieldset>
      <label>
        <span>{ar ? "عنوان قصير" : "Short title"}</span>
        <Input name="title" maxLength={200} placeholder={ar ? "ما الذي برز؟" : "What stood out?"} />
      </label>
      <label>
        <span>{ar ? "تجربتك" : "Your experience"}</span>
        <Textarea
          name="body"
          required
          minLength={10}
          maxLength={5000}
          placeholder={
            ar ? "كيف استخدمته وما النتيجة؟" : "How did you use it and what did you notice?"
          }
        />
      </label>
      <Button type="submit" variant="solid" size="pill" loading={pending}>
        {ar ? "إرسال المراجعة" : "Submit review"}
      </Button>
      <p className="review-composer__note">
        {ar ? "تُنشر المراجعات بعد التحقق." : "Reviews are published after moderation."}
      </p>
    </form>
  );
}

function ReviewGate({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="review-gate">
      <span className="review-gate__icon">{icon}</span>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function RatingStars({ value }: { value: number }) {
  return (
    <span className="review-stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={star <= Math.round(value) ? "is-filled" : undefined} />
      ))}
    </span>
  );
}
