import { AppLayout } from '@/components/layout/AppLayout';
import { Container, Title, Text, Paper, Card, SimpleGrid, Button, Center } from '@mantine/core';
import { IconBook, IconCode, IconExternalLink } from '@tabler/icons-react';
import Image from 'next/image';

const resources = [
  {
    title: 'Polygon Launchpad',
    description: 'Official guide for launching dApps on Polygon network',
    url: 'https://docs.polygon.technology/tools/dApp-development/launchpad/intro/',
    icon: IconCode,
  },
  {
    title: 'matic.js Documentation',
    description: 'JavaScript library for interacting with Polygon',
    url: 'https://docs.polygon.technology/tools/matic-js/get-started/',
    icon: IconCode,
  },
  {
    title: 'Polygon Developer Docs',
    description: 'Complete documentation for building on Polygon',
    url: 'https://docs.polygon.technology/',
    icon: IconBook,
  },
];

export default function PolygonPage() {
  return (
    <AppLayout>
      <Container size="lg" py={60}>
        <Paper shadow="sm" p="xl" radius="md" withBorder mb="xl">
          <Center mb="md">
            <Image
              src="/polygon-matic-logo.svg"
              alt="Polygon"
              width={200}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </Center>
          <Title order={1} mb="md" ta="center">
            Polygon Resources
          </Title>
          <Text size="lg" c="dimmed" mb="xl" ta="center">
            Everything you need to build dApps on Polygon network
          </Text>
        </Paper>

        <Title order={2} size="h3" mb="md">
          Official Documentation
        </Title>
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg" mb="xl">
          {resources.map((resource) => (
            <Card key={resource.title} shadow="sm" padding="lg" radius="md" withBorder>
              <resource.icon size={32} style={{ color: '#8c3fff', marginBottom: '1rem' }} />
              <Text fw={600} size="lg" mb="xs">
                {resource.title}
              </Text>
              <Text size="sm" c="dimmed" mb="md" style={{ minHeight: '40px' }}>
                {resource.description}
              </Text>
              <Button
                component="a"
                href={resource.url}
                target="_blank"
                variant="light"
                color="violet"
                fullWidth
                rightSection={<IconExternalLink size={16} />}
              >
                Visit
              </Button>
            </Card>
          ))}
        </SimpleGrid>

        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Title order={2} size="h3" mb="md">
            dApp Templates
          </Title>
          <Text size="md" c="dimmed" mb="lg">
            Pre-built templates for common Polygon dApp patterns. Coming in the next phase:
          </Text>
          <ul>
            <li>
              <Text size="md" mb="sm">
                <strong>ERC-20 Token</strong> - Fungible token contract with minting and burning
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                <strong>NFT Marketplace</strong> - Complete marketplace with listing, buying, and
                royalties
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                <strong>DeFi Protocol</strong> - Staking, yield farming, and liquidity pools
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                <strong>Governance dApp</strong> - DAO governance with voting and proposals
              </Text>
            </li>
          </ul>
        </Paper>
      </Container>
    </AppLayout>
  );
}

