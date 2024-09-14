"use client";

import { Button, type buttonVariants } from "../../components/ui/button";
import { useCart } from "../../Cart/contexts/cartContext";
import { useCallback, type ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";
import { type Product } from "../models/product";
import {
  addCartProduct,
  type AddCartProductVariables,
} from "../../Cart/contexts/cartAsyncActions";
import { toast } from "sonner";
import { useMutation } from "../../lib/hooks/useMutation";

export interface AddProductButtonProps
  extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  id: Product["id"];
}

const AddProductButton = ({
  children,
  id,
  ...variantProps
}: AddProductButtonProps) => {
  const { state, dispatch } = useCart();
  const { mutate, isLoading } = useMutation<
    void,
    Error,
    AddCartProductVariables
  >({
    mutationFn: addCartProduct,
  });

  const onProductAdded = useCallback(() => {
    mutate(
      { id, state, dispatch },
      {
        onError: (error) => toast.error(error.message),
      },
    );
  }, [id, state, dispatch, mutate]);

  return (
    <Button disabled={isLoading} onClick={onProductAdded} {...variantProps}>
      {children}
    </Button>
  );
};

export default AddProductButton;
