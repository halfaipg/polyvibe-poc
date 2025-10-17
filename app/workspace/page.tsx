import { AppLayout } from '@/components/layout/AppLayout';
import { Container, Title, Text, Paper, Button } from '@mantine/core';
import { IconCode } from '@tabler/icons-react';

export default function WorkspacePage() {
  return (
    <AppLayout>
      <Container size="lg" py={60}>
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <IconCode size={48} style={{ color: '#8c3fff', marginBottom: '1rem' }} />
          <Title order={1} mb="md">
            Workspace
          </Title>
          <Text size="lg" c="dimmed" mb="xl">
            The AI coding workspace will be implemented here. This will include:
          </Text>
          <ul>
            <li>
              <Text size="md" mb="sm">
                Chat interface with AI assistant
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                Code preview and editor
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                File tree for project structure
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                Model selection and configuration
              </Text>
            </li>
            <li>
              <Text size="md" mb="sm">
                Streaming AI responses in real-time
              </Text>
            </li>
          </ul>
          <Button
            variant="gradient"
            gradient={{ from: 'violet', to: 'grape' }}
            size="md"
            mt="xl"
            disabled
          >
            Coming Soon
          </Button>
        </Paper>
      </Container>
    </AppLayout>
  );
}


