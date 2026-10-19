import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './locales/vi.json';
import en from './locales/en.json';
import studyVi from './locales/study.vi.json';
import studyEn from './locales/study.en.json';

export const resources = {
  vi: {
    translation: {
      ...vi,
      study: studyVi,
      ...vi.common,
      ...vi.home,
      ...vi.details,
      ...vi.validation,
      ...vi.network,
      ...vi.dialogs,
    },
  },
  en: {
    translation: {
      ...en,
      study: studyEn,
      ...en.common,
      ...en.home,
      ...en.details,
      ...en.validation,
      ...en.network,
      ...en.dialogs,
    },
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'vi',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lng: 'vi' | 'en') => {
  return i18n.changeLanguage(lng);
};

export default i18n;
