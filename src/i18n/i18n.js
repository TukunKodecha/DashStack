import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import es from '../locales/es.json';
import store from '../store/store';

// Get the current language from Redux store
const getCurrentLanguage = () => {
    const state = store.getState();
    return state.language?.language;
};

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr },
            es: { translation: es }
        },
        lng: getCurrentLanguage(),  // Load persisted language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
