'use client';

import { useState, useRef, useEffect } from 'react';
import { Box } from '@mantine/core';

interface ResizablePanelsProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  initialLeftWidth?: number;
  minWidth?: number;
}

export function ResizablePanels({ 
  leftPanel, 
  rightPanel, 
  initialLeftWidth = 50, 
  minWidth = 20 
}: ResizablePanelsProps) {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      const clampedWidth = Math.max(minWidth, Math.min(100 - minWidth, newLeftWidth));
      setLeftWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, minWidth]);

  return (
    <Box
      ref={containerRef}
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Left Panel */}
      <Box
        style={{
          width: `${leftWidth}%`,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {leftPanel}
      </Box>

      {/* Resizer */}
      <Box
        onMouseDown={handleMouseDown}
        style={{
          width: '4px',
          height: '100%',
          backgroundColor: isDragging ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-dark-4)',
          cursor: 'col-resize',
          position: 'relative',
          transition: isDragging ? 'none' : 'background-color 0.2s ease',
        }}
      >
        {/* Visual indicator */}
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '2px',
            height: '40px',
            backgroundColor: 'var(--mantine-color-dark-6)',
            borderRadius: '1px',
          }}
        />
      </Box>

      {/* Right Panel */}
      <Box
        style={{
          width: `${100 - leftWidth}%`,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {rightPanel}
      </Box>
    </Box>
  );
}

