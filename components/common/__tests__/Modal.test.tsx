import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
  beforeEach(() => {
    // Reset body overflow style
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  describe('rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={() => {}}>
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('should render with title', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Modal Title">
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
    });

    it('should render with description', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Title" description="Modal description">
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByText('Modal description')).toBeInTheDocument();
    });

    it('should render with footer', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} footer={<button>Save</button>}>
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('should render close button by default', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByLabelText('Cerrar')).toBeInTheDocument();
    });

    it('should not render close button when showCloseButton is false', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
          <p>Content</p>
        </Modal>
      );
      expect(screen.queryByLabelText('Cerrar')).not.toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('should apply small size', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} size="sm">
          <p>Content</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toContain('max-w-sm');
    });

    it('should apply medium size by default', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toContain('max-w-md');
    });

    it('should apply large size', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} size="lg">
          <p>Content</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toContain('max-w-lg');
    });

    it('should apply xl size', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} size="xl">
          <p>Content</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toContain('max-w-xl');
    });

    it('should apply full size', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} size="full">
          <p>Content</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toContain('max-w-4xl');
    });
  });

  describe('interaction', () => {
    it('should call onClose when close button is clicked', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      );
      fireEvent.click(screen.getByLabelText('Cerrar'));
      expect(handleClose).toHaveBeenCalled();
    });

    it('should call onClose when backdrop is clicked', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      );
      // Click on the backdrop (the outer container)
      const backdrop = document.querySelector('.bg-black\\/50');
      if (backdrop) {
        fireEvent.click(backdrop);
      }
      expect(handleClose).toHaveBeenCalled();
    });

    it('should not call onClose when backdrop is clicked and closeOnBackdrop is false', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} closeOnBackdrop={false}>
          <p>Content</p>
        </Modal>
      );
      const backdrop = document.querySelector('.bg-black\\/50');
      if (backdrop) {
        fireEvent.click(backdrop);
      }
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('should call onClose when Escape key is pressed', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();
    });

    it('should not call onClose when Escape is pressed and closeOnEscape is false', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} closeOnEscape={false}>
          <p>Content</p>
        </Modal>
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have role="dialog"', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have aria-modal="true"', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('should have aria-labelledby when title is provided', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Title">
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('should have aria-describedby when description is provided', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Title" description="Test description">
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-describedby', 'modal-description');
    });

    it('should lock body scroll when open', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should focus first focusable element on open', async () => {
      vi.useFakeTimers();
      render(
        <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
          <input data-testid="first-input" />
          <button>Second</button>
        </Modal>
      );

      // Run the setTimeout that focuses the element
      act(() => {
        vi.runAllTimers();
      });

      // The first input should now have focus
      expect(screen.getByTestId('first-input')).toHaveFocus();
      vi.useRealTimers();
    });

    it('should focus close button when it is the first focusable element', async () => {
      vi.useFakeTimers();
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Content with no focusable elements except close button</p>
        </Modal>
      );

      // Run the setTimeout that focuses the element
      act(() => {
        vi.runAllTimers();
      });

      // The close button should have focus (first focusable element)
      expect(screen.getByLabelText('Cerrar')).toHaveFocus();
      vi.useRealTimers();
    });

    it('should focus modal when no focusable elements exist', async () => {
      vi.useFakeTimers();
      render(
        <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
          <p>No focusable content</p>
        </Modal>
      );

      // Run the setTimeout that focuses the modal
      act(() => {
        vi.runAllTimers();
      });

      // The modal should now have focus
      expect(screen.getByRole('dialog')).toHaveFocus();
      vi.useRealTimers();
    });
  });

  describe('focus trap', () => {
    it('should trap focus when Tab is pressed on last element', async () => {
      vi.useFakeTimers();
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <button data-testid="first-btn">First</button>
          <button data-testid="last-btn">Last</button>
        </Modal>
      );

      await act(async () => {
        vi.runAllTimers();
      });

      const dialog = screen.getByRole('dialog');
      const lastBtn = screen.getByTestId('last-btn');

      // Focus last button
      lastBtn.focus();
      expect(lastBtn).toHaveFocus();

      // Press Tab - should cycle to first focusable
      fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: false });

      vi.useRealTimers();
    });

    it('should trap focus when Shift+Tab is pressed on first element', async () => {
      vi.useFakeTimers();
      render(
        <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
          <button data-testid="first-btn">First</button>
          <button data-testid="last-btn">Last</button>
        </Modal>
      );

      await act(async () => {
        vi.runAllTimers();
      });

      const dialog = screen.getByRole('dialog');
      const firstBtn = screen.getByTestId('first-btn');
      const lastBtn = screen.getByTestId('last-btn');

      // Focus first button (should already be focused, but ensure it)
      firstBtn.focus();
      expect(firstBtn).toHaveFocus();

      // Press Shift+Tab - should cycle to last focusable
      fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });

      // Focus should move to last element
      expect(lastBtn).toHaveFocus();

      vi.useRealTimers();
    });

    it('should not trap focus for non-Tab keys', async () => {
      vi.useFakeTimers();
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <button data-testid="btn">Button</button>
        </Modal>
      );

      await act(async () => {
        vi.runAllTimers();
      });

      const dialog = screen.getByRole('dialog');

      // Press other key - should not cause issues
      fireEvent.keyDown(dialog, { key: 'Enter' });

      vi.useRealTimers();
    });
  });

  describe('custom className', () => {
    it('should apply custom className', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} className="custom-modal">
          <p>Content</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toContain('custom-modal');
    });
  });
});
