/**
 * @fileoverview VirtualTable component for efficiently rendering large data tables.
 * Combines TanStack Virtual for row virtualization with Table features like
 * sorting, row selection, sticky headers, and responsive column hiding.
 * Optimized for datasets with thousands of rows.
 * @module components/common/VirtualTable
 */

'use client';

import { ReactNode, useState, useMemo, useRef, useCallback, memo, JSX } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

/**
 * Sort direction for table columns
 * @typedef {'asc' | 'desc' | null} SortDirection
 */
type SortDirection = 'asc' | 'desc' | null;

/**
 * Available table sizes
 * @typedef {'sm' | 'md' | 'lg'} TableSize
 */
type TableSize = 'sm' | 'md' | 'lg';

/**
 * Available table visual variants
 * @typedef {'default' | 'striped' | 'bordered'} TableVariant
 */
type TableVariant = 'default' | 'striped' | 'bordered';

/**
 * Configuration for a table column
 * @interface TableColumn
 * @template T - The type of row data
 */
interface TableColumn<T> {
  key: string;
  header: ReactNode;
  cell: keyof T | ((row: T, index: number) => ReactNode);
  sortable?: boolean;
  sortKey?: keyof T;
  align?: 'left' | 'center' | 'right';
  width?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  headerClassName?: string;
  cellClassName?: string;
}

interface VirtualTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyAccessor: keyof T | ((row: T, index: number) => string | number);
  size?: TableSize;
  variant?: TableVariant;
  hoverable?: boolean;
  stickyHeader?: boolean;
  loading?: boolean;
  emptyMessage?: ReactNode;
  emptyIcon?: ReactNode;
  onRowClick?: (row: T, index: number) => void;
  selectedKeys?: Set<string | number>;
  onSelectionChange?: (keys: Set<string | number>) => void;
  selectable?: boolean;
  defaultSortKey?: string;
  defaultSortDirection?: SortDirection;
  onSortChange?: (key: string, direction: SortDirection) => void;
  sortFunction?: (key: string, direction: SortDirection) => void;
  className?: string;
  caption?: string;
  /** Height of the virtualized container */
  height?: number | string;
  /** Estimated row height for virtualization */
  estimateRowHeight?: number;
  /** Number of items to render outside the visible area */
  overscan?: number;
}

// Size configurations
const sizeStyles: Record<TableSize, { cell: string; header: string; rowHeight: number }> = {
  sm: { cell: 'py-2 px-3 text-sm', header: 'py-2 px-3 text-xs', rowHeight: 40 },
  md: { cell: 'py-3 px-4 text-sm', header: 'py-3 px-4 text-sm', rowHeight: 52 },
  lg: { cell: 'py-4 px-6 text-base', header: 'py-4 px-6 text-base', rowHeight: 64 },
};

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// Memoized row component for performance
const VirtualRow = memo(function VirtualRow<T>({
  row,
  rowIndex,
  columns,
  size,
  variant,
  hoverable,
  onRowClick,
  isSelected,
  selectable,
  onSelectRow,
  getRowKey,
  getCellValue,
}: {
  row: T;
  rowIndex: number;
  columns: TableColumn<T>[];
  size: TableSize;
  variant: TableVariant;
  hoverable: boolean;
  onRowClick?: (row: T, index: number) => void;
  isSelected: boolean;
  selectable: boolean;
  onSelectRow: (key: string | number) => void;
  getRowKey: (row: T, index: number) => string | number;
  getCellValue: (row: T, column: TableColumn<T>, index: number) => ReactNode;
}) {
  const rowKey = getRowKey(row, rowIndex);

  return (
    <tr
      className={`
        border-b border-gray-100
        ${hoverable ? 'hover:bg-gray-50' : ''}
        ${variant === 'striped' && rowIndex % 2 === 1 ? 'bg-gray-50' : ''}
        ${variant === 'bordered' ? 'border border-gray-200' : ''}
        ${onRowClick ? 'cursor-pointer' : ''}
        ${isSelected ? 'bg-primary-50' : ''}
      `}
      onClick={() => onRowClick?.(row, rowIndex)}
    >
      {selectable && (
        <td className={`${sizeStyles[size].cell} w-12`} onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelectRow(rowKey)}
            className="w-4 h-4 rounded-sm border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        </td>
      )}
      {columns.map((column) => (
        <td
          key={column.key}
          className={`
            ${sizeStyles[size].cell}
            ${alignmentClasses[column.align || 'left']}
            ${column.hideOnMobile ? 'hidden sm:table-cell' : ''}
            ${column.hideOnTablet ? 'hidden md:table-cell' : ''}
            ${column.cellClassName || ''}
          `}
        >
          {getCellValue(row, column, rowIndex)}
        </td>
      ))}
    </tr>
  );
}) as <T>(props: {
  row: T;
  rowIndex: number;
  columns: TableColumn<T>[];
  size: TableSize;
  variant: TableVariant;
  hoverable: boolean;
  onRowClick?: (row: T, index: number) => void;
  isSelected: boolean;
  selectable: boolean;
  onSelectRow: (key: string | number) => void;
  getRowKey: (row: T, index: number) => string | number;
  getCellValue: (row: T, column: TableColumn<T>, index: number) => ReactNode;
}) => JSX.Element;

