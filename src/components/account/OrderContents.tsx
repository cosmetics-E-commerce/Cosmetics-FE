import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOrderDetails } from "@/lib/api";

export function OrderContents({
  orderId,
  orderNumber,
  locale,
}: {
  orderId: string;
  orderNumber: string;
  locale: "ar" | "en";
}) {
  const ar = locale === "ar";
  const details = useQuery({
    queryKey: ["account", "orders", orderId, "details"],
    queryFn: () => getOrderDetails(orderId),
    staleTime: 60_000,
  });
  const money = (amount: number) =>
    new Intl.NumberFormat(ar ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
    }).format(amount / 100);

  return (
    <section
      className="account-order-contents"
      aria-label={`${ar ? "محتويات الطلب" : "Contents of order"} ${orderNumber}`}
      aria-busy={details.isLoading || undefined}
    >
      <h4>{ar ? "محتويات الطلب" : "Order contents"}</h4>
      {details.isLoading ? (
        <p role="status">{ar ? "جارٍ تحميل المنتجات…" : "Loading purchased items…"}</p>
      ) : details.isError ? (
        <div className="account-order-contents__error">
          <p role="alert">
            {ar ? "تعذر تحميل محتويات الطلب." : "Order contents couldn't be loaded."}
          </p>
          <Button variant="quiet" size="sm" onClick={() => void details.refetch()}>
            {ar ? "حاولي مرة أخرى" : "Try again"}
          </Button>
        </div>
      ) : details.data ? (
        <>
          {details.data.items.length ? (
            <ul className="account-order-contents__items">
              {details.data.items.map((item) => (
                <li key={item.id}>
                  <OrderItemImage src={item.imageReference} />
                  <div className="account-order-contents__product">
                    <strong>{item.productName}</strong>
                    {item.variantName && <span>{item.variantName}</span>}
                    {item.variantOptions.length > 0 && (
                      <span>
                        {item.variantOptions
                          .map(
                            (option) =>
                              `${ar ? option.optionNameAr : option.optionNameEn}: ${ar ? option.valueAr : option.valueEn}`,
                          )
                          .join(" · ")}
                      </span>
                    )}
                    <small>
                      {ar ? "الكمية" : "Quantity"}: {item.quantity} · {money(item.price)}{" "}
                      {ar ? "للقطعة" : "each"}
                    </small>
                  </div>
                  <div className="account-order-contents__price">
                    {item.discount > 0 && <del>{money(item.subtotal)}</del>}
                    <strong>{money(item.discountedSubtotal)}</strong>
                    <small>{ar ? "إجمالي المنتج" : "Item total"}</small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              {ar ? "لا توجد منتجات مسجلة لهذا الطلب." : "No items are recorded for this order."}
            </p>
          )}
          <dl className="account-order-contents__totals">
            <div>
              <dt>{ar ? "المجموع الفرعي" : "Subtotal"}</dt>
              <dd>{money(details.data.subtotal)}</dd>
            </div>
            {details.data.discount > 0 && (
              <div>
                <dt>{ar ? "خصم المنتجات" : "Product discount"}</dt>
                <dd>−{money(details.data.discount)}</dd>
              </div>
            )}
            <div>
              <dt>{ar ? "الشحن" : "Shipping"}</dt>
              <dd>{money(details.data.shippingCost)}</dd>
            </div>
            {details.data.shippingDiscount > 0 && (
              <div>
                <dt>{ar ? "خصم الشحن" : "Shipping discount"}</dt>
                <dd>−{money(details.data.shippingDiscount)}</dd>
              </div>
            )}
            {details.data.tax > 0 && (
              <div>
                <dt>{ar ? "الضريبة" : "Tax"}</dt>
                <dd>{money(details.data.tax)}</dd>
              </div>
            )}
            <div className="account-order-contents__grand-total">
              <dt>{ar ? "الإجمالي" : "Total"}</dt>
              <dd>{money(details.data.total)}</dd>
            </div>
          </dl>
        </>
      ) : null}
    </section>
  );
}

function OrderItemImage({ src }: { src: string | null }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="account-order-contents__image" aria-hidden="true">
      {src && !failed ? (
        <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <Package />
      )}
    </div>
  );
}
