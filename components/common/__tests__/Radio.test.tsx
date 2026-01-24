import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Radio from '../Radio';

describe('Radio', () => {
  describe('Rendering', () => {
    it('should render a radio input', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Radio label="Option 1" />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should associate label with input', () => {
      render(<Radio label="Test Label" />);
      const radio = screen.getByRole('radio');
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', radio.id);
    });

    it('should render without label', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply small size', () => {
      render(<Radio size="sm" />);
      expect(screen.getByRole('radio')).toHaveClass('w-4', 'h-4');
    });

    it('should apply medium size by default', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toHaveClass('w-5', 'h-5');
    });

    it('should apply large size', () => {
      render(<Radio size="lg" />);
      expect(screen.getByRole('radio')).toHaveClass('w-6', 'h-6');
    });

    it('should apply correct label size for sm', () => {
      render(<Radio size="sm" label="Small" />);
      expect(screen.getByText('Small')).toHaveClass('text-sm');
    });

    it('should apply correct label size for md', () => {
      render(<Radio size="md" label="Medium" />);
      expect(screen.getByText('Medium')).toHaveClass('text-base');
    });

    it('should apply correct label size for lg', () => {
      render(<Radio size="lg" label="Large" />);
      expect(screen.getByText('Large')).toHaveClass('text-lg');
    });
  });

  describe('Label Position', () => {
    it('should render label on right by default', () => {
      const { container } = render(<Radio label="Right Label" />);
      const flexContainer = container.querySelector('.flex');
      const children = Array.from(flexContainer?.children || []);
      // Radio input wrapper is first, label is second
      expect(children[0]?.querySelector('input')).toBeTruthy();
      expect(children[1]?.textContent).toBe('Right Label');
    });

    it('should render label on left when specified', () => {
      const { container } = render(<Radio label="Left Label" labelPosition="left" />);
      const flexContainer = container.querySelector('.flex');
      const children = Array.from(flexContainer?.children || []);
      // Label is first, radio input wrapper is second
      expect(children[0]?.textContent).toBe('Left Label');
      expect(children[1]?.querySelector('input')).toBeTruthy();
    });
  });

  describe('States', () => {
    it('should be unchecked by default', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).not.toBeChecked();
    });

    it('should be checked when checked prop is true', () => {
      render(<Radio checked onChange={() => {}} />);
      expect(screen.getByRole('radio')).toBeChecked();
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Radio disabled />);
      expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('should apply disabled styles to label', () => {
      render(<Radio label="Disabled" disabled />);
      expect(screen.getByText('Disabled')).toHaveClass('text-gray-400', 'cursor-not-allowed');
    });
  });

  describe('Interactivity', () => {
    it('should call onChange when clicked', () => {
      const handleChange = vi.fn();
      render(<Radio onChange={handleChange} />);
      fireEvent.click(screen.getByRole('radio'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should have disabled styling when disabled', () => {
      render(<Radio disabled />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
      expect(radio).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });

    it('should be clickable via label', () => {
      const handleChange = vi.fn();
      render(<Radio label="Click Me" onChange={handleChange} />);
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error State', () => {
    it('should display error message', () => {
      render(<Radio error="This is required" />);
      expect(screen.getByText('This is required')).toBeInTheDocument();
    });

    it('should have aria-invalid when error is present', () => {
      render(<Radio error="Error" />);
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-describedby pointing to error', () => {
      render(<Radio error="Error message" />);
      const radio = screen.getByRole('radio');
      const errorId = radio.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      expect(document.getElementById(errorId!)).toHaveTextContent('Error message');
    });

    it('should have role alert on error message', () => {
      render(<Radio error="Error" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Error');
    });
  });

  describe('Hint Text', () => {
    it('should display hint text', () => {
      render(<Radio hint="Select this option" />);
      expect(screen.getByText('Select this option')).toBeInTheDocument();
    });

    it('should have aria-describedby pointing to hint', () => {
      render(<Radio hint="Hint text" />);
      const radio = screen.getByRole('radio');
      const hintId = radio.getAttribute('aria-describedby');
      expect(hintId).toBeTruthy();
      expect(document.getElementById(hintId!)).toHaveTextContent('Hint text');
    });

    it('should not display hint when error is present', () => {
      render(<Radio hint="Hint" error="Error" />);
      expect(screen.queryByText('Hint')).not.toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper focus styles class', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toHaveClass(
        'focus-visible:ring-primary-500',
        'focus-visible:ring-2'
      );
    });

    it('should support custom id', () => {
      render(<Radio id="custom-id" label="Custom" />);
      expect(screen.getByRole('radio')).toHaveAttribute('id', 'custom-id');
      expect(screen.getByText('Custom')).toHaveAttribute('for', 'custom-id');
    });

    it('should support name attribute', () => {
      render(<Radio name="options" />);
      expect(screen.getByRole('radio')).toHaveAttribute('name', 'options');
    });

    it('should support value attribute', () => {
      render(<Radio value="option1" />);
      expect(screen.getByRole('radio')).toHaveAttribute('value', 'option1');
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to container', () => {
      const { container } = render(<Radio className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('ForwardRef', () => {
    it('should forward ref to input element', () => {
      const ref = vi.fn();
      render(<Radio ref={ref} />);
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
    });
  });
});
