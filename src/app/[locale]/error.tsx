"use client"; // Error boundaries must be Client Components

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button } from "../../components/ui/button";

interface UnexpectErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const UnexpectedError = ({ error, reset }: UnexpectErrorProps) => {
  const t = useTranslations("errors");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <div className="container my-12">
      <h2>{error.message}</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {t("try-again")}
      </Button>
    </div>
  );
};

export default UnexpectedError;
