import { api, withFormattedResponse } from "../../lib/utils";

export const getAllCategories = async () =>
  withFormattedResponse(
    api<string[]>("https://fakestoreapi.com/products/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }),
  );
