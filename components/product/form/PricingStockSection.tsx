/**
 * @fileoverview Pricing and stock form section component
 * Provides inputs for product price and available stock quantity.
 * Includes a link to the pricing calculator tool.
 * @module components/product/form/PricingStockSection
 */

import Link from 'next/link';
import { DollarSign } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import TextInput from '@/components/common/TextInput';

/**
 * Props for the PricingStockSection component
 * @interface PricingStockSectionProps
 */
interface PricingStockSectionProps {
  /** Product price in MXN */
  price: number;
  /** Callback to update price */
  setPrice: (value: number) => void;
  /** Available stock quantity */
  stock: number;
  /** Callback to update stock */
  setStock: (value: number) => void;
}

export default function PricingStockSection({
  price,
  setPrice,
  stock,
  setStock,
}: PricingStockSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <TextInput
          type="number"
          label="Precio (MXN)"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min={0}
          step={0.01}
          placeholder="0.00"
          leftIcon={<DollarSign className="w-5 h-5" />}
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Usa la{' '}
          <Link
            href={ROUTES.PRICING_CALCULATOR}
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            calculadora de precios
          </Link>{' '}
          para precios justos
        </p>
      </div>

      <TextInput
        type="number"
        label="Stock Disponible"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        min={0}
        placeholder="1"
        required
      />
    </div>
  );
}
