'use client';

import { Container, Title, Text, Card, SimpleGrid, ThemeIcon, Group, Box } from '@mantine/core';
import {
  IconRobot,
  IconDeviceDesktop,
  IconTerminal2,
  IconCloud,
  IconTemplate,
} from '@tabler/icons-react';
import Image from 'next/image';

interface Feature {
  icon: React.ComponentType<{ size?: number; color?: string }> | 'polygon';
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: IconRobot,
    title: 'AI-Powered Coding',
    description:
      'Intelligent code generation and assistance powered by local and cloud AI models. Use Ollama, OpenAI, Claude, or any OpenAI-compatible API.',
  },
  {
    icon: 'polygon' as const,
    title: 'Polygon Optimized',
    description:
      'Built-in templates, documentation, and best practices for Polygon dApp development. Deploy to Mumbai testnet or mainnet with confidence.',
  },
  {
    icon: IconDeviceDesktop,
    title: 'Modern Interface',
    description:
      'Beautiful, responsive web UI built with Next.js 15 and Mantine. Dark mode, mobile-friendly, and optimized for productivity.',
  },
  {
    icon: IconTerminal2,
    title: 'CLI for Power Users',
    description:
      'Advanced command-line interface based on qwen-code. Maximum control and efficiency for experienced developers.',
  },
  {
    icon: IconCloud,
    title: 'Flexible Deployment',
    description:
      'Run locally for development or deploy to the cloud with Google ADK. Scale from prototype to production seamlessly.',
  },
  {
    icon: IconTemplate,
    title: 'Rich Templates',
    description:
      'Pre-built dApp scaffolds for common patterns: ERC-20 tokens, NFT marketplaces, DeFi protocols, and governance systems.',
  },
];

export function Features() {
  return (
    <Container size="lg" py={80}>
      <Title order={2} size="2.5rem" fw={700} ta="center" mb="md">
        Everything You Need
      </Title>
      
      <Text size="lg" c="dimmed" ta="center" mb={50} maw={600} mx="auto">
        A complete platform for building Web3 applications with AI assistance
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {features.map((feature) => (
          <Card key={feature.title} shadow="sm" padding="lg" radius="md" withBorder>
            <Group mb="md">
              {feature.icon === 'polygon' ? (
                <Box
                  style={{
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '8px',
                  }}
                >
                  <Image
                    src="/polygon-matic-logo.svg"
                    alt="Polygon"
                    width={34}
                    height={34}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Box>
              ) : (
                <ThemeIcon
                  size={50}
                  radius="md"
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'grape' }}
                >
                  {typeof feature.icon !== 'string' && <feature.icon size={26} />}
                </ThemeIcon>
              )}
            </Group>

            <Text fw={600} size="lg" mb="xs">
              {feature.title}
            </Text>

            <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
              {feature.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

