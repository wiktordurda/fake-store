"use client";

import { Button, type buttonVariants } from "../../components/ui/button";
import { type CartAction, useCart } from "../../Cart/contexts/cartContext";
import { type ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";

export interface AddProductButtonProps
  extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  action: CartAction;
}

const ProductAction = ({
  children,
  action,
  ...variantProps
}: AddProductButtonProps) => {
  const { dispatch } = useCart();

  return (
    <Button onClick={() => dispatch(action)} {...variantProps}>
      {children}
    </Button>
  );
};

export default ProductAction;
