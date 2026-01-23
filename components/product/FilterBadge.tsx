/**
 * @fileoverview Filter badge component for displaying active filters
 * Removable badge showing an active filter value with color variants.
 * Used in the products page to display and manage active filter states.
 * @module components/product/FilterBadge
 */

'use client';

import { X } from 'lucide-react';

/**
 * Available color variants for filter badges
 * @typedef {'primary' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'} FilterBadgeVariant
 */
type FilterBadgeVariant = 'primary' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';

/**
 * Props for the FilterBadge component
 * @interface FilterBadgeProps
 */
interface FilterBadgeProps {
  /** Text to display in the badge */
  label: string;
  /** Callback when remove button is clicked */
  onRemove: () => void;
  /** Color variant (defaults to 'primary') */
  variant?: FilterBadgeVariant;
}

const VARIANT_STYLES: Record<FilterBadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-700 hover:text-primary-900',
  blue: 'bg-blue-100 text-blue-700 hover:text-blue-900',
  green: 'bg-green-100 text-green-700 hover:text-green-900',
  yellow: 'bg-yellow-100 text-yellow-700 hover:text-yellow-900',
  purple: 'bg-purple-100 text-purple-700 hover:text-purple-900',
  orange: 'bg-orange-100 text-orange-700 hover:text-orange-900',
};

export default function FilterBadge({ label, onRemove, variant = 'primary' }: FilterBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${VARIANT_STYLES[variant]}`}
    >
      {label}
      <button
        onClick={onRemove}
        className="hover:opacity-80 transition-opacity"
        aria-label={`Quitar filtro: ${label}`}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </span>
  );
}
