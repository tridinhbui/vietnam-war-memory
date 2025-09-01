import { getRequestConfig } from 'next-intl/server';
import { locales } from './client';

export default getRequestConfig(async ({ locale }) => {
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    locale = 'vi'; // Default to Vietnamese
  }

  return {
    locale: locale as string,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
