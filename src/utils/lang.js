// src/utils/lang.js
export function getCurrentLang() {
  // لو عندك window.currentLang متغير عام حدّثه دايمًا عند تغيير اللغة
  if (window.currentLang) return window.currentLang

  // أو خده من ال document
  return document.documentElement.lang || 'en'
}

// نفس دالة t بتاعتك
export function t(obj, lang) {
  return obj?.[lang] || obj?.en
}
