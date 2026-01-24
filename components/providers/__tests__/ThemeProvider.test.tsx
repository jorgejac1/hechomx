import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThemeProvider from '../ThemeProvider';

// Mock next-themes
vi.mock('next-themes', () => ({
  ThemeProvider: ({
    children,
    attribute,
    defaultTheme,
    enableSystem,
    disableTransitionOnChange,
  }: {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
  }) => (
    <div
      data-testid="theme-provider"
      data-attribute={attribute}
      data-default-theme={defaultTheme}
      data-enable-system={enableSystem?.toString()}
      data-disable-transition={disableTransitionOnChange?.toString()}
    >
      {children}
    </div>
  ),
}));

describe('ThemeProvider', () => {
  describe('Rendering', () => {
    it('should render children', () => {
      render(
        <ThemeProvider>
          <div data-testid="child">Child content</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should wrap children with NextThemesProvider', () => {
      render(
        <ThemeProvider>
          <div>Test content</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    });
  });

  describe('Configuration', () => {
    it('should use class attribute for theme', () => {
      render(
        <ThemeProvider>
          <div>Content</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme-provider')).toHaveAttribute('data-attribute', 'class');
    });

    it('should use light as default theme', () => {
      render(
        <ThemeProvider>
          <div>Content</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme-provider')).toHaveAttribute('data-default-theme', 'light');
    });

    it('should disable system preference detection', () => {
      render(
        <ThemeProvider>
          <div>Content</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme-provider')).toHaveAttribute('data-enable-system', 'false');
    });

    it('should disable transition on theme change', () => {
      render(
        <ThemeProvider>
          <div>Content</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('theme-provider')).toHaveAttribute(
        'data-disable-transition',
        'true'
      );
    });
  });

  describe('Multiple Children', () => {
    it('should render multiple children', () => {
      render(
        <ThemeProvider>
          <div data-testid="first">First</div>
          <div data-testid="second">Second</div>
          <div data-testid="third">Third</div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('first')).toBeInTheDocument();
      expect(screen.getByTestId('second')).toBeInTheDocument();
      expect(screen.getByTestId('third')).toBeInTheDocument();
    });

    it('should render nested components', () => {
      render(
        <ThemeProvider>
          <div data-testid="parent">
            <div data-testid="child">
              <span data-testid="grandchild">Nested content</span>
            </div>
          </div>
        </ThemeProvider>
      );
      expect(screen.getByTestId('parent')).toBeInTheDocument();
      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByTestId('grandchild')).toBeInTheDocument();
    });
  });
});
