'use client';

import { useState } from 'react';
import { Box, Text, Button } from '@mantine/core';
import { IconSparkles, IconPlus } from '@tabler/icons-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatPanel } from '@/components/demo/ChatPanel';
import { PreviewPanel } from '@/components/demo/PreviewPanel';
import { ResizablePanels } from '@/components/demo/ResizablePanels';

export default function DemoPage() {
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [streamingCode, setStreamingCode] = useState('');
  const [previewChange, setPreviewChange] = useState<string | null>(null);

  const handleReset = () => {
    setGeneratedHtml('');
    setIsGenerating(false);
    setIsUpdating(false);
    setStreamingCode('');
    setPreviewChange(null);
    localStorage.removeItem('polyvibe_demo_chat');
    window.location.reload();
  };

  const handleNewChat = () => {
    setGeneratedHtml('');
    setIsGenerating(false);
    setIsUpdating(false);
    setStreamingCode('');
    setPreviewChange(null);
    localStorage.removeItem('polyvibe_demo_chat');
    window.location.reload();
  };

  const handleStreamingCode = (code: string) => {
    console.log('Demo page received content length:', code.length);
    setStreamingCode(code);
  };

  const handlePreviewChange = (html: string) => {
    setPreviewChange(html);
  };

  const handleApplyChange = (newHtml: string) => {
    setGeneratedHtml(newHtml);
    setPreviewChange(null);
  };

  const handleCancelChange = () => {
    setPreviewChange(null);
    // Don't clear the original HTML - just remove the preview
  };

  return (
    <AppLayout>
      <Box
        style={{
          height: 'calc(100vh - 80px)', // Account for nav bar height
          backgroundColor: 'var(--mantine-color-dark-8)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Workspace Header */}
        <Box
          p="sm"
          style={{
            borderBottom: '1px solid var(--mantine-color-dark-4)',
            backgroundColor: 'var(--mantine-color-dark-7)',
            flexShrink: 0,
          }}
        >
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text size="lg" fw={600} c="white">
              <IconSparkles size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              AI Landing Page Designer
            </Text>
            <Button
              variant="subtle"
              color="gray"
              size="sm"
              leftSection={<IconPlus size={16} />}
              onClick={handleNewChat}
              disabled={isGenerating}
            >
              New Chat
            </Button>
          </Box>
        </Box>

        {/* Resizable Panels */}
        <Box style={{ flex: 1, overflow: 'hidden' }}>
          <ResizablePanels
                leftPanel={
                  <ChatPanel 
                    onHtmlGenerated={setGeneratedHtml} 
                    onGeneratingChange={setIsGenerating}
                    onUpdatingChange={setIsUpdating}
                    onReset={handleReset}
                    onStreamingCode={handleStreamingCode}
                    onPreviewChange={handlePreviewChange}
                    hideHeader={true}
                    hasGeneratedContent={!!generatedHtml}
                    currentHtml={generatedHtml}
                  />
                }
            rightPanel={
              <PreviewPanel 
                html={generatedHtml} 
                onReset={handleReset} 
                isGenerating={isGenerating}
                isUpdating={isUpdating}
                streamingCode={streamingCode}
                previewChange={previewChange}
                onApplyChange={handleApplyChange}
                onCancelChange={handleCancelChange}
                hideHeader={true}
              />
            }
            initialLeftWidth={33.33}
            minWidth={20}
          />
        </Box>
      </Box>
    </AppLayout>
  );
}

