import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConversionFunnel, { FunnelStage } from '../ConversionFunnel';

const mockStages: FunnelStage[] = [
  { id: 'store_visits', label: 'Visitas a tienda', count: 1000, conversionFromPrevious: 100 },
  { id: 'product_views', label: 'Vistas de producto', count: 600, conversionFromPrevious: 60 },
  { id: 'add_to_cart', label: 'Agregados al carrito', count: 100, conversionFromPrevious: 16.7 },
  { id: 'checkout_started', label: 'Checkout iniciado', count: 50, conversionFromPrevious: 50 },
  { id: 'purchases', label: 'Compras completadas', count: 40, conversionFromPrevious: 80 },
];

describe('ConversionFunnel', () => {
  describe('rendering', () => {
    it('should render the component with stages', () => {
      render(<ConversionFunnel stages={mockStages} />);
      expect(screen.getByText('De Visita a Compra')).toBeInTheDocument();
    });

    it('should render all stage labels', () => {
      render(<ConversionFunnel stages={mockStages} />);
      expect(screen.getByText('Visitas a tienda')).toBeInTheDocument();
      expect(screen.getByText('Vistas de producto')).toBeInTheDocument();
      expect(screen.getByText('Agregados al carrito')).toBeInTheDocument();
      expect(screen.getByText('Checkout iniciado')).toBeInTheDocument();
      expect(screen.getByText('Compras completadas')).toBeInTheDocument();
    });

    it('should render formatted counts', () => {
      render(<ConversionFunnel stages={mockStages} />);
      // 1000 should be formatted as "1K"
      expect(screen.getByText('1K')).toBeInTheDocument();
      expect(screen.getByText('600')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('40')).toBeInTheDocument();
    });

    it('should render the period label', () => {
      render(<ConversionFunnel stages={mockStages} periodLabel="Esta semana" />);
      expect(screen.getByText(/Esta semana/)).toBeInTheDocument();
    });

    it('should use default period label when not provided', () => {
      render(<ConversionFunnel stages={mockStages} />);
      expect(screen.getByText(/Este período/)).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('should return null when stages is empty', () => {
      const { container } = render(<ConversionFunnel stages={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('should return null when stages is undefined', () => {
      // @ts-expect-error - Testing undefined case
      const { container } = render(<ConversionFunnel stages={undefined} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('overall conversion', () => {
    it('should calculate and display overall conversion rate', () => {
      render(<ConversionFunnel stages={mockStages} />);
      // Overall conversion: 40/1000 * 100 = 4%
      expect(screen.getByText(/Conversión total: 4\.00%/)).toBeInTheDocument();
    });

    it('should handle single stage with 0% conversion', () => {
      const singleStage: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas a tienda', count: 100, conversionFromPrevious: 100 },
      ];
      render(<ConversionFunnel stages={singleStage} />);
      expect(screen.getByText(/Conversión total: 0%/)).toBeInTheDocument();
    });
  });

  describe('summary stats', () => {
    it('should display cart abandonment rate', () => {
      render(<ConversionFunnel stages={mockStages} />);
      // Abandonment = 100 - (50/100 * 100) = 50%
      expect(screen.getByText('Abandono carrito')).toBeInTheDocument();
      expect(screen.getByText('50.0%')).toBeInTheDocument();
    });

    it('should display checkout rate', () => {
      render(<ConversionFunnel stages={mockStages} />);
      expect(screen.getByText('Tasa checkout')).toBeInTheDocument();
      // Checkout rate = 40/50 * 100 = 80%
      expect(screen.getByText('80.0%')).toBeInTheDocument();
    });

    it('should display view to purchase rate', () => {
      render(<ConversionFunnel stages={mockStages} />);
      expect(screen.getByText('Vista a compra')).toBeInTheDocument();
      // View to purchase = 40/600 * 100 = 6.67%
      expect(screen.getByText('6.67%')).toBeInTheDocument();
    });
  });

  describe('number formatting', () => {
    it('should format large numbers with K suffix', () => {
      const largeStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 5500, conversionFromPrevious: 100 },
      ];
      render(<ConversionFunnel stages={largeStages} />);
      expect(screen.getByText('5.5K')).toBeInTheDocument();
    });

    it('should format million numbers with M suffix', () => {
      const millionStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 1500000, conversionFromPrevious: 100 },
      ];
      render(<ConversionFunnel stages={millionStages} />);
      expect(screen.getByText('1.5M')).toBeInTheDocument();
    });

    it('should not add suffix for numbers under 1000', () => {
      const smallStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 999, conversionFromPrevious: 100 },
      ];
      render(<ConversionFunnel stages={smallStages} />);
      expect(screen.getByText('999')).toBeInTheDocument();
    });
  });

  describe('conversion indicators', () => {
    it('should show percentage from total for each stage', () => {
      render(<ConversionFunnel stages={mockStages} />);
      // First stage is 100% of total
      expect(screen.getByText('100.0% del total')).toBeInTheDocument();
      // Second stage is 60% of total
      expect(screen.getByText('60.0% del total')).toBeInTheDocument();
    });

    it('should show conversion from previous stage', () => {
      render(<ConversionFunnel stages={mockStages} />);
      // Multiple stages show conversion from previous
      expect(screen.getByText('60% del anterior')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should apply dark mode classes', () => {
      const { container } = render(<ConversionFunnel stages={mockStages} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('dark:bg-gray-800');
    });

    it('should apply responsive classes', () => {
      const { container } = render(<ConversionFunnel stages={mockStages} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('sm:p-6');
    });
  });

  describe('unknown stage IDs (fallback styles)', () => {
    it('should use fallback icon for unknown stage ID', () => {
      const unknownStages: FunnelStage[] = [
        { id: 'unknown_stage', label: 'Unknown Stage', count: 100, conversionFromPrevious: 100 },
      ];
      render(<ConversionFunnel stages={unknownStages} />);
      // Should still render the stage with fallback icon
      expect(screen.getByText('Unknown Stage')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('should use fallback colors for unknown stage ID', () => {
      const unknownStages: FunnelStage[] = [
        { id: 'custom_stage', label: 'Custom Stage', count: 50, conversionFromPrevious: 100 },
      ];
      const { container } = render(<ConversionFunnel stages={unknownStages} />);
      // Check that fallback bg-gray-500 is applied
      const iconContainer = container.querySelector('.bg-gray-500');
      expect(iconContainer).toBeInTheDocument();
    });

    it('should use fallback background for unknown stage ID', () => {
      const unknownStages: FunnelStage[] = [
        { id: 'new_stage', label: 'New Stage', count: 200, conversionFromPrevious: 100 },
      ];
      const { container } = render(<ConversionFunnel stages={unknownStages} />);
      // Check that fallback background classes are applied
      const stageCard = container.querySelector('.bg-gray-50');
      expect(stageCard).toBeInTheDocument();
    });
  });

  describe('conversion rate color coding', () => {
    it('should apply green color for high conversion (>= 50%)', () => {
      const highConversionStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 60, conversionFromPrevious: 60 },
      ];
      const { container } = render(<ConversionFunnel stages={highConversionStages} />);
      const greenText = container.querySelector('.text-green-600');
      expect(greenText).toBeInTheDocument();
      expect(greenText?.textContent).toContain('60% del anterior');
    });

    it('should apply yellow color for medium conversion (>= 25% and < 50%)', () => {
      const mediumConversionStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 30, conversionFromPrevious: 30 },
      ];
      const { container } = render(<ConversionFunnel stages={mediumConversionStages} />);
      const yellowText = container.querySelector('.text-yellow-600');
      expect(yellowText).toBeInTheDocument();
      expect(yellowText?.textContent).toContain('30% del anterior');
    });

    it('should apply red color for low conversion (< 25%)', () => {
      const lowConversionStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 10, conversionFromPrevious: 10 },
      ];
      const { container } = render(<ConversionFunnel stages={lowConversionStages} />);
      const redText = container.querySelector('.text-red-600');
      expect(redText).toBeInTheDocument();
      expect(redText?.textContent).toContain('10% del anterior');
    });

    it('should apply yellow for exactly 25% conversion (boundary)', () => {
      const boundaryStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 25, conversionFromPrevious: 25 },
      ];
      const { container } = render(<ConversionFunnel stages={boundaryStages} />);
      const yellowText = container.querySelector('.text-yellow-600');
      expect(yellowText).toBeInTheDocument();
    });

    it('should apply green for exactly 50% conversion (boundary)', () => {
      const boundaryStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 50, conversionFromPrevious: 50 },
      ];
      const { container } = render(<ConversionFunnel stages={boundaryStages} />);
      const greenText = container.querySelector('.text-green-600');
      expect(greenText).toBeInTheDocument();
    });
  });

  describe('summary stats with fewer stages', () => {
    it('should show 0% for cart abandonment when less than 4 stages', () => {
      const threeStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 60, conversionFromPrevious: 60 },
        { id: 'add_to_cart', label: 'Carrito', count: 20, conversionFromPrevious: 33 },
      ];
      render(<ConversionFunnel stages={threeStages} />);
      // All summary stats should show 0% when not enough stages
      const zeroPercents = screen.getAllByText('0%');
      expect(zeroPercents.length).toBeGreaterThanOrEqual(2);
    });

    it('should show 0% for checkout rate when less than 5 stages', () => {
      const fourStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 60, conversionFromPrevious: 60 },
        { id: 'add_to_cart', label: 'Carrito', count: 20, conversionFromPrevious: 33 },
        { id: 'checkout_started', label: 'Checkout', count: 10, conversionFromPrevious: 50 },
      ];
      render(<ConversionFunnel stages={fourStages} />);
      // Checkout rate and view-to-purchase should be 0%
      const zeroPercents = screen.getAllByText('0%');
      expect(zeroPercents.length).toBeGreaterThanOrEqual(2);
    });

    it('should calculate cart abandonment with exactly 4 stages', () => {
      const fourStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 60, conversionFromPrevious: 60 },
        { id: 'add_to_cart', label: 'Carrito', count: 20, conversionFromPrevious: 33 },
        { id: 'checkout_started', label: 'Checkout', count: 10, conversionFromPrevious: 50 },
      ];
      render(<ConversionFunnel stages={fourStages} />);
      // Cart abandonment = 100 - (10/20 * 100) = 50%
      expect(screen.getByText('50.0%')).toBeInTheDocument();
    });

    it('should show view-to-purchase as 0% when less than 5 stages', () => {
      const fourStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 60, conversionFromPrevious: 60 },
        { id: 'add_to_cart', label: 'Carrito', count: 20, conversionFromPrevious: 33 },
        { id: 'checkout_started', label: 'Checkout', count: 10, conversionFromPrevious: 50 },
      ];
      render(<ConversionFunnel stages={fourStages} />);
      expect(screen.getByText('Vista a compra')).toBeInTheDocument();
      // Should have 0% for view-to-purchase
      const zeroPercents = screen.getAllByText('0%');
      expect(zeroPercents.length).toBeGreaterThanOrEqual(2);
    });

    it('should calculate all stats correctly with exactly 5 stages', () => {
      render(<ConversionFunnel stages={mockStages} />);
      // All three summary stats should have calculated values, not 0%
      expect(screen.getByText('50.0%')).toBeInTheDocument(); // Cart abandonment
      expect(screen.getByText('80.0%')).toBeInTheDocument(); // Checkout rate
      expect(screen.getByText('6.67%')).toBeInTheDocument(); // View to purchase
    });
  });

  describe('arrow indicators', () => {
    it('should show arrows between stages but not after the last', () => {
      const { container } = render(<ConversionFunnel stages={mockStages} />);
      // Should have 4 arrows for 5 stages (one between each pair)
      const arrows = container.querySelectorAll('.lucide-arrow-down');
      expect(arrows.length).toBe(4);
    });

    it('should not show arrow after single stage', () => {
      const singleStage: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
      ];
      const { container } = render(<ConversionFunnel stages={singleStage} />);
      const arrows = container.querySelectorAll('.lucide-arrow-down');
      expect(arrows.length).toBe(0);
    });
  });

  describe('edge cases with zero counts', () => {
    it('should handle first stage with count of 0', () => {
      const zeroCountStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 0, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 0, conversionFromPrevious: 0 },
      ];
      render(<ConversionFunnel stages={zeroCountStages} />);
      // Should still render without crashing
      expect(screen.getByText('De Visita a Compra')).toBeInTheDocument();
      expect(screen.getByText('Visitas')).toBeInTheDocument();
    });

    it('should handle division by zero in cart abandonment (stages[2] = 0)', () => {
      const zeroCartStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 50, conversionFromPrevious: 50 },
        { id: 'add_to_cart', label: 'Carrito', count: 0, conversionFromPrevious: 0 },
        { id: 'checkout_started', label: 'Checkout', count: 0, conversionFromPrevious: 0 },
        { id: 'purchases', label: 'Compras', count: 0, conversionFromPrevious: 0 },
      ];
      render(<ConversionFunnel stages={zeroCartStages} />);
      // Should handle division by zero gracefully (uses || 1 fallback)
      expect(screen.getByText('Abandono carrito')).toBeInTheDocument();
    });

    it('should handle division by zero in checkout rate (stages[3] = 0)', () => {
      const zeroCheckoutStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 50, conversionFromPrevious: 50 },
        { id: 'add_to_cart', label: 'Carrito', count: 20, conversionFromPrevious: 40 },
        { id: 'checkout_started', label: 'Checkout', count: 0, conversionFromPrevious: 0 },
        { id: 'purchases', label: 'Compras', count: 0, conversionFromPrevious: 0 },
      ];
      render(<ConversionFunnel stages={zeroCheckoutStages} />);
      // Should handle division by zero gracefully
      expect(screen.getByText('Tasa checkout')).toBeInTheDocument();
    });

    it('should handle division by zero in view-to-purchase (stages[1] = 0)', () => {
      const zeroViewsStages: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 100, conversionFromPrevious: 100 },
        { id: 'product_views', label: 'Vistas', count: 0, conversionFromPrevious: 0 },
        { id: 'add_to_cart', label: 'Carrito', count: 0, conversionFromPrevious: 0 },
        { id: 'checkout_started', label: 'Checkout', count: 0, conversionFromPrevious: 0 },
        { id: 'purchases', label: 'Compras', count: 0, conversionFromPrevious: 0 },
      ];
      render(<ConversionFunnel stages={zeroViewsStages} />);
      // Should handle division by zero gracefully
      expect(screen.getByText('Vista a compra')).toBeInTheDocument();
    });

    it('should use fallback maxCount of 1 when first stage count is 0', () => {
      const zeroFirstStage: FunnelStage[] = [
        { id: 'store_visits', label: 'Visitas', count: 0, conversionFromPrevious: 100 },
      ];
      render(<ConversionFunnel stages={zeroFirstStage} />);
      // Should render without NaN or Infinity
      expect(screen.getByText('Visitas')).toBeInTheDocument();
      // The progress bar width should still be calculated (15% minimum)
    });
  });
});
