import Cart from "../../../Cart/components/Cart";
import { type Locale } from "../../../i18n/routing";

export interface CartPageProps {
  params: {
    locale: Locale;
  };
}

const CartPage = ({ params: { locale } }: CartPageProps) => {
  return (
    <main className="container my-12">
      <h1 className="mb-6 md:mt-8">Shopping Cart</h1>
      <Cart locale={locale} />
    </main>
  );
};

export default CartPage;
