import { I18nContext } from "./I18nContext";
import { loadDictionary } from "./loadDictionary";
import { useEffect, useState } from "react";

export const I18nProvider = ({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) => {
  const [dict, setDict] = useState<Record<string, unknown>>({});

  useEffect(() => {
    loadDictionary(lang).then(setDict).catch(() => setDict({}));
  }, [lang]);

  return <I18nContext.Provider value={dict}>{children}</I18nContext.Provider>;
};
