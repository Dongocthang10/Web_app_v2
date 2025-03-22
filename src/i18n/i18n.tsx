import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            'welcome': 'Welcome'
        }
    },
    vi: {
        translation: {
            'welcome': 'Chào mừng'
        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false
    }
})

// export default i18n;