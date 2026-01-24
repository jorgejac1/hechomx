/**
 * @fileoverview Theme provider component for dark/light mode support.
 * Wraps next-themes provider with application-specific configuration.
 * Enables class-based theme switching with light as default.
 * @module components/providers/ThemeProvider
 */

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
