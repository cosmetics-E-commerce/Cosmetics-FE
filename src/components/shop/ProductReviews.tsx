import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Stars } from "@/components/brand/Stars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiErrorMessage, createProductReview, listProductReviews } from "@/lib/api";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/motion/Primitives";

export function ProductReviews({ productId }: { productId: string }) {
  const { user, locale } = useStore();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const reviews = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => listProductReviews(productId),
  });
  const create = useMutation({
    mutationFn: (body: { rating: number; title?: string; body?: string }) =>
      createProductReview(productId, body),
    onSuccess: () => {
      toast.success(
        locale === "ar" ? "أُرسلت المراجعة للإشراف" : "Review submitted for moderation",
      );
      void queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
    onError: (error) => toast.error(apiErrorMessage(error)),
  });
  const ar = locale === "ar";
  const summary = reviews.data?.summary;
  return (
    <Reveal
      as="section"
      stagger
      className="mx-auto max-w-[1200px] border-t border-border px-5 py-20 md:px-10"
    >
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="label-xs text-gold">{ar ? "مراجعات موثقة" : "Verified reviews"}</p>
          <h2 className="display mt-5 text-4xl">
            {summary?.count
              ? `${summary.average.toFixed(1)} / 5`
              : ar
                ? "لا توجد مراجعات بعد"
                : "No reviews yet"}
          </h2>
          {summary?.count ? (
            <p className="mt-3 text-sm text-muted-foreground">
              {summary.count} {ar ? "مراجعة معتمدة" : "approved reviews"}
            </p>
          ) : null}
          <div className="mt-10">
            {!user ? (
              <p className="text-sm text-muted-foreground">
                <Link
                  to="/sign-in"
                  search={{ returnTo: undefined }}
                  className="text-gold underline"
                >
                  {ar ? "سجلي الدخول" : "Sign in"}
                </Link>{" "}
                {ar
                  ? "لكتابة مراجعة بعد استلام طلبك."
                  : "to review a product after your order is delivered."}
              </p>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const values = new FormData(event.currentTarget);
                  const title = String(values.get("title") ?? "");
                  const body = String(values.get("body") ?? "");
                  create.mutate({
                    rating,
                    ...(title ? { title } : {}),
                    ...(body ? { body } : {}),
                  });
                }}
              >
                <fieldset>
                  <legend className="label-xs mb-2 text-taupe">{ar ? "التقييم" : "Rating"}</legend>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        type="button"
                        key={value}
                        onClick={() => setRating(value)}
                        aria-label={`${value} stars`}
                        className={`grid size-10 place-items-center border ${rating === value ? "border-gold bg-gold text-white" : "border-border"}`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <Input name="title" placeholder={ar ? "عنوان مختصر" : "Short title"} />
                <Textarea
                  name="body"
                  minLength={10}
                  placeholder={ar ? "شاركي تجربتك" : "Share your experience"}
                />
                <Button type="submit" variant="solid" size="pill" disabled={create.isPending}>
                  {ar ? "إرسال" : "Submit review"}
                </Button>
              </form>
            )}
          </div>
        </div>
        <div className="space-y-8">
          {(reviews.data?.items ?? []).map((review) => (
            <article key={review.id} className="border-b border-border pb-8">
              <Stars value={review.rating} size={13} />
              {review.title ? <h3 className="mt-4 font-serif text-2xl">{review.title}</h3> : null}
              {review.body ? (
                <p className="mt-3 leading-relaxed text-muted-foreground">{review.body}</p>
              ) : null}
              <p className="label-xs mt-5 text-taupe">
                {review.author.firstName} {review.author.lastInitial}. ·{" "}
                {review.author.verifiedPurchase ? (ar ? "شراء موثق" : "Verified purchase") : ""}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
