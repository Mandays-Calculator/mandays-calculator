import type { FormErrors } from "./types";
import { defaultTo, get } from "lodash";

export const getOption = <Type extends object>(
  path: keyof Type | "value" | "label",
): ((option: Type) => string) => {
  return (option: Type) => {
    return defaultTo(get(option, path), "");
  };
};

export const getFieldError = (
  errors: FormErrors | undefined,
  name: string,
): string | undefined => {
  if (errors) {
    return typeof get(errors, name) === "string" ? get(errors, name) : "";
  }
};
