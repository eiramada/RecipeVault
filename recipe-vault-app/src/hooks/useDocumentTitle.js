import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useDocumentTitle = (titleKey) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (titleKey) {
      document.title = `${t(titleKey)} - ${t("appTitle")}`;
    } else {
      document.title = t("appTitle");
    }

    return () => {
      document.title = t("appTitle");
    };
  }, [titleKey, t]);
};

export default useDocumentTitle;
