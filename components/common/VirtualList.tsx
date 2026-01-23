/**
 * @fileoverview VirtualList component for efficiently rendering large datasets.
 * Uses TanStack Virtual for windowed rendering, only rendering visible items.
 * Supports list/compact layouts, loading states, empty states, and hover effects.
 * Includes VirtualList.Item for structured content display.
 * @module components/common/VirtualList
 */

'use client';

import { ReactNode, useRef, useCallback, memo, createContext, useContext, JSX } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import EmptyState from './EmptyState';
import { Package } from 'lucide-react';

/**
 * Available virtual list layout modes
 * @typedef {'list' | 'compact'} VirtualListLayout
 */
type VirtualListLayout = 'list' | 'compact';

/**
 * Available virtual list sizes
 * @typedef {'sm' | 'md' | 'lg'} VirtualListSize
 */
type VirtualListSize = 'sm' | 'md' | 'lg';

interface VirtualListContextValue {
  layout: VirtualListLayout;
  size: VirtualListSize;
  hoverable: boolean;
  divided: boolean;
}

const VirtualListContext = createContext<VirtualListContextValue>({
  layout: 'list',
  size: 'md',
  hoverable: true,
  divided: true,
});

interface VirtualListProps<T> {
  /** Data items to render */
  data: T[];
  /** Render function for each item */
  renderItem: (item: T, index: number) => ReactNode;
  /** Unique key accessor for items */
  keyAccessor: keyof T | ((item: T, index: number) => string | number);
  /** Layout mode */
  layout?: VirtualListLayout;
  /** Size variant */
  size?: VirtualListSize;
  /** Enable hover effect */
  hoverable?: boolean;
  /** Show dividers between items */
  divided?: boolean;
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
  /** Height of the virtualized container */
  height?: number | string;
  /** Estimated item height for virtualization */
  estimateItemHeight?: number;
  /** Number of items to render outside the visible area */
  overscan?: number;
}

// Size configurations
const sizeStyles: Record<VirtualListSize, { padding: string; itemHeight: number }> = {
  sm: { padding: 'py-2 px-3', itemHeight: 48 },
  md: { padding: 'py-4 px-4', itemHeight: 72 },
  lg: { padding: 'py-6 px-6', itemHeight: 96 },
};

// Memoized list item component
const VirtualListRow = memo(function VirtualListRow<T>({
  item,
  index,
  renderItem,
  layout,
  size,
  hoverable,
  divided,
  onItemClick,
  itemClassName,
}: {
  item: T;
  index: number;
  renderItem: (item: T, index: number) => ReactNode;
  layout: VirtualListLayout;
  size: VirtualListSize;
  hoverable: boolean;
  divided: boolean;
  onItemClick?: (item: T, index: number) => void;
  itemClassName: string;
}) {
  return (
    <li
      className={`
        ${layout === 'compact' ? 'py-2 px-3' : sizeStyles[size].padding}
        ${hoverable ? 'hover:bg-gray-50 transition-colors' : ''}
        ${divided ? 'border-b border-gray-100' : ''}
        ${onItemClick ? 'cursor-pointer' : ''}
        ${itemClassName}
      `}
      onClick={() => onItemClick?.(item, index)}
    >
      {renderItem(item, index)}
    </li>
  );
}) as <T>(props: {
  item: T;
  index: number;
  renderItem: (item: T, index: number) => ReactNode;
  layout: VirtualListLayout;
  size: VirtualListSize;
  hoverable: boolean;
  divided: boolean;
  onItemClick?: (item: T, index: number) => void;
  itemClassName: string;
}) => JSX.Element;

export default function VirtualList<T>({
  data,
  renderItem,
  keyAccessor,
  layout = 'list',
  size = 'md',
  hoverable = true,
  divided = true,
  loading = false,
  loadingItems = 6,
  emptyMessage = 'No hay elementos disponibles',
  emptyIcon,
  onItemClick,
  className = '',
  itemClassName = '',
  height = 400,
  estimateItemHeight,
  overscan = 5,
}: VirtualListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const itemHeight =
    estimateItemHeight || (layout === 'compact' ? 48 : sizeStyles[size].itemHeight);

  const getItemKey = useCallback(
    (item: T, index: number): string | number => {
      if (typeof keyAccessor === 'function') {
        return keyAccessor(item, index);
      }
      return String(item[keyAccessor]);
    },
    [keyAccessor]
  );

  // Virtualizer
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan,
  });

  const contextValue: VirtualListContextValue = { layout, size, hoverable, divided };

  // Loading skeleton
  if (loading) {
    return (
      <VirtualListContext.Provider value={contextValue}>
        <div className={className}>
          {Array.from({ length: loadingItems }).map((_, i) => (
            <div
              key={i}
              className={`
                ${sizeStyles[size].padding}
                ${divided ? 'border-b border-gray-100' : ''}
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
      </VirtualListContext.Provider>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <VirtualListContext.Provider value={contextValue}>
        <div className={className}>
          <EmptyState
            icon={emptyIcon || <Package className="w-10 h-10" />}
            title={typeof emptyMessage === 'string' ? emptyMessage : 'No hay elementos disponibles'}
            size="sm"
          />
        </div>
      </VirtualListContext.Provider>
    );
  }

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <VirtualListContext.Provider value={contextValue}>
      <div
        ref={parentRef}
        className={`overflow-auto ${className}`}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <ul
          role="list"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualItems.map((virtualItem) => {
            const item = data[virtualItem.index];
            const itemKey = getItemKey(item, virtualItem.index);

            return (
              <li
                key={itemKey}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <VirtualListRow
                  item={item}
                  index={virtualItem.index}
                  renderItem={renderItem}
                  layout={layout}
                  size={size}
                  hoverable={hoverable}
                  divided={divided}
                  onItemClick={onItemClick}
                  itemClassName={itemClassName}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </VirtualListContext.Provider>
  );
}

// VirtualList.Item component for structured content
interface VirtualListItemProps {
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

function VirtualListItem({
  leading,
  primary,
  secondary,
  trailing,
  className = '',
}: VirtualListItemProps) {
  const { size } = useContext(VirtualListContext);

  const textSizeStyles: Record<VirtualListSize, { primary: string; secondary: string }> = {
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

// Attach Item to VirtualList
VirtualList.Item = VirtualListItem;

// Hook to access VirtualList context
export function useVirtualList() {
  return useContext(VirtualListContext);
}

// Export types
export type { VirtualListLayout, VirtualListSize, VirtualListProps, VirtualListItemProps };
