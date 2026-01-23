import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  describe('rendering', () => {
    it('should render a checkbox input', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('should render with JSX label', () => {
      render(
        <Checkbox
          label={
            <span>
              I agree to the <a href="/terms">Terms</a>
            </span>
          }
        />
      );
      expect(screen.getByText('Terms')).toBeInTheDocument();
    });

    it('should render with hint text', () => {
      render(<Checkbox hint="You can change this later" />);
      expect(screen.getByText('You can change this later')).toBeInTheDocument();
    });

    it('should render with error message', () => {
      render(<Checkbox error="You must accept the terms" />);
      expect(screen.getByText('You must accept the terms')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should not show hint when error is present', () => {
      render(<Checkbox hint="Hint text" error="Error text" />);
      expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
      expect(screen.getByText('Error text')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<Checkbox className="custom-class" />);
      // The outermost container receives the className
      const checkbox = screen.getByRole('checkbox');
      // Navigate to the outermost div wrapper
      const outerContainer = checkbox.closest('div')?.parentElement?.parentElement;
      expect(outerContainer).toHaveClass('custom-class');
    });
  });

  describe('label position', () => {
    it('should render label on the right by default', () => {
      render(<Checkbox label="Right label" />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Right label');
      // Checkbox should come before label in DOM
      expect(checkbox.parentElement?.compareDocumentPosition(label)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });

    it('should render label on the left when specified', () => {
      render(<Checkbox label="Left label" labelPosition="left" />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Left label');
      // Label should come before checkbox in DOM
      expect(label.compareDocumentPosition(checkbox.parentElement!)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
  });

  describe('sizes', () => {
    it('should apply small size styles', () => {
      render(<Checkbox size="sm" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('w-4');
      expect(checkbox.className).toContain('h-4');
    });

    it('should apply medium size styles by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('w-5');
      expect(checkbox.className).toContain('h-5');
    });

    it('should apply large size styles', () => {
      render(<Checkbox size="lg" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.className).toContain('w-6');
      expect(checkbox.className).toContain('h-6');
    });

    it('should apply correct label size for small', () => {
      render(<Checkbox size="sm" label="Small label" />);
      const label = screen.getByText('Small label');
      expect(label.className).toContain('text-sm');
    });

    it('should apply correct label size for large', () => {
      render(<Checkbox size="lg" label="Large label" />);
      const label = screen.getByText('Large label');
      expect(label.className).toContain('text-lg');
    });
  });

  describe('states', () => {
    it('should be checkable', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('should be controllable', () => {
      const onChange = vi.fn();
      render(<Checkbox checked={false} onChange={onChange} />);
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should be disabled', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('should apply disabled styles to label', () => {
      render(<Checkbox disabled label="Disabled label" />);
      const label = screen.getByText('Disabled label');
      expect(label.className).toContain('text-gray-400');
      expect(label.className).toContain('cursor-not-allowed');
    });

    it('should handle defaultChecked', () => {
      render(<Checkbox defaultChecked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  describe('label interaction', () => {
    it('should toggle checkbox when clicking label', () => {
      render(<Checkbox label="Click me" />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Click me');
      expect(checkbox).not.toBeChecked();
      fireEvent.click(label);
      expect(checkbox).toBeChecked();
    });

    it('should have correct htmlFor attribute linking label to checkbox', () => {
      render(<Checkbox label="Test label" id="test-checkbox" />);
      const label = screen.getByText('Test label');
      expect(label).toHaveAttribute('for', 'test-checkbox');
    });
  });

  describe('accessibility', () => {
    it('should have aria-invalid when error is present', () => {
      render(<Checkbox error="Error message" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    it('should not have aria-invalid when no error', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'false');
    });

    it('should have aria-describedby pointing to error', () => {
      render(<Checkbox error="Error" id="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'test-error');
    });

    it('should have aria-describedby pointing to hint when no error', () => {
      render(<Checkbox hint="Hint" id="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'test-hint');
    });

    it('should be focusable', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      expect(document.activeElement).toBe(checkbox);
    });
  });

  describe('forwarded props', () => {
    it('should forward name attribute', () => {
      render(<Checkbox name="terms" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'terms');
    });

    it('should forward value attribute', () => {
      render(<Checkbox value="accepted" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'accepted');
    });

    it('should forward required attribute', () => {
      render(<Checkbox required />);
      expect(screen.getByRole('checkbox')).toBeRequired();
    });

    it('should forward custom data attributes', () => {
      render(<Checkbox data-testid="custom-checkbox" />);
      expect(screen.getByTestId('custom-checkbox')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('should forward ref to input element', () => {
      const ref = { current: null } as React.RefObject<HTMLInputElement>;
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('should allow programmatic focus via ref', () => {
      const ref = { current: null } as React.RefObject<HTMLInputElement>;
      render(<Checkbox ref={ref} />);
      ref.current?.focus();
      expect(document.activeElement).toBe(ref.current);
    });
  });
});
