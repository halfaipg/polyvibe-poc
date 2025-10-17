import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '../styles/globals.css';

import type { Metadata } from 'next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'PolyVibe - AI-Powered dApp Development',
  description: 'Build Polygon dApps with AI assistance. Local and cloud model support.',
  keywords: ['AI', 'Coding', 'Web3', 'Polygon', 'dApp', 'Development'],
  icons: {
    icon: '/1_black.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications position="top-right" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
