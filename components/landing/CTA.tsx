'use client';

import { Container, Title, Text, Button, Group, Box } from '@mantine/core';
import { IconCode, IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';

export function CTA() {
  return (
    <Box py={80} bg="var(--mantine-color-gray-0)" style={{ backgroundColor: 'rgba(103, 126, 234, 0.05)' }}>
      <Container size="md">
        <Title order={2} size="2.5rem" fw={700} ta="center" mb="md">
          Ready to Start Building?
        </Title>
        
        <Text size="lg" c="dimmed" ta="center" mb={40} maw={500} mx="auto">
          Jump into the workspace and let AI help you build your next Polygon dApp
        </Text>

        <Group justify="center" gap="md">
          <Button
            component={Link}
            href="/workspace"
            size="lg"
            variant="gradient"
            gradient={{ from: 'violet', to: 'grape' }}
            leftSection={<IconCode size={20} />}
            radius="md"
          >
            Launch Workspace
          </Button>
          
          <Button
            component="a"
            href="https://github.com"
            target="_blank"
            size="lg"
            variant="outline"
            color="dark"
            leftSection={<IconBrandGithub size={20} />}
            radius="md"
          >
            View on GitHub
          </Button>
        </Group>
      </Container>
    </Box>
  );
}


