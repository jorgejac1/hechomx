import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleSwitch from '../ToggleSwitch';

describe('ToggleSwitch', () => {
  const defaultProps = {
    enabled: false,
    onChange: vi.fn(),
    label: 'Test Toggle',
  };

  describe('Rendering', () => {
    it('should render a toggle switch', () => {
      render(<ToggleSwitch {...defaultProps} />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('should render label', () => {
      render(<ToggleSwitch {...defaultProps} label="My Toggle" />);
      expect(screen.getByText('My Toggle')).toBeInTheDocument();
    });

    it('should render description when provided', () => {
      render(<ToggleSwitch {...defaultProps} description="Toggle description" />);
      expect(screen.getByText('Toggle description')).toBeInTheDocument();
    });

    it('should not render description when not provided', () => {
      render(<ToggleSwitch {...defaultProps} />);
      expect(screen.queryByText('Toggle description')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should be off when enabled is false', () => {
      render(<ToggleSwitch {...defaultProps} enabled={false} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('should be on when enabled is true', () => {
      render(<ToggleSwitch {...defaultProps} enabled={true} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('should apply enabled background color', () => {
      render(<ToggleSwitch {...defaultProps} enabled={true} />);
      expect(screen.getByRole('switch')).toHaveClass('bg-purple-600');
    });

    it('should apply disabled background color', () => {
      render(<ToggleSwitch {...defaultProps} enabled={false} />);
      expect(screen.getByRole('switch')).toHaveClass('bg-gray-300');
    });
  });

  describe('Sizes', () => {
    it('should apply sm size', () => {
      render(<ToggleSwitch {...defaultProps} size="sm" />);
      expect(screen.getByRole('switch')).toHaveClass('w-8', 'h-4');
    });

    it('should apply md size by default', () => {
      render(<ToggleSwitch {...defaultProps} />);
      expect(screen.getByRole('switch')).toHaveClass('w-12', 'h-6');
    });

    it('should apply lg size', () => {
      render(<ToggleSwitch {...defaultProps} size="lg" />);
      expect(screen.getByRole('switch')).toHaveClass('w-14', 'h-7');
    });
  });

  describe('Thumb Animation', () => {
    it('should position thumb at start when disabled', () => {
      const { container } = render(<ToggleSwitch {...defaultProps} enabled={false} />);
      const thumb = container.querySelector('span.absolute');
      expect(thumb).toHaveClass('translate-x-0');
    });

    it('should translate thumb when enabled (md size)', () => {
      const { container } = render(<ToggleSwitch {...defaultProps} enabled={true} size="md" />);
      const thumb = container.querySelector('span.absolute');
      expect(thumb).toHaveClass('translate-x-6');
    });

    it('should translate thumb when enabled (sm size)', () => {
      const { container } = render(<ToggleSwitch {...defaultProps} enabled={true} size="sm" />);
      const thumb = container.querySelector('span.absolute');
      expect(thumb).toHaveClass('translate-x-4');
    });

    it('should translate thumb when enabled (lg size)', () => {
      const { container } = render(<ToggleSwitch {...defaultProps} enabled={true} size="lg" />);
      const thumb = container.querySelector('span.absolute');
      expect(thumb).toHaveClass('translate-x-7');
    });
  });

  describe('Interactivity', () => {
    it('should call onChange with true when clicked while disabled', () => {
      const handleChange = vi.fn();
      render(<ToggleSwitch {...defaultProps} enabled={false} onChange={handleChange} />);
      fireEvent.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should call onChange with false when clicked while enabled', () => {
      const handleChange = vi.fn();
      render(<ToggleSwitch {...defaultProps} enabled={true} onChange={handleChange} />);
      fireEvent.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('should toggle state on click', () => {
      const handleChange = vi.fn();
      const { rerender } = render(
        <ToggleSwitch {...defaultProps} enabled={false} onChange={handleChange} />
      );

      fireEvent.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledWith(true);

      // Simulate state update
      rerender(<ToggleSwitch {...defaultProps} enabled={true} onChange={handleChange} />);

      fireEvent.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Disabled State', () => {
    it('should have disabled attribute when disabled', () => {
      render(<ToggleSwitch {...defaultProps} disabled />);
      expect(screen.getByRole('switch')).toBeDisabled();
    });

    it('should apply disabled styles', () => {
      render(<ToggleSwitch {...defaultProps} disabled />);
      expect(screen.getByRole('switch')).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('should not apply disabled styles when not disabled', () => {
      render(<ToggleSwitch {...defaultProps} disabled={false} />);
      expect(screen.getByRole('switch')).toHaveClass('cursor-pointer');
    });

    it('should not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(<ToggleSwitch {...defaultProps} onChange={handleChange} disabled />);
      fireEvent.click(screen.getByRole('switch'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have switch role', () => {
      render(<ToggleSwitch {...defaultProps} />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('should have aria-checked attribute', () => {
      render(<ToggleSwitch {...defaultProps} enabled={true} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('should have aria-label', () => {
      render(<ToggleSwitch {...defaultProps} label="Toggle Feature" />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-label', 'Toggle Feature');
    });

    it('should be button type', () => {
      render(<ToggleSwitch {...defaultProps} />);
      expect(screen.getByRole('switch')).toHaveAttribute('type', 'button');
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to container', () => {
      const { container } = render(<ToggleSwitch {...defaultProps} className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should merge with default classes', () => {
      const { container } = render(<ToggleSwitch {...defaultProps} className="custom-class" />);
      expect(container.firstChild).toHaveClass('flex', 'items-center', 'custom-class');
    });
  });

  describe('Layout', () => {
    it('should have flex layout', () => {
      const { container } = render(<ToggleSwitch {...defaultProps} />);
      expect(container.firstChild).toHaveClass('flex', 'items-center', 'justify-between');
    });

    it('should have border styling', () => {
      const { container } = render(<ToggleSwitch {...defaultProps} />);
      expect(container.firstChild).toHaveClass('border-b', 'border-gray-100');
    });

    it('should have padding', () => {
      const { container } = render(<ToggleSwitch {...defaultProps} />);
      expect(container.firstChild).toHaveClass('py-4');
    });
  });
});
