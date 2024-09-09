import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useTranslations } from "next-intl";
import { cn, formatPrice } from "../../lib/utils";
import { type Locale } from "../../i18n/routing";
import { type ReactNode, useMemo } from "react";

export interface CartSummaryProps {
  children?: ReactNode;
  orderTotal: number;
  locale: Locale;
  className?: string;
}

export const CartSummary = ({
  children,
  orderTotal,
  locale,
  className,
}: CartSummaryProps) => {
  const t = useTranslations("CartSummary");

  const formattedOrderTotal = useMemo(
    () => formatPrice(orderTotal, "USD", locale),
    [orderTotal, locale],
  );

  return (
    <Card className={cn("p-4", className)}>
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">{t("total")}</span>
          <span className="font-bold">{formattedOrderTotal}</span>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};
