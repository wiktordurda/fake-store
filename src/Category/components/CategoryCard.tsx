import Image from "next/image";
import { getTranslations } from "next-intl/server";

export interface CategoryCardProps {
  category: string;
  description: string;
}

const CategoryCard = async ({ category, description }: CategoryCardProps) => {
  const t = await getTranslations("category");

  return (
    <article className="group flex cursor-pointer flex-col gap-2 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <div className="relative w-full bg-muted/50">
        <Image
          src="/placeholder.svg"
          alt={t("img-alt", { category: category })}
          width={500}
          height={400}
          className="h-40 w-full object-cover"
        />
      </div>
      <div className="p-2">
        <h4 className="text-xl capitalize">{category}</h4>
        <p>{description}</p>
      </div>
    </article>
  );
};

export default CategoryCard;
