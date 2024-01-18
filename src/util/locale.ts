import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import en from "../locales/en.json";
import es from "../locales/es.json";

const language = localStorage.getItem("metallic/locale") || "en"

const resources = {
    en: {
        translation: en
    },
    es: {
        translation: es
    }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        lng: language,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

function seti18Locale(locale: string) {
    i18n.changeLanguage(locale);
};

export { i18n, seti18Locale };