import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/productos',
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
