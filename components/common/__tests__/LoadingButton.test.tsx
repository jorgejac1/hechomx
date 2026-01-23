import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Send } from 'lucide-react';
import LoadingButton from '../LoadingButton';

describe('LoadingButton', () => {
  describe('rendering', () => {
    it('should render children content', () => {
      render(<LoadingButton>Submit</LoadingButton>);
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('should render as a button', () => {
      render(<LoadingButton>Submit</LoadingButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<LoadingButton className="custom-class">Submit</LoadingButton>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('loading state', () => {
    it('should show loading spinner when isLoading is true', () => {
      render(<LoadingButton isLoading>Submit</LoadingButton>);
      // Loader2 icon should be rendered with animate-spin class
      const button = screen.getByRole('button');
      const spinner = button.querySelector('svg');
      expect(spinner).toBeInTheDocument();
      // SVG className in JSDOM is SVGAnimatedString, use classList or getAttribute
      expect(spinner).toHaveClass('animate-spin');
    });

    it('should be disabled when loading', () => {
      render(<LoadingButton isLoading>Submit</LoadingButton>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should show loadingText when provided and loading', () => {
      render(
        <LoadingButton isLoading loadingText="Submitting...">
          Submit
        </LoadingButton>
      );
      expect(screen.getByText('Submitting...')).toBeInTheDocument();
      expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    });

    it('should show original text when loading but no loadingText provided', () => {
      render(<LoadingButton isLoading>Submit</LoadingButton>);
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('should show original icon when not loading', () => {
      render(<LoadingButton icon={<Send data-testid="send-icon" />}>Send</LoadingButton>);
      expect(screen.getByTestId('send-icon')).toBeInTheDocument();
    });

    it('should replace icon with spinner when loading', () => {
      render(
        <LoadingButton isLoading icon={<Send data-testid="send-icon" />}>
          Send
        </LoadingButton>
      );
      expect(screen.queryByTestId('send-icon')).not.toBeInTheDocument();
      // Spinner should be present
      const button = screen.getByRole('button');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('should render primary variant by default', () => {
      render(<LoadingButton>Submit</LoadingButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-primary-600');
    });

    it('should render secondary variant', () => {
      render(<LoadingButton variant="secondary">Submit</LoadingButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('border-primary-600');
    });

    it('should render ghost variant', () => {
      render(<LoadingButton variant="ghost">Submit</LoadingButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-transparent');
    });

    it('should render outline variant', () => {
      render(<LoadingButton variant="outline">Submit</LoadingButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('border-gray-300');
    });
  });

  describe('sizes', () => {
    it('should render medium size by default', () => {
      render(<LoadingButton>Submit</LoadingButton>);
      const button = screen.getByRole('button');
      // Medium uses responsive classes: px-3 sm:px-4 py-2 sm:py-2
      expect(button.className).toContain('py-2');
      expect(button.className).toContain('px-3');
    });

    it('should render small size', () => {
      render(<LoadingButton size="sm">Submit</LoadingButton>);
      const button = screen.getByRole('button');
      // Small uses responsive classes: px-2 sm:px-3 py-1.5 sm:py-1.5
      expect(button.className).toContain('py-1.5');
    });

    it('should render large size', () => {
      render(<LoadingButton size="lg">Submit</LoadingButton>);
      const button = screen.getByRole('button');
      // Large uses responsive classes: px-4 sm:px-6 py-2.5 sm:py-3
      expect(button.className).toContain('py-2.5');
    });
  });

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<LoadingButton disabled>Submit</LoadingButton>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should be disabled when both disabled and isLoading are true', () => {
      render(
        <LoadingButton disabled isLoading>
          Submit
        </LoadingButton>
      );
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should not call onClick when disabled', () => {
      const onClick = vi.fn();
      render(
        <LoadingButton disabled onClick={onClick}>
          Submit
        </LoadingButton>
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', () => {
      const onClick = vi.fn();
      render(
        <LoadingButton isLoading onClick={onClick}>
          Submit
        </LoadingButton>
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('click handling', () => {
    it('should call onClick when clicked', () => {
      const onClick = vi.fn();
      render(<LoadingButton onClick={onClick}>Submit</LoadingButton>);
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('button type', () => {
    it('should have type="button" by default', () => {
      render(<LoadingButton>Submit</LoadingButton>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('should have type="submit" when specified', () => {
      render(<LoadingButton type="submit">Submit</LoadingButton>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('should have type="reset" when specified', () => {
      render(<LoadingButton type="reset">Reset</LoadingButton>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
  });

  describe('fullWidth', () => {
    it('should not be full width by default', () => {
      render(<LoadingButton>Submit</LoadingButton>);
      const button = screen.getByRole('button');
      expect(button.className).not.toContain('w-full');
    });

    it('should be full width when specified', () => {
      render(<LoadingButton fullWidth>Submit</LoadingButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('w-full');
    });
  });

  describe('icon position', () => {
    it('should render icon on left by default', () => {
      render(<LoadingButton icon={<Send data-testid="icon" />}>Send</LoadingButton>);
      const icon = screen.getByTestId('icon');
      const text = screen.getByText('Send');
      // Icon should come before text
      expect(icon.compareDocumentPosition(text)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it('should render icon on right when specified', () => {
      render(
        <LoadingButton icon={<Send data-testid="icon" />} iconPosition="right">
          Send
        </LoadingButton>
      );
      const icon = screen.getByTestId('icon');
      const text = screen.getByText('Send');
      // Text should come before icon
      expect(text.compareDocumentPosition(icon.closest('span')!)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
  });

  describe('link behavior', () => {
    it('should render as link when href is provided and not loading', () => {
      render(<LoadingButton href="/submit">Go</LoadingButton>);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/submit');
    });

    it('should render as button when loading even with href', () => {
      render(
        <LoadingButton href="/submit" isLoading>
          Go
        </LoadingButton>
      );
      // Should render as button, not link
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should accept ariaLabel', () => {
      render(<LoadingButton ariaLabel="Submit form">Submit</LoadingButton>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Submit form');
    });

    it('should have aria-hidden on spinner', () => {
      render(<LoadingButton isLoading>Submit</LoadingButton>);
      const spinner = screen.getByRole('button').querySelector('svg');
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('spinner sizes', () => {
    it('should use correct spinner size for small button', () => {
      render(
        <LoadingButton isLoading size="sm">
          Submit
        </LoadingButton>
      );
      const spinner = screen.getByRole('button').querySelector('svg');
      // Spinner is wrapped in a span with the size class
      expect(spinner?.closest('span')?.className).toContain('w-4');
      expect(spinner?.closest('span')?.className).toContain('h-4');
    });

    it('should use correct spinner size for medium button', () => {
      render(
        <LoadingButton isLoading size="md">
          Submit
        </LoadingButton>
      );
      const spinner = screen.getByRole('button').querySelector('svg');
      expect(spinner?.closest('span')?.className).toContain('w-5');
      expect(spinner?.closest('span')?.className).toContain('h-5');
    });

    it('should use correct spinner size for large button', () => {
      render(
        <LoadingButton isLoading size="lg">
          Submit
        </LoadingButton>
      );
      const spinner = screen.getByRole('button').querySelector('svg');
      expect(spinner?.closest('span')?.className).toContain('w-6');
      expect(spinner?.closest('span')?.className).toContain('h-6');
    });
  });
});
