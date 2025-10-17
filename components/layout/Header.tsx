'use client';

import {
  AppShell,
  Group,
  Button,
  ActionIcon,
  useMantineColorScheme,
  Burger,
  Drawer,
  Stack,
  Box,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoon, IconWallet } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const isDark = colorScheme === 'dark';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/demo', label: 'Workspace' },
    { href: '/polygon', label: 'Polygon' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <Group gap="xs">
              <Image
                src={isDark ? '/2-white.png' : '/2-black.png'}
                alt="PolyVibe Logo"
                width={50}
                height={50}
                priority
                style={{ objectFit: 'contain' }}
              />
              <Box>
                <Text size="xl" fw={700} c={isDark ? 'white' : 'black'}>
                  PolyVibe
                </Text>
                <Text size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                  AI-Powered Development
                </Text>
              </Box>
            </Group>
          </Link>

          {/* Desktop Navigation */}
          <Group gap="sm" visibleFrom="sm">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                variant="subtle"
                color="gray"
              >
                {link.label}
              </Button>
            ))}
          </Group>

          {/* Actions */}
          <Group gap="sm">
            <Button
              variant="light"
              color="violet"
              leftSection={<IconWallet size={18} />}
              visibleFrom="sm"
            >
              Connect Wallet
            </Button>

            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => toggleColorScheme()}
              size="lg"
              aria-label="Toggle color scheme"
            >
              {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" size="sm" />
          </Group>
        </Group>
      </AppShell.Header>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="xs"
        padding="md"
        title={
          <Image
            src={isDark ? '/2-white.png' : '/2-black.png'}
            alt="PolyVibe"
            width={45}
            height={45}
            style={{ objectFit: 'contain' }}
          />
        }
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Stack gap="sm">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              variant="light"
              fullWidth
              onClick={closeDrawer}
            >
              {link.label}
            </Button>
          ))}
          <Button
            variant="gradient"
            gradient={{ from: 'violet', to: 'grape' }}
            leftSection={<IconWallet size={18} />}
            fullWidth
          >
            Connect Wallet
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}

