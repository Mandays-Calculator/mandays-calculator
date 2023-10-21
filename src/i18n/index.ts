import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import translations from "./locales";

const i18nConfig = {
  resources: translations,
  fallbackLng: "en",
  debug: false,
  defaultNS: "translations",
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(i18nConfig);

export default i18n;
