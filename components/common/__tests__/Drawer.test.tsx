import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Drawer from '../Drawer';

describe('Drawer', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('should render when open', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <p>Drawer content</p>
        </Drawer>
      );
      expect(screen.getByText('Drawer content')).toBeInTheDocument();
    });

    it('should render title when provided', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} title="Mi Drawer">
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByText('Mi Drawer')).toBeInTheDocument();
    });

    it('should have dialog role', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have aria-modal attribute', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('Close Button', () => {
    it('should show close button by default', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByRole('button', { name: /cerrar/i })).toBeInTheDocument();
    });

    it('should hide close button when showCloseButton is false', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} showCloseButton={false}>
          <p>Content</p>
        </Drawer>
      );
      expect(screen.queryByRole('button', { name: /cerrar/i })).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const handleClose = vi.fn();
      render(
        <Drawer isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Drawer>
      );
      fireEvent.click(screen.getByRole('button', { name: /cerrar/i }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Overlay', () => {
    it('should show overlay by default', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.bg-black\\/50')).toBeInTheDocument();
    });

    it('should hide overlay when showOverlay is false', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} showOverlay={false}>
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.bg-black\\/50')).not.toBeInTheDocument();
    });

    it('should call onClose when overlay is clicked', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Drawer isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Drawer>
      );
      const overlay = container.querySelector('.bg-black\\/50');
      fireEvent.click(overlay!);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should not close when closeOnOverlayClick is false', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Drawer isOpen={true} onClose={handleClose} closeOnOverlayClick={false}>
          <p>Content</p>
        </Drawer>
      );
      const overlay = container.querySelector('.bg-black\\/50');
      fireEvent.click(overlay!);
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Escape Key', () => {
    it('should close on Escape key by default', () => {
      const handleClose = vi.fn();
      render(
        <Drawer isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Drawer>
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should not close on Escape when closeOnEscape is false', () => {
      const handleClose = vi.fn();
      render(
        <Drawer isOpen={true} onClose={handleClose} closeOnEscape={false}>
          <p>Content</p>
        </Drawer>
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Positions', () => {
    it('should render on right by default', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.right-0')).toBeInTheDocument();
    });

    it('should render on left', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} position="left">
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.left-0')).toBeInTheDocument();
    });

    it('should render on top', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} position="top">
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.top-0')).toBeInTheDocument();
    });

    it('should render on bottom', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} position="bottom">
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.bottom-0')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply medium size by default', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.w-80')).toBeInTheDocument();
    });

    it('should apply small size', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} size="sm">
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.w-64')).toBeInTheDocument();
    });

    it('should apply large size', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} size="lg">
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.w-96')).toBeInTheDocument();
    });

    it('should apply full size', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} size="full">
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.w-full')).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('should render footer when provided', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} footer={<button>Save</button>}>
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });
  });

  describe('Body Scroll', () => {
    it('should prevent body scroll when open', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Drawer>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to drawer panel', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} className="custom-drawer">
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toHaveClass('custom-drawer');
    });
  });

  describe('Transform States', () => {
    it('should apply open transform when open', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.translate-x-0')).toBeInTheDocument();
    });

    it('should apply closed transform when closed', () => {
      const { container } = render(
        <Drawer isOpen={false} onClose={() => {}}>
          <p>Content</p>
        </Drawer>
      );
      expect(container.querySelector('.translate-x-full')).toBeInTheDocument();
    });
  });
});
