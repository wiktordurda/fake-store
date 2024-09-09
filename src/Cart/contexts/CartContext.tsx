"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import { type CartStoreProduct } from "../models/cart";
import { type remove, type update, type add } from "./cartActions";
import { type Product } from "../../Product/models/product";

export type CartState = {
  ids: Product["id"][];
  products: Record<Product["id"], CartStoreProduct>;
};
export type CartAction = ReturnType<typeof add | typeof update | typeof remove>;
export type CartDispatch = (action: CartAction) => void;

const removeProduct = (state: CartState, id: Product["id"]): CartState => {
  const order = state.ids.filter((productId) => productId !== id);
  const { [id]: _, ...restProducts } = state.products;

  return {
    ...state,
    ids: order,
    products: restProducts,
  };
};

const addProduct = (
  state: CartState,
  id: Product["id"],
  quantity = 1,
): CartState => {
  return {
    ...state,
    ids: [...state.ids, id],
    products: {
      ...state.products,
      [id]: { id, quantity },
    },
  };
};

const updateProduct = (
  state: CartState,
  id: Product["id"],
  product: CartStoreProduct,
): CartState => {
  return {
    ...state,
    products: {
      ...state.products,
      [id]: product,
    },
  };
};

const CartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "add": {
      const { id } = action.payload;
      const existingProduct = state.products[id];

      if (!existingProduct) return addProduct(state, id);

      return updateProduct(state, id, {
        ...existingProduct,
        quantity: existingProduct.quantity + 1,
      });
    }
    case "update": {
      const { id, quantity } = action.payload;
      const existingProduct = state.products[id];

      if (!existingProduct) return addProduct(state, id, quantity);

      if (quantity <= 0) {
        return removeProduct(state, id);
      }

      return updateProduct(state, id, { id, quantity });
    }
    case "remove": {
      const { id } = action.payload;
      return removeProduct(state, id);
    }
    default: {
      throw new Error("Unknown action");
    }
  }
};

const CartContext = createContext<
  { state: CartState; dispatch: CartDispatch } | undefined
>(undefined);

export interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(CartReducer, {
    ids: [],
    products: {},
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
