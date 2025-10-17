'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Stack, TextInput, Button, ScrollArea, Text, Paper, Loader } from '@mantine/core';
import { IconSend, IconSparkles, IconPlus } from '@tabler/icons-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface ChatPanelProps {
  onHtmlGenerated: (html: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onUpdatingChange: (isUpdating: boolean) => void;
  onReset: () => void;
  onStreamingCode?: (code: string) => void;
  onPreviewChange?: (html: string) => void;
  hideHeader?: boolean;
  hasGeneratedContent?: boolean;
  currentHtml?: string;
}

const SYSTEM_PROMPT = "You are a landing page designer. When a user describes a landing page they want, generate complete, production-ready HTML with inline CSS. Include modern styling, gradients, animations, and responsive design. Only output the raw HTML code, no explanations or markdown code blocks. Start with <!DOCTYPE html> and include all necessary tags.";

const EDIT_PROMPT = `You are a landing page editor. You will receive the current HTML code and a user's edit request.

CRITICAL INSTRUCTIONS:
1. Analyze the current HTML structure and identify which specific elements the user wants to change
2. Make ONLY the changes requested by the user to those specific elements
3. Preserve all other elements exactly as they are
4. Return ONLY the complete updated HTML with inline CSS
5. NO explanations, NO markdown code blocks, NO text before or after
6. Start with <!DOCTYPE html> and include all necessary tags

EXAMPLES:
- "Make the footer dark" → Update only the footer element
- "Change the button text to 'Buy Now'" → Update only that button
- "Add a contact form" → Insert form in appropriate location
- "Make the header bigger" → Update only the header styling`;

