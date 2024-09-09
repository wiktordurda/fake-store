import { useTranslations } from "next-intl";

const Error = () => {
  const t = useTranslations("errors");

  return (
    <div
      className="relative mx-auto mt-4 max-w-96 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <span className="block sm:inline">{t("unhandled")}</span>
    </div>
  );
};

export default Error;
