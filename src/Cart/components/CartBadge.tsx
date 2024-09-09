"use client";

import { useMemo, type ReactNode } from "react";
import { useCart } from "../contexts/cartContext";

export interface CartBadgeProps {
  children: ReactNode;
}

const CartBadge = ({ children }: CartBadgeProps) => {
  const { state } = useCart();

  const totalAmount = useMemo(() => {
    return state.ids.reduce((acc, id) => {
      const quantity = state.products[id]?.quantity;

      if (!quantity) return acc;

      return acc + quantity;
    }, 0);
  }, [state]);

  return (
    <div className="relative inline-block">
      {!!totalAmount && (
        <span className="absolute -right-2 -top-2 z-10 flex h-5 min-w-5 justify-center rounded-full bg-red-500 p-1 text-xs leading-none">
          {totalAmount}
        </span>
      )}
      {children}
    </div>
  );
};

export default CartBadge;
