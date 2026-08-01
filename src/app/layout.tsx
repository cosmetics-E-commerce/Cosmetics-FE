import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AppProviders } from '@/app/providers/app-providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Seniora Beauty',
  description: 'Premium skincare and beauty products for every glow, every day.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
