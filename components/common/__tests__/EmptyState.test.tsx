import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from '../EmptyState';
import { ShoppingCart, Plus } from 'lucide-react';

describe('EmptyState', () => {
  describe('Rendering', () => {
    it('should render title', () => {
      render(<EmptyState title="No hay productos" />);
      expect(screen.getByText('No hay productos')).toBeInTheDocument();
    });

    it('should render description', () => {
      render(<EmptyState title="No hay productos" description="Agrega productos a tu carrito" />);
      expect(screen.getByText('Agrega productos a tu carrito')).toBeInTheDocument();
    });

    it('should render default icon when none provided', () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render custom icon', () => {
      render(
        <EmptyState title="Carrito vacío" icon={<ShoppingCart data-testid="custom-icon" />} />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('should render primary action button', () => {
      const handleClick = vi.fn();
      render(
        <EmptyState title="No hay productos" action={{ label: 'Agregar', onClick: handleClick }} />
      );
      expect(screen.getByRole('button', { name: 'Agregar' })).toBeInTheDocument();
    });

    it('should call onClick when primary action is clicked', () => {
      const handleClick = vi.fn();
      render(
        <EmptyState title="No hay productos" action={{ label: 'Agregar', onClick: handleClick }} />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should render action as link when href is provided', () => {
      render(
        <EmptyState
          title="No hay productos"
          action={{ label: 'Ver productos', href: '/productos' }}
        />
      );
      const link = screen.getByRole('link', { name: 'Ver productos' });
      expect(link).toHaveAttribute('href', '/productos');
    });

    it('should render secondary action', () => {
      render(
        <EmptyState
          title="No hay productos"
          action={{ label: 'Primary' }}
          secondaryAction={{ label: 'Secondary' }}
        />
      );
      expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
    });

    it('should render action icon', () => {
      render(
        <EmptyState
          title="No hay productos"
          action={{ label: 'Agregar', icon: <Plus data-testid="action-icon" /> }}
        />
      );
      expect(screen.getByTestId('action-icon')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      const { container } = render(<EmptyState title="Empty" size="sm" />);
      expect(container.querySelector('.py-8')).toBeInTheDocument();
    });

    it('should render medium size by default', () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.querySelector('.py-12')).toBeInTheDocument();
    });

    it('should render large size', () => {
      const { container } = render(<EmptyState title="Empty" size="lg" />);
      expect(container.querySelector('.py-16')).toBeInTheDocument();
    });
  });

  describe('Bordered', () => {
    it('should not have border by default', () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.querySelector('.border-dashed')).not.toBeInTheDocument();
    });

    it('should have border when bordered is true', () => {
      const { container } = render(<EmptyState title="Empty" bordered />);
      expect(container.querySelector('.border-dashed')).toBeInTheDocument();
    });
  });

  describe('Children', () => {
    it('should render children', () => {
      render(
        <EmptyState title="Empty">
          <p data-testid="custom-content">Extra content</p>
        </EmptyState>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(<EmptyState title="Empty" className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
