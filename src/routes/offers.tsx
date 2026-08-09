import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, Sparkles } from "lucide-react";
import { Reveal } from "@/components/brand/Reveal";
import { Button } from "@/components/ui/button";
import { listOffers } from "@/lib/api";

export const Route = createFileRoute("/offers")({
  head: () => ({ meta: [{ title: "Offers — BIOREZA" }] }),
  component: OffersPage,
});

function OffersPage() {
  const query = useQuery({ queryKey: ["offers"], queryFn: listOffers, refetchInterval: 60_000 });
  return (
    <main className="sf-offers-page mx-auto min-h-[70vh] max-w-[1400px] px-5 py-14 md:px-10 lg:py-20">
      <Reveal stagger staggerMs={45} distance={22}>
        <p className="label-xs text-gold">Current rituals</p>
        <h1 className="display mt-5 text-[clamp(2.5rem,5vw,4.8rem)]">
          Offers, thoughtfully applied.
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Every eligible saving is calculated automatically and confirmed again securely at
          checkout.
        </p>
      </Reveal>
      {query.isLoading ? (
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="h-64 animate-pulse bg-stone" />
          <div className="h-64 animate-pulse bg-stone" />
        </div>
      ) : query.data?.length ? (
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {query.data.map((offer, index) => (
            <Reveal key={offer.id} delay={index * 70}>
              <article
                className={`offer-card h-full border p-7 md:p-9 ${offer.featured ? "border-gold bg-ivory" : "border-border"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="label-xs text-gold">
                    {offer.badgeText ?? offer.type.replaceAll("_", " ")}
                  </span>
                  <Sparkles className="size-5 text-gold" />
                </div>
                <h2 className="mt-8 font-serif text-3xl">{offer.title}</h2>
                {offer.description && (
                  <p className="mt-4 leading-relaxed text-muted-foreground">{offer.description}</p>
                )}
                {offer.endsAt && (
                  <p className="mt-7 flex items-center gap-2 text-sm text-taupe">
                    <Clock className="size-4" />
                    Ends{" "}
                    {new Intl.DateTimeFormat("en-EG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Africa/Cairo",
                    }).format(new Date(offer.endsAt))}
                  </p>
                )}
                <Button asChild variant="line" size="pill" className="mt-8">
                  <Link to="/shop">Explore eligible products</Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-14 border border-border p-14 text-center">
          <h2 className="font-serif text-3xl">No active offers right now</h2>
          <p className="mt-3 text-muted-foreground">
            The collection is still available at its regular pricing.
          </p>
          <Button asChild variant="line" size="pill" className="mt-7">
            <Link to="/shop">Explore the collection</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
