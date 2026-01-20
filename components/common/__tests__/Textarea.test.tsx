import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRef, useEffect } from 'react';
import Textarea from '../Textarea';

describe('Textarea', () => {
  describe('rendering', () => {
    it('should render a textarea element', () => {
      render(<Textarea placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Textarea label="Description" />);
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('should render with required indicator', () => {
      render(<Textarea label="Description" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should render with hint text', () => {
      render(<Textarea hint="Enter a detailed description" />);
      expect(screen.getByText('Enter a detailed description')).toBeInTheDocument();
    });

    it('should render with error message', () => {
      render(<Textarea error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should not show hint when error is present', () => {
      render(<Textarea hint="Hint text" error="Error text" />);
      expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
      expect(screen.getByText('Error text')).toBeInTheDocument();
    });

    it('should render with character count when showCharCount is true', () => {
      render(<Textarea showCharCount value="Hello" onChange={() => {}} />);
      expect(screen.getByText(/5.*caracteres/)).toBeInTheDocument();
    });

    it('should render character count with maxLength', () => {
      render(<Textarea showCharCount maxLength={100} value="Hello" onChange={() => {}} />);
      expect(screen.getByText(/5.*\/.*100.*caracteres/)).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('should apply small size styles', () => {
      render(<Textarea size="sm" data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toContain('px-3');
      expect(textarea.className).toContain('py-2');
      expect(textarea.className).toContain('text-sm');
    });

    it('should apply medium size styles by default', () => {
      render(<Textarea data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toContain('px-4');
      expect(textarea.className).toContain('py-3');
      expect(textarea.className).toContain('text-base');
    });

    it('should apply large size styles', () => {
      render(<Textarea size="lg" data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toContain('px-5');
      expect(textarea.className).toContain('py-4');
      expect(textarea.className).toContain('text-lg');
    });
  });

  describe('states', () => {
    it('should apply error styles when error is present', () => {
      render(<Textarea error="Error" data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toContain('border-red-500');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('should apply disabled styles when disabled', () => {
      render(<Textarea disabled data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeDisabled();
      expect(textarea.className).toContain('disabled:bg-gray-100');
    });

    it('should have aria-describedby for error', () => {
      render(<Textarea id="test-textarea" error="Error message" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', 'test-textarea-error');
    });

    it('should have aria-describedby for hint', () => {
      render(<Textarea id="test-textarea" hint="Hint message" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', 'test-textarea-hint');
    });

    it('should have aria-required when required', () => {
      render(<Textarea required />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-required', 'true');
    });

    it('should not have aria-required when not required', () => {
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).not.toHaveAttribute('aria-required');
    });
  });

  describe('interaction', () => {
    it('should call onChange when value changes', () => {
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} />);
      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'test' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('should accept value prop', () => {
      render(<Textarea value="initial" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('initial');
    });

    it('should update character count on change', () => {
      const { rerender } = render(<Textarea showCharCount value="" onChange={() => {}} />);
      expect(screen.getByText(/0.*caracteres/)).toBeInTheDocument();

      rerender(<Textarea showCharCount value="Hello World" onChange={() => {}} />);
      expect(screen.getByText(/11.*caracteres/)).toBeInTheDocument();
    });
  });

  describe('rows', () => {
    it('should apply default minRows', () => {
      render(<Textarea data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('rows', '3');
    });

    it('should apply custom minRows', () => {
      render(<Textarea minRows={5} data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('rows', '5');
    });
  });

  describe('maxLength', () => {
    it('should apply maxLength attribute', () => {
      render(<Textarea maxLength={500} data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('maxLength', '500');
    });

    it('should show character count at max', () => {
      render(<Textarea showCharCount maxLength={10} value="1234567890" onChange={() => {}} />);
      expect(screen.getByText(/10.*\/.*10.*caracteres/)).toBeInTheDocument();
    });
  });

  describe('width', () => {
    it('should be full width by default', () => {
      render(<Textarea data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toContain('w-full');
    });

    it('should not be full width when fullWidth is false', () => {
      render(<Textarea fullWidth={false} data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).not.toContain('w-full');
    });
  });

  describe('custom className', () => {
    it('should apply custom className', () => {
      render(<Textarea className="custom-class" data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toContain('custom-class');
    });
  });

  describe('autoResize', () => {
    it('should auto-resize when autoResize is true', () => {
      // Mock getComputedStyle to return lineHeight
      const originalGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = vi.fn().mockReturnValue({
        lineHeight: '24px',
      });

      const { rerender } = render(
        <Textarea autoResize value="Line 1" onChange={() => {}} data-testid="textarea" />
      );

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeInTheDocument();

      // Trigger value change to trigger auto-resize effect
      rerender(
        <Textarea
          autoResize
          value="Line 1\nLine 2\nLine 3\nLine 4"
          onChange={() => {}}
          data-testid="textarea"
        />
      );

      // Restore original
      window.getComputedStyle = originalGetComputedStyle;
    });

    it('should respect minRows and maxRows in auto-resize', () => {
      const originalGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = vi.fn().mockReturnValue({
        lineHeight: '24px',
      });

      render(
        <Textarea
          autoResize
          minRows={2}
          maxRows={5}
          value="Test content"
          onChange={() => {}}
          data-testid="textarea"
        />
      );

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeInTheDocument();

      window.getComputedStyle = originalGetComputedStyle;
    });

    it('should use fallback lineHeight when getComputedStyle returns invalid value', () => {
      const originalGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = vi.fn().mockReturnValue({
        lineHeight: 'normal', // Invalid numeric value
      });

      render(<Textarea autoResize value="Test" onChange={() => {}} data-testid="textarea" />);

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeInTheDocument();

      window.getComputedStyle = originalGetComputedStyle;
    });
  });

  describe('ref handling', () => {
    it('should forward function ref', () => {
      const refCallback = vi.fn();
      render(<Textarea ref={refCallback} />);
      expect(refCallback).toHaveBeenCalled();
      expect(refCallback).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
    });

    it('should forward object ref', () => {
      const TestComponent = () => {
        const textareaRef = useRef<HTMLTextAreaElement>(null);

        useEffect(() => {
          // Access ref after mount
          if (textareaRef.current) {
            textareaRef.current.setAttribute('data-ref-attached', 'true');
          }
        }, []);

        return <Textarea ref={textareaRef} data-testid="textarea" />;
      };

      render(<TestComponent />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('data-ref-attached', 'true');
    });
  });

  describe('defaultValue', () => {
    it('should use defaultValue for character count', () => {
      render(<Textarea showCharCount defaultValue="Default text" />);
      expect(screen.getByText(/12.*caracteres/)).toBeInTheDocument();
    });
  });
});
