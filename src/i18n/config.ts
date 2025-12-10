import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import la from './locales/la.json';
import th from './locales/th.json';
import zh from './locales/zh.json';

const resources = {
  en: { translation: en },
  la: { translation: la },
  th: { translation: th },
  zh: { translation: zh },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'en', // Default to English immediately
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage'], // Only use localStorage, not browser language
      caches: ['localStorage'],
    },
  });

export default i18n;

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'la', name: 'ລາວ', flag: '🇱🇦' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];
