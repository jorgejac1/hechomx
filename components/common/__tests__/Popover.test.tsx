import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Popover from '../Popover';

describe('Popover', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('renders trigger element', () => {
      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('does not show popover by default', () => {
      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders complex content', () => {
      render(
        <Popover
          content={
            <div>
              <strong>Title</strong>
              <p>Description</p>
            </div>
          }
        >
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toContainHTML('<strong>Title</strong>');
    });
  });

  describe('Click Trigger (Default)', () => {
    it('shows popover on click', () => {
      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Popover content')).toBeInTheDocument();
    });

    it('hides popover on second click (toggle)', () => {
      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      const button = screen.getByRole('button');

      fireEvent.click(button);
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      fireEvent.click(button);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Hover Trigger', () => {
    it('shows popover on mouse enter after delay', () => {
      render(
        <Popover content="Popover content" trigger="hover" delayShow={200}>
          <button>Hover me</button>
        </Popover>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));

      // Not visible yet
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      // Advance timers
      act(() => vi.advanceTimersByTime(200));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('hides popover on mouse leave after delay', () => {
      render(
        <Popover content="Popover content" trigger="hover" delayShow={0} delayHide={100}>
          <button>Hover me</button>
        </Popover>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      fireEvent.mouseLeave(screen.getByRole('button'));

      // Still visible
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Hidden after delay
      act(() => vi.advanceTimersByTime(100));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('keeps popover open when hovering over it', () => {
      render(
        <Popover content="Popover content" trigger="hover" delayShow={0} delayHide={100}>
          <button>Hover me</button>
        </Popover>
      );

      // Show popover
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Leave trigger
      fireEvent.mouseLeave(screen.getByRole('button'));

      // Enter popover before delay completes
      act(() => vi.advanceTimersByTime(50));
      fireEvent.mouseEnter(screen.getByRole('dialog'));

      // Advance past original delay
      act(() => vi.advanceTimersByTime(100));

      // Should still be visible
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Click Outside', () => {
    it('closes on click outside by default', async () => {
      vi.useRealTimers();

      render(
        <div>
          <button data-testid="outside">Outside</button>
          <Popover content="Popover content">
            <button>Click me</button>
          </Popover>
        </div>
      );

      fireEvent.click(screen.getByRole('button', { name: 'Click me' }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      fireEvent.mouseDown(screen.getByTestId('outside'));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });

      vi.useFakeTimers();
    });

    it('does not close on click outside when closeOnClickOutside is false', async () => {
      vi.useRealTimers();

      render(
        <div>
          <button data-testid="outside">Outside</button>
          <Popover content="Popover content" closeOnClickOutside={false}>
            <button>Click me</button>
          </Popover>
        </div>
      );

      fireEvent.click(screen.getByRole('button', { name: 'Click me' }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      fireEvent.mouseDown(screen.getByTestId('outside'));

      // Should still be visible
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      vi.useFakeTimers();
    });
  });

  describe('Escape Key', () => {
    it('closes on Escape key by default', async () => {
      vi.useRealTimers();

      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });

      vi.useFakeTimers();
    });

    it('does not close on Escape when closeOnEscape is false', async () => {
      vi.useRealTimers();

      render(
        <Popover content="Popover content" closeOnEscape={false}>
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      fireEvent.keyDown(document, { key: 'Escape' });

      // Should still be visible
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      vi.useFakeTimers();
    });
  });

  describe('Disabled State', () => {
    it('does not show popover when disabled', () => {
      render(
        <Popover content="Popover content" disabled>
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('does not show on hover when disabled', () => {
      render(
        <Popover content="Popover content" trigger="hover" disabled delayShow={0}>
          <button>Hover me</button>
        </Popover>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(200));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('respects isOpen prop', () => {
      const { rerender } = render(
        <Popover content="Popover content" isOpen={false} onOpenChange={() => {}}>
          <button>Click me</button>
        </Popover>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      rerender(
        <Popover content="Popover content" isOpen={true} onOpenChange={() => {}}>
          <button>Click me</button>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('calls onOpenChange when triggered', () => {
      const onOpenChange = vi.fn();

      render(
        <Popover content="Popover content" isOpen={false} onOpenChange={onOpenChange}>
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('calls onOpenChange with false when closing', async () => {
      vi.useRealTimers();
      const onOpenChange = vi.fn();

      render(
        <div>
          <button data-testid="outside">Outside</button>
          <Popover content="Popover content" isOpen={true} onOpenChange={onOpenChange}>
            <button>Click me</button>
          </Popover>
        </div>
      );

      fireEvent.mouseDown(screen.getByTestId('outside'));

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });

      vi.useFakeTimers();
    });
  });

  describe('Placements', () => {
    it('applies bottom placement styles (default)', () => {
      render(
        <Popover content="Popover content" placement="bottom">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveClass('top-full', 'mt-2');
    });

    it('applies top placement styles', () => {
      render(
        <Popover content="Popover content" placement="top">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveClass('bottom-full', 'mb-2');
    });

    it('applies left placement styles', () => {
      render(
        <Popover content="Popover content" placement="left">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveClass('right-full', 'mr-2');
    });

    it('applies right placement styles', () => {
      render(
        <Popover content="Popover content" placement="right">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveClass('left-full', 'ml-2');
    });

    it('applies bottom-start placement styles', () => {
      render(
        <Popover content="Popover content" placement="bottom-start">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveClass('top-full', 'left-0', 'mt-2');
    });

    it('applies bottom-end placement styles', () => {
      render(
        <Popover content="Popover content" placement="bottom-end">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveClass('top-full', 'right-0', 'mt-2');
    });
  });

  describe('Header and Footer', () => {
    it('renders header when provided', () => {
      render(
        <Popover content="Popover content" header="Header Title">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByText('Header Title')).toBeInTheDocument();
    });

    it('renders footer when provided', () => {
      render(
        <Popover content="Popover content" footer={<button>Footer Action</button>}>
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button', { name: 'Footer Action' })).toBeInTheDocument();
    });

    it('renders both header and footer', () => {
      render(
        <Popover content="Popover content" header="Header" footer="Footer">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Popover content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('Arrow', () => {
    it('renders arrow by default', () => {
      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      const popover = screen.getByRole('dialog');
      expect(popover.querySelector('.rotate-45')).toBeInTheDocument();
    });

    it('does not render arrow when showArrow is false', () => {
      render(
        <Popover content="Popover content" showArrow={false}>
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      const popover = screen.getByRole('dialog');
      expect(popover.querySelector('.rotate-45')).not.toBeInTheDocument();
    });
  });

  describe('Width', () => {
    it('applies default width', () => {
      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveStyle({ width: '280px' });
    });

    it('applies custom width as number', () => {
      render(
        <Popover content="Popover content" width={400}>
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveStyle({ width: '400px' });
    });

    it('applies custom width as string', () => {
      render(
        <Popover content="Popover content" width="100%">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveStyle({ width: '100%' });
    });
  });

  describe('Accessibility', () => {
    it('has role="dialog" on popover element', () => {
      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-haspopup on trigger', () => {
      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      const triggerWrapper = screen.getByRole('button').closest('[aria-haspopup]');
      expect(triggerWrapper).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('has aria-expanded attribute on trigger', () => {
      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      const triggerWrapper = screen.getByRole('button').closest('[aria-expanded]');
      expect(triggerWrapper).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(screen.getByRole('button'));

      expect(triggerWrapper).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-controls linking trigger to popover when open', () => {
      render(
        <Popover content="Popover content">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      const popover = screen.getByRole('dialog');
      const triggerWrapper = screen.getByRole('button').closest('[aria-controls]');
      expect(triggerWrapper).toHaveAttribute('aria-controls', popover.id);
    });
  });

  describe('Custom ClassName', () => {
    it('applies custom className to popover', () => {
      render(
        <Popover content="Popover content" className="custom-popover">
          <button>Click me</button>
        </Popover>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveClass('custom-popover');
    });
  });

  describe('Timeout Cancellation', () => {
    it('cancels show timeout if mouse leaves before delay (hover mode)', () => {
      render(
        <Popover content="Popover content" trigger="hover" delayShow={300}>
          <button>Hover me</button>
        </Popover>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));

      // Leave before delay completes
      act(() => vi.advanceTimersByTime(100));
      fireEvent.mouseLeave(screen.getByRole('button'));

      // Advance past the original delay
      act(() => vi.advanceTimersByTime(400));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
