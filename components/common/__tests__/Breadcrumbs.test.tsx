import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from '../Breadcrumbs';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('Breadcrumbs', () => {
  describe('Rendering', () => {
    it('should render a navigation element', () => {
      render(<Breadcrumbs items={[{ label: 'Home' }]} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should have Breadcrumb aria-label', () => {
      render(<Breadcrumbs items={[{ label: 'Home' }]} />);
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb');
    });

    it('should render single item', () => {
      render(<Breadcrumbs items={[{ label: 'Home' }]} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render multiple items', () => {
      render(
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Artesanías' },
          ]}
        />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Artesanías')).toBeInTheDocument();
    });
  });

  describe('Links', () => {
    it('should render items with href as links', () => {
      render(<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Current' }]} />);
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should render last item as text (not link)', () => {
      render(
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Current', href: '/current' },
          ]}
        />
      );
      const currentItem = screen.getByText('Current');
      expect(currentItem.tagName.toLowerCase()).toBe('span');
    });

    it('should render item without href as text', () => {
      render(
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'No Link' }, { label: 'Current' }]}
        />
      );
      const noLinkItem = screen.getByText('No Link');
      expect(noLinkItem.tagName.toLowerCase()).toBe('span');
    });
  });

  describe('Separators', () => {
    it('should not show separator before first item', () => {
      const { container } = render(
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
      );
      const firstItem = container.querySelector('div');
      const svgInFirst = firstItem?.querySelector('svg');
      expect(svgInFirst).not.toBeInTheDocument();
    });

    it('should show separators between items', () => {
      const { container } = render(
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Current' },
          ]}
        />
      );
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBe(2); // Two separators for three items
    });
  });

  describe('Styling', () => {
    it('should apply link styles to clickable items', () => {
      render(<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Current' }]} />);
      const homeLink = screen.getByText('Home');
      expect(homeLink).toHaveClass('text-gray-600');
    });

    it('should apply current item styles to last item', () => {
      render(<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Current' }]} />);
      const currentItem = screen.getByText('Current');
      expect(currentItem).toHaveClass('text-gray-900', 'font-medium');
    });
  });

  describe('Single Item', () => {
    it('should render single item as text', () => {
      render(<Breadcrumbs items={[{ label: 'Home' }]} />);
      const item = screen.getByText('Home');
      expect(item.tagName.toLowerCase()).toBe('span');
    });

    it('should apply current styles to single item', () => {
      render(<Breadcrumbs items={[{ label: 'Home' }]} />);
      const item = screen.getByText('Home');
      expect(item).toHaveClass('text-gray-900', 'font-medium');
    });
  });

  describe('Empty State', () => {
    it('should render empty navigation when no items', () => {
      render(<Breadcrumbs items={[]} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('Special Characters', () => {
    it('should handle items with special characters', () => {
      render(
        <Breadcrumbs
          items={[{ label: 'Inicio & Más', href: '/' }, { label: 'Cerámica "Talavera"' }]}
        />
      );
      expect(screen.getByText('Inicio & Más')).toBeInTheDocument();
      expect(screen.getByText('Cerámica "Talavera"')).toBeInTheDocument();
    });

    it('should handle items with accents', () => {
      render(
        <Breadcrumbs
          items={[{ label: 'Categorías', href: '/categorias' }, { label: 'Joyería Artesanal' }]}
        />
      );
      expect(screen.getByText('Categorías')).toBeInTheDocument();
      expect(screen.getByText('Joyería Artesanal')).toBeInTheDocument();
    });
  });
});
