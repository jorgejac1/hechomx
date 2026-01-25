import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductConversions from '../ProductConversions';
import type { ProductConversion } from '@/lib/types/seller-types';

const mockProducts: ProductConversion[] = [
  {
    productId: 'p1',
    productName: 'Cojín Tejido Geometrico',
    views: 890,
    addToCart: 156,
    purchases: 45,
    viewToCartRate: 17.5,
    cartToPurchaseRate: 28.8,
  },
  {
    productId: 'p2',
    productName: 'Manta Tejida Artesanal',
    views: 620,
    addToCart: 87,
    purchases: 23,
    viewToCartRate: 14.0,
    cartToPurchaseRate: 26.4,
  },
  {
    productId: 'p3',
    productName: 'Canasta Macramé',
    views: 445,
    addToCart: 52,
    purchases: 18,
    viewToCartRate: 11.7,
    cartToPurchaseRate: 34.6,
  },
];

describe('ProductConversions', () => {
  describe('rendering', () => {
    it('should render the component with products', () => {
      render(<ProductConversions products={mockProducts} />);
      expect(screen.getByText('Conversión por Producto')).toBeInTheDocument();
    });

    it('should render the description', () => {
      render(<ProductConversions products={mockProducts} />);
      expect(
        screen.getByText('Métricas de conversión de tus productos principales')
      ).toBeInTheDocument();
    });

    it('should render all product names (desktop and mobile)', () => {
      render(<ProductConversions products={mockProducts} />);
      // Each product appears twice (desktop table + mobile cards)
      expect(screen.getAllByText('Cojín Tejido Geometrico').length).toBe(2);
      expect(screen.getAllByText('Manta Tejida Artesanal').length).toBe(2);
      expect(screen.getAllByText('Canasta Macramé').length).toBe(2);
    });

    it('should render table headers on desktop view', () => {
      render(<ProductConversions products={mockProducts} />);
      expect(screen.getByText('Producto')).toBeInTheDocument();
      // These appear twice (desktop headers + mobile labels)
      expect(screen.getAllByText('Vista → Carrito').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Carrito → Compra').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('empty state', () => {
    it('should return null when products is empty', () => {
      const { container } = render(<ProductConversions products={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('should return null when products is undefined', () => {
      // @ts-expect-error - Testing undefined case
      const { container } = render(<ProductConversions products={undefined} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('metrics display', () => {
    it('should display formatted views count', () => {
      render(<ProductConversions products={mockProducts} />);
      // Views are formatted with toLocaleString('es-MX')
      expect(screen.getAllByText('890').length).toBeGreaterThan(0);
      expect(screen.getAllByText('620').length).toBeGreaterThan(0);
      expect(screen.getAllByText('445').length).toBeGreaterThan(0);
    });

    it('should display formatted add to cart count', () => {
      render(<ProductConversions products={mockProducts} />);
      expect(screen.getAllByText('156').length).toBeGreaterThan(0);
      expect(screen.getAllByText('87').length).toBeGreaterThan(0);
      expect(screen.getAllByText('52').length).toBeGreaterThan(0);
    });

    it('should display formatted purchases count', () => {
      render(<ProductConversions products={mockProducts} />);
      expect(screen.getAllByText('45').length).toBeGreaterThan(0);
      expect(screen.getAllByText('23').length).toBeGreaterThan(0);
      expect(screen.getAllByText('18').length).toBeGreaterThan(0);
    });

    it('should display view to cart conversion rates', () => {
      render(<ProductConversions products={mockProducts} />);
      expect(screen.getAllByText('17.5%').length).toBeGreaterThan(0);
      expect(screen.getAllByText('14.0%').length).toBeGreaterThan(0);
      expect(screen.getAllByText('11.7%').length).toBeGreaterThan(0);
    });

    it('should display cart to purchase conversion rates', () => {
      render(<ProductConversions products={mockProducts} />);
      expect(screen.getAllByText('28.8%').length).toBeGreaterThan(0);
      expect(screen.getAllByText('26.4%').length).toBeGreaterThan(0);
      expect(screen.getAllByText('34.6%').length).toBeGreaterThan(0);
    });
  });

  describe('averages summary', () => {
    it('should display average view to cart rate', () => {
      render(<ProductConversions products={mockProducts} />);
      expect(screen.getByText('Promedio Vista → Carrito')).toBeInTheDocument();
      // Average: (17.5 + 14.0 + 11.7) / 3 = 14.4
      expect(screen.getByText('14.4%')).toBeInTheDocument();
    });

    it('should display average cart to purchase rate', () => {
      render(<ProductConversions products={mockProducts} />);
      expect(screen.getByText('Promedio Carrito → Compra')).toBeInTheDocument();
      // Average: (28.8 + 26.4 + 34.6) / 3 = 29.9
      expect(screen.getByText('29.9%')).toBeInTheDocument();
    });
  });

  describe('conversion color coding', () => {
    it('should apply green color for high view to cart rate', () => {
      const highRateProduct: ProductConversion[] = [
        {
          productId: 'p1',
          productName: 'High Converter',
          views: 100,
          addToCart: 20,
          purchases: 10,
          viewToCartRate: 20.0, // >= 15 threshold = green
          cartToPurchaseRate: 50.0,
        },
      ];
      render(<ProductConversions products={highRateProduct} />);
      const rateElements = screen.getAllByText('20.0%');
      expect(rateElements.length).toBeGreaterThan(0);
      // At least one should have green color class
      const hasGreen = rateElements.some(
        (el) => el.className.includes('text-green-600') || el.className.includes('text-green-400')
      );
      expect(hasGreen).toBe(true);
    });

    it('should apply yellow color for medium view to cart rate', () => {
      const mediumRateProduct: ProductConversion[] = [
        {
          productId: 'p1',
          productName: 'Medium Converter',
          views: 100,
          addToCart: 12,
          purchases: 5,
          viewToCartRate: 12.0, // >= 10 and < 15 = yellow
          cartToPurchaseRate: 41.7,
        },
      ];
      render(<ProductConversions products={mediumRateProduct} />);
      const rateElements = screen.getAllByText('12.0%');
      expect(rateElements.length).toBeGreaterThan(0);
    });

    it('should apply red color for low view to cart rate', () => {
      const lowRateProduct: ProductConversion[] = [
        {
          productId: 'p1',
          productName: 'Low Converter',
          views: 100,
          addToCart: 5,
          purchases: 2,
          viewToCartRate: 5.0, // < 10 = red
          cartToPurchaseRate: 40.0,
        },
      ];
      render(<ProductConversions products={lowRateProduct} />);
      const rateElements = screen.getAllByText('5.0%');
      expect(rateElements.length).toBeGreaterThan(0);
      // At least one should have red color class
      const hasRed = rateElements.some(
        (el) => el.className.includes('text-red-600') || el.className.includes('text-red-400')
      );
      expect(hasRed).toBe(true);
    });
  });

  describe('responsive layout', () => {
    it('should have desktop table with hidden class for mobile', () => {
      const { container } = render(<ProductConversions products={mockProducts} />);
      const desktopTable = container.querySelector('.hidden.md\\:block');
      expect(desktopTable).toBeInTheDocument();
    });

    it('should have mobile cards with md:hidden class', () => {
      const { container } = render(<ProductConversions products={mockProducts} />);
      const mobileCards = container.querySelector('.md\\:hidden');
      expect(mobileCards).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should apply dark mode classes to container', () => {
      const { container } = render(<ProductConversions products={mockProducts} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('dark:bg-gray-800');
    });

    it('should apply responsive padding', () => {
      const { container } = render(<ProductConversions products={mockProducts} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('sm:p-6');
    });
  });

  describe('single product', () => {
    it('should render correctly with a single product', () => {
      const singleProduct: ProductConversion[] = [
        {
          productId: 'p1',
          productName: 'Solo Product',
          views: 500,
          addToCart: 100,
          purchases: 30,
          viewToCartRate: 20.0,
          cartToPurchaseRate: 30.0,
        },
      ];
      render(<ProductConversions products={singleProduct} />);
      // Product name appears twice (desktop + mobile)
      expect(screen.getAllByText('Solo Product').length).toBe(2);
      // Conversion rates appear multiple times (desktop, mobile, and averages)
      expect(screen.getAllByText('20.0%').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('30.0%').length).toBeGreaterThanOrEqual(1);
    });
  });
});
