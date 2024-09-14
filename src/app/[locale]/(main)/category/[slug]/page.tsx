import CardGrid from "../../../../../components/ui/CardGrid";
import { type Locale } from "../../../../../i18n/routing";
import { getCategoryProducts } from "../../../../../Product/api/productApi";
import ProductCard from "../../../../../Product/components/ProductCard";
import Error from "../../../../../components/ui/Error";
import { withFormattedResponse } from "../../../../../lib/utils";

interface CategoryPageProps {
  params: {
    locale: Locale;
    slug: string;
  };
}

const CategoryPage = async ({
  params: { slug, locale },
}: CategoryPageProps) => {
  const category = decodeURIComponent(slug);
  const { data: products, isError } = await withFormattedResponse(
    getCategoryProducts(category),
  );

  if (isError) {
    return <Error />;
  }

  const amountofProducts = products.length;

  return (
    <main className="container my-12">
      <h1 className="mb-6 capitalize md:mt-8">{`${category} (${amountofProducts})`}</h1>
      <CardGrid>
        {products.map(({ id, title, description, price, image }) => (
          <ProductCard
            key={id}
            {...{
              id,
              title,
              description,
              price,
              image,
              currency: "USD",
              locale,
            }}
          />
        ))}
      </CardGrid>
    </main>
  );
};

export default CategoryPage;
