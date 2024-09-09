import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Currency } from "../models/currency";
import { type Locale } from "../i18n/routing";
import { error } from "console";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TypedResponse<TData> extends Response {
  json: () => Promise<TData>;
}

declare function fetch<TData = unknown>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
): Promise<TypedResponse<TData>>;

export const api = fetch;

interface ApiResponseError {
  data: null;
  error: true;
  response: Response;
}

interface ApiResponseSuccess<TData> {
  data: TData;
  error: false;
  response: Response;
}

type ApiResponse<TData> = ApiResponseError | ApiResponseSuccess<TData>;

export const withFormattedResponse = async <TData = unknown>(
  request: Promise<TypedResponse<TData>>,
): Promise<ApiResponse<TData>> => {
  const response = await request;

  if (!response.ok) {
    return { data: null, error: true, response };
  }

  const data = await response.json();

  return { data, error: false, response };
};

export const formatPrice = (
  price: number,
  currency: Currency,
  locale: Locale,
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
};

/////////// Just for mocking purposes ///////////

export const fakeApiCall = async (isError?: boolean) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isError) {
        reject(new Error("Something went wrong"));
      }
      resolve({ data: "Success" });
    }, 1000);
  });
};
