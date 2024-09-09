import { getAllCategories } from "../../../Category/api/categoriesApi";
import { getTranslations } from "next-intl/server";
import CategoryCard from "../../../Category/components/CategoryCard";
import { Link } from "../../../i18n/routing";
import CardGrid from "../../../components/ui/CardGrid";
import Error from "../../../components/ui/Error";

const HomePage = async () => {
  const t = await getTranslations("home");
  const { data, error } = await getAllCategories();

  if (error) {
    return <Error />;
  }

  return (
    <main className="container my-12">
      <h1 className="mb-6 md:mt-8">{t("title")}</h1>
      <CardGrid>
        {data.map((category) => (
          <Link key={category} href={`/category/${category}`}>
            <CategoryCard
              category={category}
              description="Find your best category"
            />
          </Link>
        ))}
      </CardGrid>
    </main>
  );
};

export default HomePage;
