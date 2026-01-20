import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../TextInput';

describe('TextInput', () => {
  describe('rendering', () => {
    it('should render an input element', () => {
      render(<TextInput placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<TextInput label="Email" />);
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('should render with required indicator', () => {
      render(<TextInput label="Email" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should render with hint text', () => {
      render(<TextInput hint="Enter your email address" />);
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('should render with error message', () => {
      render(<TextInput error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should not show hint when error is present', () => {
      render(<TextInput hint="Hint text" error="Error text" />);
      expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
      expect(screen.getByText('Error text')).toBeInTheDocument();
    });

    it('should render with left icon', () => {
      render(<TextInput leftIcon={<span data-testid="left-icon">Icon</span>} />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('should render with right icon', () => {
      render(<TextInput rightIcon={<span data-testid="right-icon">Icon</span>} />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('should apply small size styles', () => {
      render(<TextInput size="sm" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('px-3');
      expect(input.className).toContain('py-2');
      expect(input.className).toContain('text-sm');
    });

    it('should apply medium size styles by default', () => {
      render(<TextInput data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('px-4');
      expect(input.className).toContain('py-3');
      expect(input.className).toContain('text-base');
    });

    it('should apply large size styles', () => {
      render(<TextInput size="lg" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('px-5');
      expect(input.className).toContain('py-4');
      expect(input.className).toContain('text-lg');
    });
  });

  describe('states', () => {
    it('should apply error styles when error is present', () => {
      render(<TextInput error="Error" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('border-red-500');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should apply disabled styles when disabled', () => {
      render(<TextInput disabled data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
      expect(input.className).toContain('disabled:bg-gray-100');
    });

    it('should have aria-describedby for error', () => {
      render(<TextInput id="test-input" error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
    });

    it('should have aria-describedby for hint', () => {
      render(<TextInput id="test-input" hint="Hint message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-hint');
    });

    it('should have aria-required when required', () => {
      render(<TextInput required />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('should not have aria-required when not required', () => {
      render(<TextInput />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('aria-required');
    });
  });

  describe('interaction', () => {
    it('should call onChange when value changes', () => {
      const handleChange = vi.fn();
      render(<TextInput onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('should accept value prop', () => {
      render(<TextInput value="initial" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('initial');
    });

    it('should accept type prop', () => {
      render(<TextInput type="email" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');
    });
  });

  describe('width', () => {
    it('should be full width by default', () => {
      render(<TextInput data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('w-full');
    });

    it('should not be full width when fullWidth is false', () => {
      render(<TextInput fullWidth={false} data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).not.toContain('w-full');
    });
  });

  describe('custom className', () => {
    it('should apply custom className', () => {
      render(<TextInput className="custom-class" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input.className).toContain('custom-class');
    });
  });
});
