import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.scss';
import { ReactNode } from 'react';
import { Provider } from '@/components/ui/provider';
import { AppHeader } from '@/app/components/Header';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Locale } from '@/i18n/types';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Arzoniston',
  description: 'Eng arzon avtomobillar',
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <AppHeader />
            <div className="mx-auto max-w-screen-sm px-4 pt-20">{children}</div>
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
}
