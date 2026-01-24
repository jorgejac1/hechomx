/**
 * @fileoverview DataList component for rendering collections of items.
 * Supports list, grid, and compact layouts with loading skeletons,
 * empty states, hover effects, and click handlers. Includes DataList.Item
 * for structured content with leading/trailing elements.
 * @module components/common/DataList
 */

'use client';

import { ReactNode, createContext, useContext } from 'react';
import EmptyState from './EmptyState';
import { Package } from 'lucide-react';

/**
 * Available layout modes for the data list
 * @typedef {'list' | 'grid' | 'compact'} DataListLayout
 */
type DataListLayout = 'list' | 'grid' | 'compact';

/**
 * Available data list sizes
 * @typedef {'sm' | 'md' | 'lg'} DataListSize
 */
type DataListSize = 'sm' | 'md' | 'lg';

interface DataListContextValue {
  layout: DataListLayout;
  size: DataListSize;
  hoverable: boolean;
  divided: boolean;
}

const DataListContext = createContext<DataListContextValue>({
  layout: 'list',
  size: 'md',
  hoverable: true,
  divided: true,
});

interface DataListProps<T> {
  /** Data items to render */
  data: T[];
  /** Render function for each item */
  renderItem: (item: T, index: number) => ReactNode;
  /** Unique key accessor for items */
  keyAccessor: keyof T | ((item: T, index: number) => string | number);
  /** Layout mode */
  layout?: DataListLayout;
  /** Size variant */
  size?: DataListSize;
  /** Enable hover effect */
  hoverable?: boolean;
  /** Show dividers between items */
  divided?: boolean;
  /** Grid columns (for grid layout) */
  columns?: 1 | 2 | 3 | 4 | 6;
  /** Loading state */
  loading?: boolean;
  /** Number of skeleton items to show when loading */
  loadingItems?: number;
  /** Empty state message */
  emptyMessage?: ReactNode;
  /** Empty state icon */
  emptyIcon?: ReactNode;
  /** On item click handler */
  onItemClick?: (item: T, index: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Item wrapper className */
  itemClassName?: string;
}

export default function DataList<T>({
  data,
  renderItem,
  keyAccessor,
  layout = 'list',
  size = 'md',
  hoverable = true,
  divided = true,
  columns = 3,
  loading = false,
  loadingItems = 6,
  emptyMessage = 'No hay elementos disponibles',
  emptyIcon,
  onItemClick,
  className = '',
  itemClassName = '',
}: DataListProps<T>) {
  const getItemKey = (item: T, index: number): string | number => {
    if (typeof keyAccessor === 'function') {
      return keyAccessor(item, index);
    }
    return String(item[keyAccessor]);
  };

  // Size styles
  const sizeStyles: Record<DataListSize, { padding: string; gap: string }> = {
    sm: { padding: 'p-2', gap: 'gap-2' },
    md: { padding: 'p-4', gap: 'gap-4' },
    lg: { padding: 'p-6', gap: 'gap-6' },
  };

  // Grid column styles
  const gridColumnStyles: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  };

  const contextValue: DataListContextValue = { layout, size, hoverable, divided };

  // Loading skeleton
  if (loading) {
    return (
      <DataListContext.Provider value={contextValue}>
        <div
          className={`
            ${layout === 'grid' ? `grid ${gridColumnStyles[columns]} ${sizeStyles[size].gap}` : ''}
            ${className}
          `}
        >
          {Array.from({ length: loadingItems }).map((_, i) => (
            <div
              key={i}
              className={`
                ${sizeStyles[size].padding}
                ${layout === 'list' && divided ? 'border-b border-gray-100' : ''}
                ${layout === 'grid' ? 'bg-white rounded-lg border border-gray-200' : ''}
              `}
            >
              <div className="animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataListContext.Provider>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <DataListContext.Provider value={contextValue}>
        <div className={className}>
          <EmptyState
            icon={emptyIcon || <Package className="w-10 h-10" />}
            title={typeof emptyMessage === 'string' ? emptyMessage : 'No hay elementos disponibles'}
            size="sm"
          />
        </div>
      </DataListContext.Provider>
    );
  }

  // List layout
  if (layout === 'list' || layout === 'compact') {
    return (
      <DataListContext.Provider value={contextValue}>
        <ul className={`${divided ? 'divide-y divide-gray-100' : ''} ${className}`} role="list">
          {data.map((item, index) => (
            <li
              key={getItemKey(item, index)}
              className={`
                ${layout === 'compact' ? 'py-2' : sizeStyles[size].padding}
                ${hoverable ? 'hover:bg-gray-50 transition-colors' : ''}
                ${onItemClick ? 'cursor-pointer' : ''}
                ${itemClassName}
              `}
              onClick={() => onItemClick?.(item, index)}
            >
              {renderItem(item, index)}
            </li>
          ))}
        </ul>
      </DataListContext.Provider>
    );
  }

  // Grid layout
  return (
    <DataListContext.Provider value={contextValue}>
      <div
        className={`grid ${gridColumnStyles[columns]} ${sizeStyles[size].gap} ${className}`}
        role="list"
      >
        {data.map((item, index) => (
          <div
            key={getItemKey(item, index)}
            role="listitem"
            className={`
              bg-white rounded-lg border border-gray-200
              ${sizeStyles[size].padding}
              ${hoverable ? 'hover:shadow-md dark:hover:shadow-gray-900/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all' : ''}
              ${onItemClick ? 'cursor-pointer' : ''}
              ${itemClassName}
            `}
            onClick={() => onItemClick?.(item, index)}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </DataListContext.Provider>
  );
}

// DataList.Item component for structured content
interface DataListItemProps {
  /** Leading element (avatar, icon, checkbox) */
  leading?: ReactNode;
  /** Primary text/content */
  primary: ReactNode;
  /** Secondary text */
  secondary?: ReactNode;
  /** Trailing element (badge, action, timestamp) */
  trailing?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

function DataListItem({
  leading,
  primary,
  secondary,
  trailing,
  className = '',
}: DataListItemProps) {
  const { size } = useContext(DataListContext);

  const textSizeStyles: Record<DataListSize, { primary: string; secondary: string }> = {
    sm: { primary: 'text-sm', secondary: 'text-xs' },
    md: { primary: 'text-base', secondary: 'text-sm' },
    lg: { primary: 'text-lg', secondary: 'text-base' },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {leading && <div className="shrink-0">{leading}</div>}
      <div className="flex-1 min-w-0">
        <p className={`${textSizeStyles[size].primary} font-medium text-gray-900 truncate`}>
          {primary}
        </p>
        {secondary && (
          <p className={`${textSizeStyles[size].secondary} text-gray-500 truncate`}>{secondary}</p>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}

// Attach Item to DataList
DataList.Item = DataListItem;

// Hook to access DataList context
export function useDataList() {
  return useContext(DataListContext);
}

// Export types
export type { DataListLayout, DataListSize, DataListProps, DataListItemProps };
