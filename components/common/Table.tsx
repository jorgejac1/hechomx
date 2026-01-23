/**
 * @fileoverview Table component for displaying tabular data with advanced features.
 * Includes sorting, row selection, sticky headers, responsive column hiding,
 * loading skeletons, and empty states. Supports multiple visual variants.
 * @module components/common/Table
 */

'use client';

import { ReactNode, useState, useMemo, createContext, useContext } from 'react';
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
  /** Unique key for the column */
  key: string;
  /** Column header text */
  header: ReactNode;
  /** Cell renderer - key accessor or render function */
  cell: keyof T | ((row: T, index: number) => ReactNode);
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Sort key if different from accessor */
  sortKey?: keyof T;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Column width (Tailwind class) */
  width?: string;
  /** Hide on mobile */
  hideOnMobile?: boolean;
  /** Hide on tablet */
  hideOnTablet?: boolean;
  /** Header className */
  headerClassName?: string;
  /** Cell className */
  cellClassName?: string;
}

interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
  hoverable: boolean;
}

const TableContext = createContext<TableContextValue>({
  size: 'md',
  variant: 'default',
  hoverable: true,
});

// Main Table component
interface TableProps<T> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Data rows */
  data: T[];
  /** Unique key accessor for rows */
  keyAccessor: keyof T | ((row: T, index: number) => string | number);
  /** Size variant */
  size?: TableSize;
  /** Visual variant */
  variant?: TableVariant;
  /** Enable row hover effect */
  hoverable?: boolean;
  /** Enable sticky header */
  stickyHeader?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: ReactNode;
  /** Empty state icon */
  emptyIcon?: ReactNode;
  /** On row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Selected row keys */
  selectedKeys?: Set<string | number>;
  /** On selection change */
  onSelectionChange?: (keys: Set<string | number>) => void;
  /** Enable row selection */
  selectable?: boolean;
  /** Default sort column */
  defaultSortKey?: string;
  /** Default sort direction */
  defaultSortDirection?: SortDirection;
  /** On sort change */
  onSortChange?: (key: string, direction: SortDirection) => void;
  /** Custom sort function (for server-side sorting) */
  sortFunction?: (key: string, direction: SortDirection) => void;
  /** Additional CSS classes */
  className?: string;
  /** Table caption for accessibility */
  caption?: string;
}

export default function Table<T>({
  columns,
  data,
  keyAccessor,
  size = 'md',
  variant = 'default',
  hoverable = true,
  stickyHeader = false,
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
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(defaultSortKey || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSortDirection);

  // Size styles
  const sizeStyles: Record<TableSize, { cell: string; header: string }> = {
    sm: { cell: 'py-2 px-3 text-sm', header: 'py-2 px-3 text-xs' },
    md: { cell: 'py-3 px-4 text-sm', header: 'py-3 px-4 text-sm' },
    lg: { cell: 'py-4 px-6 text-base', header: 'py-4 px-6 text-base' },
  };

  // Get row key
  const getRowKey = (row: T, index: number): string | number => {
    if (typeof keyAccessor === 'function') {
      return keyAccessor(row, index);
    }
    return String(row[keyAccessor]);
  };

  // Get cell value
  const getCellValue = (row: T, column: TableColumn<T>, index: number): ReactNode => {
    if (typeof column.cell === 'function') {
      return column.cell(row, index);
    }
    return row[column.cell] as ReactNode;
  };

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

  // Handle sort
  const handleSort = (columnKey: string) => {
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
  };

  // Handle row selection
  const handleSelectRow = (key: string | number) => {
    if (!selectable || !onSelectionChange) return;

    const newSelection = new Set(selectedKeys);
    if (newSelection.has(key)) {
      newSelection.delete(key);
    } else {
      newSelection.add(key);
    }
    onSelectionChange(newSelection);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!selectable || !onSelectionChange) return;

    if (selectedKeys?.size === sortedData.length) {
      onSelectionChange(new Set());
    } else {
      const allKeys = new Set(sortedData.map((row, index) => getRowKey(row, index)));
      onSelectionChange(allKeys);
    }
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const contextValue: TableContextValue = { size, variant, hoverable };

  // Loading skeleton
  if (loading) {
    return (
      <TableContext.Provider value={contextValue}>
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
      </TableContext.Provider>
    );
  }

  // Empty state
  if (sortedData.length === 0) {
    return (
      <TableContext.Provider value={contextValue}>
        <div className={`text-center py-12 ${className}`}>
          {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </TableContext.Provider>
    );
  }

  return (
    <TableContext.Provider value={contextValue}>
      <div className={`overflow-x-auto ${className}`}>
        <table className="w-full" role="grid">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className={stickyHeader ? 'sticky top-0 z-10' : ''}>
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
                      isSorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined
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
          <tbody>
            {sortedData.map((row, rowIndex) => {
              const rowKey = getRowKey(row, rowIndex);
              const isSelected = selectedKeys?.has(rowKey);

              return (
                <tr
                  key={rowKey}
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
                    <td
                      className={`${sizeStyles[size].cell} w-12`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(rowKey)}
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
            })}
          </tbody>
        </table>
      </div>
    </TableContext.Provider>
  );
}

// Export types
export type { TableColumn, TableProps, TableSize, TableVariant, SortDirection };

// Hook to access table context
export function useTable() {
  return useContext(TableContext);
}
