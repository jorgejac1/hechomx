import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pagination from '../Pagination';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('Pagination', () => {
  describe('Rendering', () => {
    it('should not render when totalPages is 1', () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={1} baseUrl="/products" />
      );
      // The Suspense fallback might render, but content should be empty
      expect(container.querySelector('a')).not.toBeInTheDocument();
    });

    it('should not render when totalPages is 0', () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={0} baseUrl="/products" />
      );
      expect(container.querySelector('a')).not.toBeInTheDocument();
    });

    it('should render previous and next buttons', () => {
      render(<Pagination currentPage={2} totalPages={5} baseUrl="/products" />);
      expect(screen.getByText('Anterior')).toBeInTheDocument();
      expect(screen.getByText('Siguiente')).toBeInTheDocument();
    });

    it('should render page numbers on desktop', () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={5} baseUrl="/products" />
      );
      // Page numbers are in links (desktop view) - check within the hidden sm:flex container
      const desktopNav = container.querySelector('.sm\\:flex');
      expect(desktopNav).toBeInTheDocument();
      expect(desktopNav?.textContent).toContain('1');
      expect(desktopNav?.textContent).toContain('2');
      expect(desktopNav?.textContent).toContain('5');
    });
  });

  describe('Navigation', () => {
    it('should disable previous button on first page', () => {
      render(<Pagination currentPage={1} totalPages={5} baseUrl="/products" />);
      const prevButton = screen.getByText('Anterior');
      expect(prevButton).toHaveClass('pointer-events-none');
      expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('should disable next button on last page', () => {
      render(<Pagination currentPage={5} totalPages={5} baseUrl="/products" />);
      const nextButton = screen.getByText('Siguiente');
      expect(nextButton).toHaveClass('pointer-events-none');
      expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('should enable both buttons on middle page', () => {
      render(<Pagination currentPage={3} totalPages={5} baseUrl="/products" />);
      const prevButton = screen.getByText('Anterior');
      const nextButton = screen.getByText('Siguiente');
      expect(prevButton).not.toHaveClass('pointer-events-none');
      expect(nextButton).not.toHaveClass('pointer-events-none');
    });
  });

  describe('URL Generation', () => {
    it('should generate correct URL for first page (no pagina param)', () => {
      const { container } = render(
        <Pagination currentPage={2} totalPages={5} baseUrl="/products" />
      );
      const desktopNav = container.querySelector('.sm\\:flex');
      const pageOneLink = desktopNav?.querySelector('a[href="/products"]');
      expect(pageOneLink).toBeInTheDocument();
    });

    it('should generate correct URL for other pages', () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={5} baseUrl="/products" />
      );
      const desktopNav = container.querySelector('.sm\\:flex');
      const pageTwoLink = desktopNav?.querySelector('a[href="/products?pagina=2"]');
      expect(pageTwoLink).toBeInTheDocument();
    });

    it('should link previous button to previous page', () => {
      render(<Pagination currentPage={3} totalPages={5} baseUrl="/products" />);
      const prevButton = screen.getByText('Anterior').closest('a');
      expect(prevButton).toHaveAttribute('href', '/products?pagina=2');
    });

    it('should link next button to next page', () => {
      render(<Pagination currentPage={3} totalPages={5} baseUrl="/products" />);
      const nextButton = screen.getByText('Siguiente').closest('a');
      expect(nextButton).toHaveAttribute('href', '/products?pagina=4');
    });
  });

  describe('Current Page Styling', () => {
    it('should highlight current page', () => {
      const { container } = render(
        <Pagination currentPage={3} totalPages={5} baseUrl="/products" />
      );
      const desktopNav = container.querySelector('.sm\\:flex');
      const currentPageLink = desktopNav?.querySelector('a.bg-primary-600');
      expect(currentPageLink).toBeInTheDocument();
      expect(currentPageLink?.textContent).toBe('3');
    });

    it('should not highlight other pages', () => {
      const { container } = render(
        <Pagination currentPage={3} totalPages={5} baseUrl="/products" />
      );
      const desktopNav = container.querySelector('.sm\\:flex');
      const pageTwoLink = desktopNav?.querySelector('a[href="/products?pagina=2"]');
      expect(pageTwoLink).not.toHaveClass('bg-primary-600');
    });
  });

  describe('Ellipsis', () => {
    it('should show ellipsis for many pages when on first page', () => {
      render(<Pagination currentPage={1} totalPages={10} baseUrl="/products" />);
      const ellipsis = screen.getAllByText('...');
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it('should show ellipsis on both sides when in middle', () => {
      render(<Pagination currentPage={5} totalPages={10} baseUrl="/products" />);
      const ellipses = screen.getAllByText('...');
      expect(ellipses).toHaveLength(2);
    });

    it('should always show first page', () => {
      render(<Pagination currentPage={8} totalPages={10} baseUrl="/products" />);
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should always show last page', () => {
      render(<Pagination currentPage={2} totalPages={10} baseUrl="/products" />);
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  describe('Mobile View', () => {
    it('should show current page info on mobile', () => {
      render(<Pagination currentPage={3} totalPages={10} baseUrl="/products" />);
      expect(screen.getByText('de 10')).toBeInTheDocument();
    });
  });

  describe('Small Page Counts', () => {
    it('should show all pages when total is 2', () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={2} baseUrl="/products" />
      );
      const desktopNav = container.querySelector('.sm\\:flex');
      expect(desktopNav?.textContent).toContain('1');
      expect(desktopNav?.textContent).toContain('2');
      expect(screen.queryByText('...')).not.toBeInTheDocument();
    });

    it('should show all pages when total is 3', () => {
      const { container } = render(
        <Pagination currentPage={2} totalPages={3} baseUrl="/products" />
      );
      const desktopNav = container.querySelector('.sm\\:flex');
      expect(desktopNav?.textContent).toContain('1');
      expect(desktopNav?.textContent).toContain('2');
      expect(desktopNav?.textContent).toContain('3');
    });

    it('should show all pages when total is 4', () => {
      const { container } = render(
        <Pagination currentPage={2} totalPages={4} baseUrl="/products" />
      );
      const desktopNav = container.querySelector('.sm\\:flex');
      expect(desktopNav?.textContent).toContain('1');
      expect(desktopNav?.textContent).toContain('2');
      expect(desktopNav?.textContent).toContain('3');
      expect(desktopNav?.textContent).toContain('4');
    });
  });

  describe('Gap Filling Logic', () => {
    it('should fill gap pages when on last pages (no ellipsis at end)', () => {
      // When on page 8 of 10, no ellipsis at end, should fill gap pages
      const { container } = render(
        <Pagination currentPage={8} totalPages={10} baseUrl="/products" />
      );
      const desktopNav = container.querySelector('.sm\\:flex');
      // Should show 1, ..., 7, 8, 9, 10
      expect(desktopNav?.textContent).toContain('1');
      expect(desktopNav?.textContent).toContain('7');
      expect(desktopNav?.textContent).toContain('8');
      expect(desktopNav?.textContent).toContain('9');
      expect(desktopNav?.textContent).toContain('10');
    });

    it('should fill gap when on second-to-last page of 6 pages', () => {
      // When on page 5 of 6, totalPages > 4 and near end
      const { container } = render(
        <Pagination currentPage={5} totalPages={6} baseUrl="/products" />
      );
      const desktopNav = container.querySelector('.sm\\:flex');
      expect(desktopNav?.textContent).toContain('1');
      expect(desktopNav?.textContent).toContain('5');
      expect(desktopNav?.textContent).toContain('6');
    });

    it('should fill gap when on last page of 5 pages', () => {
      // When on page 5 of 5, totalPages > 4 and at end
      // showEllipsisEnd = false since currentPage (5) >= totalPages - 2 (3)
      const { container } = render(
        <Pagination currentPage={5} totalPages={5} baseUrl="/products" />
      );
      const desktopNav = container.querySelector('.sm\\:flex');
      expect(desktopNav?.textContent).toContain('1');
      // Shows ellipsis since showEllipsisStart = true (currentPage 5 > 3)
      expect(desktopNav?.textContent).toContain('...');
      expect(desktopNav?.textContent).toContain('4');
      expect(desktopNav?.textContent).toContain('5');
    });
  });
});
