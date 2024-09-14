import Image from "next/image";
import { type Product } from "../models/product";
import { formatPrice } from "../../lib/utils";
import { Plus } from "lucide-react";
import AddProductButton from "./AddProductButton";
import { type Locale } from "../../i18n/routing";
import { type Currency } from "../../models/currency";

export interface ProductCardProps
  extends Pick<Product, "id" | "title" | "price" | "image"> {
  currency: Currency;
  locale: Locale;
}

const ProductCard = ({
  id,
  image,
  title,
  price,
  locale,
  currency,
}: ProductCardProps) => {
  const formattedPrice = formatPrice(price, currency, locale);

  return (
    <article className="flex grid-cols-1 flex-col gap-2 overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      <div className="relative -mx-6 h-32 w-[calc(100%+2*1.5rem)]">
        <Image
          className="object-contain"
          src={image}
          alt={`Should come from the CMS`}
          sizes="(max-width: 640px) 100vw,  (max-width: 1024px) 50vw,25vw"
          fill
        />
      </div>
      <h4 className="font-medium">{title}</h4>
      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="font-semibold">{formattedPrice}</span>
        <AddProductButton id={id} size="icon">
          <Plus />
        </AddProductButton>
      </div>
    </article>
  );
};

export default ProductCard;
