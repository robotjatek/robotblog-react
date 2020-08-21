import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import hu from "./locales/hu.json";
import en from "./locales/en.json";

const initI18n = () => {
    const resources = {
        en: {
            translation: en
        },
        hu: {
            translation: hu
        }
    }

    i18n.use(initReactI18next)
        .init({
            fallbackLng: "en",
            lng: "hu",
            resources: resources,
            debug: true,
            react: {
                wait: true,
                useSuspense: false
            }
        });
}

export default initI18n;
