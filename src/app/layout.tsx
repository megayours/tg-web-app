import { type PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import type { State as WagmiState } from "wagmi";
import { ClientProviders } from './client-providers';

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

type ClientProviderProps = {
  initialState?: WagmiState | undefined;
};

export default async function RootLayout({ children, initialState }: PropsWithChildren<ClientProviderProps>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
    <body>
      <I18nProvider>
      <ClientProviders>
        <Root>
          {children}
        </Root>
        </ClientProviders>
      </I18nProvider>
    </body>
    </html>
  );
}
