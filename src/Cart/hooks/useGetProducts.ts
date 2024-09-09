import { useEffect, useState } from "react";
import { getProduct } from "../../Product/api/productApi";
import { type Product } from "../../Product/models/product";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useGetProducts = (ids: number[]) => {
  const t = useTranslations("errors");
  // Informs only about first fetch. Not interested in subsequent fetches.
  const [isFetched, setIsFetched] = useState(false);
  const [data, setData] = useState<Record<Product["id"], Product>>({});

  useEffect(() => {
    const loadProducts = async () => {
      const promises = ids.map<Promise<[Product["id"], Product]>>(
        async (id) => {
          const product = await getProduct(id);
          return [id, product];
        },
      );
      try {
        const products = await Promise.all(promises);
        setData(Object.fromEntries(products));
        setIsFetched(true);
      } catch {
        toast.error(t("unhandled"));
      }
    };

    void loadProducts();
  }, [ids, t]);

  return { data, isFetched };
};
