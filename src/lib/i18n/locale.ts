export type AppLocale = 'ar' | 'en';
export type AppDirection = 'rtl' | 'ltr';

export function resolveLocale(value: string | undefined): AppLocale {
  return value === 'en' ? 'en' : 'ar';
}

export function directionFor(locale: AppLocale): AppDirection {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
