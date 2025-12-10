import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

// Get saved language or default to English
const getSavedLanguage = (): string => {
  const saved = localStorage.getItem('i18nextLng');
  // Only use saved language if it's a valid option
  if (saved && ['en', 'la', 'th', 'zh'].includes(saved)) {
    return saved;
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'la', name: 'ລາວ', flag: '🇱🇦' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];
