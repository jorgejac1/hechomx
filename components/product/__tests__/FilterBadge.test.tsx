/**
 * @fileoverview Tests for FilterBadge component.
 * Tests badge rendering, color variants, and accessibility.
 * @module components/product/__tests__/FilterBadge.test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBadge from '../FilterBadge';

describe('FilterBadge Component', () => {
  const mockOnRemove = vi.fn();

  const defaultProps = {
    label: 'Test Filter',
    onRemove: mockOnRemove,
  };

  beforeEach(() => {
    mockOnRemove.mockClear();
  });

  describe('Rendering', () => {
    it('should render the label text', () => {
      render(<FilterBadge {...defaultProps} />);

      expect(screen.getByText('Test Filter')).toBeInTheDocument();
    });

    it('should render a remove button', () => {
      render(<FilterBadge {...defaultProps} />);

      const removeButton = screen.getByRole('button', { name: /Quitar filtro: Test Filter/i });
      expect(removeButton).toBeInTheDocument();
    });

    it('should call onRemove when remove button is clicked', () => {
      render(<FilterBadge {...defaultProps} />);

      const removeButton = screen.getByRole('button');
      fireEvent.click(removeButton);

      expect(mockOnRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('Color Variants', () => {
    it('should render with primary variant by default', () => {
      const { container } = render(<FilterBadge {...defaultProps} />);

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-primary-100');
      expect(badge).toHaveClass('text-primary-700');
    });

    it('should render with blue variant', () => {
      const { container } = render(<FilterBadge {...defaultProps} variant="blue" />);

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-blue-100');
      expect(badge).toHaveClass('text-blue-700');
    });

    it('should render with green variant', () => {
      const { container } = render(<FilterBadge {...defaultProps} variant="green" />);

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-green-100');
      expect(badge).toHaveClass('text-green-700');
    });

    it('should render with yellow variant', () => {
      const { container } = render(<FilterBadge {...defaultProps} variant="yellow" />);

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-yellow-100');
      expect(badge).toHaveClass('text-yellow-700');
    });

    it('should render with purple variant', () => {
      const { container } = render(<FilterBadge {...defaultProps} variant="purple" />);

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-purple-100');
      expect(badge).toHaveClass('text-purple-700');
    });

    it('should render with orange variant', () => {
      const { container } = render(<FilterBadge {...defaultProps} variant="orange" />);

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-orange-100');
      expect(badge).toHaveClass('text-orange-700');
    });

    it('should render with teal variant', () => {
      const { container } = render(<FilterBadge {...defaultProps} variant="teal" />);

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-teal-100');
      expect(badge).toHaveClass('text-teal-700');
    });
  });

  describe('Dark Mode Classes', () => {
    it('should include dark mode classes for primary variant', () => {
      const { container } = render(<FilterBadge {...defaultProps} variant="primary" />);

      const badge = container.querySelector('span');
      expect(badge?.className).toContain('dark:bg-primary-900/50');
      expect(badge?.className).toContain('dark:text-primary-300');
    });

    it('should include dark mode classes for teal variant', () => {
      const { container } = render(<FilterBadge {...defaultProps} variant="teal" />);

      const badge = container.querySelector('span');
      expect(badge?.className).toContain('dark:bg-teal-900/50');
      expect(badge?.className).toContain('dark:text-teal-300');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on remove button', () => {
      render(<FilterBadge label="Categoría: Joyería" onRemove={mockOnRemove} />);

      const removeButton = screen.getByRole('button');
      expect(removeButton).toHaveAttribute('aria-label', 'Quitar filtro: Categoría: Joyería');
    });

    it('should be keyboard accessible', () => {
      render(<FilterBadge {...defaultProps} />);

      const removeButton = screen.getByRole('button');
      removeButton.focus();
      fireEvent.keyDown(removeButton, { key: 'Enter' });

      // The button should be focusable
      expect(document.activeElement).toBe(removeButton);
    });
  });

  describe('Use Cases', () => {
    it('should work with category filter label', () => {
      render(<FilterBadge label="Categoría: Arte" onRemove={mockOnRemove} variant="primary" />);

      expect(screen.getByText('Categoría: Arte')).toBeInTheDocument();
    });

    it('should work with state filter label', () => {
      render(<FilterBadge label="Estado: Oaxaca" onRemove={mockOnRemove} variant="blue" />);

      expect(screen.getByText('Estado: Oaxaca')).toBeInTheDocument();
    });

    it('should work with material filter label (teal variant)', () => {
      render(<FilterBadge label="Material: Plata" onRemove={mockOnRemove} variant="teal" />);

      expect(screen.getByText('Material: Plata')).toBeInTheDocument();
      const badge = screen.getByText('Material: Plata').closest('span');
      expect(badge).toHaveClass('bg-teal-100');
    });

    it('should work with price filter', () => {
      render(<FilterBadge label="Hasta $5,000" onRemove={mockOnRemove} variant="purple" />);

      expect(screen.getByText('Hasta $5,000')).toBeInTheDocument();
    });

    it('should work with boolean filter', () => {
      render(<FilterBadge label="En stock" onRemove={mockOnRemove} variant="green" />);

      expect(screen.getByText('En stock')).toBeInTheDocument();
    });
  });
});
