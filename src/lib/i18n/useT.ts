import { useContext } from "react";
import { I18nContext } from "./I18nContext";

const interpolate = (template: string, vars: Record<string, string | number>) =>
  template.replace(/{{(.*?)}}/g, (_, key) => String(vars[key.trim()] ?? ""));

export const useT = () => {
  const dict = useContext(I18nContext);

  const t = (key: string, vars?: Record<string, string | number>) => {
    const parts = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = dict;

    for (const part of parts) {
      value = value?.[part];
    }

    if (typeof value === "object" && vars?.count !== undefined) {
      if (vars.count === 0) return value.zero;
      if (vars.count === 1) return value.one;
      return interpolate(value.many, vars);
    }

    if (typeof value === "string") {
      return vars ? interpolate(value, vars) : value;
    }

    return `⚠️ Missing: ${key}`;
  };

  return { t };
};
