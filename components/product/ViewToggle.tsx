/**
 * @fileoverview View toggle component for product listings
 * Provides a radio button group to switch between grid and list views.
 * Uses accessible radio controls with visual styling.
 * @module components/product/ViewToggle
 */

'use client';

import { LayoutGrid, List } from 'lucide-react';
import Radio from '@/components/common/Radio';

/**
 * Props for the ViewToggle component
 * @interface ViewToggleProps
 */
interface ViewToggleProps {
  /** Currently selected view mode */
  view: 'grid' | 'list';
  /** Callback when view mode changes */
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <fieldset className="flex gap-3" role="radiogroup" aria-label="Seleccionar vista">
      <label
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
          view === 'grid'
            ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Radio
          name="view-toggle"
          value="grid"
          checked={view === 'grid'}
          onChange={() => onViewChange('grid')}
          className="sr-only"
        />
        <LayoutGrid className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">Cuadrícula</span>
      </label>
      <label
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
          view === 'list'
            ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Radio
          name="view-toggle"
          value="list"
          checked={view === 'list'}
          onChange={() => onViewChange('list')}
          className="sr-only"
        />
        <List className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">Lista</span>
      </label>
    </fieldset>
  );
}
