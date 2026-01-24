/**
 * @fileoverview Tests for SizeSelector component.
 * Tests size selection UI, size guide display, and user interactions.
 * @module components/product/__tests__/SizeSelector.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SizeSelector from '../SizeSelector';

describe('SizeSelector Component', () => {
  const mockOnSizeSelect = vi.fn();

  const defaultProps = {
    availableSizes: ['CH', 'M', 'G', 'XG'],
    sizeType: 'clothing' as const,
    selectedSize: null,
    onSizeSelect: mockOnSizeSelect,
  };

  beforeEach(() => {
    mockOnSizeSelect.mockClear();
  });

  describe('Rendering', () => {
    it('should render size buttons for clothing', () => {
      render(<SizeSelector {...defaultProps} />);

      expect(screen.getByRole('button', { name: /Talla CH/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Talla M/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Talla G/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Talla XG/i })).toBeInTheDocument();
    });

    it('should render label with required indicator', () => {
      render(<SizeSelector {...defaultProps} />);

      expect(screen.getByText('Talla')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should render size guide button', () => {
      render(<SizeSelector {...defaultProps} />);

      expect(screen.getByText('Guía de tallas')).toBeInTheDocument();
    });

    it('should render shoe sizes correctly', () => {
      render(
        <SizeSelector
          {...defaultProps}
          sizeType="shoes"
          availableSizes={['24', '25', '26', '27']}
        />
      );

      expect(screen.getByText('Talla (MX)')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Talla 24/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Talla 25/i })).toBeInTheDocument();
    });

    it('should render ring sizes correctly', () => {
      render(
        <SizeSelector {...defaultProps} sizeType="rings" availableSizes={['5', '6', '7', '8']} />
      );

      expect(screen.getByText('Talla del anillo')).toBeInTheDocument();
    });

    it('should render one_size as info text', () => {
      render(<SizeSelector {...defaultProps} sizeType="one_size" availableSizes={['unica']} />);

      expect(screen.getByText('Talla Única')).toBeInTheDocument();
      // Should not render selection buttons for one_size
      expect(screen.queryByRole('button', { name: /Talla unica/i })).not.toBeInTheDocument();
    });

    it('should return null when no sizes available', () => {
      const { container } = render(<SizeSelector {...defaultProps} availableSizes={[]} />);

      expect(container.firstChild).toBeNull();
    });

    it('should return null when availableSizes is undefined', () => {
      const { container } = render(
        <SizeSelector
          {...defaultProps}
          // @ts-expect-error testing undefined
          availableSizes={undefined}
        />
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Selection', () => {
    it('should call onSizeSelect when size is clicked', () => {
      render(<SizeSelector {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: /Talla M/i }));

      expect(mockOnSizeSelect).toHaveBeenCalledWith('M');
    });

    it('should highlight selected size', () => {
      render(<SizeSelector {...defaultProps} selectedSize="M" />);

      const selectedButton = screen.getByRole('button', { name: /Talla M/i });
      expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
      expect(selectedButton).toHaveClass('border-primary-600');
    });

    it('should not highlight unselected sizes', () => {
      render(<SizeSelector {...defaultProps} selectedSize="M" />);

      const unselectedButton = screen.getByRole('button', { name: /Talla G/i });
      expect(unselectedButton).toHaveAttribute('aria-pressed', 'false');
      expect(unselectedButton).toHaveClass('border-gray-300');
    });

    it('should show validation message when no size is selected', () => {
      render(<SizeSelector {...defaultProps} selectedSize={null} />);

      expect(screen.getByText('Por favor selecciona una talla')).toBeInTheDocument();
    });

    it('should hide validation message when size is selected', () => {
      render(<SizeSelector {...defaultProps} selectedSize="M" />);

      expect(screen.queryByText('Por favor selecciona una talla')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should disable all buttons when disabled prop is true', () => {
      render(<SizeSelector {...defaultProps} disabled />);

      const buttons = screen
        .getAllByRole('button')
        .filter((btn) => btn.getAttribute('aria-label')?.includes('Talla'));

      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('should not call onSizeSelect when disabled', () => {
      render(<SizeSelector {...defaultProps} disabled />);

      const button = screen.getByRole('button', { name: /Talla M/i });
      fireEvent.click(button);

      expect(mockOnSizeSelect).not.toHaveBeenCalled();
    });

    it('should have opacity class when disabled', () => {
      render(<SizeSelector {...defaultProps} disabled />);

      const button = screen.getByRole('button', { name: /Talla M/i });
      expect(button).toHaveClass('opacity-50');
    });
  });

  describe('Size Guide', () => {
    it('should show size guide when button is clicked', () => {
      render(<SizeSelector {...defaultProps} />);

      const sizeGuideButton = screen.getByText('Guía de tallas');
      fireEvent.click(sizeGuideButton);

      expect(screen.getByText('Guía de Tallas')).toBeInTheDocument();
    });

    it('should show clothing size guide content', () => {
      render(<SizeSelector {...defaultProps} sizeType="clothing" />);

      fireEvent.click(screen.getByText('Guía de tallas'));

      expect(screen.getByText(/XCH\/XS:/)).toBeInTheDocument();
      expect(screen.getByText(/CH\/S:/)).toBeInTheDocument();
      // Use getAllByText since "Busto" appears multiple times in size guide
      expect(screen.getAllByText(/Busto/).length).toBeGreaterThan(0);
    });

    it('should show shoe size guide content', () => {
      render(
        <SizeSelector {...defaultProps} sizeType="shoes" availableSizes={['24', '25', '26']} />
      );

      fireEvent.click(screen.getByText('Guía de tallas'));

      expect(screen.getByText(/Tallas mexicanas en centímetros/)).toBeInTheDocument();
      expect(screen.getByText(/22-24:/)).toBeInTheDocument();
    });

    it('should show ring size guide content', () => {
      render(<SizeSelector {...defaultProps} sizeType="rings" availableSizes={['5', '6', '7']} />);

      fireEvent.click(screen.getByText('Guía de tallas'));

      expect(screen.getByText(/medir el diámetro/)).toBeInTheDocument();
      expect(screen.getByText(/Talla 5:/)).toBeInTheDocument();
    });

    it('should hide size guide when close button is clicked', () => {
      render(<SizeSelector {...defaultProps} />);

      // Open guide
      fireEvent.click(screen.getByText('Guía de tallas'));
      expect(screen.getByText('Guía de Tallas')).toBeInTheDocument();

      // Close guide
      fireEvent.click(screen.getByText('Cerrar'));
      expect(screen.queryByText('Guía de Tallas')).not.toBeInTheDocument();
    });

    it('should toggle size guide on multiple clicks', () => {
      render(<SizeSelector {...defaultProps} />);

      const sizeGuideButton = screen.getByText('Guía de tallas');

      // First click - open
      fireEvent.click(sizeGuideButton);
      expect(screen.getByText('Guía de Tallas')).toBeInTheDocument();

      // Second click - close
      fireEvent.click(sizeGuideButton);
      expect(screen.queryByText('Guía de Tallas')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-pressed attribute on size buttons', () => {
      render(<SizeSelector {...defaultProps} selectedSize="M" />);

      const selectedButton = screen.getByRole('button', { name: /Talla M/i });
      expect(selectedButton).toHaveAttribute('aria-pressed', 'true');

      const unselectedButton = screen.getByRole('button', { name: /Talla G/i });
      expect(unselectedButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have aria-label on each size button', () => {
      render(<SizeSelector {...defaultProps} />);

      defaultProps.availableSizes.forEach((size) => {
        const button = screen.getByRole('button', { name: `Talla ${size}` });
        expect(button).toHaveAttribute('aria-label', `Talla ${size}`);
      });
    });

    it('should have type="button" to prevent form submission', () => {
      render(<SizeSelector {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle single size option', () => {
      render(<SizeSelector {...defaultProps} availableSizes={['M']} />);

      expect(screen.getByRole('button', { name: /Talla M/i })).toBeInTheDocument();
    });

    it('should handle many sizes', () => {
      const manySizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
      render(<SizeSelector {...defaultProps} availableSizes={manySizes} />);

      manySizes.forEach((size) => {
        expect(screen.getByRole('button', { name: `Talla ${size}` })).toBeInTheDocument();
      });
    });

    it('should handle numeric string sizes', () => {
      render(
        <SizeSelector {...defaultProps} sizeType="shoes" availableSizes={['22', '22.5', '23']} />
      );

      expect(screen.getByRole('button', { name: /Talla 22$/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Talla 22.5/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Talla 23/i })).toBeInTheDocument();
    });
  });
});
