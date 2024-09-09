import { type Product } from "../../Product/models/product";

type CreateAction = <TPayload, TAction extends string>(
  type: TAction,
) => (payload: TPayload) => {
  type: TAction;
  payload: TPayload;
};

const createAction: CreateAction = (type) => (payload) => ({
  type,
  payload,
});

type Withid<T = unknown> =
  T extends Record<string, unknown>
    ? {
        [key in keyof T]: T[key];
      } & { id: Product["id"] }
    : { id: Product["id"] };

export const add = createAction<Withid, "add">("add");
export const update = createAction<Withid<{ quantity: number }>, "update">(
  "update",
);
export const remove = createAction<Withid, "remove">("remove");
