"use client";

import Image from "next/image";
import { type Product } from "../../Product/models/product";
import { formatPrice } from "../../lib/utils";
import { XIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useCart } from "../contexts/cartContext";
import { type Locale } from "../../i18n/routing";
import Spinner from "../../components/ui/Spinner";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useMutation } from "../../lib/hooks/useMutation";
import {
  removeCartProduct,
  type RemoveCartProductVariables,
  updateCartProduct,
  type UpdateCartProductVariables,
} from "../contexts/cartAsyncActions";

const STOCK = Array.from({ length: 10 }, (_, index) => index + 1);

export interface CartRecordProps
  extends Omit<Product, "rating" | "description"> {
  quantity: number;
  locale: Locale;
}

const CartRecord = ({
  id,
  title,
  price,
  image,
  category,
  quantity,
  locale,
}: CartRecordProps) => {
  const { dispatch } = useCart();
  const t = useTranslations("errors");
  const { mutate: update, isLoading: isUpdateLoading } = useMutation<
    void,
    Error,
    UpdateCartProductVariables
  >({
    mutationFn: updateCartProduct,
  });
  const { mutate: remove, isLoading: isRemoveLoading } = useMutation<
    void,
    Error,
    RemoveCartProductVariables
  >({
    mutationFn: removeCartProduct,
  });

  const onHandleRemove = useCallback(
    (id: Product["id"]) => {
      remove(
        { id, dispatch },
        {
          onError: () => toast.error(t("unhandled")),
        },
      );
    },
    [dispatch, t, remove],
  );

  const onHandleUpdate = useCallback(
    (id: Product["id"], quantity: number) => {
      update(
        { id, quantity, dispatch },
        {
          onError: () => toast.error(t("unhandled")),
        },
      );
    },
    [dispatch, t, update],
  );

  const formattedPrice = useMemo(
    () => formatPrice(price, "USD", locale),
    [price, locale],
  );

  return (
    <Spinner spinning={isUpdateLoading || isRemoveLoading}>
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 border-b pb-4 sm:grid-cols-[auto_1fr_minmax(64px,_auto)_auto]">
        <Image
          src={image}
          alt="Should come from the CMS"
          width="100"
          height="100"
          className="row-span-full aspect-square w-24 object-contain"
        />
        <div className="col-start-2">
          <h2 className="text-sm font-medium sm:text-lg sm:font-semibold">
            {title}
          </h2>
          <p className="text-sm capitalize text-muted-foreground">{category}</p>
          <p className="mt-2 text-sm font-bold sm:text-lg">{formattedPrice}</p>
        </div>
        <Select
          value={quantity.toString()}
          onValueChange={(value) => onHandleUpdate(id, Number(value))}
        >
          <SelectTrigger
            className="-col-end-2 row-start-2 sm:row-span-full"
            id="quantity1"
          >
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent>
            {STOCK.map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className="-col-end-1 row-span-full"
          onClick={() => onHandleRemove(id)}
          variant="ghost"
          size="icon"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    </Spinner>
  );
};

export default CartRecord;
