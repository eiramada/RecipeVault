import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import estonian from "./i18n/ee.json";
import english from "./i18n/en.json";

// the translations
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: english,
  },
  ee: {
    translation: estonian,
  },
};

function checkLanguage() {
  const defaultLang = "en";
  const languages = Object.keys(resources);
  const userLang = localStorage.getItem("lang");

  if (!userLang || !languages.includes(userLang)) {
    localStorage.setItem("lang", defaultLang);
    return defaultLang;
  }
  return userLang;
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: checkLanguage(), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
