import { TrendingUp, TrendingDown } from 'lucide-react';

export interface TableColumn<T> {
  /** Column header text */
  header: string;
  /** Key to access data or render function */
  accessor: keyof T | ((row: T) => React.ReactNode);
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Hide on mobile */
  hideOnMobile?: boolean;
  /** Hide on tablet */
  hideOnTablet?: boolean;
  /** Column width class */
  width?: string;
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Data rows */
  data: T[];
  /** Unique key accessor */
  keyAccessor: keyof T | ((row: T, index: number) => string | number);
  /** Show hover effect on rows */
  hoverable?: boolean;
  /** Striped rows */
  striped?: boolean;
  /** Compact padding */
  compact?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Additional CSS classes */
  className?: string;
}

export default function DataTable<T>({
  columns,
  data,
  keyAccessor,
  hoverable = true,
  striped = false,
  compact = false,
  emptyMessage = 'No hay datos disponibles',
  className = '',
}: DataTableProps<T>) {
  const getKey = (row: T, index: number): string | number => {
    if (typeof keyAccessor === 'function') {
      return keyAccessor(row, index);
    }
    return String(row[keyAccessor]);
  };

  const getCellValue = (row: T, column: TableColumn<T>): React.ReactNode => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as React.ReactNode;
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const paddingClasses = compact ? 'py-2 px-2' : 'py-3 px-4';

  if (data.length === 0) {
    return <div className={`text-center py-8 text-gray-500 ${className}`}>{emptyMessage}</div>;
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`${paddingClasses} text-sm font-semibold text-gray-600 ${
                  alignmentClasses[column.align || 'left']
                } ${column.hideOnMobile ? 'hidden sm:table-cell' : ''} ${
                  column.hideOnTablet ? 'hidden md:table-cell' : ''
                } ${column.width || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={getKey(row, rowIndex)}
              className={`border-b border-gray-100 ${hoverable ? 'hover:bg-gray-50' : ''} ${
                striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''
              }`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`${paddingClasses} text-sm ${
                    alignmentClasses[column.align || 'left']
                  } ${column.hideOnMobile ? 'hidden sm:table-cell' : ''} ${
                    column.hideOnTablet ? 'hidden md:table-cell' : ''
                  }`}
                >
                  {getCellValue(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Helper components for common cell renderers
export function TrendCell({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const isPositive = value >= 0;
  return (
    <span
      className={`inline-flex items-center text-sm ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}
    >
      {isPositive ? (
        <TrendingUp className="w-4 h-4 mr-1" />
      ) : (
        <TrendingDown className="w-4 h-4 mr-1" />
      )}
      {isPositive ? '+' : ''}
      {value}
      {suffix}
    </span>
  );
}

export function CurrencyCell({ value, currency = '$' }: { value: number; currency?: string }) {
  return (
    <span className="font-medium text-gray-900">
      {currency}
      {value.toLocaleString()}
    </span>
  );
}

export function BadgeCell({
  children,
  variant = 'gray',
}: {
  children: React.ReactNode;
  variant?: 'gray' | 'green' | 'red' | 'blue' | 'amber' | 'purple';
}) {
  const variantStyles = {
    gray: 'bg-gray-100 text-gray-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