export default function VirtualTable<T>({
  columns,
  data,
  keyAccessor,
  size = 'md',
  variant = 'default',
  hoverable = true,
  stickyHeader = true,
  loading = false,
  emptyMessage = 'No hay datos disponibles',
  emptyIcon,
  onRowClick,
  selectedKeys,
  onSelectionChange,
  selectable = false,
  defaultSortKey,
  defaultSortDirection = null,
  onSortChange,
  sortFunction,
  className = '',
  caption,
  height = 400,
  estimateRowHeight,
  overscan = 5,
}: VirtualTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(defaultSortKey || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSortDirection);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowHeight = estimateRowHeight || sizeStyles[size].rowHeight;

  // Get row key
  const getRowKey = useCallback(
    (row: T, index: number): string | number => {
      if (typeof keyAccessor === 'function') {
        return keyAccessor(row, index);
      }
      return String(row[keyAccessor]);
    },
    [keyAccessor]
  );

  // Get cell value
  const getCellValue = useCallback((row: T, column: TableColumn<T>, index: number): ReactNode => {
    if (typeof column.cell === 'function') {
      return column.cell(row, index);
    }
    return row[column.cell] as ReactNode;
  }, []);

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection || sortFunction) {
      return data;
    }

    const column = columns.find((c) => c.key === sortKey);
    if (!column) return data;

    const accessor = column.sortKey || (typeof column.cell === 'string' ? column.cell : null);
    if (!accessor) return data;

    return [...data].sort((a, b) => {
      const aVal = a[accessor as keyof T];
      const bVal = b[accessor as keyof T];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      const comparison = aVal < bVal ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection, columns, sortFunction]);

  // Virtualizer
  const virtualizer = useVirtualizer({
    count: sortedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan,
  });

  // Handle sort
  const handleSort = useCallback(
    (columnKey: string) => {
      let newDirection: SortDirection;

      if (sortKey !== columnKey) {
        newDirection = 'asc';
      } else if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = null;
      } else {
        newDirection = 'asc';
      }

      setSortKey(newDirection ? columnKey : null);
      setSortDirection(newDirection);

      if (sortFunction) {
        sortFunction(columnKey, newDirection);
      }

      onSortChange?.(columnKey, newDirection);
    },
    [sortKey, sortDirection, sortFunction, onSortChange]
  );

  // Handle row selection
  const handleSelectRow = useCallback(
    (key: string | number) => {
      if (!selectable || !onSelectionChange) return;

      const newSelection = new Set(selectedKeys);
      if (newSelection.has(key)) {
        newSelection.delete(key);
      } else {
        newSelection.add(key);
      }
      onSelectionChange(newSelection);
    },
    [selectable, onSelectionChange, selectedKeys]
  );

  // Handle select all
  const handleSelectAll = useCallback(() => {
    if (!selectable || !onSelectionChange) return;

    if (selectedKeys?.size === sortedData.length) {
      onSelectionChange(new Set());
    } else {
      const allKeys = new Set(sortedData.map((row, index) => getRowKey(row, index)));
      onSelectionChange(allKeys);
    }
  }, [selectable, onSelectionChange, selectedKeys, sortedData, getRowKey]);

  // Loading skeleton
  if (loading) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${sizeStyles[size].header} bg-gray-50 font-semibold text-gray-600`}
                >
                  <div className="h-4 bg-gray-200 rounded-sm animate-pulse w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b border-gray-100">
                {columns.map((column) => (
                  <td key={column.key} className={sizeStyles[size].cell}>
                    <div className="h-4 bg-gray-100 rounded-sm animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (sortedData.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className={className}>
      {/* Sticky header */}
      {stickyHeader && (
        <div className="overflow-x-auto border-b border-gray-200">
          <table className="w-full table-fixed">
            {caption && <caption className="sr-only">{caption}</caption>}
            <thead>
              <tr className={`${variant === 'bordered' ? 'bg-gray-50' : ''}`}>
                {selectable && (
                  <th className={`${sizeStyles[size].header} bg-gray-50 w-12`}>
                    <input
                      type="checkbox"
                      checked={selectedKeys?.size === sortedData.length && sortedData.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded-sm border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                )}
                {columns.map((column) => {
                  const isSorted = sortKey === column.key;
                  return (
                    <th
                      key={column.key}
                      className={`
                        ${sizeStyles[size].header}
                        ${variant !== 'default' ? 'bg-gray-50' : ''}
                        font-semibold text-gray-600
                        ${alignmentClasses[column.align || 'left']}
                        ${column.hideOnMobile ? 'hidden sm:table-cell' : ''}
                        ${column.hideOnTablet ? 'hidden md:table-cell' : ''}
                        ${column.width || ''}
                        ${column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''}
                        ${column.headerClassName || ''}
                      `}
                      onClick={column.sortable ? () => handleSort(column.key) : undefined}
                      aria-sort={
                        isSorted
                          ? sortDirection === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-1">
                        <span>{column.header}</span>
                        {column.sortable && (
                          <span className="text-gray-400">
                            {isSorted ? (
                              sortDirection === 'asc' ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )
                            ) : (
                              <ChevronsUpDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
          </table>
        </div>
      )}

      {/* Virtualized body */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <table className="w-full table-fixed" style={{ position: 'absolute', top: 0, left: 0 }}>
            {!stickyHeader && caption && <caption className="sr-only">{caption}</caption>}
            {!stickyHeader && (
              <thead>
                <tr
                  className={`border-b border-gray-200 ${variant === 'bordered' ? 'bg-gray-50' : ''}`}
                >
                  {selectable && (
                    <th className={`${sizeStyles[size].header} bg-gray-50 w-12`}>
                      <input
                        type="checkbox"
                        checked={selectedKeys?.size === sortedData.length && sortedData.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded-sm border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </th>
                  )}
                  {columns.map((column) => {
                    const isSorted = sortKey === column.key;
                    return (
                      <th
                        key={column.key}
                        className={`
                          ${sizeStyles[size].header}
                          ${variant !== 'default' ? 'bg-gray-50' : ''}
                          font-semibold text-gray-600
                          ${alignmentClasses[column.align || 'left']}
                          ${column.hideOnMobile ? 'hidden sm:table-cell' : ''}
                          ${column.hideOnTablet ? 'hidden md:table-cell' : ''}
                          ${column.width || ''}
                          ${column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''}
                          ${column.headerClassName || ''}
                        `}
                        onClick={column.sortable ? () => handleSort(column.key) : undefined}
                        aria-sort={
                          isSorted
                            ? sortDirection === 'asc'
                              ? 'ascending'
                              : 'descending'
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-1">
                          <span>{column.header}</span>
                          {column.sortable && (
                            <span className="text-gray-400">
                              {isSorted ? (
                                sortDirection === 'asc' ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )
                              ) : (
                                <ChevronsUpDown className="w-4 h-4" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
            )}
            <tbody>
              {/* Spacer for virtual items above */}
              {virtualItems.length > 0 && virtualItems[0].start > 0 && (
                <tr style={{ height: `${virtualItems[0].start}px` }}>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} />
                </tr>
              )}
              {virtualItems.map((virtualItem) => {
                const row = sortedData[virtualItem.index];
                const rowKey = getRowKey(row, virtualItem.index);
                const isSelected = selectedKeys?.has(rowKey) || false;

                return (
                  <VirtualRow
                    key={rowKey}
                    row={row}
                    rowIndex={virtualItem.index}
                    columns={columns}
                    size={size}
                    variant={variant}
                    hoverable={hoverable}
                    onRowClick={onRowClick}
                    isSelected={isSelected}
                    selectable={selectable}
                    onSelectRow={handleSelectRow}
                    getRowKey={getRowKey}
                    getCellValue={getCellValue}
                  />
                );
              })}
              {/* Spacer for virtual items below */}
              {virtualItems.length > 0 && (
                <tr
                  style={{
                    height: `${virtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end || 0)}px`,
                  }}
                >
                  <td colSpan={columns.length + (selectable ? 1 : 0)} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export type { VirtualTableProps, TableColumn, TableSize, TableVariant, SortDirection };
