/**
 * @fileoverview Tests for ProductRecommendations component.
 * Tests recommendation sections rendering, cross-category display, and recently viewed.
 * @module components/product/__tests__/ProductRecommendations.test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductRecommendations from '../ProductRecommendations';
import { Product } from '@/types';

// Mock the recommendations utility
vi.mock('@/lib/utils/recommendations', () => ({
  getCombinedRecommendations: vi.fn(() => ({
    similar: [
      {
        id: 'sim-1',
        name: 'Similar Product 1',
        price: 1000,
        category: 'Artesanías',
        state: 'Oaxaca',
        maker: 'Artesano Pedro',
        images: ['/test-image.jpg'],
        currency: 'MXN',
        description: 'Test description',
        inStock: true,
      },
      {
        id: 'sim-2',
        name: 'Similar Product 2',
        price: 1500,
        category: 'Artesanías',
        state: 'Oaxaca',
        maker: 'Artesano Juan',
        images: ['/test-image2.jpg'],
        currency: 'MXN',
        description: 'Test description 2',
        inStock: true,
      },
    ],
    crossCategory: [
      {
        id: 'cross-1',
        name: 'Cross Category Product',
        price: 2000,
        category: 'Textiles',
        state: 'Chiapas',
        maker: 'Tejedora María',
        images: ['/test-image3.jpg'],
        currency: 'MXN',
        description: 'Cross category description',
        inStock: true,
      },
    ],
    recentlyViewed: [],
  })),
  getRecentlyViewedProducts: vi.fn(() => []),
}));

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

// Mock ProductCard to simplify testing
vi.mock('../ProductCard', () => ({
  default: ({ product }: { product: Product }) => (
    <div data-testid={`product-card-${product.id}`}>
      <span>{product.name}</span>
    </div>
  ),
}));

describe('ProductRecommendations Component', () => {
  const mockCurrentProduct: Product = {
    id: 'current-1',
    name: 'Current Product',
    price: 1500,
    currency: 'MXN',
    category: 'Artesanías',
    state: 'Oaxaca',
    maker: 'Artesano Pedro',
    images: ['/current-image.jpg'],
    description: 'Current product description',
    inStock: true,
  };

  const mockAllProducts: Product[] = [
    mockCurrentProduct,
    {
      id: 'prod-2',
      name: 'Product 2',
      price: 2000,
      currency: 'MXN',
      category: 'Artesanías',
      state: 'Oaxaca',
      maker: 'Artesano Juan',
      images: ['/image2.jpg'],
      description: 'Description 2',
      inStock: true,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render similar products section', () => {
      render(
        <ProductRecommendations
          currentProduct={mockCurrentProduct}
          allProducts={mockAllProducts}
          showRecentlyViewed={false}
        />
      );

      expect(screen.getByText('Productos Similares')).toBeInTheDocument();
    });

    it('should render cross-category section when enabled', () => {
      render(
        <ProductRecommendations
          currentProduct={mockCurrentProduct}
          allProducts={mockAllProducts}
          showCrossCategory={true}
          showRecentlyViewed={false}
        />
      );

      expect(screen.getByText('También te puede gustar')).toBeInTheDocument();
    });

    it('should render product cards for similar products', () => {
      render(
        <ProductRecommendations
          currentProduct={mockCurrentProduct}
          allProducts={mockAllProducts}
          showRecentlyViewed={false}
        />
      );

      expect(screen.getByTestId('product-card-sim-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-card-sim-2')).toBeInTheDocument();
    });

    it('should render product cards for cross-category products', () => {
      render(
        <ProductRecommendations
          currentProduct={mockCurrentProduct}
          allProducts={mockAllProducts}
          showCrossCategory={true}
          showRecentlyViewed={false}
        />
      );

      expect(screen.getByTestId('product-card-cross-1')).toBeInTheDocument();
    });
  });

  describe('Section Headers', () => {
    it('should have "Ver más en esta categoría" link for similar products', () => {
      render(
        <ProductRecommendations
          currentProduct={mockCurrentProduct}
          allProducts={mockAllProducts}
          showRecentlyViewed={false}
        />
      );

      const link = screen.getByRole('link', { name: /Ver más en esta categoría/i });
      expect(link).toHaveAttribute(
        'href',
        `/productos?category=${encodeURIComponent(mockCurrentProduct.category)}`
      );
    });

    it('should have "Explorar más" link for cross-category section', () => {
      render(
        <ProductRecommendations
          currentProduct={mockCurrentProduct}
          allProducts={mockAllProducts}
          showCrossCategory={true}
          showRecentlyViewed={false}
        />
      );

      const link = screen.getByRole('link', { name: /Explorar más/i });
      expect(link).toHaveAttribute('href', '/productos');
    });
  });

  describe('Props Configuration', () => {
    it('should hide cross-category section when showCrossCategory is false', () => {
      render(
        <ProductRecommendations
          currentProduct={mockCurrentProduct}
          allProducts={mockAllProducts}
          showCrossCategory={false}
          showRecentlyViewed={false}
        />
      );

      expect(screen.queryByText('También te puede gustar')).not.toBeInTheDocument();
    });

    it('should show all sections by default', () => {
      render(
        <ProductRecommendations currentProduct={mockCurrentProduct} allProducts={mockAllProducts} />
      );

      expect(screen.getByText('Productos Similares')).toBeInTheDocument();
      expect(screen.getByText('También te puede gustar')).toBeInTheDocument();
    });
  });

  describe('Data Handling', () => {
    it('should render sections based on available data', () => {
      // The mock returns similar and crossCategory products
      const { container } = render(
        <ProductRecommendations
          currentProduct={mockCurrentProduct}
          allProducts={mockAllProducts}
          showRecentlyViewed={false}
        />
      );

      // Component should render with the mock data
      expect(container.querySelector('section')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(
        <ProductRecommendations
          currentProduct={mockCurrentProduct}
          allProducts={mockAllProducts}
          showCrossCategory={true}
          showRecentlyViewed={false}
        />
      );

      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings.length).toBeGreaterThan(0);
    });

    it('should have semantic section elements', () => {
      const { container } = render(
        <ProductRecommendations
          currentProduct={mockCurrentProduct}
          allProducts={mockAllProducts}
          showRecentlyViewed={false}
        />
      );

      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });
  });
});
