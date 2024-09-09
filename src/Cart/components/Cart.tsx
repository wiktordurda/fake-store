"use client";

import { useMemo } from "react";
import { useCart } from "../contexts/cartContext";
import CartRecord from "./CartRecord";
import { CartSummary } from "./CartSummary";
import { type Locale } from "../../i18n/routing";
import { Button } from "../../components/ui/button";
import { useGetProducts } from "../hooks/useGetProducts";
import Spinner from "../../components/ui/Spinner";

// Why I'm composing the product card here instead of keeping everything inside the CartContext?
// In real world scenarios, the cart would be stored in a database. To keep it persistent,
// between user sessions and to track for example abandoned carts.
// Apart from that there is a danger that after some time content management team would change
// the product data or even remove it from the store. In that case, the cart would be stale.

export interface CartRecordListProps {
  locale: Locale;
}

const Cart = ({ locale }: CartRecordListProps) => {
  const {
    state: { ids, products },
  } = useCart();

  const { data, isFetched } = useGetProducts(ids);

  const records = useMemo(() => {
    return ids
      .map((id) => {
        const product = products[id];
        const productDetails = data[id];

        if (!product || !productDetails) return null;

        return {
          ...productDetails,
          quantity: product.quantity,
        };
      })
      .filter((record) => record !== null);
  }, [data, products, ids]);

  const orderTotal = useMemo(
    () =>
      records.reduce((acc, { price, quantity }) => acc + price * quantity, 0),
    [records],
  );

  return (
    <Spinner spinning={!isFetched}>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          {records.map(({ id, title, category, price, image, quantity }) => (
            <CartRecord
              key={id}
              {...{
                category,
                id,
                title,
                price,
                image,
                quantity,
                locale,
              }}
            />
          ))}
        </div>
        <CartSummary
          className="w-full md:w-1/3 md:self-start"
          orderTotal={orderTotal}
          locale={locale}
        >
          <Button className="w-full bg-primary text-primary-foreground">
            Checkout
          </Button>
        </CartSummary>
      </div>
    </Spinner>
  );
};

export default Cart;
