import { withFormattedResponse } from "../../lib/utils";
import { type Product } from "../../Product/models/product";
import { updateCart } from "../api/cartApi";
import { type CartStoreProduct } from "../models/cart";
import { remove, update } from "./cartActions";
import { type CartDispatch, type CartState } from "./cartContext";

export interface AddCartProductVariables {
  id: Product["id"];
  state: CartState;
  dispatch: CartDispatch;
}

export const addCartProduct = async ({
  id,
  state,
  dispatch,
}: AddCartProductVariables) => {
  const currentProduct = state.products[id];

  const product: CartStoreProduct = !!currentProduct
    ? { id, quantity: currentProduct.quantity + 1 }
    : { id, quantity: 1 };

  const { isError, error } = await withFormattedResponse(
    updateCart(id, product.quantity),
  );

  if (isError) throw error;

  dispatch(update({ id, quantity: product.quantity }));
};

export interface UpdateCartProductVariables {
  id: Product["id"];
  quantity: number;
  dispatch: CartDispatch;
}

export const updateCartProduct = async ({
  id,
  quantity,
  dispatch,
}: UpdateCartProductVariables) => {
  const { isError, error } = await withFormattedResponse(
    updateCart(id, quantity),
  );

  if (isError) throw error;

  dispatch(update({ id, quantity }));
};

export interface RemoveCartProductVariables {
  id: Product["id"];
  dispatch: CartDispatch;
}

export const removeCartProduct = async ({
  id,
  dispatch,
}: RemoveCartProductVariables) => {
  const { isError, error } = await withFormattedResponse(updateCart(id, 0));

  if (isError) throw error;

  dispatch(remove({ id }));
};
