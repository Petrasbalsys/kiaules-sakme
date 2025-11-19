import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'lt'],
    defaultNS: 'common',
    ns: ['common', 'media', 'events', 'vertical', 'artech', 'investors', 'other', 'aboutus', 'landing'],
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: true,
    },
    
    debug: false, // Set to true if you want to see i18n logs
  });

export default i18n;