export function ChatPanel({ onHtmlGenerated, onGeneratingChange, onUpdatingChange, onReset, onStreamingCode, onPreviewChange, hideHeader = false, hasGeneratedContent = false, currentHtml = '' }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('polyvibe_demo_chat');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed);
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      // Keep only last 50 messages
      const trimmed = messages.slice(-50);
      localStorage.setItem('polyvibe_demo_chat', JSON.stringify(trimmed));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (viewport.current && viewport.current.scrollTo) {
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Check if this is an edit request
    const isEditRequest = hasGeneratedContent && currentHtml;
    
    // Set appropriate loading state
    if (isEditRequest) {
      onUpdatingChange(true);
    } else {
      onGeneratingChange(true);
    }

    try {
      // Build messages array for API
      const systemPrompt = isEditRequest ? EDIT_PROMPT : SYSTEM_PROMPT;
      
      let apiMessages;
      if (isEditRequest) {
        // For edit requests, include current HTML as context
        apiMessages = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Current HTML code:\n\n${currentHtml}\n\nUser edit request: ${userMessage.content}` }
        ];
      } else {
        // For new requests, use conversation history
        apiMessages = [
          { role: 'system', content: systemPrompt },
          ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMessage.content },
        ];
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/glm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Check if it's a demo mode response
        if (response.status === 200) {
          const data = await response.json();
          if (data.demo) {
            // Demo mode - show sample response
            setMessages(prev => [
              ...prev,
              {
                role: 'assistant',
                content: `${data.message}\n\nHere's a sample landing page I generated for you:`,
                timestamp: Date.now(),
              }
            ]);
            
            // Send sample HTML to preview
            if (data.sampleHtml) {
              onHtmlGenerated(data.sampleHtml);
            }
            return;
          }
        }
        throw new Error('API request failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  accumulatedContent += parsed.content;
                  
                  // Pass accumulated content to preview panel for real-time streaming effect
                  if (onStreamingCode) {
                    onStreamingCode(accumulatedContent);
                  }
                  
                  // Update message in real-time (but don't show HTML in chat)
                  setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    const isHtml = accumulatedContent.startsWith('<!DOCTYPE html>') || accumulatedContent.includes('<html');
                    const displayContent = isHtml 
                      ? '🎨 I\'m generating your landing page... This may take a moment as I create the perfect design for you!'
                      : accumulatedContent;
                    
                    if (lastMessage?.role === 'assistant') {
                      return [
                        ...prev.slice(0, -1),
                        { ...lastMessage, content: displayContent }
                      ];
                    } else {
                      return [
                        ...prev,
                        {
                          role: 'assistant',
                          content: displayContent,
                          timestamp: Date.now(),
                        }
                      ];
                    }
                  });
                }
            } catch {
              // Skip invalid JSON
            }
            }
          }
        }
      }

      // Handle the response
      if (accumulatedContent) {
        const isHtml = accumulatedContent.startsWith('<!DOCTYPE html>') || accumulatedContent.includes('<html');
        
        if (isHtml) {
          if (isEditRequest) {
            // For edit requests, show preview instead of applying directly
            onPreviewChange?.(accumulatedContent);
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage?.role === 'assistant') {
                return [
                  ...prev.slice(0, -1),
                  { 
                    ...lastMessage, 
                    content: '👀 Here&apos;s a preview of your changes. Click "Apply Change" to update your page or "Cancel" to keep it as is.' 
                  }
                ];
              }
              return prev;
            });
          } else {
            // For new pages, apply directly
            onHtmlGenerated(accumulatedContent);
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage?.role === 'assistant') {
                return [
                  ...prev.slice(0, -1),
                  { 
                    ...lastMessage, 
                    content: '✅ Landing page generated successfully! Check the preview panel to see your new site. You can tell me what to change: "Make the footer dark", "Change button text", "Add a contact form", etc.' 
                  }
                ];
              }
              return prev;
            });
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error && error.name === 'AbortError' 
        ? 'Request timed out. Please try again with a simpler request.'
        : 'Sorry, I encountered an error. Please try again.';
        
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
          timestamp: Date.now(),
        }
      ]);
    } finally {
      setIsLoading(false);
      onGeneratingChange(false);
      onUpdatingChange(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
    onGeneratingChange(false);
    onReset();
    localStorage.removeItem('polyvibe_demo_chat');
  };

  return (
    <Box style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {!hideHeader && (
        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text size="lg" fw={600} c="white">
              <IconSparkles size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              AI Landing Page Designer
            </Text>
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              leftSection={<IconPlus size={16} />}
              onClick={handleNewChat}
              disabled={isLoading}
            >
              New Chat
            </Button>
          </Box>
          <Text size="sm" c="dimmed">
            Describe your landing page and I&apos;ll generate it for you
          </Text>
        </Box>
      )}

      <ScrollArea
        flex={1}
        p="md"
        viewportRef={viewport}
        style={{ flex: 1 }}
      >
        <Stack gap="md">
          {messages.length === 0 && (
            <Paper p="xl" radius="md" style={{ backgroundColor: 'var(--mantine-color-dark-6)' }}>
              <Text c="dimmed" ta="center">
                {hasGeneratedContent 
                  ? "Tell me what you want to change on your landing page!"
                  : "Start by describing the landing page you want to create."
                }
                <br />
                {hasGeneratedContent 
                  ? "Examples: 'Make the footer dark', 'Change button text to Buy Now', 'Add a contact form', 'Make the header bigger'"
                  : "Example: 'Create a landing page for a crypto wallet with a hero section and features'"
                }
              </Text>
            </Paper>
          )}

          {messages.map((message, idx) => (
            <Box
              key={idx}
              style={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Paper
                p="md"
                radius="md"
                style={{
                  maxWidth: '80%',
                  backgroundColor: message.role === 'user' 
                    ? 'var(--mantine-color-violet-9)' 
                    : 'var(--mantine-color-dark-6)',
                }}
              >
                <Text size="sm" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {message.content}
                </Text>
              </Paper>
            </Box>
          ))}

          {isLoading && (
            <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Paper
                p="md"
                radius="md"
                style={{ backgroundColor: 'var(--mantine-color-dark-6)' }}
              >
                <Loader size="sm" />
              </Paper>
            </Box>
          )}
        </Stack>
      </ScrollArea>

      <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-dark-4)' }}>
        {hasGeneratedContent && (
          <Box mb="sm">
            <Button
              variant="outline"
              color="orange"
              onClick={onReset}
              disabled={isLoading}
              size="sm"
              fullWidth
            >
              Start Over with New Design
            </Button>
          </Box>
        )}
        <TextInput
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={handleKeyPress}
          placeholder={hasGeneratedContent ? "Describe what you want to change: 'Make the footer dark', 'Change button text to Buy Now', 'Add a contact form', etc." : "Describe your landing page..."}
          disabled={isLoading}
          rightSection={
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              variant="filled"
              size="xs"
              style={{ marginRight: -8 }}
            >
              <IconSend size={16} />
            </Button>
          }
          size="md"
          radius="md"
        />
      </Box>
    </Box>
  );
}

