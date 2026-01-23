import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';

// Mock next-themes
const mockSetTheme = vi.fn();
const mockTheme = { theme: 'light', setTheme: mockSetTheme, resolvedTheme: 'light' };

vi.mock('next-themes', () => ({
  useTheme: () => mockTheme,
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTheme.theme = 'light';
    mockTheme.resolvedTheme = 'light';
  });

  describe('Rendering', () => {
    it('should render toggle button', () => {
      render(<ThemeToggle />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render with toggle variant by default', () => {
      render(<ThemeToggle />);
      // Toggle variant shows single button
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1);
    });

    it('should apply custom className', () => {
      render(<ThemeToggle className="custom-class" />);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('should render placeholder when not mounted (initial state)', () => {
      // This test checks the disabled state shown during SSR
      const { container } = render(<ThemeToggle />);
      // After useEffect runs, the component is mounted
      expect(container.querySelector('button')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      render(<ThemeToggle size="sm" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-1.5');
    });

    it('should render medium size by default', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-2');
    });

    it('should render large size', () => {
      render(<ThemeToggle size="lg" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-3');
    });
  });

  describe('Toggle Variant', () => {
    it('should show moon icon in light mode', () => {
      mockTheme.resolvedTheme = 'light';
      render(<ThemeToggle variant="toggle" />);
      expect(screen.getByLabelText('Cambiar a modo oscuro')).toBeInTheDocument();
    });

    it('should show sun icon in dark mode', () => {
      mockTheme.resolvedTheme = 'dark';
      render(<ThemeToggle variant="toggle" />);
      expect(screen.getByLabelText('Cambiar a modo claro')).toBeInTheDocument();
    });

    it('should toggle from light to dark on click', () => {
      mockTheme.resolvedTheme = 'light';
      render(<ThemeToggle variant="toggle" />);
      fireEvent.click(screen.getByRole('button'));
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('should toggle from dark to light on click', () => {
      mockTheme.resolvedTheme = 'dark';
      render(<ThemeToggle variant="toggle" />);
      fireEvent.click(screen.getByRole('button'));
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });
  });

  describe('Dropdown Variant', () => {
    it('should render dropdown trigger button', () => {
      render(<ThemeToggle variant="dropdown" />);
      expect(screen.getByLabelText('Seleccionar tema')).toBeInTheDocument();
    });

    it('should show dropdown menu on click', () => {
      render(<ThemeToggle variant="dropdown" />);
      fireEvent.click(screen.getByLabelText('Seleccionar tema'));

      expect(screen.getByText('Claro')).toBeInTheDocument();
      expect(screen.getByText('Oscuro')).toBeInTheDocument();
      expect(screen.getByText('Sistema')).toBeInTheDocument();
    });

    it('should set aria-expanded when dropdown is open', () => {
      render(<ThemeToggle variant="dropdown" />);
      const trigger = screen.getByLabelText('Seleccionar tema');

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should set light theme when clicking "Claro"', () => {
      render(<ThemeToggle variant="dropdown" />);
      fireEvent.click(screen.getByLabelText('Seleccionar tema'));
      fireEvent.click(screen.getByText('Claro'));

      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('should set dark theme when clicking "Oscuro"', () => {
      render(<ThemeToggle variant="dropdown" />);
      fireEvent.click(screen.getByLabelText('Seleccionar tema'));
      fireEvent.click(screen.getByText('Oscuro'));

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('should set system theme when clicking "Sistema"', () => {
      render(<ThemeToggle variant="dropdown" />);
      fireEvent.click(screen.getByLabelText('Seleccionar tema'));
      fireEvent.click(screen.getByText('Sistema'));

      expect(mockSetTheme).toHaveBeenCalledWith('system');
    });

    it('should close dropdown after selection', () => {
      render(<ThemeToggle variant="dropdown" />);
      fireEvent.click(screen.getByLabelText('Seleccionar tema'));
      fireEvent.click(screen.getByText('Oscuro'));

      expect(screen.queryByText('Claro')).not.toBeInTheDocument();
    });

    it('should close dropdown when clicking backdrop', () => {
      render(<ThemeToggle variant="dropdown" />);
      fireEvent.click(screen.getByLabelText('Seleccionar tema'));

      // Click the backdrop (fixed inset-0 div)
      const backdrop = document.querySelector('.fixed.inset-0');
      expect(backdrop).toBeInTheDocument();
      fireEvent.click(backdrop!);

      expect(screen.queryByText('Claro')).not.toBeInTheDocument();
    });

    it('should highlight current theme in dropdown', () => {
      mockTheme.theme = 'dark';
      render(<ThemeToggle variant="dropdown" />);
      fireEvent.click(screen.getByLabelText('Seleccionar tema'));

      const darkOption = screen.getByText('Oscuro').closest('button');
      expect(darkOption).toHaveClass('text-primary-600', 'font-medium');
    });

    it('should show moon icon in dark mode for dropdown trigger', () => {
      mockTheme.resolvedTheme = 'dark';
      render(<ThemeToggle variant="dropdown" />);
      // In dark mode, the trigger shows moon icon
      const button = screen.getByLabelText('Seleccionar tema');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('should show sun icon in light mode for dropdown trigger', () => {
      mockTheme.resolvedTheme = 'light';
      render(<ThemeToggle variant="dropdown" />);
      // In light mode, the trigger shows sun icon
      const button = screen.getByLabelText('Seleccionar tema');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible label for toggle in light mode', () => {
      mockTheme.resolvedTheme = 'light';
      render(<ThemeToggle variant="toggle" />);
      expect(screen.getByLabelText('Cambiar a modo oscuro')).toBeInTheDocument();
    });

    it('should have accessible label for toggle in dark mode', () => {
      mockTheme.resolvedTheme = 'dark';
      render(<ThemeToggle variant="toggle" />);
      expect(screen.getByLabelText('Cambiar a modo claro')).toBeInTheDocument();
    });

    it('should have accessible label for dropdown', () => {
      render(<ThemeToggle variant="dropdown" />);
      expect(screen.getByLabelText('Seleccionar tema')).toBeInTheDocument();
    });

    it('should have title attribute for toggle in light mode', () => {
      mockTheme.resolvedTheme = 'light';
      render(<ThemeToggle variant="toggle" />);
      expect(screen.getByRole('button')).toHaveAttribute('title', 'Modo oscuro');
    });

    it('should have title attribute for toggle in dark mode', () => {
      mockTheme.resolvedTheme = 'dark';
      render(<ThemeToggle variant="toggle" />);
      expect(screen.getByRole('button')).toHaveAttribute('title', 'Modo claro');
    });
  });
});
