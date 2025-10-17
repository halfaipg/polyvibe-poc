'use client';

import { AppShell } from '@mantine/core';
import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <Header />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}


