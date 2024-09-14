import { api } from "../../lib/utils";
import { type Product } from "../models/product";

export const getCategoryProducts = async (category: string) =>
  api<Product[]>(`https://fakestoreapi.com/products/category/${category}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getProduct = async (id: Product["id"]) => {
  const response = await api<Product>(
    `https://fakestoreapi.com/products/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  const data = await response.json();

  return data;
};
