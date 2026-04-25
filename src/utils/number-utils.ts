import { format } from "date-fns";
import numeral from "numeral";

import { Filters } from "@/types";

export function fShortenNumber(num: number): string {
  return numeral(num).format("0a");
}

export function fNumberinCommas(num: number): string {
  return numeral(num).format("0,");
}

export function fPostfixNumber(num: number): string {
  return num >= 1000 ? numeral(num).format("0.0a") : numeral(num).format("0");
}

export function formatDate(
  date: Date = new Date(new Date().getFullYear() + 1, 0, 1),
): string {
  return format(date, "dd-MM-yy");
}

export function formatExpiry(date = new Date()): string {
  return format(date, "do MMM yyyy");
}

export const arrayToString = (array: any, separator = ". ") => {
  return array.join(separator);
};

export const formatString = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, "-");
};

export const formatTime = (seconds: number): string => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
};

export const buildQueryParams = (filters: Partial<Filters>): string => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, String(v)));
    } else {
      queryParams.append(key, value);
    }
  });

  return queryParams.toString();
};

export const buildSingleQueryParams = (
  key: string,
  values: string[] | string,
) => {
  const searchParams = new URLSearchParams();

  if (Array.isArray(values)) {
    values.forEach((value) => searchParams.append(key, value));
  } else if (values !== undefined && values !== "") {
    searchParams.append(key, values);
  }

  return searchParams.toString();
};

export const buildRangeQueryParams = (
  key: string,
  values: string[],
): string => {
  const searchParams = new URLSearchParams();

  values.forEach((value) => {
    if (value?.includes("+")) {
      searchParams.append(key, value.replace("+", ""));
    } else {
      const rangeParts = value?.includes("-") ? value?.split("-") : [value];
      rangeParts.forEach((part) => searchParams.append(key, part));
    }
  });

  return searchParams.toString();
};

export const extractObjectIntoArray = (obj: any, keys: any) => {
  return keys.map((key: any) => obj[key] || 0);
};

export const extractStringIntoArrayOfString = (str: string): string[] => {
  return str?.split("-");
};
