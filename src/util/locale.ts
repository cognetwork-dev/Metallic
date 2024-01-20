import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import en from "../locales/en.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import nl from "../locales/nl.json";
import de from "../locales/de.json";
import ar from "../locales/ar.json";
import zh from "../locales/zh.json";
import hi from "../locales/hi.json";

const language = localStorage.getItem("metallic/locale") || "en"

const resources = {
    en: {
        translation: en
    },
    es: {
        translation: es
    },
    fr: {
        translation: fr
    },
    nl: {
        translation: nl
    },
    de: {
        translation: de
    },
    ar: {
        translation: ar
    },
    zh: {
        translation: zh
    },
    hi: {
        translation: hi
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