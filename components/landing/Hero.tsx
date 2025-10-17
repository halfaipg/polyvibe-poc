'use client';

import { useState, useRef } from 'react';
import { Container, Title, Text, Button, Group, Box, Center, ActionIcon } from '@mantine/core';
import { IconCode, IconWallet, IconBook, IconVolume, IconVolumeOff, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Box
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '4rem',
        paddingBottom: '6rem',
      }}
    >
      {/* Video Background */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/polyvibe-demo.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%)',
          }}
        />
      </Box>

      {/* Unmute Button */}
      <ActionIcon
        onClick={toggleMute}
        size="xl"
        radius="md"
        variant="filled"
        color="white"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <IconVolumeOff size={24} color="white" /> : <IconVolume size={24} color="white" />}
      </ActionIcon>

      <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
        <Center mb="lg">
          <Image
            src="/1-white.png"
            alt="PolyVibe"
            width={400}
            height={200}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Center>
        
        <Title
          order={1}
          size="3rem"
          fw={900}
          ta="center"
          c="white"
          mb="md"
          style={{
            lineHeight: 1.2,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          Build Polygon dApps with AI
        </Title>
        
        <Text
          size="xl"
          c="white"
          ta="center"
          mb="xl"
          maw={600}
          mx="auto"
          style={{
            opacity: 0.95,
            textShadow: '0 1px 5px rgba(0,0,0,0.1)',
          }}
        >
          Your AI-powered coding assistant for Web3 development. Local models, cloud APIs, and
          everything in between.
        </Text>

        <Group justify="center" gap="md">
          <Button
            component={Link}
            href="/demo"
            size="lg"
            variant="gradient"
            gradient={{ from: 'violet', to: 'grape', deg: 45 }}
            leftSection={<IconSparkles size={20} />}
            radius="md"
            style={{
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
            }}
          >
            Open Workspace
          </Button>

          <Button
            component={Link}
            href="/workspace"
            size="lg"
            variant="white"
            color="dark"
            leftSection={<IconCode size={20} />}
            radius="md"
            style={{
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            }}
          >
            Start Coding
          </Button>
          
          <Button
            component={Link}
            href="/polygon"
            size="lg"
            variant="outline"
            color="white"
            leftSection={<IconBook size={20} />}
            radius="md"
            style={{
              borderColor: 'white',
              color: 'white',
            }}
          >
            View Documentation
          </Button>
          
          <Button
            size="lg"
            variant="light"
            color="grape"
            leftSection={<IconWallet size={20} />}
            radius="md"
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
            }}
          >
            Connect Wallet
          </Button>
        </Group>
      </Container>
    </Box>
  );
}

