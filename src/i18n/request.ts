/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { Locale } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!Locale.safeParse(locale).success) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
