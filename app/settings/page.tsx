import { AppLayout } from '@/components/layout/AppLayout';
import { Container, Title, Text, Paper } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

export default function SettingsPage() {
  return (
    <AppLayout>
      <Container size="lg" py={60}>
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <IconSettings size={48} style={{ color: '#8c3fff', marginBottom: '1rem' }} />
          <Title order={1} mb="md">
            Settings
          </Title>
          <Text size="lg" c="dimmed" mb="xl">
            Configure your PolyVibe experience:
          </Text>
          <ul>
            <li>
              <Text size="md" mb="sm">
                Model provider selection (Local, OpenAI, Anthropic, Custom)
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                API endpoint configuration
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                API key management (encrypted storage)
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                UI preferences (theme, font size, editor settings)
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                Wallet connection settings (coming soon)
              </Text>
            </li>
          </ul>
        </Paper>
      </Container>
    </AppLayout>
  );
}


