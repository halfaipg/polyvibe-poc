import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'violet',
  defaultRadius: 'md',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '700',
  },
  colors: {
    // Custom Polygon-inspired color palette
    polygon: [
      '#f5f0ff',
      '#e6d9ff',
      '#d1b3ff',
      '#bb8cff',
      '#a666ff',
      '#8c3fff', // Primary
      '#7d33e6',
      '#6e26cc',
      '#5f1ab3',
      '#500d99',
    ],
  },
  other: {
    // Custom properties for the app
    headerHeight: 60,
    footerHeight: 40,
  },
});


