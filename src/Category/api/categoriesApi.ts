import { api } from "../../lib/utils";

export const getAllCategories = async () =>
  api<string[]>("https://fakestoreapi.com/products/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
