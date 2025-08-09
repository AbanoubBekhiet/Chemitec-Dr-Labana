// src/utils/translate.js
export const LANGS = {
  ar: 'ar',
  en: 'en',
  fr: 'fr',
};

let lang = LANGS.en;

export const setLang = (l) => {
  lang = l;
  // خلي الـ html يعكس اللغة والاتجاه
  document.documentElement.lang = l;
  document.documentElement.dir  = l === LANGS.ar ? 'rtl' : 'ltr';
};

export const getLang = () => lang;

export function t(obj) {
  return obj[lang] || obj.en;
}
