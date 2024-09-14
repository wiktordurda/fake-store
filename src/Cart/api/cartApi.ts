import { api } from "../../lib/utils";
import { type Product } from "../../Product/models/product";

export const updateCart = async (id: Product["id"], quantity: number) =>
  api<{ id: string }>("https://fakestoreapi.com/carts/7", {
    method: "PUT",
    body: JSON.stringify({
      userId: id,
      date: new Date().toISOString(),
      products: [{ productId: id, quantity }],
    }),
  });
