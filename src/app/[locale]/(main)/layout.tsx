import { useTranslations } from "next-intl";
import { buttonVariants } from "../../../components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "../../../i18n/routing";
import { type ReactNode } from "react";
import CartBadge from "../../../Cart/components/CartBadge";
import Nav from "../../../components/ui/Nav";

export interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const t = useTranslations("Nav");

  return (
    <div>
      <Nav>
        <CartBadge>
          <Link
            className={buttonVariants({ size: "icon" })}
            href="/cart"
            aria-label={t("aria.cart")}
          >
            <ShoppingCart />
          </Link>
        </CartBadge>
      </Nav>
      {children}
    </div>
  );
};

export default BaseLayout;
