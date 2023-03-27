import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languages from "./locales/index.jsx";

var language = localStorage.getItem("language") || "en"

if (!languages[language]) {
	language = "en"
}

export function getLanguage() {
  return language;
}

export function setLanguage(newLanguage) {
	language = newLanguage;
	localStorage.setItem("language", language);
	i18n.changeLanguage(language);
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: languages.en,
        es: languages.es,
        fr: languages.fr,
        zh: languages.zh,
        de: languages.de,
    },
    lng: language,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
  });

export default i18n;