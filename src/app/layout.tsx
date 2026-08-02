import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AppProviders } from '@/app/providers/app-providers';
import { directionFor, resolveLocale } from '@/lib/i18n/locale';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Seniora Beauty',
  description: 'Premium skincare and beauty products for every glow, every day.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = resolveLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE);
  return (
    <html lang={locale} dir={directionFor(locale)}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
