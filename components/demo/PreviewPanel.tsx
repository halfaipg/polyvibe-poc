'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Button, Group, Text, ActionIcon, Tooltip, Stack, Center } from '@mantine/core';
import { IconCopy, IconRefresh, IconCheck, IconCode, IconSparkles } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface PreviewPanelProps {
  html: string;
  onReset: () => void;
  isGenerating?: boolean;
  hideHeader?: boolean;
  streamingCode?: string;
  isUpdating?: boolean;
  previewChange?: string | null;
  onApplyChange?: (newHtml: string) => void;
  onCancelChange?: () => void;
}

export function PreviewPanel({ html, onReset, isGenerating = false, hideHeader = false, streamingCode = '', isUpdating = false, previewChange, onApplyChange, onCancelChange }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [thinkingText, setThinkingText] = useState('Analyzing your request...');
  const [accumulatedStreamingCode, setAccumulatedStreamingCode] = useState('');
  const [bootSequence, setBootSequence] = useState('');
  // const [showBootSequence, setShowBootSequence] = useState(false);
  // const [bootStep, setBootStep] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const codeRef = useRef<HTMLPreElement>(null);

  // Update streaming code directly (no accumulation needed)
  useEffect(() => {
    if (streamingCode) {
      setAccumulatedStreamingCode(streamingCode);
    }
  }, [streamingCode]);

  // Auto-scroll to bottom when new code arrives
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
    }
  }, [accumulatedStreamingCode]);

  // Reset accumulated code when generation starts/stops
  useEffect(() => {
    if (!isGenerating) {
      setAccumulatedStreamingCode('');
      // setBootStep(0);
      setBootSequence('');
    }
  }, [isGenerating]);

  // Animated boot sequence when generation starts
  useEffect(() => {
    if (!isGenerating) return;

    const bootSteps = [
      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...

[SYSTEM] Loading language models...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...

[SYSTEM] Loading language models...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...

[AI] Analyzing user request...
[AI] Generating creative concepts...
[AI] Building HTML structure...`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...

[SYSTEM] Loading language models...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...

[AI] Analyzing user request...
[AI] Generating creative concepts...
[AI] Building HTML structure...
[AI] Adding CSS styling...
[AI] Implementing responsive design...`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...

[SYSTEM] Loading language models...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...

[AI] Analyzing user request...
[AI] Generating creative concepts...
[AI] Building HTML structure...
[AI] Adding CSS styling...
[AI] Implementing responsive design...
[AI] Optimizing for performance...
[AI] Finalizing code generation...

READY FOR USER INPUT.

> _`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...

[SYSTEM] Loading language models...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...

[AI] Analyzing user request...
[AI] Generating creative concepts...
[AI] Building HTML structure...
[AI] Adding CSS styling...
[AI] Implementing responsive design...
[AI] Optimizing for performance...
[AI] Finalizing code generation...

[DESIGN] Initializing design patterns...
[DESIGN] Loading color palettes...
[DESIGN] Preparing typography systems...
[DESIGN] Setting up layout grids...

READY FOR USER INPUT.

> _`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...

[SYSTEM] Loading language models...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...

[AI] Analyzing user request...
[AI] Generating creative concepts...
[AI] Building HTML structure...
[AI] Adding CSS styling...
[AI] Implementing responsive design...
[AI] Optimizing for performance...
[AI] Finalizing code generation...

[DESIGN] Initializing design patterns...
[DESIGN] Loading color palettes...
[DESIGN] Preparing typography systems...
[DESIGN] Setting up layout grids...

[FRONTEND] Compiling HTML templates...
[FRONTEND] Processing CSS frameworks...
[FRONTEND] Loading JavaScript libraries...
[FRONTEND] Setting up responsive breakpoints...

READY FOR USER INPUT.

> _`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...

[SYSTEM] Loading language models...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...

[AI] Analyzing user request...
[AI] Generating creative concepts...
[AI] Building HTML structure...
[AI] Adding CSS styling...
[AI] Implementing responsive design...
[AI] Optimizing for performance...
[AI] Finalizing code generation...

[DESIGN] Initializing design patterns...
[DESIGN] Loading color palettes...
[DESIGN] Preparing typography systems...
[DESIGN] Setting up layout grids...

[FRONTEND] Compiling HTML templates...
[FRONTEND] Processing CSS frameworks...
[FRONTEND] Loading JavaScript libraries...
[FRONTEND] Setting up responsive breakpoints...

[ANIMATION] Loading transition effects...
[ANIMATION] Preparing hover states...
[ANIMATION] Setting up scroll animations...
[ANIMATION] Configuring micro-interactions...

READY FOR USER INPUT.

> _`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...

[SYSTEM] Loading language models...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...

[AI] Analyzing user request...
[AI] Generating creative concepts...
[AI] Building HTML structure...
[AI] Adding CSS styling...
[AI] Implementing responsive design...
[AI] Optimizing for performance...
[AI] Finalizing code generation...

[DESIGN] Initializing design patterns...
[DESIGN] Loading color palettes...
[DESIGN] Preparing typography systems...
[DESIGN] Setting up layout grids...

[FRONTEND] Compiling HTML templates...
[FRONTEND] Processing CSS frameworks...
[FRONTEND] Loading JavaScript libraries...
[FRONTEND] Setting up responsive breakpoints...

[ANIMATION] Loading transition effects...
[ANIMATION] Preparing hover states...
[ANIMATION] Setting up scroll animations...
[ANIMATION] Configuring micro-interactions...

[OPTIMIZATION] Minifying CSS...
[OPTIMIZATION] Compressing JavaScript...
[OPTIMIZATION] Optimizing images...
[OPTIMIZATION] Setting up caching...

READY FOR USER INPUT.

> _`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...

[SYSTEM] Loading language models...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...

[AI] Analyzing user request...
[AI] Generating creative concepts...
[AI] Building HTML structure...
[AI] Adding CSS styling...
[AI] Implementing responsive design...
[AI] Optimizing for performance...
[AI] Finalizing code generation...

[DESIGN] Initializing design patterns...
[DESIGN] Loading color palettes...
[DESIGN] Preparing typography systems...
[DESIGN] Setting up layout grids...

[FRONTEND] Compiling HTML templates...
[FRONTEND] Processing CSS frameworks...
[FRONTEND] Loading JavaScript libraries...
[FRONTEND] Setting up responsive breakpoints...

[ANIMATION] Loading transition effects...
[ANIMATION] Preparing hover states...
[ANIMATION] Setting up scroll animations...
[ANIMATION] Configuring micro-interactions...

[OPTIMIZATION] Minifying CSS...
[OPTIMIZATION] Compressing JavaScript...
[OPTIMIZATION] Optimizing images...
[OPTIMIZATION] Setting up caching...

[TESTING] Running accessibility checks...
[TESTING] Validating HTML structure...
[TESTING] Testing responsive layouts...
[TESTING] Checking cross-browser compatibility...

READY FOR USER INPUT.

> _`,

      `*** POLYVIBE AI LANDING PAGE GENERATOR ***
*** COMMODORE 64 STYLE BOOT SEQUENCE ***

READY.
LOAD "*",8,1

SEARCHING FOR *
LOADING
READY.

INITIALIZING AI NEURAL NETWORKS...
CONNECTING TO GLM-4.5-AIRX API...
ESTABLISHING STREAMING CONNECTION...

[SYSTEM] Loading language models...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...

[AI] Analyzing user request...
[AI] Generating creative concepts...
[AI] Building HTML structure...
[AI] Adding CSS styling...
[AI] Implementing responsive design...
[AI] Optimizing for performance...
[AI] Finalizing code generation...

[DESIGN] Initializing design patterns...
[DESIGN] Loading color palettes...
[DESIGN] Preparing typography systems...
[DESIGN] Setting up layout grids...

[FRONTEND] Compiling HTML templates...
[FRONTEND] Processing CSS frameworks...
[FRONTEND] Loading JavaScript libraries...
[FRONTEND] Setting up responsive breakpoints...

[ANIMATION] Loading transition effects...
[ANIMATION] Preparing hover states...
[ANIMATION] Setting up scroll animations...
[ANIMATION] Configuring micro-interactions...

[OPTIMIZATION] Minifying CSS...
[OPTIMIZATION] Compressing JavaScript...
[OPTIMIZATION] Optimizing images...
[OPTIMIZATION] Setting up caching...

[TESTING] Running accessibility checks...
[TESTING] Validating HTML structure...
[TESTING] Testing responsive layouts...
[TESTING] Checking cross-browser compatibility...

[FINAL] Assembling components...
[FINAL] Generating final output...
[FINAL] Preparing for deployment...
[FINAL] System ready for generation...

READY FOR USER INPUT.

> _`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < bootSteps.length) {
        setBootSequence(bootSteps[currentStep] || '');
        // setBootStep(currentStep);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1200); // Each step takes 1200ms (slower)

    return () => clearInterval(interval);
  }, [isGenerating]);


  // Edit mode functions
  const enterEditMode = () => {
    setIsEditMode(true);
    setEditedCode(accumulatedStreamingCode);
  };

  const saveEdit = () => {
    setAccumulatedStreamingCode(editedCode);
    setIsEditMode(false);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setEditedCode('');
  };

  useEffect(() => {
    if (iframeRef.current && html && !isGenerating) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html, isGenerating]);

  // Thinking animation text
  useEffect(() => {
    if (!isGenerating) return;

    const thinkingMessages = [
      'Analyzing your request...',
      'Designing the layout...',
      'Crafting the HTML structure...',
      'Adding beautiful CSS styling...',
      'Implementing responsive design...',
      'Adding interactive elements...',
      'Optimizing for performance...',
      'Finalizing the design...',
      'Almost ready...'
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      setThinkingText(thinkingMessages[currentIndex] || '');
      currentIndex = (currentIndex + 1) % thinkingMessages.length;
    }, 4000);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      notifications.show({
        title: 'Copied!',
        message: 'HTML code copied to clipboard',
        color: 'green',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to copy to clipboard',
        color: 'red',
      });
    }
  };

  return (
    <Box style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {!hideHeader && (
        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}>
          <Group justify="space-between">
            <Text size="lg" fw={600} c="white">
              Live Preview
            </Text>
            <Group gap="xs">
              {accumulatedStreamingCode && !isGenerating && (
                <Tooltip label="Edit Code">
                  <ActionIcon
                    variant="subtle"
                    onClick={enterEditMode}
                    color="blue"
                  >
                    <IconCode size={18} />
                  </ActionIcon>
                </Tooltip>
              )}
              <Tooltip label={showCode ? "Show Preview" : "Show Code"}>
                <ActionIcon
                  variant="subtle"
                  onClick={() => setShowCode(!showCode)}
                  disabled={!html}
                >
                  <IconCode size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Copy HTML">
                <ActionIcon
                  variant="subtle"
                  onClick={copyToClipboard}
                  disabled={!html}
                  color={copied ? 'green' : undefined}
                >
                  {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Reset Preview">
                <ActionIcon
                  variant="subtle"
                  onClick={onReset}
                  disabled={!html}
                >
                  <IconRefresh size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Box>
      )}

      <Box style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {isGenerating ? (
          <Box
            style={{
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {/* Streaming Code Background */}
            <Box
              ref={codeRef}
              component="pre"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 0,
                padding: '1rem',
                fontSize: '0.75rem',
                lineHeight: 1.2,
                color: '#00ff00',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                opacity: 0.9,
                overflow: 'auto',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'none',
                zIndex: 1,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                width: '100%',
                height: '100%',
              }}
            >
              <code>
                {accumulatedStreamingCode || bootSequence || `╔══════════════════════════════════════════════════════════════╗
║                    AI LANDING PAGE GENERATOR                    ║
║                        SYSTEM INITIALIZATION                    ║
╚══════════════════════════════════════════════════════════════╝

[SYSTEM] Initializing neural networks...
[SYSTEM] Loading language models...
[SYSTEM] Establishing API connections...
[SYSTEM] Preparing code generation engine...
[SYSTEM] Calibrating response streams...
[SYSTEM] Ready for user input.

> _`}
              </code>
            </Box>
            
            {/* Glass Effect Overlay */}
            <Box
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(1px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                zIndex: 2,
              }}
            >
              <Stack align="center" gap="xl">
                <Box
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                  }}
                >
                  <Box
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: '3px solid rgba(255,255,255,0.3)',
                      borderTop: '3px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  <Center
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <IconSparkles size={32} color="white" />
                  </Center>
                </Box>
                <Stack align="center" gap="md">
                  <Text size="xl" fw={600} c="white" ta="center">
                    AI is building your landing page
                  </Text>
                  <Text size="lg" c="white" ta="center" style={{ opacity: 0.9 }}>
                    {thinkingText}
                  </Text>
                  <Text size="sm" c="white" ta="center" style={{ opacity: 0.7 }}>
                    This may take a few moments...
                  </Text>
                </Stack>
              </Stack>
            </Box>
            
            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </Box>
        ) : isUpdating ? (
          <Box style={{ height: '100%', position: 'relative' }}>
            {/* Show current page with update overlay */}
            <iframe
              ref={iframeRef}
              title="Landing Page Preview"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '0 0 8px 8px',
              }}
              srcDoc={html}
            />
            
            {/* Update overlay */}
            <Box
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(3px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <Stack align="center" gap="md">
                <Box
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '3px solid #00ff00',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                <Text size="lg" fw={600} c="white" ta="center">
                  Updating your page...
                </Text>
                <Text size="sm" c="rgba(255, 255, 255, 0.8)" ta="center">
                  Making the requested changes
                </Text>
              </Stack>
            </Box>
          </Box>
        ) : previewChange ? (
          <Box style={{ height: '100%', position: 'relative' }}>
            {/* Show preview of the change */}
            <iframe
              ref={iframeRef}
              title="Preview Change"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '0 0 8px 8px',
              }}
              srcDoc={previewChange}
            />
            
            {/* Preview overlay with Apply/Cancel buttons */}
            <Box
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
              }}
            >
              <Group gap="sm">
                <Button
                  color="green"
                  size="sm"
                  onClick={() => onApplyChange?.(previewChange)}
                >
                  Apply Change
                </Button>
                <Button
                  color="gray"
                  size="sm"
                  onClick={onCancelChange}
                >
                  Cancel
                </Button>
              </Group>
            </Box>
            
            {/* Preview indicator */}
            <Box
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                zIndex: 10,
              }}
            >
              <Text size="sm" fw={600}>
                Preview of your changes
              </Text>
            </Box>
          </Box>
        ) : !html || html.trim() === '' ? (
          <Box
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <Text c="dimmed" ta="center">
              Your generated landing page will appear here
            </Text>
          </Box>
        ) : isEditMode ? (
          <Box style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box p="sm" style={{ borderBottom: '1px solid var(--mantine-color-dark-4)', backgroundColor: 'var(--mantine-color-dark-6)' }}>
              <Group justify="space-between">
                <Text size="sm" c="white">Edit HTML Code</Text>
                <Group gap="xs">
                  <Button size="xs" color="green" onClick={saveEdit}>
                    Save
                  </Button>
                  <Button size="xs" color="gray" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </Group>
              </Group>
            </Box>
            <Box
              component="textarea"
              value={editedCode}
              onChange={(e) => setEditedCode(e.target.value)}
              style={{
                flex: 1,
                padding: '1rem',
                backgroundColor: 'var(--mantine-color-dark-7)',
                color: 'white',
                border: 'none',
                outline: 'none',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                resize: 'none',
              }}
            />
          </Box>
        ) : showCode ? (
          <Box
            component="pre"
            style={{
              height: '100%',
              overflow: 'auto',
              padding: '1rem',
              margin: 0,
              backgroundColor: 'var(--mantine-color-dark-7)',
              fontSize: '0.875rem',
              lineHeight: 1.5,
            }}
          >
            <code>{html}</code>
          </Box>
        ) : (
          <iframe
            ref={iframeRef}
            title="Landing Page Preview"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: 'white',
            }}
          />
        )}
      </Box>
    </Box>
  );
}

