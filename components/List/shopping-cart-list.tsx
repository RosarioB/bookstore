"use client";

import { Info } from "lucide-react";

import { useAtom } from "jotai";
import { shoppingCartState } from "@/atoms";
import { calcCartItemSum, calcCartItemTotalPrice } from "@/lib/utils";
import ShoppingCartListItem from "@/components/List/shopping-cart-list-item";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ShoppingCartList() {
  const [shoppingCart] = useAtom(shoppingCartState);

  return (
    <section className="flex flex-col gap-4 py-4" aria-label="Shopping cart list">
      {shoppingCart.map((cartItem) => (
        <ShoppingCartListItem key={cartItem._id} item={cartItem} />
      ))}
      {!!shoppingCart.length && (
        <SubTotal
          sum={calcCartItemSum(shoppingCart)}
          price={calcCartItemTotalPrice(shoppingCart)}
        />
      )}
      {!shoppingCart.length && <EmptyCartAlert />}
    </section>
  );
}

const EmptyCartAlert = () => {
  return (
    <Alert variant="default" className="mt-4 flex items-center gap-2">
      <Info/>
      <AlertDescription className="text-lg">Your shopping cart is empty.</AlertDescription>
    </Alert>
  );
};

const SubTotal = (props: { sum: number; price: number }) => {
  const { sum, price } = props;

  return (
    <section className="flex justify-end" aria-label="Subtotal">
      <div className="text-right">
        <p className="text-lg font-bold">
          <span className="mr-1">
            {sum === 1
              ? `Subtotal: (${sum} item) $`
              : `Subtotal: (${sum} items) $`}
          </span>
          {price}
        </p>
      </div>
    </section>
  );
};
