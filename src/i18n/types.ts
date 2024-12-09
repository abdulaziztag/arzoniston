export const locales = ['en', 'ru', 'uz', 'uz-cyrl'] as const;
export type Locale = typeof locales[number];