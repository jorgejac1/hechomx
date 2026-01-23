import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('renders trigger element', () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Hover me</button>
        </Tooltip>
      );

      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });

    it('does not show tooltip by default', () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Hover me</button>
        </Tooltip>
      );

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('renders complex content', () => {
      render(
        <Tooltip
          content={
            <div>
              <strong>Title</strong>
              <p>Description</p>
            </div>
          }
        >
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(200));

      expect(screen.getByRole('tooltip')).toContainHTML('<strong>Title</strong>');
    });
  });

  describe('Show/Hide on Hover', () => {
    it('shows tooltip on mouse enter after delay', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={200}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));

      // Not visible yet
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // Advance timers
      act(() => vi.advanceTimersByTime(200));

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    });

    it('hides tooltip on mouse leave', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      fireEvent.mouseLeave(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('respects delayShow prop', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={500}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));

      // Not visible at 200ms
      act(() => vi.advanceTimersByTime(200));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // Visible at 500ms
      act(() => vi.advanceTimersByTime(300));
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('respects delayHide prop', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0} delayHide={300}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      fireEvent.mouseLeave(screen.getByRole('button'));

      // Still visible at 100ms
      act(() => vi.advanceTimersByTime(100));
      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      // Hidden at 300ms
      act(() => vi.advanceTimersByTime(200));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('shows immediately when delayShow is 0', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  describe('Show/Hide on Focus', () => {
    it('shows tooltip on focus', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0}>
          <button>Focus me</button>
        </Tooltip>
      );

      fireEvent.focus(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('hides tooltip on blur', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0}>
          <button>Focus me</button>
        </Tooltip>
      );

      fireEvent.focus(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      fireEvent.blur(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Clickable Mode', () => {
    it('shows tooltip on click when clickable', () => {
      render(
        <Tooltip content="Tooltip content" clickable delayShow={0}>
          <button>Click me</button>
        </Tooltip>
      );

      fireEvent.click(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('toggles tooltip on repeated clicks', () => {
      render(
        <Tooltip content="Tooltip content" clickable delayShow={0}>
          <button>Click me</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');

      fireEvent.click(button);
      act(() => vi.advanceTimersByTime(0));
      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      fireEvent.click(button);
      act(() => vi.advanceTimersByTime(0));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('closes on click outside when clickable', async () => {
      vi.useRealTimers();

      render(
        <div>
          <button data-testid="outside">Outside</button>
          <Tooltip content="Tooltip content" clickable delayShow={0}>
            <button>Click me</button>
          </Tooltip>
        </div>
      );

      fireEvent.click(screen.getByRole('button', { name: 'Click me' }));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      fireEvent.mouseDown(screen.getByTestId('outside'));

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });

      vi.useFakeTimers();
    });

    it('does not show on hover when clickable', () => {
      render(
        <Tooltip content="Tooltip content" clickable delayShow={0}>
          <button>Click me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(200));

      // Should not show on hover in clickable mode
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('does not show tooltip when disabled', () => {
      render(
        <Tooltip content="Tooltip content" disabled delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(200));

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('does not show on click when disabled and clickable', () => {
      render(
        <Tooltip content="Tooltip content" disabled clickable delayShow={0}>
          <button>Click me</button>
        </Tooltip>
      );

      fireEvent.click(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Placements', () => {
    it('applies top placement styles (default)', () => {
      render(
        <Tooltip content="Tooltip content" placement="top" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveClass('bottom-full', 'mb-2');
    });

    it('applies bottom placement styles', () => {
      render(
        <Tooltip content="Tooltip content" placement="bottom" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveClass('top-full', 'mt-2');
    });

    it('applies left placement styles', () => {
      render(
        <Tooltip content="Tooltip content" placement="left" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveClass('right-full', 'mr-2');
    });

    it('applies right placement styles', () => {
      render(
        <Tooltip content="Tooltip content" placement="right" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveClass('left-full', 'ml-2');
    });
  });

  describe('Variants', () => {
    it('applies dark variant styles (default)', () => {
      render(
        <Tooltip content="Tooltip content" variant="dark" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveClass('bg-gray-900', 'text-white');
    });

    it('applies light variant styles', () => {
      render(
        <Tooltip content="Tooltip content" variant="light" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveClass('bg-white', 'text-gray-900', 'border');
    });
  });

  describe('Sizes', () => {
    it('applies small size styles', () => {
      render(
        <Tooltip content="Tooltip content" size="sm" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveClass('px-2', 'py-1', 'text-xs');
    });

    it('applies medium size styles (default)', () => {
      render(
        <Tooltip content="Tooltip content" size="md" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('applies large size styles', () => {
      render(
        <Tooltip content="Tooltip content" size="lg" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveClass('px-4', 'py-2', 'text-base');
    });
  });

  describe('Arrow', () => {
    it('renders arrow by default', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip.querySelector('.rotate-45')).toBeInTheDocument();
    });

    it('does not render arrow when arrow is false', () => {
      render(
        <Tooltip content="Tooltip content" arrow={false} delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip.querySelector('.rotate-45')).not.toBeInTheDocument();
    });
  });

  describe('Max Width', () => {
    it('applies default max width', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveStyle({ maxWidth: '250px' });
    });

    it('applies custom max width as number', () => {
      render(
        <Tooltip content="Tooltip content" maxWidth={400} delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveStyle({ maxWidth: '400px' });
    });

    it('applies custom max width as string', () => {
      render(
        <Tooltip content="Tooltip content" maxWidth="100%" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveStyle({ maxWidth: '100%' });
    });
  });

  describe('Escape Key', () => {
    it('hides tooltip on Escape key', async () => {
      vi.useRealTimers();

      render(
        <Tooltip content="Tooltip content" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });

      vi.useFakeTimers();
    });
  });

  describe('Accessibility', () => {
    it('has role="tooltip" on tooltip element', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('has aria-describedby linking trigger to tooltip', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      const tooltip = screen.getByRole('tooltip');
      const triggerWrapper = screen.getByRole('button').closest('[aria-describedby]');
      expect(triggerWrapper).toHaveAttribute('aria-describedby', tooltip.id);
    });

    it('removes aria-describedby when tooltip is hidden', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      const triggerWrapper = screen.getByRole('button').closest('[class*="inline-block"]');

      // Initially no aria-describedby
      expect(triggerWrapper).not.toHaveAttribute('aria-describedby');

      // Show tooltip
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(triggerWrapper).toHaveAttribute('aria-describedby');

      // Hide tooltip
      fireEvent.mouseLeave(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(triggerWrapper).not.toHaveAttribute('aria-describedby');
    });
  });

  describe('Custom ClassName', () => {
    it('applies custom className to tooltip', () => {
      render(
        <Tooltip content="Tooltip content" className="custom-tooltip" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('tooltip')).toHaveClass('custom-tooltip');
    });
  });

  describe('Timeout Cancellation', () => {
    it('cancels show timeout if mouse leaves before delay', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={300}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));

      // Leave before delay completes
      act(() => vi.advanceTimersByTime(100));
      fireEvent.mouseLeave(screen.getByRole('button'));

      // Advance past the original delay
      act(() => vi.advanceTimersByTime(400));

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('cancels hide timeout if mouse re-enters during delay', () => {
      render(
        <Tooltip content="Tooltip content" delayShow={0} delayHide={300}>
          <button>Hover me</button>
        </Tooltip>
      );

      // Show tooltip
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      // Start hiding
      fireEvent.mouseLeave(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(100));

      // Re-enter before hide completes
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      // Advance past the original delay
      act(() => vi.advanceTimersByTime(400));

      // Should still be visible
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });
});
