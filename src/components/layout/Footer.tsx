import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/bioreza-logo.png.asset.json";

const columns = [
  {
    title: "Shop",
    links: ["Skincare", "Makeup", "Haircare", "Fragrance", "New Arrivals", "Gift Sets"],
  },
  {
    title: "Customer Care",
    links: [
      "Contact Us",
      "Shipping & Delivery",
      "Returns & Exchanges",
      "Order Tracking",
      "FAQ",
      "Beauty Advisor",
    ],
  },
  {
    title: "About BIOREZA",
    links: ["Our Story", "Science & Ingredients", "Sustainability", "Journal", "Stores", "Careers"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ivory">
      <div className="mx-auto max-w-[1560px] px-5 py-20 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="" aria-hidden="true" className="h-12 w-auto" />
              <span className="font-serif text-xl tracking-[0.3em]">BIOREZA</span>
            </div>
            <p className="label-xs mt-4 text-gold">Science. Beauty. Confidence.</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Advanced skincare and curated beauty, developed with dermatological rigour and
              finished with quiet European elegance.
            </p>
            <div className="mt-8">
              <h3 className="label-xs text-taupe">Newsletter</h3>
              <form
                className="mt-4 flex items-center gap-3 border-b border-gold/40 pb-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-taupe/70"
                />
                <button type="submit" className="label-xs shrink-0 text-gold hover:text-foreground">
                  Join
                </button>
              </form>
            </div>
            <div className="mt-8 flex items-center gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={["Instagram", "Facebook", "YouTube"][i]}
                  className="grid size-11 place-items-center border border-border text-taupe transition-colors duration-500 hover:border-gold hover:text-gold"
                >
                  <Icon strokeWidth={1} className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label-xs text-taupe">{col.title}</h3>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      to={col.title === "Shop" ? "/shop" : "/journal"}
                      className="text-sm text-foreground/80 transition-colors duration-500 hover:text-gold"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-gold my-12" />

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
            <p>Client care — Egypt</p>
            <p>hello@bioreza.com</p>
            <p>Mon–Sat, 9:00–19:00 Cairo</p>
          </div>
          <ul className="flex flex-wrap items-center gap-3">
            {["INSTAPAY", "VODAFONE CASH", "CASH ON DELIVERY"].map((p) => (
              <li
                key={p}
                className="label-xs border border-border px-3 py-1.5 text-[0.55rem] text-taupe"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1560px] flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>© {new Date().getFullYear()} BIOREZA Cosmetics. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            {["Privacy Policy", "Terms & Conditions", "Shipping & Returns", "Cookies"].map((l) => (
              <li key={l}>
                <a href="#" className="transition-colors hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
