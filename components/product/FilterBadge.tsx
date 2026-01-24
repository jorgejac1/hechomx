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
  primary:
    'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100',
  blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100',
  green:
    'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100',
  yellow:
    'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100',
  purple:
    'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100',
  orange:
    'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 hover:text-orange-900 dark:hover:text-orange-100',
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
