export const locales = ['fa', 'en'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'fa';

export const localeMetadata: Record<Locale, { dir: 'rtl' | 'ltr'; lang: string }> = {
  fa: { dir: 'rtl', lang: 'fa' },
  en: { dir: 'ltr', lang: 'en' }
};
